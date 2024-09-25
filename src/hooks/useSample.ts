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
    if (sample.length > 0) {
      const audio = document.getElementById("sample") as HTMLAudioElement;
      setVolume(0.33);
      setTimeout(() => {
        audio.load();
        audio.play();
        audio.addEventListener("ended", () => {
          setVolume(1);
        });
      }, 100);
    }
  }, [repeat, sample]);
  return { sample, setSample, repeat: () => setRepeat(repeat + 1) };
}
