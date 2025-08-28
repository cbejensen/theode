import type { LayoutProps } from "rwsdk/router";
import { Music } from "lucide-react";
import { link } from "@/app/shared/links";
import { HeaderActions } from "./HeaderActions";

export function AppLayout({ children, requestInfo }: LayoutProps) {
  // Extract user info from request context if available
  const user = requestInfo?.ctx?.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <a href={link("/")} className="flex items-center space-x-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Music className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xl font-bold text-gray-900">Theode</span>
              </a>
            </div>

            {/* Auth Section */}
            <HeaderActions user={user} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Music className="h-5 w-5 text-primary" />
              <span className="text-gray-600">
                &copy; {new Date().getFullYear()} Theode
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
