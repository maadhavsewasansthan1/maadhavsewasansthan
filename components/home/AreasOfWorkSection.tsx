"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { areasOfWork } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { useMotionSafe } from "@/lib/motion/useMotionSafe";
import LotusMark from "@/components/ui/motifs/LotusMark";

function CountUpNumber({ targetNumber }: { targetNumber: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 800; // ms
    const stepTime = Math.max(Math.floor(duration / targetNumber), 50);

    const timer = setInterval(() => {
      start += 1;
      setCurrent(start);
      if (start >= targetNumber) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, targetNumber]);

  return (
    <span ref={ref} className="font-serif text-2xl sm:text-3xl text-marigold font-normal shrink-0">
      {String(current).padStart(2, "0")}
    </span>
  );
}

export function AreasOfWorkSection() {
  const { t, locale } = useLanguage();
  const { slideInFromRight, reduced } = useMotionSafe();

  return (
    <section id="our-work" className="py-16 md:py-24 bg-bg border-t border-border">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl mb-10 md:mb-14">
          <div className="flex items-center gap-2 mb-3">
            <LotusMark width={16} height={16} className="text-marigold" />
            <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
              {t(areasOfWork.badge)}
            </span>
          </div>
          <h2
            className={`font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-tight ${
              locale === "hi" ? "text-madder" : "text-ink"
            }`}
          >
            {t(areasOfWork.headline)}
          </h2>
          <p className="mt-3 text-base text-ink-soft leading-relaxed">
            {t(areasOfWork.intro)}
          </p>
        </div>

        {/* Editorial List-Style Layout with Count-Up and Slide-In */}
        <div className="border-t border-border">
          {areasOfWork.areas.map((area, index) => {
            const areaKey = typeof area.title === "string" ? area.title : area.title.en;
            const areaSlug = areaKey.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            const targetNum = index + 1;

            const rowContent = (
              <Link
                href={`/our-work#${areaSlug}`}
                className="group block py-6 sm:py-8 border-b border-border hover:bg-surface transition-colors -mx-4 px-4 sm:mx-0 sm:px-4 rounded-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-start">

                  {/* Number & Title */}
                  <div className="md:col-span-5 flex items-baseline gap-4 sm:gap-6">
                    <CountUpNumber targetNumber={targetNum} />
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-ink group-hover:text-indigo transition-colors leading-snug">
                      {t(area.title)}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-6 pl-10 md:pl-0">
                    <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                      {t(area.description)}
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="md:col-span-1 hidden md:flex items-center justify-end text-indigo pt-1">
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 opacity-60 group-hover:opacity-100" />
                  </div>

                </div>

                {/* Mobile tap indicator */}
                <div className="md:hidden flex items-center justify-between text-xs font-semibold text-indigo pt-3 pl-10">
                  <span className="uppercase tracking-wider">{t(areasOfWork.learnMoreLabel)}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </Link>
            );

            if (reduced) {
              return <div key={index}>{rowContent}</div>;
            }

            return (
              <motion.div
                key={index}
                variants={slideInFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                {rowContent}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default AreasOfWorkSection;
