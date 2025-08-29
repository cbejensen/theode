"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Save, ArrowLeft } from "lucide-react";
import { updateUsername, getCurrentUser } from "../../lib/user";

export function Settings() {
  const [username, setUsername] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [result, setResult] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const loadCurrentUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setCurrentUsername(user.username);
      }
    };
    loadCurrentUser();
  }, []);

  const performUpdateUsername = async () => {
    try {
      const response = await updateUsername(username);
      if (response.success) {
        setCurrentUsername(username);
        setUsername("");
        setResult("Username updated successfully!");
      } else {
        setResult(response.error || "Failed to update username");
      }
    } catch (error) {
      setResult("Failed to update username");
    }
  };

  const handleUpdateUsername = () => {
    startTransition(() => void performUpdateUsername());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Profile Settings
              </h1>
              <p className="text-gray-600">Manage your account information</p>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">Account Information</CardTitle>
            <CardDescription>
              Update your username and other account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Username Display */}
            {currentUsername && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-700 mb-1">
                  Current Username
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {currentUsername}
                </div>
              </div>
            )}

            {/* Update Username Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="new-username"
                  className="text-sm font-medium text-gray-700"
                >
                  New Username
                </label>
                <Input
                  id="new-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter new username"
                  className="bg-white/50"
                />
              </div>

              <Button
                onClick={handleUpdateUsername}
                disabled={
                  isPending || !username.trim() || username === currentUsername
                }
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
              >
                <Save className="mr-2 h-4 w-4" />
                {isPending ? "Updating..." : "Update Username"}
              </Button>
            </div>

            {result && (
              <div
                className={`p-3 rounded-md text-sm text-center ${
                  result.includes("successfully")
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {result}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Settings */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mt-6">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">Security</CardTitle>
            <CardDescription>
              Manage your authentication settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-blue-900">
                    Passkey Authentication
                  </div>
                  <div className="text-sm text-blue-700">
                    Secure, passwordless login enabled
                  </div>
                </div>
                <div className="text-green-600 font-semibold text-sm">
                  Active
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
