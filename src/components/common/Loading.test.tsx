import { render, screen } from "@testing-library/react";
import { Loading, Props } from "./Loading";

describe("<Loading>", () => {
  it("should render loading screen", () => {
    render(<Loading isLoading={true}>Test</Loading>);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render children", () => {
    render(<Loading isLoading={false}>Test</Loading>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
