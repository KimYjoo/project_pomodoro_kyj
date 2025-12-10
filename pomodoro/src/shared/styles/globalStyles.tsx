import { Global, css } from "@emotion/react";

const style = css`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
`;

export default function GlobalStyles() {
    return <Global styles={style} />;
}
