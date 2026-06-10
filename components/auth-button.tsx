'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";

export function AuthButton() {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  if (session?.user) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-900/50 backdrop-blur-md border border-zinc-800/60 hover:border-zinc-700/60 transition-all duration-300"
        >
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <span className="text-sm font-medium text-zinc-100 hidden sm:inline">
            {session.user.name?.split(" ")[0]}
          </span>
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 rounded-lg bg-zinc-900/90 backdrop-blur-md border border-zinc-800/80 shadow-lg z-50">
            <div className="p-4 border-b border-zinc-800/60">
              <p className="text-sm font-medium text-zinc-100">{session.user.name}</p>
              <p className="text-xs text-zinc-400">{session.user.email}</p>
            </div>
            <button
              onClick={() => {
                setShowDropdown(false);
                signOut({ callbackUrl: "/" });
              }}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800/50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 font-semibold text-white text-sm transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
    >
      Sign In
    </button>
  );
}
