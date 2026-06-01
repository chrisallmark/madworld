import { act, renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";

import { AudioVolumeContext } from "@/contexts";
import { getAudioElement } from "@/helpers/audioElement";

import {
  DUCK_VOLUME,
  FULL_VOLUME,
  SAMPLE_START_DELAY_MS,
} from "./audioConstants";
import { useExtra } from "./useExtra";

jest.mock("@/helpers/audioElement", () => ({
  getAudioElement: jest.fn(),
}));

const mockedGetAudioElement = jest.mocked(getAudioElement);

function createAudioMock() {
  return {
    load: jest.fn(),
    onended: null as null | (() => void),
    play: jest.fn(() => Promise.resolve()),
    src: "",
  };
}

describe("useExtra", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(300_000);
    mockedGetAudioElement.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("plays an encoded extra after the idle delay and restores volume on end", async () => {
    const audio = createAudioMock();
    const notifyAudioPlayed = jest.fn();
    const setVolume = jest.fn();
    jest.spyOn(Math, "random").mockReturnValue(0);
    mockedGetAudioElement.mockReturnValue(audio as unknown as HTMLAudioElement);

    const wrapper = ({ children }: PropsWithChildren) => (
      <AudioVolumeContext.Provider
        value={{
          lastAudioPlayedAt: 300_000,
          notifyAudioPlayed,
          setVolume,
          volume: FULL_VOLUME,
        }}
      >
        {children}
      </AudioVolumeContext.Provider>
    );

    renderHook(() => useExtra(["extras/bonus clip.mp3"]), { wrapper });

    act(() => {
      jest.advanceTimersByTime(60_000);
    });

    expect(audio.src).toContain("extras/bonus%20clip.mp3");
    expect(audio.load).toHaveBeenCalledTimes(1);

    await act(async () => {
      jest.advanceTimersByTime(SAMPLE_START_DELAY_MS);
      await Promise.resolve();
    });

    expect(notifyAudioPlayed).toHaveBeenCalledTimes(1);
    expect(setVolume).toHaveBeenCalledWith(DUCK_VOLUME);
    expect(audio.play).toHaveBeenCalledTimes(1);

    act(() => {
      audio.onended?.();
    });

    expect(setVolume).toHaveBeenLastCalledWith(FULL_VOLUME);
    expect(notifyAudioPlayed).toHaveBeenCalledTimes(2);
  });

  it("does not schedule playback without extras", () => {
    const setTimeoutSpy = jest.spyOn(window, "setTimeout");

    renderHook(() => useExtra([]));

    expect(setTimeoutSpy).not.toHaveBeenCalled();
  });
});
