import * as Styled from "./Splash.styles";
import { SplashProps } from "./Splash.types";
import Image from "next/image";

const Splash = ({ onClick }: SplashProps) => {
  return (
    <>
      <Styled.MadworldSplash onClick={onClick}>
        <Image
          alt="Madworld Splash"
          fill
          priority
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
