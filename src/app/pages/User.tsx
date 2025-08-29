import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User as UserIcon, Music } from "lucide-react";
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
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <UserIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {user.username}
              </h1>
              <p className="text-gray-600">User Profile</p>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl flex items-center">
              <Music className="h-5 w-5 mr-2 text-primary" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-700 mb-1">
                Username
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {user.username}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-700 mb-1">
                User ID
              </div>
              <div className="text-sm text-gray-600 font-mono">{user.id}</div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900 mb-1">
                Status
              </div>
              <div className="text-sm text-blue-700">
                Active member of Theode
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
