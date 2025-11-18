import { changeSecondToMicro } from "@/utils/timeUtils";

export default class Timer {
    #durationMs = 0;
    #timerWorker = null;
    #onTick = null;
    #onDone = null;

    constructor(workerUrl) {
        this.#timerWorker = new Worker(workerUrl, { type: "module" });
        this.#timerWorker.onmessage = this.#on.bind(this);
        this.#timerWorker.onerror = this.#onError.bind(this);
    }

    get worker() {
        return this.#timerWorker;
    }

    #on(event) {
        const { command = "", remainingMs = 0 } = event.data || {};

        switch (command) {
            case "update":
                this.#onTick?.(remainingMs);
                return;
            case "done":
                this.#onDone?.();
            default:
                return;
        }
    }

    #onError(error) {
        console.error("worker error", error);
    }

    #post({ command, payload = {} }) {
        this.#timerWorker.postMessage({
            command,
            payload,
        });
    }

    setup(durationSec = 0, tickMs = 1000) {
        this.#durationMs = changeSecondToMicro(durationSec);
        this.#post({
            command: "setup",
            payload: {
                durationMs: this.#durationMs,
                tickMs,
            },
        });
    }
    start() {
        this.#post({
            command: "start",
        });
    }
    pause() {
        this.#post({
            command: "pause",
        });
    }
    reset() {
        this.#post({
            command: "reset",
            payload: {
                durationMs: this.#durationMs,
            },
        });
    }
    onTick(handler) {
        this.#onTick = handler;
        return () => {
            this.#onTick = null;
        };
    }
    onDone(handler) {
        this.#onDone = handler;
        return () => {
            this.#onDone = null;
        };
    }
    dispose() {
        this.#timerWorker.terminate();
    }
}
