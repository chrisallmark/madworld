import Image from "next/image";
import * as Styled from "./Splash.styles";
import { SplashProps } from "./Splash.types";

const Splash = ({ onClick }: SplashProps) => {
  return (
    <div onClick={onClick}>
      <Styled.MadworldSkull
        alt="Madworld Logo"
        src="/images/madworld-skull.png"
      />
      <br />
      <Image alt="Press A" height={30} src="/images/press-a.png" width={120} />
    </div>
  );
};

export default Splash;
