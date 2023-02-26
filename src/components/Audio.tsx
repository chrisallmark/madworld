import { createContext, useMemo, useState } from "react";

interface AudioContextProps {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

export const AudioContext = createContext<AudioContextProps>({
  volume: 0,
  setVolume: () => {},
});

const Audio = ({ children }: React.PropsWithChildren) => {
  const [volume, setVolume] = useState(1.0);
  const value = useMemo(() => ({ volume, setVolume }), [volume, setVolume]);
  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export default Audio;
