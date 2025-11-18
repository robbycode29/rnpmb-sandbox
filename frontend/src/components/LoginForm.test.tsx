import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { useAppDispatch } from "@/redux/hooks";

jest.mock("@/redux/hooks", () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock("@/redux/slices/authSlice", () => ({
  signUp: jest.fn(() => ({ type: "auth/signUp" })),
}));

jest.mock("@/redux/slices/usersSlice", () => ({
  fetchUsers: jest.fn(() => ({ type: "users/fetchUsers" })),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<LoginForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});


