import { fireEvent, render } from "@testing-library/react";

import { useTrack } from "@/hooks";

import { Track } from "./Track";

jest.mock("@/hooks", () => ({
  useTrack: jest.fn(),
}));

const mockedUseTrack = jest.mocked(useTrack);

describe("Track", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("renders an encoded audio source for the current track", () => {
    mockedUseTrack.mockReturnValue({
      setTrack: jest.fn(),
      track: "tracks/Mad World.mp3",
    });

    const { container } = render(<Track tracks={["tracks/Mad World.mp3"]} />);

    expect(container.querySelector("audio")).toHaveAttribute("id", "track");
    expect(container.querySelector("source")).toHaveAttribute(
      "src",
      "tracks/Mad%20World.mp3",
    );
  });

  it("does not render a source before a track is selected", () => {
    mockedUseTrack.mockReturnValue({
      setTrack: jest.fn(),
      track: "",
    });

    const { container } = render(<Track tracks={["tracks/one.mp3"]} />);

    expect(container.querySelector("source")).not.toBeInTheDocument();
  });

  it("selects a different track when the current track ends", () => {
    const setTrack = jest.fn();
    jest.spyOn(Math, "random").mockReturnValueOnce(0).mockReturnValueOnce(0.75);
    mockedUseTrack.mockReturnValue({
      setTrack,
      track: "tracks/one.mp3",
    });

    const { container } = render(
      <Track tracks={["tracks/one.mp3", "tracks/two.mp3"]} />,
    );

    fireEvent.ended(container.querySelector("audio") as HTMLAudioElement);

    expect(setTrack).toHaveBeenCalledWith("tracks/two.mp3");
  });
});
