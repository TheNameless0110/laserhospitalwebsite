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
import { productImages, serviceImages, aboutImages, contactImages, homeImages } from '@/lib/dummyData';
import { supabase } from '@/lib/supabaseClient';
import { HeroBackgroundSlider, CountUp } from '@/components/layout/SharedComponents';



const ServicesPage = ({ navigateTo }) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from('services').select('*');
      if (!error && data) {
        const mappedData = data.map(s => {
          let IconComp = Wrench;
          if (s.id.includes('repair')) IconComp = Printer;
          if (s.id.includes('ink')) IconComp = Droplet;
          if (s.id.includes('maintenance')) IconComp = Settings;
          return { ...s, icon: IconComp };
        });
        setServices(mappedData);
      }
      setIsLoading(false);
    };
    fetchServices();
  }, []);
  return (
    <div className="pt-24 pb-24 animate-in fade-in bg-white">
      {/* Service Hero */}
      <div className="bg-gray-900 py-24 mb-20 mt-[-2rem] relative overflow-hidden">
        <HeroBackgroundSlider 
          images={serviceImages} 
          overlayClass="bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent" 
        />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight fade-in-up">Professional Repair Services</h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-xl font-light leading-relaxed fade-in-up" style={{ animationDelay: '100ms' }}>Drop off your malfunctioning hardware. We diagnose, we fix, you pick it up working flawlessly. It's that simple.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
          {services.map((service, idx) => (
            <div 
              key={service.id}
              onClick={() => navigateTo('SERVICE_DETAIL', service)}
              className="relative group cursor-pointer fade-in-up"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 transform transition-transform duration-500 group-hover:-translate-y-3 group-hover:shadow-2xl"></div>
              <div className="relative p-12 flex flex-col h-full border border-gray-100 rounded-[2.5rem] overflow-hidden">
                <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full ${service.bg} opacity-50 group-hover:scale-150 transition-transform duration-700`}></div>
                
                <div className={`w-24 h-24 rounded-3xl ${service.bg} flex items-center justify-center mb-8 relative z-10 shadow-sm`}>
                  <service.icon className={`w-12 h-12 ${service.color}`} />
                </div>
                
                <h3 className="text-3xl font-black text-gray-900 mb-6 relative z-10">{service.title}</h3>
                <p className="text-gray-600 mb-10 flex-1 relative z-10 text-lg leading-relaxed font-light">{service.desc}</p>
                
                <div className="flex items-center text-orange-500 font-bold relative z-10 group-hover:text-orange-600 text-lg">
                  Explore Details <ArrowRight className="w-6 h-6 ml-3 transform group-hover:translate-x-3 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works Timeline (In-Store Drop-off focus) */}
        <div className="mb-10 fade-in-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">How Our Service Works</h2>
            <p className="text-gray-500 text-lg">Three simple steps to get your hardware running like new.</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start relative max-w-5xl mx-auto">
             {/* Connecting Line (Fixed Alignment: Precisely centered behind the 80px h-20 icons) */}
             <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-1 bg-gray-100 -z-10 transform -translate-y-1/2"></div>
             
             {[
               { step: 1, title: 'Inquire', desc: 'Call or email us with your needs.', icon: Phone },
               { step: 2, title: 'Visit Store', desc: 'Bring your device or explore products.', icon: MapPin },
               { step: 3, title: 'Expert Service', desc: 'We diagnose, repair, or consult.', icon: Wrench }
             ].map((item, i) => (
               <div key={i} className="flex flex-col items-center text-center mb-12 md:mb-0 w-full md:w-1/3 px-4 bg-white relative z-10">
                  <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center text-white mb-6 border-8 border-white shadow-md relative">
                     <item.icon className="w-8 h-8" />
                     <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">{item.step}</div>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h4>
                  <p className="text-gray-600 font-light">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};

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

  return <ServicesPage navigateTo={navigateTo} />;
}
