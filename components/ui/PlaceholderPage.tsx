import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface PlaceholderPageProps {
  badge: string;
  title: string;
  titleHindi?: string;
  description: string;
  children?: React.ReactNode;
}

export function PlaceholderPage({
  badge,
  title,
  titleHindi,
  description,
  children,
}: PlaceholderPageProps) {
  return (
    <div className="py-12 md:py-20 bg-[#FBF5EA] dark:bg-[#121629] min-h-[70vh]">
      <Container size="small">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#5E4E3F] dark:text-[#B8AE9C] hover:text-[#1F2A5C] dark:hover:text-[#A9B6F0] transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-[#FFFDF8] dark:bg-[#1E2640] border border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] rounded-2xl p-6 sm:p-10 shadow-xs space-y-5">
          <Badge variant="green">
            <span>{badge}</span>
          </Badge>

          <div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-[#241B14] dark:text-[#F6EEDD]">
              {title}
            </h1>
            {titleHindi && (
              <p className="font-serif text-lg sm:text-xl text-[#E39A1E] dark:text-[#F2B84B] mt-1">
                {titleHindi}
              </p>
            )}
          </div>

          <p className="text-sm sm:text-base text-[#5E4E3F] dark:text-[#B8AE9C] leading-relaxed">
            {description}
          </p>

          {children}

          <div className="pt-4 border-t border-[#E2D2B3] dark:border-[rgba(226,210,179,0.12)] flex flex-wrap items-center gap-3">
            <Button href="/" variant="outline" size="md">
              Return to Homepage
            </Button>
            <Button href="/donate" variant="primary" size="md">
              Support Our Cause
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
