import { createInitialState, computeProgress, becameRunning } from "/utils/timeUtils.js";
import handleOnMessage from "/utils/handleOnMessage.js";
import handleSideEffects from "/utils/handleSideEffects.js";

let state = createInitialState();
/*  
    durationMs : 설정 시간
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
    if (!state.running) return;
    const { elapsedMs, remainingMs } = computeProgress(state);
    state = { ...state, remainingMs };
    if (remainingMs <= 0) {
        state = handleSideEffects("done", state);
        post("done");
        return;
    }
    post("update", { remainingMs });

    // 드리프트 보정
    const nextTick = state.tickMs - (elapsedMs % state.tickMs);
    setTimeout(timerLoop, nextTick);
}
