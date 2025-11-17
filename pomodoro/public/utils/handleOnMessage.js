export default function handleOnMessage({ state, onMessage, post }, now = () => performance.now()) {
    switch (onMessage?.command) {
        case "setup":
            return {
                ...state,
                originalDurationMs: onMessage?.payload?.durationMs,
                durationMs: onMessage?.payload?.durationMs,
                tickMs: onMessage?.payload?.tickMs,
                running: false,
            };
        case "reset":
            post("tick", { remainingMs: state.originalDurationMs });
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
