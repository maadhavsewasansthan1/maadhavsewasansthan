"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { aboutSection } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import LotusMark from "@/components/ui/motifs/LotusMark";

export function AboutSection() {
  const reduced = useReducedMotion();
  const { t, locale } = useLanguage();

  return (
    <section id="about" className="py-16 md:py-24 bg-bg-sand/30 border-y border-border relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: Awadhi Arch Photography with Expanding Clip-Path Reveal */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">

              {/* Arch frame with bottom-to-top expanding arch clip-path */}
              <motion.div
                className="relative arch-frame aspect-[4/3] sm:aspect-[4/5] bg-bg-sand border border-border shadow-sm overflow-hidden"
                initial={
                  reduced
                    ? undefined
                    : { clipPath: "inset(100% 0 0 0 round 50% 50% 0 0)", opacity: 0 }
                }
                whileInView={
                  reduced
                    ? undefined
                    : { clipPath: "inset(0% 0 0 0 round 100px 100px 0 0)", opacity: 1 }
                }
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.0, ease: "easeOut" }}
              >
                <Image
                  src={aboutSection.image.src}
                  alt={aboutSection.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 450px"
                  className="object-cover object-center img-warm"
                />
              </motion.div>

              {/* Sincere Community Notice */}
              <div className="mt-4 p-4 rounded-xl bg-surface border border-border text-xs">
                <div className="flex items-center gap-2 mb-1 text-indigo font-semibold">
                  <ShieldCheck className="w-4 h-4 text-marigold" />
                  <span className="uppercase tracking-wider text-[11px]">
                    {t(aboutSection.cardLabel)}
                  </span>
                </div>
                <p className="font-serif text-xs sm:text-sm text-ink leading-snug">
                  {t(aboutSection.cardQuote)}
                </p>
                <p className="text-[11px] text-ink-soft mt-1.5 italic">
                  {t(aboutSection.cardNote)}
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Editorial Narrative & Principles */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <LotusMark width={16} height={16} className="text-marigold" />
                <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
                  {t(aboutSection.badge)}
                </span>
              </div>
              <h2
                className={`font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight whitespace-pre-line leading-[1.2] ${
                  locale === "hi" ? "text-madder" : "text-ink"
                }`}
              >
                {t(aboutSection.headline)}
              </h2>
            </div>

            <div className="space-y-3.5 text-base text-ink-soft leading-relaxed">
              {aboutSection.body.map((paragraph, index) => (
                <p key={index}>{t(paragraph)}</p>
              ))}
            </div>

            {/* Core Values Strip */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {aboutSection.values.map((v, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-surface border border-border space-y-1"
                >
                  <p className="font-serif font-semibold text-ink text-sm">
                    {t(v.title)}
                  </p>
                  <p className="text-xs text-ink-soft leading-normal">
                    {t(v.description)}
                  </p>
                </div>
              ))}
            </div>

            {/* Metrics Strip */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs uppercase tracking-wider text-ink-soft font-semibold mb-3">
                {t(aboutSection.metricsTitle)}
              </p>
              <div className="grid grid-cols-3 gap-3">
                {aboutSection.stats.map((stat, i) => (
                  <div key={i} className="space-y-0.5">
                    <p className="font-serif text-xl sm:text-2xl font-semibold text-indigo">
                      {stat.value}
                    </p>
                    <p className="text-xs font-medium text-ink">
                      {t(stat.label)}
                    </p>
                    <p className="text-[10px] text-ink-soft italic">
                      {t(stat.note)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}

export default AboutSection;
