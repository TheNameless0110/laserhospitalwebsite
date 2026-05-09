'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Search } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'PRODUCTS', path: '/products' },
    { name: 'SERVICES', path: '/services' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT US', path: '/contact' }
  ];

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live search suggestions from Supabase
  const fetchSuggestions = async (query) => {
    if (!query.trim()) { setSuggestions([]); return; }
    const { data } = await supabase
      .from('products')
      .select('id, name, brand, type')
      .or(`name.ilike.%${query}%,brand.ilike.%${query}%,type.ilike.%${query}%`)
      .limit(8);
    setSuggestions(data || []);
    setShowSuggestions(true);
  };

  const handleSearchInput = (val) => {
    setSearchQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 250);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setShowSuggestions(false);
      setIsSearchOpen(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const selectSuggestion = (product) => {
    setShowSuggestions(false);
    setIsSearchOpen(false);
    setSearchQuery('');
    router.push(`/products/${product.id}`);
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 w-full gap-4">
          
          {/* Logo + Company Name */}
          <Link href="/" className="flex items-center cursor-pointer group shrink-0">
            <Image
              src="/N LH Logo.jpg.jpg"
              alt="Laser Hospital Logo"
              width={48}
              height={48}
              className="h-10 sm:h-12 w-auto mr-3 rounded-lg transition-transform group-hover:scale-110 duration-300 shrink-0 object-contain"
              priority
            />
            <Image
              src="/LH Company Name.jpg.jpeg"
              alt="Laser Hospital"
              width={160}
              height={40}
              className="h-8 sm:h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 justify-center space-x-4 lg:space-x-8 px-4">
            {navLinks.map((item) => {
              const isActive = pathname === item.path || (pathname.startsWith('/products') && item.path === '/products');
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`text-sm font-semibold tracking-wide transition-colors whitespace-nowrap ${
                    isActive ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Search + Mobile Menu */}
          <div className="flex items-center justify-end shrink-0 space-x-3" ref={searchRef}>
            {/* Desktop Search Bar (always visible on lg+) */}
            <div className="hidden lg:flex items-center relative">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-orange-500 focus-within:bg-white transition-all shadow-inner">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => handleSearchInput(e.target.value)}
                  onKeyDown={handleSearch}
                  onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                  className="bg-transparent border-none focus:outline-none text-sm w-32 focus:w-48 transition-all duration-300 text-gray-900"
                />
              </div>
              {/* Desktop Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-80 z-50">
                  {suggestions.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => selectSuggestion(s)}
                      className="w-full text-left px-5 py-3 hover:bg-orange-50 transition-colors flex items-center justify-between border-b border-gray-50 last:border-0"
                    >
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{s.name}</p>
                        <p className="text-xs text-gray-500">{s.brand} · {s.type}</p>
                      </div>
                      <Search className="w-3 h-3 text-gray-300" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tablet/Mobile Search Icon (visible below lg) */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-orange-500 transition-colors rounded-full hover:bg-orange-50"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Search Expandable Bar */}
        {isSearchOpen && (
          <div className="lg:hidden pb-3 relative" ref={searchRef}>
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2.5 focus-within:ring-2 focus-within:ring-orange-500 focus-within:bg-white transition-all shadow-inner">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => handleSearchInput(e.target.value)}
                onKeyDown={handleSearch}
                onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                className="bg-transparent border-none focus:outline-none text-sm flex-1 text-gray-900"
                autoFocus
              />
              <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); setSuggestions([]); }} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Mobile Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 mx-4">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => selectSuggestion(s)}
                    className="w-full text-left px-5 py-3 hover:bg-orange-50 transition-colors flex items-center justify-between border-b border-gray-50 last:border-0"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.brand} · {s.type}</p>
                    </div>
                    <Search className="w-3 h-3 text-gray-300" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="px-2 pt-2 pb-8 space-y-1 sm:px-3">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-4 rounded-md text-lg font-bold text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
