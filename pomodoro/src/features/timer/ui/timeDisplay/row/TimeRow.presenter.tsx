import * as S from "./TimeRow.style";

interface ITimerRowUIProps {
    rowTitle: string;
    rowTime: string;
}

export default function TimerRowUI(props: ITimerRowUIProps) {
    return (
        <S.Container>
            <S.RowTitle>{props.rowTitle}</S.RowTitle>
            <S.RowTime>{props.rowTime}</S.RowTime>
        </S.Container>
    );
}
