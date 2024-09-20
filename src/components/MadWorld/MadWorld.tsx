"use client";

import { Background, Player, Splash } from "@/components";
import { useState } from "react";

interface MadWorldProps {
  samples: Array<string>;
  tracks: Array<string>;
}

export default function ({ samples, tracks }: MadWorldProps) {
  const [interaction, setInteraction] = useState(false);
  return (
    <Background>
      {interaction ? (
        <Player samples={samples} tracks={tracks} />
      ) : (
        <Splash onClick={() => setInteraction(true)} />
      )}
    </Background>
  );
}
