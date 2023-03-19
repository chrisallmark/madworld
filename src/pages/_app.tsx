import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "semantic-ui-css/semantic.min.css";
export default function App({ Component, pageProps }: AppProps) {
  const description = "NSFW Sega MadWorld Audio Player";
  const path = "/";
  const title = "MadWorld | NSFW Sega MadWorld Audio Player";
  return (
    <>
      <Head>
        <meta content="text/html; charset=UTF-8" httpEquiv="Content-Type" />
        <meta name="description" content="{description}" />
        <title>{title}</title>
        {/* og tags */}
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://mad-world.vercel.app/images/madworld.png"
        />
        <meta property="og:locale" content="en-gb" />
        <meta property="og:site_name" content="MadWorld" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://mad-world.vercel.app${path}`}
        />
        {/* twitter tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:description" content={description} />
        <meta
          property="twitter:image"
          content="https://mad-world.vercel.app/images/madworld.png"
        />
        <meta property="twitter:title" content={title} />
        <meta
          property="twitter:url"
          content={`https://mad-world.vercel.app${path}`}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
