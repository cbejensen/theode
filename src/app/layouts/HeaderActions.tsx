"use client";

import { Button } from "@/components/ui/button";
import { User as UserIcon, LogOut } from "lucide-react";
import { link } from "@/app/shared/links";
import { User } from "@/db";

export function HeaderActions({ user }: { user?: User }) {
  const handleLogout = () => {
    window.location.href = link("/logout");
  };

  const handleLogin = () => {
    window.location.href = link("/login");
  };

  return (
    <div className="flex items-center space-x-3">
      {user ? (
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (window.location.href = `/users/${user.id}`)}
            className="text-gray-600 hover:text-gray-900"
          >
            <UserIcon className="h-4 w-4 mr-2" />
            {user.username || "Profile"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-900 border-gray-300"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Sign In
        </Button>
      )}
    </div>
  );
}
