import { fireEvent, render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";

import { MadWorld } from "./MadWorld";

jest.mock("@/components", () => ({
  Background: ({
    children,
    videoUrl,
  }: PropsWithChildren<{ videoUrl?: string }>) => (
    <section data-testid="background" data-video-url={videoUrl}>
      {children}
    </section>
  ),
  Player: ({
    extras,
    samples,
    tracks,
  }: {
    extras: Array<string>;
    samples: Array<string>;
    tracks: Array<string>;
  }) => (
    <div
      data-extras={extras.join(",")}
      data-samples={samples.join(",")}
      data-testid="player"
      data-tracks={tracks.join(",")}
    />
  ),
  Splash: ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick}>Splash</button>
  ),
}));

describe("MadWorld", () => {
  const props = {
    extras: ["extras/one.mp3"],
    samples: ["samples/one.mp3"],
    tracks: ["tracks/one.mp3"],
    videoUrl: "/videos/madworld.mp4",
  };

  it("shows the splash before the first interaction", () => {
    render(<MadWorld {...props} />);

    expect(screen.getByTestId("background")).toHaveAttribute(
      "data-video-url",
      props.videoUrl,
    );
    expect(screen.getByRole("button", { name: "Splash" })).toBeInTheDocument();
    expect(screen.queryByTestId("player")).not.toBeInTheDocument();
  });

  it("shows the player after the splash is clicked", () => {
    render(<MadWorld {...props} />);

    fireEvent.click(screen.getByRole("button", { name: "Splash" }));

    expect(screen.getByTestId("player")).toHaveAttribute(
      "data-tracks",
      "tracks/one.mp3",
    );
    expect(screen.getByTestId("player")).toHaveAttribute(
      "data-samples",
      "samples/one.mp3",
    );
    expect(screen.getByTestId("player")).toHaveAttribute(
      "data-extras",
      "extras/one.mp3",
    );
  });
});
