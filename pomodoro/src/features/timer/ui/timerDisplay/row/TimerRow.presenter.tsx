import * as style from "./TimerRow.style";

interface ITimerRowUIProps {
    rowTitle: string;
    rowTime: string;
}

export default function TimerRowUI(props: ITimerRowUIProps) {
    return (
        <style.Container>
            <style.RowTitle>{props.rowTitle}</style.RowTitle>
            <style.RowTime>{props.rowTime}</style.RowTime>
        </style.Container>
    );
}
