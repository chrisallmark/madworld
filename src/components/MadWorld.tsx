"use client";

import { Background, Player, Splash } from "@/components";
import { useState } from "react";

interface MadWorldProps {
  samples: Array<string>;
  tracks: Array<string>;
  videoUrl: string;
}

export function MadWorld({ samples, tracks, videoUrl }: MadWorldProps) {
  const [interaction, setInteraction] = useState(false);
  return (
    <Background videoUrl={videoUrl}>
      {interaction ? (
        <Player samples={samples} tracks={tracks} />
      ) : (
        <Splash onClick={() => setInteraction(true)} />
      )}
    </Background>
  );
}
