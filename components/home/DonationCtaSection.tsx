"use client";

import React from "react";
import { Phone, ArrowRight, Heart } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { QrCodePlaceholder } from "@/components/ui/QrCodePlaceholder";
import { donationSection, siteConfig } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import LotusMark from "@/components/ui/motifs/LotusMark";

export function DonationCtaSection() {
  const { locale, t } = useLanguage();
  const reduced = useReducedMotion();
  const phoneDisplay = t(siteConfig.phone);
  const telNumber = phoneDisplay.replace(/[^0-9+]/g, "");

  return (
    <section id="donate" className="py-14 sm:py-20 bg-bg-sand/30 border-t border-border">
      <Container>
        <div className="rounded-2xl bg-surface border border-border p-6 sm:p-10 lg:p-12 shadow-xs">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-madder">
                <LotusMark width={16} height={16} className="text-marigold" />
                <motion.span
                  className="inline-flex items-center"
                  animate={reduced ? undefined : { scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart className="w-4 h-4 fill-current text-madder mr-1.5" />
                </motion.span>
                <span>{t(donationSection.badge)}</span>
              </div>

              {locale === "hi" ? (
                <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ink leading-[1.2]">
                  सहयोग करें, <br />
                  <span className="font-normal text-indigo">
                    बदलाव का हिस्सा बनें।
                  </span>
                </h2>
              ) : (
                <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ink leading-[1.15]">
                  Support the Cause, <br />
                  <span className="italic font-normal text-indigo">
                    Empower the Community.
                  </span>
                </h2>
              )}

              <p className="text-base text-ink-soft leading-relaxed max-w-xl">
                Every community contribution helps sustain healthcare outreach, student education, and rural family assistance across Raebareli, Uttar Pradesh.
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Button
                  href={`tel:${telNumber || "+919415050000"}`}
                  variant="primary"
                  size="lg"
                  className="gap-2 shadow-xs min-h-[48px] bg-indigo hover:bg-indigo-soft text-surface rounded-md active:scale-[0.97]"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call to Contribute: {phoneDisplay}</span>
                </Button>

                <Button
                  href="/donate"
                  variant="outline"
                  size="lg"
                  className="gap-2 min-h-[48px] border-border text-ink hover:bg-bg-sand rounded-md active:scale-[0.97]"
                >
                  <span>Bank &amp; Account Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-xs text-ink-soft pt-1 italic">
                * Formal receipts and 80G documentation guidelines are provided upon request.
              </p>
            </div>

            {/* Right Column: QR Code Placeholder */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <QrCodePlaceholder
                imagePath="/images/qr-placeholder.png"
                altText="Maadhav Sewa Sansthan UPI QR Code"
                caption="Scan via any UPI app (BHIM, PhonePe, Google Pay, Paytm)"
                className="w-full max-w-sm"
              />
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}

export default DonationCtaSection;
