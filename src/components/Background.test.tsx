import { fireEvent, render, screen } from "@testing-library/react";

import { useBackground, useRain } from "@/hooks";

import { Background } from "./Background";

jest.mock("@/hooks", () => ({
  useBackground: jest.fn(),
  useRain: jest.fn(),
}));

const mockedUseBackground = jest.mocked(useBackground);
const mockedUseRain = jest.mocked(useRain);

describe("Background", () => {
  beforeEach(() => {
    mockedUseBackground.mockReturnValue("07");
    mockedUseRain.mockReturnValue(<span data-testid="rain" />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders video, rain, and children", () => {
    const { container } = render(
      <Background videoUrl="/videos/madworld.mp4">
        <button>Enter</button>
      </Background>,
    );

    const video = container.querySelector("video");
    const source = container.querySelector("source");

    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute("autoplay");
    expect(source).toHaveAttribute("src", "/videos/madworld.mp4");
    expect(screen.getByTestId("rain")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Enter" })).toBeInTheDocument();
  });

  it("removes the video after a playback error", () => {
    const { container } = render(<Background videoUrl="/broken.mp4" />);

    const video = container.querySelector("video");
    expect(video).toBeInTheDocument();

    fireEvent.error(video as HTMLVideoElement);

    expect(container.querySelector("video")).not.toBeInTheDocument();
  });

  it("does not render a video when no video URL is provided", () => {
    const { container } = render(<Background />);

    expect(container.querySelector("video")).not.toBeInTheDocument();
  });
});
