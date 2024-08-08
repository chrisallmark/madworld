import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "semantic-ui-css/semantic.min.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["200", "400", "600"] });

export const metadata: Metadata = {
  description: "NSFW Sega MadWorld Audio Player",
  metadataBase: new URL("https://mad-world.vercel.app"),
  openGraph: {
    images: ["images/madworld.png"],
  },
  title: "MadWorld | NSFW Sega MadWorld Audio Player",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ui`}
        style={{ backgroundColor: "black" }}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
