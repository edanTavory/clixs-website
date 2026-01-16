"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// Configuration
// ============================================================================

const TRANSITION_DURATION = 0.4; // 400ms - smoother
const TRANSITION_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1]; // Smooth ease-out curve

// Widths
const COLLAPSED_WIDTH = "min(240px, 70vw)";
const EXPANDED_WIDTH = "min(520px, 94vw)";

// ============================================================================
// AskClixsBar Component - ChatGPT-style Chat Bar
// ============================================================================

export function AskClixsBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMouseDownOnSend = useRef(false);

  // Derived states
  const isExpanded = isFocused || inputValue.length > 0;
  const isSendEnabled = inputValue.trim().length > 0;

  // Calculate scroll progress and show/hide bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollableHeight = documentHeight - viewportHeight;

      if (scrollableHeight <= 0) {
        setIsVisible(false);
        return;
      }

      const progress = scrollY / scrollableHeight;
      setIsVisible(progress >= 0.15);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!isSendEnabled) return;

      // Scroll to top where the main input is
      window.scrollTo({ top: 0, behavior: "smooth" });
      setInputValue("");
      setIsFocused(false);
      inputRef.current?.blur();
    },
    [isSendEnabled]
  );

  // Handle input focus
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  // Handle input blur - only collapse if empty and not clicking send
  const handleBlur = useCallback(() => {
    // Delay to check if we're clicking the send button
    setTimeout(() => {
      if (!isMouseDownOnSend.current && inputValue.length === 0) {
        setIsFocused(false);
      }
      isMouseDownOnSend.current = false;
    }, 10);
  }, [inputValue.length]);

  // Prevent blur when clicking send button
  const handleSendMouseDown = useCallback(() => {
    isMouseDownOnSend.current = true;
  }, []);

  // Handle send button click
  const handleSendClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!isSendEnabled) return;
      handleSubmit(e as unknown as React.FormEvent);
    },
    [isSendEnabled, handleSubmit]
  );

  // Reduced motion check
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.28,
            ease: TRANSITION_EASE,
          }}
          className="fixed left-0 right-0 z-50 pointer-events-none"
          style={{
            bottom: "calc(20px + env(safe-area-inset-bottom, 0px))",
          }}
        >
          {/* Centered wrapper - constrained to container width */}
          <div
            className="mx-auto flex justify-center"
            style={{
              width: "min(1152px, calc(100vw - 32px))",
              maxWidth: "100%",
            }}
          >
            {/* Chat bar form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="pointer-events-auto"
              style={{
                width: isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
                transition: prefersReducedMotion
                  ? "none"
                  : `width ${TRANSITION_DURATION}s cubic-bezier(${TRANSITION_EASE.join(",")})`,
              }}
            >
              <div
                className={cn(
                  "relative flex h-14 w-full items-center gap-2",
                  "rounded-full border",
                  "transition-all",
                  // Base styles
                  "bg-white/15 backdrop-blur-[40px]",
                  // Border & shadow based on state
                  isExpanded
                    ? "border-slate-300/60 shadow-[0_4px_24px_rgba(0,0,0,0.1)]"
                    : "border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                )}
                style={{
                  paddingLeft: 20,
                  paddingRight: 6,
                  transition: prefersReducedMotion
                    ? "none"
                    : `border-color ${TRANSITION_DURATION}s ease, box-shadow ${TRANSITION_DURATION}s ease`,
                }}
              >
                {/* Input field */}
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Ask Clixs..."
                  aria-label="Ask Clixs"
                  className={cn(
                    "flex-1 min-w-0 h-full bg-transparent",
                    "text-[15px] text-slate-800",
                    "placeholder:text-slate-900/60",
                    "focus:outline-none"
                  )}
                />

                {/* Send button */}
                <button
                  type="submit"
                  disabled={!isSendEnabled}
                  onMouseDown={handleSendMouseDown}
                  onClick={handleSendClick}
                  aria-label="Send message"
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                    "transition-all duration-150",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 focus-visible:ring-offset-0",
                    // Enabled state
                    isSendEnabled && [
                      "bg-slate-900 text-white",
                      "hover:bg-slate-800",
                      "cursor-pointer",
                    ],
                    // Disabled state - muted black
                    !isSendEnabled && [
                      "bg-slate-900/40 text-white/50",
                      "cursor-not-allowed",
                    ]
                  )}
                >
                  <ArrowUp
                    className="h-4 w-4"
                    strokeWidth={2.25}
                  />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
