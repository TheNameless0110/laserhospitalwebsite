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
import Toast from '@/components/ui/Toast';


const ContactPage = ({ setToast }) => {
  // Form Validation State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', type: 'General Inquiry', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);

  const googleMapsUrl = 'https://maps.app.goo.gl/h17Yak221WC9qx3GA';

  const driverLinks = [
    { name: 'CANON', url: 'https://in.canon/en/support/download' },
    { name: 'EPSON', url: 'https://epson.co.in/Support/sl/s' },
    { name: 'HP', url: 'https://support.hp.com/in-en/drivers' },
    { name: 'KYOCERA', url: 'https://www.kyoceradocumentsolutions.com/in/en/support/downloads.html' },
    { name: 'KONICA MINOLTA', url: 'https://www.konicaminolta.in/en-in/support-and-downloads' },
    { name: 'DELL', url: 'https://www.dell.com/support/home/en-in?app=drivers' },
    { name: 'ASUS', url: 'https://www.asus.com/in/support/Download-Center/' },
    { name: 'XEROX', url: 'https://www.support.xerox.com/en-in' }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.message.trim()) newErrors.message = 'Please provide a message';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const { error } = await supabase.from('inquiries').insert([{
          name: formData.name,
          email: formData.email,
          subject: formData.type,
          message: formData.message,
          phone: formData.phone || ''
        }]);
        if (error) throw error;
        setFormData({ name: '', email: '', type: 'General Inquiry', message: '' });
        setToast('Inquiry submitted successfully! We will contact you shortly.', 'success');
      } catch (err) {
        console.error('Error submitting inquiry:', err);
        setToast('Failed to submit inquiry. Please try again.', 'error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="pt-24 pb-24 animate-in fade-in bg-gray-50">
      {/* Support Hero */}
      <div className="bg-gray-900 py-24 mb-20 mt-[-2rem] relative overflow-hidden">
        <HeroBackgroundSlider 
          images={contactImages} 
          overlayClass="bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent" 
        />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight fade-in-up">Contact Us</h1>
          <p className="text-orange-100 max-w-3xl mx-auto text-xl font-medium fade-in-up" style={{ animationDelay: '100ms' }}>Reach out to our dedicated support team to inquire about services or products before visiting our store.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto gap-6 mb-20 fade-in-up">
          {[
            { title: 'Download Drivers', icon: Download, action: () => setIsDriverModalOpen(true) },
            { title: 'Store Directions & Working Hours', icon: MapPin, action: () => window.open(googleMapsUrl, '_blank') }
          ].map((link, i) => (
            <div key={i} onClick={link.action} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-orange-500 cursor-pointer group transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-50 transition-colors">
                 <link.icon className="w-6 h-6 text-gray-500 group-hover:text-orange-500" />
              </div>
              <h4 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{link.title}</h4>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20 items-start">
          {/* Contact Info (Fixed Alignment: Adding pt-14 pushes this down so it perfectly aligns with the inner header of the form box on desktop) */}
          <div className="lg:w-1/3 space-y-8 lg:pt-14">
            <h3 className="text-3xl font-black text-gray-900 mb-8">Get in Touch</h3>
            {[
              { title: 'Call Desk', detail: '+91 9437066882', detail2: '+91 7735524468', sub: 'Mon-Sat, 9:30am - 9pm', icon: Phone },
              { title: 'Email Support', detail: 'laserhospitalsupport@gmail.com', detail2: 'laser.hospital@gmail.com', sub: '', icon: Mail },

            ].map((info, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-md shadow-gray-200/50 border border-gray-100 flex items-start fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 mr-6">
                  <info.icon className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-xl mb-1">{info.title}</h4>
                  <p className="text-gray-800 font-medium text-lg break-all">{info.detail}</p>
                  {info.detail2 && <p className="text-gray-800 font-medium text-lg break-all">{info.detail2}</p>}
                  {info.sub && <p className="text-gray-500 text-sm mt-1">{info.sub}</p>}
                </div>
              </div>
            ))}

            {/* Visual Map Card */}
            <div 
              id="map-section" 
              onClick={() => window.open(googleMapsUrl, '_blank')}
              className="bg-gray-900 p-8 rounded-[2rem] shadow-xl border border-gray-800 overflow-hidden relative fade-in-up scroll-mt-24 cursor-pointer hover:shadow-2xl hover:border-gray-700 hover:-translate-y-1 transition-all duration-300 group" 
              style={{ animationDelay: '300ms' }}
            >
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900 via-gray-900 to-gray-900 group-hover:opacity-30 transition-opacity">
                {/* Abstract CSS Map Pattern */}
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                  <MapPin className="w-7 h-7" />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-white text-xl">Headquarters (Drop-off)</h4>
                  <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition-colors" />
                </div>
                <p className="text-gray-300 font-medium text-lg">First Floor, PLOT NO-270, near Apollo Pharmacy,<br/>E-Block, Saheed Nagar, Bhubaneswar, Odisha 751007</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3 bg-white p-10 md:p-14 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 fade-in-up" style={{ animationDelay: '200ms' }}>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Send an Inquiry</h2>
            <p className="text-gray-500 text-lg mb-10">Fill out the form below to inquire about our services or products before your visit.</p>
            <form className="space-y-8" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full px-5 py-4 rounded-xl bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-lg`} 
                    placeholder="Rajesh Kumar" 
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-2 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/> {errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-5 py-4 rounded-xl bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-lg`} 
                    placeholder="rajesh.kumar@outlook.in" 
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-2 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/> {errors.email}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={`w-full px-5 py-4 rounded-xl bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-lg`} 
                    placeholder="+91 97423 XXXXX" 
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-2 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/> {errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Inquiry Type</label>
                  <div className="relative">
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-lg appearance-none cursor-pointer"
                    >
                      <option>General Inquiry</option>
                      <option>Hardware Repair Inquiry</option>
                      <option>Sales & Enterprise Pricing</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-6 h-6"/>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Message</label>
                <textarea 
                  rows="6" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={`w-full px-5 py-4 rounded-xl bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-lg resize-none`} 
                  placeholder="Please describe your issue or device model..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-2 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/> {errors.message}</p>}
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 text-white font-bold text-xl py-5 rounded-2xl hover:bg-gray-800 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 transition-all duration-300 shadow-xl flex items-center justify-center group"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-6 h-6 mr-3 animate-spin" /> Submitting Request...</>
                ) : (
                  <>Send Inquiry <ArrowUpRight className="ml-2 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>

      {isDriverModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-3xl flex flex-col shadow-2xl overflow-hidden relative">
            
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
               <div className="relative z-10 flex items-center">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mr-5 shadow-sm border border-gray-200 text-orange-500">
                     <Download className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 leading-tight">Driver Downloads</h3>
                    <p className="text-gray-500 font-medium">Select your manufacturer</p>
                  </div>
               </div>
               <button 
                  onClick={() => setIsDriverModalOpen(false)} 
                  className="p-3 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-200 transition-colors relative z-10"
                >
                  <X className="w-7 h-7" />
               </button>
            </div>
            
            <div className="p-10">
               <p className="text-gray-600 mb-8 text-lg font-light">
                  Clicking a brand below will redirect you to their official Indian support website to download the latest authenticated drivers and software for your devices.
               </p>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {driverLinks.map((brand, idx) => (
                     <a 
                       key={brand.name} 
                       href={brand.url} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="bg-white border-2 border-gray-100 hover:border-orange-500 hover:bg-orange-50 text-gray-800 font-black tracking-widest text-sm uppercase py-6 px-4 rounded-[1.5rem] flex items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-gray-200/50"
                       style={{ animationDelay: `${idx * 50}ms` }}
                     >
                        {brand.name}
                     </a>
                  ))}
               </div>
            </div>
          </div>
        </div>
      )}
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

  const [toast, setToast] = useState(null);
  const [toastType, setToastType] = useState('success');
  
  const handleSetToast = (msg, type = 'success') => {
    setToast(msg);
    setToastType(type);
  };

  return (
    <>
      <Toast message={toast} type={toastType} onClose={() => setToast(null)} />
      <ContactPage setToast={handleSetToast} />
    </>
  );
}
