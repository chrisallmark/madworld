"use client";

import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
} from "react";
import { AudioContext } from "../Audio/Audio";
import { SampleProps } from "./Sample.types";

export default forwardRef(function ({ sample }: SampleProps, ref) {
  useImperativeHandle(ref, () => ({ play }));
  const { setVolume } = useContext(AudioContext);
  const play = useCallback(() => {
    const audio = document.getElementById("sample") as HTMLAudioElement;
    setVolume(0.33);
    setTimeout(() => {
      audio.load();
      audio.play();
    }, 100);
  }, [setVolume]);
  useEffect(() => {
    if (sample !== "") {
      play();
    }
  }, [play, sample]);
  const handleEnded = () => {
    setVolume(1);
  };
  return (
    <>
      {sample !== "" && (
        <>
          <audio crossOrigin="anonymous" id="sample" onEnded={handleEnded}>
            <source src={encodeURI(sample)} type="audio/mpeg" />
          </audio>
        </>
      )}
    </>
  );
});
