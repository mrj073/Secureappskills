export interface ExhibitionEvent {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  dateBadge: string;
  location: string;
  country: string;
  flag: string;
  venue: string;
  format: 'In-Person International Expo' | 'B2B Trade Conclave' | 'Virtual Hybrid Summit';
  description: string;
  expectedDelegates: string;
  exhibitorCountries: string;
  sectorsFocused: string[];
  badge: 'Sample Demo Event';
}

export const SAMPLE_EVENTS: ExhibitionEvent[] = [
  {
    id: 'event-01',
    title: 'Indo-African Industrial & Trade Convergence 2026',
    subtitle: 'Unlocking Cross-Continental Manufacturing & Supply Chain Corridors',
    category: 'Manufacturing, Trade & Energy',
    date: 'November 18 - 20, 2026',
    dateBadge: 'Upcoming Flagship',
    location: 'Niamey, Niger & New Delhi, India',
    country: 'Niger & India',
    flag: '🇳🇪 🇮🇳',
    venue: 'Mahatma Gandhi International Conference Centre, Niamey & Pragati Maidan, New Delhi',
    format: 'In-Person International Expo',
    description: 'The premier bilateral gathering connecting Indian engineering conglomerates, agricultural innovators, and mineral technology providers with West African enterprises and ministries.',
    expectedDelegates: '4,500+ Industry Executives',
    exhibitorCountries: '34 Participating Nations',
    sectorsFocused: ['Machinery & Engineering', 'Solar & Clean Energy', 'Agricultural Equipment', 'Mining Infrastructure'],
    badge: 'Sample Demo Event',
  },
  {
    id: 'event-02',
    title: 'Global Infrastructure & EPC Mega-Summit',
    subtitle: 'Financing, Materials & Turnkey Construction for Developing Corridors',
    category: 'Construction & Materials',
    date: 'December 04 - 06, 2026',
    dateBadge: 'Registration Open',
    location: 'Dubai, United Arab Emirates',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    venue: 'Dubai World Trade Centre (DWTC), Sheikh Zayed Road',
    format: 'In-Person International Expo',
    description: 'Bringing together master developers, structural steel suppliers, heavy equipment manufacturers, and sovereign wealth investors to forge next-generation infrastructure projects.',
    expectedDelegates: '8,200+ International Buyers',
    exhibitorCountries: '45 Nations',
    sectorsFocused: ['Construction & Infrastructure', 'Hardware & Building Materials', 'Property & Real Estate', 'Heavy Logistics'],
    badge: 'Sample Demo Event',
  },
  {
    id: 'event-03',
    title: 'World Textiles, Apparel & Fashion Sourcing Expo',
    subtitle: 'From Raw Yarn to Sustainable Global Fashion Retail Chains',
    category: 'Textiles & Consumer Goods',
    date: 'January 14 - 16, 2027',
    dateBadge: 'Early Delegate Booking',
    location: 'Mumbai, India',
    country: 'India',
    flag: '🇮🇳',
    venue: 'Jio World Convention Centre, BKC, Mumbai',
    format: 'In-Person International Expo',
    description: 'Direct manufacturer-to-buyer showcase featuring organic cotton spinning mills, jacquard weavers, technical protective clothing, and sustainable ethical fashion brands.',
    expectedDelegates: '12,000+ Trade Visitors',
    exhibitorCountries: '28 Nations',
    sectorsFocused: ['Textiles & Fabrics', 'Fashion & Apparel', 'Dyes & Chemicals', 'Garment Machinery'],
    badge: 'Sample Demo Event',
  },
  {
    id: 'event-04',
    title: 'Trans-Sahel Agritech & Food Processing Forum',
    subtitle: 'Resilient Farming, Cold Chains & International Food Trade',
    category: 'Agri-Commodities & Logistics',
    date: 'February 22 - 24, 2027',
    dateBadge: 'Call for Exhibitors',
    location: 'Dakar, Senegal',
    country: 'Senegal',
    flag: '🇸🇳',
    venue: 'Centre International de Conférences Abdou Diouf (CICAD)',
    format: 'B2B Trade Conclave',
    description: 'A focused summit addressing arid-zone irrigation technology, grain storage, cold chain freight networks, and export quality certification for African agricultural producers.',
    expectedDelegates: '3,200+ Agritech Buyers',
    exhibitorCountries: '22 Nations',
    sectorsFocused: ['Machinery & Equipment', 'Logistics & Supply Chain', 'Import & Export', 'Clean Irrigation'],
    badge: 'Sample Demo Event',
  },
  {
    id: 'event-05',
    title: 'IndiNiger Global Digital Trade & Fintech Conclave',
    subtitle: 'Cross-Border B2B Escrow, Compliance & Digital Supply Chains',
    category: 'Technology & Finance',
    date: 'March 11 - 12, 2027',
    dateBadge: 'Hybrid Access Available',
    location: 'Singapore & Virtual Worldwide',
    country: 'Singapore',
    flag: '🇸🇬',
    venue: 'Sands Expo and Convention Centre & Global Stream',
    format: 'Virtual Hybrid Summit',
    description: 'Connecting fintech founders, trade finance bankers, customs automated tech providers, and corporate CFOs to streamline cross-border trade transactions without friction.',
    expectedDelegates: '6,000+ Online & In-Person',
    exhibitorCountries: '40 Nations',
    sectorsFocused: ['Technology & Digital Solutions', 'Business Consulting', 'Investment & Partnerships', 'Trade Logistics'],
    badge: 'Sample Demo Event',
  },
];
