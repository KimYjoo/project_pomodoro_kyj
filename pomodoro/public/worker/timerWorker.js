import { createInitialState, computeTick, becameRunning } from "/utils/timeUtils.js";
import handleOnMessage from "/utils/handleOnMessage.js";
import handleSideEffects from "/utils/handleSideEffects.js";

let state = createInitialState();

function post(command, payload = {}) {
    if (!command) return;
    self.postMessage({ command, ...payload });
}

// 타이머 진행 루프
function timerLoop() {
    if (!state.running) return;

    const { elapsedMs, remainingMs } = computeTick(state);

    if (remainingMs <= 0) {
        prevState = state;
        state = handleOnMessage(state, { command: "done" });
        handleSideEffects("done", state, post);
        return;
    }
    post("tick", { remainingMs });
    // 드리프트 보정
    const nextTick = state.tickMs - (elapsedMs % state.tickMs);
    setTimeout(timerLoop, nextTick);
}

self.onmessage = (event) => {
    const { command, payload } = event.data || {};
    if (!command) return;

    const prevState = state;
    state = handleOnMessage(state, { command, payload });
    handleSideEffects(command, state, post);

    if (!becameRunning(prevState, state)) return;
    timerLoop();
};
