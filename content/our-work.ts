import { AreaOfWork } from "./types";

export interface AreasOfWorkPageContent {
  badge: { en: string; hi: string };
  headline: { en: string; hi: string };
  headlineHindi?: string;
  intro: { en: string; hi: string };
  areas: AreaOfWork[];
}

export const areasOfWorkContent: AreasOfWorkPageContent = {
  badge: {
    en: "Our Focus Areas",
    hi: "हमारे मुख्य कार्यक्षेत्र", // Pending client review
  },
  headline: {
    en: "Where We Direct Our Efforts",
    hi: "हमारा प्रयास, समाज का उत्थान", // Pending client review
  },
  headlineHindi: "हमारे मुख्य कार्यक्षेत्र",
  intro: {
    en: "We concentrate our resources on four core pillars where rural community needs in Raebareli are greatest — creating programs that are sustainable, dignified, and locally sustained.",
    hi: "हम रायबरेली के ग्रामीण क्षेत्रों में चार प्रमुख स्तंभों पर ध्यान केंद्रित करते हैं — ताकि स्थायी, गरिमापूर्ण व आत्मनिर्भर विकास संभव हो सके।", // Pending client review
  },
  areas: [
    {
      id: "education",
      icon: "GraduationCap",
      title: {
        en: "Education & Literacy",
        hi: "शिक्षा एवं साक्षरता", // Pending client review
      },
      titleHindi: "शिक्षा एवं साक्षरता",
      shortDescription: {
        en: "Supporting access to foundational learning, tutoring support, and study materials for rural children and first-generation learners.",
        hi: "ग्रामीण बच्चों और पहली पीढ़ी के शिक्षार्थियों के लिए बुनियादी शिक्षा, ट्यूशन सहायता और अध्ययन सामग्री की व्यवस्था।", // Pending client review
      },
      fullDescription: {
        en: "Education is the cornerstone of societal upliftment. We work to prevent dropouts, support village children with evening study circles, provide learning kits, and introduce young students to basic digital literacy tools.",
        hi: "शिक्षा सामाजिक उत्थान की आधारशिला है। हम बच्चों को स्कूल छोड़ने से रोकने, शाम की अध्ययन कक्षाओं, शिक्षण सामग्री के वितरण और डिजिटल साक्षरता के प्राथमिक अभ्यास के माध्यम से बच्चों को सशक्त बनाते हैं।", // Pending client review
      },
      keyInitiatives: [
        {
          en: "Community study circles and remedial learning support",
          hi: "सामुदायिक अध्ययन केंद्र और उपचारात्मक शिक्षण सहायता", // Pending client review
        },
        {
          en: "Book distribution drives and student stationery kits",
          hi: "पुस्तकालय अभियान और निःशुल्क पाठ्य सामग्री वितरण", // Pending client review
        },
        {
          en: "Digital literacy introductions for adolescent girls and boys",
          hi: "ग्रामीण बालक-बालिकाओं के लिए मूलभूत कंप्यूटर साक्षरता", // Pending client review
        },
        {
          en: "Guidance counseling for higher education and vocational courses",
          hi: "उच्च शिक्षा एवं व्यावसायिक पाठ्यक्रमों हेतु करियर मार्गदर्शन", // Pending client review
        },
      ],
      impactGoal: {
        en: "Bridging the rural learning divide across Raebareli villages.",
        hi: "रायबरेली के ग्रामीण क्षेत्रों में शैक्षिक अंतराल को समाप्त करना।", // Pending client review
      },
      color: "#1F2A5C",
      accentBadge: {
        en: "Core Priority",
        hi: "प्राथमिक क्षेत्र", // Pending client review
      },
    },
    {
      id: "health",
      icon: "HeartPulse",
      title: {
        en: "Health & Wellness",
        hi: "स्वास्थ्य एवं आरोग्य", // Pending client review
      },
      titleHindi: "स्वास्थ्य एवं आरोग्य",
      shortDescription: {
        en: "Organising free preventive health camps, eye screenings, hygiene awareness drives, and basic medical aid access.",
        hi: "निशुल्क निवारक स्वास्थ्य शिविर, नेत्र जांच, स्वच्छता जागरूकता और बुनियादी चिकित्सा परामर्श।", // Pending client review
      },
      fullDescription: {
        en: "Access to timely medical consultations is often a challenge for remote rural hamlets. We mobilize medical volunteers and doctors to conduct free health check-ups, distribute essential vitamins, and guide families to district healthcare facilities.",
        hi: "दूरदराज के गांवों में समय पर चिकित्सा परामर्श पाना एक बड़ी चुनौती है। हम स्वयंसेवी चिकित्सकों के सहयोग से निःशुल्क स्वास्थ्य शिविर आयोजित करते हैं, परामर्श देते हैं और जिला अस्पतालों से समन्वय में मदद करते हैं।", // Pending client review
      },
      keyInitiatives: [
        {
          en: "Periodic general health and eye screening camps",
          hi: "नियमित सामान्य स्वास्थ्य एवं नेत्र परीक्षण शिविर", // Pending client review
        },
        {
          en: "Maternal and child wellness awareness sessions",
          hi: "मातृ एवं शिशु पोषण व स्वास्थ्य जागरूकता सत्र", // Pending client review
        },
        {
          en: "Clean drinking water awareness and sanitation education",
          hi: "स्वच्छ पेयजल और स्वच्छता के महत्व पर जन-जागरूकता", // Pending client review
        },
        {
          en: "First-aid kits and emergency assistance coordination",
          hi: "प्राथमिक चिकित्सा किट और आपातकालीन सहायता मार्गदर्शन", // Pending client review
        },
      ],
      impactGoal: {
        en: "Making preventive health care accessible and proactive in every hamlet.",
        hi: "प्रत्येक ग्राम तक निवारक स्वास्थ्य सेवाओं की सुलभ पहुंच बनाना।", // Pending client review
      },
      color: "#A93A2B",
      accentBadge: {
        en: "Healthcare Outreach",
        hi: "स्वास्थ्य सेवा", // Pending client review
      },
    },
    {
      id: "livelihood",
      icon: "Sprout",
      title: {
        en: "Livelihood & Skill Training",
        hi: "रोजगार एवं कौशल विकास", // Pending client review
      },
      titleHindi: "रोजगार एवं कौशल विकास",
      shortDescription: {
        en: "Skill development workshops, handicraft training, and micro-enterprise guidance that enable families to build sustainable income.",
        hi: "कौशल विकास कार्यशालाएं, सिलाई-शिल्प प्रशिक्षण और स्वरोजगार मार्गदर्शन से स्थायी आय के साधन।", // Pending client review
      },
      fullDescription: {
        en: "Economic independence transforms families and strengthens rural resilience. We offer vocational guidance in tailoring, traditional crafts, agro-processing, and self-help group financial literacy so rural individuals can earn dignified livelihoods.",
        hi: "आर्थिक आत्मनिर्भरता परिवारों के जीवन में वास्तविक परिवर्तन लाती है। हम सिलाई-कढ़ाई, पारंपरिक हस्तशिल्प, लघु कृषि उत्पाद और स्वयं सहायता समूहों के माध्यम से ग्रामीण परिवारों को आत्मनिर्भर बनाने का कार्य करते हैं।", // Pending client review
      },
      keyInitiatives: [
        {
          en: "Tailoring and embroidery training centers for women",
          hi: "ग्रामीण महिलाओं के लिए सिलाई व कढ़ाई प्रशिक्षण केंद्र", // Pending client review
        },
        {
          en: "Self-Help Group (SHG) formation and financial recordkeeping",
          hi: "स्वयं सहायता समूहों का गठन व वित्तीय साक्षरता प्रशिक्षण", // Pending client review
        },
        {
          en: "Agricultural best-practices workshops for smallholder farmers",
          hi: "छोटे और सीमांत किसानों के लिए उन्नत कृषि पद्धतियों की कार्यशालाएं", // Pending client review
        },
        {
          en: "Micro-enterprise mentorship and market link guidance",
          hi: "लघु उद्यम मार्गदर्शन और स्थानीय बाजार संपर्क में सहयोग", // Pending client review
        },
      ],
      impactGoal: {
        en: "Fostering rural financial self-reliance and dignified livelihoods.",
        hi: "ग्रामीण क्षेत्रों में आर्थिक आत्मनिर्भरता और सम्मानजनक रोजगार को बढ़ावा।", // Pending client review
      },
      color: "#E39A1E",
      accentBadge: {
        en: "Self-Reliance",
        hi: "स्वावलंबन", // Pending client review
      },
    },
    {
      id: "social-welfare",
      icon: "HandHeart",
      title: {
        en: "Social Welfare & Relief",
        hi: "सामाजिक कल्याण एवं सहायता", // Pending client review
      },
      titleHindi: "सामाजिक कल्याण एवं सहायता",
      shortDescription: {
        en: "Winter blanket drives, assistance for senior citizens, ration support for destitute families, and seasonal emergency relief.",
        hi: "शीतकालीन कंबल वितरण, वरिष्ठ नागरिकों की सहायता, असहाय परिवारों को राशन और मौसमी राहत कार्य।", // Pending client review
      },
      fullDescription: {
        en: "We stand firmly with the most vulnerable members of society. From distributing blankets to the elderly during severe north Indian winters to aiding disabled individuals and emergency relief during distress, we act with swift compassion.",
        hi: "हम समाज के सबसे वंचित और जरूरतमंद वर्ग के साथ संवेदनशीलता से खड़े हैं। भीषण ठंड में बुजुर्गों को कंबल वितरण से लेकर दिव्यांगजनों और असहाय परिवारों को आपातकालीन सहायता पहुंचाने तक हमारा सेवा कार्य अनवरत जारी है।", // Pending client review
      },
      keyInitiatives: [
        {
          en: "Annual winter warm clothing and blanket distributions",
          hi: "वार्षिक शीतकालीन गर्म कपड़े और कंबल वितरण अभियान", // Pending client review
        },
        {
          en: "Dry ration and nutrition kits for vulnerable elderly persons",
          hi: "असहाय व वृद्धजनों के लिए सूखा राशन और पोषण सामग्री", // Pending client review
        },
        {
          en: "Assistance connecting persons with disabilities to state schemes",
          hi: "दिव्यांगजनों को सरकारी कल्याणकारी योजनाओं से जोड़ने में मदद", // Pending client review
        },
        {
          en: "Emergency aid coordination during local hardships",
          hi: "प्राकृतिक अथवा पारिवारिक संकट के समय त्वरित मानवीय सहायता", // Pending client review
        },
      ],
      impactGoal: {
        en: "Ensuring no individual is left unsupported in times of vulnerability.",
        hi: "यह सुनिश्चित करना कि संकट के समय कोई भी व्यक्ति असहाय न रहे।", // Pending client review
      },
      color: "#E9A3B2",
      accentBadge: {
        en: "Humanitarian Aid",
        hi: "मानवीय सहायता", // Pending client review
      },
    },
  ],
};
