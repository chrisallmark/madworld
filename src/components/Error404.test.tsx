import { render, screen } from "@testing-library/react";

import { Error404 } from "./Error404";

describe("Error404", () => {
  it("links the error image back to the home page", () => {
    render(<Error404 />);

    expect(screen.getByAltText("Error 404")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
