"use client";

import { User as UserIcon, LogOut } from "lucide-react";
import { link } from "@/app/shared/links";
import { User } from "@/db";

export function HeaderActions({ user }: { user?: User | null }) {
  return (
    <div className="flex items-center space-x-3">
      {user ? (
        <div className="flex items-center space-x-3">
          <a
            href={link("/users/:id", { id: user.id })}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 text-gray-600 hover:text-gray-900 hover:bg-accent hover:text-accent-foreground"
          >
            <UserIcon className="h-4 w-4 mr-2" />
            {user.username || "Profile"}
          </a>
          <a
            href={link("/logout")}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground text-gray-600 hover:text-gray-900 border-gray-300"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </a>
        </div>
      ) : (
        <a
          href={link("/login")}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Sign In
        </a>
      )}
    </div>
  );
}
