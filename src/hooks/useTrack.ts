"use client";

import { AudioContext } from "@/components/Audio/Audio";
import { useContext, useEffect } from "react";

let audioContext: AudioContext;
let gainNode: GainNode;
let sourceNode: MediaElementAudioSourceNode;

export function useTrack(track: string) {
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
}
