"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Phone, MessageCircle, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function MobileBottomBar() {
  const { locale, t } = useLanguage();
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        setIsTyping(true);
      }
    };

    const handleFocusOut = () => {
      setIsTyping(false);
    };

    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);

    return () => {
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  if (isTyping) {
    return null;
  }

  // Sanitize phone number for tel: link
  const phoneDisplay = t(siteConfig.phone);
  const telNumber = phoneDisplay.replace(/[^0-9+]/g, "");

  const actions = [
    {
      label: locale === "hi" ? "दान करें" : "Donate",
      href: "/donate",
      icon: Heart,
      isPrimary: true,
      external: false,
    },
    {
      label: locale === "hi" ? "कॉल" : "Call",
      href: `tel:${telNumber || "+919415050000"}`,
      icon: Phone,
      isPrimary: false,
      external: true,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/919415050000?text=${encodeURIComponent(
        locale === "hi"
          ? "नमस्ते, मुझे माधव सेवा संस्थान के कार्यों के बारे में जानकारी चाहिए।"
          : "Hello, I would like to know more about Maadhav Sewa Sansthan's community initiatives."
      )}`,
      icon: MessageCircle,
      isPrimary: false,
      external: true,
    },
    {
      label: locale === "hi" ? "स्थान" : "Map",
      href: "https://www.google.com/maps/search/?api=1&query=Raebareli+Uttar+Pradesh",
      icon: MapPin,
      isPrimary: false,
      external: true,
    },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-border shadow-md px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-transform duration-200"
      aria-label="Quick mobile actions"
    >
      <div className="grid grid-cols-4 gap-1 items-center max-w-md mx-auto">
        {actions.map((act) => {
          const Icon = act.icon;
          const isDonate = act.isPrimary;

          const content = (
            <div
              className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-md transition-all ${
                isDonate
                  ? "bg-indigo text-surface shadow-xs"
                  : "text-ink hover:bg-bg-sand"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  isDonate
                    ? "fill-current text-marigold"
                    : "text-indigo"
                }`}
              />
              <span className="text-[11px] font-medium mt-0.5 tracking-tight leading-none">
                {act.label}
              </span>
            </div>
          );

          if (act.external) {
            return (
              <a
                key={act.label}
                href={act.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo rounded-md"
                aria-label={act.label}
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={act.label}
              href={act.href}
              className="w-full text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo rounded-md"
              aria-label={act.label}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileBottomBar;
