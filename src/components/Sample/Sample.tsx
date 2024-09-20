"use client";

import { AudioContext } from "@/components/Audio/Audio";
import { useSample } from "@/hooks";
import { forwardRef, useContext } from "react";

export default forwardRef(function ({ sample }: { sample: string }, ref) {
  useSample(sample, ref);
  const { setVolume } = useContext(AudioContext);
  return sample.length === 0 ? (
    <></>
  ) : (
    <audio crossOrigin="anonymous" id="sample" onEnded={() => setVolume(1)}>
      <source src={encodeURI(sample)} type="audio/mpeg" />
    </audio>
  );
});
