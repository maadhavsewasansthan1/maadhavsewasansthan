// TypeScript interfaces for all Maadhav Sewa Sansthan content
import { Localized, LocalizedString } from "@/lib/i18n/types";

export type { Localized, LocalizedString };
export type StringOrLocalized = string | LocalizedString;

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
}

export interface NavLink {
  label: StringOrLocalized;
  href: string;
}

export interface SiteConfig {
  name: string;
  nameHindi: string;
  tagline: StringOrLocalized;
  taglineHindi?: string;
  location: StringOrLocalized;
  district: StringOrLocalized;
  state: StringOrLocalized;
  pincode: string;
  description: StringOrLocalized;
  logoPath: string;
  email: string;
  phone: StringOrLocalized;
  address: StringOrLocalized;
  socialLinks: SocialLinks;
  navLinks: NavLink[];
  ctaNav: NavLink;
}

export interface StatItem {
  value: StringOrLocalized;
  label: StringOrLocalized;
  description?: StringOrLocalized;
  note?: StringOrLocalized;
}

export interface CoreValue {
  title: StringOrLocalized;
  titleHindi?: string;
  description: StringOrLocalized;
  iconName?: string;
}

export interface FounderSocialLink {
  platform: string;
  url: string;
}

export interface FounderContent {
  name: { en: string; hi: string };
  role: { en: string; hi: string };
  photo: string;
  photoAlt: { en: string; hi: string };
  bio: { en: string[]; hi: string[] }; // array of paragraphs
  quote: { en: string; hi: string };
  yearsOfService?: string; // optional, leave empty if not provided
  socialLinks?: FounderSocialLink[]; // optional
}

export interface TeamMember {
  role: StringOrLocalized;
  department: StringOrLocalized;
  status: StringOrLocalized;
  note: StringOrLocalized;
}

export interface AboutContent {
  badge: StringOrLocalized;
  headline: StringOrLocalized;
  headlineHindi?: string;
  subheadline: StringOrLocalized;
  paragraphs: StringOrLocalized[];
  mission: StringOrLocalized;
  vision: StringOrLocalized;
  values: CoreValue[];
  teamSection: {
    badge: StringOrLocalized;
    title: StringOrLocalized;
    subtitle: StringOrLocalized;
    disclaimer: StringOrLocalized;
    members: TeamMember[];
  };
  stats: StatItem[];
  image: {
    src: string;
    alt: string;
    caption?: StringOrLocalized;
  };
  governanceNote: StringOrLocalized;
}

export interface AreaOfWork {
  id: string;
  icon: string;
  title: StringOrLocalized;
  titleHindi?: string;
  shortDescription: StringOrLocalized;
  fullDescription: StringOrLocalized;
  keyInitiatives: StringOrLocalized[];
  impactGoal: StringOrLocalized;
  color: string;
  accentBadge: StringOrLocalized;
}

export interface ActivityItem {
  id: string;
  title: StringOrLocalized;
  category: StringOrLocalized;
  description: StringOrLocalized;
  fullStory?: StringOrLocalized;
  date: StringOrLocalized;
  location: StringOrLocalized;
  image: {
    src: string;
    alt: string;
  };
  highlights?: StringOrLocalized[];
}

export type EventStatus = "upcoming" | "past";

export interface EventItem {
  id: string;
  title: StringOrLocalized;
  date: StringOrLocalized;
  time?: StringOrLocalized;
  location: StringOrLocalized;
  category: StringOrLocalized;
  description: StringOrLocalized;
  status: EventStatus;
  organizer?: StringOrLocalized;
  registrationNote?: StringOrLocalized;
}

export type GalleryMediaType = "photo" | "video";

export interface GalleryItem {
  id: string;
  type: GalleryMediaType;
  title: StringOrLocalized;
  category: StringOrLocalized;
  description: StringOrLocalized;
  date: StringOrLocalized;
  location: StringOrLocalized;
  src: string; // Image URL or Video thumbnail
  videoUrl?: string; // Optional video stream/embed
  duration?: string; // For videos
  alt: string;
}

export interface BankAccountDetails {
  accountName?: string;
  accountNumber?: string;
  ifsc?: string;
  bankName?: string;
  branch?: string;
}

export interface DonationContent {
  badge: StringOrLocalized;
  headline: StringOrLocalized;
  headlineHindi: string;
  subheadline: StringOrLocalized;
  neutralStatement: StringOrLocalized;
  disclaimer: StringOrLocalized;
  showBankDetails?: boolean;
  qrCodePath: string;
  qrAlt: string;
  upiId?: string;
  bankAccount?: BankAccountDetails;
  contactNote: StringOrLocalized;
  supportChannels: {
    title: StringOrLocalized;
    description: StringOrLocalized;
    contactAction: StringOrLocalized;
  }[];
}

export interface ContactInfo {
  badge: StringOrLocalized;
  headline: StringOrLocalized;
  headlineHindi: string;
  description: StringOrLocalized;
  address: StringOrLocalized;
  email: string;
  phone: StringOrLocalized;
  officeHours: StringOrLocalized;
  facebookUrl: string;
  formNotice: StringOrLocalized;
  faq: {
    question: StringOrLocalized;
    answer: StringOrLocalized;
  }[];
}
