"use client";

import { useTrack } from "@/hooks";

export default function ({
  onEnded,
  track,
}: {
  onEnded?: () => void;
  track: string;
}) {
  useTrack(track);
  return (
    <audio crossOrigin="anonymous" id="track" onEnded={onEnded}>
      <source src={encodeURI(track)} type="audio/mpeg" />
    </audio>
  );
}
