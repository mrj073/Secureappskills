export interface WhatsAppLeadPayload {
  fullName: string;
  companyName: string;
  email: string;
  phone?: string;
  industry?: string;
  country?: string;
  targetEntity?: string;
  message: string;
  type?: string;
}

export const KUMUD_WHATSAPP_NUMBER = '919990155699'; // +91 99901 55699

export function formatWhatsAppMessage(lead: WhatsAppLeadPayload): string {
  const parts: string[] = [
    '🌟 *NEW BUSINESS ENQUIRY — INDINIGER BIZHUB* 🌟\n',
    `👤 *Name:* ${lead.fullName || 'N/A'}`,
    `🏢 *Company:* ${lead.companyName || 'N/A'}`,
    `📧 *Email:* ${lead.email || 'N/A'}`,
    `📱 *Phone / WhatsApp:* ${lead.phone || 'N/A'}`,
    `🏭 *Industry:* ${lead.industry || 'General Sector'}`,
    `🌍 *Country:* ${lead.country || 'Global'}`,
  ];

  if (lead.targetEntity) {
    parts.push(`🎯 *Regarding:* ${lead.targetEntity}`);
  }

  if (lead.type) {
    parts.push(`🏷️ *Enquiry Type:* ${lead.type.replace('_', ' ').toUpperCase()}`);
  }

  parts.push('\n📝 *Message & Specifications:*');
  parts.push(lead.message || 'No additional details provided.');
  parts.push('\n-----------------------------------');
  parts.push('_Sent directly via IndiNiger BizHub Global Business Marketplace_');

  return parts.join('\n');
}

export function generateWhatsAppUrl(lead: WhatsAppLeadPayload): string {
  const text = formatWhatsAppMessage(lead);
  return `https://wa.me/${KUMUD_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function dispatchToWhatsApp(lead: WhatsAppLeadPayload): string {
  const url = generateWhatsAppUrl(lead);
  if (typeof window !== 'undefined') {
    // Immediate direct navigation so the browser lands directly on WhatsApp without popup blocker
    try {
      window.location.href = url;
    } catch {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
  return url;
}
