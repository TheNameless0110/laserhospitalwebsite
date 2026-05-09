'use client';
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { ShieldCheck, X } from 'lucide-react';
import { GA_TRACKING_ID_1, GA_TRACKING_ID_2 } from '@/lib/analytics';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent === 'true') {
      setHasConsented(true);
    } else if (consent === null) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true');
    setHasConsented(true);
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie_consent', 'false');
    setShowConsent(false);
  };

  if (!showConsent) {
    return hasConsented ? (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID_1}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID_1}');
            gtag('config', '${GA_TRACKING_ID_2}');
          `}
        </Script>
      </>
    ) : null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500 pointer-events-none">
      <div className="bg-gray-900 border border-gray-800 text-white p-6 md:p-8 rounded-[2rem] shadow-2xl max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden pointer-events-auto">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="flex items-start md:items-center gap-5 relative z-10 w-full md:w-auto">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">We value your privacy</h4>
            <p className="text-gray-400 text-sm md:text-base max-w-xl">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 relative z-10">
          <button 
            onClick={declineCookies}
            className="px-6 py-3 rounded-xl border border-gray-700 text-gray-300 font-bold hover:bg-gray-800 transition-colors w-full sm:w-auto text-center"
          >
            Reject All
          </button>
          <button 
            onClick={acceptCookies}
            className="px-6 py-3 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 w-full sm:w-auto text-center"
          >
            Accept All
          </button>
        </div>
        
        <button onClick={declineCookies} className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors block md:hidden">
            <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
