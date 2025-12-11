import ModeLabelUI from "./ModeLabel.presenter";

interface IModeLabelProps {
    mode: string;
}
export default function ModeLabel(props: IModeLabelProps) {
    return (
        <>
            <ModeLabelUI mode={props.mode} />
        </>
    );
}
