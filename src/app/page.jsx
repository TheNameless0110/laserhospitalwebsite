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



const HomePage = ({ navigateTo }) => (
  <div className="animate-in fade-in duration-500">
    {/* Hero Section */}
    <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-slate-950">
        <HeroBackgroundSlider 
          images={homeImages} 
          overlayClass="bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40" 
        />
        {/* Premium Glassmorphism Glowing Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-orange-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
        
        {/* Floating Outline Images */}
        <Printer className="absolute top-24 right-[15%] w-48 h-48 text-white/10 floating-slow" strokeWidth={1} />
        <PenTool className="absolute bottom-32 right-[30%] w-32 h-32 text-white/5 floating-medium" strokeWidth={1} />
        
        {/* Curved Bottom SVG */}
        <svg className="absolute bottom-0 w-full h-24 text-gray-50 drop-shadow-sm" preserveAspectRatio="none" viewBox="0 0 1440 74" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 24C320 100 800 -40 1440 24V74H0V24Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl text-white text-center mb-16 lg:mb-0 px-2 sm:px-0">
            <p className="text-orange-500 font-bold tracking-[0.2em] uppercase mb-4 text-sm sm:text-base drop-shadow-sm fade-in-up">
              Welcome to Laser Hospital
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-8 drop-shadow-2xl leading-[1.1] fade-in-up text-white">
              Expert Printer Repairs & Premium Supplies
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed fade-in-up" style={{ animationDelay: '150ms' }}>
              We provide enterprise-grade printing solutions, genuine parts, and expert diagnostics to maximize your business efficiency.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 fade-in-up w-full px-4 sm:px-0" style={{ animationDelay: '300ms' }}>
              <button 
                onClick={() => navigateTo('PRODUCTS')}
                className="w-full sm:w-auto min-h-[56px] bg-[#E65100] text-white px-10 py-4 rounded-full font-bold text-lg shadow-[0_0_40px_rgba(230,81,0,0.4)] hover:shadow-[0_0_60px_rgba(230,81,0,0.6)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-400/50"
              >
                Explore Products
              </button>
              <button 
                onClick={() => navigateTo('SERVICES')}
                className="w-full sm:w-auto min-h-[56px] bg-white/5 text-white backdrop-blur-md border border-white/10 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
              >
                View Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Subtle Background Tech Elements */}
      <Printer className="absolute top-10 left-[-5%] w-64 h-64 text-gray-200/50 floating-slow pointer-events-none" strokeWidth={0.5} />
      <Settings className="absolute bottom-20 right-[-5%] w-48 h-48 text-gray-200/50 animate-[spin_30s_linear_infinite] pointer-events-none" strokeWidth={0.5} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4">Enterprise Print Solutions</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#E65100] via-orange-400 to-yellow-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'In-Store Availability', desc: 'Walk in anytime to browse and pick up fully stocked toners, ink cartridges, and essential printing supplies.', icon: Package },
            { title: 'Expert Physical Repair', desc: 'Bring your malfunctioning devices to our technicians for hands-on diagnostics and complete mechanical restoration.', icon: Wrench },
            { title: 'Genuine OEM Parts', desc: 'We exclusively source and install certified manufacturer components to maximize your hardware durability and performance.', icon: Award },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col items-center text-center group fade-in-up" style={{ animationDelay: `${(idx + 1) * 150}ms` }}>
              <div className="w-20 h-20 rounded-2xl bg-orange-50 flex items-center justify-center mb-8 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Workflow Automation Section */}
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Tech Elements */}
      <Cpu className="absolute top-1/4 right-[-5%] w-72 h-72 text-gray-100 floating-medium pointer-events-none" strokeWidth={0.5} />
      <PenTool className="absolute bottom-10 left-[40%] w-32 h-32 text-gray-100 floating-slow pointer-events-none" strokeWidth={1} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image/Mockup Side */}
          <div className="lg:w-1/2 relative fade-in-up">
             <div className="absolute inset-0 bg-gradient-to-tr from-cyan-100 to-pink-50 transform rotate-3 rounded-3xl -z-10 scale-105"></div>
             <div className="bg-white rounded-t-xl rounded-b-md shadow-2xl border-4 border-gray-800 overflow-hidden w-full aspect-[16/10] flex flex-col relative">
                <div className="h-6 bg-gray-800 w-full flex items-center px-2 space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 bg-gray-50 p-6 flex flex-col justify-center items-center relative">
                   <div className="w-3/4 h-3/4 bg-white shadow-sm border border-gray-200 rounded-lg p-4 flex flex-col gap-4">
                      <div className="h-8 bg-gray-100 rounded w-1/3"></div>
                      <div className="flex gap-4 flex-1">
                        <div className="w-1/3 bg-orange-50 rounded-lg border border-orange-100 flex items-center justify-center relative overflow-hidden">
                           <div className="absolute bottom-0 w-full bg-orange-400" style={{height: '60%'}}></div>
                           <span className="relative z-10 font-bold text-gray-800">Stats</span>
                        </div>
                        <div className="w-2/3 bg-gray-100 rounded-lg flex flex-col justify-between p-2">
                           <div className="h-2 bg-gray-300 rounded w-full mb-2"></div>
                           <div className="h-2 bg-gray-300 rounded w-5/6 mb-2"></div>
                           <div className="h-2 bg-gray-300 rounded w-4/6"></div>
                        </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Text Side */}
          <div className="lg:w-1/2 lg:pl-10">
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-8 leading-tight fade-in-up">In-Store Expert Diagnostics</h2>
            <p className="text-gray-600 text-xl mb-10 leading-loose font-light fade-in-up" style={{ animationDelay: '150ms' }}>
              Laser Hospital allows businesses to manage their printing infrastructure seamlessly. Bring your devices to our specialized service center for immediate, hands-on diagnostics and rapid turnaround times.
            </p>
            <ul className="space-y-6 mb-10">
              {['Rapid In-Store Turnaround', 'Expert Hands-On Diagnostics', 'Premium Walk-in Consultation'].map((item, idx) => (
                <li key={idx} className="flex items-center text-gray-800 font-semibold text-lg fade-in-up" style={{ animationDelay: `${(idx + 2) * 150}ms` }}>
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-5 shadow-sm">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => navigateTo('ABOUT')}
              className="bg-transparent border-2 border-orange-500 text-orange-600 px-10 py-4 rounded-full font-bold hover:bg-orange-50 hover:scale-105 active:scale-95 transition-all duration-300 fade-in-up focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/50" style={{ animationDelay: '600ms' }}
            >
              Learn About Us
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Trusted Brands Strip */}
    <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
         <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest">Trusted by industry leaders</p>
      </div>
      
      {/* Infinite Scrolling Marquee */}
      <div className="relative w-full flex opacity-50 grayscale hover:grayscale-0 transition-all duration-500 group">
         <div className="flex w-max animate-scroll group-hover:[animation-play-state:paused] items-center">
            {/* Array is doubled to create a seamless infinite loop */}
            {[...['CANON', 'EPSON', 'HP', 'KYOCERA', 'KONICA MINOLTA', 'DELL', 'ASUS', 'XEROX'], ...['CANON', 'EPSON', 'HP', 'KYOCERA', 'KONICA MINOLTA', 'DELL', 'ASUS', 'XEROX']].map((brand, i) => (
              <div key={i} className="text-3xl font-black text-gray-800 tracking-tighter text-center mx-12 md:mx-20 shrink-0 whitespace-nowrap">
                {brand}
              </div>
            ))}
         </div>
      </div>
    </section>

    {/* Impact Stats */}
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900 via-gray-900 to-pink-900 opacity-40"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-700">
          {[
            { label: 'Years Experience', value: 28, suffix: '+' },
            { label: 'Clients Served', value: 25000, suffix: '+' },
            { label: 'Corporate Clients', value: 500, suffix: '+' }
          ].map((stat, i) => (
            <div key={i} className="pt-8 md:pt-0 fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
              <div className="font-display text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-orange-400 font-bold uppercase tracking-widest text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Subtle Background Tech Elements */}
      <Wifi className="absolute top-[20%] left-[-5%] w-80 h-80 text-gray-200/40 floating-slow pointer-events-none" strokeWidth={0.5} />
      <Link className="absolute bottom-[-10%] right-[-5%] w-64 h-64 text-gray-200/40 floating-medium pointer-events-none" strokeWidth={0.5} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 fade-in-up">
          <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-6">What Our Clients Say</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#E65100] to-yellow-400 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { name: 'Ashutosh', role: 'Local Guide', text: 'Good printer available in good price range.', rating: 5 },
            { name: 'Vinod Kumar', role: 'Local guide', text: 'A complete solution provider to printing service.', rating: 5 },
            { name: 'Diptiranjan Nayak', role: 'Local Guide', text: 'Good place, little bit hard to find. All types of printers sales and service center.', rating: 4 }
          ].map((review, idx) => (
            <div key={idx} className="bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 fade-in-up relative" style={{ animationDelay: `${idx * 150}ms` }}>
              <div className="absolute top-0 right-10 transform -translate-y-1/2 text-6xl text-orange-200 font-serif">&quot;</div>
              <div className="flex mb-8">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className={`w-5 h-5 ${i <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <p className="text-gray-700 text-lg mb-10 leading-relaxed italic">&quot;{review.text}&quot;</p>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center text-orange-600 font-bold text-2xl mr-4 shadow-inner">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-24 bg-gradient-to-r from-orange-500 to-amber-500 text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="max-w-4xl mx-auto relative z-10 fade-in-up">
        <h2 className="font-display text-5xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight drop-shadow-lg">Ready to optimize your tech infrastructure?</h2>
        <p className="text-2xl text-orange-50 mb-12 font-medium">Contact our team today for an easy workflow assessment.</p>
        <button 
          onClick={() => navigateTo('CONTACT')}
          className="bg-gray-900 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl inline-flex items-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-400/50"
        >
          Contact Us <ArrowRight className="ml-3 w-6 h-6" />
        </button>
      </div>
    </section>
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

  return <HomePage navigateTo={navigateTo} />;
}
