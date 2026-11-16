"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  ShieldCheck,
  Sprout,
  HandHeart,
  Target,
  Users,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { FounderSection } from "@/components/sections/FounderSection";
import { aboutContent } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const iconMap: Record<string, React.ElementType> = {
  Heart,
  ShieldCheck,
  Sprout,
  HandHeart,
};

export default function AboutPage() {
  const { t, locale } = useLanguage();

  return (
    <div className="py-10 md:py-20 bg-[#FBF5EA] dark:bg-[#121629] min-h-screen">
      <Container size="default">
        {/* Navigation Breadcrumb & Anchors */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#5E4E3F] dark:text-[#B8AE9C] hover:text-[#1F2A5C] dark:hover:text-[#A9B6F0] transition-colors group min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{locale === "hi" ? "मुख्य पृष्ठ पर लौटें" : "Back to Home"}</span>
          </Link>

          <a
            href="#founder"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1F2A5C] dark:text-[#A9B6F0] hover:underline min-h-[44px]"
          >
            <span>{locale === "hi" ? "संस्थापक से मिलें" : "Meet the Founder"}</span>
            <span>&darr;</span>
          </a>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16">
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1F2A5C] dark:text-[#A9B6F0] block">
              {t(aboutContent.badge)}
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#241B14] dark:text-[#F6EEDD] leading-[1.12]">
              {t(aboutContent.headline)}
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-[#E39A1E] dark:text-[#F2B84B] font-normal">
              {aboutContent.headlineHindi}
            </p>

            <p className="text-base sm:text-lg text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed">
              {t(aboutContent.subheadline)}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Button href="/our-work" variant="primary" size="lg" className="gap-2 min-h-[48px]">
                <span>{locale === "hi" ? "हमारे कार्यक्षेत्र" : "Explore Our Work"}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="#founder" variant="outline" size="lg" className="min-h-[48px]">
                <span>{locale === "hi" ? "संस्थापक से मिलें" : "Meet the Founder"}</span>
              </Button>
            </div>
          </div>

          {/* Right Image with Awadhi Arch Mask */}
          <div className="lg:col-span-5">
            <div className="relative arch-frame aspect-[4/3] sm:aspect-[4/5] bg-[#F2E4C9] dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.14)] shadow-md">
              <Image
                src={aboutContent.image.src}
                alt={aboutContent.image.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 450px"
                className="object-cover object-center img-warm"
              />
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-[#FFFDF8]/90 dark:bg-[#121629]/90 backdrop-blur-xs border-t border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] text-[#241B14] dark:text-[#F6EEDD]">
                <p className="text-[11px] uppercase tracking-wider text-[#1F2A5C] dark:text-[#A9B6F0] font-semibold">
                  {locale === "hi" ? "जमीनी सेवा" : "Field Outreach"}
                </p>
                <p className="font-serif text-xs sm:text-sm font-medium mt-0.5">
                  {aboutContent.image.caption ? t(aboutContent.image.caption) : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        <OrnamentalDivider />

        {/* Narrative & Paragraphs */}
        <div className="mb-16 max-w-3xl space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#241B14] dark:text-[#F6EEDD]">
            {locale === "hi" ? "हमारी यात्रा एवं आदर्श" : "Our Story & Guiding Ethos"}
          </h2>
          <div className="space-y-4 text-base sm:text-lg text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed">
            {aboutContent.paragraphs.map((p, idx) => (
              <p key={idx}>{t(p)}</p>
            ))}
          </div>
        </div>

        {/* Mission & Vision Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F2E4C9]/50 dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1F2A5C]/10 dark:bg-[#A9B6F0]/15 flex items-center justify-center text-[#1F2A5C] dark:text-[#A9B6F0]">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#241B14] dark:text-[#F6EEDD]">
              {locale === "hi" ? "हमारा लक्ष्य (Mission)" : "Our Mission"}
            </h3>
            <p className="text-base text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed">
              {t(aboutContent.mission)}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFDF8] dark:bg-[#121629] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#E39A1E]/15 dark:bg-[#F2B84B]/15 flex items-center justify-center text-[#E39A1E] dark:text-[#F2B84B]">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#241B14] dark:text-[#F6EEDD]">
              {locale === "hi" ? "हमारा दृष्टिकोण (Vision)" : "Our Vision"}
            </h3>
            <p className="text-base text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed">
              {t(aboutContent.vision)}
            </p>
          </div>
        </div>

        <OrnamentalDivider />

        {/* Founder Profile Section */}
        <div className="mb-16">
          <FounderSection id="founder" className="border-t-0 py-0 md:py-4 bg-transparent dark:bg-transparent" />
        </div>

        <OrnamentalDivider />

        {/* Core Values Grid */}
        <div className="mb-16 space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1F2A5C] dark:text-[#A9B6F0]">
              {locale === "hi" ? "हमारे आधारभूत सिद्धांत" : "What Guides Us"}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#241B14] dark:text-[#F6EEDD] mt-1">
              {locale === "hi" ? "मूल मूल्य एवं आदर्श" : "Core Principles & Values"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aboutContent.values.map((val, idx) => {
              const Icon = iconMap[val.iconName || "Heart"] || Heart;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#FFFDF8] dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] space-y-2.5"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#1F2A5C]/10 dark:bg-[#A9B6F0]/15 flex items-center justify-center text-[#1F2A5C] dark:text-[#A9B6F0]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-[#241B14] dark:text-[#F6EEDD]">
                      {t(val.title)}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed">
                    {t(val.description)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <OrnamentalDivider />

        {/* Who We Are: Placeholder Team Section (No invented names) */}
        <div className="mb-16 space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#E39A1E] dark:text-[#F2B84B]">
              {t(aboutContent.teamSection.badge)}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#241B14] dark:text-[#F6EEDD] mt-1">
              {t(aboutContent.teamSection.title)}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5E4E3F] dark:text-[#B8AE9C] max-w-2xl">
              {t(aboutContent.teamSection.subtitle)}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {aboutContent.teamSection.members.map((member, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-[#FFFDF8] dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="w-9 h-9 rounded-lg bg-[#1F2A5C]/10 dark:bg-[#A9B6F0]/15 flex items-center justify-center text-[#1F2A5C] dark:text-[#A9B6F0] mb-2">
                    <Users className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#241B14] dark:text-[#F6EEDD]">
                    {t(member.role)}
                  </h3>
                  <p className="text-xs text-[#1F2A5C] dark:text-[#A9B6F0] font-medium">
                    {t(member.department)}
                  </p>
                  <p className="text-xs text-[#5E4E3F] dark:text-[#B8AE9C] pt-1">
                    {t(member.note)}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E2D2B3]/60 dark:border-[rgba(226,210,179,0.1)] text-[11px] text-[#5E4E3F] dark:text-[#B8AE9C]/80 italic">
                  {t(member.status)}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-[#F2E4C9]/40 dark:bg-[#121629] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.1)] text-xs text-[#5E4E3F] dark:text-[#B8AE9C] flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-[#E39A1E] dark:text-[#F2B84B] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {t(aboutContent.teamSection.disclaimer)}
            </p>
          </div>
        </div>

        {/* Governance & Compliance */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F2E4C9]/40 dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1F2A5C] dark:text-[#A9B6F0]">
              <ShieldCheck className="w-4 h-4" />
              <span>{locale === "hi" ? "पारदर्शिता एवं वैधानिक स्थिति" : "Governance & Accountability"}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed">
              {t(aboutContent.governanceNote)}
            </p>
          </div>

          <Button href="/contact" variant="outline" size="md" className="shrink-0 min-h-[44px]">
            <span>{locale === "hi" ? "सूचना का अनुरोध" : "Request Information"}</span>
          </Button>
        </div>
      </Container>
    </div>
  );
}
