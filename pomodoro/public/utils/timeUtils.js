export function handleOnMessage(state, { command, payload }, now = () => performance.now()) {
    switch (command) {
        case "setup":
            return {
                ...state,
                durationMs: payload.durationMs,
                tickMs: payload.tickMs,
                running: false,
            };
        case "start":
            return {
                ...state,
                startMs: now(),
                running: true,
            };
        case "pause":
            if (!state.running) return state;
            const elapsedMs = now() - state.startMs;
            return {
                ...state,
                running: false,
                durationMs: state.durationMs - elapsedMs,
            };
        case "done":
            return {
                ...state,
                running: false,
            };
        default:
            return state;
    }
}

export function createInitialState() {
    return {
        tickMs: 1000,
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
