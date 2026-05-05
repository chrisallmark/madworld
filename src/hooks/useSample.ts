"use client";

import { AudioVolumeContext } from "@/contexts";
import { getAudioElement } from "@/helpers/audioElement";
import { useContext, useEffect, useState } from "react";
import { DUCK_VOLUME, FULL_VOLUME, SAMPLE_START_DELAY_MS } from "./audioConstants";

export function useSample(): {
  sample: string;
  setSample: (sample: string) => void;
  repeat: () => void;
} {
  const [repeat, setRepeat] = useState(0);
  const [sample, setSample] = useState("");
  const { setVolume, notifyAudioPlayed } = useContext(AudioVolumeContext);

  useEffect(() => {
    if (sample.length === 0) {
      return;
    }

    const audio = getAudioElement("sample");
    if (!audio) {
      return;
    }

    notifyAudioPlayed();
    setVolume(DUCK_VOLUME);

    const timeoutId = window.setTimeout(() => {
      audio.removeAttribute("src");
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
  }, [repeat, sample, setVolume, notifyAudioPlayed]);

  return { sample, setSample, repeat: () => setRepeat(repeat + 1) };
}
