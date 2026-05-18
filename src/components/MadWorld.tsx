"use client";

import { useState } from "react";

import { Background, Player, Splash } from "@/components";

interface MadWorldProps {
  extras: Array<string>;
  samples: Array<string>;
  tracks: Array<string>;
  videoUrl: string;
}

export function MadWorld({ extras, samples, tracks, videoUrl }: MadWorldProps) {
  const [interaction, setInteraction] = useState(false);
  return (
    <Background videoUrl={videoUrl}>
      {interaction ? (
        <Player extras={extras} samples={samples} tracks={tracks} />
      ) : (
        <Splash onClick={() => setInteraction(true)} />
      )}
    </Background>
  );
}
