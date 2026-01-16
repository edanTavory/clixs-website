"use client";

import Link from "next/link";
import { Linkedin, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0b0b0c] via-[#0b0b0c] to-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Top section: Hero text + columns */}
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          {/* Left: Hero text */}
          <div>
            <h2 className="font-serif text-4xl italic leading-tight md:text-5xl">
              Less friction,
              <br />
              more performance.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/55">
              Clixs helps agencies build Google Ads campaigns faster — with full
              control and zero learning curve.
            </p>
            <div className="mt-8">
              <Link
                href="https://app.clixs.io/sign-up"
                className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 transition hover:border-white/25 hover:text-white"
              >
                Join the waitlist
              </Link>
            </div>
          </div>

          {/* Right: Columns - minimal, 2 columns only */}
          <div className="grid grid-cols-2 gap-8 md:gap-12">
            {/* Product & Resources */}
            <div className="space-y-8">
              <div>
                <div className="text-sm font-semibold text-white/80">Product</div>
                <div className="mt-4 space-y-2">
                  <Link
                    href="https://app.clixs.io"
                    className="block text-sm text-white/50 transition hover:text-white"
                  >
                    Web app
                  </Link>
                  <div className="text-sm text-white/35">Pricing — Soon</div>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-white/80">Resources</div>
                <div className="mt-4 space-y-2">
                  <div className="text-sm text-white/35">Docs — Soon</div>
                </div>
              </div>
            </div>

            {/* Company & Legal */}
            <div className="space-y-8">
              <div>
                <div className="text-sm font-semibold text-white/80">Company</div>
                <div className="mt-4 space-y-2">
                  <Link
                    href="mailto:hello@clixs.io"
                    className="block text-sm text-white/50 transition hover:text-white"
                  >
                    Contact
                  </Link>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-white/80">Legal</div>
                <div className="mt-4 space-y-2">
                  <Link
                    href="#"
                    className="block text-sm text-white/50 transition hover:text-white"
                  >
                    Privacy
                  </Link>
                  <Link
                    href="#"
                    className="block text-sm text-white/50 transition hover:text-white"
                  >
                    Terms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          {/* Social icons */}
          <div className="flex items-center gap-5 text-white/50">
            <Link href="#" className="transition hover:text-white">
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link href="#" className="transition hover:text-white">
              <Twitter className="h-4 w-4" />
            </Link>
            <Link href="#" className="transition hover:text-white">
              <Youtube className="h-4 w-4" />
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-white/40">
            © {new Date().getFullYear()} Clixs. All rights reserved.
          </div>

          {/* Legal links (mobile) */}
          <div className="flex items-center gap-5 text-sm text-white/50 md:hidden">
            <Link href="#" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="#" className="transition hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
