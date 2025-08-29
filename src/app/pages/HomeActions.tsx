"use client";

import { Button } from "@/components/ui/button";
import { link } from "@/app/shared/links";
import { User } from "@/db";

export function HomeActions({ user }: { user?: User | null }) {
  return (
    <Button
      onClick={() =>
        (window.location.href = user ? "/users/" + user.id : link("/login"))
      }
      size="lg"
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
    >
      Get Started
    </Button>
  );
}
