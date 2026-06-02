import { readdirSync } from "fs";
import path from "path";
import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";

function isDevelopment() {
  return process.env.NODE_ENV === "development";
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

let cachedS3Client: S3Client | null = null;

function getS3Client(): S3Client {
  if (!cachedS3Client) {
    cachedS3Client = new S3Client({
      credentials: {
        accessKeyId: requireEnv("AWS_ACCESS_KEY_ID"),
        secretAccessKey: requireEnv("AWS_SECRET_ACCESS_KEY"),
      },
      region: requireEnv("AWS_REGION"),
    });
  }
  return cachedS3Client;
}

function s3PublicUrl(key: string): string {
  const bucket = requireEnv("AWS_BUCKET");
  const region = requireEnv("AWS_REGION");
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

async function listLocal(prefix: string): Promise<Array<string>> {
  return readdirSync(path.join(process.cwd(), "public", "assets", prefix)).map(
    (name) => `/assets/${prefix}/${name}`,
  );
}

async function listS3(prefix: string): Promise<Array<string>> {
  const client = getS3Client();
  const bucket = requireEnv("AWS_BUCKET");
  const keys: Array<string> = [];
  let continuationToken: string | undefined;

  do {
    const response = await client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      }),
    );
    for (const content of response.Contents ?? []) {
      if (content.Size && content.Key) {
        keys.push(content.Key);
      }
    }
    continuationToken = response.IsTruncated
      ? response.NextContinuationToken
      : undefined;
  } while (continuationToken);

  return keys.map(s3PublicUrl);
}

async function listMedia(prefix: string): Promise<Array<string>> {
  return isDevelopment() ? listLocal(prefix) : listS3(prefix);
}

export const getExtras = () => listMedia("extras");
export const getSamples = () => listMedia("samples");
export const getTracks = () => listMedia("tracks");

export function getVideoUrl(): string {
  return isDevelopment()
    ? "/assets/videos/madworld.mp4"
    : s3PublicUrl("videos/madworld.mp4");
}
