"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  Phone,
  Mail,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Building2,
  QrCode,
  PackageCheck,
  Info,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { QrCodePlaceholder } from "@/components/ui/QrCodePlaceholder";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { donationContent, siteConfig } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function DonatePage() {
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

        {/* Page Hero Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A93A2B] dark:text-[#E88A76] block mb-2">
            {t(donationContent.badge)}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#241B14] dark:text-[#F6EEDD] leading-[1.14]">
            {locale === "hi" ? (
              <>
                माधव सेवा संस्थान को <br />
                <span className="italic font-normal text-[#1F2A5C] dark:text-[#A9B6F0]">
                  सहयोग प्रदान करें
                </span>
              </>
            ) : (
              <>
                Support Our Grassroots <br />
                <span className="italic font-normal text-[#1F2A5C] dark:text-[#A9B6F0]">
                  Community Work.
                </span>
              </>
            )}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#E39A1E] dark:text-[#F2B84B] font-normal mt-2">
            {donationContent.headlineHindi}
          </p>

          <p className="mt-4 text-base sm:text-lg text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed">
            {t(donationContent.neutralStatement)}
          </p>
        </div>

        {/* Advisory Notice: No public payment details, shared upon direct contact */}
        <div className="mb-12 p-5 sm:p-6 rounded-2xl bg-[#F2E4C9]/50 dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.14)] flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-[#1F2A5C] dark:text-[#A9B6F0] shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <h2 className="font-serif font-semibold text-sm sm:text-base text-[#241B14] dark:text-[#F6EEDD]">
              {locale === "hi" ? "सहयोग नीति एवं पारदर्शिता सूचना" : "Contribution Policy & Transparency Notice"}
            </h2>
            <p className="text-xs sm:text-sm text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed">
              {t(donationContent.disclaimer)}
            </p>
          </div>
        </div>

        {/* Main Section: How to Contribute + QR Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* Left Column: Direct Call to Contact & Steps (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFDF8] dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] space-y-5">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#E39A1E] dark:text-[#F2B84B] block mb-1">
                  {locale === "hi" ? "सहयोग प्रक्रिया" : "How to Contribute"}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#241B14] dark:text-[#F6EEDD]">
                  {locale === "hi" ? "संस्थान से सीधे संपर्क करें" : "Contact the Organisation Directly"}
                </h2>
                <p className="text-sm text-[#5E4E3F] dark:text-[#B8AE9C] mt-2 leading-relaxed">
                  {t(donationContent.subheadline)}
                </p>
              </div>

              {/* Call-to-contact action buttons */}
              <div className="p-5 rounded-xl bg-[#F2E4C9]/30 dark:bg-[#121629] border border-[#E2D2B3]/70 dark:border-[rgba(226,210,179,0.1)] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1F2A5C]/10 dark:bg-[#A9B6F0]/15 flex items-center justify-center text-[#1F2A5C] dark:text-[#A9B6F0] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-sm text-[#241B14] dark:text-[#F6EEDD]">
                      {locale === "hi" ? "फोन अथवा व्हाट्सएप द्वारा संपर्क" : "Direct Phone & WhatsApp Inquiry"}
                    </h3>
                    <p className="text-xs text-[#5E4E3F] dark:text-[#B8AE9C]">
                      {t(siteConfig.phone)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Button href="tel:+919415053702" variant="primary" size="lg" className="min-h-[44px] inline-flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{locale === "hi" ? "संस्थान को कॉल करें" : "Call the Organisation"}</span>
                  </Button>
                  <Button href="/contact" variant="outline" size="lg" className="min-h-[44px] inline-flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{locale === "hi" ? "संपर्क फॉर्म भरें" : "Write to Contact Desk"}</span>
                  </Button>
                </div>
              </div>

              {/* Verified Note */}
              <div className="flex items-start gap-2.5 text-xs text-[#5E4E3F] dark:text-[#B8AE9C]">
                <Info className="w-4 h-4 text-[#1F2A5C] dark:text-[#A9B6F0] shrink-0 mt-0.5" />
                <p>
                  {t(donationContent.contactNote)}
                </p>
              </div>
            </div>

            {/* Bank Account Details Card (Editable via CMS) */}
            {donationContent.bankAccount && (donationContent.showBankDetails || donationContent.bankAccount.accountNumber) && (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFDF8] dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1F2A5C]/10 dark:bg-[#A9B6F0]/15 flex items-center justify-center text-[#1F2A5C] dark:text-[#A9B6F0] shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#E39A1E] dark:text-[#F2B84B] block">
                      {locale === "hi" ? "सीधे बैंक खाते में सहयोग" : "Direct Bank Transfer"}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#241B14] dark:text-[#F6EEDD]">
                      {locale === "hi" ? "बैंक खाता विवरण (NEFT / RTGS / IMPS)" : "Official Bank Account Details"}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm">
                  {donationContent.bankAccount.accountName && (
                    <div className="p-3 rounded-lg bg-[#F2E4C9]/25 dark:bg-[#121629] border border-[#E2D2B3]/50 dark:border-[rgba(226,210,179,0.08)]">
                      <span className="text-xs text-[#5E4E3F] dark:text-[#B8AE9C] block">
                        {locale === "hi" ? "खाता धारक का नाम" : "Account Holder"}
                      </span>
                      <span className="font-semibold text-[#241B14] dark:text-[#F6EEDD]">
                        {donationContent.bankAccount.accountName}
                      </span>
                    </div>
                  )}

                  {donationContent.bankAccount.accountNumber && (
                    <div className="p-3 rounded-lg bg-[#F2E4C9]/25 dark:bg-[#121629] border border-[#E2D2B3]/50 dark:border-[rgba(226,210,179,0.08)]">
                      <span className="text-xs text-[#5E4E3F] dark:text-[#B8AE9C] block">
                        {locale === "hi" ? "खाता संख्या" : "Account Number"}
                      </span>
                      <span className="font-mono font-bold text-base text-[#1F2A5C] dark:text-[#A9B6F0]">
                        {donationContent.bankAccount.accountNumber}
                      </span>
                    </div>
                  )}

                  {donationContent.bankAccount.ifsc && (
                    <div className="p-3 rounded-lg bg-[#F2E4C9]/25 dark:bg-[#121629] border border-[#E2D2B3]/50 dark:border-[rgba(226,210,179,0.08)]">
                      <span className="text-xs text-[#5E4E3F] dark:text-[#B8AE9C] block">
                        {locale === "hi" ? "आईएफएससी कोड" : "IFSC Code"}
                      </span>
                      <span className="font-mono font-bold text-[#241B14] dark:text-[#F6EEDD]">
                        {donationContent.bankAccount.ifsc}
                      </span>
                    </div>
                  )}

                  {donationContent.bankAccount.bankName && (
                    <div className="p-3 rounded-lg bg-[#F2E4C9]/25 dark:bg-[#121629] border border-[#E2D2B3]/50 dark:border-[rgba(226,210,179,0.08)]">
                      <span className="text-xs text-[#5E4E3F] dark:text-[#B8AE9C] block">
                        {locale === "hi" ? "बैंक का नाम" : "Bank Name"}
                      </span>
                      <span className="font-semibold text-[#241B14] dark:text-[#F6EEDD]">
                        {donationContent.bankAccount.bankName}
                      </span>
                    </div>
                  )}

                  {donationContent.bankAccount.branch && (
                    <div className="sm:col-span-2 p-3 rounded-lg bg-[#F2E4C9]/25 dark:bg-[#121629] border border-[#E2D2B3]/50 dark:border-[rgba(226,210,179,0.08)]">
                      <span className="text-xs text-[#5E4E3F] dark:text-[#B8AE9C] block">
                        {locale === "hi" ? "शाखा" : "Branch"}
                      </span>
                      <span className="text-[#241B14] dark:text-[#F6EEDD]">
                        {donationContent.bankAccount.branch}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Channels of Assistance */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-semibold text-[#241B14] dark:text-[#F6EEDD]">
                {locale === "hi" ? "सहयोग के विभिन्न माध्यम" : "Ways You Can Assist Our Mission"}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {donationContent.supportChannels.map((channel, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#FFFDF8] dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="w-8 h-8 rounded-lg bg-[#1F2A5C]/10 dark:bg-[#A9B6F0]/15 flex items-center justify-center text-[#1F2A5C] dark:text-[#A9B6F0]">
                        {idx === 0 ? (
                          <Building2 className="w-4 h-4" />
                        ) : idx === 1 ? (
                          <QrCode className="w-4 h-4" />
                        ) : (
                          <PackageCheck className="w-4 h-4" />
                        )}
                      </div>
                      <h4 className="font-serif font-semibold text-xs sm:text-sm text-[#241B14] dark:text-[#F6EEDD]">
                        {t(channel.title)}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed">
                        {t(channel.description)}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E2D2B3]/40 dark:border-[rgba(226,210,179,0.08)]">
                      <Link
                        href="/contact"
                        className="text-[11px] font-semibold text-[#1F2A5C] dark:text-[#A9B6F0] hover:underline inline-flex items-center gap-1 min-h-[44px]"
                      >
                        <span>{t(channel.contactAction)}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: QR Code Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFDF8] dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] space-y-5">
              <div className="text-center space-y-2">
                <Badge variant="marigold" className="mx-auto">
                  {locale === "hi" ? "आधिकारिक यूपीआई क्यूआर" : "Official UPI QR Code"}
                </Badge>
                <h3 className="font-serif text-xl font-semibold text-[#241B14] dark:text-[#F6EEDD] pt-1">
                  {locale === "hi" ? "स्कैन करके सहयोग करें" : "Scan & Pay via UPI"}
                </h3>
                {donationContent.upiId ? (
                  <div className="inline-block py-1 px-3 rounded-lg bg-[#F2E4C9]/40 dark:bg-[#121629] border border-[#E2D2B3]/60 dark:border-[rgba(226,210,179,0.1)]">
                    <span className="text-xs text-[#5E4E3F] dark:text-[#B8AE9C] block text-[11px]">UPI ID</span>
                    <span className="font-mono font-bold text-sm text-[#1F2A5C] dark:text-[#A9B6F0]">
                      {donationContent.upiId}
                    </span>
                  </div>
                ) : (
                  <p className="text-xs text-[#5E4E3F] dark:text-[#B8AE9C]">
                    {locale === "hi"
                      ? "सत्यापित क्यूआर कोड द्वारा त्वरित सहयोग"
                      : "Instant contribution via any UPI application"}
                  </p>
                )}
              </div>

              {/* QR Code Placeholder Component */}
              <div className="flex justify-center py-2">
                <QrCodePlaceholder
                  imagePath={donationContent.qrCodePath}
                  altText={donationContent.qrAlt}
                />
              </div>

              {/* Note below QR */}
              <div className="p-3.5 rounded-xl bg-[#F2E4C9]/30 dark:bg-[#121629] border border-[#E2D2B3]/60 dark:border-[rgba(226,210,179,0.1)] text-center">
                <p className="text-xs text-[#5E4E3F] dark:text-[#B8AE9C]">
                  {locale === "hi"
                    ? "* बैंक व यूपीआई विवरण केवल संस्था के अधिकृत संपर्क सूत्र से ही प्राप्त करें।"
                    : "* Please verify account and UPI credentials directly with our designated desk before transferring."}
                </p>
              </div>
            </div>
          </div>

        </div>

        <OrnamentalDivider />

        {/* Bottom Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#1F2A5C] dark:bg-[#1E2640] text-[#FAF9F5] border border-transparent dark:border-[rgba(226,210,179,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#FAF9F5]">
              {locale === "hi" ? "निस्वार्थ सेवा ही हमारा संकल्प है" : "Guided by Selfless Service (सेवा परमो धर्म:)"}
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF9F5]/80 leading-relaxed">
              {locale === "hi"
                ? "आपके सहयोग से समाज के हर जरूरतमंद तक मदद पहुंचेगी। रायबरेली की धरती पर बदलाव का हिस्सा बनें।"
                : "Every gesture of goodwill helps extend learning and healthcare to families in rural Raebareli."}
            </p>
          </div>
          <Button href="/contact" variant="primary" size="lg" className="bg-[#FAF9F5] text-[#1F2A5C] hover:bg-[#FAF9F5]/90 shrink-0 min-h-[44px]">
            {locale === "hi" ? "समन्वय दल से संपर्क करें" : "Contact the Desk"}
          </Button>
        </div>
      </Container>
    </div>
  );
}
