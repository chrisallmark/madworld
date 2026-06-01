import { render, screen } from "@testing-library/react";

import { useExtra } from "@/hooks";

import { Player } from "./Player";

jest.mock("@/hooks", () => ({
  useExtra: jest.fn(),
}));

jest.mock("@/components", () => ({
  Sample: ({ samples }: { samples: Array<string> }) => (
    <div data-samples={samples.join(",")} data-testid="sample" />
  ),
  Track: ({ tracks }: { tracks: Array<string> }) => (
    <div data-testid="track" data-tracks={tracks.join(",")} />
  ),
}));

const mockedUseExtra = jest.mocked(useExtra);

describe("Player", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the logo and passes media lists to child components", () => {
    render(
      <Player
        extras={["extras/one.mp3"]}
        samples={["samples/one.mp3"]}
        tracks={["tracks/one.mp3"]}
      />,
    );

    expect(screen.getByAltText("MadWorld")).toHaveAttribute(
      "src",
      "/images/madworld-logo.png",
    );
    expect(mockedUseExtra).toHaveBeenCalledWith(["extras/one.mp3"]);
    expect(screen.getByTestId("track")).toHaveAttribute(
      "data-tracks",
      "tracks/one.mp3",
    );
    expect(screen.getByTestId("sample")).toHaveAttribute(
      "data-samples",
      "samples/one.mp3",
    );
  });
});
