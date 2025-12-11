import styled from "@emotion/styled";

export const Layout = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

export const BackgroundVid = styled.video`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    object-fit: cover;
    object-position: center center;
`;

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    z-index: 2;
`;

export const TimerContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
`;
