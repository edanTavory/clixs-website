"use client";

import { useState, useEffect, useRef, useCallback, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type SubmitStatus = "idle" | "loading" | "success" | "error";

// Animation variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const popupVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      duration: 0.5,
      bounce: 0.3,
    },
  },
};

export function WaitlistPopup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Lock body scroll permanently and prevent ESC key
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Prevent ESC key from doing anything
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Focus input after animation
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Focus trap - keeps focus inside the popup
  const handleKeyDownTrap = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !popupRef.current) return;

    const focusableElements = popupRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to join waitlist");
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {/* Blocking overlay - no click handler, cannot be dismissed */}
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* Popup container */}
      <motion.div
        ref={popupRef}
        variants={popupVariants}
        initial="hidden"
        animate="visible"
        onKeyDown={handleKeyDownTrap}
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-title"
        className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      >
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <img
              src="/Asset 2.svg"
              alt="Clixs Logo"
              className="h-12 w-auto"
            />
          </div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
              <h2 className="mb-2 text-2xl font-semibold text-slate-900">
                You&apos;re on the list!
              </h2>
              <p className="text-slate-600">
                We&apos;ll notify you when Clixs is ready.
              </p>
            </motion.div>
          ) : (
            <>
              <h2
                id="waitlist-title"
                className="mb-2 text-center text-2xl font-semibold text-slate-900"
              >
                Coming Soon
              </h2>
              <p className="mb-6 text-center text-slate-600">
                Clixs is currently in development. Join our waitlist to be the
                first to know when we launch.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    ref={inputRef}
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 disabled:opacity-50 transition-all"
                  />
                </div>

                {status === "error" && errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-red-600"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errorMessage}
                  </motion.div>
                )}

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-12 w-full rounded-xl bg-slate-900 text-[15px] font-medium text-white shadow-none transition-colors hover:bg-slate-800 disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Joining...
                    </span>
                  ) : (
                    "Join Waitlist"
                  )}
                </Button>
              </form>

              <p className="mt-4 text-center text-xs text-slate-400">
                We respect your privacy. No spam, ever.
              </p>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
