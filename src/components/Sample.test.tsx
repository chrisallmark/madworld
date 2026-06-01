import { fireEvent, render, screen } from "@testing-library/react";

import { useSample } from "@/hooks";

import { Sample } from "./Sample";

jest.mock("@/hooks", () => ({
  useSample: jest.fn(),
}));

const mockedUseSample = jest.mocked(useSample);

describe("Sample", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("renders an encoded audio source for the current sample", () => {
    mockedUseSample.mockReturnValue({
      repeat: jest.fn(),
      sample: "samples/Bonus Points.mp3",
      setSample: jest.fn(),
    });

    const { container } = render(
      <Sample samples={["samples/Bonus Points.mp3"]} />,
    );

    expect(container.querySelector("audio")).toHaveAttribute("id", "sample");
    expect(container.querySelector("source")).toHaveAttribute(
      "src",
      "samples/Bonus%20Points.mp3",
    );
  });

  it("disables repeat until a sample is selected", () => {
    mockedUseSample.mockReturnValue({
      repeat: jest.fn(),
      sample: "",
      setSample: jest.fn(),
    });

    render(<Sample samples={["samples/one.mp3"]} />);

    expect(screen.getAllByRole("button")[1]).toBeDisabled();
  });

  it("selects a random sample from the list", () => {
    const setSample = jest.fn();
    jest.spyOn(Math, "random").mockReturnValue(0.75);
    mockedUseSample.mockReturnValue({
      repeat: jest.fn(),
      sample: "",
      setSample,
    });

    render(<Sample samples={["samples/one.mp3", "samples/two.mp3"]} />);

    fireEvent.click(screen.getAllByRole("button")[0]);

    expect(setSample).toHaveBeenCalledWith("samples/two.mp3");
  });

  it("repeats the selected sample", () => {
    const repeat = jest.fn();
    mockedUseSample.mockReturnValue({
      repeat,
      sample: "samples/one.mp3",
      setSample: jest.fn(),
    });

    render(<Sample samples={["samples/one.mp3"]} />);

    fireEvent.click(screen.getAllByRole("button")[1]);

    expect(repeat).toHaveBeenCalledTimes(1);
  });
});
