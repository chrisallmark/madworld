"use client";

import { Sample, Track } from "@/components";
import { AudioProvider } from "@/contexts";
import { Container, Grid } from "semantic-ui-react";
import styled from "styled-components";

const MadWorldLogo = styled.img`
  max-width: 1366px;
  width: 100%;
`;

export default function Player({
  samples,
  tracks,
}: {
  samples: Array<string>;
  tracks: Array<string>;
}) {
  return (
    <AudioProvider>
      <Container>
        <MadWorldLogo alt="Madword" src="/images/madworld-logo.png" />
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
    </AudioProvider>
  );
}
