"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  Camera,
  Video,
  MapPin,
  Calendar,
  Filter,
  X,
  Clock,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { galleryContent } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { GalleryItem } from "@/content/types";

export default function GalleryPage() {
  const { t, locale } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);

  const filteredItems = galleryContent.items.filter((item) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Photos") return item.type === "photo";
    if (activeCategory === "Videos") return item.type === "video";
    const catEn = typeof item.category === "string" ? item.category : item.category.en;
    return catEn.toLowerCase().includes(activeCategory.toLowerCase());
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
        <div className="max-w-3xl mb-10 sm:mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1F2A5C] dark:text-[#A9B6F0] block mb-2">
            {t(galleryContent.badge)}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#241B14] dark:text-[#F6EEDD] leading-[1.14]">
            {locale === "hi" ? (
              <>
                सेवा एवं समर्पण के <br />
                <span className="italic font-normal text-[#1F2A5C] dark:text-[#A9B6F0]">
                  कुछ अविस्मरणीय पल
                </span>
              </>
            ) : (
              <>
                Moments of Service <br />
                <span className="italic font-normal text-[#1F2A5C] dark:text-[#A9B6F0]">
                  &amp; Community.
                </span>
              </>
            )}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#E39A1E] dark:text-[#F2B84B] font-normal mt-2">
            {galleryContent.headlineHindi}
          </p>

          <p className="mt-4 text-base sm:text-lg text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed">
            {t(galleryContent.intro)}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-5 border-b border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)]">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#5E4E3F] dark:text-[#B8AE9C] mr-2">
            <Filter className="w-3.5 h-3.5 text-[#1F2A5C] dark:text-[#A9B6F0]" />
            <span>{locale === "hi" ? "फ़िल्टर:" : "Filter:"}</span>
          </div>

          {galleryContent.categories.map((cat) => {
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

        {/* Media Grid: Photos and Video Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {filteredItems.map((item) => {
            const isVideo = item.type === "video";

            return (
              <Card
                key={item.id}
                variant="default"
                padding="none"
                interactive
                onClick={() => setSelectedMedia(item)}
                className="flex flex-col bg-[#FFFDF8] dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] group overflow-hidden cursor-pointer"
              >
                {/* Media Thumbnail Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F2E4C9] dark:bg-[#121629]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 img-warm"
                  />

                  {/* Badge: Category */}
                  <div className="absolute top-3 left-3 z-10">
                    <Badge
                      variant={isVideo ? "marigold" : "green"}
                      className="shadow-xs bg-[#FFFDF8]/90 dark:bg-[#1E2640]/90 backdrop-blur-xs flex items-center gap-1"
                    >
                      {isVideo ? <Video className="w-3 h-3" /> : <Camera className="w-3 h-3" />}
                      <span>{t(item.category)}</span>
                    </Badge>
                  </div>

                  {/* Video Play Button Overlay */}
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/40 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-[#FAF9F5] text-[#1F2A5C] flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                      {item.duration && (
                        <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-black/70 text-white flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{item.duration}</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3 text-xs text-[#5E4E3F] dark:text-[#B8AE9C]">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#E39A1E] dark:text-[#F2B84B]" />
                        <span>{t(item.location)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#1F2A5C] dark:text-[#A9B6F0]" />
                        <span>{t(item.date)}</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-medium text-[#241B14] dark:text-[#F6EEDD] group-hover:text-[#1F2A5C] dark:group-hover:text-[#A9B6F0] transition-colors leading-snug">
                      {t(item.title)}
                    </h3>

                    <p className="text-xs text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed line-clamp-2">
                      {t(item.description)}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-[#E2D2B3]/60 dark:border-[rgba(226,210,179,0.1)] text-xs font-medium text-[#1F2A5C] dark:text-[#A9B6F0] flex items-center justify-between">
                    <span>
                      {isVideo
                        ? locale === "hi"
                          ? "वीडियो देखें"
                          : "Play Video"
                        : locale === "hi"
                        ? "तस्वीर देखें"
                        : "View Photo"}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-[#5E4E3F] dark:text-[#B8AE9C]">
                      {t(item.category)}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Media Lightbox / Modal */}
        {selectedMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
            <div
              className="bg-[#FFFDF8] dark:bg-[#1E2640] w-full max-w-2xl rounded-2xl border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.14)] p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl relative"
              role="dialog"
              aria-modal="true"
            >
              <button
                type="button"
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-[#5E4E3F] dark:text-[#B8AE9C] hover:bg-[#F2E4C9]/60 dark:hover:bg-[#121629] min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/10">
                <Image
                  src={selectedMedia.src}
                  alt={selectedMedia.alt}
                  fill
                  className="object-contain"
                />
                {selectedMedia.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-16 h-16 rounded-full bg-[#FAF9F5] text-[#1F2A5C] flex items-center justify-center shadow-xl">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Badge variant={selectedMedia.type === "video" ? "marigold" : "green"}>
                  {t(selectedMedia.category)}
                </Badge>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#241B14] dark:text-[#F6EEDD] mt-2">
                  {t(selectedMedia.title)}
                </h3>
                <div className="flex items-center gap-3 text-xs text-[#5E4E3F] dark:text-[#B8AE9C] mt-1">
                  <span>{t(selectedMedia.location)}</span>
                  <span>•</span>
                  <span>{t(selectedMedia.date)}</span>
                </div>
                <p className="text-sm text-[#5E4E3F] dark:text-[#B8AE9C] mt-3 leading-relaxed">
                  {t(selectedMedia.description)}
                </p>
              </div>
            </div>
          </div>
        )}

        <OrnamentalDivider />

        {/* Curation Footer Note */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#F2E4C9]/30 dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] text-xs text-[#5E4E3F] dark:text-[#B8AE9C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p>
            {locale === "hi"
              ? "* आधिकारिक छायाचित्र एवं वीडियो अभिलेख रायबरेली जनपद के ग्रामीण अंचलों में प्रत्यक्ष सेवा गतिविधियों के दौरान संकलित किए जाते हैं।"
              : "* Official photography and video documentation is maintained on-ground across villages in Raebareli district."}
          </p>
          <Link
            href="/contact"
            className="text-[#1F2A5C] dark:text-[#A9B6F0] font-semibold hover:underline shrink-0 min-h-[44px] inline-flex items-center"
          >
            {locale === "hi" ? "मीडिया संबंधी पूछताछ →" : "Submit Media Inquiries →"}
          </Link>
        </div>
      </Container>
    </div>
  );
}
