/**
 * Centralized Site Configuration & Verified Metadata Source of Truth
 * For Beyond AI Engineering (https://www.beyondaiengineering.com)
 *
 * Unverified commercial metadata (ISBN, page counts, retail pricing, release date,
 * retailer URLs, third-party ESP/analytics keys) are intentionally kept `null` or `false`
 * so the UI never displays fabricated or conflicting claims.
 */

export interface BookEditionConfig {
  id: 'hardcover' | 'paperback' | 'ebook' | 'audiobook';
  format: string;
  subtitle: string;
  specLabel: string;
  price: number | null;
  priceLabel: string;
  isAvailable: boolean;
  directRequestLabel: string;
}

export interface RetailerLinkConfig {
  id: string;
  name: string;
  formats: string;
  regionNote: string;
  url: string | null;
  isConfigured: boolean;
}

export interface ApprovedEndorsement {
  quote: string;
  author: string;
  title: string;
  verifiedSource?: string;
}

export interface MediaVenueItem {
  name: string;
  category: string;
  description: string;
  url?: string;
}

export const SITE_CONFIG = {
  siteName: 'Beyond AI Engineering',
  canonicalOrigin: 'https://www.beyondaiengineering.com',
  book: {
    title: 'Beyond AI Engineering',
    subtitle: 'From Creator to Curator',
    fullTitle: 'Beyond AI Engineering: From Creator to Curator',
    tagline: 'Build Your Authority and Lead the AI Agent Revolution.',
    shortDescription:
      'A practical career operating system for software engineers, architects, students, and technical leaders navigating autonomous AI systems.',
    isbn: null as string | null,
    pageCount: null as number | null,
    releaseDate: null as string | null,
    publisher: null as string | null,
    editionNote: 'Advance & Direct Author Inquiries Open',
    structureSummary: '11 Chapters · 4 Parts · 12 Signature Frameworks · 15 Visual Blueprints',
    coverImage: '/assets/images/book_hardcover_mockup_1793842329740.jpg',
    editions: [
      {
        id: 'hardcover',
        format: 'Hardcover Edition',
        subtitle: 'Archival Linen-Bound Collector Volume',
        specLabel: '11 Chapters · Full Blueprint Illustrations',
        price: null,
        priceLabel: 'Direct Inquiry / Edition Pending',
        isAvailable: false,
        directRequestLabel: 'Request Hardcover Edition',
      },
      {
        id: 'paperback',
        format: 'Paperback Edition',
        subtitle: 'Practical Desk & Team Study Edition',
        specLabel: '11 Chapters · Reference Playbooks',
        price: null,
        priceLabel: 'Direct Inquiry / Edition Pending',
        isAvailable: false,
        directRequestLabel: 'Request Paperback Edition',
      },
      {
        id: 'ebook',
        format: 'Digital Edition (EPUB / PDF)',
        subtitle: 'Interactive Diagrams & Instant Search',
        specLabel: '11 Chapters · Hi-Res Diagrams',
        price: null,
        priceLabel: 'Direct Inquiry / Edition Pending',
        isAvailable: false,
        directRequestLabel: 'Request Digital Edition',
      },
      {
        id: 'audiobook',
        format: 'Audiobook Edition',
        subtitle: 'Unabridged Spoken Edition',
        specLabel: 'Audio Edition Inquiry Open',
        price: null,
        priceLabel: 'Edition Status Pending',
        isAvailable: false,
        directRequestLabel: 'Request Audiobook Updates',
      },
    ] as BookEditionConfig[],
    retailers: [
      {
        id: 'amazon',
        name: 'Amazon',
        formats: 'Hardcover, Paperback & Kindle',
        regionNote: 'Global distribution',
        url: null,
        isConfigured: false,
      },
      {
        id: 'barnes-and-noble',
        name: 'Barnes & Noble',
        formats: 'Hardcover, Paperback & NOOK',
        regionNote: 'United States',
        url: null,
        isConfigured: false,
      },
      {
        id: 'bookshop',
        name: 'Bookshop.org',
        formats: 'Independent Bookstore Distribution',
        regionNote: 'Supports local bookstores',
        url: null,
        isConfigured: false,
      },
      {
        id: 'audible-apple',
        name: 'Audio & Digital Stores',
        formats: 'Audible, Apple Books & Direct Digital',
        regionNote: 'Digital & spoken formats',
        url: null,
        isConfigured: false,
      },
    ] as RetailerLinkConfig[],
    approvedEndorsements: [] as ApprovedEndorsement[],
  },
  author: {
    name: 'Harsh Verma',
    title: 'Principal AI Engineer, Author & Cybersecurity Leader',
    headline: 'Principal AI Engineer · Stanford Distinguished Scholar · Forbes Technology Council',
    directRecipientEmail: 'harshverma59@gmail.com',
    publicContactEmail: 'connect@beyondaiengineering.com',
    personalSiteUrl: 'https://www.harshverma.me/',
    personalBlogUrl: 'https://www.harshverma.me/page-blog',
    linkedinUrl: 'https://www.linkedin.com/in/harshverma59/',
    forbesUrl: 'https://councils.forbes.com/profile/Harsh-Verma-Principal-Engineer-Palo-Alto-Networks/57137b2d-f4d9-44d4-882b-8486366fdff6',
    portraitPrimary: '/assets/aistudio/harsh_verma_87a0217e.jpg',
    portraitSecondary: '/assets/images/harsh_verma_portrait_1793842329600.jpg',
    verifiedBio:
      'Harsh Verma is the author of Beyond AI Engineering: From Creator to Curator. He serves as a Principal AI Engineer at Palo Alto Networks, is a Stanford Distinguished Scholar, Fellow of the Royal Society of Arts (FRSA), Fellow of the British Computer Society (FBCS), Fellow of IFGICT, IEEE Senior Member, and Forbes Technology Council Member. He advises founders and engineering leaders through Berkeley SkyDeck, Techstars, and the Mayfield Fund AI Garage.',
    credentialsList: [
      'Principal AI Engineer, Palo Alto Networks',
      'Stanford Distinguished Scholar (GSB LEAD)',
      'Fellow, Royal Society of Arts (FRSA)',
      'Fellow, British Computer Society (FBCS)',
      'Fellow, IFGICT',
      'Senior Member, IEEE',
      'Member, Forbes Technology Council',
      'Advisor, Berkeley SkyDeck, Techstars & Mayfield Fund AI Garage',
    ],
    mediaVenues: [
      {
        name: 'Forbes Technology Council',
        category: 'Published Columnist',
        description: 'Regular columns on Physical AI, AI agent security, enterprise data orchestration moats, and intelligence-per-dollar economics.',
        url: 'https://councils.forbes.com/profile/Harsh-Verma-Principal-Engineer-Palo-Alto-Networks/57137b2d-f4d9-44d4-882b-8486366fdff6',
      },
      {
        name: 'HackerNoon & The AI Journal',
        category: 'Technical Publications',
        description: 'Deep-dive systems architecture essays on autonomous systems governance, cloud resilience, and zero-trust AI infrastructure.',
        url: 'https://www.harshverma.me/page-blog',
      },
      {
        name: 'Berkeley SkyDeck · Techstars · Mayfield AI Garage',
        category: 'Startup & Executive Advisory',
        description: 'Mentoring AI-native founders and technical teams on production reliability, security boundaries, and durable moats.',
        url: 'https://www.harshverma.me/page-about',
      },
      {
        name: 'Stanford GSB LEAD · IEEE · BCS · RSA',
        category: 'Institutional Fellowships',
        description: 'Cross-disciplinary fellowships spanning executive leadership, computing standards, and societal trust in autonomous systems.',
        url: 'https://www.harshverma.me/page-about',
      },
    ] as MediaVenueItem[],
  },
  newsletter: {
    name: 'The Engineer After Code',
    description:
      'Occasional field dispatches from Harsh Verma on agentic systems architecture, governance patterns, and career resilience.',
    isEspConfigured: false,
    providerName: null as string | null,
  },
  analytics: {
    ga4MeasurementId: null as string | null,
  },
} as const;
