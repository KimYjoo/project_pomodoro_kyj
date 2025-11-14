import { changeSecondToMicro } from "@/utils/timeUtils";

export default class Timer {
    #remainingMs = 0;
    #durationMs = 0;
    #timerWorker = null;
    #onTick = null;

    constructor(workerUrl) {
        this.#timerWorker = new Worker(workerUrl, { type: "module" });
        this.#timerWorker.onmessage = (event) => {
            const { command, remainingMs } = event.data || {};
            if (command === "tick") {
                this.#remainingMs = remainingMs;
                this.#onTick?.(remainingMs);
            } else if (command === "paused") {
                this.#remainingMs = remainingMs;
                this.#onTick?.(remainingMs);
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
        this.#remainingMs = this.#durationMs;
        this.#timerWorker.postMessage({
            command: "setup",
            payload: {
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
    onTick(handler) {
        this.#onTick = handler;
        return () => {
            this.#onTick = null;
        };
    }
    dispose() {
        this.#timerWorker.terminate();
    }
}
