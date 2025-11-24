
import React, { useState, useRef, useMemo } from 'react';
import { VistaWindow } from './components/VistaWindow';
import { VistaButton } from './components/VistaButton';
import { ExportCard } from './components/ExportCard';
import { Flashcard } from './components/Flashcard';
import { FlashcardData, CardTheme, ThemeType, Orientation } from './types';

// --- INITIAL DATA (FULL DICTIONARY) ---
const INITIAL_CARDS: FlashcardData[] = [
  // 1. Санхүүгийн системийн тойм бүтэц
  { id: '1.1', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Adverse selection', back: 'Муу сонголт' },
  { id: '1.2', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Asymmetric information', back: 'Мэдээллийн тэгш бус байдал' },
  { id: '1.3', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Brokers', back: 'Брокерууд' },
  { id: '1.4', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Capital', back: 'Хөрөнгө' },
  { id: '1.5', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Capital market', back: 'Хөрөнгийн зах зээл' },
  { id: '1.6', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Conflicts of interest', back: 'Сонирхлын зөрчил' },
  { id: '1.7', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Dealers', back: 'Дилерүүд' },
  { id: '1.8', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Diversification', back: 'Тараан байршуулалт' },
  { id: '1.9', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Dividend', back: 'Ногдол ашиг' },
  { id: '1.10', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Equities', back: 'Эздийн өмч' },
  { id: '1.11', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Eurobond', back: 'Евробонд' },
  { id: '1.12', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Eurodollars', back: 'Евродоллар' },
  { id: '1.13', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Financial intermediation', back: 'Санхүүгийн зуучлал' },
  { id: '1.14', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Foreign bonds', back: 'Гадаад бонд' },
  { id: '1.15', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Intermediate-term', back: 'Дунд хугацааны' },
  { id: '1.16', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Investment bank', back: 'Хөрөнгө оруулалтын банк' },
  { id: '1.17', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Liabilities', back: 'Өр төлбөр' },
  { id: '1.18', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Liquid', back: 'Хөрвөх чадвартай' },
  { id: '1.19', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Long-term', back: 'Урт хугацаатай' },
  { id: '1.20', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Maturity', back: 'Төлбөрийн хугацаа' },
  { id: '1.21', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Money market', back: 'Мөнгөний зах зээл' },
  { id: '1.22', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Moral hazard', back: 'Ёс суртахууны гажуудал' },
  { id: '1.23', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Over-the-counter (OTC) market', back: 'Биржийн бус зах зээл' },
  { id: '1.24', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Portfolio', back: 'Багц' },
  { id: '1.25', category: '1. Санхүүгийн системийн тойм бүтэц', front: 'Primary market', back: 'Анхдагч зах зээл' },
  
  // 2. Мөнгө, түүний мөн чанар
  { id: '2.1', category: '2. Мөнгө, түүний мөн чанар', front: 'Commodity money', back: 'Таваар мөнгө' },
  { id: '2.2', category: '2. Мөнгө, түүний мөн чанар', front: 'Currency', back: 'Валют' },
  { id: '2.3', category: '2. Мөнгө, түүний мөн чанар', front: 'Fiat money', back: 'Хагас мөнгө' },
  { id: '2.4', category: '2. Мөнгө, түүний мөн чанар', front: 'Hyperinflation', back: 'Гипер инфляц' },
  { id: '2.5', category: '2. Мөнгө, түүний мөн чанар', front: 'Income', back: 'Орлого' },
  { id: '2.6', category: '2. Мөнгө, түүний мөн чанар', front: 'Monetary aggregates', back: 'Мөнгөний агрегат' },
  { id: '2.7', category: '2. Мөнгө, түүний мөн чанар', front: 'Payment system', back: 'Төлбөрийн систем' },
  { id: '2.8', category: '2. Мөнгө, түүний мөн чанар', front: 'Unit of account', back: 'Дансны нэгж' },
  { id: '2.9', category: '2. Мөнгө, түүний мөн чанар', front: 'Wealth', back: 'Баялаг' },

  // 3. Арилжааны банк
  { id: '3.1', category: '3. Арилжааны банк', front: 'Required reserves', back: 'Заавал байлгах нөөц' },
  { id: '3.2', category: '3. Арилжааны банк', front: 'Excess reserves', back: 'Илүүдэл нөөц' },
  { id: '3.3', category: '3. Арилжааны банк', front: 'Securities', back: 'Үнэт цаас' },
  { id: '3.4', category: '3. Арилжааны банк', front: 'Checkable deposit', back: 'Хугацаагүй хадгаламж' },
  { id: '3.5', category: '3. Арилжааны банк', front: 'Nontransaction deposit', back: 'Хугацаатай хадгаламж' },
  { id: '3.6', category: '3. Арилжааны банк', front: 'Loan', back: 'Зээл' },
  { id: '3.7', category: '3. Арилжааны банк', front: 'Vault cash', back: 'Бэлэн мөнгө' },
  { id: '3.8', category: '3. Арилжааны банк', front: 'Secondary reserves', back: 'Хоёрдогч нөөц' },
  { id: '3.9', category: '3. Арилжааны банк', front: 'Asset transformation', back: 'Хөрөнгийн өөрчлөлт' },
  { id: '3.10', category: '3. Арилжааны банк', front: 'Character', back: 'Тэмдэгт' },
  { id: '3.11', category: '3. Арилжааны банк', front: 'Capacity', back: 'Хүчин чадал' },
  { id: '3.12', category: '3. Арилжааны банк', front: 'Collateral', back: 'Барьцаа хөрөнгө' },
  { id: '3.13', category: '3. Арилжааны банк', front: 'Condition', back: 'Нөхцөл' },
  { id: '3.14', category: '3. Арилжааны банк', front: 'Deposit outflow', back: 'Хадгаламжийн гарах мөнгөн урсгал' },
  { id: '3.15', category: '3. Арилжааны банк', front: 'Liquidity management', back: 'Хөрвөх чадварын удирдлага' },
  { id: '3.16', category: '3. Арилжааны банк', front: 'Asset management', back: 'Хөрөнгийн удирдлага' },
  { id: '3.17', category: '3. Арилжааны банк', front: 'Liability management', back: 'Эх үүсвэрийн удирдлага' },
  { id: '3.18', category: '3. Арилжааны банк', front: 'Capital adequacy management', back: 'Хөрөнгийн хүрэлцээний удирдлага' },
  { id: '3.19', category: '3. Арилжааны банк', front: 'Credit risk', back: 'Зээлийн эрсдэл' },
  { id: '3.20', category: '3. Арилжааны банк', front: 'Interest-rate risk', back: 'Хүүгийн түвшний эрсдэл' },

  // 4. Хамтын сан
  { id: '4.1', category: '4. Хамтын сан', front: 'Mutual fund', back: 'Хамтын сан' },
  { id: '4.2', category: '4. Хамтын сан', front: 'Liquidity intermediation', back: 'Хөрвөх чадварын зуучлал' },
  { id: '4.3', category: '4. Хамтын сан', front: 'Denomination intermediation', back: 'Тэнцүүлэн зуучлал' },
  { id: '4.4', category: '4. Хамтын сан', front: 'Cost advantages', back: 'Зардлын давуу тал' },
  { id: '4.5', category: '4. Хамтын сан', front: 'Managerial expertise', back: 'Удирдлагын ур чадвар' },
  { id: '4.6', category: '4. Хамтын сан', front: 'Organizational structure', back: 'Байгууллагын бүтэц' },
  { id: '4.7', category: '4. Хамтын сан', front: 'Net asset value', back: 'Хөрөнгийн цэвэр үнэ цэнэ' },
  { id: '4.8', category: '4. Хамтын сан', front: 'Closed-End fund', back: 'Хаалттай сан' },
  { id: '4.9', category: '4. Хамтын сан', front: 'Open-end fund', back: 'Нээлттэй сан' },
  { id: '4.10', category: '4. Хамтын сан', front: 'Stock (equity) funds', back: 'Хувьцааны сан' },
  { id: '4.11', category: '4. Хамтын сан', front: 'Capital appreciation funds', back: 'Капитал үнэлгээний сан' },
  { id: '4.12', category: '4. Хамтын сан', front: 'World funds', back: 'Дэлхийн хувьцааны сан' },
  { id: '4.13', category: '4. Хамтын сан', front: 'Total return funds', back: 'Нийт өгөөжийн сан' },
  { id: '4.14', category: '4. Хамтын сан', front: 'Bond funds', back: 'Бондын сан' },
  { id: '4.15', category: '4. Хамтын сан', front: 'Strategic income bonds', back: 'Стратегийн орлогын сан' },
  { id: '4.16', category: '4. Хамтын сан', front: 'Corporate bond funds', back: 'Компанийн бондын сан' },
  { id: '4.17', category: '4. Хамтын сан', front: 'High-grade corporate bonds', back: 'Өндөр зэрэглэлийн компанийн бондын сан' },
  { id: '4.18', category: '4. Хамтын сан', front: 'Hybrid funds', back: 'Холимог сан' },
  { id: '4.19', category: '4. Хамтын сан', front: 'Money market funds', back: 'Мөнгөний захын сан' },
  { id: '4.20', category: '4. Хамтын сан', front: 'Minimum initial investment', back: 'Хамгийн бага хөрөнгө оруулалтын хэмжээ' },
  { id: '4.21', category: '4. Хамтын сан', front: 'Index funds', back: 'Индексийн сан' },
  { id: '4.22', category: '4. Хамтын сан', front: 'Fee structure', back: 'Хураамжийн бүтэц' },
  { id: '4.23', category: '4. Хамтын сан', front: 'Load funds', back: 'Шимтгэлтэй сан' },
  { id: '4.24', category: '4. Хамтын сан', front: 'No-load funds', back: 'Шимтгэлгүй сан' },
  { id: '4.25', category: '4. Хамтын сан', front: 'Contingent deferred sales charge', back: 'Урьдчилан тооцоогүй хойшлуулсан борлуулалтын хураамж' },
  { id: '4.26', category: '4. Хамтын сан', front: 'Redemption fee', back: 'Буцаалтын хураамж' },
  { id: '4.27', category: '4. Хамтын сан', front: 'Exchange fee', back: 'Солилцооны хураамж' },
  { id: '4.28', category: '4. Хамтын сан', front: 'Account maintenance fee', back: 'Данс улайлтын хураамж' },
  { id: '4.29', category: '4. Хамтын сан', front: '12b-1 fees', back: '12b-1 хураамж' },
  { id: '4.30', category: '4. Хамтын сан', front: 'Hedge funds', back: 'Хамгаалалтын сан' },

  // 5. Даатгалын компани, тэтгэврийн сан
  { id: '5.1', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Beneficiary', back: 'Өв залгамжлагч' },
  { id: '5.2', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Deductible', back: 'Хасагдуулга' },
  { id: '5.3', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Underwriters', back: 'Андеррайтер' },
  { id: '5.4', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Exclusive agents', back: 'Онцгой төлөөлөгч' },
  { id: '5.5', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Independent agents', back: 'Бие даасан төлөөлөгч' },
  { id: '5.6', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Stock company', back: 'Хувьцаат компани' },
  { id: '5.7', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Mutual insurance company', back: 'Хамтын даатгалын компани' },
  { id: '5.8', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Life insurance', back: 'Амьдралын даатгал' },
  { id: '5.9', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Law of large numbers', back: 'Их тооны хууль' },
  { id: '5.10', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Term life', back: 'Хугацаат амьдралын даатгал' },
  { id: '5.11', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Whole life', back: 'Насан туршийн амьдралын даатгал' },
  { id: '5.12', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Universal life', back: 'Олон талт амьдралын даатгал' },
  { id: '5.13', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Health insurance', back: 'Эрүүл мэндийн даатгал' },
  { id: '5.14', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Property and casualty', back: 'Эд хөрөнгө болон хохирлын даатгал' },
  { id: '5.15', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Reinsurance', back: 'Давхар даатгал' },
  { id: '5.16', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Screening', back: 'Шигших' },
  { id: '5.17', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Risk-based premium', back: 'Эрсдэлд суурилсан хураамж' },
  { id: '5.18', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Restrictive provisions', back: 'Хориглосон заалтууд' },
  { id: '5.19', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Prevention of fraud', back: 'Луйвраас урьдчилан сэргийлэх' },
  { id: '5.20', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Cancellation of insurance', back: 'Даатгалын цуцлах' },
  { id: '5.21', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Coinsurance', back: 'Хам даатгал' },
  { id: '5.22', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Pension plan', back: 'Тэтгэврийн төлөвлөгөө' },
  { id: '5.23', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Defined-benefit pension plan', back: 'Авах тэтгэврийн хэмжээнд үндэслэсэн тэтгэврийн төлөвлөгөө' },
  { id: '5.24', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Defined-contribution pension plan', back: 'Шимтгэлд үндэслэсэн тэтгэврийн төлөвлөгөө' },
  { id: '5.25', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Fully funded', back: 'Бүрэн хуримтлуулсан' },
  { id: '5.26', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Overfunded', back: 'Илүү хуримтлуулсан' },
  { id: '5.27', category: '5. Даатгалын компани, тэтгэврийн сан', front: 'Underfunded', back: 'Дутуу хуримтлуулсан' },

  // 6. Хөрөнгө оруулалтын банк
  { id: '6.1', category: '6. Хөрөнгө оруулалтын банк', front: 'Capital buyout', back: 'Хөрөнгийн худалдан авалт' },
  { id: '6.2', category: '6. Хөрөнгө оруулалтын банк', front: 'Confidential memorandum', back: 'Нууцлалын гэрээ' },
  { id: '6.3', category: '6. Хөрөнгө оруулалтын банк', front: 'Initial public offering (IPO)', back: 'Олон нийтэд анх санал болгох' },
  { id: '6.4', category: '6. Хөрөнгө оруулалтын банк', front: 'Investment banks', back: 'Хөрөнгө оруулалтын банк' },
  { id: '6.5', category: '6. Хөрөнгө оруулалтын банк', front: 'Limit order', back: 'Хязгаарт захиалга' },
  { id: '6.6', category: '6. Хөрөнгө оруулалтын банк', front: 'Margin credit', back: 'Маржин зээл' },
  { id: '6.7', category: '6. Хөрөнгө оруулалтын банк', front: 'Market order', back: 'Зах зээлийн захиалга' },
  { id: '6.8', category: '6. Хөрөнгө оруулалтын банк', front: 'Mergers and acquisitions market', back: 'Нэгдэлт ба нийлэлт' },
  { id: '6.9', category: '6. Хөрөнгө оруулалтын банк', front: 'Oversubscribed', back: 'Илүү захиалагдсан' },
  { id: '6.10', category: '6. Хөрөнгө оруулалтын банк', front: 'Primary market', back: 'Анхдагч зах зээл' },
  { id: '6.11', category: '6. Хөрөнгө оруулалтын банк', front: 'Prospectus', back: 'Үнэт цаасны танилцуулга' },
  { id: '6.12', category: '6. Хөрөнгө оруулалтын банк', front: 'Secondary market', back: 'Хоёрдогч зах зээл' },
  { id: '6.13', category: '6. Хөрөнгө оруулалтын банк', front: 'Short sell', back: 'Зээлээр худалдаж авсан үнэт цаасны борлуулалт' },
  { id: '6.14', category: '6. Хөрөнгө оруулалтын банк', front: 'Syndicate', back: 'Синдикат' },
  { id: '6.15', category: '6. Хөрөнгө оруулалтын банк', front: 'Undersubscribed', back: 'Дутуу захиалагдсан' },

  // 7. Төв банк, Мөнгөний бодлого
  { id: '7.1', category: '7. Төв банк, Мөнгөний бодлого', front: 'Federal open market committee', back: 'Нээлттэй захын үйл ажиллагаа' },
  { id: '7.2', category: '7. Төв банк, Мөнгөний бодлого', front: 'Federal reserve bank', back: 'Холбооны нөөцийн банк' },
  { id: '7.3', category: '7. Төв банк, Мөнгөний бодлого', front: 'Goal independence', back: 'Зорилтын хараат бус байдал' },
  { id: '7.4', category: '7. Төв банк, Мөнгөний бодлого', front: 'Instrument independence', back: 'Хэрэгслийн хараат бус байдал' },
  { id: '7.5', category: '7. Төв банк, Мөнгөний бодлого', front: 'Open market operation', back: 'Нээлттэй зах зээлийн үйл ажиллагаа' },
  { id: '7.6', category: '7. Төв банк, Мөнгөний бодлого', front: 'Political business cycle', back: 'Улс төрийн бизнес цикл' },

  // 8. Мөнгөний зах зээл
  { id: '8.1', category: '8. Мөнгөний зах зээл', front: 'Treasury Bills', back: 'Богино хугацаат Засгийн газрын үнэт цаас' },
  { id: '8.2', category: '8. Мөнгөний зах зээл', front: 'Federal Funds', back: 'Банк хоорондын зээл' },
  { id: '8.3', category: '8. Мөнгөний зах зээл', front: 'Repurchase Agreements', back: 'Буцаан худалдан авах гэрээ' },
  { id: '8.4', category: '8. Мөнгөний зах зээл', front: 'Negotiable Certificates of Deposit', back: 'Хадгаламжийн сертификат' },
  { id: '8.5', category: '8. Мөнгөний зах зээл', front: 'Commercial Paper', back: 'Арилжааны бичиг' },
  { id: '8.6', category: '8. Мөнгөний зах зээл', front: 'Banker’s Acceptance', back: 'Банкны акцепт' },
  { id: '8.7', category: '8. Мөнгөний зах зээл', front: 'Prime rate', back: 'Суурь хүү' },
  { id: '8.8', category: '8. Мөнгөний зах зээл', front: 'Certificates of deposit', back: 'Хадгаламжийн сертификат' },
  { id: '8.9', category: '8. Мөнгөний зах зээл', front: 'Discount rate', back: 'Хямдруулалтын хувь' },
  { id: '8.10', category: '8. Мөнгөний зах зээл', front: 'One-month Eurodollar deposits', back: '1 сарын хугацаатай евродолларын хадгалмж' },

  // 9. Хөрөнгийн зах зээл
  { id: '9.1', category: '9. Хөрөнгийн зах зээл', front: 'Discount rate', back: 'Хорогдуулалтын хувь' },
  { id: '9.2', category: '9. Хөрөнгийн зах зээл', front: 'Capital appreciation', back: 'Хөрөнгийн үнэ цэнийн өсөлт' },
  { id: '9.3', category: '9. Хөрөнгийн зах зээл', front: 'Dividends', back: 'Ногдол ашиг' },
  { id: '9.4', category: '9. Хөрөнгийн зах зээл', front: 'Ownership', back: 'Эзэмшил' },
  { id: '9.5', category: '9. Хөрөнгийн зах зээл', front: 'Common stock', back: 'Энгийн хувьцаа' },
  { id: '9.6', category: '9. Хөрөнгийн зах зээл', front: 'Common stockholders', back: 'Энгийн хувьцаа эзэмшигчид' },
  { id: '9.7', category: '9. Хөрөнгийн зах зээл', front: 'Preferred stock', back: 'Давуу эрхийн хувьцаа' },
  { id: '9.8', category: '9. Хөрөнгийн зах зээл', front: 'Fixed dividend', back: 'Тогтмол ногдол ашиг' },
  { id: '9.9', category: '9. Хөрөнгийн зах зээл', front: 'Voting rights', back: 'Санхалын эрх' },
  { id: '9.10', category: '9. Хөрөнгийн зах зээл', front: 'Residual claim', back: 'Үлдэгдэл нэхэмжлэл' },
  { id: '9.11', category: '9. Хөрөнгийн зах зээл', front: 'Bid price', back: 'Худалдан авах үнэ' },
  { id: '9.12', category: '9. Хөрөнгийн зах зээл', front: 'Ask price', back: 'Худалдах үнэ' },
  { id: '9.13', category: '9. Хөрөнгийн зах зээл', front: 'One-period valuation model', back: 'Нэг үет үнэлгээний загвар' },
  { id: '9.14', category: '9. Хөрөнгийн зах зээл', front: 'Price earnings ratio', back: 'Үнэ ашгийн харьцаа' },
  { id: '9.15', category: '9. Хөрөнгийн зах зээл', front: 'Growth rate', back: 'Өсөлтийн хувь' },
  { id: '9.16', category: '9. Хөрөнгийн зах зээл', front: 'Errors in valuation', back: 'Үнэлгээний алдаа' },
  { id: '9.17', category: '9. Хөрөнгийн зах зээл', front: 'Estimating growth', back: 'Өсөлтийг тооцоолох' },
  { id: '9.18', category: '9. Хөрөнгийн зах зээл', front: 'Estimating risk', back: 'Эрсдэлийг тооцоолох' },
  { id: '9.19', category: '9. Хөрөнгийн зах зээл', front: 'Forecasting dividend', back: 'Таамагласан ногдол ашиг' },
  { id: '9.20', category: '9. Хөрөнгийн зах зээл', front: 'Compute the current price', back: 'Одоогийн үнийг тооцоолох' },
  { id: '9.21', category: '9. Хөрөнгийн зах зээл', front: 'Required return', back: 'Шаардлагатай өгөөж' },
  { id: '9.22', category: '9. Хөрөнгийн зах зээл', front: 'Type of stock', back: 'Хувьцааны төрөл' },
  { id: '9.23', category: '9. Хөрөнгийн зах зээл', front: 'Cumulative preferred stock', back: 'Хуримтлагах давуу эрхийн хувьцаа' },
  { id: '9.24', category: '9. Хөрөнгийн зах зээл', front: 'Noncumulative preferred stock', back: 'Үл хуримтлагдах давуу эрхийн хувьцаа' },
  { id: '9.25', category: '9. Хөрөнгийн зах зээл', front: 'Authorized common stock', back: 'Эрх бүхий энгийн хувьцаа' },
  { id: '9.26', category: '9. Хөрөнгийн зах зээл', front: 'Outstanding common stock', back: 'Гаргасан энгийн хувьцаа' },
  { id: '9.27', category: '9. Хөрөнгийн зах зээл', front: 'Treasury stock', back: 'Засгийн газрын хувьцаа' },
  { id: '9.28', category: '9. Хөрөнгийн зах зээл', front: 'Market maker', back: 'Зах зээлийг бий болгогч' },
  { id: '9.29', category: '9. Хөрөнгийн зах зээл', front: 'Specialist', back: 'Мэргэжилтэн' },

  // 10. Гадаад валютын зах зээл
  { id: '10.1', category: '10. Гадаад валютын зах зээл', front: 'Appreciation', back: 'Өсөлт (хөрөнгийн үнэ цэнийн хувьд)' },
  { id: '10.2', category: '10. Гадаад валютын зах зээл', front: 'Capital mobility', back: 'Хөрөнгийн хөдөлгөөн' },
  { id: '10.3', category: '10. Гадаад валютын зах зээл', front: 'Depreciation', back: 'Хорогдуулалт' },
  { id: '10.4', category: '10. Гадаад валютын зах зээл', front: 'Effective exchange rate index', back: 'Үр ашигт ханшийн индекс' },
  { id: '10.5', category: '10. Гадаад валютын зах зээл', front: 'Exchange rate', back: 'Валютын ханш' },
  { id: '10.6', category: '10. Гадаад валютын зах зээл', front: 'Foreign exchange market', back: 'Гадаад валютын зах зээл' },
  { id: '10.7', category: '10. Гадаад валютын зах зээл', front: 'Forward exchange rate', back: 'Форвард ханш' },
  { id: '10.8', category: '10. Гадаад валютын зах зээл', front: 'Forward transactions', back: 'Форвард гүйлгээ' },
  { id: '10.9', category: '10. Гадаад валютын зах зээл', front: 'Interest parity condition', back: 'Хүүгийн тэгш байдлын нөхцөл' },
  { id: '10.10', category: '10. Гадаад валютын зах зээл', front: 'Law of one price', back: 'Нэг үнийн хууль' },
  { id: '10.11', category: '10. Гадаад валютын зах зээл', front: 'Quotas', back: 'Квот' },
  { id: '10.12', category: '10. Гадаад валютын зах зээл', front: 'Real exchange rate', back: 'Бодит ханш' },
  { id: '10.13', category: '10. Гадаад валютын зах зээл', front: 'Spot exchange rate', back: 'Спот ханш' },
  { id: '10.14', category: '10. Гадаад валютын зах зээл', front: 'Spot transactions', back: 'Свот гүйлгээ' },
  { id: '10.15', category: '10. Гадаад валютын зах зээл', front: 'Tariffs', back: 'Тариф' },
  { id: '10.16', category: '10. Гадаад валютын зах зээл', front: 'Theory of purchasing power parity', back: 'Худалдан авах чадварын паритетийн онол' },

  // 11. Уламжлагдсан зах зээл
  { id: '11.1', category: '11. Уламжлагдсан зах зээл', front: 'American options', back: 'Америк опцион' },
  { id: '11.2', category: '11. Уламжлагдсан зах зээл', front: 'Arbitrage', back: 'Арбитраж' },
  { id: '11.3', category: '11. Уламжлагдсан зах зээл', front: 'Call option', back: 'Колл опцион' },
  { id: '11.4', category: '11. Уламжлагдсан зах зээл', front: 'Credit default swap', back: 'Зээлийн эрсдэлийн своп' },
  { id: '11.5', category: '11. Уламжлагдсан зах зээл', front: 'Credit derivatives', back: 'Зээлийн дериватив' },
  { id: '11.6', category: '11. Уламжлагдсан зах зээл', front: 'Credit options', back: 'Зээлийн опцион' },
  { id: '11.7', category: '11. Уламжлагдсан зах зээл', front: 'Credit swap', back: 'Зээлийн своп' },
  { id: '11.8', category: '11. Уламжлагдсан зах зээл', front: 'Currency swaps', back: 'Валютын своп' },
  { id: '11.9', category: '11. Уламжлагдсан зах зээл', front: 'European options', back: 'Европ опцион' },
  { id: '11.10', category: '11. Уламжлагдсан зах зээл', front: 'Financial derivatives', back: 'Дериватив' },
  { id: '11.11', category: '11. Уламжлагдсан зах зээл', front: 'Financial futures contract', back: 'Фьючерс гэрээ' },
  { id: '11.12', category: '11. Уламжлагдсан зах зээл', front: 'Financial futures options', back: 'Фьючерс опцион' },
  { id: '11.13', category: '11. Уламжлагдсан зах зээл', front: 'Forward contracts', back: 'Форвард гэрээ' },
  { id: '11.14', category: '11. Уламжлагдсан зах зээл', front: 'Hedge', back: 'Хедж' },
  { id: '11.15', category: '11. Уламжлагдсан зах зээл', front: 'Interest-rate forward contracts', back: 'Хүүний түвшний свопын гэрээ' },
  { id: '11.16', category: '11. Уламжлагдсан зах зээл', front: 'Long position', back: 'Урт позиц' },
  { id: '11.17', category: '11. Уламжлагдсан зах зээл', front: 'Macro hedge', back: 'Макро хеджинг' },
  { id: '11.18', category: '11. Уламжлагдсан зах зээл', front: 'Micro hedge', back: 'Микро хеджинг' },
  { id: '11.19', category: '11. Уламжлагдсан зах зээл', front: 'Premium', back: 'Хураамж, төлбөр' },
  { id: '11.20', category: '11. Уламжлагдсан зах зээл', front: 'Put option', back: 'Пут опцион' },
  { id: '11.21', category: '11. Уламжлагдсан зах зээл', front: 'Short position', back: 'Богино позиц' },
  { id: '11.22', category: '11. Уламжлагдсан зах зээл', front: 'Stock option', back: 'Хувьцааны опцион' },
  { id: '11.23', category: '11. Уламжлагдсан зах зээл', front: 'Swaps', back: 'Своп' },
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

const FONT_OPTIONS = [
  { label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
  { label: 'Marck Script (Cursive)', value: '"Marck Script", cursive' },
  { label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Courier New', value: '"Courier New", Courier, monospace' },
  { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
  { label: 'Impact', value: 'Impact, Charcoal, sans-serif' },
  { label: 'Roboto (Google)', value: '"Roboto", sans-serif' },
  { label: 'Playfair Display (Google)', value: '"Playfair Display", serif' },
  { label: 'Montserrat (Google)', value: '"Montserrat", sans-serif' },
  { label: 'Dancing Script (Google)', value: '"Dancing Script", cursive' },
  { label: 'Oswald (Google)', value: '"Oswald", sans-serif' },
  { label: 'Merriweather (Google)', value: '"Merriweather", serif' },
  { label: 'Rubik (Google)', value: '"Rubik", sans-serif' },
  { label: 'Noto Sans Mongolian', value: '"Noto Sans Mongolian", sans-serif' },
];

export default function App() {
  // --- STATE ---
  const [cards, setCards] = useState<FlashcardData[]>(INITIAL_CARDS);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(INITIAL_CARDS[0].id);
  
  // Search & Grouping
  const [layerSearch, setLayerSearch] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

  // Theme & Appearance State
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>(ThemeType.VISTA);
  const [orientation, setOrientation] = useState<Orientation>('PORTRAIT');
  const [customFont, setCustomFont] = useState<string>('"Times New Roman", Times, serif');
  const [fontSizeScale, setFontSizeScale] = useState<number>(1);
  const [textOffsetX, setTextOffsetX] = useState<number>(0);
  const [textOffsetY, setTextOffsetY] = useState<number>(0);
  const [customTextColor, setCustomTextColor] = useState<string>(''); // empty = default
  const [customBorderColor, setCustomBorderColor] = useState<string>(''); // empty = default

  // UI State
  const [isLayersOpen, setIsLayersOpen] = useState(true);
  const [activeRightTab, setActiveRightTab] = useState<'CONTENT' | 'STYLE'>('CONTENT');
  const [centerView, setCenterView] = useState<'CANVAS' | 'THEME'>('CANVAS');
  
  // Export State
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState('');
  const [gridConfig, setGridConfig] = useState<GridOption>(GRID_OPTIONS[3]); // Default 2x4
  const exportContainerRef = useRef<HTMLDivElement>(null);

  // Derived
  const selectedCard = cards.find(c => c.id === selectedCardId) || cards[0];

  // Grouping Logic
  const groupedCards = useMemo(() => {
    const groups: Record<string, FlashcardData[]> = {};
    
    // Filter first
    const filtered = cards.filter(c => 
      c.front.toLowerCase().includes(layerSearch.toLowerCase()) || 
      c.back.toLowerCase().includes(layerSearch.toLowerCase()) ||
      (c.category && c.category.toLowerCase().includes(layerSearch.toLowerCase()))
    );

    filtered.forEach(card => {
      const cat = card.category || 'Uncategorized';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(card);
    });

    return groups;
  }, [cards, layerSearch]);

  // --- HANDLERS ---
  const handleCardSelect = (id: string) => setSelectedCardId(id);

  const handleUpdateCard = (field: 'front' | 'back' | 'category', value: string) => {
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
      back: 'Translation',
      category: 'Uncategorized'
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

  const toggleCategory = (cat: string) => {
    const newSet = new Set(collapsedCategories);
    if (newSet.has(cat)) {
      newSet.delete(cat);
    } else {
      newSet.add(cat);
    }
    setCollapsedCategories(newSet);
  };

  const expandAll = () => setCollapsedCategories(new Set());
  const collapseAll = () => {
    const allCats = Object.keys(groupedCards);
    setCollapsedCategories(new Set(allCats));
  };

  // Construct current theme object for usage
  const currentCardTheme: CardTheme = {
    type: selectedTheme,
    name: selectedTheme,
    orientation: orientation,
    fontFamily: customFont,
    fontSizeScale: fontSizeScale,
    textOffsetX: textOffsetX,
    textOffsetY: textOffsetY,
    customTextColor: customTextColor || undefined,
    customBorderColor: customBorderColor || undefined
  };

  // --- EXPORT FUNCTIONS (Dynamic Grid & Orientation) ---
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
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { jsPDF } = jspdf;
      // A4 Portrait: 210mm x 297mm
      const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
      
      const { rows, cols } = gridConfig;
      const cardsPerPage = rows * cols;
      
      const pageWidth = 210;
      const pageHeight = 297;
      const marginX = 10;
      const marginY = 10;
      
      const availableWidth = pageWidth - (2 * marginX);
      const availableHeight = pageHeight - (2 * marginY);
      const cellWidth = availableWidth / cols;
      const cellHeight = availableHeight / rows;

      // Determine Aspect Ratio based on Orientation State
      // Portrait: 400w / 600h = 0.666
      // Landscape: 600w / 400h = 1.5
      const CARD_RATIO = orientation === 'LANDSCAPE' ? (600/400) : (400/600);
      
      // Calculate max dimensions fitting in cell while preserving ratio
      let finalCardWidth = cellWidth;
      let finalCardHeight = finalCardWidth / CARD_RATIO;

      if (finalCardHeight > cellHeight) {
        finalCardHeight = cellHeight;
        finalCardWidth = finalCardHeight * CARD_RATIO;
      }

      // Add padding
      const PADDING_SCALE = 0.95; 
      finalCardWidth *= PADDING_SCALE;
      finalCardHeight *= PADDING_SCALE;

      const xCenteredOffset = (cellWidth - finalCardWidth) / 2;
      const yCenteredOffset = (cellHeight - finalCardHeight) / 2;

      const elements = Array.from(exportContainerRef.current?.children || []);
      const frontElements = elements.filter((_, i) => i % 2 === 0);
      const backElements = elements.filter((_, i) => i % 2 !== 0);

      const processPage = async (cardEls: Element[]) => {
        for (let i = 0; i < cardEls.length; i++) {
          const el = cardEls[i] as HTMLElement;
          
          const canvas = await html2canvas(el, {
            scale: 2, 
            backgroundColor: null,
            useCORS: true,
            logging: false
          });
          const imgData = canvas.toDataURL('image/png');

          const colIndex = i % cols; 
          const rowIndex = Math.floor(i / cols); 
          
          const xPos = marginX + (colIndex * cellWidth) + xCenteredOffset;
          const yPos = marginY + (rowIndex * cellHeight) + yCenteredOffset;
          
          doc.addImage(imgData, 'PNG', xPos, yPos, finalCardWidth, finalCardHeight);
        }
      };

      for (let i = 0; i < cards.length; i += cardsPerPage) {
        const chunkFronts = frontElements.slice(i, i + cardsPerPage);
        const chunkBacks = backElements.slice(i, i + cardsPerPage);

        if (i > 0) doc.addPage();
        doc.setFontSize(9);
        doc.setTextColor(100);
        doc.text(`Fronts - Batch ${Math.floor(i/cardsPerPage) + 1} (${gridConfig.label})`, 10, 6);
        await processPage(chunkFronts);
        
        doc.addPage();
        doc.text(`Backs - Batch ${Math.floor(i/cardsPerPage) + 1} (${gridConfig.label})`, 10, 6);
        await processPage(chunkBacks);
      }

      doc.save(`VistaFlash_Deck_${orientation}_${gridConfig.rows}x${gridConfig.cols}.pdf`);

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
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center -z-50"></div>
      
      <VistaWindow title="VistaFlash Studio - UFE Edition">
        <div className="flex h-full overflow-hidden bg-[#f0f0f0]">
          
          {/* --- LEFT PANEL: LAYERS & ACTIONS (COLLAPSIBLE) --- */}
          <div 
            className={`flex flex-col border-r border-[#a0a0a0] bg-[#ececec] shadow-[inset_-1px_0_0_white] transition-all duration-300 ease-in-out relative
              ${isLayersOpen ? 'w-72' : 'w-10'}
            `}
          >
             {/* Toggle Button */}
             <button 
                onClick={() => setIsLayersOpen(!isLayersOpen)}
                className="absolute -right-3 top-1/2 z-50 w-6 h-6 bg-white border border-[#a0a0a0] rounded-full flex items-center justify-center text-[10px] hover:bg-blue-50 shadow-sm"
             >
                {isLayersOpen ? '◀' : '▶'}
             </button>

             {/* Content when OPEN */}
             {isLayersOpen && (
               <>
                 {/* EXPORT & GRID CONTROLS */}
                 <div className="p-3 bg-blue-100 border-b border-blue-200">
                    <div className="mb-2 flex items-center justify-between">
                       <label className="text-[10px] font-bold text-blue-800 uppercase">Grid</label>
                       <select 
                          value={GRID_OPTIONS.indexOf(gridConfig)}
                          onChange={(e) => setGridConfig(GRID_OPTIONS[parseInt(e.target.value)])}
                          className="text-xs p-1 border border-blue-300 rounded bg-white text-blue-900 outline-none focus:border-blue-500 w-32"
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
                </div>

                {/* LAYERS HEADER & SEARCH */}
                <div className="p-2 bg-[#ececec] border-b border-[#a0a0a0] flex flex-col gap-2">
                   <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-700 pl-1">EXPLORER</span>
                      <button onClick={handleAddCard} className="px-2 py-0.5 bg-white border border-slate-400 rounded shadow-sm text-xs hover:bg-blue-50">
                        + New
                      </button>
                   </div>
                   <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search terms..." 
                        className="w-full pl-6 pr-2 py-1 text-xs border border-slate-400 rounded-sm focus:border-blue-500 outline-none"
                        value={layerSearch}
                        onChange={(e) => setLayerSearch(e.target.value)}
                      />
                      <span className="absolute left-1.5 top-1 text-slate-400 text-xs">🔍</span>
                   </div>
                   <div className="flex gap-2">
                      <button onClick={expandAll} className="flex-1 text-[9px] bg-white border border-slate-300 rounded px-1 py-0.5 hover:bg-slate-50">Expand All</button>
                      <button onClick={collapseAll} className="flex-1 text-[9px] bg-white border border-slate-300 rounded px-1 py-0.5 hover:bg-slate-50">Collapse All</button>
                   </div>
                </div>

                {/* FOLDER TREE LIST */}
                <div className="flex-1 overflow-y-auto p-0 bg-white border-t border-slate-300">
                  {Object.keys(groupedCards).length === 0 && (
                     <div className="p-4 text-center text-xs text-slate-400 italic">No cards found.</div>
                  )}

                  {Object.entries(groupedCards).map(([category, categoryCards]) => {
                    const isCollapsed = collapsedCategories.has(category);
                    return (
                      <div key={category} className="border-b border-slate-100">
                        {/* Category Header */}
                        <div 
                           onClick={() => toggleCategory(category)}
                           className="flex items-center gap-2 px-2 py-1.5 bg-[#f0f0f0] hover:bg-[#e5e5e5] cursor-pointer select-none sticky top-0 z-10 border-b border-slate-200"
                        >
                           <span className="text-[9px] text-slate-500 transition-transform duration-200" style={{ transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }}>▼</span>
                           <div className="w-3 h-3 bg-yellow-200 border border-yellow-400 rounded-sm flex-shrink-0 shadow-sm"></div>
                           <span className="text-xs font-bold text-slate-700 truncate w-40" title={category}>{category}</span>
                           <span className="ml-auto text-[9px] bg-slate-200 px-1 rounded text-slate-500">{categoryCards.length}</span>
                        </div>

                        {/* Cards List */}
                        {!isCollapsed && (
                           <div className="pl-4 border-l border-slate-200 ml-3 my-1">
                              {categoryCards.map((card) => (
                                <div 
                                  key={card.id}
                                  onClick={() => handleCardSelect(card.id)}
                                  className={`flex items-center gap-2 px-2 py-1 border-b border-slate-50 cursor-pointer group transition-all rounded-sm mr-1
                                    ${selectedCardId === card.id 
                                      ? 'bg-blue-600 text-white' 
                                      : 'bg-white text-slate-700 hover:bg-blue-50'}
                                  `}
                                >
                                  <div className={`w-3 h-3 flex items-center justify-center border rounded-[1px] text-[7px] flex-shrink-0 ${selectedCardId === card.id ? 'border-white/40 bg-white/20' : 'border-slate-300 bg-slate-50'}`}>F</div>
                                  <div className="flex-1 truncate text-[11px] font-serif">
                                    {card.front || <i>Empty</i>}
                                  </div>
                                  <button 
                                    onClick={(e) => handleDeleteCard(e, card.id)}
                                    className={`hidden group-hover:flex w-3 h-3 items-center justify-center rounded hover:bg-red-500 hover:text-white text-[8px]
                                      ${selectedCardId === card.id ? 'text-white/70' : 'text-slate-400'}
                                    `}
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                           </div>
                        )}
                      </div>
                    );
                  })}
                </div>
               </>
             )}

             {/* Content when CLOSED */}
             {!isLayersOpen && (
               <div className="flex-1 bg-[#dcdcdc] flex flex-col items-center py-4 gap-4">
                  <div className="w-6 h-6 border border-slate-400 bg-white rounded shadow-sm flex items-center justify-center text-xs" title="Explorer">📂</div>
                  <div className="w-6 h-6 border border-slate-400 bg-white rounded shadow-sm flex items-center justify-center text-xs" title="Settings">⚙️</div>
                  <div className="mt-auto mb-4 w-6 h-6 bg-blue-500 rounded-full shadow-md" title="Export"></div>
               </div>
             )}
          </div>

          {/* --- CENTER PANEL: PREVIEW CANVAS & THEME SELECTOR --- */}
          <div className="flex-1 bg-[#808080] flex flex-col shadow-inner relative overflow-hidden">
             {/* View Toggle Bar */}
             <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-white/90 backdrop-blur shadow-md rounded-full px-1 py-1 flex gap-1 border border-white/50">
                <button 
                  onClick={() => setCenterView('CANVAS')}
                  className={`px-4 py-1 text-xs font-bold rounded-full transition-all ${centerView === 'CANVAS' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  Preview
                </button>
                <button 
                  onClick={() => setCenterView('THEME')}
                  className={`px-4 py-1 text-xs font-bold rounded-full transition-all ${centerView === 'THEME' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  Themes
                </button>
             </div>

             {/* 1. CANVAS VIEW */}
             {centerView === 'CANVAS' && (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                   {/* RESPONSIVE SCALING CONTAINER */}
                   <div className="origin-center transition-all duration-300 ease-out scale-[0.5] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.85] xl:scale-100 2xl:scale-110">
                      {selectedCard && <Flashcard data={selectedCard} theme={currentCardTheme} />}
                   </div>
                   <div className="mt-4 text-white/70 text-xs font-mono bg-black/50 px-2 py-1 rounded">
                      Click card to flip • Preview Mode
                   </div>
                </div>
             )}

             {/* 2. THEME GALLERY VIEW */}
             {centerView === 'THEME' && (
               <div className="w-full h-full overflow-y-auto p-8 pt-16 bg-[#e0e0e0]">
                  <h2 className="text-lg font-bold text-slate-700 mb-4 drop-shadow-sm text-center">Choose a Style</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-4xl mx-auto">
                      {Object.values(ThemeType).map((t) => (
                        <div 
                          key={t}
                          onClick={() => {
                             setSelectedTheme(t);
                             setCenterView('CANVAS'); // Auto switch back to preview
                          }}
                          className={`relative rounded-lg border-4 cursor-pointer transition-all transform hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center overflow-hidden group
                            ${selectedTheme === t ? 'border-blue-500 ring-2 ring-blue-300' : 'border-white'}
                            ${orientation === 'LANDSCAPE' ? 'h-32 w-full' : 'h-48 w-full'}
                          `}
                        >
                           <div className={`absolute inset-0 transition-opacity duration-500 ${
                              t === ThemeType.VISTA ? 'bg-gradient-to-b from-white to-blue-50' :
                              t === ThemeType.MACOS ? 'bg-gradient-to-b from-gray-100 to-gray-300' :
                              t === ThemeType.NOTEBOOK ? 'bg-yellow-100' :
                              t === ThemeType.FINANCE ? 'bg-green-50' :
                              'bg-blue-900'
                           }`}>
                              {(t === ThemeType.UFE || t === ThemeType.FINANCE || t === ThemeType.VISTA) && (
                                 <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full border-2 border-current flex items-center justify-center text-4xl font-serif">₮</div>
                                 </div>
                              )}
                           </div>
                           <span className={`relative z-10 font-bold px-3 py-1 rounded shadow-sm backdrop-blur-sm group-hover:scale-110 transition-transform
                              ${t === ThemeType.UFE ? 'bg-white text-blue-900' : 'bg-black/70 text-white'}
                           `}>
                              {t}
                           </span>
                        </div>
                      ))}
                  </div>
               </div>
             )}
          </div>

          {/* --- RIGHT PANEL: TABS (CONTENT / STYLE) --- */}
          <div className="w-80 bg-[#ececec] border-l border-[#a0a0a0] flex flex-col shadow-[inset_1px_0_0_white]">
             {/* Tabs Header */}
             <div className="flex border-b border-[#a0a0a0]">
                <button 
                  onClick={() => setActiveRightTab('CONTENT')}
                  className={`flex-1 py-2 text-xs font-bold uppercase ${activeRightTab === 'CONTENT' ? 'bg-[#f4f4f4] text-slate-800 border-b-2 border-blue-500' : 'bg-[#e0e0e0] text-slate-500 hover:bg-[#eaeaea]'}`}
                >
                  Content
                </button>
                <button 
                  onClick={() => setActiveRightTab('STYLE')}
                  className={`flex-1 py-2 text-xs font-bold uppercase ${activeRightTab === 'STYLE' ? 'bg-[#f4f4f4] text-slate-800 border-b-2 border-blue-500' : 'bg-[#e0e0e0] text-slate-500 hover:bg-[#eaeaea]'}`}
                >
                  Appearance
                </button>
             </div>
              
             {/* Tab Content */}
             <div className="flex-1 overflow-y-auto bg-[#f4f4f4]">
                
                {/* 1. CONTENT EDITOR */}
                {activeRightTab === 'CONTENT' && (
                  <div className="p-4 space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Category</label>
                        <input 
                           className="w-full p-2 text-sm bg-white border border-slate-400 rounded-sm focus:border-blue-500 outline-none"
                           value={selectedCard?.category || ''}
                           onChange={(e) => handleUpdateCard('category', e.target.value)}
                        />
                    </div>
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
                )}

                {/* 2. STYLE / APPEARANCE EDITOR */}
                {activeRightTab === 'STYLE' && (
                  <div className="p-4 space-y-5">
                    
                    {/* Orientation Control */}
                    <div className="bg-white p-3 rounded border border-slate-300 shadow-sm space-y-2">
                       <label className="text-[10px] font-bold text-slate-600 uppercase flex items-center gap-1">
                         <span className="w-3 h-3 bg-slate-400 rounded-sm"></span> Orientation
                       </label>
                       <div className="flex gap-2">
                          <button 
                            onClick={() => setOrientation('PORTRAIT')}
                            className={`flex-1 py-2 border rounded text-xs flex flex-col items-center gap-1 ${orientation === 'PORTRAIT' ? 'bg-blue-100 border-blue-400 text-blue-800 font-bold' : 'bg-slate-50 border-slate-300 text-slate-600'}`}
                          >
                             <div className="w-3 h-4 border border-current"></div>
                             Portrait
                          </button>
                          <button 
                            onClick={() => setOrientation('LANDSCAPE')}
                            className={`flex-1 py-2 border rounded text-xs flex flex-col items-center gap-1 ${orientation === 'LANDSCAPE' ? 'bg-blue-100 border-blue-400 text-blue-800 font-bold' : 'bg-slate-50 border-slate-300 text-slate-600'}`}
                          >
                             <div className="w-4 h-3 border border-current"></div>
                             Landscape
                          </button>
                       </div>
                    </div>

                    <hr className="border-slate-300" />

                    {/* Font Family */}
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Font Family</label>
                       <select 
                          value={customFont}
                          onChange={(e) => setCustomFont(e.target.value)}
                          className="w-full p-2 text-xs border border-slate-400 rounded bg-white shadow-sm focus:border-blue-500"
                       >
                          {FONT_OPTIONS.map((f) => (
                             <option key={f.value} value={f.value}>{f.label}</option>
                          ))}
                       </select>
                    </div>

                    {/* Font Size Slider */}
                    <div className="space-y-1">
                       <div className="flex justify-between">
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Font Scale</label>
                         <span className="text-[10px] text-slate-400">{fontSizeScale.toFixed(1)}x</span>
                       </div>
                       <input 
                          type="range" 
                          min="0.5" 
                          max="2.0" 
                          step="0.1"
                          value={fontSizeScale}
                          onChange={(e) => setFontSizeScale(parseFloat(e.target.value))}
                          className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                       />
                    </div>

                    {/* Text Position Control (X/Y) */}
                    <div className="bg-white p-3 rounded border border-slate-300 shadow-sm space-y-3">
                       <label className="text-[10px] font-bold text-slate-600 uppercase block">Text Position</label>
                       
                       <div className="flex items-center gap-2">
                          <span className="text-[10px] w-4 font-bold text-slate-400">X</span>
                          <input 
                             type="range" 
                             min="-100" 
                             max="100" 
                             value={textOffsetX}
                             onChange={(e) => setTextOffsetX(parseInt(e.target.value))}
                             className="flex-1 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                          <span className="text-[9px] w-6 text-right text-slate-400">{textOffsetX}</span>
                       </div>

                       <div className="flex items-center gap-2">
                          <span className="text-[10px] w-4 font-bold text-slate-400">Y</span>
                          <input 
                             type="range" 
                             min="-100" 
                             max="100" 
                             value={textOffsetY}
                             onChange={(e) => setTextOffsetY(parseInt(e.target.value))}
                             className="flex-1 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                          <span className="text-[9px] w-6 text-right text-slate-400">{textOffsetY}</span>
                       </div>
                       <button 
                          onClick={() => { setTextOffsetX(0); setTextOffsetY(0); }}
                          className="w-full py-1 text-[10px] text-blue-600 hover:underline text-center"
                       >
                          Reset Position
                       </button>
                    </div>

                    {/* Color Pickers */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Text Color</label>
                          <div className="flex gap-2 items-center">
                             <input 
                                type="color" 
                                value={customTextColor || '#000000'}
                                onChange={(e) => setCustomTextColor(e.target.value)}
                                className="w-8 h-8 p-0 border border-slate-400 rounded cursor-pointer shadow-sm"
                             />
                             <span className="text-[10px] text-slate-500 uppercase">{customTextColor || 'Auto'}</span>
                          </div>
                       </div>
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Border Color</label>
                          <div className="flex gap-2 items-center">
                             <input 
                                type="color" 
                                value={customBorderColor || '#000000'}
                                onChange={(e) => setCustomBorderColor(e.target.value)}
                                className="w-8 h-8 p-0 border border-slate-400 rounded cursor-pointer shadow-sm"
                             />
                             <span className="text-[10px] text-slate-500 uppercase">{customBorderColor || 'Auto'}</span>
                          </div>
                       </div>
                    </div>
                    
                    <div className="pt-4">
                       <button 
                         onClick={() => {
                            setCustomFont('"Times New Roman", Times, serif');
                            setFontSizeScale(1);
                            setCustomTextColor('');
                            setCustomBorderColor('');
                            setOrientation('PORTRAIT');
                            setTextOffsetX(0);
                            setTextOffsetY(0);
                         }}
                         className="w-full py-2 bg-slate-200 border border-slate-300 text-xs text-slate-600 rounded hover:bg-slate-300"
                       >
                         Reset All Styles
                       </button>
                    </div>

                  </div>
                )}

             </div>
          </div>
        </div>

        {/* Render Container for Export (Hidden) */}
        <div ref={exportContainerRef} style={{ position: 'fixed', left: '-9999px', top: 0 }}>
           {isExporting && cards.flatMap(card => [
             <ExportCard key={`${card.id}-F`} id={card.id} text={card.front} type="Front" theme={currentCardTheme} />,
             <ExportCard key={`${card.id}-B`} id={card.id} text={card.back} type="Back" theme={currentCardTheme} />
           ])}
        </div>

      </VistaWindow>
    </div>
  );
}
