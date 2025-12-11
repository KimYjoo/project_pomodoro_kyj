import TimerRowUI from "./TimerRow.presenter";

interface ITimerRowProps {
    rowTitle: string;
    rowTime: string;
}

export default function TimerRow(props: ITimerRowProps) {
    return (
        <>
            <TimerRowUI rowTitle={props.rowTitle} rowTime={props.rowTime} />
        </>
    );
}
