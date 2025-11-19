export function createInitialState() {
    return {
        durationMs: 0,
        remainingMs: 0,
        startMs: 0,
        tickMs: 1000,
        running: false,
    };
}

export function computeProgress(state, now = () => performance.now()) {
    const elapsedMs = now() - state.startMs;
    const remainingMs = state.durationMs - elapsedMs;
    return { elapsedMs, remainingMs };
}

export function becameRunning(prevRunning, currRunning) {
    return !prevRunning && currRunning;
}
