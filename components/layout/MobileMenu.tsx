"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Heart, MapPin, ArrowUpRight } from "lucide-react";
import { FacebookIcon } from "@/components/ui/FacebookIcon";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { navigation, siteConfig } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Panel animation: full-screen panel slides DOWN from top with a spring
  const panelVariants = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { y: "-100%", opacity: 0 },
        animate: { y: "0%", opacity: 1 },
        exit: { y: "-100%", opacity: 0 },
      };

  const panelTransition = prefersReducedMotion
    ? { duration: 0.15 }
    : { type: "spring" as const, stiffness: 280, damping: 32 };

  // Link stagger animation
  const linkVariants = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/60 dark:bg-black/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Full-screen Drawer Sliding DOWN */}
          <motion.div
            {...panelVariants}
            transition={panelTransition}
            className="fixed inset-0 w-full h-full bg-bg shadow-2xl flex flex-col z-10 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Top Bar with Toggles */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
              <Logo size="sm" />
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <LanguageToggle variant="pill" />
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2.5 rounded-full text-ink-soft hover:text-ink hover:bg-bg-sand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer border border-border"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Links with Stagger */}
            <nav className="flex-1 px-6 py-8 flex flex-col justify-center space-y-3">
              {navigation.links.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    {...linkVariants}
                    transition={
                      prefersReducedMotion
                        ? undefined
                        : { duration: 0.35, ease: "easeOut", delay: idx * 0.05 }
                    }
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`group flex items-baseline justify-between py-2.5 transition-colors border-b border-border/50 ${
                        isActive
                          ? "text-indigo font-semibold"
                          : "text-ink hover:text-indigo"
                      }`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="text-xs font-mono text-ink-soft/60">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="font-serif text-2xl sm:text-3xl tracking-tight">
                          {t(link.label)}
                        </span>
                      </div>
                      <span className="text-sm font-sans opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom Actions & Location */}
            <div className="p-6 border-t border-border bg-surface space-y-4">
              <Button
                href={navigation.cta.href}
                variant="primary"
                fullWidth
                size="lg"
                onClick={onClose}
                className="gap-2 shadow-xs min-h-[48px] bg-indigo hover:bg-indigo-soft text-surface rounded-md"
              >
                <Heart className="w-4 h-4 text-marigold fill-current" />
                <span>{t(navigation.cta.label)}</span>
              </Button>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-ink-soft">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-madder shrink-0" />
                  <span>{t(siteConfig.location)}</span>
                </div>

                {siteConfig.socialLinks.facebook && (
                  <a
                    href={siteConfig.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-indigo font-medium hover:underline py-1"
                    aria-label="Visit Maadhav Sewa Sansthan on Facebook"
                  >
                    <FacebookIcon className="w-4 h-4" />
                    <span>Facebook Official Page</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
