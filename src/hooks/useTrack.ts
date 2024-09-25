"use client";

import { AudioContext } from "@/contexts";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

let audioContext: AudioContext;
let gainNode: GainNode;
let sourceNode: MediaElementAudioSourceNode;

export function useTrack(tracks: Array<string>): {
  track: string;
  setTrack: (track: string) => void;
} {
  const [track, setTrack] = useState(
    tracks[Math.floor(Math.random() * tracks.length)]
  );
  const { volume } = useContext(AudioContext);
  useEffect(() => {
    const audio = document.getElementById("track") as HTMLAudioElement;
    audio.load();
    audio.play().catch((reason) => {
      console.log(reason);
    });
    return () => {
      audio.pause();
    };
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
      } catch (error) {
        console.error(error);
      }
    }
    gainNode.gain.value = volume;
  }, [volume]);
  return { track, setTrack };
}
