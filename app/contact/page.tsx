"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Clock,
  Send,
  HelpCircle,
  ArrowUpRight,
  AlertCircle,
  Phone,
} from "lucide-react";
import { FacebookIcon } from "@/components/ui/FacebookIcon";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { contactContent, siteConfig } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function ContactPage() {
  const { t, locale } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
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
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1F2A5C] dark:text-[#A9B6F0] block mb-2">
            {t(contactContent.badge)}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#241B14] dark:text-[#F6EEDD] leading-[1.14]">
            {locale === "hi" ? (
              <>
                माधव सेवा संस्थान से <br />
                <span className="italic font-normal text-[#1F2A5C] dark:text-[#A9B6F0]">
                  सीधे संपर्क करें
                </span>
              </>
            ) : (
              <>
                Get in Touch with <br />
                <span className="italic font-normal text-[#1F2A5C] dark:text-[#A9B6F0]">
                  Our Team.
                </span>
              </>
            )}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#E39A1E] dark:text-[#F2B84B] font-normal mt-2">
            {contactContent.headlineHindi}
          </p>

          <p className="mt-4 text-base sm:text-lg text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed">
            {t(contactContent.description)}
          </p>
        </div>

        {/* Contact Information Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14">
          {/* Email */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#FFFDF8] dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] space-y-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#1F2A5C]/10 dark:bg-[#A9B6F0]/15 flex items-center justify-center text-[#1F2A5C] dark:text-[#A9B6F0]">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-sm font-semibold text-[#241B14] dark:text-[#F6EEDD]">
                {locale === "hi" ? "ईमेल संपर्क" : "Email Us"}
              </h3>
              <p className="text-xs text-[#5E4E3F] dark:text-[#B8AE9C]">
                {locale === "hi" ? "सामान्य एवं सेवा पूछताछ" : "General & program inquiries"}
              </p>
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-xs sm:text-sm font-medium text-[#1F2A5C] dark:text-[#A9B6F0] hover:underline block break-all pt-1 min-h-[44px] flex items-center"
            >
              {siteConfig.email}
            </a>
          </div>

          {/* Facebook Official */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#FFFDF8] dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] space-y-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#1F2A5C]/10 dark:bg-[#A9B6F0]/15 flex items-center justify-center text-[#1F2A5C] dark:text-[#A9B6F0]">
              <FacebookIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-sm font-semibold text-[#241B14] dark:text-[#F6EEDD]">
                {locale === "hi" ? "फेसबुक पेज" : "Official Facebook"}
              </h3>
              <p className="text-xs text-[#5E4E3F] dark:text-[#B8AE9C]">
                {locale === "hi" ? "गतिविधियों के समाचार व अपडेट" : "Program updates & community"}
              </p>
            </div>
            <a
              href={contactContent.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-medium text-[#1F2A5C] dark:text-[#A9B6F0] hover:underline inline-flex items-center gap-1 pt-1 min-h-[44px]"
            >
              <span>Maadhav Sewa Sansthan</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Location & Address */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#FFFDF8] dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] space-y-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#1F2A5C]/10 dark:bg-[#A9B6F0]/15 flex items-center justify-center text-[#1F2A5C] dark:text-[#A9B6F0]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-sm font-semibold text-[#241B14] dark:text-[#F6EEDD]">
                {locale === "hi" ? "कार्यालय पता" : "Office Location"}
              </h3>
              <p className="text-xs text-[#5E4E3F] dark:text-[#B8AE9C]">
                {locale === "hi" ? "रायबरेली, उत्तर प्रदेश" : "District Headquarters"}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-[#241B14] dark:text-[#F6EEDD] pt-1">
              {t(contactContent.address)}
            </p>
          </div>

          {/* Office Hours / Phone */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#FFFDF8] dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] space-y-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#1F2A5C]/10 dark:bg-[#A9B6F0]/15 flex items-center justify-center text-[#1F2A5C] dark:text-[#A9B6F0]">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-sm font-semibold text-[#241B14] dark:text-[#F6EEDD]">
                {locale === "hi" ? "कार्य समय" : "Office Hours"}
              </h3>
              <p className="text-xs text-[#5E4E3F] dark:text-[#B8AE9C]">
                {t(contactContent.phone)}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-[#241B14] dark:text-[#F6EEDD] pt-1">
              {t(contactContent.officeHours)}
            </p>
          </div>
        </div>

        {/* Message Form & FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Form with Disabled Submit Button and Explanatory Notice */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#FFFDF8] dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] shadow-xs space-y-5">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#241B14] dark:text-[#F6EEDD] mb-1">
                {locale === "hi" ? "संदेश भेजें" : "Send a Message"}
              </h2>
              <p className="text-xs sm:text-sm text-[#5E4E3F] dark:text-[#B8AE9C]">
                {locale === "hi"
                  ? "ऑनलाइन संपर्क फॉर्म (प्रारूप स्वरूप) — संस्था से प्रत्यक्ष संवाद के लिए ईमेल अथवा फोन का उपयोग करें।"
                  : "Demonstration contact form. For active inquiries, please email or call directly."}
              </p>
            </div>

            {/* Advisory Alert for Form not being connected yet */}
            <div className="p-4 rounded-xl bg-[#F2E4C9]/50 dark:bg-[#121629] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.14)] flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#E39A1E] dark:text-[#F2B84B] shrink-0 mt-0.5" />
              <p className="text-xs text-[#241B14] dark:text-[#F6EEDD] leading-relaxed">
                {t(contactContent.formNotice)}
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#241B14] dark:text-[#F6EEDD] mb-1.5">
                    {locale === "hi" ? "पूरा नाम *" : "Your Full Name *"}
                  </label>
                  <input
                    type="text"
                    disabled
                    placeholder={locale === "hi" ? "उदा. रमेश कुमार" : "e.g. Ramesh Kumar"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.14)] bg-[#FBF5EA]/60 dark:bg-[#121629]/60 text-sm text-[#241B14] dark:text-[#F6EEDD] cursor-not-allowed opacity-80"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#241B14] dark:text-[#F6EEDD] mb-1.5">
                    {locale === "hi" ? "ईमेल पता *" : "Email Address *"}
                  </label>
                  <input
                    type="email"
                    disabled
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.14)] bg-[#FBF5EA]/60 dark:bg-[#121629]/60 text-sm text-[#241B14] dark:text-[#F6EEDD] cursor-not-allowed opacity-80"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#241B14] dark:text-[#F6EEDD] mb-1.5">
                    {locale === "hi" ? "फोन नंबर (वैकल्पिक)" : "Phone Number (Optional)"}
                  </label>
                  <input
                    type="tel"
                    disabled
                    placeholder="+91 "
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.14)] bg-[#FBF5EA]/60 dark:bg-[#121629]/60 text-sm text-[#241B14] dark:text-[#F6EEDD] cursor-not-allowed opacity-80"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#241B14] dark:text-[#F6EEDD] mb-1.5">
                    {locale === "hi" ? "विषय" : "Inquiry Subject"}
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.subject}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.14)] bg-[#FBF5EA]/60 dark:bg-[#121629]/60 text-sm text-[#241B14] dark:text-[#F6EEDD] cursor-not-allowed opacity-80"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#241B14] dark:text-[#F6EEDD] mb-1.5">
                  {locale === "hi" ? "आपका संदेश *" : "Your Message *"}
                </label>
                <textarea
                  rows={4}
                  disabled
                  placeholder={
                    locale === "hi"
                      ? "कृपया बताएं कि हम किस प्रकार सहयोग कर सकते हैं..."
                      : "Please describe how we can assist or collaborate..."
                  }
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.14)] bg-[#FBF5EA]/60 dark:bg-[#121629]/60 text-sm text-[#241B14] dark:text-[#F6EEDD] cursor-not-allowed opacity-80"
                />
              </div>

              {/* Disabled Submit Button with Explanatory Note */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-[#1F2A5C]/40 dark:bg-[#A9B6F0]/30 text-white/80 dark:text-white/60 cursor-not-allowed min-h-[48px]"
                >
                  <Send className="w-4 h-4" />
                  <span>{locale === "hi" ? "संदेश भेजें (फॉर्म अभी असंबद्ध है)" : "Send Message (Form Not Connected)"}</span>
                </button>
                <p className="text-[11px] text-[#5E4E3F] dark:text-[#B8AE9C]">
                  {locale === "hi"
                    ? "* फॉर्म सबमिशन अभी बैकएंड से कनेक्ट नहीं है। कृपया contact@maadhavsewasnsthan.org पर सीधे ईमेल करें।"
                    : "* Direct submission disabled until backend integration is finalized. Please email directly."}
                </p>
              </div>
            </form>
          </div>

          {/* FAQ Column */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#241B14] dark:text-[#F6EEDD]">
              {locale === "hi" ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
            </h2>
            <div className="space-y-3">
              {contactContent.faq.map((item, i) => (
                <div
                  key={i}
                  className="p-4 sm:p-5 rounded-xl bg-[#FFFDF8] dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] space-y-1.5"
                >
                  <div className="flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-[#1F2A5C] dark:text-[#A9B6F0] shrink-0 mt-0.5" />
                    <p className="font-serif font-semibold text-sm text-[#241B14] dark:text-[#F6EEDD]">
                      {t(item.question)}
                    </p>
                  </div>
                  <p className="text-xs text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed pl-6">
                    {t(item.answer)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
