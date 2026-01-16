"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

interface TopNavPanelProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

// Animation variants
const panelVariants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        type: "tween",
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
      },
      opacity: {
        duration: 0.2,
        ease: "easeOut",
      },
      staggerChildren: 0.035,
      delayChildren: 0.08,
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        type: "tween",
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1],
      },
      opacity: {
        duration: 0.15,
      },
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 6,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: {
      duration: 0.12,
    },
  },
};

const ctaVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.12,
    },
  },
};

export function TopNavPanel({ isOpen, onClose, links }: TopNavPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Store previous focus and manage focus on open/close
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus first link after animation starts
      setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 100);
    } else {
      // Return focus to hamburger
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node)
      ) {
        // Check if click is not on the hamburger button (parent controls this)
        const target = e.target as HTMLElement;
        if (!target.closest('[aria-controls="top-nav-panel"]')) {
          onClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Focus trap
  const handleKeyDownTrap = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
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
    },
    []
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          id="top-nav-panel"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onKeyDown={handleKeyDownTrap}
          role="menu"
          aria-label="Navigation menu"
          className="absolute left-0 right-0 top-full z-40 overflow-hidden border-b border-slate-200/60 bg-white/95 backdrop-blur-xl"
        >
          {/* Tech accent line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300/50 to-transparent" />

          {/* Panel content */}
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
              {/* Navigation links - left side */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-3">
                {links.map((link, index) => (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={onClose}
                      role="menuitem"
                      className="group flex items-center gap-2 rounded-lg px-3 py-3 text-[15px] font-medium text-slate-700 transition-colors hover:bg-slate-100/80 hover:text-slate-900"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-50" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* CTA card - right side */}
              <motion.div variants={ctaVariants} className="md:w-64">
                <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-slate-50 to-white p-4">
                  <p className="text-[13px] font-medium text-slate-800">
                    Ready to build faster?
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
                    Join teams already using Clixs to create campaigns in minutes.
                  </p>
                  <Link
                    href="https://app.clixs.io/sign-up"
                    onClick={onClose}
                    className="mt-3 inline-flex h-9 items-center justify-center rounded-lg bg-slate-900 px-4 text-[13px] font-medium text-white transition-colors hover:bg-slate-800"
                  >
                    Get started free
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200/60 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
