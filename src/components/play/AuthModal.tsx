"use client";

import { useState } from "react";
import { X, AlertCircle, LogOut, Info } from "lucide-react";
import { useAuth } from "@/lib/firebase/authContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { user, isConfigured, loginWithGoogle, loginWithEmail, registerWithEmail, logout } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      if (isRegisterMode) {
        await registerWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed.";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Google sign-in failed.";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon/65 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-paper border border-terrain/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-carbon relative">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-terrain hover:text-carbon transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest text-terrain">
            UNKN Pilot Authentication
          </span>
          <h2 className="text-2xl font-space font-medium text-carbon">
            {user ? "Pilot Profile" : isRegisterMode ? "Register Pilot Account" : "Pilot Sign In"}
          </h2>
          <p className="text-xs text-terrain font-light leading-relaxed">
            {user
              ? "Your authenticated identity for recording expedition telemetry in Firestore."
              : "Sign in to save your 10-round expedition logs and audit history."}
          </p>
        </div>

        {/* If Firebase is Not Configured in .env */}
        {!isConfigured && (
          <div className="p-4 rounded-2xl bg-mist/20 border border-mist/50 text-xs space-y-2">
            <div className="flex items-center gap-2 font-semibold text-carbon">
              <Info className="w-4 h-4 text-carbon" />
              <span>Firebase Environment Setup Required</span>
            </div>
            <p className="text-terrain text-[11px] leading-relaxed">
              Firebase credentials are not yet configured in <code>.env.local</code>. You can continue playing freely as a <strong>Guest Pilot</strong> without login.
            </p>
            <div className="bg-carbon/5 p-2.5 rounded-xl font-mono text-[10px] text-carbon space-y-0.5 select-all">
              <div>NEXT_PUBLIC_FIREBASE_API_KEY=&quot;...&quot;</div>
              <div>NEXT_PUBLIC_FIREBASE_PROJECT_ID=&quot;...&quot;</div>
              <div>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=&quot;...&quot;</div>
            </div>
          </div>
        )}

        {/* Authenticated State */}
        {user ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/60 border border-terrain/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-terrain uppercase block">Active Pilot</span>
                <span className="text-sm font-semibold text-carbon">{user.email || "Pilot"}</span>
                <span className="text-[10px] font-mono text-terrain block">UID: {user.uid.slice(0, 10)}...</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-signal-lime" />
            </div>

            <button
              onClick={async () => {
                await logout();
                onClose();
              }}
              className="cursor-pointer w-full py-3 rounded-2xl border border-terrain/40 hover:border-carbon text-xs font-mono text-carbon transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {isConfigured && (
              <>
                {/* Google Sign-in Button */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isSubmitting}
                  className="cursor-pointer w-full py-3 rounded-2xl border border-terrain/40 hover:border-carbon text-xs font-mono text-carbon bg-white/70 hover:bg-white transition-all flex items-center justify-center gap-2 shadow-2xs"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="flex items-center gap-3 text-[10px] font-mono text-terrain my-2">
                  <div className="flex-1 h-px bg-terrain/25" />
                  <span>OR WITH EMAIL</span>
                  <div className="flex-1 h-px bg-terrain/25" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono text-terrain mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="pilot@unkn.earth"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-terrain/40 bg-paper text-sm text-carbon focus:outline-none focus:border-carbon"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-terrain mb-1">Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-terrain/40 bg-paper text-sm text-carbon focus:outline-none focus:border-carbon"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer w-full py-3 rounded-2xl bg-carbon hover:bg-carbon/90 text-paper font-semibold text-xs font-mono uppercase tracking-wider transition-colors mt-2"
                  >
                    {isSubmitting ? "Processing..." : isRegisterMode ? "Create Account" : "Sign In"}
                  </button>
                </form>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setIsRegisterMode((prev) => !prev)}
                    className="cursor-pointer text-xs text-terrain hover:text-carbon font-mono underline"
                  >
                    {isRegisterMode ? "Already have an account? Sign In" : "Need an account? Register"}
                  </button>
                </div>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer w-full py-2.5 rounded-xl border border-terrain/30 text-xs font-mono text-terrain hover:text-carbon transition-colors text-center block mt-2"
            >
              Continue as Guest Pilot
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
