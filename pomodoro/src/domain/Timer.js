import { changeSecondToMicro } from "@/utils/timeUtils";

export default class Timer {
    #durationMs = 0;
    #timerWorker = null;
    #onTick = null;
    #onDone = null;

    constructor(workerUrl) {
        this.#timerWorker = new Worker(workerUrl, { type: "module" });
        this.#timerWorker.onmessage = (event) => {
            const { command, remainingMs } = event.data || {};
            if (command === "tick") {
                this.#onTick?.(remainingMs);
            } else if (command === "done") {
                this.#onDone?.();
            }
        };
        this.#timerWorker.onerror = (e) => {
            console.error("worker error", e);
        };
    }

    get worker() {
        return this.#timerWorker;
    }
    setup(durationSec = 0, tickMs = 1000) {
        this.#durationMs = changeSecondToMicro(durationSec);
        this.#timerWorker.postMessage({
            command: "setup",
            payload: {
                originalDurationMs: this.#durationMs,
                durationMs: this.#durationMs,
                tickMs,
            },
        });
    }
    start() {
        this.#timerWorker.postMessage({
            command: "start",
        });
    }
    pause() {
        this.#timerWorker.postMessage({
            command: "pause",
        });
    }
    reset() {
        this.#timerWorker.postMessage({
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
