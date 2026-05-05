import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Zap, Instagram, Facebook } from 'lucide-react';
import LogoSVG from './LogoSVG';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          <div className="lg:col-span-5 pr-8">
            <Link href="/" className="flex items-center mb-8 group cursor-pointer w-max">
              <LogoSVG className="h-12 w-auto mr-4 bg-white/5 p-2 rounded-xl border border-white/10 group-hover:border-orange-500/50 transition-colors" idSuffix="footer" />
              <span className="font-black text-2xl tracking-tight text-white group-hover:text-orange-400 transition-colors">LASER HOSPITAL</span>
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light">
              The region's premier hub for enterprise print solutions, expert hardware repair, and complete Tech infrastructure management since 1997.
            </p>
            <div className="flex space-x-4">
               <button aria-label="Instagram" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-orange-500 hover:border-orange-500 hover:-translate-y-1 flex items-center justify-center transition-all duration-300 group"><Instagram className="w-5 h-5 text-gray-300 group-hover:text-white" /></button>
               <button aria-label="Facebook" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-orange-500 hover:border-orange-500 hover:-translate-y-1 flex items-center justify-center transition-all duration-300 group"><Facebook className="w-5 h-5 text-gray-300 group-hover:text-white" /></button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold mb-8 text-white tracking-widest text-sm uppercase flex items-center">
              <span className="w-2 h-2 bg-orange-500 mr-3 rounded-full"></span> Explore
            </h4>
            <ul className="space-y-4 text-base font-light text-gray-400">
              <li><Link href="/" className="hover:text-orange-400 hover:translate-x-2 transition-all block">Home</Link></li>
              <li><Link href="/products" className="hover:text-orange-400 hover:translate-x-2 transition-all block">Products Catalog</Link></li>
              <li><Link href="/services" className="hover:text-orange-400 hover:translate-x-2 transition-all block">Expert Services</Link></li>
              <li><Link href="/about" className="hover:text-orange-400 hover:translate-x-2 transition-all block">About Us</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold mb-8 text-white tracking-widest text-sm uppercase flex items-center">
              <span className="w-2 h-2 bg-pink-500 mr-3 rounded-full"></span> Support
            </h4>
            <ul className="space-y-4 text-base font-light text-gray-400">
              <li><Link href="/contact" className="hover:text-orange-400 hover:translate-x-2 transition-all block">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-orange-400 hover:translate-x-2 transition-all block">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-orange-400 hover:translate-x-2 transition-all block">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-bold mb-8 text-white tracking-widest text-sm uppercase flex items-center">
              <span className="w-2 h-2 bg-cyan-500 mr-3 rounded-full"></span> Visit Store
            </h4>
            <div className="space-y-6 text-gray-400 font-light text-base">
              <Link href="/contact" className="flex items-start group cursor-pointer hover:text-orange-400 transition-colors">
                <MapPin className="w-5 h-5 text-gray-500 mr-4 shrink-0 mt-1 group-hover:text-orange-500 transition-colors" />
                <p>Plot-270, First Floor, Near Empires Hotel<br/>Saheed Nagar, Bhubaneswar, Odisha, Pin - 751007</p>
              </Link>
              <Link href="/contact" className="flex items-center group cursor-pointer hover:text-orange-400 transition-colors">
                <Phone className="w-5 h-5 text-gray-500 mr-4 shrink-0 group-hover:text-orange-500 transition-colors" />
                <p>+91 9437066882</p>
              </Link>
              <Link href="/contact" className="flex items-center group cursor-pointer hover:text-orange-400 transition-colors">
                <Mail className="w-5 h-5 text-gray-500 mr-4 shrink-0 group-hover:text-orange-500 transition-colors" />
                <p>laserhospitalsupport@gmail.com</p>
              </Link>
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-gray-500 mr-4 shrink-0 mt-1" />
                <p>Mon - Sat: 9:30 AM - 9:00 PM<br/>Sun: Time Varies</p>
              </div>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-gray-800/80 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-light">
          <p>© {new Date().getFullYear()} Laser Hospital. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0">
             <span className="mr-2">Designed for modern workflows.</span>
             <Zap className="w-4 h-4 text-orange-500/80" />
          </div>
        </div>
      </div>
    </footer>
  );
}
