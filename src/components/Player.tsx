import { Audio, Sample, Track } from "@/components";
import { useRef, useState } from "react";
import { Button, Container, Dropdown, Grid, Icon } from "semantic-ui-react";
import * as Styled from "./Player.styles";
import { PlayerProps } from "./Player.types";

const Background = ({ samples, tracks }: PlayerProps) => {
  const [sample, setSample] = useState("");
  const ref = useRef<{
    play: () => void;
  }>();
  return (
    <Container>
      <Audio>
        <Sample ref={ref} sample={sample} />
        <Track tracks={tracks} />
      </Audio>
      <Styled.MadWorldLogo alt="Madword" src="/images/madworld-logo.png" />
      <Grid verticalAlign="middle" columns={3}>
        <Grid.Column textAlign="right" width={4}>
          <Button color="black" icon>
            <Icon
              inverte
              name="random"
              onClick={() =>
                setSample(samples[Math.floor(Math.random() * samples.length)])
              }
              size="large"
            />
          </Button>
        </Grid.Column>
        <Grid.Column textAlign="center" width={8}>
          <Styled.Dropdown>
            <Dropdown
              fluid
              onChange={(_, d) => setSample(d.value as string)}
              options={samples.map((file) => ({
                key: file,
                text: file.replace(".mp3", ""),
                value: file,
              }))}
              placeholder="Select Sound"
              search
              selection
              value={sample}
            />
          </Styled.Dropdown>
        </Grid.Column>
        <Grid.Column textAlign="left" width={4}>
          <Button color="black" disabled={sample === ""} icon>
            <Icon
              inverted
              name="repeat"
              onClick={() => ref.current && ref.current.play()}
              size="large"
            />
          </Button>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Background;
