// Typed Content Loader for Maadhav Sewa Sansthan
// Sourced from Git-based Decap CMS JSON data in /content/data/
// Works synchronously in both Server and Client Components with zero runtime fs dependency.

import siteSettingsData from "@/content/data/site_settings.json";
import eventsData from "@/content/data/events.json";
import activitiesData from "@/content/data/activities.json";
import galleryData from "@/content/data/gallery.json";
import founderData from "@/content/data/founder.json";
import focusAreasData from "@/content/data/focus_areas.json";
import pillarsData from "@/content/data/pillars.json";
import homeData from "@/content/data/home.json";
import aboutData from "@/content/data/about.json";
import contactData from "@/content/data/contact.json";
import donateData from "@/content/data/donate.json";
import ourWorkData from "@/content/data/our_work.json";

import type {
  EventItem,
  EventStatus,
  ActivityItem,
  GalleryItem,
  FounderContent,
  AreaOfWork,
  SiteConfig,
  StatItem,
} from "@/content/types";

// ==========================================
// 1. Site Settings & Impact Figures
// ==========================================

export function getSiteSettings() {
  return siteSettingsData;
}

export function getImpactFigures(): StatItem[] {
  const figures = siteSettingsData.impact_figures || [];
  return figures.map((fig) => {
    // If not verified, ensure placeholder note is prioritized
    if (!fig.verified) {
      return {
        value: fig.value,
        label: fig.label,
        description: fig.description,
        note: fig.note || {
          en: "Figures to be confirmed by the organisation",
          hi: "आंकड़े संस्थान द्वारा सत्यापित किए जाने हैं",
        },
      };
    }
    return {
      value: fig.value,
      label: fig.label,
      description: fig.description,
      note: undefined,
    };
  });
}

// ==========================================
// 2. Events & Status Derivation
// ==========================================

/**
 * Derives event status dynamically from date if a valid ISO date is present.
 * If date is in the past, status is "past". If future or missing, uses declared status.
 */
export function deriveEventStatus(dateStr?: string, explicitStatus?: string): EventStatus {
  if (explicitStatus === "past" || explicitStatus === "upcoming") {
    // If date is parseable and unambiguously in past/future, check if it overrides
    if (dateStr && /^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
      const eventDate = new Date(dateStr);
      if (!isNaN(eventDate.getTime())) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return eventDate < today ? "past" : "upcoming";
      }
    }
    return explicitStatus as EventStatus;
  }
  if (dateStr && /^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
    const eventDate = new Date(dateStr);
    if (!isNaN(eventDate.getTime())) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return eventDate < today ? "past" : "upcoming";
    }
  }
  return "upcoming";
}

/**
 * Format a date string into readable English & Hindi
 */
export function formatEventDate(dateStr?: string, locale: "en" | "hi" = "en"): string | null {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}/.test(dateStr)) return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;

  if (locale === "hi") {
    const monthsHi = [
      "जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून",
      "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"
    ];
    return `${d.getDate()} ${monthsHi[d.getMonth()]} ${d.getFullYear()}`;
  }
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function getSafeEventDate(
  event: EventItem | (typeof eventsData)[0],
  locale: "en" | "hi" = "en"
): string {
  // If a real ISO date is provided, format and return it, hiding placeholder text
  if (event.date && typeof event.date === "string" && /^\d{4}-\d{2}-\d{2}/.test(event.date)) {
    const formatted = formatEventDate(event.date, locale);
    if (formatted) return formatted;
  }

  // Check displayDate if available
  const anyEvent = event as Record<string, unknown>;
  if (anyEvent.displayDate) {
    const dd = anyEvent.displayDate as Record<string, string>;
    if (typeof dd === "string") return dd;
    return dd[locale] || dd.en || "";
  }

  // Check event.date string / localized object
  const dateStr =
    typeof event.date === "string"
      ? event.date
      : event.date
      ? (event.date as Record<string, string>)[locale] ?? (event.date as Record<string, string>).en
      : "";

  const derivedStatus = deriveEventStatus(
    typeof event.date === "string" ? event.date : undefined,
    event.status
  );

  if (derivedStatus === "past") {
    if (!dateStr || dateStr.toLowerCase().includes("announced") || dateStr.includes("घोषित")) {
      return locale === "hi"
        ? "सफलतापूर्वक संपन्न [अभिलेखीय विवरण]"
        : "Concluded [Archived Field Record]";
    }
    return dateStr;
  }

  return (
    dateStr ||
    (locale === "hi"
      ? "[आगामी कार्यक्रम — तिथि शीघ्र घोषित की जाएगी]"
      : "[Upcoming Schedule — Date to be announced]")
  );
}

export function getEvents(): EventItem[] {
  return (eventsData as Array<Record<string, unknown>>).map((e) => {
    const status = deriveEventStatus(
      typeof e.date === "string" ? e.date : undefined,
      e.status as string
    );
    return {
      id: e.id as string,
      title: e.title as EventItem["title"],
      date: (e.displayDate || e.date) as EventItem["date"],
      time: e.time as EventItem["time"],
      location: e.location as EventItem["location"],
      category: e.category as EventItem["category"],
      description: e.description as EventItem["description"],
      status,
      organizer: e.organizer as EventItem["organizer"],
      registrationNote: e.registrationNote as EventItem["registrationNote"],
    };
  });
}

// ==========================================
// 3. Activities Loader
// ==========================================

export function getActivities(): ActivityItem[] {
  return (activitiesData as Array<Record<string, unknown>>).map((act) => ({
    id: act.id as string,
    title: act.title as ActivityItem["title"],
    category: (act.categoryI18n || act.category) as ActivityItem["category"],
    description: (act.summary || act.description) as ActivityItem["description"],
    fullStory: (act.body || act.fullStory) as ActivityItem["fullStory"],
    date: {
      en: (act.date as string) || "[Date on record to be updated]",
      hi: (act.date as string) || "[सत्यापित तिथि शीघ्र अद्यतन की जाएगी]",
    },
    location: act.location as ActivityItem["location"],
    image: {
      src: (Array.isArray(act.photos) && act.photos[0]) || "/images/event-placeholder.jpg",
      alt: typeof act.title === "object" && act.title !== null ? (act.title as { en: string }).en : "Activity photo",
    },
    highlights: act.highlights as ActivityItem["highlights"],
  }));
}

// ==========================================
// 4. Gallery Loader
// ==========================================

export function getGallery(): GalleryItem[] {
  return (galleryData as Array<Record<string, unknown>>).map((item) => ({
    id: item.id as string,
    type: (item.type as "photo" | "video") || "photo",
    title: item.title as GalleryItem["title"],
    category: (item.categoryI18n || item.category) as GalleryItem["category"],
    description: (item.caption || item.description) as GalleryItem["description"],
    date: {
      en: (item.date as string) || "[Archived Record]",
      hi: (item.date as string) || "[अभिलेखीय विवरण]",
    },
    location: item.location as GalleryItem["location"],
    src: (item.image || item.src) as string,
    videoUrl: item.videoUrl as string,
    duration: item.duration as string,
    alt: (item.alt as string) || "Gallery media",
  }));
}

// ==========================================
// 5. Founder Loader
// ==========================================

export function getFounder(): FounderContent {
  return founderData as FounderContent;
}

// ==========================================
// 6. Focus Areas & Pillars
// ==========================================

// ==========================================
// 6. Focus Areas & Pillars
// ==========================================

export interface FocusAreaRaw {
  id: string;
  order?: number;
  icon: string;
  title: { en: string; hi: string };
  titleHindi?: string;
  description: { en: string; hi: string };
  color: string;
}

const DEFAULT_INITIATIVES: Record<string, {
  shortDescription: { en: string; hi: string };
  fullDescription: { en: string; hi: string };
  keyInitiatives: Array<{ en: string; hi: string }>;
  impactGoal: { en: string; hi: string };
  accentBadge: { en: string; hi: string };
}> = {
  education: {
    shortDescription: {
      en: "Supporting access to foundational learning, tutoring support, and study materials for rural children and first-generation learners.",
      hi: "ग्रामीण बच्चों और पहली पीढ़ी के शिक्षार्थियों के लिए बुनियादी शिक्षा, ट्यूशन सहायता और अध्ययन सामग्री की व्यवस्था।",
    },
    fullDescription: {
      en: "Education is the cornerstone of societal upliftment. We work to prevent dropouts, support village children with evening study circles, provide learning kits, and introduce young students to basic digital literacy tools.",
      hi: "शिक्षा सामाजिक उत्थान की आधारशिला है। हम बच्चों को स्कूल छोड़ने से रोकने, शाम की अध्ययन कक्षाओं, शिक्षण सामग्री के वितरण और डिजिटल साक्षरता के प्राथमिक अभ्यास के माध्यम से बच्चों को सशक्त बनाते हैं।",
    },
    keyInitiatives: [
      { en: "Community study circles and remedial learning support", hi: "सामुदायिक अध्ययन केंद्र और उपचारात्मक शिक्षण सहायता" },
      { en: "Book distribution drives and student stationery kits", hi: "पुस्तकालय अभियान और निःशुल्क पाठ्य सामग्री वितरण" },
      { en: "Digital literacy introductions for adolescent girls and boys", hi: "ग्रामीण बालक-बालिकाओं के लिए मूलभूत कंप्यूटर साक्षरता" },
      { en: "Guidance counseling for higher education and vocational courses", hi: "उच्च शिक्षा एवं व्यावसायिक पाठ्यक्रमों हेतु करियर मार्गदर्शन" },
    ],
    impactGoal: {
      en: "Bridging the rural learning divide across Raebareli villages.",
      hi: "रायबरेली के ग्रामीण क्षेत्रों में शैक्षिक अंतराल को समाप्त करना।",
    },
    accentBadge: { en: "Core Priority", hi: "प्राथमिक क्षेत्र" },
  },
  health: {
    shortDescription: {
      en: "Organising free preventive health camps, eye screenings, hygiene awareness drives, and basic medical aid access.",
      hi: "निशुल्क निवारक स्वास्थ्य शिविर, नेत्र जांच, स्वच्छता जागरूकता और बुनियादी चिकित्सा परामर्श।",
    },
    fullDescription: {
      en: "Access to timely medical consultations is often a challenge for remote rural hamlets. We mobilize medical volunteers and doctors to conduct free health check-ups, distribute essential vitamins, and guide families to district healthcare facilities.",
      hi: "दूरदराज के गांवों में समय पर चिकित्सा परामर्श पाना एक बड़ी चुनौती है। हम स्वयंसेवी चिकित्सकों के सहयोग से निःशुल्क स्वास्थ्य शिविर आयोजित करते हैं, परामर्श देते हैं और जिला अस्पतालों से समन्वय में मदद करते हैं।",
    },
    keyInitiatives: [
      { en: "Periodic general health and eye screening camps", hi: "नियमित सामान्य स्वास्थ्य एवं नेत्र परीक्षण शिविर" },
      { en: "Maternal and child wellness awareness sessions", hi: "मातृ एवं शिशु पोषण व स्वास्थ्य जागरूकता सत्र" },
      { en: "Clean drinking water awareness and sanitation education", hi: "स्वच्छ पेयजल और स्वच्छता के महत्व पर जन-जागरूकता" },
      { en: "First-aid kits and emergency assistance coordination", hi: "प्राथमिक चिकित्सा किट और आपातकालीन सहायता मार्गदर्शन" },
    ],
    impactGoal: {
      en: "Making preventive health care accessible and proactive in every hamlet.",
      hi: "प्रत्येक ग्राम तक निवारक स्वास्थ्य सेवाओं की सुलभ पहुंच बनाना।",
    },
    accentBadge: { en: "Healthcare Outreach", hi: "स्वास्थ्य सेवा" },
  },
  livelihood: {
    shortDescription: {
      en: "Skill development workshops, handicraft training, and micro-enterprise guidance that enable families to build sustainable income.",
      hi: "कौशल विकास कार्यशालाएं, सिलाई-शिल्प प्रशिक्षण और स्वरोजगार मार्गदर्शन से स्थायी आय के साधन।",
    },
    fullDescription: {
      en: "Economic independence transforms families and strengthens rural resilience. We offer vocational guidance in tailoring, traditional crafts, agro-processing, and self-help group financial literacy so rural individuals can earn dignified livelihoods.",
      hi: "आर्थिक आत्मनिर्भरता परिवारों के जीवन में वास्तविक परिवर्तन लाती है। हम सिलाई-कढ़ाई, पारंपरिक हस्तशिल्प, लघु कृषि उत्पाद और स्वयं सहायता समूहों के माध्यम से ग्रामीण परिवारों को आत्मनिर्भर बनाने का कार्य करते हैं।",
    },
    keyInitiatives: [
      { en: "Tailoring and embroidery training centers for women", hi: "ग्रामीण महिलाओं के लिए सिलाई व कढ़ाई प्रशिक्षण केंद्र" },
      { en: "Self-Help Group (SHG) formation and financial recordkeeping", hi: "स्वयं सहायता समूहों का गठन व वित्तीय साक्षरता प्रशिक्षण" },
      { en: "Agricultural best-practices workshops for smallholder farmers", hi: "छोटे और सीमांत किसानों के लिए उन्नत कृषि पद्धतियों की कार्यशालाएं" },
      { en: "Micro-enterprise mentorship and market link guidance", hi: "लघु उद्यम मार्गदर्शन और स्थानीय बाजार संपर्क में सहयोग" },
    ],
    impactGoal: {
      en: "Fostering rural financial self-reliance and dignified livelihoods.",
      hi: "ग्रामीण क्षेत्रों में आर्थिक आत्मनिर्भरता और सम्मानजनक रोजगार को बढ़ावा।",
    },
    accentBadge: { en: "Self-Reliance", hi: "स्वावलंबन" },
  },
  welfare: {
    shortDescription: {
      en: "Winter blanket drives, assistance for senior citizens, ration support for destitute families, and seasonal emergency relief.",
      hi: "शीतकालीन कंबल वितरण, वरिष्ठ नागरिकों की सहायता, असहाय परिवारों को राशन और मौसमी राहत कार्य।",
    },
    fullDescription: {
      en: "We stand firmly with the most vulnerable members of society. From distributing blankets to the elderly during severe north Indian winters to aiding disabled individuals and emergency relief during distress, we act with swift compassion.",
      hi: "हम समाज के सबसे वंचित और जरूरतमंद वर्ग के साथ संवेदनशीलता से खड़े हैं। भीषण ठंड में बुजुर्गों को कंबल वितरण से लेकर दिव्यांगजनों और असहाय परिवारों को आपातकालीन सहायता पहुंचाने तक हमारा सेवा कार्य अनवरत जारी है।",
    },
    keyInitiatives: [
      { en: "Annual winter warm clothing and blanket distributions", hi: "वार्षिक शीतकालीन गर्म कपड़े और कंबल वितरण अभियान" },
      { en: "Dry ration and nutrition kits for vulnerable elderly persons", hi: "असहाय व वृद्धजनों के लिए सूखा राशन और पोषण सामग्री" },
      { en: "Assistance connecting persons with disabilities to state schemes", hi: "दिव्यांगजनों को सरकारी कल्याणकारी योजनाओं से जोड़ने में मदद" },
      { en: "Emergency aid coordination during local hardships", hi: "प्राकृतिक अथवा पारिवारिक संकट के समय त्वरित मानवीय सहायता" },
    ],
    impactGoal: {
      en: "Ensuring no individual is left unsupported in times of vulnerability.",
      hi: "यह सुनिश्चित करना कि संकट के समय कोई भी व्यक्ति असहाय न रहे।",
    },
    accentBadge: { en: "Humanitarian Aid", hi: "मानवीय सहायता" },
  },
};

export function getRawFocusAreas(): FocusAreaRaw[] {
  const list = (
    Array.isArray(focusAreasData)
      ? focusAreasData
      : (focusAreasData as { focus_areas?: FocusAreaRaw[] }).focus_areas || []
  );
  return list as FocusAreaRaw[];
}

export function getFocusAreas(): AreaOfWork[] {
  const list = getRawFocusAreas();

  return list.map((area) => {
    const extra = DEFAULT_INITIATIVES[area.id] || {
      shortDescription: area.description,
      fullDescription: area.description,
      keyInitiatives: [],
      impactGoal: area.description,
      accentBadge: { en: "Focus Area", hi: "कार्यक्षेत्र" },
    };

    return {
      id: area.id,
      icon: area.icon || "GraduationCap",
      title: area.title,
      titleHindi: area.title?.hi,
      shortDescription: extra.shortDescription,
      fullDescription: extra.fullDescription,
      keyInitiatives: extra.keyInitiatives,
      impactGoal: extra.impactGoal,
      color: area.color || "#1F2A5C",
      accentBadge: extra.accentBadge,
    };
  });
}

export function getPillars() {
  return pillarsData;
}

// ==========================================
// 7. Page Content Facades & Compatibility
// ==========================================

export const siteConfig: SiteConfig = {
  name: siteSettingsData.name,
  nameHindi: siteSettingsData.nameHindi,
  tagline: siteSettingsData.tagline,
  location: siteSettingsData.location,
  district: siteSettingsData.district,
  state: siteSettingsData.state,
  pincode: siteSettingsData.pincode,
  description: siteSettingsData.description,
  logoPath: "/images/logo.png",
  email: siteSettingsData.email,
  phone: siteSettingsData.phone,
  address: siteSettingsData.address,
  socialLinks: {
    facebook: siteSettingsData.facebook_url,
  },
  navLinks: siteSettingsData.navLinks,
  ctaNav: siteSettingsData.ctaNav,
};

export const navigation = {
  links: siteSettingsData.navLinks,
  cta: siteSettingsData.ctaNav,
};

export const heroContent = {
  badge: homeData.hero.badge,
  headline: homeData.hero.headline,
  headlineHindi: homeData.hero.headlineHindi,
  subheadline: homeData.hero.subheadline,
  primaryCta: homeData.hero.primaryCta,
  secondaryCta: homeData.hero.secondaryCta,
  trustNotes: homeData.hero.trustNotes,
  floatingTags: homeData.hero.floatingTags,
  heroImage: homeData.hero.heroImage,
  tickerItems: (homeData.hero as Record<string, unknown>).tickerItems as Array<{ en: string; hi: string }> | undefined,
};

export const aboutSection = {
  badge: homeData.aboutPreview.badge,
  headline: homeData.aboutPreview.headline,
  body: homeData.aboutPreview.body,
  values: homeData.aboutPreview.values,
  cardLabel: homeData.aboutPreview.cardLabel,
  cardQuote: homeData.aboutPreview.cardQuote,
  cardNote: homeData.aboutPreview.cardNote,
  metricsTitle: homeData.aboutPreview.metricsTitle,
  stats: homeData.aboutPreview.stats,
  image: aboutData.image,
};

export const areasOfWork = {
  badge: {
    en: "Our Focus Areas",
    hi: "हमारे मुख्य कार्यक्षेत्र",
  },
  headline: {
    en: "Where We Direct\nOur Efforts",
    hi: "हमारा प्रयास,\nसमाज का उत्थान",
  },
  intro: {
    en: "We concentrate our resources on six interconnected pillars where rural community needs in Raebareli are greatest — creating programs that are sustainable, dignified, and locally sustained.",
    hi: "हम रायबरेली के ग्रामीण क्षेत्रों में छह प्रमुख स्तंभों पर ध्यान केंद्रित करते हैं — ताकि स्थायी, गरिमापूर्ण व आत्मनिर्भर विकास संभव हो सके।",
  },
  learnMoreLabel: {
    en: "Learn More",
    hi: "विस्तार से जानें",
  },
  areas: getRawFocusAreas(),
};

export const featuredActivities = {
  badge: {
    en: "Field Stories & Programs",
    hi: "धरातल से कार्यक्रम व कहानियाँ",
  },
  headline: {
    en: "Stories from\nthe Ground",
    hi: "धरातल से सेवा की कहानियाँ",
  },
  subtitle: {
    en: "Real grassroots programs, initiatives, and direct community interventions undertaken by our teams across rural Uttar Pradesh.",
    hi: "ग्रामीण उत्तर प्रदेश में हमारी टीमों द्वारा संचालित वास्तविक जमीनी कार्यक्रम, पहल एवं प्रत्यक्ष सामुदायिक सेवाएं।",
  },
  readOverview: {
    en: "Read Overview",
    hi: "विवरण पढ़ें",
  },
  activities: activitiesData.slice(0, 3).map((act) => ({
    title: act.title,
    category: act.categoryI18n || { en: act.category, hi: act.category },
    description: act.summary,
    image: {
      src: (act.photos && act.photos[0]) || "/images/event-placeholder.jpg",
      alt: act.title.en,
    },
    date: {
      en: act.date || "[Date on record to be updated]",
      hi: act.date || "[अभिलेख तिथि शीघ्र अपडेट की जाएगी]",
    },
  })),
};

export const impactHighlights = {
  badge: {
    en: "Community Commitment",
    hi: "सामुदायिक प्रतिबद्धता",
  },
  headline: {
    en: "Dedicated to Grounded,\nTransparent Service",
    hi: "जमीनी सेवा और\nपारदर्शिता के प्रति समर्पित",
  },
  subtitle: {
    en: "Our guiding operational pillars and community targets across rural Raebareli, Uttar Pradesh.",
    hi: "रायबरेली जनपद के ग्रामीण समाज में हमारे मुख्य सेवा स्तंभ और सामुदायिक लक्ष्य।",
  },
  note: {
    en: "* Statistical metrics are under formal compilation. Verified audit reports will be published upon official validation.",
    hi: "* आंकड़े संकलन प्रक्रिया में हैं। आधिकारिक सत्यापन के पश्चात परीक्षित रिपोर्ट प्रकाशित की जाएगी।",
  },
  editorialNotice: {
    en: "Editorial Notice:",
    hi: "संपादकीय सूचना:",
  },
  auditNotice: {
    en: "Figures to be confirmed by the organisation alongside statutory filings.",
    hi: "आधिकारिक आंकड़े संस्थान द्वारा आगामी वार्षिक प्रतिवेदन के साथ प्रस्तुत किए जाएंगे।",
  },
  stats: getImpactFigures(),
};

export const latestEvents = {
  badge: {
    en: "Upcoming & Past Initiatives",
    hi: "आगामी व पूर्व कार्यक्रम",
  },
  headline: {
    en: "Events & Programmes",
    hi: "कार्यक्रम एवं आयोजनाएं",
  },
  subtitle: {
    en: "Community gatherings, health camps, workshops, and awareness campaigns organized across Raebareli district.",
    hi: "रायबरेली जनपद में आयोजित सामुदायिक बैठकें, स्वास्थ्य शिविर, कार्यशालाएं और जागरूकता अभियान।",
  },
  viewAllBtn: {
    en: "View All Events",
    hi: "सभी कार्यक्रम देखें",
  },
  upcomingBadge: {
    en: "Upcoming",
    hi: "आगामी",
  },
  pastBadge: {
    en: "Past Event",
    hi: "संपन्न कार्यक्रम",
  },
  detailsLabel: {
    en: "Event Details",
    hi: "कार्यक्रम विवरण",
  },
  events: getEvents().slice(0, 3),
};

export const donationSection = {
  badge: {
    en: "Support the Mission",
    hi: "पुनीत कार्य में सहयोग",
  },
  headline: {
    en: "Be the Change\nYou Wish to See",
    hi: "बदलाव की शुरुआत\nआपके सहयोग से",
  },
  subheadline: {
    en: "Your voluntary support enables our field volunteers to expand rural tutoring circles, conduct free medical screenings, and aid vulnerable families across Raebareli.",
    hi: "आपका स्वैच्छिक सहयोग हमारे कार्यकर्ताओं को ग्रामीण शिक्षण केंद्र चलाने, निःशुल्क स्वास्थ्य शिविर लगाने और जरूरतमंद परिवारों की सहायता करने में सक्षम बनाता है।",
  },
  neutralStatement: donateData.neutralStatement,
  note: siteSettingsData.donation_note,
  donationDetailsLabel: {
    en: "Donation Details:",
    hi: "सहयोग संबंधी जानकारी:",
  },
  primaryCta: {
    label: {
      en: "Support Our Mission",
      hi: "सहयोग करें",
    },
    href: "/donate",
  },
  secondaryCta: {
    label: {
      en: "Contact Us to Learn More",
      hi: "संपर्क करें",
    },
    href: "/contact",
  },
  image: {
    src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&q=80",
    alt: "Volunteers organizing community assistance supplies",
  },
};

export const footerContent = {
  tagline: siteSettingsData.tagline,
  headings: {
    navigation: { en: "Navigation", hi: "नेविगेशन" },
    focus: { en: "Our Focus", hi: "मुख्य क्षेत्र" },
    involvement: { en: "Involvement", hi: "सहभागिता" },
  },
  facebookConnect: {
    en: "Connect on Facebook",
    hi: "फेसबुक पर जुड़ें",
  },
  supportCause: {
    en: "Support Our Cause",
    hi: "सहयोग करें",
  },
  locationTag: {
    en: "Raebareli, Uttar Pradesh",
    hi: "रायबरेली, उत्तर प्रदेश",
  },
  facebookUrl: siteSettingsData.facebook_url,
  quickLinks: [
    { label: { en: "Home", hi: "मुख्य पृष्ठ" }, href: "/" },
    { label: { en: "About Us", hi: "हमारे बारे में" }, href: "/about" },
    { label: { en: "Our Work", hi: "हमारे कार्य" }, href: "/our-work" },
    { label: { en: "Activities", hi: "गतिविधियाँ" }, href: "/activities" },
    { label: { en: "Events", hi: "कार्यक्रम" }, href: "/events" },
    { label: { en: "Gallery", hi: "दीर्घा" }, href: "/gallery" },
  ],
  supportLinks: [
    { label: { en: "How to Donate", hi: "सहयोग कैसे करें" }, href: "/donate" },
    { label: { en: "Volunteer With Us", hi: "स्वयंसेवक बनें" }, href: "/volunteer" },
    { label: { en: "Partner With Us", hi: "साझेदार बनें" }, href: "/partner" },
    { label: { en: "Contact Us", hi: "संपर्क करें" }, href: "/contact" },
  ],
  legal: [
    { label: { en: "Privacy Policy", hi: "गोपनीयता नीति" }, href: "/privacy" },
    { label: { en: "Terms of Use", hi: "नियम एवं शर्तें" }, href: "/terms" },
  ],
  copyright: {
    en: "© 2026 Maadhav Sewa Sansthan. All rights reserved.",
    hi: "© 2026 माधव सेवा संस्थान। सर्वाधिकार सुरक्षित।",
  },
};

export const eventsContent = {
  badge: {
    en: "Upcoming & Past Initiatives",
    hi: "आगामी एवं पूर्व कार्यक्रम",
  },
  headline: {
    en: "Events & Programmes",
    hi: "कार्यक्रम एवं आयोजनाएं",
  },
  headlineHindi: "कार्यक्रम एवं आयोजनाएं",
  intro: {
    en: "Community meetings, health camps, volunteer mobilization drives, and welfare distribution schedules organized across Raebareli district.",
    hi: "रायबरेली जनपद के विभिन्न ग्रामों में आयोजित होने वाले स्वास्थ्य शिविर, जागरूकता सभाएं, छात्र प्रोत्साहन और जनकल्याणकारी कार्यक्रमों का विवरण।",
  },
  upcomingHeading: {
    en: "Scheduled Initiatives",
    hi: "आगामी निर्धारित कार्यक्रम",
  },
  pastHeading: {
    en: "Concluded Programmes",
    hi: "सफलतापूर्वक संपन्न कार्यक्रम",
  },
  events: getEvents(),
};

export const activitiesContent = {
  badge: {
    en: "Field Stories & Programs",
    hi: "धरातल से सेवा गतिविधियाँ",
  },
  headline: {
    en: "Stories from the Ground",
    hi: "धरातल से सेवा की कहानियाँ",
  },
  headlineHindi: "धरातल से सेवा की कहानियाँ",
  intro: {
    en: "An ongoing record of on-ground interventions, community health check-up camps, education drives, and rural assistance conducted by Maadhav Sewa Sansthan across Raebareli.",
    hi: "माधव सेवा संस्थान द्वारा रायबरेली के ग्रामीण अंचलों में आयोजित स्वास्थ्य शिविरों, शैक्षणिक कार्यशालाओं, स्वरोजगार प्रशिक्षण और राहत अभियानों का विस्तृत विवरण।",
  },
  categories: [
    { id: "all", label: { en: "All Activities", hi: "सभी गतिविधियाँ" } },
    { id: "health", label: { en: "Health", hi: "स्वास्थ्य" } },
    { id: "education", label: { en: "Education", hi: "शिक्षा" } },
    { id: "livelihood", label: { en: "Livelihood", hi: "रोजगार" } },
    { id: "welfare", label: { en: "Social Welfare", hi: "समाज कल्याण" } },
  ],
  activities: getActivities(),
};

export const galleryContent = {
  badge: {
    en: "Visual Archive",
    hi: "चित्र एवं वीडियो वीथिका",
  },
  headline: {
    en: "Moments of Service & Community",
    hi: "सेवा एवं समर्पण के कुछ पल",
  },
  headlineHindi: "चित्र एवं वीडियो वीथिका",
  intro: {
    en: "A visual journey through on-ground initiatives, health camps, student literacy circles, and village meetings led by Maadhav Sewa Sansthan across Raebareli, Uttar Pradesh.",
    hi: "माधव सेवा संस्थान द्वारा रायबरेली के विभिन्न ग्रामों में आयोजित स्वास्थ्य शिविरों, शिक्षा संवाद, पर्यावरण संरक्षण और समाज सेवा की प्रामाणिक झलकियाँ।",
  },
  categories: [
    { id: "All", label: { en: "All", hi: "सभी" } },
    { id: "Photos", label: { en: "Photos", hi: "छायाचित्र" } },
    { id: "Videos", label: { en: "Videos", hi: "वीडियो" } },
    { id: "Health", label: { en: "Health", hi: "स्वास्थ्य" } },
    { id: "Education", label: { en: "Education", hi: "शिक्षा" } },
    { id: "Environment", label: { en: "Environment", hi: "पर्यावरण" } },
    { id: "Community", label: { en: "Community", hi: "सामुदायिक" } },
  ],
  items: getGallery(),
};

export const founderContent = getFounder();
export const pillars = getPillars();
export const aboutContent = aboutData;
export const contactContent = contactData;
export const donationContent = donateData;
export const areasOfWorkContent = {
  badge: ourWorkData.badge,
  headline: ourWorkData.headline,
  headlineHindi: ourWorkData.headlineHindi,
  intro: ourWorkData.intro,
  areas: getFocusAreas(),
};
