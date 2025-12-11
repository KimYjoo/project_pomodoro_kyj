export { changeSecondToMicro, changeMicroToSecond, timeFormatMMSS, convertMsToTime };

function changeSecondToMicro(second) {
    return second * 1000;
}

function changeMicroToSecond(micro) {
    return Math.ceil(micro / 1000);
}

function timeFormatMMSS(time) {
    const mm = String(Math.floor(time / 60)).padStart(2, "0");
    const ss = String(time % 60).padStart(2, "0");
    return `${mm}:${ss}`;
}

function convertMsToTime(time) {
    const second = String(time % 60).padStart(2, "0");
    const minute = String(time / 60).padStart(2, "0");
    const hour = String(minute / 60).padStart(2, "0");

    return {
        hour,
        minute,
        second,
    };
}
