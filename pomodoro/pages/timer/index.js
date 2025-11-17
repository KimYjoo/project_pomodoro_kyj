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

    const [focusDuration, setFocusDuration] = useState(3000);
    const [restDuration, setRestDuration] = useState(600);

    const [remainingSec, setRemainingSec] = useState(0);

    const timerRef = useRef(null);
    const timerWorkerUrl = "/worker/timerWorker.js";

    useEffect(() => {
        timerRef.current = new Timer(timerWorkerUrl);
        const offTick = timerRef.current?.onTick((remainingMs) => {
            setRemainingSec(changeMicroToSecond(remainingMs));
        });
        return () => {
            offTick();
            timerRef.current.dispose();
        };
    }, [timerWorkerUrl]);

    useEffect(() => {
        const duration = getDurationByMode();
        setRemainingSec(duration);
        timerRef.current?.setup(duration);
    }, [mode, focusDuration, restDuration]);

    const getDurationByMode = () => {
        return mode === "focus" ? focusDuration : restDuration;
    };

    const onClickStart = () => {
        timerRef.current?.start();
    };
    const onClickPause = () => {
        timerRef.current?.pause();
    };
    const onClickReset = () => {
        timerRef.current?.reset();
    };
    const onClickModeChange = () => {
        setMode(mode === "focus" ? "rest" : "focus");
    };

    return (
        <>
            <div>{timeFormatMMSS(remainingSec)}</div>
            <button onClick={onClickStart}>시작</button>
            <button onClick={onClickPause}>정지</button>
            <button onClick={onClickReset}>초기화</button>
            <button onClick={onClickModeChange}>모드변경</button>
        </>
    );
}
