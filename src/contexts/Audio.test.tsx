import { act, render, screen } from "@testing-library/react";
import { useContext } from "react";

import { AudioVolumeContext, AudioVolumeProvider } from "./Audio";

function AudioVolumeConsumer() {
  const { lastAudioPlayedAt, notifyAudioPlayed, setVolume, volume } =
    useContext(AudioVolumeContext);

  return (
    <div>
      <output aria-label="volume">{volume}</output>
      <output aria-label="last-audio-played-at">{lastAudioPlayedAt}</output>
      <button onClick={() => setVolume(0.25)}>Set volume</button>
      <button onClick={notifyAudioPlayed}>Notify played</button>
    </div>
  );
}

describe("AudioVolumeContext", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("provides safe default values without a provider", () => {
    render(<AudioVolumeConsumer />);

    expect(screen.getByLabelText("volume")).toHaveTextContent("0");
    expect(screen.getByLabelText("last-audio-played-at")).toHaveTextContent(
      "0",
    );

    expect(() => {
      screen.getByRole("button", { name: "Set volume" }).click();
      screen.getByRole("button", { name: "Notify played" }).click();
    }).not.toThrow();
  });

  it("initializes provider state with full volume and the current time", () => {
    jest.useFakeTimers();
    jest.setSystemTime(1_000);

    render(
      <AudioVolumeProvider>
        <AudioVolumeConsumer />
      </AudioVolumeProvider>,
    );

    expect(screen.getByLabelText("volume")).toHaveTextContent("1");
    expect(screen.getByLabelText("last-audio-played-at")).toHaveTextContent(
      "1000",
    );
  });

  it("updates volume through the provider context", () => {
    render(
      <AudioVolumeProvider>
        <AudioVolumeConsumer />
      </AudioVolumeProvider>,
    );

    act(() => {
      screen.getByRole("button", { name: "Set volume" }).click();
    });

    expect(screen.getByLabelText("volume")).toHaveTextContent("0.25");
  });

  it("updates lastAudioPlayedAt when audio playback is notified", () => {
    jest.useFakeTimers();
    jest.setSystemTime(1_000);

    render(
      <AudioVolumeProvider>
        <AudioVolumeConsumer />
      </AudioVolumeProvider>,
    );

    act(() => {
      jest.setSystemTime(2_500);
      screen.getByRole("button", { name: "Notify played" }).click();
    });

    expect(screen.getByLabelText("last-audio-played-at")).toHaveTextContent(
      "2500",
    );
  });
});
