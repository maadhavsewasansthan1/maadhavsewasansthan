"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, Heart } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { navigation } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  // Track last scroll position to determine direction
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      // Blurred background only after scrolling past 120px
      setIsScrolled(currentY > 120);

      // Hide when scrolling down past 80px; show when scrolling up
      if (currentY > 80 && diff > 0) {
        setHidden(true);
      } else if (diff < 0) {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translateY = hidden ? "-100%" : "0%";

  return (
    <>
      <motion.header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          prefersReducedMotion ? "transition-none" : "",
          isScrolled
            ? "bg-bg/90 backdrop-blur-md border-b border-border shadow-xs py-2.5 sm:py-3"
            : "bg-transparent py-3.5 sm:py-4 border-b border-transparent"
        )}
        animate={
          prefersReducedMotion
            ? undefined
            : { y: translateY }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 0.3, ease: "easeInOut" }
        }
        style={prefersReducedMotion ? { transform: `translateY(${translateY})` } : undefined}
      >
        <Container>
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Logo size="md" />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navigation.links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3.5 py-2 text-sm font-medium rounded-md transition-colors relative min-h-[44px] flex items-center",
                      isActive
                        ? "text-indigo font-semibold"
                        : "text-ink-soft hover:text-ink hover:bg-bg-sand/60"
                    )}
                  >
                    {t(link.label)}
                    {isActive && (
                      <span className="absolute bottom-1.5 left-3.5 right-3.5 h-0.5 bg-indigo rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <ThemeToggle />

              <div className="hidden sm:block">
                <LanguageToggle variant="pill" />
              </div>

              <Button
                href={navigation.cta.href}
                variant="primary"
                size="sm"
                className="hidden sm:inline-flex items-center gap-2 shadow-xs min-h-[44px] bg-indigo hover:bg-indigo-soft text-surface rounded-md"
              >
                <Heart className="w-3.5 h-3.5 text-marigold fill-current" />
                <span>{t(navigation.cta.label)}</span>
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-md text-ink hover:bg-bg-sand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer border border-border"
                aria-label="Open mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </Container>
      </motion.header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}

export default Navbar;
