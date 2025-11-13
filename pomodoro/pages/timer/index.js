"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { changeMicroToSecond, timeFormatMMSS } from "@/utils/timeUtils.js";
import Timer from "@/domain/Timer";

export default function TimerPage() {
    const [remainingSec, setRemainingSec] = useState(3000);
    const [durationSec, setDurationSec] = useState(3000);

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
    }, [timerWorkerUrl]);

    const onClickStart = () => {
        timerRef.current?.start();
    };
    const onClickPause = () => {
        timerRef.current?.pause();
    };

    return (
        <>
            <div>{timeFormatMMSS(remainingSec)}</div>
            <button onClick={onClickStart}>시작</button>
            <button onClick={onClickPause}>정지</button>
        </>
    );
}
