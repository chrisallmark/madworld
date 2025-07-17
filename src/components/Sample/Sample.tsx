"use client";

import { useSample } from "@/hooks";
import { Button, Dropdown, Grid, Icon } from "semantic-ui-react";
import styled from "styled-components";

export const SampleDiv = styled.div`
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

export default function Sample({ samples }: { samples: Array<string> }) {
  const { sample, setSample, repeat } = useSample();
  return (
    <>
      <audio crossOrigin="anonymous" id="sample">
        <source src={encodeURI(sample)} type="audio/mpeg" />
      </audio>
      <Grid stackable>
        <Grid.Column textAlign="center" width={13}>
          <SampleDiv>
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
          </SampleDiv>
        </Grid.Column>
        <Grid.Column textAlign="left" width={3}>
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
              onClick={() => repeat()}
            >
              <Icon inverted name="repeat" size="large" />
            </Button>
          </Button.Group>
        </Grid.Column>
      </Grid>
    </>
  );
}
