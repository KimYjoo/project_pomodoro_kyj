export { changeSecondToMicro, changeMicroToSecond, timeFormatMMSS };

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
