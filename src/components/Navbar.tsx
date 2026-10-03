import React, { useState } from 'react';
import { Phone, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onApplyClick: () => void;
  onAdminToggle: () => void;
  isAdminActive: boolean;
}

export default function Navbar({ onApplyClick, onAdminToggle, isAdminActive }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Admissions', href: '#admissions' },
    { label: 'Workshops', href: '#workshops' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Career', href: '#career' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3">
            <a href="#home" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20 font-bold text-slate-950 text-xl">
                B
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg sm:text-xl tracking-tight leading-none text-white group-hover:text-amber-400 transition-colors">
                  BY ADVANCED
                </span>
                <span className="text-[10px] text-amber-500 tracking-widest font-semibold uppercase">
                  Group
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-amber-400 transition-colors py-2 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:7006143637"
              className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span>70061 43637</span>
            </a>

            <button
              onClick={onAdminToggle}
              className={`p-2 rounded-lg border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                isAdminActive
                  ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
                  : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
              title="Admin Database Console"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin</span>
            </button>

            <button
              onClick={onApplyClick}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs rounded-lg hover:from-amber-400 hover:to-amber-500 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-amber-500/10 uppercase tracking-wider whitespace-nowrap shrink-0"
            >
              Apply Now
            </button>
          </div>

          {/* Mobile Hamburguer */}
          <div className="xl:hidden flex items-center gap-3">
            <button
              onClick={onAdminToggle}
              className={`p-2 rounded-lg border text-xs font-semibold ${
                isAdminActive
                  ? 'bg-red-500/10 border-red-500/30 text-red-400'
                  : 'bg-slate-800/50 border-slate-700 text-slate-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-slate-800 rounded-lg text-slate-300 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <a
              href="tel:7006143637"
              className="flex items-center gap-2 text-sm font-medium text-slate-300 px-3"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span>70061 43637</span>
            </a>
            
            <button
              onClick={() => {
                setIsOpen(false);
                onApplyClick();
              }}
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm rounded-lg hover:from-amber-400 hover:to-amber-500 transition-colors text-center uppercase tracking-wider"
            >
              Apply Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
