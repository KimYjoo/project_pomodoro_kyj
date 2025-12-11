import * as S from "./ModeLabel.style";

interface IModeLabelUIProps {
    mode: string;
}

export default function ModeLabelUI(props: IModeLabelUIProps) {
    return <S.Mode>{props.mode}</S.Mode>;
}
