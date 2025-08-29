"use client";

import { useState, useTransition } from "react";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import {
  finishPasskeyLogin,
  finishPasskeyRegistration,
  startPasskeyLogin,
  startPasskeyRegistration,
} from "../../lib/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KeyRound, Music, Sparkles } from "lucide-react";
import { link } from "@/app/shared/links";

export function Login() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");
  const [isPending, startTransition] = useTransition();

  const passkeyLogin = async () => {
    // 1. Get a challenge from the worker (no username needed for login)
    const options = await startPasskeyLogin();

    // 2. Ask the browser to sign the challenge
    const login = await startAuthentication({ optionsJSON: options });

    // 3. Give the signed challenge to the worker to finish the login process
    const success = await finishPasskeyLogin(login);

    if (!success) {
      setResult("Login failed");
    } else {
      setResult("Login successful!");
      // Redirect to profile page after successful login
      window.location.href = link("/settings");
    }
  };

  const passkeyRegister = async () => {
    // 1. Get a challenge from the worker
    const options = await startPasskeyRegistration(username);

    // 2. Ask the browser to sign the challenge
    const registration = await startRegistration({ optionsJSON: options });

    // 3. Give the signed challenge to the worker to finish the registration process
    const success = await finishPasskeyRegistration(username, registration);

    if (!success) {
      setResult("Registration failed");
    } else {
      setResult("Registration successful!");
    }
  };

  const handlePerformPasskeyLogin = () => {
    startTransition(() => void passkeyLogin());
  };

  const handlePerformPasskeyRegister = () => {
    startTransition(() => void passkeyRegister());
  };

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Music className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Theode
          </h1>
          <p className="text-gray-600">
            Discover and organize songs by their meaning
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">
              Sign in to your account
            </CardTitle>
            <CardDescription className="text-center">
              Use your passkey for secure, passwordless authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button
                onClick={handlePerformPasskeyLogin}
                disabled={isPending}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
              >
                <KeyRound className="mr-2 h-4 w-4" />
                {isPending ? "Authenticating..." : "Sign in with Passkey"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">or</span>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700"
                >
                  Username (for new account)
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  className="bg-white/50"
                />
              </div>

              <Button
                onClick={handlePerformPasskeyRegister}
                disabled={isPending || !username.trim()}
                className="w-full h-11 border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-md"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {isPending ? "Creating account..." : "Create new account"}
              </Button>
            </div>

            {result && (
              <div
                className={`p-3 rounded-md text-sm text-center ${
                  result.includes("successful")
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {result}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Secure authentication powered by WebAuthn</p>
        </div>
      </div>
    </div>
  );
}
