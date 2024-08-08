"use client";

import { Audio, Sample, Track } from "@/components";
import { useRef, useState } from "react";
import { Button, Container, Dropdown, Grid, Icon } from "semantic-ui-react";
import * as Styled from "./Player.styles";
import { PlayerProps } from "./Player.types";

export default function ({ samples, tracks }: PlayerProps) {
  const [sample, setSample] = useState("");
  const [track, setTrack] = useState(
    tracks[Math.floor(Math.random() * tracks.length)]
  );
  const ref = useRef<{
    play: () => void;
  }>();
  return (
    <Container>
      <Audio>
        <Sample ref={ref} sample={sample} />
        <Track
          onEnded={() => {
            let shuffle = track;
            while (shuffle === track) {
              shuffle = tracks[Math.floor(Math.random() * tracks.length)];
            }
            setTrack(shuffle);
          }}
          track={track}
        />
      </Audio>
      <Styled.MadWorldLogo alt="Madword" src="/images/madworld-logo.png" />
      <Grid columns={4} stackable>
        <Grid.Column width={2} />
        <Grid.Column textAlign="right" width={5}>
          <Styled.Dropdown>
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
                text: track
                  .slice(track.lastIndexOf("/") + 1)
                  .replace(".mp3", ""),
                value: track,
              }))}
              search
              placeholder="Select Track"
              value={track}
            />
          </Styled.Dropdown>
        </Grid.Column>
        <Grid.Column textAlign="center" width={6}>
          <Styled.Dropdown>
            <Dropdown
              button
              className="black icon"
              icon="microphone"
              floating
              fluid
              labeled
              onChange={(_, d) => setSample(d.value as string)}
              options={samples.map((sample) => ({
                key: sample,
                text: sample
                  .slice(sample.lastIndexOf("/") + 1)
                  .replace(".mp3", ""),
                value: sample,
              }))}
              placeholder="Select Sample..."
              search
              value={sample}
            />
          </Styled.Dropdown>
        </Grid.Column>
        <Grid.Column textAlign="left" width={1}>
          <Button.Group fluid>
            <Button
              color="black"
              icon
              onClick={() =>
                setSample(samples[Math.floor(Math.random() * samples.length)])
              }
            >
              <Icon inverted name="random" size="large" />
            </Button>
            <Button
              color="black"
              disabled={sample === ""}
              icon
              onClick={() => ref.current && ref.current.play()}
            >
              <Icon inverted name="repeat" size="large" />
            </Button>
          </Button.Group>
        </Grid.Column>
        <Grid.Column width={2} />
      </Grid>
    </Container>
  );
}
