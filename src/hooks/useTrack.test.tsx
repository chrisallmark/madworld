import { act, renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";

import { AudioVolumeContext } from "@/contexts";
import { getAudioElement } from "@/helpers/audioElement";

import { useTrack } from "./useTrack";

jest.mock("@/helpers/audioElement", () => ({
  getAudioElement: jest.fn(),
}));

const mockedGetAudioElement = jest.mocked(getAudioElement);

function createAudioMock() {
  return {
    load: jest.fn(),
    pause: jest.fn(),
    play: jest.fn(() => Promise.resolve()),
  };
}

function mockAudioContext() {
  const gainNode = {
    connect: jest.fn(),
    gain: { value: 0 },
  };
  const sourceNode = { connect: jest.fn() };
  const AudioContext = jest.fn(() => ({
    createGain: jest.fn(() => gainNode),
    createMediaElementSource: jest.fn(() => sourceNode),
    destination: {},
  }));

  Object.defineProperty(window, "AudioContext", {
    configurable: true,
    value: AudioContext,
  });

  return { AudioContext, gainNode, sourceNode };
}

describe("useTrack", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockedGetAudioElement.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("selects a random track and plays it", async () => {
    const audio = createAudioMock();
    jest.spyOn(Math, "random").mockReturnValue(0.75);
    mockAudioContext();
    mockedGetAudioElement.mockReturnValue(audio as unknown as HTMLAudioElement);

    const { result } = renderHook(() =>
      useTrack(["tracks/one.mp3", "tracks/two.mp3"]),
    );

    await act(async () => {
      jest.advanceTimersByTime(16);
      await Promise.resolve();
    });

    expect(result.current.track).toBe("tracks/two.mp3");
    expect(audio.load).toHaveBeenCalledTimes(1);
    expect(audio.play).toHaveBeenCalledTimes(1);
  });

  it("keeps the current track when it remains in the available list", async () => {
    const audio = createAudioMock();
    mockAudioContext();
    mockedGetAudioElement.mockReturnValue(audio as unknown as HTMLAudioElement);

    const { result, rerender } = renderHook(({ tracks }) => useTrack(tracks), {
      initialProps: {
        tracks: ["tracks/one.mp3", "tracks/two.mp3"],
      },
    });

    act(() => {
      result.current.setTrack("tracks/two.mp3");
    });

    rerender({ tracks: ["tracks/two.mp3", "tracks/three.mp3"] });

    await act(async () => {
      jest.advanceTimersByTime(16);
      await Promise.resolve();
    });

    expect(result.current.track).toBe("tracks/two.mp3");
  });

  it("sets the gain node volume from context", () => {
    const audio = createAudioMock();
    const { gainNode } = mockAudioContext();
    mockedGetAudioElement.mockReturnValue(audio as unknown as HTMLAudioElement);

    const wrapper = ({ children }: PropsWithChildren) => (
      <AudioVolumeContext.Provider
        value={{
          lastAudioPlayedAt: 0,
          notifyAudioPlayed: jest.fn(),
          setVolume: jest.fn(),
          volume: 0.33,
        }}
      >
        {children}
      </AudioVolumeContext.Provider>
    );

    renderHook(() => useTrack(["tracks/one.mp3"]), { wrapper });

    expect(gainNode.gain.value).toBe(0.33);
  });
});
