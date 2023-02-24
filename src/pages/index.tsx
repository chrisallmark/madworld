import { Background, Player, Splash } from "@/components";
import { readdirSync } from "fs";
import { GetServerSideProps } from "next";
import path from "path";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async (_) => {
  const samples = readdirSync(path.join(process.cwd(), "public/samples"));
  const tracks = readdirSync(path.join(process.cwd(), "public/tracks"));
  return {
    props: {
      samples,
      tracks,
    },
  };
};

interface MadWorldProps {
  samples: Array<string>;
  tracks: Array<string>;
}

const MadWorld = ({ samples, tracks }: MadWorldProps) => {
  const [interaction, setInteraction] = useState(false);
  return (
    <Background>
      {interaction && <Player samples={samples} tracks={tracks} />}
      {!interaction && <Splash onClick={() => setInteraction(true)} />}
    </Background>
  );
};

export default MadWorld;
