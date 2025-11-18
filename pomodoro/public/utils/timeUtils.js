export function createInitialState() {
    return {
        remainingMs: 0,
        startMs: 0,
        tickMs: 1000,
        running: false,
    };
}

export default function computeProgress(state, now = () => performance.now()) {
    const elapsedMs = now() - state.startMs;
    const remainingMs = state.remainingMs - elapsedMs;
    return { elapsedMs, remainingMs };
}

export function becameRunning(prevRunning, currRunning) {
    return !prevRunning && currRunning;
}
