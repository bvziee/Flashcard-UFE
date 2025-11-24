
import React from 'react';
import { CardTheme, ThemeType } from '../types';

interface ExportCardProps {
  id: string;
  text: string;
  type: 'Front' | 'Back';
  theme: CardTheme;
}

// --- DECALS FOR EXPORT ---

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
        <pattern id="gridE" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
        <pattern id="gridLargeE" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#gridE)" />
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gridLargeE)" />
    </svg>
    <div className="absolute top-2 left-2 border-l border-t border-white w-4 h-4"></div>
    <div className="absolute top-2 right-2 border-r border-t border-white w-4 h-4"></div>
    <div className="absolute bottom-2 left-2 border-l border-b border-white w-4 h-4"></div>
    <div className="absolute bottom-2 right-2 border-r border-b border-white w-4 h-4"></div>
  </div>
);

const HexPattern = () => (
  <div className="absolute inset-0 opacity-10 pointer-events-none">
     <svg width="100%" height="100%">
      <defs>
        <pattern id="hexE" width="20" height="34" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
           <path d="M10 0 L20 8.5 L20 25.5 L10 34 L0 25.5 L0 8.5 Z" fill="none" stroke="white" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexE)" />
     </svg>
  </div>
);

const BanknoteWatermarks = ({ color = "text-slate-600", opacity = "opacity-15" }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${opacity} ${color}`}>
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
    <svg className="absolute inset-0 w-full h-full opacity-50" preserveAspectRatio="none">
      <defs>
        <pattern id="securityWavesExport" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
           <path d="M0 20 Q 10 0 20 20 T 40 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
           <path d="M0 10 Q 10 -10 20 10 T 40 10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#securityWavesExport)" />
    </svg>
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
    <QRCodeDecal className="absolute top-2 right-2 w-16 h-16 opacity-50" />
  </div>
);

const NotebookLines = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <div className="absolute left-12 top-0 bottom-0 w-[2px] bg-red-300/50"></div>
    <div className="w-full h-full" style={{ background: 'repeating-linear-gradient(transparent, transparent 39px, #94a3b8 40px)' }}></div>
  </div>
);

export const ExportCard: React.FC<ExportCardProps> = ({ id, text, type, theme }) => {
  const isFront = type === 'Front';
  const isLandscape = theme.orientation === 'LANDSCAPE';
  
  const width = isLandscape ? '600px' : '400px';
  const height = isLandscape ? '400px' : '600px';

  // Theme Variables
  let bgStyle: React.CSSProperties = {};
  let borderBase = '16px solid'; 
  let defaultBorderColor = '#333';
  let defaultTextColor = '#000';
  let HeaderComponent = null;
  let DecalComponent = null;

  switch (theme.type) {
    case ThemeType.CYBERPUNK:
      bgStyle = { backgroundColor: '#050505' };
      defaultBorderColor = '#22c55e';
      borderBase = '4px solid';
      defaultTextColor = '#4ade80';
      DecalComponent = <CircuitDecal />;
      HeaderComponent = (
        <div className="h-8 bg-black border-b border-green-700 flex items-center justify-between px-4 shrink-0 z-20 relative">
          <span className="text-green-500 font-mono text-xs">SYSTEM.READY</span>
          <div className="flex gap-1">
             <div className="w-2 h-2 bg-green-500"></div>
             <div className="w-2 h-2 bg-green-900"></div>
          </div>
        </div>
      );
      break;

    case ThemeType.BLUEPRINT:
      bgStyle = { backgroundColor: '#1e3a8a' };
      defaultBorderColor = '#ffffff';
      borderBase = '4px double';
      defaultTextColor = '#ffffff';
      DecalComponent = <BlueprintGrid />;
      HeaderComponent = (
        <div className="h-10 border-b border-white flex items-center justify-between px-4 shrink-0 z-20 relative bg-[#1e3a8a]">
          <span className="text-white font-mono text-xs tracking-widest">PROJECT: UFE_V1</span>
          <span className="text-white/70 text-[10px]">SCALE: 1:1</span>
        </div>
      );
      break;

    case ThemeType.RETRO:
      bgStyle = { background: 'linear-gradient(to bottom, #2e0249 0%, #a91079 100%)' };
      defaultBorderColor = '#f806cc';
      borderBase = '6px solid';
      defaultTextColor = '#fee2e2';
      DecalComponent = (
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-gradient-to-t from-yellow-400 to-red-500 opacity-60 blur-sm"></div>
          <div className="absolute bottom-0 w-full h-1/2" style={{ background: 'linear-gradient(transparent 95%, #f806cc 100%)', backgroundSize: '100% 20px' }}></div>
        </div>
      );
      HeaderComponent = (
        <div className="h-8 bg-black/40 border-b border-pink-500 flex items-center justify-center shrink-0 z-20 relative">
          <span className="text-yellow-300 font-bold italic tracking-widest text-sm" style={{ fontFamily: '"Oswald", sans-serif' }}>V A P O R W A V E</span>
        </div>
      );
      break;

    case ThemeType.GAMER:
      bgStyle = { backgroundColor: '#111111' };
      defaultBorderColor = '#7c3aed';
      borderBase = '8px solid';
      defaultTextColor = '#e2e8f0';
      DecalComponent = <HexPattern />;
      HeaderComponent = (
        <div className="h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 flex items-center justify-between px-2 shrink-0 z-20 relative">
          <span className="text-white font-bold text-xs uppercase italic">Level UP</span>
          <div className="flex gap-0.5">
             <div className="w-8 h-2 bg-yellow-400 skew-x-12"></div>
             <div className="w-4 h-2 bg-yellow-400/50 skew-x-12"></div>
          </div>
        </div>
      );
      break;

    case ThemeType.BRUTALIST:
      bgStyle = { backgroundColor: '#e5e5e5' };
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
      HeaderComponent = (
        <div className="h-14 bg-black text-white flex items-end p-2 shrink-0 z-20 relative">
           <h1 className="text-2xl font-black leading-none uppercase">Raw Data</h1>
        </div>
      );
      break;

    case ThemeType.SWISS:
      bgStyle = { backgroundColor: '#ffffff' };
      defaultBorderColor = '#ef4444';
      borderBase = '20px solid';
      defaultTextColor = '#000000';
      DecalComponent = (
        <div className="absolute inset-0 pointer-events-none opacity-5">
           <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-red-600"></div>
           <div className="absolute top-1/2 right-10 w-20 h-20 bg-black rotate-45"></div>
        </div>
      );
      HeaderComponent = (
         <div className="absolute top-4 left-4 z-20">
            <div className="w-8 h-8 bg-red-600 text-white flex items-center justify-center font-bold text-lg">+</div>
         </div>
      );
      break;

    case ThemeType.MACOS:
      bgStyle = { background: 'linear-gradient(to bottom, #e0e0e0 0%, #d0d0d0 100%)' };
      defaultBorderColor = '#a0a0a0';
      borderBase = '6px solid';
      defaultTextColor = '#1c1c1e';
      HeaderComponent = (
        <div className="h-8 bg-gradient-to-b from-[#f6f6f6] to-[#dcdcdc] border-b border-[#b4b4b4] flex items-center px-4 gap-2 shrink-0">
           <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]"></div>
           <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24]"></div>
           <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]"></div>
           <span className="mx-auto text-xs font-sans text-slate-600 font-semibold drop-shadow-sm">Study Deck - {type}</span>
        </div>
      );
      break;
    case ThemeType.NOTEBOOK:
      bgStyle = { backgroundColor: '#fef9c3' }; 
      defaultBorderColor = '#9ca3af';
      borderBase = '2px dashed'; 
      defaultTextColor = '#1e293b';
      DecalComponent = <NotebookLines />;
      HeaderComponent = (
        <div className="h-12 bg-[#333] flex items-center justify-between px-4 shadow-md z-20 relative shrink-0">
           <div className="text-white font-serif italic text-lg">Notes</div>
           <div className="text-white/50 text-xs">{type}</div>
        </div>
      );
      break;
    case ThemeType.FINANCE:
      bgStyle = { backgroundColor: '#f0fdf4' }; 
      defaultBorderColor = '#14532d';
      borderBase = '12px double'; 
      defaultTextColor = '#064e3b';
      DecalComponent = <BanknoteWatermarks color="text-green-800" opacity="opacity-20" />;
      HeaderComponent = (
        <div className="h-8 bg-[#14532d] flex items-center justify-center px-2 border-b-2 border-[#fbbf24] shrink-0">
           <span className="text-[#fbbf24] font-serif font-bold tracking-widest uppercase text-xs">Wall Street Finance</span>
        </div>
      );
      break;
    case ThemeType.UFE:
      bgStyle = { background: 'white' };
      defaultBorderColor = '#1e3a8a';
      borderBase = '16px solid'; 
      defaultTextColor = '#172554';
      DecalComponent = <BanknoteWatermarks color="text-blue-900" opacity="opacity-20" />;
      HeaderComponent = (
        <div className="h-10 bg-[#1e3a8a] flex items-center justify-between px-4 shadow-sm shrink-0">
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
      defaultBorderColor = '#64748b';
      borderBase = '16px solid'; 
      defaultTextColor = '#0f172a';
      DecalComponent = <BanknoteWatermarks color="text-slate-500" opacity="opacity-15" />;
      HeaderComponent = (
        <div className="h-9 bg-[#e4e4e4] border-b border-[#a0a0a0] flex items-center px-3 gap-2 z-20 relative shrink-0">
           <div className="w-3 h-3 rounded-full bg-blue-400 border border-blue-600 shadow-inner"></div>
           <span className="text-xs font-sans text-slate-700 font-bold tracking-wide">VistaFlash - {type}</span>
        </div>
      );
      break;
  }

  const finalBorderColor = theme.customBorderColor || defaultBorderColor;
  const finalTextColor = theme.customTextColor || defaultTextColor;
  const finalFontFamily = theme.fontFamily || (theme.type === ThemeType.CYBERPUNK || theme.type === ThemeType.BLUEPRINT ? '"Courier New", monospace' : '"Times New Roman", serif');
  
  const frontBaseSize = isLandscape ? 3.5 : 4.5;
  const backBaseSize = isLandscape ? 1.8 : 2.5;
  const baseSizeRem = isFront ? frontBaseSize : backBaseSize;
  
  const scale = theme.fontSizeScale || 1;
  const finalFontSize = `${baseSizeRem * scale}rem`;
  const offsetX = theme.textOffsetX || 0;
  const offsetY = theme.textOffsetY || 0;

  return (
    <div 
      className="relative flex flex-col overflow-hidden shadow-none box-border"
      style={{ 
        width, 
        height, 
        ...bgStyle, 
        border: `${borderBase} ${finalBorderColor}` 
      }} 
    >
      {HeaderComponent}

      <div className="flex-1 flex relative overflow-hidden">
         {/* Toolbar */}
         {(theme.type === ThemeType.VISTA) && (
           <div className="w-10 flex flex-col items-center py-2 gap-2 border-r border-black/10 bg-black/5 z-20 relative shrink-0">
              {['T', 'V', 'C'].map((icon, i) => (
                <div key={i} className="w-6 h-6 flex items-center justify-center text-[10px] text-slate-500 border border-slate-400 bg-white/50">
                   {icon}
                </div>
              ))}
           </div>
         )}

         {/* Content Canvas */}
         <div className="flex-1 relative flex flex-col">
             {DecalComponent}
             <div className="flex-1 flex items-center justify-center p-6 relative z-10 overflow-hidden">
                <div 
                   className="font-bold text-center leading-tight break-words w-full"
                   style={{ 
                     color: finalTextColor,
                     fontFamily: finalFontFamily,
                     fontSize: finalFontSize,
                     transform: `translate(${offsetX}px, ${offsetY}px)`
                   }}
                >
                  {text}
                </div>
             </div>

             {/* Footer Info */}
             <div className="absolute bottom-1 right-2 text-[8px] font-bold opacity-40 uppercase tracking-widest z-10" style={{ color: finalTextColor }}>
                VistaFlash Export
             </div>
         </div>
      </div>
      
      {/* Bottom Status */}
      {(theme.type === ThemeType.VISTA) && (
        <div className="h-6 bg-gray-200 border-t border-gray-300 flex items-center px-2 text-[9px] text-slate-600 shrink-0 z-20 relative">
           <span>Page {type === 'Front' ? '1' : '2'}</span>
        </div>
      )}
    </div>
  );
};
