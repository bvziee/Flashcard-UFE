import React, { useState, useRef } from 'react';
import { VistaWindow } from './components/VistaWindow';
import { VistaButton } from './components/VistaButton';
import { ExportCard } from './components/ExportCard';
import { FlashcardData, CardTheme, ThemeType } from './types';

// Initial Mock Data
const INITIAL_CARDS: FlashcardData[] = [
  { id: '1', front: 'Asset', back: 'Хөрөнгө (Khorongo)' },
  { id: '2', front: 'Liability', back: 'Өр төлбөр (Or tolbor)' },
  { id: '3', front: 'Equity', back: 'Эздийн өмч (Ezdiin omch)' },
  { id: '4', front: 'Revenue', back: 'Орлого (Orlogo)' },
  { id: '5', front: 'Expense', back: 'Зардал (Zardal)' },
  { id: '6', front: 'Audit', back: 'Аудит (Audit)' },
  { id: '7', front: 'Budget', back: 'Төсөв (Tosov)' },
  { id: '8', front: 'Tax', back: 'Татвар (Tatvar)' },
];

interface GridOption {
  label: string;
  rows: number;
  cols: number;
}

const GRID_OPTIONS: GridOption[] = [
  { label: '1x1 (1/Page)', rows: 1, cols: 1 },
  { label: '1x2 (2/Page)', rows: 1, cols: 2 },
  { label: '2x2 (4/Page)', rows: 2, cols: 2 },
  { label: '2x4 (8/Page)', rows: 4, cols: 2 },
  { label: '3x3 (9/Page)', rows: 3, cols: 3 },
  { label: '4x4 (16/Page)', rows: 4, cols: 4 },
];

export default function App() {
  // State
  const [cards, setCards] = useState<FlashcardData[]>(INITIAL_CARDS);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(INITIAL_CARDS[0].id);
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>(ThemeType.VISTA);
  
  // Export State
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState('');
  const [gridConfig, setGridConfig] = useState<GridOption>(GRID_OPTIONS[3]); // Default 2x4
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
      front: 'New Term',
      back: 'Translation'
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

  // --- EXPORT FUNCTIONS (Dynamic Grid) ---
  const handleExportA4 = async () => {
    const jspdf = (window as any).jspdf;
    const html2canvas = (window as any).html2canvas;
    if (!jspdf || !html2canvas) {
      alert("Export libraries are loading...");
      return;
    }
    if (cards.length === 0) return;

    setIsExporting(true);
    setExportStatus('Generating PDF...');

    try {
      // Wait for DOM to render hidden cards
      await new Promise(resolve => setTimeout(resolve, 800));

      const { jsPDF } = jspdf;
      // A4 Portrait: 210mm x 297mm
      const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
      
      // Dynamic Configuration from State
      const { rows, cols } = gridConfig;
      const cardsPerPage = rows * cols;
      
      // A4 Dimensions & Margins
      const pageWidth = 210;
      const pageHeight = 297;
      const marginX = 10;
      const marginY = 10;
      
      // Calculate Cell Size
      const availableWidth = pageWidth - (2 * marginX);
      const availableHeight = pageHeight - (2 * marginY);
      const cellWidth = availableWidth / cols;
      const cellHeight = availableHeight / rows;

      // Determine Optimal Card Dimensions (Maintain 2:3 Aspect Ratio)
      // Ratio 2:3 = 0.666...
      const CARD_RATIO = 400 / 600;
      
      let finalCardWidth = cellWidth;
      let finalCardHeight = finalCardWidth / CARD_RATIO;

      // If calculated height exceeds cell height, fit by height instead
      if (finalCardHeight > cellHeight) {
        finalCardHeight = cellHeight;
        finalCardWidth = finalCardHeight * CARD_RATIO;
      }

      // Add some padding inside the cell so cards don't touch
      const PADDING_SCALE = 0.95; 
      finalCardWidth *= PADDING_SCALE;
      finalCardHeight *= PADDING_SCALE;

      // Calculate spacing to center card in cell
      const xCenteredOffset = (cellWidth - finalCardWidth) / 2;
      const yCenteredOffset = (cellHeight - finalCardHeight) / 2;

      const elements = Array.from(exportContainerRef.current?.children || []);
      const frontElements = elements.filter((_, i) => i % 2 === 0);
      const backElements = elements.filter((_, i) => i % 2 !== 0);

      // Helper to process a batch of cards onto a page
      const processPage = async (cardEls: Element[]) => {
        for (let i = 0; i < cardEls.length; i++) {
          const el = cardEls[i] as HTMLElement;
          
          // High quality capture
          const canvas = await html2canvas(el, {
            scale: 2, 
            backgroundColor: null,
            useCORS: true,
            logging: false
          });
          const imgData = canvas.toDataURL('image/png');

          // Position in Grid
          // i is index within the current batch (0 to cardsPerPage-1)
          const colIndex = i % cols; 
          const rowIndex = Math.floor(i / cols); 
          
          const xPos = marginX + (colIndex * cellWidth) + xCenteredOffset;
          const yPos = marginY + (rowIndex * cellHeight) + yCenteredOffset;
          
          doc.addImage(imgData, 'PNG', xPos, yPos, finalCardWidth, finalCardHeight);
        }
      };

      // Loop through cards in chunks based on selected grid size
      for (let i = 0; i < cards.length; i += cardsPerPage) {
        const chunkFronts = frontElements.slice(i, i + cardsPerPage);
        const chunkBacks = backElements.slice(i, i + cardsPerPage);

        // Page: Fronts
        if (i > 0) doc.addPage();
        doc.setFontSize(9);
        doc.setTextColor(100);
        doc.text(`Fronts - Batch ${Math.floor(i/cardsPerPage) + 1} (${gridConfig.label})`, 10, 6);
        await processPage(chunkFronts);
        
        // Page: Backs
        doc.addPage();
        doc.text(`Backs - Batch ${Math.floor(i/cardsPerPage) + 1} (${gridConfig.label})`, 10, 6);
        await processPage(chunkBacks);
      }

      doc.save(`VistaFlash_Deck_${gridConfig.rows}x${gridConfig.cols}.pdf`);

    } catch (e) {
      console.error(e);
      alert("Export failed. See console.");
    } finally {
      setIsExporting(false);
      setExportStatus('');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center -z-50"></div>
      
      <VistaWindow title="VistaFlash Studio - UFE Edition">
        {/* Main Studio Layout */}
        <div className="flex h-full overflow-hidden bg-[#f0f0f0]">
          
          {/* LEFT PANEL: LAYERS & ACTIONS */}
          <div className="w-64 flex flex-col border-r border-[#a0a0a0] bg-[#ececec] shadow-[inset_-1px_0_0_white]">
             {/* Export Controls */}
             <div className="p-3 bg-blue-100 border-b border-blue-200">
                <div className="mb-2 flex items-center justify-between">
                   <label className="text-[10px] font-bold text-blue-800 uppercase">Grid Layout</label>
                   <select 
                      value={GRID_OPTIONS.indexOf(gridConfig)}
                      onChange={(e) => setGridConfig(GRID_OPTIONS[parseInt(e.target.value)])}
                      className="text-xs p-1 border border-blue-300 rounded bg-white text-blue-900 outline-none focus:border-blue-500"
                   >
                      {GRID_OPTIONS.map((opt, idx) => (
                         <option key={idx} value={idx}>{opt.label}</option>
                      ))}
                   </select>
                </div>
                <VistaButton 
                  onClick={handleExportA4} 
                  disabled={isExporting} 
                  variant="primary" 
                  className="w-full shadow-md font-bold"
                >
                  {isExporting ? 'Building PDF...' : 'Export A4 Sheet'}
                </VistaButton>
                <p className="text-[9px] text-slate-500 mt-1 text-center">
                   Fit: {gridConfig.rows}x{gridConfig.cols} Grid • Auto-Scale
                </p>
            </div>

            <div className="p-2 bg-gradient-to-b from-[#f7f7f7] to-[#e3e3e3] border-b border-[#a0a0a0] flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700 pl-1">LAYERS</span>
              <button onClick={handleAddCard} className="px-2 py-0.5 bg-white border border-slate-400 rounded shadow-sm text-xs hover:bg-blue-50">
                + New
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {cards.map((card) => (
                <div 
                  key={card.id}
                  onClick={() => handleCardSelect(card.id)}
                  className={`flex items-center gap-2 p-2 rounded border cursor-pointer group transition-all
                    ${selectedCardId === card.id 
                      ? 'bg-blue-600 border-blue-800 text-white shadow-inner' 
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-blue-50'}
                  `}
                >
                  <div className="w-4 h-4 flex items-center justify-center bg-white/20 rounded border border-white/30 text-[8px]">T</div>
                  <div className="flex-1 truncate text-xs font-medium font-serif">
                    {card.front || <i>Empty</i>}
                  </div>
                  <button 
                    onClick={(e) => handleDeleteCard(e, card.id)}
                    className={`w-4 h-4 flex items-center justify-center rounded hover:bg-red-500 hover:text-white text-[10px]
                      ${selectedCardId === card.id ? 'text-white/70' : 'text-slate-400'}
                    `}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER PANEL: THEME SELECTOR */}
          <div className="flex-1 bg-[#e0e0e0] flex flex-col shadow-inner p-6 overflow-y-auto">
             <h2 className="text-lg font-bold text-slate-700 mb-4 drop-shadow-sm">Select Theme</h2>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {Object.values(ThemeType).map((t) => (
                  <div 
                    key={t}
                    onClick={() => setSelectedTheme(t)}
                    className={`relative h-40 rounded-lg border-4 cursor-pointer transition-all transform hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center overflow-hidden
                      ${selectedTheme === t ? 'border-blue-500 ring-2 ring-blue-300' : 'border-white'}
                    `}
                  >
                     {/* Theme Mini-Previews */}
                     <div className={`absolute inset-0 ${
                        t === ThemeType.VISTA ? 'bg-gradient-to-b from-white to-blue-50' :
                        t === ThemeType.MACOS ? 'bg-gradient-to-b from-gray-100 to-gray-300' :
                        t === ThemeType.NOTEBOOK ? 'bg-yellow-100' :
                        t === ThemeType.FINANCE ? 'bg-green-50' :
                        'bg-blue-900' // UFE
                     }`}>
                        {/* Decal Preview */}
                        {(t === ThemeType.UFE || t === ThemeType.FINANCE || t === ThemeType.VISTA) && (
                           <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                              <div className="w-20 h-20 rounded-full border-2 border-current flex items-center justify-center text-4xl font-serif">₮</div>
                           </div>
                        )}
                     </div>
                     
                     <span className={`relative z-10 font-bold px-3 py-1 rounded shadow-sm backdrop-blur-sm
                        ${t === ThemeType.UFE ? 'bg-white text-blue-900' : 'bg-black/70 text-white'}
                     `}>
                        {t}
                     </span>
                  </div>
                ))}
             </div>
             
             <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded text-blue-800 text-sm">
                <strong>Print Info:</strong> Export generates an A4 PDF.<br/>
                Current Grid: <strong>{gridConfig.label}</strong> ({gridConfig.rows} rows x {gridConfig.cols} cols).<br/>
                Dimensions are automatically scaled to fit the page efficiently.
             </div>
          </div>

          {/* RIGHT PANEL: EDITOR INPUTS */}
          <div className="w-72 bg-[#ececec] border-l border-[#a0a0a0] flex flex-col shadow-[inset_1px_0_0_white]">
             <div className="bg-gradient-to-b from-[#f7f7f7] to-[#e3e3e3] p-2 border-b border-[#a0a0a0]">
                 <span className="text-xs font-bold text-slate-700 pl-1">EDITOR (Times New Roman)</span>
              </div>
              
              <div className="p-4 space-y-6 overflow-y-auto bg-[#f4f4f4] flex-1">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Front Content</label>
                    <textarea 
                      className="w-full h-32 p-3 text-lg text-black bg-white border border-slate-400 shadow-inner rounded-sm resize-none focus:border-blue-500 outline-none font-serif"
                      value={selectedCard?.front || ''}
                      onChange={(e) => handleUpdateCard('front', e.target.value)}
                      placeholder="Type front text..."
                    />
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Back Content</label>
                    <textarea 
                      className="w-full h-32 p-3 text-lg text-black bg-white border border-slate-400 shadow-inner rounded-sm resize-none focus:border-blue-500 outline-none font-serif"
                      value={selectedCard?.back || ''}
                      onChange={(e) => handleUpdateCard('back', e.target.value)}
                      placeholder="Type back text..."
                    />
                 </div>
              </div>
          </div>
        </div>

        {/* Render Container for Export (Hidden) */}
        <div ref={exportContainerRef} style={{ position: 'fixed', left: '-9999px', top: 0 }}>
           {isExporting && cards.flatMap(card => [
             <ExportCard key={`${card.id}-F`} text={card.front} type="Front" theme={{ type: selectedTheme, name: selectedTheme }} />,
             <ExportCard key={`${card.id}-B`} text={card.back} type="Back" theme={{ type: selectedTheme, name: selectedTheme }} />
           ])}
        </div>

      </VistaWindow>
    </div>
  );
}
