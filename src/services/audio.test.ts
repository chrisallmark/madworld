import path from "path";

const ORIGINAL_ENV = process.env;

function replaceEnv(env: Record<string, string | undefined> = {}) {
  Object.defineProperty(process, "env", {
    configurable: true,
    value: { ...ORIGINAL_ENV, ...env },
    writable: true,
  });
}

type S3Response = {
  Contents?: Array<{ Key?: string; Size?: number }>;
  IsTruncated?: boolean;
  NextContinuationToken?: string;
};

async function loadAudioService({
  localEntries = ["one.mp3", "two.mp3"],
  s3Responses = [],
}: {
  localEntries?: Array<string>;
  s3Responses?: Array<S3Response>;
} = {}) {
  const readdirSync = jest.fn(() => localEntries);
  const send = jest.fn();

  for (const response of s3Responses) {
    send.mockResolvedValueOnce(response);
  }

  const S3Client = jest.fn(() => ({ send }));
  const ListObjectsV2Command = jest.fn((input) => ({ input }));

  jest.doMock("fs", () => ({ readdirSync }));
  jest.doMock("@aws-sdk/client-s3", () => ({
    ListObjectsV2Command,
    S3Client,
  }));

  const service = await import("./audio");

  return {
    ListObjectsV2Command,
    readdirSync,
    S3Client,
    send,
    service,
  };
}

describe("audio service", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    replaceEnv();
  });

  afterAll(() => {
    Object.defineProperty(process, "env", {
      configurable: true,
      value: ORIGINAL_ENV,
      writable: true,
    });
  });

  it("lists local extras, samples, and tracks in development", async () => {
    replaceEnv({ NODE_ENV: "development" });
    const { readdirSync, service } = await loadAudioService();

    await expect(service.getExtras()).resolves.toEqual([
      "extras/one.mp3",
      "extras/two.mp3",
    ]);
    await expect(service.getSamples()).resolves.toEqual([
      "samples/one.mp3",
      "samples/two.mp3",
    ]);
    await expect(service.getTracks()).resolves.toEqual([
      "tracks/one.mp3",
      "tracks/two.mp3",
    ]);

    expect(readdirSync).toHaveBeenNthCalledWith(
      1,
      path.join(process.cwd(), "public", "extras"),
    );
    expect(readdirSync).toHaveBeenNthCalledWith(
      2,
      path.join(process.cwd(), "public", "samples"),
    );
    expect(readdirSync).toHaveBeenNthCalledWith(
      3,
      path.join(process.cwd(), "public", "tracks"),
    );
  });

  it("returns the local video path in development", async () => {
    replaceEnv({ NODE_ENV: "development" });
    const { service } = await loadAudioService();

    expect(service.getVideoUrl()).toBe("/videos/madworld.mp4");
  });

  it("lists paginated S3 media and filters empty folder entries", async () => {
    replaceEnv({
      AWS_ACCESS_KEY_ID: "access-key",
      AWS_BUCKET: "madworld-assets",
      AWS_REGION: "eu-west-2",
      AWS_SECRET_ACCESS_KEY: "secret-key",
      NODE_ENV: "production",
    });

    const { ListObjectsV2Command, S3Client, send, service } =
      await loadAudioService({
        s3Responses: [
          {
            Contents: [
              { Key: "tracks/", Size: 0 },
              { Key: "tracks/song-one.mp3", Size: 10 },
            ],
            IsTruncated: true,
            NextContinuationToken: "next-page",
          },
          {
            Contents: [
              { Key: "tracks/song-two.mp3", Size: 20 },
              { Key: undefined, Size: 30 },
            ],
            IsTruncated: false,
          },
        ],
      });

    await expect(service.getTracks()).resolves.toEqual([
      "https://madworld-assets.s3.eu-west-2.amazonaws.com/tracks/song-one.mp3",
      "https://madworld-assets.s3.eu-west-2.amazonaws.com/tracks/song-two.mp3",
    ]);

    expect(S3Client).toHaveBeenCalledWith({
      credentials: {
        accessKeyId: "access-key",
        secretAccessKey: "secret-key",
      },
      region: "eu-west-2",
    });
    expect(ListObjectsV2Command).toHaveBeenNthCalledWith(1, {
      Bucket: "madworld-assets",
      Prefix: "tracks",
      ContinuationToken: undefined,
    });
    expect(ListObjectsV2Command).toHaveBeenNthCalledWith(2, {
      Bucket: "madworld-assets",
      Prefix: "tracks",
      ContinuationToken: "next-page",
    });
    expect(send).toHaveBeenCalledTimes(2);
  });

  it("reuses the S3 client across service calls", async () => {
    replaceEnv({
      AWS_ACCESS_KEY_ID: "access-key",
      AWS_BUCKET: "madworld-assets",
      AWS_REGION: "eu-west-2",
      AWS_SECRET_ACCESS_KEY: "secret-key",
      NODE_ENV: "production",
    });

    const { S3Client, service } = await loadAudioService({
      s3Responses: [
        { Contents: [{ Key: "extras/extra.mp3", Size: 1 }] },
        { Contents: [{ Key: "samples/sample.mp3", Size: 1 }] },
      ],
    });

    await service.getExtras();
    await service.getSamples();

    expect(S3Client).toHaveBeenCalledTimes(1);
  });

  it("returns an S3 video URL outside development", async () => {
    replaceEnv({
      AWS_BUCKET: "madworld-assets",
      AWS_REGION: "eu-west-2",
      NODE_ENV: "production",
    });
    const { service } = await loadAudioService();

    expect(service.getVideoUrl()).toBe(
      "https://madworld-assets.s3.eu-west-2.amazonaws.com/videos/madworld.mp4",
    );
  });

  it("throws when a required production environment variable is missing", async () => {
    replaceEnv({
      AWS_ACCESS_KEY_ID: "access-key",
      AWS_BUCKET: "madworld-assets",
      AWS_REGION: undefined,
      AWS_SECRET_ACCESS_KEY: "secret-key",
      NODE_ENV: "production",
    });

    const { service } = await loadAudioService();

    await expect(service.getTracks()).rejects.toThrow(
      "Missing required environment variable: AWS_REGION",
    );
  });
});
