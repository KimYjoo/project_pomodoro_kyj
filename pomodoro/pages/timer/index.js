"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { changeMicroToSecond, timeFormatMMSS } from "@/utils/timeUtils.js";
import Timer from "@/domain/Timer";

const TIMER_MODE_CONFIG = {
    rest: "rest",
    focus: "focus",
};

export default function TimerPage() {
    const [mode, setMode] = useState("focus");

    const [focusDuration, setFocusDuration] = useState(10);
    const [restDuration, setRestDuration] = useState(600);

    const [remainingSec, setRemainingSec] = useState(0);

    const [timerInstance, setTimerInstance] = useState(null);
    const timerWorkerUrl = "/worker/timerWorker.js";

    useEffect(() => {
        const timer = new Timer(timerWorkerUrl);

        const offTick = timer.onTick((remainingMs) => {
            setRemainingSec(changeMicroToSecond(remainingMs));
        });

        const offDone = timer.onDone(() => {
            changeModeTrigger();
        });

        setTimerInstance(timer);

        return () => {
            offTick();
            offDone();
            timer?.dispose();
            setTimerInstance(null);
        };
    }, [timerWorkerUrl]);

    useEffect(() => {
        if (!timerInstance) return;

        const duration = getDurationByMode();

        setRemainingSec(duration);

        timerInstance.pause();
        timerInstance.setup(duration);
    }, [timerInstance, mode, focusDuration, restDuration]);

    const getDurationByMode = () => {
        return mode === "focus" ? focusDuration : restDuration;
    };

    const onClickStart = () => timerInstance?.start();
    const onClickPause = () => timerInstance?.pause();
    const onClickReset = () => timerInstance?.reset();

    const onClickModeChange = () => {
        changeModeTrigger();
    };

    const changeModeTrigger = () => {
        setMode(mode === "focus" ? "rest" : "focus");
    };

    return (
        <>
            <div>{TIMER_MODE_CONFIG[mode]}</div>
            <div>{timeFormatMMSS(remainingSec)}</div>
            <button onClick={onClickStart}>시작</button>
            <button onClick={onClickPause}>정지</button>
            <button onClick={onClickReset}>초기화</button>
            <button onClick={onClickModeChange}>모드변경</button>
        </>
    );
}
