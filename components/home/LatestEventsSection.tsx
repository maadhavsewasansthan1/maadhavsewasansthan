"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { latestEvents, getSafeEventDate } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import LotusMark from "@/components/ui/motifs/LotusMark";

export function LatestEventsSection() {
  const { t, locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [selectedEvent, setSelectedEvent] = useState<typeof latestEvents.events[0] | null>(null);

  return (
    <section id="events" className="py-16 md:py-24 bg-bg border-t border-border">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <LotusMark width={16} height={16} className="text-marigold" />
              <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
                {t(latestEvents.badge)}
              </span>
            </div>
            <h2
              className={`font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-tight ${
                locale === "hi" ? "text-madder" : "text-ink"
              }`}
            >
              {t(latestEvents.headline)}
            </h2>
            <p className="text-base text-ink-soft max-w-xl">
              {t(latestEvents.subtitle)}
            </p>
          </div>

          <Button
            href="/events"
            variant="outline"
            size="md"
            className="self-start md:self-auto shrink-0 min-h-[44px] border-border text-ink hover:bg-bg-sand rounded-md"
          >
            <span>{t(latestEvents.viewAllBtn)}</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>

        {/*
          Mobile horizontal swipe carousel with snap points.
          Switches to 3-column grid on md.
        */}
        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-3 scrollbar-none"
          style={{ perspective: "1000px" }}
        >
          {latestEvents.events.map((event, index) => {
            const isUpcoming = event.status === "upcoming";

            const cardContent = (
              <Card
                variant="default"
                padding="lg"
                interactive
                className="h-full flex flex-col justify-between bg-surface border border-border group hover:border-indigo/50 cursor-pointer rounded-xl transition-colors shadow-xs"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="space-y-4">
                  {/* Top status & category */}
                  <div className="flex items-center justify-between gap-2">
                    <Badge
                      variant={isUpcoming ? "green" : "neutral"}
                      className={`text-[11px] ${
                        isUpcoming
                          ? "bg-sage/15 text-sage border-sage/30"
                          : "bg-bg-sand text-ink-soft border-border"
                      }`}
                    >
                      {isUpcoming
                        ? t(latestEvents.upcomingBadge)
                        : t(latestEvents.pastBadge)}
                    </Badge>

                    <span className="text-xs text-ink-soft font-medium">
                      {t(event.category)}
                    </span>
                  </div>

                  {/* Event Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-ink group-hover:text-indigo transition-colors leading-snug">
                    {t(event.title)}
                  </h3>

                  {/* Metadata: Date & Location */}
                  <div className="space-y-1.5 text-xs text-ink-soft pt-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-marigold shrink-0" />
                      <span>{getSafeEventDate(event, locale)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-madder shrink-0" />
                      <span>{t(event.location)}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-ink-soft leading-relaxed pt-2 border-t border-border/60 line-clamp-3">
                    {t(event.description)}
                  </p>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-indigo">
                  <span>{t(latestEvents.detailsLabel)}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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
                whileHover={{ y: -4, rotateX: 2 }}
              >
                {cardContent}
              </motion.div>
            );
          })}
        </div>
      </Container>

      {/* Modal for Event Details */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div
            className="bg-surface w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl border border-border p-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge
                  variant={selectedEvent.status === "upcoming" ? "green" : "neutral"}
                  className="border-border"
                >
                  {selectedEvent.status === "upcoming"
                    ? t(latestEvents.upcomingBadge)
                    : t(latestEvents.pastBadge)}
                </Badge>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ink mt-2">
                  {t(selectedEvent.title)}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="p-2 rounded-full text-ink-soft hover:bg-bg-sand min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-ink-soft p-3 rounded-xl bg-bg-sand">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-marigold" />
                <span className="font-medium text-ink">
                  {getSafeEventDate(selectedEvent, locale)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-madder" />
                <span>{t(selectedEvent.location)}</span>
              </div>
            </div>

            <p className="text-sm text-ink-soft leading-relaxed">
              {t(selectedEvent.description)}
            </p>

            <div className="pt-2 flex items-center justify-between">
              <Link
                href="/events"
                className="text-xs font-semibold text-indigo hover:text-marigold transition-colors hover:underline"
              >
                {locale === "hi" ? "सभी कार्यक्रम देखें →" : "View all programmes →"}
              </Link>
              <Button
                href="/contact"
                variant="primary"
                size="sm"
                className="min-h-[44px] bg-indigo hover:bg-indigo-soft text-surface rounded-md"
              >
                {locale === "hi" ? "सहयोग दें" : "Volunteer for this"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default LatestEventsSection;
