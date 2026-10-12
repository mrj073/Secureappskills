export interface DemoEnquiry {
  id: string;
  type: 'business_inquiry' | 'event_booth' | 'join_network' | 'general_contact';
  fullName: string;
  companyName: string;
  email: string;
  phone?: string;
  industry?: string;
  country?: string;
  targetEntity?: string; // e.g. Business Name or Event Title
  message: string;
  timestamp: string;
  status: 'Pending Review' | 'Demo Processed';
}

const STORAGE_KEY = 'indiniger_demo_enquiries';

const SEED_ENQUIRIES: DemoEnquiry[] = [
  {
    id: 'enq-seed-01',
    type: 'business_inquiry',
    fullName: 'David Sterling',
    companyName: 'Sterling Global Infrastructure Ltd',
    email: 'd.sterling@sterling-infra.demo',
    phone: '+44 20 7946 0912',
    industry: 'Construction & Infrastructure',
    country: 'United Kingdom',
    targetEntity: 'Apex Infrastructure & Precast Works',
    message: 'We are sourcing precast concrete suppliers and EPC partners for our upcoming West African highway corridor project.',
    timestamp: '2026-10-09 14:22',
    status: 'Demo Processed',
  },
  {
    id: 'enq-seed-02',
    type: 'event_booth',
    fullName: 'Priya Sharma',
    companyName: 'Bharat Solar Equipments Pvt Ltd',
    email: 'priya.s@bharatsolar.demo',
    phone: '+91 98200 12345',
    industry: 'Defence & Industrial Solutions',
    country: 'India',
    targetEntity: 'Indo-African Industrial & Trade Convergence 2026',
    message: 'Requesting details for a 36 sqm prime pavilion booth and B2B bilateral buyer meeting slots in Niamey.',
    timestamp: '2026-10-10 09:15',
    status: 'Pending Review',
  },
];

export function getStoredEnquiries(): DemoEnquiry[] {
  if (typeof window === 'undefined') return SEED_ENQUIRIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ENQUIRIES));
      return SEED_ENQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_ENQUIRIES;
  }
}

export function saveEnquiry(enquiry: Omit<DemoEnquiry, 'id' | 'timestamp' | 'status'>): DemoEnquiry {
  const current = getStoredEnquiries();
  const newRecord: DemoEnquiry = {
    ...enquiry,
    id: `enq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: 'Pending Review',
  };

  const updated = [newRecord, ...current];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('indiniger_enquiry_added'));
    } catch (e) {
      console.warn('Unable to persist enquiry to localStorage', e);
    }
  }

  return newRecord;
}

export function clearDemoEnquiries(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ENQUIRIES));
      window.dispatchEvent(new Event('indiniger_enquiry_added'));
    } catch (e) {
      console.warn('Unable to clear enquiries', e);
    }
  }
}
