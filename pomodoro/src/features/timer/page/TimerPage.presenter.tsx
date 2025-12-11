import BackgroundLayout from "../ui/backgroundLayout/BackgroundLayout.container";
import Timer from "../ui/timer/Timer.container";
import * as S from "./TimerPage.style";

interface ITimerPageUIProps {
    mode: string;
    rawTimeData: number;
}

export default function TimerPageUI(props: ITimerPageUIProps) {
    return (
        <BackgroundLayout>
            <S.MainContent>
                <Timer mode={props.mode} rawTimeData={props.rawTimeData} />
            </S.MainContent>
        </BackgroundLayout>
    );
}
