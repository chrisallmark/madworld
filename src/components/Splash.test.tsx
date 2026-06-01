import { fireEvent, render, screen } from "@testing-library/react";

import { Splash } from "./Splash";

describe("Splash", () => {
  it("renders the splash and ESRB images", () => {
    render(<Splash onClick={jest.fn()} />);

    expect(screen.getByAltText("Madworld Splash")).toBeInTheDocument();
    expect(screen.getByAltText("ESRB")).toBeInTheDocument();
  });

  it("calls onClick when the splash link is selected", () => {
    const onClick = jest.fn();
    render(<Splash onClick={onClick} />);

    fireEvent.click(screen.getByRole("link"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
