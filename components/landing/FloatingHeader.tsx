"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

interface NavLink {
  label: string;
  href: string;
}

interface FloatingHeaderProps {
  links?: NavLink[];
  logoSrc?: string;
  logoAlt?: string;
}

// ============================================================================
// Default Data
// ============================================================================

const defaultLinks: NavLink[] = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

// ============================================================================
// Animation Variants
// ============================================================================

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const menuPanelVariants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
      opacity: { duration: 0.2, delay: 0.05 },
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
      opacity: { duration: 0.15 },
    },
  },
};

const menuItemVariants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: {
      duration: 0.1,
    },
  },
};

// ============================================================================
// FloatingHeader Component
// ============================================================================

export function FloatingHeader({
  links = defaultLinks,
  logoSrc = "/Logo.svg",
  logoIconSrc = "/Asset 2.svg",
  logoAlt = "Clixs",
}: FloatingHeaderProps & { logoIconSrc?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Handle scroll detection for logo swap
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle ESC key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Backdrop overlay for mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <header className="fixed left-0 right-0 top-0 z-50 bg-[#FAFAFA]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Main Navigation Bar */}
          <nav className="flex h-14 items-center justify-between">
            {/* Logo - swaps to icon on scroll with crossfade + slide */}
            <Link href="/" className="relative flex h-5 w-20 shrink-0 items-center">
              {/* Full logo (wordmark) - visible at top */}
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={80}
                height={20}
                priority
                className="absolute left-0 top-0 block h-5 w-auto pointer-events-none"
                style={{
                  opacity: isScrolled ? 0 : 1,
                  transform: isScrolled ? "translateY(-2px)" : "translateY(0)",
                  transition: "opacity 180ms cubic-bezier(0.22, 1, 0.36, 1), transform 180ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
              {/* Icon-only logo - visible when scrolled */}
              <Image
                src={logoIconSrc}
                alt={logoAlt}
                width={20}
                height={20}
                priority
                className="absolute left-0 top-0 block h-5 w-auto pointer-events-none"
                style={{
                  opacity: isScrolled ? 1 : 0,
                  transform: isScrolled ? "translateY(0)" : "translateY(2px)",
                  transition: "opacity 180ms cubic-bezier(0.22, 1, 0.36, 1), transform 180ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            </Link>

            {/* Desktop Navigation Links - Center */}
            <div className="hidden items-center gap-1 lg:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-[13px] font-medium text-slate-600 transition-colors",
                    "hover:bg-slate-100/80 hover:text-slate-900"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side: Auth Buttons + Hamburger */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Sign in Button */}
              <Link
                href="https://app.clixs.io/sign-in"
                className={cn(
                  "flex h-8 items-center justify-center rounded-lg bg-slate-900 px-3 text-[11px] font-medium text-white transition-all sm:h-8 sm:px-4 sm:text-[13px]",
                  "hover:bg-slate-800"
                )}
              >
                Sign in
              </Link>

              {/* Sign up Button */}
              <Link
                href="https://app.clixs.io/sign-up"
                className={cn(
                  "flex h-8 items-center justify-center rounded-lg border border-slate-200 px-3 text-[11px] font-medium text-slate-600 transition-all sm:h-8 sm:px-4 sm:text-[13px]",
                  "hover:text-slate-900 hover:border-slate-300"
                )}
              >
                Sign up
              </Link>

              {/* Hamburger Button - Mobile/Tablet (fully transparent) */}
              <button
                ref={hamburgerRef}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="floating-mobile-menu"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className={cn(
                  "flex items-center justify-center p-2 lg:hidden",
                  "bg-transparent border-none shadow-none",
                  "transition-colors duration-150",
                  "hover:bg-transparent active:bg-transparent",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/30 focus-visible:ring-offset-0",
                  // Icon color states
                  mobileMenuOpen
                    ? "text-slate-900"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>

          {/* Mobile Menu Panel */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                id="floating-mobile-menu"
                role="menu"
                aria-label="Mobile navigation"
                variants={menuPanelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="overflow-hidden border-t border-slate-200/60 bg-[#FAFAFA] lg:hidden"
              >
                <div className="px-4 py-4">
                  {/* Navigation Links */}
                  <div className="space-y-1">
                    {links.map((link) => (
                      <motion.div key={link.href} variants={menuItemVariants}>
                        <Link
                          href={link.href}
                          onClick={handleLinkClick}
                          role="menuitem"
                          className={cn(
                            "flex items-center rounded-xl px-4 py-3 text-[15px] font-medium text-slate-700 transition-colors",
                            "hover:bg-slate-100/80 hover:text-slate-900"
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
