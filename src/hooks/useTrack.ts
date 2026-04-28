"use client";

import { AudioVolumeContext } from "@/contexts";
import { getAudioElement } from "@/helpers/audioElement";
import { useContext, useEffect, useRef, useState } from "react";

function getRandomTrack(tracks: Array<string>) {
  if (tracks.length === 0) {
    return "";
  }

  return tracks[Math.floor(Math.random() * tracks.length)];
}

export function useTrack(tracks: Array<string>): {
  track: string;
  setTrack: (track: string) => void;
} {
  const [track, setTrack] = useState("");
  const { volume } = useContext(AudioVolumeContext);
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setTrack((currentTrack) => {
        if (tracks.length === 0) {
          return "";
        }

        return currentTrack.length > 0 && tracks.includes(currentTrack)
          ? currentTrack
          : getRandomTrack(tracks);
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [tracks]);

  useEffect(() => {
    const audio = getAudioElement("track");
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
    const audio = getAudioElement("track");
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
