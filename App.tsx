
import React, { useState, useEffect, useRef } from 'react';
import { VistaWindow } from './components/VistaWindow';
import { VistaButton } from './components/VistaButton';
import { Flashcard } from './components/Flashcard';
import { ExportCard } from './components/ExportCard';
import { FlashcardData, CardTheme } from './types';
import { generateFlashcardsFromTopic } from './services/geminiService';

// Initial Mock Data
const INITIAL_CARDS: FlashcardData[] = [
  { id: '1', front: 'Hello', back: 'Сайн байна уу (Sain baina uu)' },
  { id: '2', front: 'Thank you', back: 'Баярлалаа (Bayarlalaa)' },
  { id: '3', front: 'Water', back: 'Ус (Us)' },
];

const DEFAULT_THEME: CardTheme = {
  frontBg: '#ffffff',
  // Switched from yellow notebook to Vista Dialog Blue/Grey gradient
  backBg: 'linear-gradient(to bottom, #ffffff 0%, #e6eef4 100%)',
  textColor: '#1e293b',
  headerFront: '#2b2b2b', 
  headerBack: '#facc15'
};

const PALETTE_COLORS = [
  '#ffffff', 
  'linear-gradient(to bottom, #ffffff 0%, #e6eef4 100%)', // Vista Blue
  'linear-gradient(to bottom, #f0f0f0 0%, #dcdcdc 100%)', // Vista Silver
  '#1f2937',
  '#fef2f2', '#f0fdf4', '#eff6ff', '#fffbeb'
];

export default function App() {
  // State
  const [cards, setCards] = useState<FlashcardData[]>(INITIAL_CARDS);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(INITIAL_CARDS[0].id);
  const [theme, setTheme] = useState<CardTheme>(DEFAULT_THEME);
  
  // Generator State
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Export State
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState('');
  const exportContainerRef = useRef<HTMLDivElement>(null);

  // Derived State
  const selectedCard = cards.find(c => c.id === selectedCardId) || cards[0];

  // Handlers
  const handleCardSelect = (id: string) => setSelectedCardId(id);

  const handleUpdateCard = (field: 'front' | 'back', value: string) => {
    if (!selectedCard) return;
    const updatedCards = cards.map(c => 
      c.id === selectedCard.id ? { ...c, [field]: value } : c
    );
    setCards(updatedCards);
  };

  const handleAddCard = () => {
    const newCard: FlashcardData = {
      id: `new-${Date.now()}`,
      front: 'New Card',
      back: 'Back Text'
    };
    setCards([...cards, newCard]);
    setSelectedCardId(newCard.id);
  };

  const handleDeleteCard = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newCards = cards.filter(c => c.id !== id);
    setCards(newCards);
    if (selectedCardId === id && newCards.length > 0) {
      setSelectedCardId(newCards[0].id);
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    try {
      const generated = await generateFlashcardsFromTopic(topic);
      const newCards = generated.map((c, i) => ({
        id: `gen-${Date.now()}-${i}`,
        front: c.front,
        back: c.back
      }));
      setCards(prev => [...prev, ...newCards]);
      setTopic('');
      if (newCards.length > 0) setSelectedCardId(newCards[0].id);
    } catch (err) {
      alert("Failed to generate cards");
    } finally {
      setIsGenerating(false);
    }
  };

  // --- EXPORT FUNCTIONS ---
  const prepareExport = async () => {
    const jspdf = (window as any).jspdf;
    const html2canvas = (window as any).html2canvas;
    if (!jspdf || !html2canvas) {
      alert("Export libraries are loading...");
      return false;
    }
    if (cards.length === 0) return false;
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  };

  const handleExportPDF = async () => {
    if (!(await prepareExport())) return;
    try {
      setExportStatus('Rendering PDF...');
      const { jsPDF } = (window as any).jspdf;
      const doc = new jsPDF({ orientation: 'portrait', unit: 'in', format: [4, 6] });

      if (exportContainerRef.current) {
        const elements = Array.from(exportContainerRef.current.children);
        for (let i = 0; i < elements.length; i++) {
          const el = elements[i] as HTMLElement;
          const canvas = await (window as any).html2canvas(el, {
            scale: 2, backgroundColor: null, useCORS: true, width: 400, height: 600
          });
          const imgData = canvas.toDataURL('image/png');
          if (i > 0) doc.addPage();
          doc.addImage(imgData, 'PNG', 0, 0, 4, 6);
        }
      }
      doc.save('VistaFlash_UFE_Deck.pdf');
    } catch (e) { console.error(e); } 
    finally { setIsExporting(false); setExportStatus(''); }
  };

  const handleExportPNG = async () => {
    if (!(await prepareExport())) return;
    const JSZip = (window as any).JSZip;
    try {
      setExportStatus('Zipping PNGs...');
      const zip = new JSZip();
      const folder = zip.folder("VistaFlash_Cards");
      if (exportContainerRef.current) {
        const elements = Array.from(exportContainerRef.current.children);
        for (let i = 0; i < elements.length; i++) {
          const el = elements[i] as HTMLElement;
          const canvas = await (window as any).html2canvas(el, {
             scale: 2, backgroundColor: null, useCORS: true, width: 400, height: 600
          });
          const imgData = canvas.toDataURL('image/png').split(',')[1];
          const side = i % 2 === 0 ? 'Front' : 'Back';
          const idx = Math.floor(i / 2) + 1;
          folder.file(`Card_${idx}_${side}.png`, imgData, { base64: true });
        }
      }
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = "VistaFlash_Export.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) { console.error(e); }
    finally { setIsExporting(false); setExportStatus(''); }
  };

  const updateTheme = (key: keyof CardTheme, val: string) => setTheme(p => ({ ...p, [key]: val }));

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center -z-50"></div>
      
      <VistaWindow title="VistaFlash Studio - UFE Edition">
        {/* Main Studio Layout */}
        <div className="flex h-full overflow-hidden bg-[#f0f0f0]">
          
          {/* LEFT PANEL: LAYERS (Card List) */}
          <div className="w-64 flex flex-col border-r border-[#a0a0a0] bg-[#ececec] shadow-[inset_-1px_0_0_white]">
            <div className="p-2 bg-gradient-to-b from-[#f7f7f7] to-[#e3e3e3] border-b border-[#a0a0a0] flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700 pl-1">LAYERS</span>
              <button onClick={handleAddCard} className="px-2 py-0.5 bg-white border border-slate-400 rounded shadow-sm text-xs hover:bg-blue-50">
                + New Layer
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {cards.map((card, idx) => (
                <div 
                  key={card.id}
                  onClick={() => handleCardSelect(card.id)}
                  className={`flex items-center gap-2 p-2 rounded border cursor-pointer group transition-all
                    ${selectedCardId === card.id 
                      ? 'bg-blue-600 border-blue-800 text-white shadow-inner' 
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-blue-50'}
                  `}
                >
                  <div className="w-4 h-4 flex items-center justify-center bg-white/20 rounded border border-white/30 text-[8px]">
                    👁
                  </div>
                  <div className="flex-1 truncate text-xs font-medium">
                    {card.front || <i>Empty Layer</i>}
                  </div>
                  <button 
                    onClick={(e) => handleDeleteCard(e, card.id)}
                    className={`w-4 h-4 flex items-center justify-center rounded hover:bg-red-500 hover:text-white text-[10px]
                      ${selectedCardId === card.id ? 'text-white/70' : 'text-slate-400'}
                    `}
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>
            {/* AI Generator Mini-Panel */}
            <div className="p-3 border-t border-[#a0a0a0] bg-[#e3e3e3]">
               <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Auto-Gen Layers</label>
               <div className="flex gap-1">
                 <input 
                   className="w-full text-xs p-1 border border-slate-400 rounded-sm"
                   placeholder="Topic..."
                   value={topic}
                   onChange={e => setTopic(e.target.value)}
                 />
                 <button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="bg-gradient-to-b from-green-100 to-green-200 border border-green-400 text-green-800 text-xs px-2 rounded-sm hover:brightness-95"
                 >
                   ⚡
                 </button>
               </div>
            </div>
          </div>

          {/* CENTER PANEL: CANVAS (Preview) */}
          <div className="flex-1 bg-[#808080] relative flex flex-col overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
            {/* Ruler / Status Bar Top */}
            <div className="h-6 bg-[#f0f0f0] border-b border-slate-400 flex items-center px-2 text-[10px] text-slate-500 select-none">
               <span>Canvas: 400px x 600px (Portrait) @ 100%</span>
               <span className="ml-auto">{isExporting ? `EXPORTING: ${exportStatus}` : 'Ready'}</span>
            </div>

            {/* Viewport */}
            <div className="flex-1 overflow-auto flex items-center justify-center p-8 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAIklEQVQYlWNgYGBgWLhw4X8QDwJIsQCN06Awqow8e/YsBADs0x0N+uP/yQAAAABJRU5ErkJggg==')]">
              {selectedCard ? (
                <Flashcard 
                  data={selectedCard} 
                  theme={theme} 
                  className="shadow-2xl transition-all duration-300"
                />
              ) : (
                <div className="text-white/50 font-bold text-xl">No Layer Selected</div>
              )}
            </div>
            
            {/* Export Toolbar Bottom */}
            <div className="h-10 bg-[#d4d4d4] border-t border-white flex items-center justify-center gap-4">
              <VistaButton onClick={handleExportPDF} disabled={isExporting} className="shadow-lg">Export PDF Deck</VistaButton>
              <VistaButton onClick={handleExportPNG} disabled={isExporting} className="shadow-lg">Export PNG Deck</VistaButton>
            </div>
          </div>

          {/* RIGHT PANEL: PROPERTIES & THEME */}
          <div className="w-72 bg-[#ececec] border-l border-[#a0a0a0] flex flex-col shadow-[inset_1px_0_0_white]">
            
            {/* Properties Tab */}
            <div className="flex flex-col h-1/2 border-b border-[#a0a0a0]">
              <div className="bg-gradient-to-b from-[#f7f7f7] to-[#e3e3e3] p-1 border-b border-[#a0a0a0]">
                 <span className="text-xs font-bold text-slate-700 pl-1">CHARACTER</span>
              </div>
              <div className="p-4 space-y-4 overflow-y-auto bg-[#f4f4f4]">
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Front Text</label>
                    <textarea 
                      className="w-full h-20 p-2 text-sm border border-slate-400 shadow-inner resize-none focus:border-blue-500 outline-none font-serif"
                      value={selectedCard?.front || ''}
                      onChange={(e) => handleUpdateCard('front', e.target.value)}
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Back Text</label>
                    <textarea 
                      className="w-full h-20 p-2 text-sm border border-slate-400 shadow-inner resize-none focus:border-blue-500 outline-none"
                      value={selectedCard?.back || ''}
                      onChange={(e) => handleUpdateCard('back', e.target.value)}
                    />
                 </div>
              </div>
            </div>

            {/* Theme Tab */}
            <div className="flex flex-col h-1/2">
               <div className="bg-gradient-to-b from-[#f7f7f7] to-[#e3e3e3] p-1 border-b border-[#a0a0a0] border-t border-white">
                 <span className="text-xs font-bold text-slate-700 pl-1">SWATCHES</span>
              </div>
              <div className="p-4 bg-[#f4f4f4] flex-1 overflow-y-auto">
                 <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                       <label className="text-[10px] text-slate-500 block mb-1">Front BG</label>
                       <div className="h-8 border border-slate-400 cursor-pointer shadow-sm" style={{background: theme.frontBg}} />
                    </div>
                    <div>
                       <label className="text-[10px] text-slate-500 block mb-1">Text Color</label>
                       <div className="h-8 border border-slate-400 cursor-pointer shadow-sm" style={{background: theme.textColor}} />
                    </div>
                 </div>
                 
                 <label className="text-[10px] text-slate-500 block mb-1">Palette</label>
                 <div className="grid grid-cols-4 gap-1 bg-white border border-slate-300 p-1">
                    {PALETTE_COLORS.map((c, i) => (
                      <button
                        key={i}
                        className="w-full aspect-square border border-slate-200 hover:border-blue-500 hover:scale-110 transition-transform"
                        style={{background: c}}
                        onClick={() => updateTheme('frontBg', c)}
                        onContextMenu={(e) => { e.preventDefault(); updateTheme('backBg', c); }}
                        title="Left Click: Front BG | Right Click: Back BG"
                      />
                    ))}
                 </div>
                 <p className="text-[9px] text-slate-400 mt-2 text-center">
                    Left click for Front BG. Right click for Back BG.
                 </p>
              </div>
            </div>

          </div>
        </div>

        {/* Render Container for Export */}
        <div ref={exportContainerRef} style={{ position: 'fixed', left: '-9999px', top: 0 }}>
           {isExporting && cards.flatMap(card => [
             <ExportCard key={`${card.id}-F`} text={card.front} type="Front" theme={theme} />,
             <ExportCard key={`${card.id}-B`} text={card.back} type="Back" theme={theme} />
           ])}
        </div>

      </VistaWindow>
    </div>
  );
}
