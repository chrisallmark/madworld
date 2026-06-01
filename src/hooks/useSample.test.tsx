import { act, renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";

import { AudioVolumeContext } from "@/contexts";
import { getAudioElement } from "@/helpers/audioElement";

import {
  DUCK_VOLUME,
  FULL_VOLUME,
  SAMPLE_START_DELAY_MS,
} from "./audioConstants";
import { useSample } from "./useSample";

jest.mock("@/helpers/audioElement", () => ({
  getAudioElement: jest.fn(),
}));

const mockedGetAudioElement = jest.mocked(getAudioElement);

function createAudioMock() {
  return {
    load: jest.fn(),
    onended: null as null | (() => void),
    play: jest.fn(() => Promise.resolve()),
    removeAttribute: jest.fn(),
  };
}

describe("useSample", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockedGetAudioElement.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("ducks track volume, plays the sample after a delay, and restores volume on end", async () => {
    const audio = createAudioMock();
    const notifyAudioPlayed = jest.fn();
    const setVolume = jest.fn();
    mockedGetAudioElement.mockReturnValue(audio as unknown as HTMLAudioElement);

    const wrapper = ({ children }: PropsWithChildren) => (
      <AudioVolumeContext.Provider
        value={{
          lastAudioPlayedAt: 0,
          notifyAudioPlayed,
          setVolume,
          volume: FULL_VOLUME,
        }}
      >
        {children}
      </AudioVolumeContext.Provider>
    );

    const { result } = renderHook(() => useSample(), { wrapper });

    act(() => {
      result.current.setSample("sample.mp3");
    });

    expect(notifyAudioPlayed).toHaveBeenCalledTimes(1);
    expect(setVolume).toHaveBeenCalledWith(DUCK_VOLUME);
    expect(audio.play).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(SAMPLE_START_DELAY_MS);
      await Promise.resolve();
    });

    expect(audio.removeAttribute).toHaveBeenCalledWith("src");
    expect(audio.load).toHaveBeenCalledTimes(1);
    expect(audio.play).toHaveBeenCalledTimes(1);

    act(() => {
      audio.onended?.();
    });

    expect(setVolume).toHaveBeenLastCalledWith(FULL_VOLUME);
  });

  it("restores volume when sample playback fails", async () => {
    const audio = createAudioMock();
    const setVolume = jest.fn();
    audio.play.mockRejectedValueOnce(new Error("blocked"));
    mockedGetAudioElement.mockReturnValue(audio as unknown as HTMLAudioElement);

    const wrapper = ({ children }: PropsWithChildren) => (
      <AudioVolumeContext.Provider
        value={{
          lastAudioPlayedAt: 0,
          notifyAudioPlayed: jest.fn(),
          setVolume,
          volume: FULL_VOLUME,
        }}
      >
        {children}
      </AudioVolumeContext.Provider>
    );

    const { result } = renderHook(() => useSample(), { wrapper });

    act(() => {
      result.current.setSample("sample.mp3");
    });

    await act(async () => {
      jest.advanceTimersByTime(SAMPLE_START_DELAY_MS);
      await Promise.resolve();
    });

    expect(setVolume).toHaveBeenLastCalledWith(FULL_VOLUME);
  });
});
