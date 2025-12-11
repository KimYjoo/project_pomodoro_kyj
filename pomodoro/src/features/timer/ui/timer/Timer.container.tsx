import TimerUI from "./Timer.presenter";

interface ITimerProps {
    mode: string;
    rawTimeData: number;
}

export default function Timer(props: ITimerProps): JSX.Element {
    return <TimerUI mode={props.mode} rawTimeData={props.rawTimeData} />;
}
