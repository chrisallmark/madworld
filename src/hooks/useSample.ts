"use client";

import { AudioVolumeContext } from "@/contexts";
import { getAudioElement } from "@/helpers/audioElement";
import { useContext, useEffect, useState } from "react";

const DUCK_VOLUME = 0.33;
const FULL_VOLUME = 1;
const SAMPLE_START_DELAY_MS = 100;

export function useSample(): {
  sample: string;
  setSample: (sample: string) => void;
  repeat: () => void;
} {
  const [repeat, setRepeat] = useState(0);
  const [sample, setSample] = useState("");
  const { setVolume } = useContext(AudioVolumeContext);

  useEffect(() => {
    if (sample.length === 0) {
      return;
    }

    const audio = getAudioElement("sample");
    if (!audio) {
      return;
    }

    setVolume(DUCK_VOLUME);

    const timeoutId = window.setTimeout(() => {
      audio.load();
      audio.onended = () => {
        setVolume(FULL_VOLUME);
      };
      void audio.play().catch(() => {
        setVolume(FULL_VOLUME);
      });
    }, SAMPLE_START_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
      audio.onended = null;
    };
  }, [repeat, sample, setVolume]);

  return { sample, setSample, repeat: () => setRepeat(repeat + 1) };
}
