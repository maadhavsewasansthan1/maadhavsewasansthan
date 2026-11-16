"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  GraduationCap,
  HeartPulse,
  Sprout,
  HandHeart,
  CheckCircle2,
  ArrowRight,
  HeartHandshake,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { areasOfWorkContent } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  HeartPulse,
  Sprout,
  HandHeart,
};

export default function OurWorkPage() {
  const { t, locale } = useLanguage();

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
            {t(areasOfWorkContent.badge)}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#241B14] dark:text-[#F6EEDD] leading-[1.14]">
            {locale === "hi" ? (
              <>
                हमारा प्रयास, <br />
                <span className="italic font-normal text-[#1F2A5C] dark:text-[#A9B6F0]">
                  समाज का उत्थान
                </span>
              </>
            ) : (
              <>
                Where We Direct <br />
                <span className="italic font-normal text-[#1F2A5C] dark:text-[#A9B6F0]">
                  Our Efforts.
                </span>
              </>
            )}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#E39A1E] dark:text-[#F2B84B] font-normal mt-2">
            {areasOfWorkContent.headlineHindi}
          </p>

          <p className="mt-4 text-base sm:text-lg text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed">
            {t(areasOfWorkContent.intro)}
          </p>
        </div>

        <OrnamentalDivider />

        {/* Detailed 4 Focus Pillars */}
        <div className="space-y-8 sm:space-y-12 mb-16">
          {areasOfWorkContent.areas.map((area, index) => {
            const Icon = iconMap[area.icon] || HandHeart;
            const isGreen = index % 2 === 0;

            return (
              <div
                key={area.id}
                id={area.id}
                className="scroll-mt-24 p-6 sm:p-8 lg:p-10 rounded-2xl bg-[#FFFDF8] dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] shadow-xs transition-shadow hover:shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                  
                  {/* Left Column: Title & Narrative (7 cols) */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          isGreen
                            ? "bg-[#1F2A5C]/10 text-[#1F2A5C] dark:bg-[#A9B6F0]/15 dark:text-[#A9B6F0]"
                            : "bg-[#E39A1E]/15 text-[#9E651D] dark:bg-[#F2B84B]/15 dark:text-[#F2B84B]"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-semibold text-[#5E4E3F] dark:text-[#B8AE9C]">
                          {locale === "hi" ? "स्तंभ" : "Pillar"} {String(index + 1).padStart(2, "0")}
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#241B14] dark:text-[#F6EEDD]">
                          {t(area.title)}
                        </h2>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-[#241B14] dark:text-[#F6EEDD] font-medium leading-relaxed">
                      {t(area.shortDescription)}
                    </p>

                    <p className="text-sm text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed">
                      {t(area.fullDescription)}
                    </p>

                    {/* Impact Goal Callout */}
                    <div className="p-4 rounded-xl bg-[#F2E4C9]/35 dark:bg-[#121629] border border-[#E2D2B3]/70 dark:border-[rgba(226,210,179,0.1)]">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A93A2B] dark:text-[#E88A76] block mb-1">
                        {locale === "hi" ? "दीर्घकालिक प्रभाव लक्ष्य" : "Target Impact Outcome"}
                      </span>
                      <p className="font-serif text-sm font-medium text-[#241B14] dark:text-[#F6EEDD] italic">
                        &ldquo;{t(area.impactGoal)}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Key Initiatives (5 cols) */}
                  <div className="lg:col-span-5 p-5 sm:p-6 rounded-xl bg-[#F2E4C9]/20 dark:bg-[#121629]/60 border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.1)] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#241B14] dark:text-[#F6EEDD]">
                        {locale === "hi" ? "प्रमुख कार्य एवं पहल" : "Key Field Initiatives"}
                      </span>
                      <Badge variant={isGreen ? "green" : "marigold"} className="text-[11px]">
                        {t(area.accentBadge)}
                      </Badge>
                    </div>

                    <ul className="space-y-3">
                      {area.keyInitiatives.map((initiative, initIdx) => (
                        <li key={initIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#5E4E3F] dark:text-[#B8AE9C]">
                          <CheckCircle2 className="w-4 h-4 text-[#1F2A5C] dark:text-[#A9B6F0] shrink-0 mt-0.5" />
                          <span>{t(initiative)}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2 border-t border-[#E2D2B3]/60 dark:border-[rgba(226,210,179,0.1)]">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F2A5C] dark:text-[#A9B6F0] hover:underline min-h-[44px]"
                      >
                        <span>{locale === "hi" ? "इस क्षेत्र में सहयोग करें" : "Support this initiative"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        <OrnamentalDivider />

        {/* Action Callout */}
        <div className="p-6 sm:p-10 rounded-2xl bg-[#1F2A5C] dark:bg-[#1E2640] text-[#FAF9F5] border border-transparent dark:border-[rgba(226,210,179,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#FAF9F5]">
              {locale === "hi" ? "हमारे साथ सेवा में सहभागी बनें" : "Partner with Our Field Efforts"}
            </h3>
            <p className="text-sm text-[#FAF9F5]/80 leading-relaxed">
              {locale === "hi"
                ? "रायबरेली के ग्रामीण क्षेत्रों में स्वास्थ्य, शिक्षा, स्वरोजगार और जनकल्याण के कार्यों में अपना सहयोग दें।"
                : "Whether through voluntary field time, educational resources, or material relief, your collaboration creates direct grassroots impact."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button href="/donate" variant="primary" size="lg" className="bg-[#FAF9F5] text-[#1F2A5C] hover:bg-[#FAF9F5]/90 min-h-[44px]">
              {locale === "hi" ? "सहयोग करें" : "Contribute Now"}
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="border-[#FAF9F5]/40 text-[#FAF9F5] hover:bg-[#FAF9F5]/10 min-h-[44px]">
              {locale === "hi" ? "संपर्क करें" : "Contact Desk"}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
