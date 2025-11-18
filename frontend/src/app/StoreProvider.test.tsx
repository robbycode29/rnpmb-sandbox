import React from "react";
import { render } from "@testing-library/react";
import StoreProvider from "./StoreProvider";

describe("StoreProvider", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(
      <StoreProvider>
        <div>Child component</div>
      </StoreProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});


