import { useContext, useEffect } from "react";
import { AudioContext } from "./Audio";
import { TrackProps } from "./Track.types";

let audioContext: AudioContext;
let gainNode: GainNode;
let sourceNode: MediaElementAudioSourceNode;

const Track = ({ onEnded, track }: TrackProps) => {
  const { volume } = useContext(AudioContext);
  useEffect(() => {
    const audio = document.getElementById("track") as HTMLAudioElement;
    if (audio) {
      audio.load();
      audio.play();
    }
  }, [track]);
  useEffect(() => {
    const audio = document.getElementById("track") as HTMLAudioElement;
    if (audio) {
      audioContext = audioContext || new window.AudioContext();
      gainNode = gainNode || audioContext.createGain();
      gainNode.connect(audioContext.destination);
      try {
        sourceNode = sourceNode || audioContext.createMediaElementSource(audio);
        sourceNode.connect(gainNode);
      } catch {}
    }
    gainNode.gain.value = volume;
  }, [volume]);
  return (
    <audio autoPlay crossOrigin="anonymous" id="track" onEnded={onEnded}>
      <source src={encodeURI(track)} type="audio/mpeg" />
    </audio>
  );
};

export default Track;
