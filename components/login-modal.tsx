'use client';

import { signIn } from "next-auth/react";
import { X } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-6">
      <div className="relative w-full max-w-md rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 p-8 space-y-6 animate-in fade-in scale-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <h2 className="text-2xl font-[var(--font-playfair)] font-bold tracking-tight text-zinc-50">
            Sign In Required
          </h2>
          <p className="font-light tracking-wide text-zinc-400">
            To access the gauntlet, please sign in with your Google account.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
          <p className="text-sm font-light tracking-wide text-zinc-300">
            Your session will be secure. We only access your name and email.
          </p>
        </div>

        <button
          onClick={() => {
            signIn("google", { callbackUrl: "/session" });
            onClose();
          }}
          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold tracking-wide transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
        >
          Sign In with Google
        </button>

        <p className="text-center font-mono text-xs uppercase tracking-[0.15em] text-zinc-500/60">
          No card required. Instant access.
        </p>
      </div>
    </div>
  );
}
