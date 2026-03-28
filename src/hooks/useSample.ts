"use client";

import { AudioContext } from "@/contexts";
import { useContext, useEffect, useState } from "react";

export function useSample(): {
  sample: string;
  setSample: (sample: string) => void;
  repeat: () => void;
} {
  const [repeat, setRepeat] = useState(0);
  const [sample, setSample] = useState("");
  const { setVolume } = useContext(AudioContext);

  useEffect(() => {
    if (sample.length === 0) {
      return;
    }

    const audio = document.getElementById("sample") as HTMLAudioElement | null;
    if (!audio) {
      return;
    }

    setVolume(0.33);

    const timeoutId = window.setTimeout(() => {
      audio.load();
      audio.onended = () => {
        setVolume(1);
      };
      void audio.play().catch(() => {
        setVolume(1);
      });
    }, 100);

    return () => {
      window.clearTimeout(timeoutId);
      audio.onended = null;
    };
  }, [repeat, sample, setVolume]);

  return { sample, setSample, repeat: () => setRepeat(repeat + 1) };
}
