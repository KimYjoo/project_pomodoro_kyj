import { createInitialState } from "../public/utils/timeUtils.js";
import handleOnMessage from "../public/utils/handleOnMessage.js";

// 단순 payload 없을 때 빈 객체로 대체
function call(state, { command, payload = {} } = {}, now) {
    return handleOnMessage(state, { command, payload }, now);
}

describe("timer pause logic", () => {
    test("pause는 running이 true일 때 running을 false로 만든다", () => {
        let state = createInitialState();
        state = { ...state, running: true, startMs: 0, durationMs: 5000 };

        const next = call(state, { command: "pause" }, () => 3000);

        expect(next.running).toBe(false);
        expect(next.durationMs).toBe(2000); // 5000 - 3000
    });

    test("running이 false일 때 pause를 보내면 상태 변화 없음", () => {
        let state = createInitialState();

        const next = call(state, { command: "pause" }, () => 1000);

        expect(next.running).toBe(false);
        expect(next.durationMs).toBe(0); // 변화 없음
    });

    test("start 이후 pause 하면 상태가 정상적으로 업데이트 된다", () => {
        let now = 1000;
        const fakeNow = () => now;

        let state = createInitialState();
        // setup
        state = call(state, { command: "setup", payload: { durationMs: 5000, tickMs: 1000 } }, fakeNow);
        expect(state.durationMs).toBe(5000);

        // start
        state = call(state, { command: "start" }, fakeNow);

        expect(state.running).toBe(true);
        expect(state.startMs).toBe(1000);

        // pause
        now = 2000; // 1000ms 경과
        state = call(state, { command: "pause" }, fakeNow);

        expect(state.running).toBe(false);
        expect(state.durationMs).toBe(4000); // 남은 시간
    });
});

describe("timer reset logic", () => {
    test("reset은 running이 true일 때 running을 false로 만든다", () => {
        let state = createInitialState();
        state = { ...state, running: true, startMs: 0, durationMs: 5000, originalDurationMs: 5000 };

        const next = call(state, { command: "reset" }, () => 3000);

        expect(next.running).toBe(false);
    });
    test("reset은 remainingMs를 초기 durationMs로 초기화 한다.", () => {
        let state = createInitialState();
        state = { ...state, running: true, startMs: 0, durationMs: 5000, originalDurationMs: 5000 };
        state = call(state, { command: "pause" }, () => 2000);
        expect(state.durationMs).toBe(3000);
        state = call(state, { command: "reset" }, () => 1000);

        expect(state.durationMs).toBe(5000);
    });
});
