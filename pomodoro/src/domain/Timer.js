export default class Timer {
    #durationSec = 0;
    #remainingMs = 0;
    #timerWorker = null;
    #onTick = null;

    constructor(workerUrl) {
        this.#timerWorker = new Worker(workerUrl, { type: "module" });
        this.#timerWorker.onmessage = (event) => {
            const { command, remainingMs } = event.data || {};
            if (command === "tick") {
                this.#remainingMs = remainingMs;
                this.#onTick?.(remainingMs);
            }
        };
        this.#timerWorker.onerror = (e) => {
            console.error("worker error", e.message);
        };
    }

    get worker() {
        return this.#timerWorker;
    }
    setup(durationSec) {
        this.#durationSec = durationSec;
    }
    start() {
        this.#timerWorker.postMessage({
            command: "start",
            payload: {
                durationSec: this.#durationSec,
            },
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
