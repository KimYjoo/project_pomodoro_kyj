import TimeDisplayUI from "./TimeDisplay.presenter";
import { convertMsToTime } from "@/utils/timeUtils.js";

interface ITimerLayout {
    rawTimeData: number;
}

export default function TimeDisplay(props: ITimerLayout) {
    const { hour, minute, second } = convertMsToTime(props.rawTimeData);

    return (
        <>
            <TimeDisplayUI hour={hour} minute={minute} second={second} />
        </>
    );
}
