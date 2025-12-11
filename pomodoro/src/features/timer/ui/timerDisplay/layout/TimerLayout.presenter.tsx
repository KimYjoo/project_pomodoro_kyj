import TimerRow from "../row/TimerRow.container";
import * as S from "./TimerLayout.style";

interface ITimerLayoutUIProps {
    hour: string;
    minute: string;
    second: string;
}

export default function TimerLayoutUI(props: ITimerLayoutUIProps) {
    return (
        <S.Container>
            <TimerRow rowTitle="hour" rowTime={props.hour}></TimerRow>
            <TimerRow rowTitle="minute" rowTime={props.minute}></TimerRow>
            <TimerRow rowTitle="second" rowTime={props.second}></TimerRow>
        </S.Container>
    );
}
