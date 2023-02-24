import * as Styled from "./Splash.styles";
import { SplashProps } from "./Splash.types";

const Splash = ({ onClick }: SplashProps) => {
  return (
    <div onClick={onClick}>
      <Styled.MadworldSplash
        alt="Madworld Logo"
        src="/images/madworld-splash.png"
      />
    </div>
  );
};

export default Splash;
