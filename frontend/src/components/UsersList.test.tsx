import React from "react";
import { render } from "@testing-library/react";
import UsersList from "./UsersList";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

jest.mock("@/redux/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("@/redux/slices/usersSlice", () => ({
  fetchUsers: jest.fn(() => ({ type: "users/fetchUsers" })),
}));

describe("UsersList", () => {
  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        users: {
          users: [
            { id: 1, email: "john@example.com", isActive: true },
            { id: 2, email: "jane@example.com", isActive: false },
          ],
          status: "succeeded",
          error: null,
        },
      })
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<UsersList />);
    expect(asFragment()).toMatchSnapshot();
  });
});


