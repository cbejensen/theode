import { User as UserIcon } from "lucide-react";
import { AddSongFormCard } from "@/components/AddSongFormCard";
import { UserSongsList } from "@/components/UserSongsList";
import type { User } from "@/db";

export function User({ user }: { user: User }) {
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <UserIcon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.username}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <UserSongsList userId={user.id} />
        <AddSongFormCard />
      </div>
    </div>
  );
}
