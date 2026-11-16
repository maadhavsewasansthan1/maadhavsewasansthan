import { SiteConfig } from "./types";

// Bilingual configuration for Maadhav Sewa Sansthan
// All Hindi translations are marked as pending client review
export const siteConfig: SiteConfig = {
  // Brand name remains Maadhav Sewa Sansthan / माधव सेवा संस्थान across languages
  name: "Maadhav Sewa Sansthan",
  nameHindi: "माधव सेवा संस्थान",
  tagline: {
    en: "Serving with Compassion, Building with Purpose",
    hi: "करुणा से सेवा, उद्देश्य से निर्माण", // Pending client review
  },
  location: {
    en: "Raebareli, Uttar Pradesh, India",
    hi: "रायबरेली, उत्तर प्रदेश, भारत", // Pending client review
  },
  district: {
    en: "Raebareli",
    hi: "रायबरेली", // Pending client review
  },
  state: {
    en: "Uttar Pradesh",
    hi: "उत्तर प्रदेश", // Pending client review
  },
  pincode: "229001",
  description: {
    en: "Maadhav Sewa Sansthan is a grassroots non-governmental organisation based in Raebareli, Uttar Pradesh, dedicated to community welfare, rural education, health awareness, and sustainable development.",
    hi: "माधव सेवा संस्थान रायबरेली, उत्तर प्रदेश में स्थित एक जमीनी गैर-सरकारी संगठन है, जो सामुदायिक कल्याण, ग्रामीण शिक्षा, स्वास्थ्य जागरूकता और सतत विकास के लिए समर्पित है।", // Pending client review
  },
  logoPath: "/images/logo.png",
  email: "contact@maadhavsewasnsthan.org",
  phone: {
    en: "[Official contact number to be updated]",
    hi: "[आधिकारिक संपर्क नंबर शीघ्र उपलब्ध कराया जाएगा]", // Pending client review
  },
  address: {
    en: "Raebareli, Uttar Pradesh — 229001",
    hi: "रायबरेली, उत्तर प्रदेश — 229001", // Pending client review
  },
  socialLinks: {
    facebook: "https://www.facebook.com/p/Maadhav-Sewa-Sansthan-100080156370355/",
    instagram: "#",
    twitter: "#",
    youtube: "#",
  },
  navLinks: [
    { label: { en: "Home", hi: "मुख्य पृष्ठ" }, href: "/" }, // Pending client review
    { label: { en: "About Us", hi: "हमारे बारे में" }, href: "/about" }, // Pending client review
    { label: { en: "Our Work", hi: "हमारे कार्य" }, href: "/our-work" }, // Pending client review
    { label: { en: "Activities", hi: "गतिविधियाँ" }, href: "/activities" }, // Pending client review
    { label: { en: "Events", hi: "कार्यक्रम" }, href: "/events" }, // Pending client review
    { label: { en: "Gallery", hi: "दीर्घा" }, href: "/gallery" }, // Pending client review
    { label: { en: "Contact", hi: "संपर्क" }, href: "/contact" }, // Pending client review
  ],
  ctaNav: {
    label: { en: "Support Us", hi: "सहयोग करें" }, // Pending client review
    href: "/donate",
  },
};
