"use client";

import { useContext, useEffect } from "react";

import { AudioVolumeContext } from "@/contexts";
import { getAudioElement } from "@/helpers/audioElement";

import {
  DUCK_VOLUME,
  FULL_VOLUME,
  SAMPLE_START_DELAY_MS,
} from "./audioConstants";

const IDLE_TIMEOUT_MS = 30_000;

export function useExtra(extras: string[]) {
  const { setVolume, lastAudioPlayedAt, notifyAudioPlayed } =
    useContext(AudioVolumeContext);

  useEffect(() => {
    if (!extras.length) return;

    const elapsed = Date.now() - lastAudioPlayedAt;
    const delay = Math.max(0, IDLE_TIMEOUT_MS - elapsed);
    let playTimer: number | undefined;

    const idleTimer = window.setTimeout(() => {
      const audio = getAudioElement("sample");
      if (!audio) return;

      const extra = extras[Math.floor(Math.random() * extras.length)];
      // Load source without any state updates — any setState call here would
      // trigger a re-render that runs effect cleanup and cancels playTimer
      // before it fires.
      audio.src = encodeURI(extra);
      audio.load();

      playTimer = window.setTimeout(() => {
        notifyAudioPlayed();
        setVolume(DUCK_VOLUME);
        audio.onended = () => {
          setVolume(FULL_VOLUME);
          notifyAudioPlayed();
        };
        void audio.play().catch(() => {
          setVolume(FULL_VOLUME);
          notifyAudioPlayed();
        });
      }, SAMPLE_START_DELAY_MS);
    }, delay);

    return () => {
      window.clearTimeout(idleTimer);
      window.clearTimeout(playTimer);
    };
  }, [extras, lastAudioPlayedAt, setVolume, notifyAudioPlayed]);
}
