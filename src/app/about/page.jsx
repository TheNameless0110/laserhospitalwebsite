'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Menu, X, Search, ChevronRight, User, ShoppingCart,
  Play, Monitor, Printer, Droplet, Cpu, Disc, Package,
  Phone, Mail, MapPin, CheckCircle, Star, Filter, ArrowRight,
  Settings, Wrench, Clock, ShieldCheck, List, Grid, Tag, 
  HelpCircle, Download, BookOpen, MessageCircle, FileText, 
  ChevronDown, Leaf, Zap, Award, Users, Calendar, ArrowUpRight,
  Instagram, Facebook, AlertCircle, Loader2, PenTool,
  Mouse, Keyboard, HardDrive, Link, Wifi
} from 'lucide-react';
import { dummyProducts, servicesList, productImages, serviceImages, aboutImages, contactImages, homeImages } from '@/lib/dummyData';
import { HeroBackgroundSlider, CountUp } from '@/components/layout/SharedComponents';

const AboutPage = () => (
  <div className="pt-24 pb-24 animate-in fade-in bg-white">
     {/* BIG ABOUT US HEADER */}
     <div className="bg-gray-900 py-24 mb-20 mt-[-2rem] relative overflow-hidden">
       <HeroBackgroundSlider 
         images={aboutImages} 
         overlayClass="bg-gradient-to-r from-orange-900/50 to-gray-900/70" 
       />
       <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
         <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight fade-in-up">About Us</h1>
         <p className="text-gray-300 max-w-3xl mx-auto text-xl font-light fade-in-up" style={{ animationDelay: '100ms' }}>
         </p>
       </div>
     </div>

     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10 mb-24">
       <div className="inline-block mb-10 fade-in-up">
          <img src="/logo.jpg" alt="Laser Hospital Logo" className="h-28 w-auto mx-auto bg-gray-50 p-4 rounded-3xl shadow-inner border border-gray-100" />
       </div>
       <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-10 tracking-tight fade-in-up" style={{ animationDelay: '100ms' }}>The Engine Behind <br /> Your Tech Infrastructure</h1>
       
       <div className="prose prose-xl mx-auto text-gray-600 text-left space-y-8 fade-in-up" style={{ animationDelay: '200ms' }}>
         <p className="text-2xl leading-relaxed text-gray-900 font-medium border-l-4 border-orange-500 pl-6">
           Founded in 1997, Laser Hospital began with a simple mission: to cure the headaches associated with printing hardware.
         </p>
         <p className="font-light leading-relaxed text-lg">
           What started as a small local repair shop focused entirely on laser and inkjet printers has grown alongside modern technology. We expanded our expertise to encompass the full spectrum of office IT infrastructure—from complex enterprise copiers to the laptops and desktops that power modern workflows. We optimize your household printing and computer technology with unparalleled service.
         </p>
       </div>
     </div>

     {/* Core Values Strip */}
     <div className="bg-gray-900 text-white py-20 mb-24 relative overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-pink-600/20 mix-blend-overlay"></div>
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
             {[
               { icon: ShieldCheck, title: 'Trusted', sub: 'Guaranteed Service' },
               { icon: Settings, title: 'Precision', sub: 'Advanced Calibration' },
               { icon: Zap, title: 'Performance', sub: 'Optimized Output' },
               { icon: Star, title: 'Excellence', sub: 'Premium Standards' }
             ].map((val, i) => (
               <div key={i} className="flex flex-col items-center fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <val.icon className="w-12 h-12 text-orange-500 mb-4" />
                  <h4 className="font-bold text-xl mb-1">{val.title}</h4>
                  <p className="text-gray-400 text-sm">{val.sub}</p>
               </div>
             ))}
          </div>
       </div>
     </div>

     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
       {/* Milestones Vertical Timeline */}
       <div className="mb-32">
          <h3 className="text-4xl font-black text-center text-gray-900 mb-16 fade-in-up">Our Journey</h3>
          <div className="relative max-w-4xl mx-auto pb-8">
             {/* Central line for desktop, left line for mobile */}
             <div className="absolute left-[40px] md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-100"></div>
             
             {[
               { year: '1997', title: 'The Foundation', desc: 'Opened our first local repair shop for printers and cartridges.' },
               { year: '2000', title: 'Enterprise Expansion', desc: 'We opened our showroom to give the best sale and service for all sorts of household and commercial printers.' },
               { year: '2013', title: 'Network Expansion', desc: 'Surpassed around 20000+ clients from all over odisha.' },
               { year: '2021', title: 'Full Tech Solution', desc: 'Expanded Services for Laptop & Desktop.' },
               { year: 'Today', title: 'Industry Leaders', desc: 'Recognized as the best service provider for all sorts of Printers and Tech hardware.' }
             ].map((milestone, idx) => (
               <div key={idx} className={`mb-16 relative flex w-full ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} fade-in-up`} style={{ animationDelay: `${idx * 150}ms` }}>
                  {/* Timeline Dot */}
                  <div className="absolute left-[40px] md:left-1/2 transform -translate-x-1/2 top-0 w-8 h-8 bg-white border-4 border-orange-500 rounded-full z-10 mt-1"></div>
                  
                  {/* Content Box */}
                  <div className={`w-full pl-24 md:pl-0 md:w-5/12 ${idx % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <span className="text-orange-500 font-black text-2xl mb-2 block">{milestone.year}</span>
                    <h4 className="text-2xl font-bold text-gray-900 mb-3">{milestone.title}</h4>
                    <p className="text-gray-600 font-light text-lg">{milestone.desc}</p>
                  </div>
               </div>
             ))}
          </div>
       </div>

       {/* Our Facilities & Capabilities */}
       <div>
          <h3 className="text-4xl font-black text-center text-gray-900 mb-16 fade-in-up">Our Facilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
             {[
               { title: 'Diagnostic Laboratory', subtitle: 'ADVANCED TESTING', icon: Cpu, color: 'text-cyan-500', bg: 'bg-cyan-50', desc: 'Equipped with the latest diagnostic tools to isolate and identify hardware faults with absolute precision.' },
               { title: 'Parts Inventory', subtitle: 'GENUINE OEM STOCK', icon: Package, color: 'text-pink-500', bg: 'bg-pink-50', desc: 'A massive on-site warehouse of authentic replacement parts to ensure zero-delay turnaround times.' },
               { title: 'Support Center', subtitle: 'DEDICATED ASSISTANCE', icon: MessageCircle, color: 'text-yellow-500', bg: 'bg-yellow-50', desc: 'A comfortable, fully-staffed front desk ready to process your devices and provide transparent updates.' }
             ].map((facility, idx) => (
               <div key={idx} className="bg-white border border-gray-100 rounded-[2rem] p-8 text-center shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                  <div className={`w-24 h-24 mx-auto ${facility.bg} rounded-full mb-6 flex items-center justify-center shadow-sm`}>
                    <facility.icon className={`w-12 h-12 ${facility.color}`} />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">{facility.title}</h4>
                  <p className="text-orange-500 font-medium text-sm uppercase tracking-widest mb-4">{facility.subtitle}</p>
                  <p className="text-gray-500 font-light text-sm leading-relaxed">{facility.desc}</p>
               </div>
             ))}
          </div>
       </div>
     </div>
  </div>
);

export default function Page({ params }) {
  const router = useRouter();
  const navigateTo = (page, item) => {
      if(page === 'HOME') router.push('/');
      if(page === 'PRODUCTS') router.push('/products');
      if(page === 'SERVICES') router.push('/services');
      if(page === 'ABOUT') router.push('/about');
      if(page === 'CONTACT') router.push('/contact');
      if(page === 'PRODUCT_DETAIL') router.push(`/products/${item.id}`);
      if(page === 'SERVICE_DETAIL') router.push(`/services/${item.id}`);
  };

  return <AboutPage navigateTo={navigateTo} />;
}
