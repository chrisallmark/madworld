"use client";

import { useBackground, useRain } from "@/hooks";
import { useState } from "react";
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

const BackgroundVideo = styled.video<{ $hidden: boolean }>`
  height: 100%;
  inset: 0;
  object-fit: cover;
  opacity: ${(props) => (props.$hidden ? 0 : 1)};
  pointer-events: none;
  position: absolute;
  transition: opacity 0.2s ease-in-out;
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
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  return (
    <BackgroundDiv $background={background}>
      {!videoFailed ? (
        <BackgroundVideo
          $hidden={!videoReady}
          autoPlay
          loop
          muted
          onCanPlay={() => setVideoReady(true)}
          onError={() => {
            setVideoFailed(true);
            setVideoReady(false);
          }}
          playsInline
        >
          <source
            src={`${process.env.NODE_ENV === "development" ? "/videos/madworld.mp4" : "https://chrisallmark-madworld.s3.eu-west-1.amazonaws.com/videos/madworld.mp4"}`}
            type="video/mp4"
          />
        </BackgroundVideo>
      ) : null}
      {rain}
      <ScanlinesDiv>{children}</ScanlinesDiv>
    </BackgroundDiv>
  );
}
