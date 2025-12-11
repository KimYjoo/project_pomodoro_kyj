import TimerLayoutUI from "./TimerLayout.presenter";
import { convertMsToTime } from "@/utils/timeUtils.js";

interface ITimerLayout {
    rawTimeData: number;
}

export default function TimerLayout(props: ITimerLayout) {
    const { hour, minute, second } = convertMsToTime(props.rawTimeData);

    return (
        <>
            <TimerLayoutUI hour={hour} minute={minute} second={second} />
        </>
    );
}
