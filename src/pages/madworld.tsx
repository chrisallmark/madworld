import { Background, Player, Splash } from "@/components";
import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import { readdirSync } from "fs";
import { GetServerSideProps } from "next";
import path from "path";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async (_) => {
  let samples: Array<string> = [];
  let tracks: Array<string> = [];
  if (process.env.NODE_ENV === "development") {
    samples = readdirSync(path.join(process.cwd(), "public/samples")).map(
      (sample) => `samples/${sample}`
    );
    tracks = readdirSync(path.join(process.cwd(), "public/tracks")).map(
      (track) => `tracks/${track}`
    );
  } else {
    const s3Client = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
      region: process.env.AWS_REGION,
    });
    const sampleObjects = await s3Client.send(
      new ListObjectsCommand({
        Bucket: process.env.AWS_BUCKET,
        Prefix: "madworld/samples",
      })
    );
    if (sampleObjects.Contents) {
      samples = sampleObjects.Contents.filter((content) => content.Size).map(
        (content) =>
          `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${content.Key}`
      );
    }
    const trackObjects = await s3Client.send(
      new ListObjectsCommand({
        Bucket: process.env.AWS_BUCKET,
        Prefix: "madworld/tracks",
      })
    );
    if (trackObjects.Contents) {
      tracks = trackObjects.Contents.filter((content) => content.Size).map(
        (content) =>
          `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${content.Key}`
      );
    }
  }
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
    <>
      <Background>
        {interaction ? (
          <Player samples={samples} tracks={tracks} />
        ) : (
          <Splash onClick={() => setInteraction(true)} />
        )}
      </Background>
    </>
  );
};

export default MadWorld;
