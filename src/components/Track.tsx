"use client";

import { AudioDropdown } from "@/components/AudioDropdown";
import { useTrack } from "@/hooks";
import { displayNameFromUrl } from "@/helpers/format";
import { Dropdown } from "semantic-ui-react";

export function Track({ tracks }: { tracks: Array<string> }) {
  const { track, setTrack } = useTrack(tracks);
  return (
    <>
      <audio
        crossOrigin="anonymous"
        id="track"
        onEnded={() => {
          let shuffle = track;
          while (shuffle === track) {
            shuffle = tracks[Math.floor(Math.random() * tracks.length)];
          }
          setTrack(shuffle);
        }}
      >
        {track.length > 0 && (
          <source src={encodeURI(track)} type="audio/mpeg" />
        )}
      </audio>
      <AudioDropdown>
        <Dropdown
          button
          className="black icon"
          icon="music"
          floating
          fluid
          labeled
          onChange={(_, d) => setTrack(d.value as string)}
          options={tracks.map((track) => ({
            key: track,
            text: displayNameFromUrl(track),
            value: track,
          }))}
          search
          placeholder="Select Track"
          value={track}
        />
      </AudioDropdown>
    </>
  );
}
