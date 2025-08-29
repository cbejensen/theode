import { RequestInfo } from "rwsdk/worker";
import { Music } from "lucide-react";
import { link } from "@/app/shared/links";

export function Home({ ctx }: RequestInfo) {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-4 rounded-full">
            <Music className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Welcome to Theode
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Find songs by lyrical content
        </p>
        {ctx.user?.username && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto mb-8">
            <p className="text-green-800">
              Welcome back,{" "}
              <span className="font-semibold">{ctx.user.username}</span>!
            </p>
          </div>
        )}
        <a
          href={
            ctx.user ? link("/users/:id", { id: ctx.user.id }) : link("/login")
          }
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
