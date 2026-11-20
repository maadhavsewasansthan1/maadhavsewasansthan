"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { founderContent } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import LotusMark from "@/components/ui/motifs/LotusMark";

export interface FounderSectionProps {
  id?: string;
  className?: string;
}

export function FounderSection({ id = "founder", className = "" }: FounderSectionProps) {
  const { t, locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);
  const router = useRouter();

  /* ── Hidden CMS shortcut: triple-tap the founder photo ── */
  const tapCount = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePhotoTap = useCallback(() => {
    tapCount.current += 1;
    if (tapTimer.current) clearTimeout(tapTimer.current);
    if (tapCount.current >= 3) {
      tapCount.current = 0;
      router.push("/admin/index.html");
      return;
    }
    tapTimer.current = setTimeout(() => {
      tapCount.current = 0;
    }, 800); // reset if 800 ms pass between taps
  }, [router]);

  // Resolved localized values
  const name = t(founderContent.name);
  const role = t(founderContent.role);
  const quote = t(founderContent.quote);
  const photoAlt = t(founderContent.photoAlt);

  // Filter bio paragraphs for current locale
  const bioList = locale === "hi" ? founderContent.bio.hi : founderContent.bio.en;
  const validBio = bioList.filter((p) => p && p.trim().length > 0);

  const hasName = name && name.trim().length > 0;
  const hasRole = role && role.trim().length > 0;
  const hasQuote = quote && quote.trim().length > 0;
  const hasBio = validBio.length > 0;
  const hasYears = founderContent.yearsOfService && founderContent.yearsOfService.trim().length > 0;
  const hasSocials = founderContent.socialLinks && founderContent.socialLinks.length > 0;

  // Extract initials for fallback placeholder
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "MS";

  const showPhoto = founderContent.photo && !imgError;

  return (
    <motion.section
      id={id}
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`py-16 md:py-24 bg-bg border-t border-border ${className}`}
    >
      <Container size="default">
        {/* Section Label */}
        <div className="flex items-center gap-2 mb-8 md:mb-12">
          <LotusMark width={16} height={16} className="text-marigold" />
          <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
            {locale === "hi" ? "संस्थापक परिचय" : "About the Founder"}
          </span>
        </div>

        {/* Two-column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

          {/* Portrait Column with Clip-Path Arch Reveal */}
          <div className="lg:col-span-5 w-full">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              <motion.div
                className="relative arch-frame aspect-[4/5] w-full overflow-hidden bg-bg-sand border border-border shadow-xs"
                initial={
                  prefersReducedMotion
                    ? undefined
                    : { clipPath: "inset(100% 0 0 0 round 50% 50% 0 0)", opacity: 0 }
                }
                whileInView={
                  prefersReducedMotion
                    ? undefined
                    : { clipPath: "inset(0% 0 0 0 round 100px 100px 0 0)", opacity: 1 }
                }
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                /* Hidden CMS shortcut: tap 3 times to open the admin */
                onClick={handlePhotoTap}
                style={{ cursor: "default", WebkitTapHighlightColor: "transparent" }}
              >
                {showPhoto ? (
                  <Image
                    src={founderContent.photo}
                    alt={photoAlt || (hasName ? name : "Founder")}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 450px"
                    className="object-cover object-center"
                    priority
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-bg-sand/60">
                    <span className="font-serif text-5xl sm:text-6xl font-medium text-indigo tracking-wider mb-2">
                      {initials}
                    </span>
                    {hasName && (
                      <span className="font-serif text-base text-ink font-medium">
                        {name}
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Text & Narrative Column */}
          <div className="lg:col-span-7 space-y-5">

            {/* Name and Role */}
            {(hasName || hasRole) && (
              <div className="space-y-1">
                {hasRole && (
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-ink-soft block">
                    {role}
                  </span>
                )}
                {hasName && (
                  <h2
                    className={`font-serif text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.15] ${
                      locale === "hi" ? "text-madder" : "text-ink"
                    }`}
                  >
                    {name}
                  </h2>
                )}
                {/* Marigold Accent Divider */}
                <div className="w-12 h-0.5 bg-marigold mt-3" />
              </div>
            )}

            {/* Quote in serif heading font with marigold accent border */}
            {hasQuote && (
              <div className="relative pl-6 py-2 border-l-2 border-marigold">
                <Quote className="w-5 h-5 text-marigold absolute top-1 left-0 -translate-x-1/2 fill-current opacity-30" />
                <p className="font-serif text-lg sm:text-xl font-normal text-ink italic leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
            )}

            {/* Bio Paragraphs */}
            {hasBio && (
              <div className="space-y-4 text-sm sm:text-base text-ink-soft leading-relaxed">
                {validBio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}

            {/* Optional Years of Service */}
            {hasYears && (
              <div className="pt-2 text-xs font-semibold text-indigo uppercase tracking-wider">
                <span>{founderContent.yearsOfService}</span>
              </div>
            )}

            {/* Optional Social Links */}
            {hasSocials && (
              <div className="pt-2 flex flex-wrap gap-3">
                {founderContent.socialLinks?.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-indigo hover:text-marigold transition-colors hover:underline"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            )}

          </div>

        </div>
      </Container>
    </motion.section>
  );
}

export default FounderSection;
