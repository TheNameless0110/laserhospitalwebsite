'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Menu, X, Search, ChevronRight, ChevronLeft, User, ShoppingCart,
  Play, Monitor, Printer, Droplet, Cpu, Disc, Package,
  Phone, Mail, MapPin, CheckCircle, Star, Filter, ArrowRight,
  Settings, Wrench, Clock, ShieldCheck, List, Grid, Tag, 
  HelpCircle, Download, BookOpen, MessageCircle, FileText, 
  ChevronDown, Leaf, Zap, Award, Users, Calendar, ArrowUpRight,
  Instagram, Facebook, AlertCircle, Loader2, PenTool,
  Mouse, Keyboard, HardDrive, Link, Wifi
} from 'lucide-react';
import { servicesList, productImages, serviceImages, aboutImages, contactImages, homeImages } from '@/lib/dummyData';
import { supabase } from '@/lib/supabaseClient';
import { HeroBackgroundSlider, CountUp } from '@/components/layout/SharedComponents';



const ProductDetailPage = ({ productId, navigateTo }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('Details');
  const [activeImage, setActiveImage] = useState(0);
  const [validImages, setValidImages] = useState([]);

  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      const { data, error } = await supabase.from('products').select('*').eq('id', productId).single();
      if (!error && data) {
        let IconComp = Printer;
        if (data.type === 'INK') IconComp = Droplet;
        if (data.type === 'MAINTENANCE') IconComp = Wrench;
        if (data.type === 'PRINT HEAD') IconComp = Settings;
        if (data.type === 'PERIPHERALS') IconComp = Mouse;
        if (data.type === 'ACCESSORIES') IconComp = Link;
        setSelectedProduct({ ...data, badgeColor: data.badge_color, imageIcon: IconComp });

        // Use images from database if available, otherwise fallback to guessing
        let paths = data.images || [];
        if (paths.length === 0) {
          const suffixes = ['(1st)', '(2nd)'];
          paths = suffixes.map(s => `/${data.name} ${s}.jpg`);
        }
        setValidImages(paths);
        setActiveImage(0);
      }
    };
    fetchProduct();
  }, [productId]);
  if (!selectedProduct) return <div className="pt-32 pb-32 text-center text-xl font-bold bg-white min-h-screen">Loading product details...</div>;


  return (
    <div className="pt-24 pb-24 animate-in fade-in bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm font-medium text-gray-500 mb-10">
          <button onClick={() => navigateTo('PRODUCTS')} className="hover:text-orange-500">Products Catalog</button>
          <ChevronRight className="w-4 h-4 mx-3 text-gray-300" />
          <span className="hover:text-orange-500 cursor-pointer">{selectedProduct.type}</span>
          <ChevronRight className="w-4 h-4 mx-3 text-gray-300" />
          <span className="text-gray-900 font-bold">{selectedProduct.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 mb-20">
          {/* Image Gallery */}
          <div className="lg:w-1/2">
            <div className="bg-gray-50 rounded-3xl aspect-square flex items-center justify-center border border-gray-100 mb-6 p-2 relative group hover:border-orange-500 transition-colors duration-300 overflow-hidden">
              {selectedProduct.badge && (
                <div className={`absolute top-6 left-6 z-10 ${selectedProduct.badgeColor} text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md`}>
                   {selectedProduct.badge}
                </div>
              )}
              {validImages.length > 0 ? (
                <>
                  <img
                    src={validImages[activeImage]}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling && (e.target.nextSibling.style.display = 'flex'); }}
                  />
                  {validImages.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveImage(prev => prev === 0 ? validImages.length - 1 : prev - 1); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition-colors z-20 opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveImage(prev => (prev + 1) % validImages.length); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition-colors z-20 opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-700" />
                      </button>
                    </>
                  )}
                </>
              ) : null}
              <selectedProduct.imageIcon
                className={`w-full h-full p-14 text-gray-300 group-hover:scale-105 transition-transform duration-500 ${validImages.length > 0 ? 'hidden' : ''}`}
                strokeWidth={1}
                style={validImages.length > 0 ? { display: 'none' } : {}}
              />
            </div>
            <div className="flex gap-4 mb-4">
              {validImages.map((imgPath, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`bg-gray-50 rounded-2xl aspect-square w-1/4 border-2 cursor-pointer flex items-center justify-center p-2 transition-all overflow-hidden ${activeImage === i ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200 hover:border-orange-300'}`}
                >
                  <img
                    src={imgPath}
                    alt={`${selectedProduct.name} view ${i + 1}`}
                    className="w-full h-full object-contain rounded-xl transition-opacity"
                    onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                  />
                </div>
              ))}
              {/* Fill remaining slots with icon placeholders if less than 2 valid images */}
              {validImages.length < 2 && Array.from({ length: 2 - validImages.length }).map((_, i) => (
                <div key={`placeholder-${i}`} className="bg-gray-50 rounded-2xl aspect-square w-1/4 border border-gray-200 flex items-center justify-center p-2">
                  <selectedProduct.imageIcon className="w-full h-full p-4 text-gray-300" strokeWidth={1} />
                </div>
              ))}
            </div>
            {/* Product Image Disclaimer */}
            <p className="text-xs text-gray-400 leading-relaxed mt-2">
              <span className="font-semibold text-gray-500">Disclaimer:</span> All product images displayed on this website are for reference and illustrative purposes only and remain the intellectual property of their respective manufacturers. Laser Hospital does not claim ownership of any brand trademarks, logos, or product visuals shown. Some images may be digitally enhanced or AI-generated for presentation purposes; the actual product design, colour, dimensions, and packaging may differ from what is depicted. Laser Hospital is an authorized reseller and service provider — no commercial misrepresentation is intended.
            </p>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="inline-block bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-bold w-max mb-6 tracking-widest uppercase">
              {selectedProduct.brand}
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">{selectedProduct.name}</h1>
            <div className="flex items-center mb-8">
              <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-lg border border-green-200">✓ In Stock</span>
            </div>
            <p className="text-gray-600 text-xl leading-relaxed mb-10 font-light">
              {selectedProduct.description}
            </p>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => navigateTo('CONTACT')}
                className="flex-1 bg-orange-500 text-white py-5 rounded-2xl font-bold text-xl hover:bg-orange-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-orange-500/30 flex justify-center items-center"
              >
                <Mail className="w-6 h-6 mr-3"/> Contact Us
              </button>
              <button className="p-5 rounded-2xl border-2 border-gray-200 text-gray-400 hover:border-pink-500 hover:text-pink-500 hover:bg-pink-50 active:scale-95 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-t border-gray-200 pt-12">
          <div className="flex space-x-12 mb-10 border-b border-gray-200 overflow-x-auto hide-scrollbar">
            {['Details', 'Specification', 'Features', 'Services'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-xl font-bold whitespace-nowrap transition-colors relative ${
                  activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 rounded-t-full"></span>
                )}
              </button>
            ))}
          </div>
          
          <div className="min-h-[300px] text-gray-700 text-lg leading-relaxed font-light">
            {activeTab === 'Details' && (
              <div className="space-y-6">
                <p>{selectedProduct.description}</p>
                <p>{selectedProduct.details}</p>
              </div>
            )}
            {activeTab === 'Specification' && (
              <ul className="space-y-6 max-w-3xl">
                {selectedProduct.specifications.map((spec, i) => (
                  <li key={i} className="flex border-b border-gray-100 pb-4">
                    <span className="w-1/3 font-bold text-gray-900">{spec.label}</span>
                    <span>{spec.value}</span>
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 'Features' && (
              <ul className="list-none space-y-4 max-w-2xl">
                {selectedProduct.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 shrink-0"/> 
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 'Services' && <p>Fully compatible with Laser Hospital's expert repair and support services. Get priority same-day repair and lifetime support. <button onClick={()=>navigateTo('SERVICES')} className="text-orange-500 font-bold hover:underline ml-2">View Service Options</button></p>}
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

  
  // Since we don't have access to unwrapped params directly in React 18 / Next 14 synchronously without warnings in some versions,
  // we can use React.use() or just assume it's passed as a prop for this extraction.
  const id = params.id;
  return <ProductDetailPage productId={id} navigateTo={navigateTo} />;

}
