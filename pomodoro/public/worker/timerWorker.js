import { createInitialState, handleOnMessage, computeTick } from "/utils/timeUtils.js";

let state = createInitialState();

// 타이머 진행 루프
function timerLoop() {
    if (!state.running) return;

    const { elapsedMs, remainingMs } = computeTick(state);

    if (remainingMs <= 0) {
        state = handleOnMessage(state, { command: "done" });
        post("tick", { remainingMs: 0 });
        post("done");
        return;
    }
    post("tick", { remainingMs });
    // 드리프트 보정
    const nextTick = state.tickMs - (elapsedMs % state.tickMs);
    setTimeout(timerLoop, nextTick);
}

function post(command, payload = {}) {
    self.postMessage({ command, ...payload });
}

self.onmessage = (event) => {
    const { command, payload } = event.data || {};
    if (!command) return;

    const prevState = state;
    state = handleOnMessage(state, { command, payload });

    const becameRunning = !prevState.running && state.running;
    if (!becameRunning) return;

    post("started");
    timerLoop();
};
