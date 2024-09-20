"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

const Rain = styled.hr`
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-name: rain;
  animation-timing-function: linear;
  bottom: 100%;
  position: absolute;
  width: 50px;
  @keyframes rain {
    from {
      transform: rotate(100deg) translateX(0);
      transform-origin: top left;
    }
    to {
      transform: rotate(100deg) translateX(calc(100vh + 20px));
      transform-origin: top left;
    }
  }
`;

export function useRain() {
  const [rain, setRain] = useState(<></>);
  useEffect(() => {
    setRain(
      <>
        {Array.from(
          { length: Math.floor(window.innerWidth / 20) },
          (_, index) => index
        ).map((key) => (
          <Rain
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
  return rain;
}
