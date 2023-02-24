import { useContext, useEffect, useState } from "react";
import { AudioContext } from "./Audio";

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
      audio.volume = volume;
    }
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
