"use client";

import { Button, Dropdown, Grid, Icon } from "semantic-ui-react";

import { AudioDropdown } from "@/components/AudioDropdown";
import { displayNameFromUrl } from "@/helpers/format";
import { useSample } from "@/hooks";

export function Sample({ samples }: { samples: Array<string> }) {
  const { sample, setSample, repeat } = useSample();
  return (
    <>
      <audio crossOrigin="anonymous" id="sample">
        {sample ? <source src={encodeURI(sample)} type="audio/mpeg" /> : null}
      </audio>
      <Grid stackable>
        <Grid.Column textAlign="center" width={13}>
          <AudioDropdown>
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
                text: displayNameFromUrl(sample),
                value: sample,
              }))}
              placeholder="Select Sample..."
              search
              value={sample}
            />
          </AudioDropdown>
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
