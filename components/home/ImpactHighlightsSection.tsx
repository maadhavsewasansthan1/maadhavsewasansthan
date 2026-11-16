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
      className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-marigold/40 flex flex-col justify-between h-full transition-colors backdrop-blur-xs"
    >
      <div>
        {stat.note ? (
          <span className="text-[11px] text-marigold/90 bg-marigold/10 px-2.5 py-1 rounded-md inline-block mb-2.5 font-medium border border-marigold/20">
            {typeof stat.note === "string" ? stat.note : stat.note[locale] || stat.note.en}
          </span>
        ) : (
          <p className="font-serif text-2xl sm:text-3xl font-bold text-marigold mb-1">
            {typeof stat.value === "string" ? stat.value : stat.value?.[locale] || stat.value?.en}
          </p>
        )}
        <p className="font-serif text-lg sm:text-xl font-medium text-white leading-snug">
          {stat.label && (typeof stat.label === "string" ? stat.label : stat.label[locale] || stat.label.en)}
        </p>
        <p className="text-xs sm:text-sm text-surface/80 mt-2 leading-relaxed">
          {stat.description && (typeof stat.description === "string" ? stat.description : stat.description[locale] || stat.description.en)}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-surface/60">
        <span>{locale === "hi" ? `स्तंभ ०${index + 1}` : `Pillar 0${index + 1}`}</span>
        <span className="font-mono text-marigold">Raebareli, UP</span>
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
    <section className="py-16 md:py-24 bg-indigo text-surface relative overflow-hidden">
      {/* Decorative BlockPrintBorder as top and bottom framing */}
      <div className="absolute top-0 inset-x-0">
        <BlockPrintBorder className="text-surface opacity-10" />
      </div>

      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-2">
            <LotusMark width={16} height={16} className="text-marigold" />
            <span className="text-xs font-semibold uppercase tracking-wider text-marigold">
              {t(impactHighlights.badge)}
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight whitespace-pre-line leading-[1.2] text-white">
            {t(impactHighlights.headline)}
          </h2>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-surface/80 leading-relaxed max-w-2xl">
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
        <div className="mt-10 p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 flex items-start sm:items-center gap-3 text-xs text-surface/80">
          <Info className="w-4 h-4 text-marigold shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed">
            <strong className="text-white">
              {t(impactHighlights.editorialNotice)}
            </strong>{" "}
            {t(impactHighlights.note)} Figures to be certified by the organisation upon annual review.
          </p>
        </div>
      </Container>

      <div className="absolute bottom-0 inset-x-0">
        <BlockPrintBorder className="text-surface opacity-10" />
      </div>
    </section>
  );
}

export default ImpactHighlightsSection;
