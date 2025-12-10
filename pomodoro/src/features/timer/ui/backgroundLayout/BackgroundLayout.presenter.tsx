import * as style from "./BackgroundLayout.style";

export default function BackgroundLayoutUI() {
    return (
        <>
            <style.Layout>
                <style.Overlay></style.Overlay>
                <style.BackgroundVid loop autoPlay muted playsInline>
                    <source src="/videos/timer_background.mp4" />
                </style.BackgroundVid>
            </style.Layout>
        </>
    );
}
