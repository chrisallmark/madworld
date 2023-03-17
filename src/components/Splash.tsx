import * as Styled from "./Splash.styles";
import Image from "next/image";
import Link from "next/link";

const Splash = () => {
  return (
    <>
      <Styled.MadworldSplash>
        <Link href="/madworld">
          <Image
            alt="Madworld Splash"
            fill
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src="/images/madworld-splash.png"
            style={{ objectFit: "contain" }}
          />
        </Link>
      </Styled.MadworldSplash>
      <Styled.ESRB />
    </>
  );
};

export default Splash;
