import React from "react";
import { render } from "@testing-library/react";
import Home from "./page";

jest.mock("@/components/LoginForm", () => () => <div>LoginForm</div>);
jest.mock("@/components/UsersList", () => () => <div>UsersList</div>);

describe("Home page", () => {
    it("matches snapshot", () => {
        const { asFragment } = render(<Home />);
        expect(asFragment()).toMatchSnapshot();
    });
});
