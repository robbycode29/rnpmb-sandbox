import React from "react";
import { render } from "@testing-library/react";
import LandingPage from "./page";

describe("App landing page", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<LandingPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});


