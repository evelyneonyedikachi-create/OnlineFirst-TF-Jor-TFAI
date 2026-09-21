import React, { useState, useEffect } from 'react';
import { useJournalConfig } from '../../context/JournalConfigContext';
import { SubPages } from './SubPages';
import {
  subjectTaxonomies,
} from '../../data/journalData';
import {
  Search,
  ChevronRight,
  ChevronLeft,
  Send,
  CheckCircle,
  Copy,
  ShieldCheck,
  ArrowRight,
  Layers,
  BookMarked,
  FileText,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { JournalArticle } from '../../types';

export const Demo3AfricanDiscovery: React.FC = () => {
  const {
    currentSubPage,
    setCurrentSubPage,
    config,
    articles,
    setSelectedArticle,
    setNotification,
  } = useJournalConfig();

  // Carousel State for Featured Article
  const [activeSlide, setActiveSlide] = useState(0);
  const isCarouselPlaying = true;

  // Search Filter State
  const [searchFilter, setSearchFilter] = useState('');
  const [citationModalArticle, setCitationModalArticle] = useState<JournalArticle | null>(null);
  const [activeCitationTab, setActiveCitationTab] = useState<'apa' | 'bibtex' | 'harvard'>('apa');

  // Carousel auto-advance
  useEffect(() => {
    if (!isCarouselPlaying || articles.length === 0) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % articles.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isCarouselPlaying, articles.length]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % articles.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const activeArticle = articles[activeSlide] || articles[0];

  // Filtered articles
  const filteredArticles = articles.filter((a) => {
    return (
      !searchFilter ||
      a.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      a.abstract.toLowerCase().includes(searchFilter.toLowerCase()) ||
      a.authors.some((au) => au.name.toLowerCase().includes(searchFilter.toLowerCase())) ||
      a.keywords.some((kw) => kw.toLowerCase().includes(searchFilter.toLowerCase()))
    );
  });

  // Copy citation helper
  const copyCitationText = (art: JournalArticle, format: 'apa' | 'bibtex' | 'harvard') => {
    let text = '';
    const authorNames = art.authors.map((a) => a.name).join(', ');
    const year = art.publicationDate.split(' ')[1] || '2026';
    if (format === 'apa') {
      text = `${authorNames} (${year}). ${art.title}. Tax Frontier Discovery, ${art.volume}(${art.issue}), ${art.pages}. https://doi.org/${art.doi}`;
    } else if (format === 'harvard') {
      text = `${authorNames}, ${year}. '${art.title}', Tax Frontier Discovery, vol. ${art.volume}, no. ${art.issue}, pp. ${art.pages}. Available at: <https://doi.org/${art.doi}>.`;
    } else {
      text = `@article{taxfrontier_${art.id},\n  title={${art.title}},\n  author={${authorNames}},\n  journal={Tax Frontier Discovery},\n  volume={${art.volume}},\n  number={${art.issue}},\n  pages={${art.pages}},\n  year={${year}},\n  publisher={CITN Umuahia Chapter and MOUAU COLMAS},\n  doi={${art.doi}}\n}`;
    }
    navigator.clipboard.writeText(text);
    setNotification(`Citation (${format.toUpperCase()}) copied to clipboard`);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Structured subject index domains with real catalog item counts
  const catalogDomains = [
    { name: 'Tax Administration, Compliance & Behavioral Economics', count: 6, code: 'SEC-01' },
    { name: 'Corporate Taxation, Transfer Pricing & BEPS in Africa', count: 5, code: 'SEC-02' },
    { name: 'Digital Economy, Cross-Border E-Commerce & VAT Levies', count: 4, code: 'SEC-03' },
    { name: 'Petroleum Profits Tax, Mining Royalties & Resource Rents', count: 5, code: 'SEC-04' },
    { name: 'Informal Sector Taxation & Subnational Revenue Mobilization', count: 4, code: 'SEC-05' },
    { name: 'Fiscal Federalism, Revenue Allocation & Intergovernmental Grants', count: 4, code: 'SEC-06' },
    { name: 'Customs, Tariffs & AfCFTA Regional Trade Integration', count: 3, code: 'SEC-07' },
    { name: 'Tax Dispute Resolution, Tribunal Jurisprudence & Case Law', count: 4, code: 'SEC-08' },
    { name: 'Environmental Taxation, Carbon Levies & Green Fiscal Policy', count: 3, code: 'SEC-09' },
    { name: 'Agricultural Sector Taxation, Land Use Charges & Property Levies', count: 3, code: 'SEC-10' },
  ];

  // Reusable Branded Scholarly Archive Masthead & Navigation
  const renderHeaderAndNav = (activePage: string) => (
    <>
      {/* 1. Archival Institutional Strip */}
      <div className="bg-[#02060D] text-[#9FB3C8] text-[11px] py-2 px-4 sm:px-6 lg:px-8 border-b border-[#0F1D2E] relative z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 font-catalog-mono">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8BA75] shrink-0 shadow-[0_0_8px_rgba(216,186,117,0.7)]" />
            <span className="font-semibold text-slate-200 tracking-wide">
              CITN Umuahia Chapter <span className="text-[#D8BA75] mx-1.5">•</span> MOUAU College of Management Sciences
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 text-[10px] text-[#869AB0]">
            <span className="flex items-center gap-1.5">
              <span className="text-slate-400">ISSN:</span>
              <span className="text-[#FAF7EE] font-medium">3043-7053 (Online)</span>
            </span>
            <span className="text-[#1A2E46]">•</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[#869AB0]">
              Biannual (June & Dec)
            </span>
            <span className="text-[#1A2E46] hidden sm:inline">•</span>
            <button
              onClick={() => setCurrentSubPage('submit')}
              className="text-[#D8BA75] hover:text-[#E8D196] font-semibold flex items-center gap-1 transition-colors hover:underline"
            >
              <span>Author Portal</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-80" />
            </button>
            <span className="text-[#1A2E46] hidden md:inline">•</span>
            <span className="hidden md:inline-flex items-center gap-1 text-[#00D4B8] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4B8] animate-pulse" />
              Gold OA (CC BY 4.0)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Branded Scholarly Archive Masthead */}
      <header className="sticky top-12 z-40 bg-[#050B14]/95 backdrop-blur-md text-white border-b border-[#D8BA75]/25 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 sm:py-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Left Brand Identity with Archival Seal */}
          <div 
            onClick={() => setCurrentSubPage('home')}
            className="cursor-pointer group flex items-center gap-4 sm:gap-5"
          >
            {/* Tax Frontier Sovereign Academic Seal Treatment */}
            <div className="relative w-13 h-13 sm:w-15 sm:h-15 rounded-full p-0.5 bg-gradient-to-br from-[#F5D890] via-[#C5A059] to-[#78541C] shadow-[0_0_20px_rgba(216,186,117,0.25)] shrink-0 group-hover:shadow-[0_0_28px_rgba(216,186,117,0.45)] transition-all">
              <div className="w-full h-full rounded-full border border-[#FAF7EE]/30 p-0.5 bg-[#050B14] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0F1D2E] via-[#081220] to-[#03070E] border border-[#D8BA75]/50 flex flex-col items-center justify-center text-center">
                  <span className="text-[7px] font-catalog-mono font-bold text-[#D8BA75] tracking-widest leading-none -mt-0.5">CITN•MOUAU</span>
                  <span className="font-newsreader font-bold text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-b from-[#FAF7EE] via-[#F5D890] to-[#C5A059] tracking-tight leading-tight">
                    TF
                  </span>
                  <span className="text-[6px] font-catalog-mono text-[#A6B7CC] tracking-widest leading-none">EST. 2026</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <span className="text-2xl sm:text-3xl font-newsreader font-semibold tracking-tight text-[#FAF7EE] group-hover:text-[#E8D196] transition-colors leading-tight">
                  Tax Frontier Discovery
                </span>
                <span className="text-[9px] sm:text-[10px] font-catalog-mono font-bold tracking-widest text-[#D8BA75] bg-[#0E1E30] px-2.5 py-0.5 rounded-full border border-[#D8BA75]/40 uppercase shadow-xs">
                  Discovery Archive
                </span>
                <span className="hidden sm:inline-block text-[9px] font-catalog-mono text-[#8EA2B8] bg-[#081320] px-2.5 py-0.5 rounded-full border border-[#16273C]">
                  CITN•MOUAU Refereed Repository
                </span>
              </div>
              <p className="text-xs text-[#8EA2B8] font-normal mt-1 leading-normal tracking-wide">
                African Journal of Taxation, Fiscal Policy & Econometric Research • A Refereed Joint Publication
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3 self-start md:self-center shrink-0">
            <button
              onClick={() => setCurrentSubPage('call-for-papers')}
              className="px-4 py-2.5 rounded-xl bg-[#091524] hover:bg-[#0F2238] text-[#FAF7EE] border border-[#D8BA75]/40 hover:border-[#D8BA75]/80 text-xs font-semibold tracking-wide transition-all shadow-xs"
            >
              <span>Call for Papers</span>
            </button>
            <button
              onClick={() => setCurrentSubPage('submit')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D8BA75] to-[#C5A059] hover:from-[#E2C78A] hover:to-[#D4AF37] text-[#060D18] font-bold text-xs flex items-center gap-2 shadow-[0_2px_16px_rgba(216,186,117,0.3)] hover:shadow-[0_4px_22px_rgba(216,186,117,0.45)] transition-all"
            >
              <Send className="w-3.5 h-3.5 text-[#060D18]" />
              <span>Submit Manuscript</span>
            </button>
          </div>
        </div>

        {/* Academic Navigation Bar */}
        <nav className="bg-[#03070E] text-slate-300 text-xs px-6 lg:px-8 border-t border-[#122134]">
          <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 py-2 overflow-x-auto no-scrollbar font-medium">
            <button
              onClick={() => setCurrentSubPage('home')}
              className={`px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap text-xs ${
                activePage === 'home'
                  ? 'bg-[#0E1E32] text-[#D8BA75] font-semibold border border-[#D8BA75]/45 shadow-[0_0_12px_rgba(216,186,117,0.12)]'
                  : 'text-[#9BB0C7] hover:text-[#FAF7EE] hover:bg-[#081320]'
              }`}
            >
              Catalog Home
            </button>
            <button
              onClick={() => setCurrentSubPage('articles')}
              className={`px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap text-xs ${
                activePage === 'articles'
                  ? 'bg-[#0E1E32] text-[#D8BA75] font-semibold border border-[#D8BA75]/45 shadow-[0_0_12px_rgba(216,186,117,0.12)]'
                  : 'text-[#9BB0C7] hover:text-[#FAF7EE] hover:bg-[#081320]'
              }`}
            >
              Research Archive
            </button>
            <button
              onClick={() => setCurrentSubPage('aims-scope')}
              className={`px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap text-xs ${
                activePage === 'aims-scope'
                  ? 'bg-[#0E1E32] text-[#D8BA75] font-semibold border border-[#D8BA75]/45 shadow-[0_0_12px_rgba(216,186,117,0.12)]'
                  : 'text-[#9BB0C7] hover:text-[#FAF7EE] hover:bg-[#081320]'
              }`}
            >
              Research Taxonomies
            </button>
            <button
              onClick={() => setCurrentSubPage('editorial-board')}
              className={`px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap text-xs ${
                activePage === 'editorial-board'
                  ? 'bg-[#0E1E32] text-[#D8BA75] font-semibold border border-[#D8BA75]/45 shadow-[0_0_12px_rgba(216,186,117,0.12)]'
                  : 'text-[#9BB0C7] hover:text-[#FAF7EE] hover:bg-[#081320]'
              }`}
            >
              Editorial Board
            </button>
            <button
              onClick={() => setCurrentSubPage('peer-review')}
              className={`px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap text-xs ${
                activePage === 'peer-review'
                  ? 'bg-[#0E1E32] text-[#D8BA75] font-semibold border border-[#D8BA75]/45 shadow-[0_0_12px_rgba(216,186,117,0.12)]'
                  : 'text-[#9BB0C7] hover:text-[#FAF7EE] hover:bg-[#081320]'
              }`}
            >
              Peer Review
            </button>
            <button
              onClick={() => setCurrentSubPage('fees')}
              className={`px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap text-xs ${
                activePage === 'fees'
                  ? 'bg-[#0E1E32] text-[#D8BA75] font-semibold border border-[#D8BA75]/45 shadow-[0_0_12px_rgba(216,186,117,0.12)]'
                  : 'text-[#9BB0C7] hover:text-[#FAF7EE] hover:bg-[#081320]'
              }`}
            >
              Author Fees
            </button>
            <button
              onClick={() => setCurrentSubPage('announcements')}
              className={`px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap text-xs flex items-center gap-1.5 ${
                activePage === 'announcements'
                  ? 'bg-[#0E1E32] text-[#D8BA75] font-semibold border border-[#D8BA75]/45 shadow-[0_0_12px_rgba(216,186,117,0.12)]'
                  : 'text-[#9BB0C7] hover:text-[#FAF7EE] hover:bg-[#081320]'
              }`}
            >
              <span>Announcements</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8BA75]" />
            </button>
          </div>
        </nav>
      </header>
    </>
  );

  const renderDiscoveryFooter = () => (
    <footer className="bg-[#070E1A] text-[#A6B7CC] border-t border-[#152336] text-xs py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C5A059] to-[#8C6D32] text-[#070E1A] flex items-center justify-center font-bold text-sm">
              TF
            </div>
            <span className="font-newsreader font-semibold text-[#F8F6F0] text-base">Tax Frontier Discovery</span>
          </div>
          <p className="text-[11px] text-[#C5A059] font-catalog-mono">
            Scientific Repository & Citation Index
          </p>
          <p className="text-[11px] text-[#788C9E] mt-2 leading-relaxed">
            Joint scientific journal platform of CITN Umuahia Chapter & MOUAU College of Management Sciences.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-[#C5A059] uppercase text-[10px] tracking-wider mb-2 font-catalog-mono">Repository Indexing</h5>
          <ul className="space-y-1 text-[#8CA0B8] text-[11px]">
            <li>Crossref Registered DOIs</li>
            <li>Google Scholar Citation Indices</li>
            <li>ROAD Open Access Portal</li>
            <li>CC BY 4.0 Open Licensing</li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-[#C5A059] uppercase text-[10px] tracking-wider mb-2 font-catalog-mono">Scientific Rigor</h5>
          <ul className="space-y-1 text-[#8CA0B8] text-[11px]">
            <li>Double-Blind Peer Review (2 Reviewers)</li>
            <li>Turnitin Plagiarism Verification</li>
            <li>COPE Ethics & Transparency</li>
            <li>Replication Datasets Archive</li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-[#C5A059] uppercase text-[10px] tracking-wider mb-2 font-catalog-mono">Secretariat</h5>
          <p className="text-[11px] text-[#F8F6F0]">
            COLMAS, MOUAU, Umudike, Nigeria
          </p>
          <p className="font-catalog-mono text-[11px] text-[#C5A059] mt-1">
            {config.editorialEmail}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-[#152336] text-center text-[10px] text-[#586A7C] font-catalog-mono">
        © 2026 Tax Frontier Discovery Platform. OnlineFirst Scientific Academic Architecture.
      </div>
    </footer>
  );

  // Subpage rendering with rich scholarly library catalog masthead
  if (currentSubPage !== 'home') {
    return (
      <div className="bg-[#FAF8F5] text-[#141C24] min-h-screen font-sans">
        {renderHeaderAndNav(currentSubPage)}
        <main>
          <SubPages />
        </main>
        {renderDiscoveryFooter()}
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] text-[#141C24] min-h-screen font-sans">
      {renderHeaderAndNav('home')}

      {/* 3. Hero Section — Archival Sovereign Motif with Concentric Ring Security Watermark */}
      <section className="relative bg-[#050B14] bg-security-rings pt-16 pb-24 px-6 lg:px-8 overflow-hidden text-white border-b border-[#121F32]">
        {/* Archival Lighting Accents */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#D8BA75]/[0.05] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-4 left-10 w-[400px] h-[250px] bg-[#162942]/[0.12] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#081320] border border-[#D8BA75]/35 text-xs text-[#FAF7EE] font-catalog-mono tracking-wide shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8BA75] animate-pulse" />
            <span>Curated Scholarly Discovery Archive • Volume 1 (2026)</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-newsreader font-medium tracking-tight text-[#FAF7EE] leading-[1.12]">
            Empirical Taxation Research in Africa
          </h2>

          <p className="text-[#A6B7CC] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Advancing rigorous econometric scholarship, statutory jurisprudence, and public revenue policy through an open scientific repository.
          </p>

          {/* Central Library-Grade Search Bar */}
          <div className="pt-2 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 text-[#D8BA75] absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search catalog by title, author, keyword, or domain..."
                className="w-full pl-12 pr-4 py-3 bg-[#081320]/90 text-[#FAF7EE] placeholder-[#768A9E] text-sm rounded-2xl border border-[#1D2F47] focus:border-[#D8BA75] focus:ring-1 focus:ring-[#D8BA75]/40 outline-none backdrop-blur-md shadow-lg transition-all"
              />
            </div>
          </div>

          {/* Metadata Chips Below Search */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#E8EDF4] font-medium font-catalog-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D8BA75]" />
              <span>Double-Blind Peer Review</span>
            </span>
            <span className="text-[#D8BA75]/40">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#D8BA75]" />
              <span>Turnitin Screening (≤15% Threshold)</span>
            </span>
            <span className="text-[#D8BA75]/40">•</span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#D8BA75]" />
              <span>CITN & MOUAU Joint Publication</span>
            </span>
          </div>
        </div>
      </section>

      {/* 4. One Main Featured Slider Only — Synthesized Article Discovery & Editorial Rigor */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 -mt-10 mb-20 relative z-20">
        <div className="rounded-3xl bg-[#07111F] p-8 sm:p-10 text-white border border-[#D8BA75]/35 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          {/* Header Row / Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#152438]">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[11px] font-catalog-mono font-semibold uppercase tracking-wider text-[#D8BA75] bg-[#0E1E30] px-3 py-1 rounded-full border border-[#D8BA75]/35 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#D8BA75]" />
                Featured Catalog Item
              </span>
              <span className="text-[10px] font-catalog-mono font-medium text-[#00D4B8] bg-[#051820] px-2.5 py-1 rounded-full border border-[#00D4B8]/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-[#00D4B8]" />
                Editorially Reviewed (Turnitin ≤15%)
              </span>
              <span className="text-xs text-[#8CA0B8] font-catalog-mono hidden md:inline">
                Record {activeSlide + 1} of {articles.length} • Volume 1, Issue 1
              </span>
            </div>

            {/* Slide Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-xl bg-[#0E1A2B] hover:bg-[#16273F] text-[#FAF7EE] flex items-center justify-center border border-[#1E3048] hover:border-[#D8BA75]/40 transition-colors"
                aria-label="Previous record"
              >
                <ChevronLeft className="w-4 h-4 text-[#FAF7EE]" />
              </button>
              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-xl bg-[#0E1A2B] hover:bg-[#16273F] text-[#FAF7EE] flex items-center justify-center border border-[#1E3048] hover:border-[#D8BA75]/40 transition-colors"
                aria-label="Next record"
              >
                <ChevronRight className="w-4 h-4 text-[#FAF7EE]" />
              </button>
              <div className="flex items-center gap-1.5 ml-2">
                {articles.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === activeSlide ? 'w-6 bg-[#D8BA75]' : 'w-2 bg-[#8CA0B8]/30 hover:bg-[#8CA0B8]/60'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Active Article Body with Rationalized Discovery & Editorial Telemetry */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-[#D8BA75] tracking-wide uppercase font-catalog-mono">
                  {activeArticle.subjectAreas?.[0] || 'Empirical Taxation'}
                </span>
                <span className="text-[#D8BA75]/40">•</span>
                <span className="text-[11px] font-catalog-mono text-[#8CA0B8]">
                  DOI: {activeArticle.doi}
                </span>
                <span className="text-[#D8BA75]/40">•</span>
                <span className="text-[11px] font-catalog-mono text-[#768A9E]">
                  Section: {activeArticle.type || 'Research Article'}
                </span>
              </div>

              <h3
                onClick={() => {
                  setSelectedArticle(activeArticle);
                  setCurrentSubPage('article-detail');
                }}
                className="text-2xl sm:text-3xl lg:text-4xl font-newsreader font-medium text-[#FAF7EE] hover:text-[#D8BA75] cursor-pointer transition-colors leading-[1.18]"
              >
                {activeArticle.title}
              </h3>

              <div className="text-xs sm:text-sm text-[#B8C8DB] font-medium flex flex-wrap items-center gap-2">
                <span>By {activeArticle.authors.map((a) => a.name).join(', ')}</span>
                {activeArticle.authors[0]?.affiliation && (
                  <span className="text-[#768A9E] text-xs font-normal">
                    ({activeArticle.authors[0].affiliation})
                  </span>
                )}
              </div>

              <p className="text-sm text-[#9BB0C7] leading-relaxed line-clamp-3 font-normal">
                {activeArticle.abstract}
              </p>

              {/* Editorial Rigor Verification Badges */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <span className="text-[10px] font-catalog-mono text-[#FAF7EE] bg-[#0E1E30] px-2.5 py-1 rounded-md border border-[#1C324E] flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-[#D8BA75]" />
                  Double-Blind Review: Complete
                </span>
                <span className="text-[10px] font-catalog-mono text-[#FAF7EE] bg-[#0E1E30] px-2.5 py-1 rounded-md border border-[#1C324E] flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-[#00D4B8]" />
                  Turnitin Similarity: ≤15% Verified
                </span>
                <span className="text-[10px] font-catalog-mono text-[#00D4B8] bg-[#061822] px-2.5 py-1 rounded-md border border-[#00D4B8]/30">
                  Open Access (CC BY 4.0)
                </span>
              </div>

              {/* Discovery CTAs & Editorial Links */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    setSelectedArticle(activeArticle);
                    setCurrentSubPage('article-detail');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-[#D8BA75] to-[#C5A059] hover:from-[#E2C78A] hover:to-[#D4AF37] text-[#060D18] font-bold rounded-xl text-xs flex items-center gap-2 shadow-[0_2px_14px_rgba(216,186,117,0.25)] transition-all"
                >
                  <span>Explore Article</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#060D18]" />
                </button>

                <button
                  onClick={() => setCitationModalArticle(activeArticle)}
                  className="px-4 py-3 bg-[#0E1A2B] hover:bg-[#16273F] text-[#FAF7EE] font-semibold rounded-xl text-xs border border-[#1E3048] hover:border-[#D8BA75]/40 flex items-center gap-2 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-[#D8BA75]" />
                  <span>Cite</span>
                </button>

                <button
                  onClick={() => setCurrentSubPage('peer-review')}
                  className="text-xs font-catalog-mono text-[#D8BA75] hover:text-[#FAF7EE] underline transition-colors"
                >
                  View Review Protocol →
                </button>
              </div>
            </div>

            {/* Live Data & Integrated Editorial Notice Panel */}
            <div className="lg:col-span-4 bg-[#050C16] rounded-2xl border border-[#18283E] p-6 space-y-4">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#18283E]">
                <span className="text-[10px] font-catalog-mono font-bold uppercase tracking-wider text-[#A6B7CC] block">
                  Live Usage Statistics
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-catalog-mono text-[#00D4B8]">
                  <span className="w-2 h-2 rounded-full bg-[#00D4B8] animate-pulse" />
                  Live Sync
                </span>
              </div>

              {/* Metrics Grid — Selective Teal ONLY for live signals */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="bg-[#081320] p-3 rounded-xl border border-[#122236]">
                  <span className="text-[10px] text-[#788C9E] block">Views</span>
                  <span className="text-2xl font-catalog-mono font-bold text-[#00D4B8] block mt-0.5">
                    {activeArticle.metrics?.views.toLocaleString() || '3,840'}
                  </span>
                </div>
                <div className="bg-[#081320] p-3 rounded-xl border border-[#122236]">
                  <span className="text-[10px] text-[#788C9E] block">Downloads</span>
                  <span className="text-2xl font-catalog-mono font-bold text-[#00D4B8] block mt-0.5">
                    {activeArticle.metrics?.downloads.toLocaleString() || '1,420'}
                  </span>
                </div>
                <div className="bg-[#081320] p-3 rounded-xl border border-[#122236]">
                  <span className="text-[10px] text-[#788C9E] block">Citations</span>
                  <span className="text-2xl font-catalog-mono font-bold text-[#00D4B8] block mt-0.5">
                    {activeArticle.metrics?.citations || 12}
                  </span>
                </div>
                <div className="bg-[#081320] p-3 rounded-xl border border-[#122236]">
                  <span className="text-[10px] text-[#788C9E] block">Access Status</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00D4B8] mt-1.5 font-catalog-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4B8]" />
                    Gold OA
                  </span>
                </div>
              </div>

              {/* Integrated Editorial Notice: Turnitin Screening Standards */}
              <div className="pt-3.5 border-t border-[#18283E] space-y-2 bg-[#07111F]/70 -mx-6 -mb-6 p-5 rounded-b-2xl border-b-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-catalog-mono uppercase tracking-wider text-[#D8BA75] font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D8BA75]" />
                    Turnitin Threshold (≤15%)
                  </span>
                  <span className="text-[9px] font-catalog-mono text-[#00D4B8] bg-[#051820] px-2 py-0.5 rounded border border-[#00D4B8]/30">
                    Active Standard
                  </span>
                </div>
                <p className="text-[11px] text-[#8EA2B8] leading-tight font-normal">
                  Pre-publication similarity index strictly limited to ≤15%. Rigorous double-blind peer review under COPE ethical framework.
                </p>
                <div className="flex items-center gap-3 pt-1.5 text-[10px] font-catalog-mono">
                  <button
                    onClick={() => setCurrentSubPage('peer-review')}
                    className="text-[#D8BA75] hover:text-[#FAF7EE] font-semibold underline transition-colors"
                  >
                    View Review Protocol
                  </button>
                  <span className="text-[#1A2E46]">•</span>
                  <button
                    onClick={() => setCurrentSubPage('ethics')}
                    className="text-[#8EA2B8] hover:text-[#FAF7EE] underline transition-colors"
                  >
                    Publication Ethics
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Article List Section — Library Catalog Index Card Architecture */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E2DDCF]">
          <div>
            <span className="text-xs font-catalog-mono font-semibold text-[#8C6D32] uppercase tracking-wider block">
              Library Research Index
            </span>
            <h3 className="text-2xl sm:text-3xl font-newsreader font-semibold text-[#141C24] mt-1">
              Cataloged Research Articles
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Archival records for Volume 1, Issue 1. Rigorous double-blind peer-reviewed scholarship.
            </p>
          </div>

          <button
            onClick={() => setCurrentSubPage('articles')}
            className="text-xs font-semibold text-[#8C6D32] hover:text-[#5E471E] flex items-center gap-1.5 transition-colors self-start sm:self-auto font-catalog-mono"
          >
            <span>View Full Archive Index</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Archival Index Card Grid / Flow */}
        <div className="space-y-8">
          {filteredArticles.map((article, idx) => {
            const catalogNumber = `CAT. TF-2026-ART-${String(idx + 1).padStart(3, '0')}`;
            return (
              <article
                key={article.id}
                className="archive-index-card rounded-2xl p-7 sm:p-8 flex flex-col justify-between"
              >
                {/* Gold Archival Top Tab */}
                <div className="w-36 h-2.5 bg-gradient-to-r from-[#C5A059] to-[#DFBF7A] rounded-t-md -mt-9 sm:-mt-10 ml-2 mb-4 shadow-xs" />

                {/* Card Header & Metadata */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-catalog-mono font-bold text-[#8C6D32] bg-[#FAF3E0] px-2.5 py-0.5 rounded border border-[#C5A059]/40">
                        {catalogNumber}
                      </span>
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded">
                        {article.subjectAreas?.[0] || 'Taxation'}
                      </span>
                    </div>

                    <span className="text-[11px] font-catalog-mono text-slate-400">
                      DOI: https://doi.org/{article.doi}
                    </span>
                  </div>

                  <h4
                    onClick={() => {
                      setSelectedArticle(article);
                      setCurrentSubPage('article-detail');
                    }}
                    className="font-newsreader text-xl sm:text-2xl font-semibold text-[#141C24] hover:text-[#8C6D32] cursor-pointer transition-colors leading-snug"
                  >
                    {article.title}
                  </h4>

                  <p className="text-xs text-[#526375] font-medium">
                    {article.authors.map((a) => a.name).join(', ')} • {article.authors[0]?.affiliation || 'Faculty of Management Sciences'}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl line-clamp-2 pt-1">
                    {article.abstract}
                  </p>
                </div>

                {/* Card Footer with Table-of-Contents Leader Dots */}
                <div className="mt-6 pt-4 border-t border-[#EAE5DA] flex items-center justify-between text-xs">
                  <span className="font-catalog-mono text-slate-500 text-[11px]">
                    Indexed: {article.publicationDate}
                  </span>

                  {/* Dotted Table-of-Contents Leader Line */}
                  <div className="toc-leader-dots hidden sm:block" />

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setCitationModalArticle(article)}
                      className="text-slate-500 hover:text-slate-800 text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      <Copy className="w-3 h-3 text-[#8C6D32]" />
                      <span>Cite</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedArticle(article);
                        setCurrentSubPage('article-detail');
                      }}
                      className="font-bold text-[#8C6D32] hover:text-[#5E471E] flex items-center gap-1 transition-colors"
                    >
                      <span>Read Article</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 6. Research Domains — Subject Index / Catalog Listing (Not a generic card grid!) */}
      <section className="bg-[#F4EFEB] border-y border-[#E2DACF] py-20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center sm:text-left">
            <span className="text-xs font-catalog-mono font-semibold text-[#8C6D32] uppercase tracking-wider block">
              Curated Research Taxonomies
            </span>
            <h3 className="text-2xl sm:text-3xl font-newsreader font-semibold text-[#141C24] mt-1">
              Subject Index & Research Domains
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Formal index structure organizing statutory jurisprudence, macroeconomic tax policy, and empirical analysis across African economies.
            </p>
          </div>

          {/* Structured Two-Column Catalog Index Listing with Dotted Leaders */}
          <div className="bg-white rounded-2xl border border-[#E0D7CB] p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {catalogDomains.map((domain, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentSubPage('aims-scope')}
                  className="py-3 border-b border-[#EDE7DC] flex items-baseline justify-between group cursor-pointer"
                >
                  <div className="flex items-baseline gap-2 min-w-0 pr-2">
                    <span className="font-catalog-mono text-[10px] text-slate-400 shrink-0 font-medium">
                      {domain.code}
                    </span>
                    <span className="font-medium text-slate-800 group-hover:text-[#8C6D32] transition-colors text-xs sm:text-sm truncate">
                      {domain.name}
                    </span>
                  </div>

                  {/* Dotted Leader Line */}
                  <div className="toc-leader-dots shrink-0 w-8 sm:w-16" />

                  <span className="font-catalog-mono text-[11px] text-[#8C6D32] group-hover:text-[#5E471E] font-semibold shrink-0">
                    {domain.count} papers
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#EAE2D5] flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-500 font-catalog-mono">
                Indexed in alignment with JEL (Journal of Economic Literature) Classification
              </span>
              <button
                onClick={() => setCurrentSubPage('aims-scope')}
                className="text-xs font-bold text-[#8C6D32] hover:text-[#5E471E] flex items-center gap-1.5 font-catalog-mono"
              >
                <span>Browse All 26 Subject Taxonomies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Call for Papers CTA Block — Elegant Dark Section */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
        <div className="bg-[#070E1A] bg-security-rings text-white rounded-3xl p-8 sm:p-12 border border-[#C5A059]/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-3 max-w-xl relative z-10">
            <span className="text-xs font-catalog-mono font-bold text-[#C5A059] uppercase tracking-wider block">
              Call for Papers • Volume 1, Issue 1
            </span>
            <h3 className="text-2xl sm:text-3xl font-newsreader font-semibold text-[#F8F6F0] leading-tight">
              Submit to the Inaugural Edition
            </h3>
            <p className="text-sm text-[#A6B7CC] leading-relaxed">
              Accepting original empirical manuscripts, doctrinal studies, and econometric policy reviews. Submissions undergo rigorous double-blind peer assessment with rapid editorial turnaround.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto relative z-10">
            <button
              onClick={() => setCurrentSubPage('submit')}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#C5A059] hover:bg-[#D4AF37] text-[#070E1A] font-bold rounded-xl text-xs transition-all shadow-md text-center"
            >
              Submit Manuscript
            </button>
            <button
              onClick={() => setCurrentSubPage('call-for-papers')}
              className="w-full sm:w-auto px-5 py-3.5 bg-[#0E1A2B] hover:bg-[#16273F] text-[#F8F6F0] font-semibold rounded-xl text-xs border border-[#1E3048] transition-colors text-center"
            >
              Guidelines
            </button>
          </div>
        </div>
      </section>

      {/* Citation Modal / Drawer */}
      {citationModalArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-300 max-w-lg w-full p-6 shadow-2xl space-y-4 text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Copy className="w-4 h-4 text-[#8C6D32]" />
                <h4 className="font-newsreader font-semibold text-base text-[#141C24]">
                  Cite This Research Article
                </h4>
              </div>
              <button
                onClick={() => setCitationModalArticle(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold px-2 py-1 rounded"
              >
                Close ✕
              </button>
            </div>

            <p className="text-xs text-slate-700 font-medium">
              {citationModalArticle.title}
            </p>

            {/* Citation Formats */}
            <div className="flex items-center gap-1 border-b border-slate-200 pb-2 text-xs">
              {(['apa', 'harvard', 'bibtex'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setActiveCitationTab(fmt)}
                  className={`px-3 py-1 rounded-lg font-bold uppercase text-[10px] tracking-wider transition-colors ${
                    activeCitationTab === fmt
                      ? 'bg-[#8C6D32] text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-catalog-mono text-xs text-slate-800 break-words leading-relaxed max-h-40 overflow-y-auto">
              {activeCitationTab === 'apa' && (
                <span>
                  {citationModalArticle.authors.map((a) => a.name).join(', ')} ({citationModalArticle.publicationDate.split(' ')[1] || '2026'}). {citationModalArticle.title}. <em>Tax Frontier Discovery</em>, {citationModalArticle.volume}({citationModalArticle.issue}), {citationModalArticle.pages}. https://doi.org/{citationModalArticle.doi}
                </span>
              )}
              {activeCitationTab === 'harvard' && (
                <span>
                  {citationModalArticle.authors.map((a) => a.name).join(', ')}, {citationModalArticle.publicationDate.split(' ')[1] || '2026'}. '{citationModalArticle.title}', <em>Tax Frontier Discovery</em>, vol. {citationModalArticle.volume}, no. {citationModalArticle.issue}, pp. {citationModalArticle.pages}. Available at: &lt;https://doi.org/{citationModalArticle.doi}&gt;.
                </span>
              )}
              {activeCitationTab === 'bibtex' && (
                <pre className="text-[11px] whitespace-pre-wrap">
                  {`@article{taxfrontier_${citationModalArticle.id},
  title={${citationModalArticle.title}},
  author={${citationModalArticle.authors.map((a) => a.name).join(' and ')}},
  journal={Tax Frontier Discovery},
  volume={${citationModalArticle.volume}},
  number={${citationModalArticle.issue}},
  pages={${citationModalArticle.pages}},
  year={${citationModalArticle.publicationDate.split(' ')[1] || '2026'}},
  doi={${citationModalArticle.doi}}
}`}
                </pre>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setCitationModalArticle(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  copyCitationText(citationModalArticle, activeCitationTab);
                  setCitationModalArticle(null);
                }}
                className="px-4 py-2 bg-[#8C6D32] hover:bg-[#A37F3B] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy to Clipboard</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Scientific Journal Footer */}
      {renderDiscoveryFooter()}
    </div>
  );
};
