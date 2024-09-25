"use client";

import { useTrack } from "@/hooks";
import { Dropdown } from "semantic-ui-react";
import styled from "styled-components";

export const Track = styled.div`
  .ui {
    .menu {
      background-color: #1b1c1d;
      > .message:not(.ui) {
        color: red;
      }
      .text {
        color: white;
      }
    }
    .search {
      color: white;
    }
  }
`;

export default function ({ tracks }: { tracks: Array<string> }) {
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
        <source src={encodeURI(track)} type="audio/mpeg" />
      </audio>
      <Track>
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
            text: track.slice(track.lastIndexOf("/") + 1).replace(".mp3", ""),
            value: track,
          }))}
          search
          placeholder="Select Track"
          value={track}
        />
      </Track>
    </>
  );
}
