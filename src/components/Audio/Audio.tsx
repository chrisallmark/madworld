"use client";

import { createContext, useMemo, useState } from "react";

export const AudioContext = createContext<{
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}>({
  volume: 0,
  setVolume: () => {},
});

export default function ({ children }: React.PropsWithChildren) {
  const [volume, setVolume] = useState(1.0);
  const value = useMemo(() => ({ volume, setVolume }), [volume, setVolume]);
  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}
