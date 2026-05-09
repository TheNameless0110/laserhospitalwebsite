'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Zap, Instagram, Facebook, X } from 'lucide-react';

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <>
    <footer className="bg-gray-950 text-white pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 pr-8">
            <Link href="/" className="flex items-center mb-8 group cursor-pointer w-max">
              <div className="bg-white/10 p-2 rounded-xl border border-white/10 group-hover:border-orange-500/50 transition-colors mr-4">
                <Image
                  src="/N-LH-Logo.jpg"
                  alt="Laser Hospital Logo"
                  width={48}
                  height={48}
                  className="h-10 w-auto rounded-lg object-contain"
                />
              </div>
              <div className="bg-white/10 p-2 px-3 rounded-xl border border-white/10 group-hover:border-orange-500/50 transition-colors">
                <Image
                  src="/LH-Company-Name.jpeg"
                  alt="Laser Hospital"
                  width={160}
                  height={36}
                  className="h-8 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light">
              The region's premier hub for enterprise print solutions, expert hardware repair, and complete Tech infrastructure management since 1997.
            </p>
            <div className="flex space-x-4">
               <a href="https://www.instagram.com/laserhospital_official?igsh=eGFnY3FsOHZ1ZHc4" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-orange-500 hover:border-orange-500 hover:-translate-y-1 flex items-center justify-center transition-all duration-300 group"><Instagram className="w-5 h-5 text-gray-300 group-hover:text-white" /></a>
               <button aria-label="Facebook" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-orange-500 hover:border-orange-500 hover:-translate-y-1 flex items-center justify-center transition-all duration-300 group"><Facebook className="w-5 h-5 text-gray-300 group-hover:text-white" /></button>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h4 className="font-bold mb-8 text-white tracking-widest text-sm uppercase flex items-center">
              <span className="w-2 h-2 bg-orange-500 mr-3 rounded-full"></span> Explore
            </h4>
            <ul className="space-y-4 text-base font-light text-gray-400">
              <li><Link href="/" className="hover:text-orange-400 hover:translate-x-2 transition-all block">Home</Link></li>
              <li><Link href="/products" className="hover:text-orange-400 hover:translate-x-2 transition-all block">Products Catalog</Link></li>
              <li><Link href="/services" className="hover:text-orange-400 hover:translate-x-2 transition-all block">Expert Services</Link></li>
              <li><Link href="/about" className="hover:text-orange-400 hover:translate-x-2 transition-all block">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h4 className="font-bold mb-8 text-white tracking-widest text-sm uppercase flex items-center">
              <span className="w-2 h-2 bg-pink-500 mr-3 rounded-full"></span> Support
            </h4>
            <ul className="space-y-4 text-base font-light text-gray-400">
              <li><Link href="/contact" className="hover:text-orange-400 hover:translate-x-2 transition-all block">Contact Us</Link></li>
              <li><button onClick={() => setPrivacyOpen(true)} className="hover:text-orange-400 hover:translate-x-2 transition-all block text-left">Privacy Policy</button></li>
              <li><button onClick={() => setTermsOpen(true)} className="hover:text-orange-400 hover:translate-x-2 transition-all block text-left">Terms of Service</button></li>
            </ul>
          </div>

          {/* Visit Store */}
          <div className="lg:col-span-3">
            <h4 className="font-bold mb-8 text-white tracking-widest text-sm uppercase flex items-center">
              <span className="w-2 h-2 bg-cyan-500 mr-3 rounded-full"></span> Visit Store
            </h4>
            <div className="space-y-6 text-gray-400 font-light text-base">
              <a href="https://maps.app.goo.gl/h17Yak221WC9qx3GA" target="_blank" rel="noopener noreferrer" className="flex items-start group cursor-pointer hover:text-orange-400 transition-colors">
                <MapPin className="w-5 h-5 text-gray-500 mr-4 shrink-0 mt-1 group-hover:text-orange-500 transition-colors" />
                <p>First Floor, PLOT NO-270, near Apollo Pharmacy,<br/>E-Block, Saheed Nagar, Bhubaneswar, Odisha 751007</p>
              </a>
              <div className="space-y-3">
                <a href="tel:+919437066882" className="flex items-center group cursor-pointer hover:text-orange-400 transition-colors">
                  <Phone className="w-5 h-5 text-gray-500 mr-4 shrink-0 group-hover:text-orange-500 transition-colors" />
                  <p>+91 9437066882</p>
                </a>
                <a href="tel:+917735524468" className="flex items-center group cursor-pointer hover:text-orange-400 transition-colors">
                  <Phone className="w-5 h-5 text-gray-500 mr-4 shrink-0 group-hover:text-orange-500 transition-colors" />
                  <p>+91 7735524468</p>
                </a>
              </div>
              <div className="space-y-3">
                <a href="mailto:laserhospitalsupport@gmail.com" className="flex items-center group cursor-pointer hover:text-orange-400 transition-colors">
                  <Mail className="w-5 h-5 text-gray-500 mr-4 shrink-0 group-hover:text-orange-500 transition-colors" />
                  <p>laserhospitalsupport@gmail.com</p>
                </a>
                <a href="mailto:laser.hospital@gmail.com" className="flex items-center group cursor-pointer hover:text-orange-400 transition-colors">
                  <Mail className="w-5 h-5 text-gray-500 mr-4 shrink-0 group-hover:text-orange-500 transition-colors" />
                  <p>laser.hospital@gmail.com</p>
                </a>
              </div>
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-gray-500 mr-4 shrink-0 mt-1" />
                <p>Mon - Sat: 9:30 AM - 9:00 PM<br/>Sun: Time Varies</p>
              </div>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-gray-800/80 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-light">
          <p>© {new Date().getFullYear()} Laser Hospital. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0">
             <span className="mr-2">Designed By Modern Workflows.</span>
             <Zap className="w-4 h-4 text-orange-500/80" />
          </div>
        </div>
      </div>
    </footer>

    {/* Privacy Policy Modal */}
    {privacyOpen && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setPrivacyOpen(false)}>
        <div className="bg-white rounded-[2.5rem] w-full max-w-3xl flex flex-col shadow-2xl overflow-hidden relative max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
            <h3 className="text-2xl font-black text-gray-900">Privacy Policy</h3>
            <button onClick={() => setPrivacyOpen(false)} className="p-3 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-200 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-8 overflow-y-auto text-gray-600 text-base leading-relaxed space-y-4">
            <p className="font-semibold text-gray-900">Last Updated: May 2026</p>
            <p>Laser Hospital ("we", "us", or "our") is committed to protecting the privacy of our customers and website visitors. This Privacy Policy describes how we collect, use, and safeguard your personal information.</p>
            <h4 className="font-bold text-gray-900 mt-4">Information We Collect</h4>
            <p>We may collect the following types of information when you interact with our website:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name, email address, and phone number submitted through our contact form</li>
              <li>Device information and browsing data collected through cookies and analytics services</li>
              <li>Information about service requests and product inquiries</li>
            </ul>
            <h4 className="font-bold text-gray-900 mt-4">How We Use Your Information</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>To respond to your inquiries and service requests</li>
              <li>To improve our website experience and product offerings</li>
              <li>To send important updates about your service orders</li>
              <li>To analyze website traffic and usage patterns via Google Analytics</li>
            </ul>
            <h4 className="font-bold text-gray-900 mt-4">Data Protection</h4>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or destruction. We do not sell, trade, or rent your personal information to third parties.</p>
            <h4 className="font-bold text-gray-900 mt-4">Contact Us</h4>
            <p>For questions about this Privacy Policy, contact us at <strong>laserhospitalsupport@gmail.com</strong> or <strong>laser.hospital@gmail.com</strong>.</p>
          </div>
        </div>
      </div>
    )}

    {/* Terms of Service Modal */}
    {termsOpen && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setTermsOpen(false)}>
        <div className="bg-white rounded-[2.5rem] w-full max-w-3xl flex flex-col shadow-2xl overflow-hidden relative max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
            <h3 className="text-2xl font-black text-gray-900">Terms of Service</h3>
            <button onClick={() => setTermsOpen(false)} className="p-3 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-200 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-8 overflow-y-auto text-gray-600 text-base leading-relaxed space-y-4">
            <p className="font-semibold text-gray-900">Last Updated: May 2026</p>
            <p>By accessing and using the Laser Hospital website, you agree to be bound by these Terms of Service.</p>
            <h4 className="font-bold text-gray-900 mt-4">Services</h4>
            <p>Laser Hospital provides printer and computer repair services, product sales and inquiries, and technical support. All services are subject to availability and may vary based on the specific device and issue.</p>
            <h4 className="font-bold text-gray-900 mt-4">Product Information</h4>
            <p>Product descriptions, specifications, and availability on this website are for informational purposes only. Prices and availability are subject to change without notice. Please contact us directly for current pricing and stock status.</p>
            <h4 className="font-bold text-gray-900 mt-4">Limitation of Liability</h4>
            <p>Laser Hospital shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our website or services. Our total liability shall not exceed the amount paid for the specific service in question.</p>
            <h4 className="font-bold text-gray-900 mt-4">Intellectual Property</h4>
            <p>All content, logos, and branding on this website are the property of Laser Hospital and are protected by intellectual property laws. Unauthorized reproduction or distribution is prohibited.</p>
            <h4 className="font-bold text-gray-900 mt-4">Contact</h4>
            <p>For questions about these Terms of Service, contact us at <strong>laserhospitalsupport@gmail.com</strong> or <strong>laser.hospital@gmail.com</strong>.</p>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
