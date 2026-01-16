"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavLink {
  label: string;
  href: string;
}

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

// Animation variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  hidden: {
    x: "100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.04,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.24,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function MobileNavDrawer({ isOpen, onClose, links }: MobileNavDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Store the previously focused element and lock body scroll
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";

      // Focus the close button after a short delay for animation
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";

      // Return focus to the previously focused element
      previousFocusRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
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

  // Focus trap
  const handleKeyDownTrap = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !drawerRef.current) return;

    const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.24 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onKeyDown={handleKeyDownTrap}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[340px] flex-col border-l border-slate-200/10 bg-white/95 backdrop-blur-xl sm:max-w-[380px]"
          >
            {/* Header */}
            <motion.div
              variants={itemVariants}
              className="flex h-14 items-center justify-between border-b border-slate-200/60 px-5"
            >
              <span className="text-[15px] font-medium text-slate-900">Menu</span>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-[8px] text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>

            {/* Navigation links */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="space-y-1">
                {links.map((link, index) => (
                  <motion.li key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center rounded-[10px] px-4 py-3.5 text-[16px] font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Divider */}
              <motion.div
                variants={itemVariants}
                className="my-6 border-t border-slate-200/60"
              />

              {/* CTA Section */}
              <motion.div variants={itemVariants} className="space-y-3 px-2">
                <Button
                  asChild
                  className="h-12 w-full rounded-[10px] bg-slate-900 text-[15px] font-medium text-white shadow-none transition-colors hover:bg-slate-800"
                >
                  <Link href="https://app.clixs.io/sign-in" onClick={onClose}>
                    Sign in
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 w-full rounded-[10px] border-slate-200 bg-white text-[15px] font-medium text-slate-900 shadow-none transition-colors hover:bg-slate-50"
                >
                  <Link href="https://app.clixs.io/sign-up" onClick={onClose}>
                    Create account
                  </Link>
                </Button>
              </motion.div>
            </nav>

            {/* Footer */}
            <motion.div
              variants={itemVariants}
              className="border-t border-slate-200/60 px-5 py-4"
            >
              <p className="text-center text-[12px] text-slate-400">
                The campaign builder for PPC teams
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
