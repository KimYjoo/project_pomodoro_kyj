import GlobalStyles from "@/shared/styles/globalStyles";

export default function App({ Component, pageProps }) {
    return (
        <>
            <GlobalStyles />
            <Component {...pageProps} />
        </>
    );
}
