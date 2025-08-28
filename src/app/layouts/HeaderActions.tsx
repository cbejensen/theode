"use client";

import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { link } from "@/app/shared/links";

interface HeaderActionsProps {
  user?: {
    username: string;
  } | null;
}

export function HeaderActions({ user }: HeaderActionsProps) {
  const handleLogout = () => {
    window.location.href = link("/user/logout");
  };

  const handleLogin = () => {
    window.location.href = link("/user/login");
  };

  const handleProfile = () => {
    window.location.href = link("/user/profile");
  };

  return (
    <div className="flex items-center space-x-3">
      {user ? (
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleProfile}
            className="text-gray-600 hover:text-gray-900"
          >
            <User className="h-4 w-4 mr-2" />
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
