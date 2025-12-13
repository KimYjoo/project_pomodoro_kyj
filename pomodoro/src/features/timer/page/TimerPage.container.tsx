"use client";

import TimerPageUI from "./TimerPage.presenter";
import { useEffect, useState } from "react";
import Timer from "@/features/timer/Timer.js";

const TIMER_MODE_CONFIG = {
    sprint: "sprint",
    rest: "rest",
} as const;

type TimerModeKey = keyof typeof TIMER_MODE_CONFIG;

export default function TimerPage() {
    const [mode, setMode] = useState<TimerModeKey>("sprint");
    const [duration, setDuration] = useState(10);
    const [focusDuration, setFocusDuration] = useState(10);
    const [restDuration, setRestDuration] = useState(600);
    const [remainTime, setRemainTime] = useState(0);
    const [timerInstance, setTimerInstance] = useState<Timer | null>(null);

    const timerWorkerUrl = "/worker/timerWorker.js";

    useEffect(() => {
        const timer = new Timer(timerWorkerUrl);

        const offTick = timer.onTick((remainingMs: number) => {
            setRemainTime(remainingMs);
        });

        const offDone = timer.onDone(() => {
            modeChanger();
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

        setRemainTime(getDurationByMode());

        timerInstance.pause();
        timerInstance.setup(duration);
    }, [timerInstance, mode, focusDuration, restDuration]);

    const getDurationByMode = (): number => {
        return mode === TIMER_MODE_CONFIG.sprint ? focusDuration : restDuration;
    };

    const onClickStart = () => timerInstance?.start();
    const onClickPause = () => timerInstance?.pause();

    const modeChanger = () => {
        setMode((prevMode) => getOppositeMode(prevMode));
    };

    const getOppositeMode = (mode: TimerModeKey): TimerModeKey => {
        return mode === TIMER_MODE_CONFIG.sprint ? TIMER_MODE_CONFIG.rest : TIMER_MODE_CONFIG.sprint;
    };

    return (
        <>
            <TimerPageUI mode={mode} rawTimeData={remainTime} onClickStart={onClickStart} onClickPause={onClickPause} />
        </>
    );
}
