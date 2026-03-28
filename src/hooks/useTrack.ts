"use client";

import { AudioContext } from "@/contexts";
import { useContext, useEffect, useRef, useState } from "react";

export function useTrack(tracks: Array<string>): {
  track: string;
  setTrack: (track: string) => void;
} {
  const [track, setTrack] = useState(tracks[0] ?? "");
  const { volume } = useContext(AudioContext);
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    const audio = document.getElementById("track") as HTMLAudioElement | null;
    if (!audio || track.length === 0) {
      return;
    }

    audio.load();
    void audio.play().catch(() => {});

    return () => {
      audio.pause();
    };
  }, [track]);

  useEffect(() => {
    const audio = document.getElementById("track") as HTMLAudioElement | null;
    if (!audio) {
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new window.AudioContext();
    }

    if (!gainNodeRef.current) {
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }

    if (!sourceNodeRef.current) {
      sourceNodeRef.current =
        audioContextRef.current.createMediaElementSource(audio);
      sourceNodeRef.current.connect(gainNodeRef.current);
    }

    gainNodeRef.current.gain.value = volume;
  }, [volume]);

  return { track, setTrack };
}
