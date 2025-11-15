"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { changeMicroToSecond, timeFormatMMSS } from "@/utils/timeUtils.js";
import Timer from "@/domain/Timer";

export default function TimerPage() {
    const [durationSec, setDurationSec] = useState(100);
    const [remainingSec, setRemainingSec] = useState(durationSec);

    const timerRef = useRef(null);
    const timerWorkerUrl = "/worker/timerWorker.js";

    useEffect(() => {
        const timer = new Timer(timerWorkerUrl);
        timerRef.current = timer;
        timer.setup(durationSec);
        const offTick = timer.onTick((remainingMs) => {
            setRemainingSec(changeMicroToSecond(remainingMs));
        });
        return () => {
            offTick();
            timer.dispose();
        };
    }, [timerWorkerUrl, durationSec]);

    const onClickStart = () => {
        timerRef.current?.start();
    };
    const onClickPause = () => {
        timerRef.current?.pause();
    };
    const onClickReset = () => {
        timerRef.current?.reset();
    };

    return (
        <>
            <div>{timeFormatMMSS(remainingSec)}</div>
            <button onClick={onClickStart}>시작</button>
            <button onClick={onClickPause}>정지</button>
            <button onClick={onClickReset}>초기화</button>
        </>
    );
}
