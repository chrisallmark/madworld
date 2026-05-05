"use client";

import { Sample, Track } from "@/components";
import { AudioVolumeProvider } from "@/contexts";
import { useExtra } from "@/hooks";
import { Container, Grid } from "semantic-ui-react";
import styled from "styled-components";

const MadWorldLogo = styled.img`
  max-width: 1366px;
  width: 100%;
`;

function PlayerContent({
  extras,
  samples,
  tracks,
}: {
  extras: Array<string>;
  samples: Array<string>;
  tracks: Array<string>;
}) {
  useExtra(extras);
  return (
    <Container>
      <MadWorldLogo alt="MadWorld" src="/images/madworld-logo.png" />
      <Grid stackable>
        <Grid.Column width={2} />
        <Grid.Column textAlign="right" width={5}>
          <Track tracks={tracks} />
        </Grid.Column>
        <Grid.Column textAlign="center" width={7}>
          <Sample samples={samples} />
        </Grid.Column>
        <Grid.Column width={2} />
      </Grid>
    </Container>
  );
}

export function Player({
  extras,
  samples,
  tracks,
}: {
  extras: Array<string>;
  samples: Array<string>;
  tracks: Array<string>;
}) {
  return (
    <AudioVolumeProvider>
      <PlayerContent extras={extras} samples={samples} tracks={tracks} />
    </AudioVolumeProvider>
  );
}
