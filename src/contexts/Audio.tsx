"use client";

import { createContext, useCallback, useState } from "react";

export const AudioVolumeContext = createContext<{
  volume: number;
  setVolume: (volume: number) => void;
  lastAudioPlayedAt: number;
  notifyAudioPlayed: () => void;
}>({
  volume: 0,
  setVolume: () => {},
  lastAudioPlayedAt: 0,
  notifyAudioPlayed: () => {},
});

export function AudioVolumeProvider({ children }: React.PropsWithChildren) {
  const [volume, setVolume] = useState(1.0);
  const [lastAudioPlayedAt, setLastAudioPlayedAt] = useState(() => Date.now());
  const notifyAudioPlayed = useCallback(
    () => setLastAudioPlayedAt(Date.now()),
    [],
  );
  return (
    <AudioVolumeContext.Provider
      value={{ volume, setVolume, lastAudioPlayedAt, notifyAudioPlayed }}
    >
      {children}
    </AudioVolumeContext.Provider>
  );
}
