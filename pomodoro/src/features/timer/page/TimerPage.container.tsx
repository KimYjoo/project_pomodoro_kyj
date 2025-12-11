import TimerPageUI from "./TimerPage.presenter";

interface ITimerPageProps {
    mode: string;
    rawTimeData: number;
}

export default function TimerPage(props: ITimerPageProps) {
    return <TimerPageUI mode={props.mode} rawTimeData={props.rawTimeData} />;
}
