"use client";

import { useContext, useEffect } from "react";
import { AudioContext } from "../Audio/Audio";
import { TrackProps } from "./Track.types";

let audioContext: AudioContext;
let gainNode: GainNode;
let sourceNode: MediaElementAudioSourceNode;

export default function ({ onEnded, track }: TrackProps) {
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
      } catch (error) {
        console.error(error);
      }
    }
    gainNode.gain.value = volume;
  }, [volume]);
  return (
    <audio crossOrigin="anonymous" id="track" onEnded={onEnded}>
      <source src={encodeURI(track)} type="audio/mpeg" />
    </audio>
  );
}
