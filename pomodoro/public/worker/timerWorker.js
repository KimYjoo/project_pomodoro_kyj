import { createInitialState, computeProgress, becameRunning } from "/utils/timeUtils.js";
import handleOnMessage from "/utils/handleOnMessage.js";
import handleSideEffects from "/utils/handleSideEffects.js";

let state = createInitialState();
/*
    remainingMs : 남은 시간
    startMs : 시작 시간
    tickMs : 한 주기 시간
    running : 타이머 작동 flag
*/

// post
function post(command, payload = {}) {
    if (!command) return;
    self.postMessage({ command, ...payload });
}

// on
function on(event) {
    const { command, payload } = event.data || {};
    if (!command) return;

    const prevRunning = state.running;
    state = handleOnMessage(state, { command, payload });
    post("update", { remainingMs: state.remainingMs });

    if (becameRunning(prevRunning, state.running)) timerLoop();
}
self.onmessage = on;

// 타이머 진행 루프
function timerLoop() {
    const { elapsedMs, remainingMs } = computeProgress(state);
    state = { ...state, remainingMs };
    post("update", { remainingMs });

    if (remainingMs <= 0) {
        state = handleSideEffects("done", state);
        post("done");
        return;
    }

    // 드리프트 보정
    const nextTick = state.tickMs - (elapsedMs % state.tickMs);
    setTimeout(timerLoop, nextTick);
}
