import React from "react";
import LoginForm from "@/components/LoginForm";
import UsersList from "@/components/UsersList";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-screen p-4 bg-gray-50">
      <LoginForm />
      <UsersList />
    </div>
  );
}