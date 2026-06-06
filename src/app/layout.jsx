import Script from 'next/script';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/ui/CookieConsent';

export const metadata = {
  metadataBase: new URL('https://www.laserhospital.co.in'),
  title: {
    default: 'Laser Hospital – Printer Sales, Service & Accessories | Guwahati',
    template: '%s | Laser Hospital',
  },
  description: 'Laser Hospital is Guwahati\'s trusted destination for printer sales, expert repair services, genuine ink & toner, and computer peripherals. Canon, Epson, HP printers & more.',
  keywords: [
    'Laser Hospital', 'printer repair Guwahati', 'printer service', 'ink bottle',
    'Canon printer', 'Epson printer', 'HP printer', 'toner refill',
    'printer accessories', 'cartridge service', 'laptop repair Guwahati',
    'computer peripherals', 'FINGERS keyboard', 'RANZ cables',
  ],
  authors: [{ name: 'Laser Hospital' }],
  creator: 'Laser Hospital',
  publisher: 'Laser Hospital',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.laserhospital.co.in',
    siteName: 'Laser Hospital',
    title: 'Laser Hospital – Printer Sales, Service & Accessories',
    description: 'Guwahati\'s trusted destination for printer sales, expert repair, genuine ink & toner, and computer peripherals.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laser Hospital – Printer Sales, Service & Accessories',
    description: 'Guwahati\'s trusted destination for printer sales, expert repair, genuine ink & toner, and computer peripherals.',
  },
  alternates: {
    canonical: 'https://www.laserhospital.co.in',
  },
  verification: {
    // Add your Google Search Console verification code here if using the meta tag method
    // google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col">
        <CookieConsent />

        <Header />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
