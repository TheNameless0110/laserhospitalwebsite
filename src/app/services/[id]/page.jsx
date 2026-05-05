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



const ServiceDetailPage = ({ serviceId, navigateTo }) => {
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    if (!serviceId) return;
    const fetchService = async () => {
      const { data, error } = await supabase.from('services').select('*').eq('id', serviceId).single();
      if (!error && data) {
        let IconComp = Wrench;
        if (data.id.includes('repair')) IconComp = Printer;
        if (data.id.includes('ink')) IconComp = Droplet;
        if (data.id.includes('maintenance')) IconComp = Settings;
        // The column in DB for overview is detailed_overview
        setSelectedService({ ...data, detailedOverview: data.detailed_overview, icon: IconComp });
      }
    };
    fetchService();
  }, [serviceId]);
  if (!selectedService) return <div className="pt-32 pb-32 text-center text-xl font-bold bg-white min-h-screen">Loading service details...</div>;
  return (
    <div className="pt-32 pb-24 animate-in fade-in bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigateTo('SERVICES')} className="text-gray-500 hover:text-orange-500 flex items-center mb-10 font-bold tracking-wide uppercase text-sm transition-colors">
           <ChevronRight className="w-5 h-5 mr-1 rotate-180" /> Back to All Services
        </button>
        
        <div className="bg-white rounded-[2.5rem] p-12 shadow-xl shadow-gray-200/50 border border-gray-100">
          <div className={`w-28 h-28 rounded-3xl ${selectedService.bg} flex items-center justify-center mb-10 shadow-sm`}>
             <selectedService.icon className={`w-14 h-14 ${selectedService.color}`} />
          </div>
          
          <h1 className="text-5xl font-black text-gray-900 mb-8">{selectedService.title}</h1>
          
          <div className="prose prose-lg text-gray-600 mb-16 max-w-none">
            <p className="lead text-2xl text-gray-800 mb-8 font-light leading-relaxed">{selectedService.desc}</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Service Overview</h3>
            <p className="font-light leading-relaxed mb-6">{selectedService.detailedOverview}</p>
            <ul className="space-y-4 mt-8 text-gray-800 font-medium bg-gray-50 p-8 rounded-3xl border border-gray-100">
               {selectedService.bullets.map((bullet, idx) => (
                 <li key={idx} className="flex items-center">
                   <CheckCircle className="w-6 h-6 text-green-500 mr-4 shrink-0" />
                   {bullet}
                 </li>
               ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-[2rem] p-10 border border-orange-100 flex flex-col md:flex-row items-center justify-between shadow-inner">
             <div className="md:w-2/3 pr-8 mb-8 md:mb-0">
               <h4 className="text-2xl font-black text-gray-900 mb-3">Ready for expert service?</h4>
               <p className="text-gray-700 text-lg font-light">Contact us first to inquire about your specific needs, then visit our store for repairs or to explore and purchase new products.</p>
             </div>
             <button onClick={() => navigateTo('CONTACT')} className="w-full md:w-auto bg-orange-500 text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-orange-600 hover:scale-105 active:scale-95 whitespace-nowrap transition-all duration-300">
               Contact Us
             </button>
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

  
  const id = params.id;
  return <ServiceDetailPage serviceId={id} navigateTo={navigateTo} />;

}
