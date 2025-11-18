export default function handleOnMessage(state, { command, payload }, now = () => performance.now()) {
    switch (command) {
        case "setup":
            return {
                ...state,
                remainingMs: payload?.durationMs,
                tickMs: payload?.tickMs,
                running: false,
            };
        case "reset":
            return {
                ...state,
                remainingMs: payload?.durationMs,
                running: false,
            };
        case "start":
            let startMs = state.running ? state.startMs : now();
            return {
                ...state,
                startMs,
                running: true,
            };
        case "pause":
            if (!state.running) return state;
            const elapsedMs = now() - state.startMs;
            return {
                ...state,
                running: false,
                remainingMs: state.remainingMs - elapsedMs,
            };
        default:
            return state;
    }
}
