"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { link } from "@/app/shared/links";

interface HomeActionsProps {
  user?: {
    username: string;
  } | null;
}

export function HomeActions({ user }: HomeActionsProps) {
  const handleGetStarted = () => {
    window.location.href = link("/user/login");
  };

  const handleExplore = () => {
    window.location.href = link("/user/profile");
  };

  return (
    <Button
      onClick={user ? handleExplore : handleGetStarted}
      size="lg"
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
    >
      Get Started
    </Button>
  );
}
