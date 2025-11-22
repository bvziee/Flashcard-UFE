import React from 'react';

interface VistaWindowProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
}

export const VistaWindow: React.FC<VistaWindowProps> = ({ title, children, icon, onClose }) => {
  return (
    <div className="relative w-full max-w-4xl h-[80vh] flex flex-col rounded-t-[8px] rounded-b-[4px] shadow-[0_0_0_1px_rgba(255,255,255,0.3),0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden animate-fade-in-up">
      
      {/* Aero Glass Background Layer */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl -z-10"></div>
      
      {/* Reflection/Shine Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/5 to-transparent pointer-events-none -z-10"></div>

      {/* Window Title Bar */}
      <div className="h-8 flex items-center justify-between px-2 select-none cursor-default">
        {/* Title & Icon */}
        <div className="flex items-center gap-2 text-white/90 text-shadow-sm">
          {icon || <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-300 to-blue-600 shadow-inner border border-white/50"></div>}
          <span className="text-sm font-medium tracking-wide drop-shadow-md" style={{ textShadow: '0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(0,0,0,0.5)' }}>{title}</span>
        </div>

        {/* Window Controls */}
        <div className="flex items-center gap-1">
          {/* Minimize */}
          <div className="w-7 h-5 rounded-[2px] flex items-end justify-center pb-1 bg-white/10 hover:bg-white/30 border border-transparent hover:border-white/40 transition-colors cursor-pointer shadow-inner">
             <div className="w-2 h-[2px] bg-white/90"></div>
          </div>
          {/* Maximize */}
          <div className="w-7 h-5 rounded-[2px] flex items-center justify-center bg-white/10 hover:bg-white/30 border border-transparent hover:border-white/40 transition-colors cursor-pointer shadow-inner">
             <div className="w-2.5 h-2 border-[1.5px] border-white/90"></div>
          </div>
          {/* Close */}
          <div 
            className="w-11 h-5 rounded-[2px] flex items-center justify-center bg-gradient-to-b from-[#e8a2a2] to-[#c44444] border border-[#942323] hover:brightness-110 transition-all cursor-pointer shadow-[inset_0_1px_0_rgba(255,150,150,0.5)]"
            onClick={onClose}
          >
             <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M1 1L9 9M9 1L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
             </svg>
          </div>
        </div>
      </div>

      {/* Address Bar / Toolbar Area (Mock) */}
      <div className="bg-[#fcfdfe] px-3 py-2 flex items-center gap-2 border-b border-[#aebcd0]">
        <div className="flex gap-2">
           <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-600/40 flex items-center justify-center cursor-pointer hover:bg-green-500/30">
              <span className="text-green-700 text-lg leading-none mb-1">←</span>
           </div>
           <div className="w-6 h-6 rounded-full bg-gray-300/20 border border-gray-400/40 flex items-center justify-center cursor-not-allowed opacity-50">
              <span className="text-gray-600 text-lg leading-none mb-1">→</span>
           </div>
        </div>
        
        {/* Address Input */}
        <div className="flex-1 h-7 bg-white border border-[#7a98b5] rounded-[2px] flex items-center px-2 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
            <div className="w-3 h-3 mr-2 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-[1px] border border-orange-600/50"></div>
            <span className="text-xs text-slate-700 font-sans">Computer ► {title}</span>
        </div>

         {/* Search Input */}
         <div className="w-48 h-7 bg-white border border-[#7a98b5] rounded-[2px] flex items-center px-2 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
            <span className="text-xs text-slate-400 font-sans italic">Search...</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#f0f6fb] relative overflow-hidden flex">
         {/* Sidebar (Organize/Favorite Links mock) */}
         <div className="w-48 bg-gradient-to-b from-[#f1f5fb] to-[#eef3fa] border-r border-[#d9e0ea] p-4 hidden md:block">
            <div className="mb-6">
              <h3 className="text-[11px] font-bold text-[#1e395b] uppercase tracking-wider mb-2 opacity-60">Favorite Links</h3>
              <ul className="space-y-1">
                <li className="flex items-center gap-2 p-1 hover:bg-[#e5f3fb] rounded cursor-pointer border border-transparent hover:border-[#cce8ff]">
                   <span className="w-4 h-4 bg-yellow-400/80 rounded-sm"></span>
                   <span className="text-[12px] text-[#1e395b]">Documents</span>
                </li>
                <li className="flex items-center gap-2 p-1 hover:bg-[#e5f3fb] rounded cursor-pointer border border-transparent hover:border-[#cce8ff]">
                   <span className="w-4 h-4 bg-blue-400/80 rounded-sm"></span>
                   <span className="text-[12px] text-[#1e395b]">Recent Places</span>
                </li>
              </ul>
            </div>
            <div>
               <h3 className="text-[11px] font-bold text-[#1e395b] uppercase tracking-wider mb-2 opacity-60">Folders</h3>
               <div className="text-[11px] text-[#1e395b] pl-2">
                  Details...
               </div>
            </div>
         </div>

         {/* Actual App Content */}
         <div className="flex-1 p-6 overflow-y-auto relative">
            {children}
         </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#f0f0f0] border-t border-[#d9d9d9] flex items-center px-3 gap-4 text-[11px] text-slate-600">
         <span>{title} Status: Ready</span>
         <span className="border-l border-gray-300 h-3"></span>
         <span>Computer</span>
      </div>
    </div>
  );
};