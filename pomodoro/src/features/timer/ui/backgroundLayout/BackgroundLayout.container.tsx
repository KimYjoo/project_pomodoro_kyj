import BackgroundLayoutUI from "./BackgroundLayout.presenter";

interface IBackgroundLayoutProps {
    children: JSX.Element;
}

export default function BackgroundLayout(props: IBackgroundLayoutProps) {
    return <BackgroundLayoutUI children={props.children} />;
}
