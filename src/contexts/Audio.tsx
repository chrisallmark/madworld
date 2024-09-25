"use client";

import { createContext, useMemo, useState } from "react";

export const AudioContext = createContext<{
  volume: number;
  setVolume: (volume: number) => void;
}>({
  volume: 0,
  setVolume: () => {},
});

export function AudioProvider({ children }: React.PropsWithChildren) {
  const [volume, setVolume] = useState(1.0);
  return (
    <AudioContext.Provider value={{ volume, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
}
