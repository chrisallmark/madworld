import * as Styled from "./Splash.styles";
import Image from "next/image";
import { SplashProps } from "./Spash.types";

const Splash = ({ onClick }: SplashProps) => {
  return (
    <>
      <Styled.MadworldSplash href="/madworld" onClick={onClick}>
        <Image
          alt="Madworld Splash"
          fill
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src="/images/madworld-splash.png"
          style={{ objectFit: "contain" }}
        />
      </Styled.MadworldSplash>
      <Styled.ESRB />
    </>
  );
};

export default Splash;
