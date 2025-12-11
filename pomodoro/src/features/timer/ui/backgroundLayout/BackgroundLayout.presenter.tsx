import * as style from "./BackgroundLayout.style";

interface IBackgroundLayoutUIProps {
    children: JSX.Element;
}

export default function BackgroundLayoutUI(props: IBackgroundLayoutUIProps) {
    return (
        <style.Layout>
            <style.Overlay />
            <style.BackgroundVid loop autoPlay muted playsInline>
                <source src="/videos/timer_background.mp4" />
            </style.BackgroundVid>
            <style.TimerContainer>{props.children}</style.TimerContainer>
        </style.Layout>
    );
}
