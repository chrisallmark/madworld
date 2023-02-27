import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "semantic-ui-css/semantic.min.css";
import Head from "next/head";
export default function App({ Component, pageProps }: AppProps) {
  console.log(process.env);
  return (
    <>
      <Head>
        <meta content="text/html; charset=UTF-8" httpEquiv="Content-Type" />
        <meta name="description" content="NSFW Sega MadWorld Audio Player" />
        <title>MadWorld</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
