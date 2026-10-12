import type { Metadata } from 'next';
import './globals.css';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

export const metadata: Metadata = {
  title: 'IndiNiger BizHub — Global Business Marketplace | One Roof. Every Business. Global Opportunities.',
  description: 'Global business marketplace connecting 62 business categories and 57 countries. Discover manufacturers, suppliers, investors, and cross-border trade opportunities.',
  keywords: [
    'IndiNiger BizHub',
    'Global Business Marketplace',
    'International Business Network',
    'Business Directory',
    'Global Trade Opportunities',
    'Business Networking Platform',
    'International Exhibitions',
    'Industry Directory',
    'India Niger Trade',
    'Kumud Gameti',
  ],
  authors: [{ name: 'Kumud Gameti' }, { name: 'IndiNiger BizHub Secretariat' }],
  openGraph: {
    title: 'IndiNiger BizHub — Global Business Marketplace',
    description: 'One Roof. Every Business. Global Opportunities. Connecting multi-sector businesses across 57 countries.',
    siteName: 'IndiNiger BizHub',
    type: 'website',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-bizhub-lightBg text-bizhub-black antialiased selection:bg-bizhub-gold selection:text-bizhub-black">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
