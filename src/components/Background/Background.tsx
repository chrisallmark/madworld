"use client";

import { useBackground, useRain } from "@/hooks";
import styled from "styled-components";

const BackgroundDiv = styled.div<{ $background: string }>`
  background-image: url("/images/madworld-${(props) => props.$background}.jpg");
  background-position: center;
  background-size: cover;
  height: 100%;
  overflow: hidden;
  position: absolute;
  width: 100%;
`;

export const ScanlinesDiv = styled.div`
  align-items: center;
  background-image: url("/images/scanlines.png");
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: absolute;
  text-align: center;
  width: 100%;
`;

export default function Background({ children }: React.PropsWithChildren) {
  const background = useBackground();
  const rain = useRain();
  return (
    <BackgroundDiv $background={background}>
      {rain}
      <ScanlinesDiv>{children}</ScanlinesDiv>
    </BackgroundDiv>
  );
}
