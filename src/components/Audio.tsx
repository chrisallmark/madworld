import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

interface AudioContextProps {
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
}

export const AudioContext = createContext<AudioContextProps>({
  volume: 0,
  setVolume: () => {},
});

const Audio = ({ children }: PropsWithChildren) => {
  const [volume, setVolume] = useState(1.0);
  return (
    <AudioContext.Provider value={{ volume, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
};

export default Audio;
