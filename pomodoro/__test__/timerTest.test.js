import Timer from "@/domain/Timer";

describe("Timer start", () => {
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
        const durationSec = 10;
        timer.setup(durationSec);
        timer.start();

        expect(mockWorker.postMessage).toHaveBeenCalledWith({
            command: "start",
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

describe("Timer pause", () => {
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

    test("pause()가 worker에 pause 명령을 보낸다", () => {
        const timer = new Timer("/worker/timerWorker.js");

        timer.pause();

        expect(mockWorker.postMessage).toHaveBeenCalledWith({ command: "pause" });
    });
});
