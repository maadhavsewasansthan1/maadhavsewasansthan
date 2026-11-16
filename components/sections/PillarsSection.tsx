"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { pillars } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { useMotionSafe } from "@/lib/motion/useMotionSafe";
import LotusMark from "@/components/ui/motifs/LotusMark";
import {
  WomWithPot,
  ElderWithStick,
  PersonWithAnimal,
  HandWithBowl,
} from "@/components/ui/motifs/WarliFigures";

const FIGURE_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  women: WomWithPot,
  elders: ElderWithStick,
  animals: PersonWithAnimal,
  needy: HandWithBowl,
};

const ACCENT_COLOR_MAP: Record<string, string> = {
  lotus: "var(--lotus)",
  madder: "var(--madder)",
  sage: "var(--sage)",
  marigold: "var(--marigold)",
};

export function PillarsSection() {
  const { t, locale } = useLanguage();
  const { fadeUp, staggerContainer, reduced } = useMotionSafe();

  const sectionLabel = locale === "hi" ? "हमारे चार मुख्य स्तंभ" : "Our Four Pillars";
  const sectionTitle =
    locale === "hi"
      ? "सहानुभूति और समर्पण के साथ समुदाय की सेवा"
      : "Serving the Community with Care & Compassion";
  const sectionSubtitle =
    locale === "hi"
      ? "रायबरेली और आसपास के क्षेत्रों में जमीनी स्तर पर समर्पित चार मुख्य सेवा क्षेत्र।"
      : "Dedicated grassroot initiatives transforming rural lives across Raebareli, Uttar Pradesh.";

  return (
    <section className="py-16 md:py-24 bg-bg-sand/60 dark:bg-bg-sand/40 border-y border-border/80 relative">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <LotusMark width={18} height={18} className="text-marigold" />
            <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
              {sectionLabel}
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink font-medium leading-tight">
            {sectionTitle}
          </h2>
          <p className="mt-3 text-base text-ink-soft leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        {/* 4 Pillars Grid / Carousel */}
        <motion.div
          className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 scrollbar-none"
          variants={staggerContainer}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, margin: "-60px" }}
        >
          {pillars.map((pillar) => {
            const FigureComponent = FIGURE_MAP[pillar.id] || WomWithPot;
            const accentColor = ACCENT_COLOR_MAP[pillar.accent] || "var(--marigold)";

            return (
              <motion.div
                key={pillar.id}
                variants={fadeUp}
                whileHover={reduced ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="min-w-[85vw] sm:min-w-0 snap-center flex flex-col"
              >
                <div
                  className="h-full flex flex-col justify-between bg-surface rounded-xl border border-border p-6 sm:p-7 shadow-xs transition-colors duration-200 group"
                  style={{
                    borderTopWidth: "4px",
                    borderTopColor: accentColor,
                  }}
                >
                  <div className="space-y-4">
                    {/* Warli Figure Icon Frame */}
                    <div
                      className="w-16 h-16 rounded-lg flex items-center justify-center p-2 mb-2 bg-bg/80 border border-border/60 transition-transform duration-300 group-hover:scale-105"
                      style={{ color: accentColor }}
                    >
                      <FigureComponent className="w-12 h-12" />
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-serif text-xl font-medium leading-snug transition-colors ${
                        locale === "hi"
                          ? "text-madder dark:text-madder"
                          : "text-ink group-hover:text-indigo dark:group-hover:text-indigo"
                      }`}
                    >
                      {t(pillar.title)}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-ink-soft leading-relaxed">
                      {t(pillar.description)}
                    </p>
                  </div>

                  {/* Learn More link */}
                  <div className="pt-6 mt-4 border-t border-border/50">
                    <Link
                      href={pillar.href}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-marigold hover:text-indigo transition-colors"
                    >
                      <span>{locale === "hi" ? "विस्तार से जानें" : "Learn more"}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

export default PillarsSection;
