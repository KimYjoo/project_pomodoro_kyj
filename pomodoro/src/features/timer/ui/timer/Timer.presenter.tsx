import ModeLabel from "../modeLabel/ModeLabel.container";
import TimeDisplay from "../timeDisplay/TimeDisplay.container";

interface ITimerUIProps {
    mode: string;
    rawTimeData: number;
}

export default function TimerUI(props: ITimerUIProps) {
    return (
        <>
            <ModeLabel mode={props.mode} />
            <TimeDisplay rawTimeData={props.rawTimeData} />
        </>
    );
}
