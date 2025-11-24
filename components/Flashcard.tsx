
import React, { useState } from 'react';
import { FlashcardData, CardTheme, ThemeType } from '../types';

interface FlashcardProps {
  data: FlashcardData;
  theme?: CardTheme;
  className?: string;
}

// --- NEW DECALS ---

const QRCodeDecal = ({ color = "currentColor", className = "" }) => (
  <svg viewBox="0 0 100 100" className={`w-16 h-16 ${className}`} fill={color}>
    <path d="M0,0 h45 v45 h-45 z M10,10 v25 h25 v-25 z M20,20 h5 v5 h-5 z" />
    <path d="M55,0 h45 v45 h-45 z M65,10 v25 h25 v-25 z M75,20 h5 v5 h-5 z" />
    <path d="M0,55 h45 v45 h-45 z M10,65 v25 h25 v-25 z M20,75 h5 v5 h-5 z" />
    <rect x="55" y="55" width="10" height="10" />
    <rect x="70" y="55" width="10" height="10" />
    <rect x="85" y="55" width="15" height="15" />
    <rect x="55" y="70" width="15" height="15" />
    <rect x="80" y="75" width="10" height="10" />
    <rect x="55" y="90" width="10" height="10" />
    <rect x="75" y="90" width="25" height="10" />
  </svg>
);

const CircuitDecal = () => (
  <svg className="absolute inset-0 w-full h-full opacity-20 text-green-500 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
    <path d="M10,0 v20 h20 v20" fill="none" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="30" cy="40" r="1.5" fill="currentColor" />
    <path d="M90,100 v-30 h-10" fill="none" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="80" cy="70" r="1.5" fill="currentColor" />
    <path d="M0,50 h30 l10,10 h20" fill="none" stroke="currentColor" strokeWidth="0.5" />
    <rect x="60" y="55" width="10" height="10" stroke="currentColor" fill="none" strokeWidth="0.5" />
    <path d="M100,20 h-40 l-10,10" fill="none" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

const BlueprintGrid = () => (
  <div className="absolute inset-0 pointer-events-none opacity-30">
    <svg width="100%" height="100%">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
        <pattern id="gridLarge" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#grid)" />
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gridLarge)" />
    </svg>
    {/* Tech Marks */}
    <div className="absolute top-2 left-2 border-l border-t border-white w-4 h-4"></div>
    <div className="absolute top-2 right-2 border-r border-t border-white w-4 h-4"></div>
    <div className="absolute bottom-2 left-2 border-l border-b border-white w-4 h-4"></div>
    <div className="absolute bottom-2 right-2 border-r border-b border-white w-4 h-4"></div>
    <div className="absolute top-1/2 left-2 text-[6px] text-white font-mono -rotate-90 origin-left">DIM: 400x600</div>
  </div>
);

const HexPattern = () => (
  <div className="absolute inset-0 opacity-10 pointer-events-none">
     <svg width="100%" height="100%">
      <defs>
        <pattern id="hex" width="20" height="34" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
           <path d="M10 0 L20 8.5 L20 25.5 L10 34 L0 25.5 L0 8.5 Z" fill="none" stroke="white" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" />
     </svg>
  </div>
);

// --- EXISTING DECALS ---

const FinanceWatermarks = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] opacity-[0.12] text-slate-600">
      <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_60s_linear_infinite]">
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
    <QRCodeDecal className="absolute top-2 right-2 w-12 h-12 opacity-40 text-slate-700" />
  </div>
);

const NotebookLines = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <div className="absolute left-12 top-0 bottom-0 w-[2px] bg-red-300/50"></div>
    <div className="w-full h-full" style={{ background: 'repeating-linear-gradient(transparent, transparent 39px, #94a3b8 40px)' }}></div>
  </div>
);

export const Flashcard: React.FC<FlashcardProps> = ({ data, theme, className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => setIsFlipped(!isFlipped);

  const isLandscape = theme?.orientation === 'LANDSCAPE';
  
  // Dimensions
  const widthClass = isLandscape ? 'w-[600px]' : 'w-[400px]';
  const heightClass = isLandscape ? 'h-[400px]' : 'h-[600px]';

  // Theme Logic
  let frontBg = '#ffffff';
  let backBg = 'linear-gradient(to bottom, #ffffff 0%, #f0f5f9 100%)';
  let defaultBorderColor = '#64748b';
  let borderBase = '16px solid'; 
  let defaultTextColor = '#0f172a';
  let Header: React.ReactNode = null;
  let DecalComponent = <FinanceWatermarks />;
  const uiColor = '#535353'; 

  // Context for header
  const cardTitle = data.category 
    ? data.category.split(' ').slice(1).join(' ') // Remove number prefix if simple split works, else just show category
    : "UFE Source";
  const chapterNum = data.category ? data.category.split('.')[0] : "1";

  switch (theme?.type) {
    case ThemeType.CYBERPUNK:
      frontBg = '#050505';
      backBg = '#0a0a0a';
      defaultBorderColor = '#22c55e'; // Neon Green
      borderBase = '4px solid';
      defaultTextColor = '#4ade80';
      DecalComponent = <CircuitDecal />;
      Header = (
        <div className="h-8 bg-black border-b border-green-700 flex items-center justify-between px-4 shrink-0 z-20 relative">
          <span className="text-green-500 font-mono text-xs animate-pulse">SYS.DATABANK.V{chapterNum}</span>
          <div className="flex gap-1">
             <div className="w-2 h-2 bg-green-500"></div>
             <div className="w-2 h-2 bg-green-900"></div>
          </div>
        </div>
      );
      break;

    case ThemeType.BLUEPRINT:
      frontBg = '#1e3a8a'; // Blueprint Blue
      backBg = '#172554';
      defaultBorderColor = '#ffffff';
      borderBase = '4px double';
      defaultTextColor = '#ffffff';
      DecalComponent = <BlueprintGrid />;
      Header = (
        <div className="h-10 border-b border-white flex items-center justify-between px-4 shrink-0 z-20 relative bg-[#1e3a8a]">
          <span className="text-white font-mono text-xs tracking-widest uppercase truncate max-w-[200px]">{cardTitle}</span>
          <span className="text-white/70 text-[10px]">SEC: {chapterNum}</span>
        </div>
      );
      break;

    case ThemeType.RETRO:
      frontBg = 'linear-gradient(to bottom, #2e0249 0%, #570a57 100%)';
      backBg = 'linear-gradient(to bottom, #2e0249 0%, #a91079 100%)';
      defaultBorderColor = '#f806cc'; // Neon Pink
      borderBase = '6px solid';
      defaultTextColor = '#fee2e2';
      DecalComponent = (
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Sun */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-gradient-to-t from-yellow-400 to-red-500 opacity-60 blur-sm"></div>
          {/* Grid Floor */}
          <div className="absolute bottom-0 w-full h-1/2" style={{ background: 'linear-gradient(transparent 95%, #f806cc 100%)', backgroundSize: '100% 20px', transform: 'perspective(200px) rotateX(45deg)' }}></div>
        </div>
      );
      Header = (
        <div className="h-8 bg-black/40 backdrop-blur border-b border-pink-500 flex items-center justify-center shrink-0 z-20 relative">
          <span className="text-yellow-300 font-bold italic tracking-widest text-sm drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" style={{ fontFamily: '"Oswald", sans-serif' }}>V A P O R W A V E</span>
        </div>
      );
      break;

    case ThemeType.GAMER:
      frontBg = '#111111';
      backBg = '#181818';
      defaultBorderColor = '#7c3aed'; // Violet
      borderBase = '8px solid';
      defaultTextColor = '#e2e8f0';
      DecalComponent = <HexPattern />;
      Header = (
        <div className="h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 flex items-center justify-between px-2 shrink-0 z-20 relative">
          <span className="text-white font-bold text-xs uppercase italic">Level {chapterNum}</span>
          <div className="flex gap-0.5">
             <div className="w-8 h-2 bg-yellow-400 skew-x-12"></div>
             <div className="w-4 h-2 bg-yellow-400/50 skew-x-12"></div>
          </div>
        </div>
      );
      break;

    case ThemeType.BRUTALIST:
      frontBg = '#e5e5e5';
      backBg = '#d4d4d4';
      defaultBorderColor = '#000000';
      borderBase = '12px solid';
      defaultTextColor = '#000000';
      DecalComponent = (
        <div className="absolute inset-0 z-0 opacity-10">
           <div className="absolute top-0 left-1/2 w-4 h-full bg-black"></div>
           <div className="absolute top-1/2 left-0 w-full h-4 bg-black"></div>
           <div className="absolute bottom-4 right-4 text-9xl font-black text-black opacity-20 rotate-90">UFE</div>
        </div>
      );
      Header = (
        <div className="h-14 bg-black text-white flex items-end p-2 shrink-0 z-20 relative">
           <h1 className="text-xl font-black leading-none uppercase truncate">{cardTitle || "DATA"}</h1>
        </div>
      );
      break;

    case ThemeType.SWISS:
      frontBg = '#ffffff';
      backBg = '#f1f1f1';
      defaultBorderColor = '#ef4444'; // Red
      borderBase = '20px solid'; // Thick red frame
      defaultTextColor = '#000000';
      DecalComponent = (
        <div className="absolute inset-0 pointer-events-none opacity-5">
           <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-red-600"></div>
           <div className="absolute top-1/2 right-10 w-20 h-20 bg-black rotate-45"></div>
        </div>
      );
      Header = (
         <div className="absolute top-4 left-4 z-20">
            <div className="w-8 h-8 bg-red-600 text-white flex items-center justify-center font-bold text-lg">+</div>
         </div>
      );
      break;

    case ThemeType.MACOS:
      frontBg = 'linear-gradient(to bottom, #e0e0e0 0%, #d0d0d0 100%)';
      backBg = frontBg;
      defaultBorderColor = '#a0a0a0';
      borderBase = '6px solid';
      defaultTextColor = '#1c1c1e';
      Header = (
        <div className="h-8 bg-gradient-to-b from-[#f6f6f6] to-[#dcdcdc] border-b border-[#b4b4b4] flex items-center px-4 gap-2 shrink-0 z-20 relative">
             <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]"></div>
             <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24]"></div>
             <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]"></div>
             <span className="mx-auto text-xs font-sans text-slate-600 font-semibold drop-shadow-sm truncate max-w-[200px]">
               {data.category || "Flashcards"}
             </span>
        </div>
      );
      break;
    case ThemeType.NOTEBOOK:
      frontBg = '#fef9c3';
      backBg = '#fef9c3';
      defaultBorderColor = '#9ca3af';
      borderBase = '2px dashed';
      defaultTextColor = '#1e293b';
      DecalComponent = <NotebookLines />;
      Header = (
          <div className="h-12 bg-[#333] flex items-center justify-between px-4 shadow-md z-20 relative shrink-0">
             <div className="text-white font-serif italic text-lg">Notes</div>
             <div className="text-white/50 text-xs">Ch.{chapterNum}</div>
          </div>
      );
      break;
    case ThemeType.FINANCE:
      frontBg = '#f0fdf4';
      backBg = '#f0fdf4';
      defaultBorderColor = '#14532d';
      borderBase = '12px double';
      defaultTextColor = '#064e3b';
      Header = (
          <div className="h-8 bg-[#14532d] flex items-center justify-center px-2 border-b-2 border-[#fbbf24] shrink-0 z-20 relative">
             <span className="text-[#fbbf24] font-serif font-bold tracking-widest uppercase text-xs truncate">
               {data.category ? data.category.toUpperCase() : "WALL STREET FINANCE"}
             </span>
          </div>
       );
       break;
    case ThemeType.UFE:
      frontBg = '#ffffff';
      backBg = '#ffffff';
      defaultBorderColor = '#1e3a8a';
      borderBase = '16px solid';
      defaultTextColor = '#172554';
      Header = (
          <div className="h-10 bg-[#1e3a8a] flex items-center justify-between px-4 shadow-sm shrink-0 z-20 relative">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-white rounded-full"></div>
               <span className="text-white font-serif font-bold tracking-wide text-sm">UFE ACADEMIC</span>
             </div>
             <span className="text-white/70 text-[10px] font-mono uppercase">CH-{chapterNum}</span>
          </div>
       );
       break;
    case ThemeType.VISTA:
    default:
       frontBg = '#ffffff';
       backBg = 'linear-gradient(to bottom, #ffffff 0%, #f1f5f9 100%)';
       defaultBorderColor = '#64748b';
       borderBase = '16px solid';
       defaultTextColor = '#0f172a';
       Header = (
         <div className="h-9 bg-[#e4e4e4] border-b border-[#a0a0a0] flex items-center px-3 gap-2 select-none z-20 relative shrink-0">
           <span className="text-xs font-sans text-slate-700 font-semibold truncate max-w-[250px]">
             {data.category ? `${data.category}.psd` : 'UFE Source.psd'} @ 100%
           </span>
           <div className="ml-auto flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-400 border border-slate-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-400 border border-slate-500"></div>
           </div>
         </div>
       );
       break;
  }

  // Override Logic
  const textColor = theme?.customTextColor || defaultTextColor;
  const borderColor = theme?.customBorderColor || defaultBorderColor;
  const fontFamily = theme?.fontFamily || (theme?.type === ThemeType.CYBERPUNK || theme?.type === ThemeType.BLUEPRINT ? '"Courier New", monospace' : '"Times New Roman", serif');
  
  const fontSizeScale = theme?.fontSizeScale || 1;
  const textOffsetX = theme?.textOffsetX || 0;
  const textOffsetY = theme?.textOffsetY || 0;
  
  const frontBaseSize = isLandscape ? 3.5 : 4.5;
  const backBaseSize = isLandscape ? 1.8 : 2.5;

  return (
    <div 
      className={`perspective-1000 ${widthClass} ${heightClass} cursor-pointer group ${className}`}
      onClick={handleFlip}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* FRONT SIDE */}
        <div 
          className={`absolute w-full h-full backface-hidden rounded-sm overflow-hidden shadow-xl flex flex-col`}
          style={{ 
            border: `${borderBase} ${borderColor}`,
            background: frontBg,
            backgroundColor: frontBg.includes('gradient') ? undefined : frontBg,
            transform: 'translateZ(0)', // Fix z-fighting
            zIndex: isFlipped ? 0 : 1
          }}
        >
          {Header}

          <div className="flex-1 flex relative overflow-hidden">
             {/* Left Toolbar (Vista Only) */}
             {theme?.type === ThemeType.VISTA && (
               <div className="w-14 flex flex-col items-center py-3 gap-3 border-r border-black/20 shadow-[inset_-1px_0_0_rgba(255,255,255,0.1)] z-20 relative shrink-0" style={{ backgroundColor: uiColor }}>
                  {['⬚', 'V', 'L', 'W', 'C', 'K', 'T'].map((icon, i) => (
                    <div key={i} className="w-9 h-9 flex items-center justify-center text-xs text-white/80 hover:bg-white/20 rounded-[3px] cursor-default border border-transparent hover:border-white/30 transition-colors">
                       {icon}
                    </div>
                  ))}
               </div>
             )}

             <div className="flex-1 relative flex flex-col">
                {DecalComponent}

                {/* Holographic Sheen for Gamer/Retro */}
                {(theme?.type === ThemeType.GAMER || theme?.type === ThemeType.RETRO) && (
                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-30 pointer-events-none animate-pulse z-0"></div>
                )}

                {theme?.type === ThemeType.VISTA && (
                  <div className="h-5 bg-white border-b border-slate-300 flex items-end justify-between px-1 text-[9px] text-slate-400 font-mono shadow-[0_1px_2px_rgba(0,0,0,0.05)] relative z-10 shrink-0">
                    <span>0</span><span>{isLandscape ? '600' : '400'}</span>
                  </div>
                )}
                
                {/* TEXT CONTENT */}
                <div className="flex-1 flex items-center justify-center p-8 relative z-10 overflow-hidden">
                  <h3 
                    className="font-bold text-center drop-shadow-sm break-words leading-tight w-full select-none"
                    style={{ 
                      color: textColor,
                      fontFamily: fontFamily,
                      fontSize: `${frontBaseSize * fontSizeScale}rem`,
                      transform: `translate(${textOffsetX}px, ${textOffsetY}px) translateZ(1px)` 
                    }}
                  >
                    {data.front}
                  </h3>
                </div>

                {/* Bottom Info */}
                {theme?.type !== ThemeType.CYBERPUNK && (
                  <div className="absolute bottom-2 right-2 text-xs font-bold opacity-30 uppercase tracking-widest z-10" style={{ color: textColor }}>
                     VistaFlash UFE
                  </div>
                )}
             </div>
          </div>
          
          {/* Bottom Status Bar */}
          {theme?.type === ThemeType.VISTA && (
            <div className="h-8 bg-[#d4d4d4] border-t border-white flex items-center px-3 text-[11px] text-slate-700 gap-4 font-medium z-20 relative shrink-0">
              <span>Doc: 1.2M/1.2M</span>
              <span className="border-l border-slate-400 h-4"></span>
              <span>Click to Flip</span>
            </div>
          )}
        </div>

        {/* BACK SIDE */}
        <div 
           className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-sm overflow-hidden shadow-xl flex flex-col`}
           style={{ 
            border: `${borderBase} ${borderColor}`,
            background: backBg,
            backgroundColor: backBg.includes('gradient') ? undefined : backBg,
            transform: 'rotateY(180deg) translateZ(0)',
            zIndex: isFlipped ? 1 : 0
          }}
        >
          {Header}

          <div className="flex-1 flex relative overflow-hidden">
             {theme?.type === ThemeType.VISTA && (
               <div className="w-14 flex flex-col items-center py-3 gap-3 border-r border-black/20 shadow-[inset_-1px_0_0_rgba(255,255,255,0.1)] z-20 relative shrink-0" style={{ backgroundColor: uiColor }}>
                  {['T', 'P', 'A', 'Z', 'H'].map((icon, i) => (
                    <div key={i} className="w-9 h-9 flex items-center justify-center text-xs text-white/80 rounded-[3px] hover:bg-white/20 cursor-default">
                       {icon}
                    </div>
                  ))}
               </div>
             )}

             <div className="flex-1 relative flex flex-col">
                 {DecalComponent}
                 
                 {(theme?.type !== ThemeType.NOTEBOOK && theme?.type !== ThemeType.CYBERPUNK && theme?.type !== ThemeType.BLUEPRINT) && (
                   <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none h-24 z-10"></div>
                 )}

                 <div className="flex-1 flex items-center justify-center p-8 relative z-10">
                   <p 
                     className="font-medium text-center leading-snug break-words w-full select-none"
                     style={{ 
                       color: textColor,
                       fontFamily: fontFamily,
                       fontSize: `${backBaseSize * fontSizeScale}rem`,
                       transform: `translate(${textOffsetX}px, ${textOffsetY}px) translateZ(1px)`
                     }}
                   >
                     {data.back}
                   </p>
                 </div>
                 
             </div>
          </div>

          {theme?.type === ThemeType.VISTA && (
            <div className="h-8 bg-[#d4d4d4] border-t border-white flex items-center px-3 text-[11px] text-slate-700 font-medium z-20 relative shrink-0">
              <span>Layer 1 Copy</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
