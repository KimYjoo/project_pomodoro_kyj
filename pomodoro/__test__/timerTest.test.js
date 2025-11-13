import Timer from "@/domain/Timer";

describe("Timer", () => {
    let mockWorker;

    beforeEach(() => {
        mockWorker = {
            postMessage: jest.fn(),
            terminate: jest.fn(),
            onmessage: null,
            onerror: null,
        };

        global.Worker = jest.fn(() => mockWorker);
    });

    test("start() sends start command", () => {
        const timer = new Timer("/worker/timerWorker.js");
        timer.setup(10);
        timer.start();

        expect(mockWorker.postMessage).toHaveBeenCalledWith({
            command: "start",
            payload: { durationSec: 10 },
        });
    });

    test("tick triggers onTick handler", () => {
        const timer = new Timer("/worker/timerWorker.js");
        const handler = jest.fn();
        timer.onTick(handler);

        mockWorker.onmessage({ data: { command: "tick", remainingMs: 1234 } });

        expect(handler).toHaveBeenCalledWith(1234);
    });
});
