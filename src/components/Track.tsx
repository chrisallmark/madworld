import { useContext, useEffect, useMemo, useState } from "react";
import { AudioContext } from "./Audio";

let audioContext: AudioContext;
let gainNode: GainNode;
let sourceNode: MediaElementAudioSourceNode;

interface TrackProps {
  tracks: Array<string>;
}

const Track = ({ tracks }: TrackProps) => {
  tracks.sort((_, __) => 0.5 - Math.random());
  const [track, setTrack] = useState(0);
  const { volume } = useContext(AudioContext);
  const nextTrack = () => {
    if (track < tracks.length) {
      setTrack(track + 1);
    }
  };
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
  const handleEnded = () => {
    nextTrack();
  };
  return (
    <audio id="track" onEnded={handleEnded}>
      <source src={encodeURI(`/tracks/${tracks[track]}`)} type="audio/mpeg" />
    </audio>
  );
};

export default Track;
