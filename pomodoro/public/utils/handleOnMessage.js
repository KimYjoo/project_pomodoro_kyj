export default function handleOnMessage(state, { command, payload }, now = () => performance.now()) {
    switch (command) {
        case "setup":
            return {
                ...state,
                originalDurationMs: payload.durationMs,
                durationMs: payload.durationMs,
                tickMs: payload.tickMs,
                running: false,
            };
        case "reset":
            return {
                ...state,
                durationMs: state.originalDurationMs,
                running: false,
            };
        case "start":
            let startMs = state.startMs;
            if (!state.running) startMs = now();
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
