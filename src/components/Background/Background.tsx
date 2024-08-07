"use client";

import { useEffect, useState } from "react";
import * as Styled from "./Background.styles";

export default function ({ children }: React.PropsWithChildren) {
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
        {Array.from(
          { length: Math.floor(window.innerWidth / 20) },
          (_, index) => index
        ).map((key) => (
          <Styled.Rain
            key={key}
            style={{
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${0.2 + Math.random() * 0.3}s`,
              left: `${Math.floor(
                Math.random() * (window.innerWidth * 1.25)
              )}px`,
            }}
          />
        ))}
      </>
    );
  }, []);
  return (
    <Styled.Background $background={String(background).padStart(2, "0")}>
      {rain}
      <Styled.Scanlines>{children}</Styled.Scanlines>
    </Styled.Background>
  );
}
