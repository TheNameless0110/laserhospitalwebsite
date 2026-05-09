'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { servicesList, productImages, serviceImages, aboutImages, contactImages, homeImages } from '@/lib/dummyData';
import { supabase } from '@/lib/supabaseClient';
import { HeroBackgroundSlider, CountUp } from '@/components/layout/SharedComponents';



const ProductsPage = ({ navigateTo, searchQuery, setSearchQuery, activeCat, setActiveCat, viewMode, setViewMode, selectedBrands, setSelectedBrands, maxPrice, setMaxPrice }) => {
  const categories = ['ALL PRODUCTS', 'INKJET', 'LASER', 'INK', 'MAINTENANCE', 'PRINT HEAD', 'PERIPHERALS', 'ACCESSORIES'];

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data) {
        // Map database fields back to component props and assign icons
        const mappedData = data.map(p => {
          let IconComponent = Printer;
          if (p.type === 'INK') IconComponent = Droplet;
          if (p.type === 'MAINTENANCE') IconComponent = Wrench;
          if (p.type === 'PRINT HEAD') IconComponent = Settings;
          if (p.type === 'PERIPHERALS') IconComponent = Mouse;
          if (p.type === 'ACCESSORIES') IconComponent = Link;
          
          return {
            ...p,
            badgeColor: p.badge_color,
            imageIcon: IconComponent
          };
        });
        setProducts(mappedData);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const featuredProducts = products.length > 0 ? [
    products.find(p => p.id === 'hp_laser_323sdnw') || products[0],
    products.find(p => p.id === 'epson_l8050') || products[1],
    products.find(p => p.id === 'canon_g3770') || products[2],
    products.find(p => p.id === 'antesports_km540') || products[3]
  ].filter(Boolean) : [];

  useEffect(() => {
    if (!isHovered && featuredProducts.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
      }, 4500); // Auto-swipe every 4.5 seconds
      return () => clearInterval(timer);
    }
  }, [isHovered, featuredProducts.length]);

  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEndAction = () => {
    if (!touchStart || !touchEnd || featuredProducts.length === 0) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    if (distance < -minSwipeDistance) setCurrentSlide((prev) => (prev === 0 ? featuredProducts.length - 1 : prev - 1));
  };

  // Toggle Brand Filter
  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Apply Filters and Search
  const filteredProducts = products.filter(p => {
    const matchCat = activeCat === 'ALL PRODUCTS' || p.type === activeCat;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase().trim());
    const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
    const matchPrice = p.price <= maxPrice;
    return matchCat && matchSearch && matchBrand && matchPrice;
  });

  return (
    <div className="pt-24 pb-24 animate-in fade-in bg-gray-50 min-h-screen">

      {/* Products Hero Section */}
      <div className="bg-gray-900 py-24 mb-16 mt-[-2rem] relative overflow-hidden">
        <HeroBackgroundSlider
          images={productImages}
          overlayClass="bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent"
        />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight fade-in-up">Hardware Catalog</h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-xl font-light leading-relaxed fade-in-up" style={{ animationDelay: '100ms' }}>
            Explore our extensive range of enterprise printers, high-yield ink tanks, and genuine accessories designed to optimize your workflow.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Featured Product Carousel Banner */}
        {featuredProducts.length > 0 && (
          <div
            className="bg-gray-900 rounded-3xl mb-12 relative overflow-hidden shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEndAction}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/50 to-pink-900/50 mix-blend-multiply pointer-events-none z-0"></div>

            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredProducts.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 relative z-10">
                  <div className="md:w-2/3 text-white text-center md:text-left mb-8 md:mb-0">
                    <span className={`inline-block ${product.badgeColor || 'bg-orange-500'} text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4`}>
                      {product.badge || 'Featured'}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">{product.name}</h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-xl line-clamp-2 md:line-clamp-3 overflow-hidden text-ellipsis">{product.description}</p>
                    <button onClick={() => navigateTo('PRODUCT_DETAIL', product)} className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 hover:scale-105 transition-all">Shop Now</button>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-48 h-48 object-cover rounded-2xl shadow-2xl ring-4 ring-white/20 opacity-90" />
                    ) : (
                      <product.imageIcon className="w-48 h-48 text-white opacity-80" strokeWidth={1} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {featuredProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-orange-500' : 'w-2.5 bg-gray-500 hover:bg-gray-400'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Header & Sub-nav */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex overflow-x-auto hide-scrollbar space-x-3 w-full md:w-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeCat === cat ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-200 border border-gray-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* View Toggles */}
          <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm shrink-0">
            <button aria-label="Grid view" onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}><Grid className="w-5 h-5" /></button>
            <button aria-label="List view" onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}><List className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filter (Desktop) */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 sticky top-28">
              <div className="flex items-center gap-2 font-bold text-xl text-gray-900 mb-6 pb-4 border-b border-gray-100">
                <Filter className="w-5 h-5 text-orange-500" /> Filters
              </div>

              <div className="mb-8">
                <h4 className="font-bold text-gray-900 mb-4">Brands</h4>
                <div className="space-y-3">
                  {['HP', 'Epson', 'Canon', 'Fingers', 'AntEsports', 'Ranz', 'SmartPro', 'Lapcare', 'AARVEX'].map(brand => (
                    <label key={brand} className="flex items-center space-x-3 text-gray-700 cursor-pointer hover:text-orange-500 transition-colors group">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500 transition-all cursor-pointer"
                      />
                      <span className="group-hover:font-medium">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-4">Price Range (Max: ₹{maxPrice.toLocaleString('en-IN')})</h4>
                <input
                  type="range"
                  min="0" max="30000" step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-orange-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm font-medium text-gray-500 mt-3">
                  <span>₹0</span>
                  <span>₹30,000+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product List/Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 flex flex-col items-center text-center fade-in-up">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6 text-lg">We couldn&apos;t find anything matching your current filters and search query.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedBrands([]); setMaxPrice(30000); setActiveCat('ALL PRODUCTS'); }}
                  className="bg-orange-50 text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-orange-100 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8" : "flex flex-col space-y-6"}>
                {filteredProducts.map((product, idx) => (
                  <div
                    key={product.id}
                    onClick={() => navigateTo('PRODUCT_DETAIL', product)}
                    className={`bg-white rounded-3xl shadow-md shadow-gray-200/50 border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group flex fade-in-up ${viewMode === 'list' ? 'flex-row items-center p-6' : 'flex-col'}`}
                    style={{ animationDelay: `${(idx % 6) * 100}ms` }}
                  >
                    {/* Image Placeholder */}
                    <div className={`${viewMode === 'list' ? 'w-48 h-48 rounded-2xl' : 'h-56'} bg-gray-50 flex items-center justify-center p-6 relative shrink-0 overflow-hidden`}>
                      {product.badge && (
                        <div className={`absolute top-4 left-4 z-10 ${product.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center`}>
                          <Tag className="w-3 h-3 mr-1" /> {product.badge}
                        </div>
                      )}
                      <div className="absolute top-4 right-4 z-10 bg-white px-3 py-1 rounded-lg text-xs font-black text-gray-800 shadow-sm">
                        {product.brand}
                      </div>
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-all duration-500 mix-blend-multiply" />
                      ) : (
                        <product.imageIcon className={`${viewMode === 'list' ? 'w-24 h-24' : 'w-32 h-32'} text-gray-300 group-hover:text-orange-400 group-hover:scale-110 transition-all duration-500`} strokeWidth={1.5} />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`flex-1 flex flex-col justify-between ${viewMode === 'list' ? 'pl-8' : 'p-6'}`}>
                      <div>
                        <div className="text-sm font-bold text-orange-500 mb-2 uppercase tracking-wider">{product.type}</div>
                        <h3 className="font-black text-gray-900 text-xl leading-tight mb-3 line-clamp-2">{product.name}</h3>

                        {viewMode === 'list' && (
                          <ul className="text-gray-500 text-sm mb-4 space-y-1">
                            {product.features.slice(0, 3).map((f, i) => <li key={i}>• {f}</li>)}
                          </ul>
                        )}


                      </div>
                      <div className="flex items-center justify-between mt-auto pt-4">

                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the card's onClick
                            navigateTo('CONTACT');
                          }}
                          className="text-sm font-bold text-orange-500 group-hover:bg-orange-50 px-4 py-2 rounded-lg transition-colors border border-transparent group-hover:border-orange-200"
                        >
                          Inquire
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


function ProductsPageContent() {
  const router = useRouter();
      const searchParams = useSearchParams();
      const q = searchParams ? (searchParams.get('search') || searchParams.get('q')) : null;

      const [searchQuery, setSearchQuery] = useState(q || '');
      const [activeCat, setActiveCat] = useState('ALL PRODUCTS');
      const [viewMode, setViewMode] = useState('grid');
      const [selectedBrands, setSelectedBrands] = useState([]);
      const [maxPrice, setMaxPrice] = useState(30000);

  // Update local state if URL changes
  useEffect(() => {
      if (q !== null) setSearchQuery(q);
  }, [q]);

  const navigateTo = (page, item) => {
      if(page === 'HOME') router.push('/');
      if(page === 'PRODUCTS') router.push('/products');
      if(page === 'SERVICES') router.push('/services');
      if(page === 'ABOUT') router.push('/about');
      if(page === 'CONTACT') router.push('/contact');
      if(page === 'PRODUCT_DETAIL') router.push(`/products/${item.id}`);
      if(page === 'SERVICE_DETAIL') router.push(`/services/${item.id}`);
  };

      return <ProductsPage
        navigateTo={navigateTo}
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        activeCat={activeCat} setActiveCat={setActiveCat}
        viewMode={viewMode} setViewMode={setViewMode}
        selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}
        maxPrice={maxPrice} setMaxPrice={setMaxPrice}
      />;
}

export default function Page({params}) {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader2 className="w-8 h-8 animate-spin text-orange-500" /></div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
