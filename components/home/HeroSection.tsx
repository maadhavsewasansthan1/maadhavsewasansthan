"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { heroContent, siteConfig } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { KolamBackground } from "@/components/background/KolamBackground";
import LotusMark from "@/components/ui/motifs/LotusMark";

/* ------------------------------------------------------------------ */
/* 1. Scroll Progress Bar (Top of viewport, 3px marigold)             */
/* ------------------------------------------------------------------ */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-marigold z-50 origin-left"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/* 2. Infinite Ticker Strip (under hero, pauses on hover)              */
/* ------------------------------------------------------------------ */
function HeroTicker() {
  const reduced = useReducedMotion();

  const tickerItems = (heroContent as { tickerItems?: Array<{ en: string; hi: string }> }).tickerItems || [
    { en: "Women's Empowerment", hi: "महिला सशक्तीकरण" },
    { en: "Care for Elders", hi: "वृद्धजन सेवा" },
    { en: "Animal Welfare", hi: "पशु कल्याण" },
    { en: "Support for Families", hi: "ज़रूरतमंद परिवारों की सहायता" },
  ];

  const content = (
    <div className="flex items-center gap-6 shrink-0 py-3">
      {tickerItems.map((item, idx) => (
        <React.Fragment key={idx}>
          <span className="font-serif text-xs sm:text-sm tracking-wide text-ink font-medium">
            {item.en}
          </span>
          <span className="text-marigold font-serif text-xs sm:text-sm font-normal">
            ({item.hi})
          </span>
          <LotusMark width={14} height={14} className="text-madder shrink-0" />
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div
      className="w-full bg-bg-sand border-y border-border overflow-hidden select-none"
      aria-label="Key Service Areas"
    >
      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: tickerScroll 28s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {reduced ? (
        <div className="flex items-center justify-center gap-6 py-3 px-4 overflow-x-auto scrollbar-none">
          {content}
        </div>
      ) : (
        <div className="ticker-track">
          {content}
          {content}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. HeroSection Main Component                                      */
/* ------------------------------------------------------------------ */
export function HeroSection() {
  const { locale, t } = useLanguage();
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Parallax offset for desktop hero image
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [0, isDesktop && !reduced ? 24 : 0]);

  // Headline words for word-by-word reveal
  const headlineWordsEn = ["Compassion", "in", "Action."];
  const headlineWordsHi = ["करुणा", "से", "सेवा,", "समाज", "का", "निर्माण।"];
  const headlineWords = locale === "hi" ? headlineWordsHi : headlineWordsEn;

  return (
    <>
      <ScrollProgressBar />

      <section
        ref={heroRef}
        className="relative bg-bg pt-6 pb-12 sm:pt-10 sm:pb-16 md:pt-16 md:pb-20 overflow-hidden"
        style={{ minHeight: "440px" }}
      >
        {/* Kolam Live Background */}
        <KolamBackground />

        <Container>
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
            {/* Narrative Column */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">

              {/* Badge: slides in from left */}
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border text-xs font-semibold uppercase tracking-wider text-indigo shadow-xs"
                initial={reduced ? undefined : { opacity: 0, x: -24 }}
                animate={reduced ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <MapPin className="w-3.5 h-3.5 text-marigold shrink-0" />
                <span>{t(heroContent.badge)}</span>
              </motion.div>

              {/* Word-by-Word Headline Reveal */}
              <div className="space-y-2 sm:space-y-3">
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-ink leading-[1.15]">
                  {headlineWords.map((word, i) => (
                    <span
                      key={i}
                      className="inline-block overflow-hidden mr-2 sm:mr-3 align-top"
                    >
                      <motion.span
                        className={`inline-block ${
                          (locale === "en" && word === "Action.") ||
                          (locale === "hi" && (word === "समाज" || word === "का" || word === "निर्माण।"))
                            ? "text-indigo font-normal italic"
                            : ""
                        }`}
                        initial={reduced ? undefined : { y: "100%", opacity: 0 }}
                        animate={reduced ? undefined : { y: "0%", opacity: 1 }}
                        transition={{
                          duration: 0.55,
                          ease: [0.16, 1, 0.3, 1],
                          delay: i * 0.06,
                        }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </h1>

                {/* Subtitle Line fades in 0.4s later */}
                <motion.p
                  className="font-serif text-lg sm:text-2xl text-marigold font-normal tracking-wide"
                  initial={reduced ? undefined : { opacity: 0, y: 12 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.4 + headlineWords.length * 0.06,
                  }}
                >
                  {locale === "hi"
                    ? `${siteConfig.name} — रायबरेली`
                    : siteConfig.nameHindi}
                </motion.p>
              </div>

              {/* Body narrative */}
              <motion.p
                className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl"
                initial={reduced ? undefined : { opacity: 0, y: 16 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 0.3 + headlineWords.length * 0.06,
                }}
              >
                {t(heroContent.subheadline)}
              </motion.p>

              {/* Action Buttons (rise in last) */}
              <motion.div
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
                initial={reduced ? undefined : { opacity: 0, y: 20 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 0.45 + headlineWords.length * 0.06,
                }}
              >
                <Button
                  href={heroContent.primaryCta.href}
                  variant="primary"
                  size="lg"
                  className="gap-2 shadow-xs min-h-[48px] bg-indigo hover:bg-indigo-soft text-surface rounded-md"
                >
                  <span>{t(heroContent.primaryCta.label)}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <Button
                  href={heroContent.secondaryCta.href}
                  variant="outline"
                  size="lg"
                  className="gap-2 min-h-[48px] border-border text-ink hover:bg-bg-sand rounded-md"
                >
                  <span>{t(heroContent.secondaryCta.label)}</span>
                </Button>
              </motion.div>

              {/* Trust markers */}
              <div className="pt-3 flex flex-wrap items-center gap-5 text-xs text-ink-soft border-t border-border">
                {heroContent.trustNotes.map((note, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        idx === 0 ? "bg-indigo" : "bg-marigold"
                      }`}
                    />
                    <span>{t(note)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photography Column with Arch Frame & Scale Entrance & Parallax */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
                <motion.div
                  className="relative arch-frame aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] bg-bg-sand border border-border shadow-md overflow-hidden"
                  initial={reduced ? undefined : { scale: 1.08, opacity: 0 }}
                  animate={reduced ? undefined : { scale: 1, opacity: 1 }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                  style={{ y: imageParallaxY }}
                >
                  <Image
                    src={heroContent.heroImage.src}
                    alt={heroContent.heroImage.alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                    className="object-cover object-center img-warm"
                  />

                  {/* Grounded bottom caption */}
                  <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-surface/90 backdrop-blur-xs border-t border-border text-ink">
                    <p className="text-[11px] uppercase tracking-wider text-indigo font-semibold">
                      {t(heroContent.floatingTags.districtFocus)}
                    </p>
                    <p className="font-serif text-xs sm:text-sm font-medium mt-0.5 line-clamp-1">
                      {t(heroContent.floatingTags.districtDesc)}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Infinite Ticker Strip directly below hero */}
      <HeroTicker />
    </>
  );
}

export default HeroSection;
