const fs = require('fs');
const content = fs.readFileSync('../LH front code gemini.txt', 'utf8');
const start = content.indexOf('const ProductsPage = ');
const end = content.indexOf('// --- Services Page ---');
let page = content.substring(start, end).trim();

// Remove the prices from ProductsPage!
page = page.replace(/<div className="text-xl font-black text-gray-900 mt-2">.*?<\/div>/gs, '');

fs.writeFileSync('src/app/products/page.jsx', `'use client';
import React, { useState, useEffect } from 'react';
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
import { dummyProducts, servicesList, productImages, serviceImages, aboutImages, contactImages, homeImages } from '@/lib/dummyData';
import { HeroBackgroundSlider, CountUp } from '@/components/layout/SharedComponents';

${page}

export default function Page({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams ? searchParams.get('q') : null;
  
  const [searchQuery, setSearchQuery] = useState(q || '');
  const [activeCat, setActiveCat] = useState('ALL PRODUCTS');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(30000);
  
  useEffect(() => {
      if (q !== null) setSearchQuery(q);
  }, [q]);

  const navigateTo = (page, item) => {
      if(page === 'HOME') router.push('/');
      if(page === 'PRODUCTS') router.push('/products');
      if(page === 'SERVICES') router.push('/services');
      if(page === 'ABOUT') router.push('/about');
      if(page === 'CONTACT') router.push('/contact');
      if(page === 'PRODUCT_DETAIL') router.push('/products/' + item.id);
      if(page === 'SERVICE_DETAIL') router.push('/services/' + item.id);
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
`);
console.log('Done!');
