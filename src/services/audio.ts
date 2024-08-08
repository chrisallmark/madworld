import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import { readdirSync } from "fs";
import path from "path";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
  region: process.env.AWS_REGION,
});

export const getSamples = async () => {
  let samples: Array<string> = [];
  if (process.env.NODE_ENV === "development") {
    samples = readdirSync(path.join(process.cwd(), "public/samples")).map(
      (sample) => `samples/${sample}`
    );
  } else {
    const sampleObjects = await s3Client.send(
      new ListObjectsCommand({
        Bucket: process.env.AWS_BUCKET,
        Prefix: "samples",
      })
    );
    if (sampleObjects.Contents) {
      samples = sampleObjects.Contents.filter((content) => content.Size).map(
        (content) =>
          `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${content.Key}`
      );
    }
  }
  return samples;
};

export const getTracks = async () => {
  let tracks: Array<string> = [];
  if (process.env.NODE_ENV === "development") {
    tracks = readdirSync(path.join(process.cwd(), "public/tracks")).map(
      (track) => `tracks/${track}`
    );
  } else {
    const trackObjects = await s3Client.send(
      new ListObjectsCommand({
        Bucket: process.env.AWS_BUCKET,
        Prefix: "tracks",
      })
    );
    if (trackObjects.Contents) {
      tracks = trackObjects.Contents.filter((content) => content.Size).map(
        (content) =>
          `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${content.Key}`
      );
    }
  }
  return tracks;
};
