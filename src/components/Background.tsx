import { useEffect, useState } from "react";
import * as Styled from "./Background.styles";

const Background = ({ children }: React.PropsWithChildren) => {
  const [background, setBackground] = useState(0);
  const [rain, setRain] = useState(<></>);
  useEffect(() => {
    setTimeout(() => {
      setBackground(Math.floor(Math.random() * 20));
    }, 30000);
  }, [background, setBackground]);
  useEffect(() => {
    setRain(
      <>
        {Array.from({ length: 100 }, (_, index) => index).map((key) => (
          <Styled.Rain
            key={key}
            style={{
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${0.2 + Math.random() * 0.3}s`,
              left: `${Math.floor(
                Math.random() * (window.innerWidth * 1.5)
              )}px`,
            }}
          />
        ))}
      </>
    );
  }, []);
  return (
    <Styled.Background background={String(background).padStart(2, "0")}>
      {rain}
      <Styled.Scanlines>{children}</Styled.Scanlines>
    </Styled.Background>
  );
};

export default Background;
