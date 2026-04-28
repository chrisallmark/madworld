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

interface RainDrop {
  animationDelay: string;
  animationDuration: string;
  left: string;
}

const PIXELS_PER_RAINDROP = 20;
const MAX_DELAY_S = 5;
const MIN_DURATION_S = 0.2;
const DURATION_VARIANCE_S = 0.3;
const HORIZONTAL_SPREAD = 1.25;

export function useRain() {
  const [rainDrops, setRainDrops] = useState<Array<RainDrop>>([]);

  useEffect(() => {
    const updateRain = () => {
      setRainDrops(
        Array.from(
          { length: Math.floor(window.innerWidth / PIXELS_PER_RAINDROP) },
          () => ({
            animationDelay: `${Math.random() * MAX_DELAY_S}s`,
            animationDuration: `${MIN_DURATION_S + Math.random() * DURATION_VARIANCE_S}s`,
            left: `${Math.floor(Math.random() * (window.innerWidth * HORIZONTAL_SPREAD))}px`,
          }),
        ),
      );
    };

    const frame = window.requestAnimationFrame(updateRain);
    window.addEventListener("resize", updateRain);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateRain);
    };
  }, []);

  return (
    <>
      {rainDrops.map((rainDrop, index) => (
        <Rain key={index} style={rainDrop} />
      ))}
    </>
  );
}
