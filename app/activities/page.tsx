"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  CheckCircle2,
  Filter,
  ArrowRight,
  X,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { activitiesContent } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { ActivityItem } from "@/content/types";

export default function ActivitiesPage() {
  const { t, locale } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);

  const filteredActivities = activitiesContent.activities.filter((act) => {
    if (activeCategory === "all") return true;
    const catEn = typeof act.category === "string" ? act.category : act.category.en;
    if (activeCategory === "health") return catEn.toLowerCase().includes("health");
    if (activeCategory === "education") return catEn.toLowerCase().includes("education");
    if (activeCategory === "livelihood") return catEn.toLowerCase().includes("livelihood");
    if (activeCategory === "welfare") return catEn.toLowerCase().includes("welfare") || catEn.toLowerCase().includes("social");
    return true;
  });

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
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E39A1E] dark:text-[#F2B84B] block mb-2">
            {t(activitiesContent.badge)}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#241B14] dark:text-[#F6EEDD] leading-[1.14]">
            {locale === "hi" ? (
              <>
                धरातल से <br />
                <span className="italic font-normal text-[#1F2A5C] dark:text-[#A9B6F0]">
                  सेवा की कहानियाँ
                </span>
              </>
            ) : (
              <>
                Stories from <br />
                <span className="italic font-normal text-[#1F2A5C] dark:text-[#A9B6F0]">
                  the Ground.
                </span>
              </>
            )}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#E39A1E] dark:text-[#F2B84B] font-normal mt-2">
            {activitiesContent.headlineHindi}
          </p>

          <p className="mt-4 text-base sm:text-lg text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed">
            {t(activitiesContent.intro)}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-5 border-b border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)]">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#5E4E3F] dark:text-[#B8AE9C] mr-2">
            <Filter className="w-3.5 h-3.5 text-[#1F2A5C] dark:text-[#A9B6F0]" />
            <span>{locale === "hi" ? "श्रेणी फ़िल्टर:" : "Filter:"}</span>
          </div>

          {activitiesContent.categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A5C] dark:focus-visible:ring-[#A9B6F0] min-h-[44px] cursor-pointer ${
                  isSelected
                    ? "bg-[#1F2A5C] text-white shadow-xs dark:bg-[#A9B6F0] dark:text-[#121629]"
                    : "bg-[#FFFDF8] dark:bg-[#1E2640] text-[#241B14] dark:text-[#F6EEDD] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] hover:bg-[#F2E4C9]/60"
                }`}
              >
                {t(cat.label)}
              </button>
            );
          })}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {filteredActivities.map((activity) => (
            <Card
              key={activity.id}
              variant="default"
              padding="none"
              interactive
              className="flex flex-col bg-[#FFFDF8] dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] group h-full"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F2E4C9] dark:bg-[#121629]">
                <Image
                  src={activity.image.src}
                  alt={activity.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 img-warm"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="green" className="shadow-xs bg-[#FFFDF8]/90 dark:bg-[#1E2640]/90 backdrop-blur-xs">
                    {t(activity.category)}
                  </Badge>
                </div>
              </div>

              {/* Content Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Meta Tags */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#5E4E3F] dark:text-[#B8AE9C]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#1F2A5C] dark:text-[#A9B6F0]" />
                      <span>{t(activity.date)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#E39A1E] dark:text-[#F2B84B]" />
                      <span>{t(activity.location)}</span>
                    </div>
                  </div>

                  <h2 className="font-serif text-lg sm:text-xl font-medium text-[#241B14] dark:text-[#F6EEDD] group-hover:text-[#1F2A5C] dark:group-hover:text-[#A9B6F0] transition-colors leading-snug">
                    {t(activity.title)}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed line-clamp-3">
                    {t(activity.description)}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E2D2B3]/60 dark:border-[rgba(226,210,179,0.1)] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedActivity(activity)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#1F2A5C] dark:text-[#A9B6F0] hover:underline cursor-pointer min-h-[44px]"
                  >
                    <span>{locale === "hi" ? "विस्तृत विवरण पढ़ें" : "Read Full Story"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Activity Detail Modal */}
        {selectedActivity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div
              className="bg-[#FFFDF8] dark:bg-[#1E2640] w-full max-w-2xl rounded-2xl border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.14)] p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl relative"
              role="dialog"
              aria-modal="true"
            >
              <button
                type="button"
                onClick={() => setSelectedActivity(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-[#5E4E3F] dark:text-[#B8AE9C] hover:bg-[#F2E4C9]/60 dark:hover:bg-[#121629] min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden">
                <Image
                  src={selectedActivity.image.src}
                  alt={selectedActivity.image.alt}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-3">
                <Badge variant="green">{t(selectedActivity.category)}</Badge>

                <h3 className="font-serif text-2xl font-semibold text-[#241B14] dark:text-[#F6EEDD]">
                  {t(selectedActivity.title)}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#5E4E3F] dark:text-[#B8AE9C]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#1F2A5C] dark:text-[#A9B6F0]" />
                    <span>{t(selectedActivity.date)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E39A1E] dark:text-[#F2B84B]" />
                    <span>{t(selectedActivity.location)}</span>
                  </div>
                </div>

                <p className="text-sm text-[#241B14] dark:text-[#F6EEDD] leading-relaxed pt-2">
                  {selectedActivity.fullStory ? t(selectedActivity.fullStory) : t(selectedActivity.description)}
                </p>

                {selectedActivity.highlights && selectedActivity.highlights.length > 0 && (
                  <div className="pt-3 border-t border-[#E2D2B3]/60 dark:border-[rgba(226,210,179,0.1)] space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1F2A5C] dark:text-[#A9B6F0]">
                      {locale === "hi" ? "प्रमुख बिंदु एवं उपलब्धियां" : "Key Highlights"}
                    </h4>
                    <ul className="space-y-2">
                      {selectedActivity.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#5E4E3F] dark:text-[#B8AE9C]">
                          <CheckCircle2 className="w-4 h-4 text-[#1F2A5C] dark:text-[#A9B6F0] shrink-0 mt-0.5" />
                          <span>{t(h)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <OrnamentalDivider />

        {/* Note on Records */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#F2E4C9]/30 dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] text-xs text-[#5E4E3F] dark:text-[#B8AE9C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p>
            {locale === "hi"
              ? "* जमीनी कार्यक्रमों की विस्तृत रिपोर्ट और आधिकारिक तिथियां नियमित रूप से प्रकाशित की जाती हैं।"
              : "* Field program logs and photo archives are curated and verified on an ongoing basis."}
          </p>
          <Link
            href="/contact"
            className="text-[#1F2A5C] dark:text-[#A9B6F0] font-semibold hover:underline shrink-0 min-h-[44px] inline-flex items-center"
          >
            {locale === "hi" ? "कार्यक्रम में शामिल हों →" : "Join Our Volunteer Network →"}
          </Link>
        </div>
      </Container>
    </div>
  );
}
