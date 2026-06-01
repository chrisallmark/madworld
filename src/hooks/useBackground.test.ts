import { act, renderHook } from "@testing-library/react";

import { useBackground } from "./useBackground";

describe("useBackground", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("starts at the first background and rotates on an interval", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.42);

    const { result } = renderHook(() => useBackground());

    expect(result.current).toBe("00");

    act(() => {
      jest.advanceTimersByTime(30_000);
    });

    expect(result.current).toBe("08");
  });

  it("clears the rotation interval on unmount", () => {
    const clearIntervalSpy = jest.spyOn(window, "clearInterval");

    const { unmount } = renderHook(() => useBackground());
    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
