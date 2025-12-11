import TimerLayoutUI from "./TimerLayout.presenter";

interface ITimerLayout {
    rawTimeData: number;
    mode: string;
}

export default function TimerLayout(props: ITimerLayout) {
    const {Hour, Minute, Second} = 
    return (
        <>
            <TimerLayoutUI />
        </>
    );
}
