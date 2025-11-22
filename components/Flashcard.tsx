
import React, { useState } from 'react';
import { FlashcardData, CardTheme } from '../types';

interface FlashcardProps {
  data: FlashcardData;
  theme?: CardTheme;
  className?: string;
}

// Banknote/Guilloché Style Watermarks
const FinanceWatermarks = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
    
    {/* 1. Central Guilloché Rosette (Spirograph) */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] opacity-[0.12] text-slate-600">
      <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_60s_linear_infinite]">
        <g fill="none" stroke="currentColor" strokeWidth="0.4">
          {/* Multiple rotated ellipses to create the rosette */}
          {[...Array(24)].map((_, i) => (
            <ellipse key={i} cx="100" cy="100" rx="30" ry="90" transform={`rotate(${i * 7.5} 100 100)`} />
          ))}
          {[...Array(12)].map((_, i) => (
            <ellipse key={`inner-${i}`} cx="100" cy="100" rx="80" ry="20" transform={`rotate(${i * 15} 100 100)`} />
          ))}
        </g>
        {/* Outer Ring */}
        <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1" />
        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.3" />
      </svg>
    </div>

    {/* 2. Security Wave Patterns (Background Waves) */}
    <svg className="absolute inset-0 w-full h-full opacity-[0.08] text-blue-800" preserveAspectRatio="none">
      <defs>
        <pattern id="securityWaves" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
           <path d="M0 20 Q 10 0 20 20 T 40 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
           <path d="M0 10 Q 10 -10 20 10 T 40 10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
           <path d="M0 30 Q 10 10 20 30 T 40 30" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#securityWaves)" />
    </svg>

    {/* 3. Official Seal with Tugrik */}
    <div className="absolute bottom-16 right-8 opacity-[0.15] text-slate-800 transform -rotate-12">
       <div className="relative w-32 h-32 border-[3px] border-double border-current rounded-full flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite_reverse]">
             <path id="curve" d="M 10 50 A 40 40 0 1 1 90 50 A 40 40 0 1 1 10 50" fill="none" />
             <text className="text-[8px] font-bold tracking-widest uppercase" fill="currentColor">
               <textPath href="#curve" startOffset="0%">
                 University of Finance and Economics • UFE • Ulaanbaatar •
               </textPath>
             </text>
          </svg>
          <span className="text-7xl font-serif font-bold mt-1">₮</span>
       </div>
    </div>

    {/* 4. Corner Ornament Scrolls (Banknote corners) */}
    <svg className="absolute top-2 left-2 w-24 h-24 text-slate-700 opacity-[0.15]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
       <path d="M10,10 L30,10 Q40,10 40,20 T50,30" />
       <path d="M10,10 L10,30 Q10,40 20,40 T30,50" />
       <path d="M15,15 Q30,15 40,40" strokeWidth="0.5" />
       <circle cx="10" cy="10" r="3" fill="currentColor" />
    </svg>

    <svg className="absolute top-2 right-2 w-24 h-24 text-slate-700 opacity-[0.15] rotate-90" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
       <path d="M10,10 L30,10 Q40,10 40,20 T50,30" />
       <path d="M10,10 L10,30 Q10,40 20,40 T30,50" />
       <circle cx="10" cy="10" r="3" fill="currentColor" />
    </svg>

    <svg className="absolute bottom-2 left-2 w-24 h-24 text-slate-700 opacity-[0.15] -rotate-90" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
       <path d="M10,10 L30,10 Q40,10 40,20 T50,30" />
       <path d="M10,10 L10,30 Q10,40 20,40 T30,50" />
       <circle cx="10" cy="10" r="3" fill="currentColor" />
    </svg>

    <svg className="absolute bottom-2 right-2 w-24 h-24 text-slate-700 opacity-[0.15] rotate-180" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
       <path d="M10,10 L30,10 Q40,10 40,20 T50,30" />
       <path d="M10,10 L10,30 Q10,40 20,40 T30,50" />
       <circle cx="10" cy="10" r="3" fill="currentColor" />
    </svg>

  </div>
);

export const Flashcard: React.FC<FlashcardProps> = ({ data, theme, className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => setIsFlipped(!isFlipped);

  // Defaults adjusted to Vista Aero aesthetics
  const frontBg = theme?.frontBg || '#ffffff';
  const backBg = theme?.backBg || 'linear-gradient(to bottom, #ffffff 0%, #f0f5f9 100%)'; 
  const textColor = theme?.textColor || '#1e293b';
  const uiColor = '#535353'; 

  return (
    <div 
      className={`perspective-1000 w-[400px] h-[600px] cursor-pointer group ${className}`}
      onClick={handleFlip}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* FRONT SIDE */}
        <div className="absolute w-full h-full backface-hidden rounded-sm overflow-hidden shadow-xl bg-white flex flex-col border-[3px] border-slate-500">
          {/* Card Top Bar (Window Title) */}
          <div className="h-9 bg-[#e4e4e4] border-b border-[#a0a0a0] flex items-center px-3 gap-2 select-none z-20 relative">
            <span className="text-xs font-sans text-slate-700 font-semibold">UFE Source.psd @ 100% (Front)</span>
            <div className="ml-auto flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-slate-400 border border-slate-500"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-slate-400 border border-slate-500"></div>
            </div>
          </div>

          {/* Card Main Area */}
          <div className="flex-1 flex relative">
             {/* Left Toolbar (Decorative) */}
             <div className="w-14 flex flex-col items-center py-3 gap-3 border-r border-black/20 shadow-[inset_-1px_0_0_rgba(255,255,255,0.1)] z-20 relative" style={{ backgroundColor: uiColor }}>
                {['⬚', 'V', 'L', 'W', 'C', 'K', 'T'].map((icon, i) => (
                  <div key={i} className="w-9 h-9 flex items-center justify-center text-xs text-white/80 hover:bg-white/20 rounded-[3px] cursor-default border border-transparent hover:border-white/30 transition-colors">
                     {icon}
                  </div>
                ))}
                <div className="mt-auto w-8 h-8 border border-white/50 bg-black shadow-md"></div>
                <div className="w-8 h-8 border border-white/50 bg-white -mt-4 ml-3 z-10 shadow-md"></div>
             </div>

             {/* Content Canvas */}
             <div className="flex-1 relative flex flex-col" style={{ background: frontBg }}>
                {/* Watermarks Layer */}
                <FinanceWatermarks />

                {/* Rulers */}
                <div className="h-5 bg-white border-b border-slate-300 flex items-end justify-between px-1 text-[9px] text-slate-400 font-mono shadow-[0_1px_2px_rgba(0,0,0,0.05)] relative z-10">
                  <span>0</span><span>100</span><span>200</span><span>300</span>
                </div>
                
                {/* Actual Text Content */}
                <div className="flex-1 flex items-center justify-center p-8 overflow-hidden relative z-10">
                  <h3 
                    className="text-6xl font-bold text-center drop-shadow-sm break-words leading-tight"
                    style={{ 
                      color: textColor,
                      fontFamily: '"Constantia", "Georgia", "Noto Sans Mongolian", serif' 
                    }}
                  >
                    {data.front}
                  </h3>
                </div>

                {/* Bottom Info overlay */}
                <div className="absolute bottom-2 right-2 text-xs font-bold opacity-30 uppercase tracking-widest z-10" style={{ color: textColor }}>
                   VistaFlash UFE
                </div>
             </div>
          </div>
          
          {/* Bottom Status Bar */}
          <div className="h-8 bg-[#d4d4d4] border-t border-white flex items-center px-3 text-[11px] text-slate-700 gap-4 font-medium z-20 relative">
             <span>Doc: 1.2M/1.2M</span>
             <span className="border-l border-slate-400 h-4"></span>
             <span>Click to Flip</span>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-sm overflow-hidden shadow-xl bg-white flex flex-col border-[3px] border-slate-500">
          {/* Top Bar */}
          <div className="h-9 bg-[#e4e4e4] border-b border-[#a0a0a0] flex items-center px-3 gap-2 select-none z-20 relative">
            <span className="text-xs font-sans text-slate-700 font-semibold">UFE Source.psd @ 100% (Back)</span>
          </div>

          <div className="flex-1 flex relative">
             {/* Left Toolbar */}
             <div className="w-14 flex flex-col items-center py-3 gap-3 border-r border-black/20 shadow-[inset_-1px_0_0_rgba(255,255,255,0.1)] z-20 relative" style={{ backgroundColor: uiColor }}>
                {['T', 'P', 'A', 'Z', 'H'].map((icon, i) => (
                  <div key={i} className="w-9 h-9 flex items-center justify-center text-xs text-white/80 rounded-[3px] hover:bg-white/20 cursor-default">
                     {icon}
                  </div>
                ))}
             </div>

             {/* Content Canvas */}
             <div className="flex-1 relative flex flex-col" style={{ background: backBg }}>
                 {/* Watermarks Layer */}
                 <FinanceWatermarks />

                 {/* Aero Glass Shine Effect */}
                 <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none h-24 z-10"></div>
                 <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.5)] pointer-events-none z-10"></div>

                 <div className="flex-1 flex items-center justify-center p-8 relative z-10">
                   <p 
                     className="text-3xl font-medium text-center leading-snug break-words"
                     style={{ 
                       color: textColor,
                       fontFamily: '"Candara", "Segoe UI", "Noto Sans Mongolian", sans-serif'
                     }}
                   >
                     {data.back}
                   </p>
                 </div>
             </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="h-8 bg-[#d4d4d4] border-t border-white flex items-center px-3 text-[11px] text-slate-700 font-medium z-20 relative">
             <span>Layer 1 Copy</span>
          </div>
        </div>

      </div>
    </div>
  );
};
