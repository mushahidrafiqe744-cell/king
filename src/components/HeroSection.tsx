import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onApplyClick: () => void;
}

export default function HeroSection({ onApplyClick }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      
      {/* Background Image with Dark Blue/Teal Scrim */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: "url('/src/assets/images/hero_healthcare_students_1791027347251.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-cyan-950/85 to-slate-900/90 z-10" />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-20 text-center flex flex-col items-center justify-between min-h-[75vh]">
        
        {/* Top/Mid Group */}
        <div className="flex flex-col items-center space-y-6 mt-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-widest shadow-inner shadow-amber-500/5 animate-pulse">
            EDNCATE • EMPOWER • ELEVATE
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight max-w-4xl text-wrap-balance">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 drop-shadow-md">ADVANCED</span> Group
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-2xl text-slate-300 font-medium max-w-2xl">
            Healthcare, Education & Skill Development
          </p>

          {/* Action button */}
          <div className="pt-4">
            <button
              onClick={onApplyClick}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 hover:shadow-amber-400/30 hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center gap-2 uppercase tracking-wider"
            >
              <span>Explore Programs & Apply</span>
              <ChevronRight className="w-5 h-5 font-bold" />
            </button>
          </div>
        </div>

        {/* Three Glowing Icons representing Healthcare, Education, and Skill Development */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 w-full max-w-5xl mt-12 mb-10">
          
          {/* Healthcare Card */}
          <div className="group flex flex-col items-center p-6 rounded-2xl bg-slate-950/40 border border-slate-800/60 backdrop-blur-sm hover:border-emerald-500/30 hover:bg-slate-950/60 hover:-translate-y-1 transition-all duration-300">
            <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 shadow-lg shadow-emerald-500/5 mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-12 h-12 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {/* Caduceus Heart Icon */}
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" className="stroke-emerald-400" />
                <path d="M12 5v11" strokeWidth="2" strokeLinecap="round" />
                <path d="M10 7c2 1 2 3 0 4M14 7c-2 1-2 3 0 4M10 11c2 1 2 3 0 4M14 11c-2 1-2 3 0 4" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-1">Healthcare</h3>
            <p className="text-slate-400 text-sm text-center">Professional medical helper training programs</p>
          </div>

          {/* Education Card */}
          <div className="group flex flex-col items-center p-6 rounded-2xl bg-slate-950/40 border border-slate-800/60 backdrop-blur-sm hover:border-cyan-500/30 hover:bg-slate-950/60 hover:-translate-y-1 transition-all duration-300">
            <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20 shadow-lg shadow-cyan-500/5 mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {/* Graduation Cap & Book Icon */}
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5" />
                <path d="M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" opacity="0.3" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-1">Education</h3>
            <p className="text-slate-400 text-sm text-center">Quality academic support and curriculum planning</p>
          </div>

          {/* Skill Development Card */}
          <div className="group flex flex-col items-center p-6 rounded-2xl bg-slate-950/40 border border-slate-800/60 backdrop-blur-sm hover:border-amber-500/30 hover:bg-slate-950/60 hover:-translate-y-1 transition-all duration-300">
            <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 shadow-lg shadow-amber-500/5 mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-12 h-12 text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {/* Arm / Gears Icon */}
                <path d="M15 14c.2-1 .7-1.7 1.5-2.2M12 15a4 4 0 100-8 4 4 0 000 8z" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 005 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-1">Skill Development</h3>
            <p className="text-slate-400 text-sm text-center">Hands-on coding, IT, and vocational crafts</p>
          </div>

        </div>

        {/* Bottom Location Indicator & Slogan */}
        <div className="flex flex-col items-center mt-4">
          <p className="text-amber-400 text-lg md:text-xl font-bold tracking-wider leading-none">
            Educate. Empower. Elevate.
          </p>
          <p className="text-slate-300 text-xs md:text-sm font-semibold tracking-wide mt-1 uppercase">
            Bandipora, J&K.
          </p>
        </div>

      </div>

    </section>
  );
}
