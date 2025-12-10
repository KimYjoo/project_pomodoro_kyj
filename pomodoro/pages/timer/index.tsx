"use client";

import { useEffect, useState } from "react";
import { changeMicroToSecond, timeFormatMMSS } from "@/utils/timeUtils.js";
import Timer from "@/features/timer/Timer.js";
import GlobalStyles from "@/shared/styles/globalStyles";

const TIMER_MODE_CONFIG = {
    rest: "rest",
    focus: "focus",
} as const;

type TimerModeKey = keyof typeof TIMER_MODE_CONFIG;

export default function TimerPage() {
    const [mode, setMode] = useState<TimerModeKey>("focus");
    const [duration, setDuration] = useState(10);
    const [focusDuration, setFocusDuration] = useState(10);
    const [restDuration, setRestDuration] = useState(600);

    const [remainingSec, setRemainingSec] = useState(0);

    const [timerInstance, setTimerInstance] = useState<Timer | null>(null);
    const timerWorkerUrl = "/worker/timerWorker.js";

    useEffect(() => {
        const timer = new Timer(timerWorkerUrl);

        const offTick = timer.onTick((remainingMs: number) => {
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

    const getDurationByMode = (): number => {
        return mode === TIMER_MODE_CONFIG.focus ? focusDuration : restDuration;
    };
    const getSettingDurationByMode = () => {
        return mode === TIMER_MODE_CONFIG.focus ? setFocusDuration : setRestDuration;
    };

    const onClickStart = () => timerInstance?.start();
    const onClickPause = () => timerInstance?.pause();
    const onClickReset = () => timerInstance?.reset();

    const onClickModeChange = () => {
        changeModeTrigger();
    };

    const changeModeTrigger = () => {
        setMode((prevMode) => (prevMode === TIMER_MODE_CONFIG.focus ? TIMER_MODE_CONFIG.rest : TIMER_MODE_CONFIG.focus));
    };

    const onChangeDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
        const duration = Number(event.target.value);
        if (!isFinite(duration)) return;
        setDuration(Number(event.target.value));
    };

    const onClickSubmitDuration = () => {
        const setCurrModeDuration = getSettingDurationByMode();
        setCurrModeDuration(duration);
    };

    return (
        <>
            <GlobalStyles />
            <div>{TIMER_MODE_CONFIG[mode]}</div>
            <div>{timeFormatMMSS(remainingSec)}</div>
            <button onClick={onClickStart}>시작</button>
            <button onClick={onClickPause}>정지</button>
            <button onClick={onClickReset}>초기화</button>
            <button onClick={onClickModeChange}>모드변경</button>
            <div>
                <div>모드 시간 설정</div>
                <input type="text" onChange={onChangeDuration} placeholder="시간을 입력해주세요." />
            </div>
            <button onClick={onClickSubmitDuration}>적용</button>
        </>
    );
}
