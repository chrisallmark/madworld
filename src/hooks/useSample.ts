"use client";

import { AudioContext } from "@/components/Audio/Audio";
import {
  ForwardedRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
} from "react";

export function useSample(sample: string, ref: ForwardedRef<unknown>) {
  const { setVolume } = useContext(AudioContext);
  const play = useCallback(() => {
    const audio = document.getElementById("sample") as HTMLAudioElement;
    setVolume(0.33);
    setTimeout(() => {
      audio.load();
      audio.play();
    }, 100);
  }, [setVolume]);
  useImperativeHandle(ref, () => ({ play }));
  useEffect(() => {
    if (sample.length > 0) {
      play();
    }
  }, [play, sample]);
}
