import React from 'react';
import { CardTheme, ThemeType } from '../types';

interface ExportCardProps {
  text: string;
  type: 'Front' | 'Back';
  theme: CardTheme;
}

// --- DECALS & WATERMARKS ---

// High-Fidelity Banknote Pattern from Flashcard component
const BanknoteWatermarks = ({ color = "text-slate-600", opacity = "opacity-15" }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${opacity} ${color}`}>
    
    {/* 1. Central Guilloché Rosette (Spirograph) */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px]">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <g fill="none" stroke="currentColor" strokeWidth="0.4">
          {[...Array(24)].map((_, i) => (
            <ellipse key={i} cx="100" cy="100" rx="30" ry="90" transform={`rotate(${i * 7.5} 100 100)`} />
          ))}
          {[...Array(12)].map((_, i) => (
            <ellipse key={`inner-${i}`} cx="100" cy="100" rx="80" ry="20" transform={`rotate(${i * 15} 100 100)`} />
          ))}
        </g>
        <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1" />
        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.3" />
      </svg>
    </div>

    {/* 2. Security Wave Patterns */}
    <svg className="absolute inset-0 w-full h-full opacity-50" preserveAspectRatio="none">
      <defs>
        <pattern id="securityWavesExport" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
           <path d="M0 20 Q 10 0 20 20 T 40 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
           <path d="M0 10 Q 10 -10 20 10 T 40 10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#securityWavesExport)" />
    </svg>

    {/* 3. Official Seal with Tugrik (Corner) */}
    <div className="absolute bottom-12 right-6 transform -rotate-12 scale-125">
       <div className="relative w-32 h-32 border-[3px] border-double border-current rounded-full flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
             <path id="curveExport2" d="M 10 50 A 40 40 0 1 1 90 50 A 40 40 0 1 1 10 50" fill="none" />
             <text className="text-[8px] font-bold tracking-widest uppercase" fill="currentColor">
               <textPath href="#curveExport2" startOffset="0%">
                 University of Finance and Economics • UFE • Ulaanbaatar •
               </textPath>
             </text>
          </svg>
          <span className="text-7xl font-serif font-bold mt-1">₮</span>
       </div>
    </div>

    {/* 4. Corner Scrollwork */}
    <svg className="absolute top-2 left-2 w-24 h-24 opacity-60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
       <path d="M10,10 L30,10 Q40,10 40,20 T50,30" />
       <path d="M10,10 L10,30 Q10,40 20,40 T30,50" />
       <circle cx="10" cy="10" r="4" fill="currentColor" />
    </svg>
    
    <svg className="absolute top-2 right-2 w-24 h-24 opacity-60 rotate-90" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
       <path d="M10,10 L30,10 Q40,10 40,20 T50,30" />
       <path d="M10,10 L10,30 Q10,40 20,40 T30,50" />
       <circle cx="10" cy="10" r="4" fill="currentColor" />
    </svg>

  </div>
);

const NotebookLines = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <div className="absolute left-12 top-0 bottom-0 w-[2px] bg-red-300/50"></div>
    <div className="w-full h-full" style={{ background: 'repeating-linear-gradient(transparent, transparent 39px, #94a3b8 40px)' }}></div>
  </div>
);

export const ExportCard: React.FC<ExportCardProps> = ({ text, type, theme }) => {
  const isFront = type === 'Front';
  
  // --- THEME STYLES ---
  let bgStyle = {};
  let borderStyle = '8px solid #333'; // Default thicker border
  let textColor = '#000';
  let HeaderComponent = null;
  let DecalComponent = null;

  switch (theme.type) {
    case ThemeType.MACOS:
      bgStyle = { background: 'linear-gradient(to bottom, #e0e0e0 0%, #d0d0d0 100%)' };
      borderStyle = '4px solid #a0a0a0';
      textColor = '#1c1c1e';
      HeaderComponent = (
        <div className="h-8 bg-gradient-to-b from-[#f6f6f6] to-[#dcdcdc] border-b border-[#b4b4b4] flex items-center px-4 gap-2">
           <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]"></div>
           <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24]"></div>
           <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]"></div>
           <span className="mx-auto text-xs font-sans text-slate-600 font-semibold drop-shadow-sm">Study Deck - {type}</span>
        </div>
      );
      break;

    case ThemeType.NOTEBOOK:
      bgStyle = { backgroundColor: '#fef9c3' }; 
      borderStyle = '1px dashed #9ca3af';
      textColor = '#1e293b';
      DecalComponent = <NotebookLines />;
      HeaderComponent = (
        <div className="h-12 bg-[#333] flex items-center justify-between px-4 shadow-md z-20 relative pattern-grid-lg">
           <div className="text-white font-serif italic text-lg">Notes</div>
           <div className="text-white/50 text-xs">{type}</div>
        </div>
      );
      break;

    case ThemeType.FINANCE:
      bgStyle = { backgroundColor: '#f0fdf4' }; 
      borderStyle = '8px double #14532d'; // Thicker border
      textColor = '#064e3b';
      // Use the rich banknote watermark
      DecalComponent = <BanknoteWatermarks color="text-green-800" opacity="opacity-20" />;
      HeaderComponent = (
        <div className="h-8 bg-[#14532d] flex items-center justify-center px-2 border-b-2 border-[#fbbf24]">
           <span className="text-[#fbbf24] font-serif font-bold tracking-widest uppercase text-xs">Wall Street Finance</span>
        </div>
      );
      break;
      
    case ThemeType.UFE:
      bgStyle = { background: 'white' };
      borderStyle = '8px solid #1e3a8a'; // Thicker UFE Blue border
      textColor = '#172554';
      // Rich decals for UFE
      DecalComponent = <BanknoteWatermarks color="text-blue-900" opacity="opacity-20" />;
      HeaderComponent = (
        <div className="h-10 bg-[#1e3a8a] flex items-center justify-between px-4 shadow-sm">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-white rounded-full"></div>
             <span className="text-white font-serif font-bold tracking-wide text-sm">UFE ACADEMIC</span>
           </div>
           <span className="text-white/70 text-[10px] font-mono uppercase">{type} SIDE</span>
        </div>
      );
      break;

    case ThemeType.VISTA:
    default:
      bgStyle = { background: isFront ? '#ffffff' : 'linear-gradient(to bottom, #ffffff 0%, #f1f5f9 100%)' };
      borderStyle = '8px solid #64748b'; // Thicker Slate border
      textColor = '#0f172a';
      // Vista also gets the banknote treatment as requested ("cool decals")
      DecalComponent = <BanknoteWatermarks color="text-slate-500" opacity="opacity-15" />;
      HeaderComponent = (
        <div className="h-9 bg-[#e4e4e4] border-b border-[#a0a0a0] flex items-center px-3 gap-2 z-20 relative">
           <div className="w-3 h-3 rounded-full bg-blue-400 border border-blue-600 shadow-inner"></div>
           <span className="text-xs font-sans text-slate-700 font-bold tracking-wide">VistaFlash - {type}</span>
        </div>
      );
      break;
  }

  return (
    <div 
      className="w-[400px] h-[600px] relative flex flex-col overflow-hidden shadow-none box-border"
      style={{ ...bgStyle, border: borderStyle }} 
    >
      {HeaderComponent}

      <div className="flex-1 flex relative">
         {/* Toolbar Strip (Only for Vista/MacOS/UFE/Finance) */}
         {theme.type !== ThemeType.NOTEBOOK && (
           <div className="w-10 flex flex-col items-center py-4 gap-3 border-r border-black/5 z-20 relative bg-black/5">
              {['A', 'T', 'P', 'Z'].map((t, i) => (
                 <div key={i} className="w-6 h-6 border border-black/10 rounded-[2px] bg-white/40 shadow-sm"></div>
              ))}
           </div>
         )}

         {/* Main Content Area */}
         <div className="flex-1 flex flex-col relative p-4">
            {DecalComponent}

            {/* Content Centering Container */}
            <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
               <p className={`text-center break-words w-full leading-tight`}
                   style={{ 
                     color: textColor,
                     fontFamily: '"Times New Roman", Times, serif',
                     fontSize: text.length > 50 ? '2.5rem' : '3.5rem',
                     fontWeight: isFront ? 'bold' : 'normal',
                     textShadow: '0 1px 1px rgba(255,255,255,0.8)'
                   }}>
                 {text}
               </p>
            </div>
         </div>
      </div>

      {/* Footer */}
      {theme.type === ThemeType.UFE && (
        <div className="h-6 bg-[#f1f5f9] border-t border-[#cbd5e1] flex items-center justify-center text-[10px] text-[#1e3a8a] font-bold tracking-[0.2em] z-20 relative">
           EXCELLENCE IN FINANCE
        </div>
      )}
      {theme.type === ThemeType.NOTEBOOK && (
         <div className="absolute bottom-4 right-4 text-slate-400 font-handwriting text-xs">
            Page {isFront ? 1 : 2}
         </div>
      )}
    </div>
  );
};