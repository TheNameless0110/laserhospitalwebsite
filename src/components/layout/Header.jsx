'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Search } from 'lucide-react';
import LogoSVG from './LogoSVG';

const LaserHospitalLogo = () => {
  const textStyle = {
    fontFamily: '"BrushScriptCustom", "Brush Script MT", cursive',
    fontSize: 'clamp(24px, 4vw, 36px)',
    fontWeight: 'normal',
    color: '#ef4444',
    fontStyle: 'italic',
    display: 'inline-block',
    letterSpacing: '1px',
    margin: 0,
    whiteSpace: 'nowrap'
  };

  return (
    <div className="group-hover:opacity-70 transition-opacity duration-300 flex items-center">
      <h1 style={textStyle}>
        Laser Hospital
      </h1>
    </div>
  );
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'PRODUCTS', path: '/products' },
    { name: 'SERVICES', path: '/services' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT US', path: '/contact' }
  ];

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 w-full gap-4">
          
          <Link href="/" className="flex items-center cursor-pointer group shrink-0">
            <LogoSVG className="h-8 sm:h-10 md:h-12 w-auto mr-3 transition-transform group-hover:scale-110 duration-300 shrink-0" idSuffix="header" />
            <LaserHospitalLogo />
          </Link>

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

          <div className="flex items-center justify-end shrink-0 space-x-4">
            <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-orange-500 focus-within:bg-white transition-all shadow-inner">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="bg-transparent border-none focus:outline-none text-sm w-32 focus:w-48 transition-all duration-300 text-gray-900"
              />
            </div>
            
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

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
