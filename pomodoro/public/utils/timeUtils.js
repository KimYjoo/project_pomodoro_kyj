export function createInitialState() {
    return {
        tickMs: 1000,
        originalDurationMs: 0,
        durationMs: 0,
        startMs: 0,
        running: false,
    };
}

export function computeTick(state, now = () => performance.now()) {
    const elapsedMs = now() - state.startMs;
    const remainingMs = state.durationMs - elapsedMs;
    return { elapsedMs, remainingMs };
}

export function becameRunning(prevState, currState) {
    return !prevState.running && currState.running;
}
