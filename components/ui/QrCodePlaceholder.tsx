"use client";

import React, { useState } from "react";
import Image from "next/image";
import { QrCode, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QrCodePlaceholderProps {
  imagePath: string;
  altText: string;
  className?: string;
  caption?: string;
}

export function QrCodePlaceholder({
  imagePath,
  altText,
  className,
  caption = "Scan with any UPI app (BHIM, Google Pay, PhonePe, Paytm)",
}: QrCodePlaceholderProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={cn(
        "rounded-xl bg-[#FFFDF8] dark:bg-[#1E2640] p-5 sm:p-6 border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] shadow-xs flex flex-col items-center text-center",
        className
      )}
    >
      {/* Top Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-[#1F2A5C]/10 dark:bg-[#A9B6F0]/15 flex items-center justify-center text-[#1F2A5C] dark:text-[#A9B6F0]">
          <QrCode className="w-4 h-4" />
        </div>
        <span className="font-serif text-sm font-semibold text-[#241B14] dark:text-[#F6EEDD]">
          UPI Payment QR
        </span>
      </div>

      {/* QR Image Container */}
      <div className="relative p-2.5 rounded-xl border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] bg-[#FBF5EA] dark:bg-[#121629] mb-3">
        {!hasError ? (
          <Image
            src={imagePath}
            alt={altText}
            width={180}
            height={180}
            className="w-40 h-40 sm:w-44 sm:h-44 object-contain rounded-lg"
            onError={() => setHasError(true)}
            priority
          />
        ) : (
          <div className="w-40 h-40 sm:w-44 sm:h-44 flex flex-col items-center justify-center bg-[#F2E4C9]/50 text-[#5E4E3F] rounded-lg p-3">
            <QrCode className="w-10 h-10 text-[#1F2A5C]/60 mb-2" />
            <span className="text-xs font-medium">QR Placeholder</span>
          </div>
        )}

        {/* Verification watermark badge */}
        <div className="absolute inset-x-3 bottom-3 py-1 px-2 rounded-md bg-[#241B14]/85 backdrop-blur-xs text-white text-[10px] font-medium tracking-wide flex items-center justify-center gap-1">
          <AlertCircle className="w-3 h-3 text-[#F2B84B]" />
          <span>Provisional QR Placeholder</span>
        </div>
      </div>

      {/* Caption & instructions */}
      <p className="text-xs text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed max-w-xs">
        {caption}
      </p>

      {/* Status note */}
      <div className="mt-2.5 text-[11px] font-medium text-[#1F2A5C] dark:text-[#A9B6F0] bg-[#1F2A5C]/10 dark:bg-[#A9B6F0]/15 px-3 py-0.5 rounded-full border border-[#1F2A5C]/20 dark:border-[#A9B6F0]/30">
        * Official merchant QR to be mapped
      </div>
    </div>
  );
}
