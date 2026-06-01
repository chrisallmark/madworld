import { render, screen } from "@testing-library/react";

import { MadWorld } from "@/components";
import {
  getExtras,
  getSamples,
  getTracks,
  getVideoUrl,
} from "@/services/audio";

import Page, { dynamic } from "./page";

jest.mock("@/services/audio", () => ({
  getExtras: jest.fn(),
  getSamples: jest.fn(),
  getTracks: jest.fn(),
  getVideoUrl: jest.fn(),
}));

jest.mock("@/components", () => ({
  MadWorld: jest.fn(
    ({
      extras,
      samples,
      tracks,
      videoUrl,
    }: {
      extras: Array<string>;
      samples: Array<string>;
      tracks: Array<string>;
      videoUrl: string;
    }) => (
      <div
        data-extras={extras.join(",")}
        data-samples={samples.join(",")}
        data-testid="mad-world"
        data-tracks={tracks.join(",")}
        data-video-url={videoUrl}
      />
    ),
  ),
}));

const mockedGetExtras = jest.mocked(getExtras);
const mockedGetSamples = jest.mocked(getSamples);
const mockedGetTracks = jest.mocked(getTracks);
const mockedGetVideoUrl = jest.mocked(getVideoUrl);
const mockedMadWorld = jest.mocked(MadWorld);

describe("Page", () => {
  beforeEach(() => {
    mockedGetExtras.mockResolvedValue(["extras/one.mp3"]);
    mockedGetSamples.mockResolvedValue(["samples/one.mp3"]);
    mockedGetTracks.mockResolvedValue(["tracks/one.mp3"]);
    mockedGetVideoUrl.mockReturnValue("/videos/madworld.mp4");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("forces dynamic rendering", () => {
    expect(dynamic).toBe("force-dynamic");
  });

  it("loads media and renders MadWorld with the resolved props", async () => {
    render(await Page());

    expect(mockedGetExtras).toHaveBeenCalledTimes(1);
    expect(mockedGetSamples).toHaveBeenCalledTimes(1);
    expect(mockedGetTracks).toHaveBeenCalledTimes(1);
    expect(mockedGetVideoUrl).toHaveBeenCalledTimes(1);

    expect(mockedMadWorld).toHaveBeenCalledWith(
      {
        extras: ["extras/one.mp3"],
        samples: ["samples/one.mp3"],
        tracks: ["tracks/one.mp3"],
        videoUrl: "/videos/madworld.mp4",
      },
      undefined,
    );

    expect(screen.getByTestId("mad-world")).toHaveAttribute(
      "data-extras",
      "extras/one.mp3",
    );
    expect(screen.getByTestId("mad-world")).toHaveAttribute(
      "data-samples",
      "samples/one.mp3",
    );
    expect(screen.getByTestId("mad-world")).toHaveAttribute(
      "data-tracks",
      "tracks/one.mp3",
    );
    expect(screen.getByTestId("mad-world")).toHaveAttribute(
      "data-video-url",
      "/videos/madworld.mp4",
    );
  });
});
