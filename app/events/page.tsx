"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
  Info,
  CheckCircle2,
  X,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { eventsContent, getSafeEventDate } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { EventItem } from "@/content/types";

export default function EventsPage() {
  const { t, locale } = useLanguage();
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const upcomingEvents = eventsContent.events.filter((e) => e.status === "upcoming");
  const pastEvents = eventsContent.events.filter((e) => e.status === "past");

  return (
    <div className="py-10 md:py-20 bg-[#FBF5EA] dark:bg-[#121629] min-h-screen">
      <Container size="default">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#5E4E3F] dark:text-[#B8AE9C] hover:text-[#1F2A5C] dark:hover:text-[#A9B6F0] transition-colors mb-6 group min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{locale === "hi" ? "मुख्य पृष्ठ पर वापस" : "Back to Home"}</span>
        </Link>

        {/* Page Hero */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1F2A5C] dark:text-[#A9B6F0] block mb-2">
            {t(eventsContent.badge)}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#241B14] dark:text-[#F6EEDD] leading-[1.14]">
            {locale === "hi" ? (
              <>
                कार्यक्रम एवं <br />
                <span className="italic font-normal text-[#1F2A5C] dark:text-[#A9B6F0]">
                  आयोजनाएं
                </span>
              </>
            ) : (
              <>
                Events &amp; <br />
                <span className="italic font-normal text-[#1F2A5C] dark:text-[#A9B6F0]">
                  Programmes.
                </span>
              </>
            )}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#E39A1E] dark:text-[#F2B84B] font-normal mt-2">
            {eventsContent.headlineHindi}
          </p>

          <p className="mt-4 text-base sm:text-lg text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed">
            {t(eventsContent.intro)}
          </p>
        </div>

        <OrnamentalDivider />

        {/* Section 1: Upcoming Events */}
        <div className="mb-16 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1F2A5C] dark:text-[#A9B6F0]">
                {locale === "hi" ? "आगामी तिथियां" : "Upcoming Schedules"}
              </span>
              <h2 className="font-serif text-2xl font-semibold text-[#241B14] dark:text-[#F6EEDD] mt-0.5">
                {t(eventsContent.upcomingHeading)}
              </h2>
            </div>
            <Badge variant="green">
              {upcomingEvents.length} {locale === "hi" ? "कार्यक्रम" : "Upcoming"}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                variant="default"
                padding="lg"
                interactive
                className="flex flex-col justify-between bg-[#FFFDF8] dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] group h-full"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="green" className="text-[11px]">
                      {locale === "hi" ? "आगामी" : "Upcoming"}
                    </Badge>
                    <span className="text-xs font-medium text-[#5E4E3F] dark:text-[#B8AE9C]">
                      {t(event.category)}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-medium text-[#241B14] dark:text-[#F6EEDD] group-hover:text-[#1F2A5C] dark:group-hover:text-[#A9B6F0] transition-colors leading-snug">
                    {t(event.title)}
                  </h3>

                  <div className="space-y-2 text-xs text-[#5E4E3F] dark:text-[#B8AE9C]">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#1F2A5C] dark:text-[#A9B6F0] shrink-0 mt-0.5" />
                      <span className="font-medium text-[#241B14] dark:text-[#F6EEDD]">
                        {getSafeEventDate(event, locale)}
                      </span>
                    </div>

                    {event.time && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#E39A1E] dark:text-[#F2B84B] shrink-0" />
                        <span>{t(event.time)}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#E39A1E] dark:text-[#F2B84B] shrink-0" />
                      <span>{t(event.location)}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed line-clamp-3 pt-1">
                    {t(event.description)}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E2D2B3]/60 dark:border-[rgba(226,210,179,0.1)] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(event)}
                    className="text-xs font-semibold text-[#1F2A5C] dark:text-[#A9B6F0] hover:underline cursor-pointer min-h-[44px] inline-flex items-center gap-1"
                  >
                    <span>{locale === "hi" ? "विवरण देखें" : "View Details"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <span className="text-[11px] text-[#5E4E3F] dark:text-[#B8AE9C]">
                    {event.organizer ? t(event.organizer) : ""}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 2: Concluded / Past Events */}
        <div className="mb-16 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#5E4E3F] dark:text-[#B8AE9C]">
                {locale === "hi" ? "अभिलेखीय सेवा विवरण" : "Completed Service Records"}
              </span>
              <h2 className="font-serif text-2xl font-semibold text-[#241B14] dark:text-[#F6EEDD] mt-0.5">
                {t(eventsContent.pastHeading)}
              </h2>
            </div>
            <Badge variant="neutral">
              {pastEvents.length} {locale === "hi" ? "संपन्न" : "Concluded"}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {pastEvents.map((event) => (
              <Card
                key={event.id}
                variant="default"
                padding="lg"
                interactive
                className="flex flex-col justify-between bg-[#FFFDF8]/80 dark:bg-[#1E2640]/80 border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] group h-full"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="neutral" className="text-[11px]">
                      {locale === "hi" ? "संपन्न" : "Completed"}
                    </Badge>
                    <span className="text-xs font-medium text-[#5E4E3F] dark:text-[#B8AE9C]">
                      {t(event.category)}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-medium text-[#241B14] dark:text-[#F6EEDD] group-hover:text-[#1F2A5C] dark:group-hover:text-[#A9B6F0] transition-colors leading-snug">
                    {t(event.title)}
                  </h3>

                  <div className="space-y-2 text-xs text-[#5E4E3F] dark:text-[#B8AE9C]">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#1F2A5C] dark:text-[#A9B6F0] shrink-0 mt-0.5" />
                      {/* Past events display their completed date, NEVER "Date to be announced" */}
                      <span className="font-medium text-[#241B14] dark:text-[#F6EEDD]">
                        {getSafeEventDate(event, locale)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#E39A1E] dark:text-[#F2B84B] shrink-0" />
                      <span>{t(event.location)}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed line-clamp-3 pt-1">
                    {t(event.description)}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E2D2B3]/60 dark:border-[rgba(226,210,179,0.1)] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(event)}
                    className="text-xs font-semibold text-[#1F2A5C] dark:text-[#A9B6F0] hover:underline cursor-pointer min-h-[44px] inline-flex items-center gap-1"
                  >
                    <span>{locale === "hi" ? "अभिलेख विवरण" : "Read Archive"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <span className="text-[11px] text-[#1F2A5C] dark:text-[#A9B6F0] font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{locale === "hi" ? "सत्यापित" : "Verified"}</span>
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div
              className="bg-[#FFFDF8] dark:bg-[#1E2640] w-full max-w-xl rounded-2xl border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.14)] p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl relative"
              role="dialog"
              aria-modal="true"
            >
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-[#5E4E3F] dark:text-[#B8AE9C] hover:bg-[#F2E4C9]/60 dark:hover:bg-[#121629] min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3">
                <Badge variant={selectedEvent.status === "upcoming" ? "green" : "neutral"}>
                  {selectedEvent.status === "upcoming"
                    ? locale === "hi"
                      ? "आगामी कार्यक्रम"
                      : "Upcoming Initiative"
                    : locale === "hi"
                    ? "सफलतापूर्वक संपन्न"
                    : "Concluded Program"}
                </Badge>

                <h3 className="font-serif text-2xl font-semibold text-[#241B14] dark:text-[#F6EEDD]">
                  {t(selectedEvent.title)}
                </h3>

                <div className="space-y-2 text-xs sm:text-sm text-[#5E4E3F] dark:text-[#B8AE9C] pt-1">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-[#1F2A5C] dark:text-[#A9B6F0] shrink-0 mt-0.5" />
                    <span className="font-medium text-[#241B14] dark:text-[#F6EEDD]">
                      {getSafeEventDate(selectedEvent, locale)}
                    </span>
                  </div>

                  {selectedEvent.time && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#E39A1E] dark:text-[#F2B84B] shrink-0" />
                      <span>{t(selectedEvent.time)}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#E39A1E] dark:text-[#F2B84B] shrink-0" />
                    <span>{t(selectedEvent.location)}</span>
                  </div>
                </div>

                <p className="text-sm text-[#241B14] dark:text-[#F6EEDD] leading-relaxed pt-2">
                  {t(selectedEvent.description)}
                </p>

                {selectedEvent.registrationNote && (
                  <div className="p-3.5 rounded-xl bg-[#F2E4C9]/40 dark:bg-[#121629] border border-[#E2D2B3]/70 dark:border-[rgba(226,210,179,0.1)] text-xs text-[#241B14] dark:text-[#F6EEDD] flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#1F2A5C] dark:text-[#A9B6F0] shrink-0" />
                    <span>{t(selectedEvent.registrationNote)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <OrnamentalDivider />

        {/* Footer Guidance */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#F2E4C9]/30 dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] text-xs text-[#5E4E3F] dark:text-[#B8AE9C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p>
            {locale === "hi"
              ? "* कार्यक्रमों के सटीक समय और स्थल में आवश्यकतानुसार समन्वय किया जा सकता है। कृपया पुष्टि हेतु संपर्क करें।"
              : "* Event dates and venues are coordinated directly with village administration. Contact the desk for attendance confirmation."}
          </p>
          <Link
            href="/contact"
            className="text-[#1F2A5C] dark:text-[#A9B6F0] font-semibold hover:underline shrink-0 min-h-[44px] inline-flex items-center"
          >
            {locale === "hi" ? "कार्यक्रम समन्वय से जुड़ें →" : "Coordinate an Event →"}
          </Link>
        </div>
      </Container>
    </div>
  );
}
