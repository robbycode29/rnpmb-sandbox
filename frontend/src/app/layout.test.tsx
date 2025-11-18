import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import RootLayout from "./layout";

jest.mock("next/font/google", () => ({
  Geist: () => ({ variable: "geist-sans" }),
  Geist_Mono: () => ({ variable: "geist-mono" }),
}));

jest.mock("@/app/StoreProvider", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="store-provider">{children}</div>
  ),
}));

describe("Root layout", () => {
  it("matches snapshot", () => {
    const html = renderToStaticMarkup(
      <RootLayout>
        <div>Page content</div>
      </RootLayout>
    );
    expect(html).toMatchSnapshot();
  });
});


