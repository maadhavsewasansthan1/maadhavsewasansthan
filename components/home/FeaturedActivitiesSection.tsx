"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { featuredActivities } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import LotusMark from "@/components/ui/motifs/LotusMark";

export function FeaturedActivitiesSection() {
  const { t, locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [selectedActivity, setSelectedActivity] = useState<typeof featuredActivities.activities[0] | null>(null);

  return (
    <section id="activities" className="py-16 md:py-24 bg-bg-sand/30 border-y border-border">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl mb-10 md:mb-14">
          <div className="flex items-center gap-2 mb-3">
            <LotusMark width={16} height={16} className="text-marigold" />
            <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
              {t(featuredActivities.badge)}
            </span>
          </div>
          <h2
            className={`font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-tight ${
              locale === "hi" ? "text-madder" : "text-ink"
            }`}
          >
            {t(featuredActivities.headline)}
          </h2>
          <p className="mt-3 text-base text-ink-soft leading-relaxed">
            {t(featuredActivities.subtitle)}
          </p>
        </div>

        {/* 
          Mobile horizontal swipe carousel with snap points.
          Switches to 3-column grid on desktop with 3D tilt hover.
        */}
        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 scrollbar-none"
          style={{ perspective: "1000px" }}
        >
          {featuredActivities.activities.map((activity, index) => {
            const cardContent = (
              <Card
                variant="default"
                padding="none"
                interactive
                className="h-full flex flex-col bg-surface border border-border group cursor-pointer rounded-xl overflow-hidden shadow-xs hover:border-indigo/50 transition-colors"
                onClick={() => setSelectedActivity(activity)}
              >
                {/* Image Frame with warm filter */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-sand">
                  <Image
                    src={activity.image.src}
                    alt={activity.image.alt}
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1200px) 33vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 img-warm"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge variant="outline" className="shadow-xs bg-surface/90 backdrop-blur-xs text-indigo border-border">
                      {t(activity.category)}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-ink-soft">
                      <Calendar className="w-3.5 h-3.5 text-marigold" />
                      <span>{t(activity.date)}</span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-medium text-ink group-hover:text-indigo transition-colors leading-snug">
                      {t(activity.title)}
                    </h3>

                    <p className="text-xs sm:text-sm text-ink-soft leading-relaxed line-clamp-3">
                      {t(activity.description)}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-semibold text-indigo">
                    <span>{t(featuredActivities.readOverview)}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Card>
            );

            if (prefersReducedMotion) {
              return (
                <div
                  key={index}
                  className="min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center flex flex-col"
                >
                  {cardContent}
                </div>
              );
            }

            return (
              <motion.div
                key={index}
                className="min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center flex flex-col"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ y: -6, rotateX: 3, rotateY: -2 }}
              >
                {cardContent}
              </motion.div>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="mt-8 text-center sm:text-left">
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo hover:text-marigold transition-colors hover:underline"
          >
            <span>{locale === "hi" ? "सभी गतिविधियां देखें" : "View All Field Activities"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>

      {/* Modal for Activity Details */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div
            className="bg-surface w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl border border-border p-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge variant="outline" className="text-indigo border-border">{t(selectedActivity.category)}</Badge>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ink mt-2">
                  {t(selectedActivity.title)}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedActivity(null)}
                className="p-2 rounded-full text-ink-soft hover:bg-bg-sand min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-bg-sand">
              <Image
                src={selectedActivity.image.src}
                alt={selectedActivity.image.alt}
                fill
                className="object-cover img-warm"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-ink-soft">
              <Calendar className="w-4 h-4 text-marigold" />
              <span>{t(selectedActivity.date)}</span>
            </div>

            <p className="text-sm text-ink-soft leading-relaxed">
              {t(selectedActivity.description)}
            </p>

            <div className="pt-2 flex justify-end">
              <Link
                href="/activities"
                className="px-4 py-2 rounded-md bg-indigo text-surface hover:bg-indigo-soft text-xs font-medium min-h-[44px] flex items-center justify-center transition-colors"
              >
                {locale === "hi" ? "गतिविधियां पृष्ठ पर जाएं" : "Go to Activities Page"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default FeaturedActivitiesSection;
