import type { Metadata, Viewport } from "next";
import { Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/ui/MobileBottomBar";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import { siteConfig } from "@/lib/content";

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
});

const siteDescription =
  typeof siteConfig.description === "string"
    ? siteConfig.description
    : siteConfig.description.en;

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} (${siteConfig.nameHindi}) | Non-Profit in Raebareli, UP`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteDescription,
  keywords: [
    "Maadhav Sewa Sansthan",
    "माधव सेवा संस्थान",
    "NGO Raebareli",
    "Uttar Pradesh NGO",
    "Community Service India",
    "Rural Development UP",
    "Education Non Profit",
    "Healthcare Camps Raebareli",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://maadhavsewasnsthan.org"),
  openGraph: {
    title: `${siteConfig.name} (${siteConfig.nameHindi})`,
    description: siteDescription,
    url: "https://maadhavsewasnsthan.org",
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#1F2A5C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${notoSansDevanagari.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("mss-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark");}else{document.documentElement.classList.remove("dark");}}catch(e){if(window.matchMedia("(prefers-color-scheme: dark)").matches){document.documentElement.classList.add("dark");}}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Inter:wght@400;500;600&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-bg text-ink dark:bg-bg dark:text-ink font-sans antialiased selection:bg-indigo/20 selection:text-indigo dark:selection:bg-indigo/20 dark:selection:text-indigo"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LanguageProvider>
            {/* Skip to Content for Accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-indigo text-surface rounded-md text-sm font-medium"
            >
              Skip to main content
            </a>

            {/* Global Navigation */}
            <Navbar />

            {/* Main Content with bottom padding on mobile for MobileBottomBar */}
            <main id="main-content" className="flex-1 pb-16 md:pb-0">
              {children}
            </main>

            {/* Global Footer */}
            <Footer />

            {/* Mobile Fixed Safe-Area Action Bar (Donate, Call, WhatsApp, Map) */}
            <MobileBottomBar />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
