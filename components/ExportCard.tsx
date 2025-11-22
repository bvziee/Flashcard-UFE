
import React from 'react';
import { CardTheme } from '../types';

interface ExportCardProps {
  text: string;
  type: 'Front' | 'Back';
  theme: CardTheme;
}

// Banknote/Guilloché Style Watermarks (Duplicated for independent rendering)
const FinanceWatermarks = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
    
    {/* 1. Central Guilloché Rosette (Spirograph) */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] opacity-[0.12] text-slate-600">
      <svg viewBox="0 0 200 200" className="w-full h-full">
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
        <pattern id="securityWavesExport" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
           <path d="M0 20 Q 10 0 20 20 T 40 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
           <path d="M0 10 Q 10 -10 20 10 T 40 10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
           <path d="M0 30 Q 10 10 20 30 T 40 30" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#securityWavesExport)" />
    </svg>

    {/* 3. Official Seal with Tugrik */}
    <div className="absolute bottom-16 right-8 opacity-[0.15] text-slate-800 transform -rotate-12">
       <div className="relative w-32 h-32 border-[3px] border-double border-current rounded-full flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
             <path id="curveExport" d="M 10 50 A 40 40 0 1 1 90 50 A 40 40 0 1 1 10 50" fill="none" />
             <text className="text-[8px] font-bold tracking-widest uppercase" fill="currentColor">
               <textPath href="#curveExport" startOffset="0%">
                 University of Finance and Economics • UFE • Ulaanbaatar •
               </textPath>
             </text>
          </svg>
          <span className="text-7xl font-serif font-bold mt-1">₮</span>
       </div>
    </div>

    {/* 4. Corner Ornament Scrolls */}
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

export const ExportCard: React.FC<ExportCardProps> = ({ text, type, theme }) => {
  const isFront = type === 'Front';
  // Use the theme color if customized, otherwise default to clean white/gradient
  const bgColor = isFront 
    ? (theme.frontBg || '#ffffff')
    : (theme.backBg === '#fffbef' ? 'linear-gradient(to bottom, #ffffff 0%, #f0f5f9 100%)' : theme.backBg); 
    
  const textColor = theme.textColor;
  const uiColor = '#535353';

  return (
    <div 
      className="w-[400px] h-[600px] relative flex flex-col bg-white overflow-hidden"
      style={{ border: '3px solid #64748b' }} 
    >
      {/* Window Title Bar */}
      <div className="h-9 bg-[#e4e4e4] border-b border-[#a0a0a0] flex items-center px-3 gap-2 z-20 relative">
         <div className="w-3 h-3 rounded-full bg-blue-400 border border-blue-600 shadow-inner"></div>
         <span className="text-xs font-sans text-slate-700 font-bold tracking-wide">UFE Flashcard - {type} Layer</span>
      </div>

      <div className="flex-1 flex">
         {/* Left Toolbar Strip */}
         <div className="w-14 flex flex-col items-center py-3 gap-3 border-r border-black/20 z-20 relative" style={{ backgroundColor: uiColor }}>
            {['M', 'L', 'C', 'W', 'T', 'P'].map((t, i) => (
               <div key={i} className="w-8 h-8 border border-white/20 rounded-[3px] bg-white/10 shadow-sm"></div>
            ))}
            <div className="mt-auto w-8 h-8 bg-black border border-white/50 shadow-md"></div>
            <div className="w-8 h-8 bg-white border border-white/50 -mt-4 ml-3 relative z-10 shadow-md"></div>
         </div>

         {/* Main Canvas */}
         <div className="flex-1 flex flex-col relative" style={{ background: bgColor }}>
            {/* Watermarks Layer */}
            <FinanceWatermarks />
            
            {/* Horizontal Ruler */}
            <div className="h-5 bg-[#f9f9f9] border-b border-slate-300 flex items-end px-1 z-10 relative">
               <div className="w-full h-[2px] bg-slate-300 flex justify-between">
                  {[...Array(10)].map((_,i) => <div key={i} className="w-[1px] h-[4px] bg-slate-400 -mt-[2px]"></div>)}
               </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center p-8 z-10 relative">
               {/* Aero Shine for Back */}
               {!isFront && (
                 <div className="absolute inset-0 pointer-events-none" 
                      style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)' }}>
                 </div>
               )}
               
               <h1 className={`text-center break-words max-w-full ${isFront ? 'text-6xl font-bold leading-tight' : 'text-3xl font-medium leading-snug'}`}
                   style={{ 
                     color: textColor,
                     fontFamily: isFront 
                       ? '"Constantia", "Georgia", "Noto Sans Mongolian", serif' 
                       : '"Candara", "Segoe UI", "Noto Sans Mongolian", sans-serif'
                   }}>
                 {text}
               </h1>
            </div>

            {/* UFE Watermark */}
            <div className="absolute bottom-2 right-2 opacity-40 font-bold text-xs tracking-[0.2em] z-10 relative" style={{ color: textColor }}>
               UFE STUDIO
            </div>
         </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="h-8 bg-[#d4d4d4] border-t border-white flex items-center justify-between px-3 text-[11px] text-slate-600 font-medium z-20 relative">
         <span>{isFront ? 'Doc: 100% (RGB/8)' : 'Doc: Smart Object'}</span>
         <span className="font-mono">x: 200px y: 300px</span>
      </div>
    </div>
  );
};
