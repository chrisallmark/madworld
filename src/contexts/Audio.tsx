"use client";

import { createContext, useState } from "react";

export const AudioVolumeContext = createContext<{
  volume: number;
  setVolume: (volume: number) => void;
}>({
  volume: 0,
  setVolume: () => {},
});

export function AudioVolumeProvider({ children }: React.PropsWithChildren) {
  const [volume, setVolume] = useState(1.0);
  return (
    <AudioVolumeContext.Provider value={{ volume, setVolume }}>
      {children}
    </AudioVolumeContext.Provider>
  );
}
