"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Mail, Heart, Phone, ArrowUpRight } from "lucide-react";
import { FacebookIcon } from "@/components/ui/FacebookIcon";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { footerContent, siteConfig, areasOfWork } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import BlockPrintBorder from "@/components/ui/motifs/BlockPrintBorder";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-bg-sand/40 border-t border-border relative text-ink">
      {/* Top repeating Indian block-print border */}
      <BlockPrintBorder className="text-indigo w-full" />

      <div className="pt-12 pb-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-border">
            {/* Column 1: Organization Identity (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <Logo size="lg" />
              <p className="text-sm leading-relaxed text-ink-soft max-w-sm mt-3">
                {t(siteConfig.description)}
              </p>

              <div className="pt-2 space-y-2.5 text-xs text-ink-soft">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-madder shrink-0 mt-0.5" />
                  <span>{t(siteConfig.address)}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-indigo shrink-0" />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="hover:text-indigo transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-marigold shrink-0" />
                  <span>{t(siteConfig.phone)}</span>
                </div>
              </div>

              {/* Official Social Links */}
              {siteConfig.socialLinks.facebook && (
                <div className="pt-2">
                  <a
                    href={siteConfig.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-surface border border-border text-xs font-medium text-ink hover:bg-indigo hover:text-surface hover:border-indigo transition-colors shadow-xs"
                    aria-label="Visit Maadhav Sewa Sansthan on Facebook"
                  >
                    <FacebookIcon className="w-3.5 h-3.5 text-indigo group-hover:text-white" />
                    <span>{t(footerContent.facebookConnect)}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              )}
            </div>

            {/* Column 2: Quick Links (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-serif text-base font-semibold text-ink tracking-tight">
                {t(footerContent.headings.navigation)}
              </h3>
              <ul className="space-y-2.5 text-sm">
                {footerContent.quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-ink-soft hover:text-indigo transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{t(link.label)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Focus Areas (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="font-serif text-base font-semibold text-ink tracking-tight">
                {t(footerContent.headings.focus)}
              </h3>
              <ul className="space-y-2.5 text-sm">
                {areasOfWork.areas.map((area, idx) => {
                  const areaKey = typeof area.title === "string" ? area.title : area.title.en;
                  const areaSlug = areaKey.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  return (
                    <li key={idx}>
                      <Link
                        href={`/our-work#${areaSlug}`}
                        className="text-ink-soft hover:text-indigo transition-colors"
                      >
                        {t(area.title)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 4: Get Involved (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-serif text-base font-semibold text-ink tracking-tight">
                {t(footerContent.headings.involvement)}
              </h3>
              <ul className="space-y-2.5 text-sm">
                {footerContent.supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-ink-soft hover:text-indigo transition-colors inline-flex items-center gap-1"
                    >
                      <span>{t(link.label)}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-50" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="pt-3">
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-md bg-indigo text-surface text-xs font-medium hover:bg-indigo-soft transition-colors shadow-xs min-h-[44px]"
                >
                  <Heart className="w-3.5 h-3.5 text-marigold fill-marigold" />
                  <span>{t(footerContent.supportCause)}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-soft">
            <p>{t(footerContent.copyright)}</p>
            <div className="flex items-center gap-6">
              {footerContent.legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-ink transition-colors"
                >
                  {t(item.label)}
                </Link>
              ))}
              <span className="text-indigo font-medium">
                {t(footerContent.locationTag)}
              </span>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
