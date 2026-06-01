import { act, render } from "@testing-library/react";

import { useRain } from "./useRain";

function RainHarness() {
  return useRain();
}

function setWindowWidth(width: number) {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    value: width,
  });
}

describe("useRain", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    setWindowWidth(100);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("renders raindrops based on the window width", () => {
    const { container } = render(<RainHarness />);

    act(() => {
      jest.advanceTimersByTime(16);
    });

    expect(container.querySelectorAll("hr")).toHaveLength(5);
  });

  it("updates raindrops on resize and removes the listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    const { container, unmount } = render(<RainHarness />);

    act(() => {
      jest.advanceTimersByTime(16);
    });

    setWindowWidth(200);
    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(container.querySelectorAll("hr")).toHaveLength(10);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
  });
});
