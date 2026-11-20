"use client";

import React, { useRef } from "react";
import { Info } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { impactHighlights } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import BlockPrintBorder from "@/components/ui/motifs/BlockPrintBorder";
import LotusMark from "@/components/ui/motifs/LotusMark";

function TiltImpactCard({ stat, index, locale }: { stat: any; index: number; locale: string }) {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cardContent = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="p-6 rounded-xl bg-white/[0.06] dark:bg-[#13192D] border border-white/10 dark:border-[#222C4A] hover:border-marigold/50 dark:hover:border-[#F2B84B]/60 shadow-xs dark:shadow-md flex flex-col justify-between h-full transition-all backdrop-blur-xs"
    >
      <div>
        {stat.note ? (
          <span className="text-[11px] text-marigold dark:text-[#F2B84B] bg-marigold/15 dark:bg-[#F2B84B]/15 px-2.5 py-1 rounded-md inline-block mb-2.5 font-medium border border-marigold/30 dark:border-[#F2B84B]/30">
            {typeof stat.note === "string" ? stat.note : stat.note[locale] || stat.note.en}
          </span>
        ) : (
          <p className="font-serif text-2xl sm:text-3xl font-bold text-marigold dark:text-[#F2B84B] mb-1">
            {typeof stat.value === "string" ? stat.value : stat.value?.[locale] || stat.value?.en}
          </p>
        )}
        <p className="font-serif text-lg sm:text-xl font-medium text-white dark:text-[#F6EEDD] leading-snug">
          {stat.label && (typeof stat.label === "string" ? stat.label : stat.label[locale] || stat.label.en)}
        </p>
        <p className="text-xs sm:text-sm text-white/75 dark:text-[#D4CBBC]/85 mt-2 leading-relaxed">
          {stat.description && (typeof stat.description === "string" ? stat.description : stat.description[locale] || stat.description.en)}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-white/10 dark:border-[#222C4A] flex items-center justify-between text-[11px] text-white/60 dark:text-[#A89F90]">
        <span>{locale === "hi" ? `स्तंभ ०${index + 1}` : `Pillar 0${index + 1}`}</span>
        <span className="font-mono text-marigold dark:text-[#F2B84B] font-medium">Raebareli, UP</span>
      </div>
    </div>
  );

  if (reduced) {
    return <div className="h-full">{cardContent}</div>;
  }

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="h-full"
    >
      {cardContent}
    </motion.div>
  );
}

export function ImpactHighlightsSection() {
  const { t, locale } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-[#1F2A5C] dark:bg-[#0B1021] text-[#FAF9F5] border-y border-[#2B3875] dark:border-[#1E2746] relative overflow-hidden transition-colors">
      {/* Decorative BlockPrintBorder as top and bottom framing */}
      <div className="absolute top-0 inset-x-0">
        <BlockPrintBorder className="text-white/10 dark:text-white/10" />
      </div>

      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-2">
            <LotusMark width={16} height={16} className="text-marigold dark:text-[#F2B84B]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-marigold dark:text-[#F2B84B]">
              {t(impactHighlights.badge)}
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight whitespace-pre-line leading-[1.2] text-white dark:text-[#F6EEDD]">
            {t(impactHighlights.headline)}
          </h2>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/80 dark:text-[#E2D9C8]/85 leading-relaxed max-w-2xl">
            {t(impactHighlights.subtitle)}
          </p>
        </div>

        {/* 3D Tilt Cards Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          style={{ perspective: "1000px" }}
        >
          {impactHighlights.stats.map((stat, index) => (
            <TiltImpactCard key={index} stat={stat} index={index} locale={locale} />
          ))}
        </div>

        {/* Calm Transparency Notice */}
        <div className="mt-10 p-4 sm:p-5 rounded-xl bg-white/[0.05] dark:bg-[#13192D] border border-white/10 dark:border-[#222C4A] flex items-start sm:items-center gap-3 text-xs text-white/80 dark:text-[#D4CBBC]/85">
          <Info className="w-4 h-4 text-marigold dark:text-[#F2B84B] shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed">
            <strong className="text-white dark:text-[#F6EEDD]">
              {t(impactHighlights.editorialNotice)}
            </strong>{" "}
            {t(impactHighlights.note)} Figures to be certified by the organisation upon annual review.
          </p>
        </div>
      </Container>

      <div className="absolute bottom-0 inset-x-0">
        <BlockPrintBorder className="text-white/10 dark:text-white/10" />
      </div>
    </section>
  );
}

export default ImpactHighlightsSection;
