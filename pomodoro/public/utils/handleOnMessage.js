export default function handleOnMessage(state, { command, payload }, now = () => performance.now()) {
    switch (command) {
        case "setup":
            return {
                ...state,
                durationMs: payload?.durationMs,
                remainingMs: payload?.durationMs,
                tickMs: payload?.tickMs,
                running: false,
            };
        case "reset":
            return {
                ...state,
                durationMs: payload?.durationMs,
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
            return {
                ...state,
                running: false,
                durationMs: state.remainingMs,
            };
        default:
            return state;
    }
}
