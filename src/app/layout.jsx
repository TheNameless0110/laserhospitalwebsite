import Script from 'next/script';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/ui/CookieConsent';

export const metadata = {
  title: 'Laser Hospital',
  description: 'Premium print solutions and tech infrastructure.',
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
