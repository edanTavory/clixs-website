"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { TopNavPanel } from "./TopNavPanel";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  links: NavLink[];
}

export function Navbar({ links }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-150",
        isScrolled
          ? "border-b border-slate-200/60 bg-[#FAFAFA]/90 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="relative mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/Logo.svg"
            alt="Clixs"
            width={80}
            height={20}
            priority
            className="block h-5 w-auto"
          />
        </Link>

        {/* Desktop Navigation - centered */}
        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-slate-500 transition-colors hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: Auth buttons + hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Auth buttons - BOTH always visible */}
          <Button
            asChild
            size="sm"
            className="h-8 rounded-[8px] bg-slate-900 px-2.5 text-[11px] font-medium text-white shadow-none transition-colors hover:bg-slate-800 sm:h-9 sm:px-4 sm:text-[13px]"
          >
            <Link href="https://app.clixs.io/sign-in">Sign in</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-8 rounded-[8px] border-slate-200 bg-white px-2.5 text-[11px] font-medium text-slate-900 shadow-none transition-colors hover:bg-slate-50 sm:h-9 sm:px-4 sm:text-[13px]"
          >
            <Link href="https://app.clixs.io/sign-up">Sign up</Link>
          </Button>

          {/* Mobile menu button - for nav links only */}
          <button
            ref={hamburgerRef}
            type="button"
            className="ml-0.5 inline-flex items-center justify-center rounded-[8px] p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:ml-1 sm:p-2 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="top-nav-panel"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Panel - Top Down */}
      <TopNavPanel
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={links}
      />
    </header>
  );
}
