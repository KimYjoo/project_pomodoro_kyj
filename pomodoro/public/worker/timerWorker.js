import { changeSecondToMicro } from "/utils/timeUtils.js";
const tickMs = 1000;

let running = false;

// 타이머 설정 시간
let durationMs = 0;
// 시작 시간
let startMs = 0;
// 남은 시간
let remainingMs = 0;

function post(command, payload) {
    self.postMessage({ command, ...payload });
}

// 타이머 진행 루프
function timerLoop() {
    if (!running) return;

    const nowMs = performance.now();
    const elapsedMs = nowMs - startMs;
    remainingMs = durationMs - elapsedMs;

    if (remainingMs <= 0) {
        running = false;
        post("done");
        return;
    }
    post("tick", { remainingMs });
    // 드리프트 보정
    const correctionTick = tickMs - (elapsedMs % tickMs);
    setTimeout(timerLoop, correctionTick);
}

self.onmessage = (event) => {
    const { command, payload } = event.data;
    if (command === "start") {
        if (running) return;
        durationMs = changeSecondToMicro(payload.durationSec);
        startMs = performance.now();
        running = true;
        post("started");
        timerLoop();
    }
};
