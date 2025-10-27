"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchUsers } from "@/redux/slices/usersSlice";

export default function UsersList() {
  const dispatch = useAppDispatch();
  const { users, status, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  return (
    <div className="p-4 bg-blue-950 shadow-md rounded-md w-full max-w-4xl max-h-[400px] overflow-y-auto block">
      <h2 className="text-xl font-bold mb-4">Users List</h2>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p className="text-red-500">Error: {error}</p>}
      {status === "succeeded" && (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
          <tr className="bg-teal-950">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Active</th>
          </tr>
          </thead>
          <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.isActive ? "Yes" : "No"}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      )}
    </div>
  );
}