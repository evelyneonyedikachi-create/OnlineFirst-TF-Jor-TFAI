import React, { useState } from 'react';
import { useJournalConfig } from '../../context/JournalConfigContext';
import { SubPages } from './SubPages';
import { JournalAnnouncementModule } from '../common/JournalAnnouncementModule';
import {
  maidenCallForPapers,
} from '../../data/journalData';
import {
  Calendar,
  ChevronRight,
  Download,
  FileText,
  Award,
  Clock,
  ShieldCheck,
  Send,
  Building,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Bookmark,
  Landmark,
  Scale,
  Users,
  Check,
  ArrowRight,
  Sun,
  Moon,
  Stamp,
  BookOpen,
  Hash,
  Globe,
  Share2,
} from 'lucide-react';
import { JournalArticle } from '../../types';

export const Demo1Institutional: React.FC = () => {
  const {
    currentSubPage,
    setCurrentSubPage,
    config,
    articles,
    setSelectedArticle,
  } = useJournalConfig();

  // Primary design default: Light Institutional (false). Optional: Dark Scholarly Mode (true).
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Official Institutional Seal Component
  const InstitutionalSeal = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const dim = size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-24 h-24' : 'w-16 h-16';
    const textSize = size === 'sm' ? 'text-[7px]' : size === 'lg' ? 'text-[11px]' : 'text-[9px]';
    const monogramSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-2xl' : 'text-base';

    return (
      <div
        className={`${dim} rounded-full relative flex items-center justify-center shrink-0 shadow-sm select-none ${
          isDarkMode
            ? 'bg-[#02180A] border-2 border-[#C48A36] text-[#C48A36]'
            : 'bg-[#012509] border-2 border-[#C48A36] text-[#C48A36]'
        }`}
        title="Official Seal: CITN Umuahia Chapter & MOUAU COLMAS"
      >
        {/* Inner concentric ring */}
        <div className="absolute inset-1 rounded-full border border-[#C48A36]/60 border-dashed" />
        
        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <span className={`font-d1-heading font-bold ${monogramSize} tracking-tighter text-[#C48A36] leading-none`}>
            TF
          </span>
          {size !== 'sm' && (
            <span className="text-[7px] font-d1-mono uppercase tracking-widest text-[#DFD5CE] mt-0.5 font-bold">
              2026
            </span>
          )}
        </div>
      </div>
    );
  };

  // Circular / Stamp-like Call for Papers Badge
  const CircularCfpStamp = () => {
    return (
      <div className="relative inline-flex items-center justify-center group cursor-pointer" onClick={() => setCurrentSubPage('call-for-papers')}>
        {/* Outer Circular Stamp Ring */}
        <div
          className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center p-2 relative shadow-md transition-transform duration-300 group-hover:scale-105 ${
            isDarkMode
              ? 'bg-[#0A2616] border-2 border-dashed border-[#BF6521]'
              : 'bg-[#FAF6F0] border-2 border-dashed border-[#BF6521]'
          }`}
          style={{ transform: 'rotate(-4deg)' }}
        >
          {/* Inner Circular Solid Badge */}
          <div
            className={`w-full h-full rounded-full flex flex-col items-center justify-center text-center p-2 border ${
              isDarkMode
                ? 'bg-[#BF6521]/20 border-[#BF6521]/60 text-[#FAF8F5]'
                : 'bg-[#BF6521] border-[#A85418] text-white'
            }`}
          >
            <span className="text-[8px] sm:text-[9px] font-d1-mono uppercase tracking-wider font-bold opacity-90">
              Maiden Issue
            </span>
            <span className="text-xl sm:text-2xl font-d1-heading font-extrabold tracking-tight text-[#C48A36] leading-tight">
              30% OFF
            </span>
            <span className="text-[9px] sm:text-[10px] font-d1-ui font-semibold uppercase tracking-wider">
              Fee Waiver
            </span>
            <span className="text-[7px] sm:text-[8px] font-d1-mono opacity-80 mt-0.5">
              CITN × MOUAU
            </span>
          </div>

          {/* Decorative Stamp Notches */}
          <div className="absolute -top-1.5 px-2 py-0.5 bg-[#012509] text-[#C48A36] text-[8px] font-d1-mono font-bold rounded-full border border-[#C48A36]/40 uppercase tracking-widest shadow-2xs">
            Official CFP
          </div>
        </div>
      </div>
    );
  };

  // If viewing a subpage (e.g., 'about', 'aims-scope', 'submit', etc.)
  if (currentSubPage !== 'home') {
    return (
      <div
        className={`min-h-screen transition-colors duration-200 ${
          isDarkMode
            ? 'bg-[#04140A] text-[#DFD5CE] font-d1-body'
            : 'bg-[#FAF8F5] text-[#1C2621] font-d1-body'
        }`}
      >
        {/* Institutional Utility Top Strip */}
        <div
          className={`text-[11px] py-2 px-4 sm:px-6 border-b transition-colors ${
            isDarkMode
              ? 'bg-[#02180A] text-[#DFD5CE] border-[#143322]'
              : 'bg-[#012509] text-[#DFD5CE] border-[#012509]'
          }`}
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C48A36]" />
              <span className="font-semibold text-white">CITN Umuahia Chapter</span>
              <span className="text-[#C48A36]">×</span>
              <span className="font-semibold text-white">MOUAU COLMAS</span>
              <span className="text-[#DFD5CE]/50 hidden sm:inline">|</span>
              <span className="text-[#DFD5CE]/80 hidden sm:inline text-[10px] font-d1-mono">
                Joint Refereed Journal
              </span>
            </div>

            <div className="flex items-center gap-4 text-[10px]">
              {/* Mode Switcher */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-d1-ui text-[11px] transition-all ${
                  isDarkMode
                    ? 'bg-[#C48A36] text-[#012509] font-bold shadow-xs'
                    : 'bg-white/10 hover:bg-white/20 text-[#DFD5CE] hover:text-white border border-[#DFD5CE]/30'
                }`}
                title="Toggle Light Institutional / Dark Scholarly Mode"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-[#012509]" />
                    <span>Dark Scholarly</span>
                    <span className="text-[9px] opacity-75 font-normal">(Click for Light)</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#C48A36]" />
                    <span>Light Institutional</span>
                    <span className="text-[9px] text-[#C48A36] font-semibold">(Dark Available)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setCurrentSubPage('submit')}
                className="text-[#C48A36] hover:text-white font-semibold transition-colors flex items-center gap-1 font-d1-ui"
              >
                <span>Author Portal</span>
                <span className="text-[#BF6521]">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* University-Style Main Header */}
        <header
          className={`border-b transition-colors shadow-2xs ${
            isDarkMode
              ? 'bg-[#031D0E] border-[#183B26]'
              : 'bg-white border-[#DFD5CE]'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setCurrentSubPage('home')} className="shrink-0">
                <InstitutionalSeal size="md" />
              </button>
              <div>
                <button
                  onClick={() => setCurrentSubPage('home')}
                  className={`text-2xl sm:text-3xl font-d1-heading font-bold tracking-tight block transition-colors text-left ${
                    isDarkMode ? 'text-[#FAF8F5] hover:text-[#C48A36]' : 'text-[#012509] hover:text-[#C48A36]'
                  }`}
                >
                  Tax Frontier
                </button>
                <p className={`text-xs font-d1-body font-medium mt-0.5 ${isDarkMode ? 'text-[#DFD5CE]/80' : 'text-slate-600'}`}>
                  Navigating the New Era of Taxation • Joint CITN-MOUAU Publishing
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentSubPage('submit')}
                className="px-4 py-2 bg-[#C48A36] hover:bg-[#b0782b] text-[#012509] font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all font-d1-ui"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Paper</span>
              </button>
            </div>
          </div>

          {/* Institutional Primary Navigation */}
          <nav
            className={`text-xs px-4 border-t transition-colors ${
              isDarkMode
                ? 'bg-[#02180A] text-[#DFD5CE] border-[#143322]'
                : 'bg-[#012509] text-white border-[#012509]'
            }`}
          >
            <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-1 py-1.5 font-d1-ui">
              <button
                onClick={() => setCurrentSubPage('home')}
                className="px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-[#DFD5CE] hover:text-white"
              >
                Overview
              </button>
              <button
                onClick={() => setCurrentSubPage('about')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentSubPage === 'about'
                    ? 'bg-white/15 text-[#C48A36] font-semibold border-b-2 border-[#BF6521]'
                    : 'text-[#DFD5CE] hover:bg-white/10 hover:text-white'
                }`}
              >
                Institutional Mandate
              </button>
              <button
                onClick={() => setCurrentSubPage('aims-scope')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentSubPage === 'aims-scope'
                    ? 'bg-white/15 text-[#C48A36] font-semibold border-b-2 border-[#BF6521]'
                    : 'text-[#DFD5CE] hover:bg-white/10 hover:text-white'
                }`}
              >
                Aims & Scope (26 Areas)
              </button>
              <button
                onClick={() => setCurrentSubPage('call-for-papers')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentSubPage === 'call-for-papers'
                    ? 'bg-white/15 text-[#C48A36] font-semibold border-b-2 border-[#BF6521]'
                    : 'text-[#DFD5CE] hover:bg-white/10 hover:text-white'
                }`}
              >
                Call for Papers
              </button>
              <button
                onClick={() => setCurrentSubPage('announcements')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentSubPage === 'announcements'
                    ? 'bg-white/15 text-[#C48A36] font-semibold border-b-2 border-[#BF6521]'
                    : 'text-[#DFD5CE] hover:bg-white/10 hover:text-white'
                }`}
              >
                Announcements
              </button>
              <button
                onClick={() => setCurrentSubPage('editorial-board')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentSubPage === 'editorial-board'
                    ? 'bg-white/15 text-[#C48A36] font-semibold border-b-2 border-[#BF6521]'
                    : 'text-[#DFD5CE] hover:bg-white/10 hover:text-white'
                }`}
              >
                Editorial Council
              </button>
              <button
                onClick={() => setCurrentSubPage('peer-review')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentSubPage === 'peer-review'
                    ? 'bg-white/15 text-[#C48A36] font-semibold border-b-2 border-[#BF6521]'
                    : 'text-[#DFD5CE] hover:bg-white/10 hover:text-white'
                }`}
              >
                Peer Review Process
              </button>
            </div>
          </nav>
        </header>

        <main>
          <SubPages />
        </main>
      </div>
    );
  }

  // MAIN DEMO 1 VIEW: Light Institutional Palette by Default, Dark Scholarly Mode as Option
  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDarkMode
          ? 'bg-[#04140A] text-[#DFD5CE] font-d1-body'
          : 'bg-[#FAF8F5] text-[#1C2621] font-d1-body'
      }`}
    >
      {/* 1. Structured Institutional Top Bar */}
      <div
        className={`text-[11px] py-2 px-4 sm:px-6 border-b transition-colors ${
          isDarkMode
            ? 'bg-[#02180A] text-[#DFD5CE] border-[#143322]'
            : 'bg-[#012509] text-[#DFD5CE] border-[#012509]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C48A36] shadow-xs" />
            <span className="font-semibold text-white">CITN Umuahia Chapter</span>
            <span className="text-[#C48A36]">×</span>
            <span className="font-semibold text-white">MOUAU College of Management Sciences (COLMAS)</span>
            <span className="text-[#DFD5CE]/40 hidden md:inline">|</span>
            <span className="hidden md:inline font-d1-mono text-[10px] text-[#DFD5CE]/80">
              Statutory Professional & Academic Alliance
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            {/* Mode Switcher Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-d1-ui text-[11px] font-semibold transition-all shadow-xs ${
                isDarkMode
                  ? 'bg-[#C48A36] text-[#012509] hover:bg-[#d89f4b]'
                  : 'bg-white/10 hover:bg-white/20 text-[#DFD5CE] hover:text-white border border-[#DFD5CE]/40'
              }`}
              title="Toggle Light Institutional or Dark Scholarly Mode"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#012509]" />
                  <span>Scholarly Dark Active</span>
                  <span className="text-[9px] opacity-80 font-normal">(Switch to Light)</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#C48A36]" />
                  <span>Light Institutional (Default)</span>
                  <span className="text-[9px] text-[#C48A36] font-semibold">• Switch to Dark</span>
                </>
              )}
            </button>

            <span className="hidden sm:inline font-d1-mono text-[10px] text-[#DFD5CE]/80">
              Biannual: June & Dec
            </span>
            <button
              onClick={() => setCurrentSubPage('submit')}
              className="text-[#C48A36] hover:text-white font-semibold transition-colors flex items-center gap-1 font-d1-ui"
            >
              <span>Author Portal</span>
              <span className="text-[#BF6521]">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Structured Institutional Masthead & Primary Navigation */}
      <header
        className={`border-b transition-colors shadow-2xs ${
          isDarkMode
            ? 'bg-[#031D0E] border-[#183B26]'
            : 'bg-white border-[#DFD5CE]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Official Seal */}
            <InstitutionalSeal size="md" />

            <div>
              <div className="flex items-center gap-2.5">
                <h1
                  className={`text-2xl sm:text-3xl font-d1-heading font-bold tracking-tight ${
                    isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'
                  }`}
                >
                  Tax Frontier
                </h1>
                <span
                  className={`text-[10px] font-d1-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    isDarkMode
                      ? 'bg-[#0A2616] text-[#C48A36] border-[#C48A36]/40'
                      : 'bg-[#DFD5CE]/40 text-[#012509] border-[#D7A37B]/40'
                  }`}
                >
                  Vol. 1 • Issue 1 (2026)
                </span>
              </div>
              <p
                className={`text-xs font-d1-body font-medium mt-0.5 ${
                  isDarkMode ? 'text-[#DFD5CE]/80' : 'text-slate-600'
                }`}
              >
                Navigating the New Era of Taxation — Joint Academic & Professional Publishing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentSubPage('call-for-papers')}
              className={`px-4 py-2.5 font-d1-ui font-medium rounded-xl text-xs border transition-colors ${
                isDarkMode
                  ? 'bg-[#082213] hover:bg-[#0D2F1B] text-[#FAF8F5] border-[#1E452E]'
                  : 'bg-white hover:bg-[#DFD5CE]/25 text-[#012509] border-[#DFD5CE]'
              }`}
            >
              Maiden Call for Papers
            </button>
            <button
              onClick={() => setCurrentSubPage('submit')}
              className="px-5 py-2.5 bg-[#C48A36] hover:bg-[#b0782b] text-[#012509] font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all font-d1-ui"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Manuscript</span>
            </button>
          </div>
        </div>

        {/* Institutional Section Navigation */}
        <nav
          className={`text-xs px-4 border-t transition-colors ${
            isDarkMode
              ? 'bg-[#02180A] text-[#DFD5CE] border-[#143322]'
              : 'bg-[#012509] text-white border-[#012509]'
          }`}
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-1 py-1.5 font-d1-ui">
            <button
              onClick={() => setCurrentSubPage('home')}
              className="px-3.5 py-1.5 rounded-lg bg-white/15 text-[#C48A36] font-semibold border-b-2 border-[#BF6521] transition-colors"
            >
              Journal Overview
            </button>
            <button
              onClick={() => setCurrentSubPage('about')}
              className="px-3.5 py-1.5 rounded-lg hover:bg-white/10 text-[#DFD5CE] hover:text-white transition-colors"
            >
              Institutional Mandate
            </button>
            <button
              onClick={() => setCurrentSubPage('aims-scope')}
              className="px-3.5 py-1.5 rounded-lg hover:bg-white/10 text-[#DFD5CE] hover:text-white transition-colors"
            >
              Aims & Scope (26 Areas)
            </button>
            <button
              onClick={() => setCurrentSubPage('editorial-board')}
              className="px-3.5 py-1.5 rounded-lg hover:bg-white/10 text-[#DFD5CE] hover:text-white transition-colors"
            >
              Editorial Council
            </button>
            <button
              onClick={() => setCurrentSubPage('author-guidelines')}
              className="px-3.5 py-1.5 rounded-lg hover:bg-white/10 text-[#DFD5CE] hover:text-white transition-colors"
            >
              Author Guidelines
            </button>
            <button
              onClick={() => setCurrentSubPage('announcements')}
              className="px-3.5 py-1.5 rounded-lg hover:bg-white/10 text-[#DFD5CE] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>Announcements</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C48A36]" />
            </button>
            <button
              onClick={() => setCurrentSubPage('peer-review')}
              className="px-3.5 py-1.5 rounded-lg hover:bg-white/10 text-[#DFD5CE] hover:text-white transition-colors"
            >
              14-Step Review
            </button>
            <button
              onClick={() => setCurrentSubPage('fees')}
              className="px-3.5 py-1.5 rounded-lg hover:bg-white/10 text-[#DFD5CE] hover:text-white transition-colors"
            >
              Publication Fees
            </button>
          </div>
        </nav>
      </header>

      {/* 3. Institutional Hero — Authoritative Presentation */}
      <section
        className={`border-b transition-colors py-12 px-4 sm:px-6 relative overflow-hidden ${
          isDarkMode
            ? 'bg-[#031B0E] border-[#183B26]'
            : 'bg-white border-[#DFD5CE]'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Heading, Mandate, Actions */}
            <div className="lg:col-span-8 space-y-5">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-d1-ui border ${
                  isDarkMode
                    ? 'bg-[#0A2616] border-[#1F4C30] text-[#FAF8F5]'
                    : 'bg-[#DFD5CE]/35 border-[#DFD5CE] text-[#012509]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#C48A36]" />
                <span className="font-semibold tracking-wide">
                  Refereed Scholarly & Professional Publication • Volume 1
                </span>
              </div>

              <h2
                className={`text-3xl sm:text-5xl lg:text-[46px] font-d1-hero-title tracking-tight leading-[1.12] ${
                  isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'
                }`}
              >
                Bridging Academic Rigor & Practical Tax Governance
              </h2>

              <p
                className={`text-sm sm:text-base leading-relaxed max-w-3xl font-normal ${
                  isDarkMode ? 'text-[#DFD5CE]/90' : 'text-slate-700'
                }`}
              >
                Tax Frontier is an internationally indexed, double-blind peer-reviewed journal jointly published by{' '}
                <strong className={isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'}>
                  The Chartered Institute of Taxation of Nigeria (CITN Umuahia Chapter)
                </strong>{' '}
                and the{' '}
                <strong className={isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'}>
                  College of Management Sciences (COLMAS), MOUAU
                </strong>
                . We publish pioneering empirical research, statutory case analyses, and revenue administration reforms.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setCurrentSubPage('submit')}
                  className="px-6 py-3 bg-[#C48A36] hover:bg-[#b0782b] text-[#012509] font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm hover:shadow-md transition-all font-d1-ui"
                >
                  <Send className="w-3.5 h-3.5 text-[#012509]" />
                  <span>Submit to Maiden Issue</span>
                </button>
                <button
                  onClick={() => setCurrentSubPage('call-for-papers')}
                  className={`px-5 py-3 font-d1-ui font-medium rounded-xl text-xs border transition-colors flex items-center gap-1.5 shadow-2xs ${
                    isDarkMode
                      ? 'bg-[#082213] hover:bg-[#0E331E] text-[#FAF8F5] border-[#1E452E]'
                      : 'bg-white hover:bg-[#DFD5CE]/20 text-[#012509] border-slate-300'
                  }`}
                >
                  <span>Read Author Call for Papers</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#BF6521]" />
                </button>
              </div>
            </div>

            {/* Right Column: Stamp Callout & Official Seal Centerpiece */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <CircularCfpStamp />
              <div className="text-center space-y-1">
                <span className="text-xs font-d1-heading font-bold text-[#C48A36] uppercase tracking-wider block">
                  Maiden Volume 1 (2026)
                </span>
                <span className={`text-[11px] font-d1-mono block ${isDarkMode ? 'text-[#DFD5CE]/70' : 'text-slate-500'}`}>
                  Submission Deadline: {config.submissionDeadline}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 Prominent Reusable Announcement / Call-to-Action Bulletin */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <JournalAnnouncementModule variant="demo1" isDarkMode={isDarkMode} />
      </section>

      {/* 4. Ledger-Style Stat Strip (Scholarly Accounting Double-Rule Design) */}
      <section
        className={`border-b transition-colors py-5 px-4 sm:px-6 ${
          isDarkMode
            ? 'bg-[#02180A] border-[#183B26]'
            : 'bg-[#FCFAF8] border-[#DFD5CE]'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Top Ledger Rule */}
          <div className={`h-[2px] mb-4 ${isDarkMode ? 'bg-[#C48A36]/40' : 'bg-[#012509]'}`} />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-y md:divide-y-0 md:divide-x divide-[#DFD5CE]/40 text-xs">
            <div className="p-2">
              <span className="font-d1-mono text-[10px] uppercase tracking-wider text-[#C48A36] block font-bold">
                [01] Folio Designation
              </span>
              <strong
                className={`text-base font-d1-heading font-bold block mt-1 ${
                  isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'
                }`}
              >
                Vol. 1 • Issue 1
              </strong>
              <span className={`text-[11px] font-d1-ui block ${isDarkMode ? 'text-[#DFD5CE]/80' : 'text-slate-600'}`}>
                Inaugural 2026 Volume
              </span>
            </div>

            <div className="p-2 pt-3 md:pt-2 md:pl-4">
              <span className="font-d1-mono text-[10px] uppercase tracking-wider text-[#C48A36] block font-bold">
                [02] Publishing Cadence
              </span>
              <strong
                className={`text-base font-d1-heading font-bold block mt-1 ${
                  isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'
                }`}
              >
                Biannual Issues
              </strong>
              <span className={`text-[11px] font-d1-ui block ${isDarkMode ? 'text-[#DFD5CE]/80' : 'text-slate-600'}`}>
                June & December Releases
              </span>
            </div>

            <div className="p-2 pt-3 md:pt-2 md:pl-4">
              <span className="font-d1-mono text-[10px] uppercase tracking-wider text-[#C48A36] block font-bold">
                [03] Peer Review Protocol
              </span>
              <strong
                className={`text-base font-d1-heading font-bold block mt-1 ${
                  isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'
                }`}
              >
                Double-Blind Rigor
              </strong>
              <span className={`text-[11px] font-d1-ui block ${isDarkMode ? 'text-[#DFD5CE]/80' : 'text-slate-600'}`}>
                4–6 Week Standard Cycle
              </span>
            </div>

            <div className="p-2 pt-3 md:pt-2 md:pl-4">
              <span className="font-d1-mono text-[10px] uppercase tracking-wider text-[#BF6521] block font-bold">
                [04] Similarity Filter
              </span>
              <strong
                className={`text-base font-d1-heading font-bold block mt-1 ${
                  isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'
                }`}
              >
                ≤15% Turnitin
              </strong>
              <span className={`text-[11px] font-d1-ui block ${isDarkMode ? 'text-[#DFD5CE]/80' : 'text-slate-600'}`}>
                Rigorous Plagiarism Screening
              </span>
            </div>

            <div className="p-2 pt-3 md:pt-2 md:pl-4">
              <span className="font-d1-mono text-[10px] uppercase tracking-wider text-[#C48A36] block font-bold">
                [05] Open Access Standard
              </span>
              <strong
                className={`text-base font-d1-heading font-bold block mt-1 ${
                  isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'
                }`}
              >
                CC BY 4.0 License
              </strong>
              <span className={`text-[11px] font-d1-ui block ${isDarkMode ? 'text-[#DFD5CE]/80' : 'text-slate-600'}`}>
                Crossref Registered DOIs
              </span>
            </div>
          </div>

          {/* Bottom Ledger Rule (Double rule effect) */}
          <div className={`h-[1px] mt-4 ${isDarkMode ? 'bg-[#C48A36]/40' : 'bg-[#012509]'}`} />
          <div className={`h-[2px] mt-1 ${isDarkMode ? 'bg-[#C48A36]/20' : 'bg-[#DFD5CE]'}`} />
        </div>
      </section>

      {/* 5. Issue Metadata Folio Treatment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        <div
          className={`rounded-2xl border p-6 transition-colors ${
            isDarkMode
              ? 'bg-[#071F12] border-[#1C442A]'
              : 'bg-[#DFD5CE]/30 border-[#DFD5CE]'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DFD5CE]/60 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <Stamp className="w-5 h-5 text-[#C48A36]" />
              <div>
                <h3
                  className={`text-sm font-d1-heading font-bold uppercase tracking-wider ${
                    isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'
                  }`}
                >
                  Official Issue Metadata & Academic Registration
                </h3>
                <span className={`text-[11px] font-d1-mono ${isDarkMode ? 'text-[#DFD5CE]/70' : 'text-slate-600'}`}>
                  Document Identifier: TF-VOL01-ISS01-2026-CITN-MOUAU
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-d1-mono text-[10px] px-2.5 py-1 rounded bg-[#C48A36]/15 border border-[#C48A36]/40 text-[#C48A36] font-bold uppercase">
                Crossref Active
              </span>
              <span className="font-d1-mono text-[10px] px-2.5 py-1 rounded bg-[#BF6521]/15 border border-[#BF6521]/40 text-[#BF6521] font-bold uppercase">
                ISSN Pending
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs font-d1-mono">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Journal Title</span>
              <strong className={isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'}>Tax Frontier</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Joint Imprint</span>
              <strong className={isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'}>CITN & MOUAU</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Frequency</span>
              <strong className={isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'}>Biannual (June/Dec)</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Citation Style</span>
              <strong className={isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'}>APA 7th Edition</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Repository DOI</span>
              <strong className={isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'}>10.5897/TF.2026.01</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Secretariat</span>
              <strong className={isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'}>COLMAS, MOUAU</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Main 2-Column Content Grid: Articles & Editorial Partnership Panel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column (8 cols): Volume 1 Spotlight + Current Research Articles */}
          <div className="lg:col-span-8 space-y-8">
            {/* Maiden Issue Announcement Card */}
            <div
              className={`rounded-2xl border p-6 sm:p-8 transition-colors shadow-2xs ${
                isDarkMode
                  ? 'bg-[#082214] border-[#1C452C]'
                  : 'bg-white border-[#DFD5CE]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DFD5CE]/40 pb-4 mb-4">
                <span className="text-[10px] font-d1-mono font-bold uppercase tracking-wider bg-[#012509] text-[#C48A36] px-2.5 py-1 rounded border border-[#C48A36]/40">
                  Inaugural Issue Call for Papers
                </span>
                <span className="text-xs text-[#BF6521] bg-[#BF6521]/10 px-2.5 py-1 rounded-md border border-[#BF6521]/30 font-medium font-d1-ui">
                  Deadline: <strong className="font-bold">{config.submissionDeadline}</strong>
                </span>
              </div>

              <h3
                className={`text-xl sm:text-2xl font-d1-heading font-bold ${
                  isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'
                }`}
              >
                {maidenCallForPapers.theme}
              </h3>

              <p className={`text-xs mt-2 leading-relaxed ${isDarkMode ? 'text-[#DFD5CE]/80' : 'text-slate-600'}`}>
                The joint editorial board invites original empirical articles, doctrinal legal research, and comparative public policy reviews. Accepted manuscripts receive Crossref registered DOIs and global open access distribution.
              </p>

              <div
                className={`mt-5 p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                  isDarkMode
                    ? 'bg-[#04160C] border-[#1A3E26]'
                    : 'bg-[#DFD5CE]/25 border-[#DFD5CE]'
                }`}
              >
                <div>
                  <span className={`block text-[11px] ${isDarkMode ? 'text-[#DFD5CE]/70' : 'text-slate-600'}`}>
                    Maiden Edition Author Benefit:
                  </span>
                  <strong className={`text-sm ${isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'}`}>
                    30% Publication Fee Waiver (₦{(config.publicationFee * 0.7).toLocaleString()})
                  </strong>
                </div>
                <button
                  onClick={() => setCurrentSubPage('submit')}
                  className="px-4 py-2 bg-[#C48A36] hover:bg-[#b0782b] text-[#012509] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0 font-d1-ui shadow-2xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Online</span>
                </button>
              </div>
            </div>

            {/* Current Articles Feed */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#DFD5CE] pb-3">
                <div>
                  <h3
                    className={`text-lg font-d1-heading font-bold ${
                      isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'
                    }`}
                  >
                    Current Articles • Volume 1 (2026)
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-[#DFD5CE]/70' : 'text-slate-500'}`}>
                    Peer-reviewed scholarly papers and inaugural edition acceptances.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentSubPage('articles')}
                  className="text-xs font-semibold text-[#C48A36] hover:text-[#BF6521] flex items-center gap-1 transition-colors font-d1-ui"
                >
                  Browse Archive <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-4">
                {articles.map((article) => (
                  <article
                    key={article.id}
                    className={`rounded-2xl border p-6 transition-all group shadow-2xs ${
                      isDarkMode
                        ? 'bg-[#082214] border-[#1C452C] hover:border-[#C48A36]'
                        : 'bg-white border-[#DFD5CE] hover:border-[#C48A36]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                      <div className="flex flex-wrap gap-1">
                        {(article.subjectAreas || []).slice(0, 2).map((sub) => (
                          <span
                            key={sub}
                            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${
                              isDarkMode
                                ? 'bg-[#04160C] text-[#C48A36] border-[#C48A36]/30'
                                : 'bg-[#DFD5CE]/40 text-[#012509] border-[#D7A37B]/40'
                            }`}
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] font-d1-mono text-[#BF6521] bg-[#BF6521]/10 px-1.5 py-0.5 rounded border border-[#BF6521]/20 font-bold">
                        OPEN ACCESS
                      </span>
                    </div>

                    <h4
                      onClick={() => {
                        setSelectedArticle(article);
                        setCurrentSubPage('article-detail');
                      }}
                      className={`text-base sm:text-lg font-d1-heading font-bold cursor-pointer transition-colors leading-snug ${
                        isDarkMode
                          ? 'text-[#FAF8F5] group-hover:text-[#C48A36]'
                          : 'text-[#012509] group-hover:text-[#C48A36]'
                      }`}
                    >
                      {article.title}
                    </h4>

                    <p
                      className={`text-xs mt-1 font-medium ${
                        isDarkMode ? 'text-[#DFD5CE]/80' : 'text-slate-600'
                      }`}
                    >
                      {article.authors.map((a) => a.name).join(', ')} •{' '}
                      <span className="italic">{article.authors[0]?.affiliation}</span>
                    </p>

                    <p
                      className={`text-xs mt-2 line-clamp-2 leading-relaxed ${
                        isDarkMode ? 'text-[#DFD5CE]/70' : 'text-slate-600'
                      }`}
                    >
                      {article.abstract}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#DFD5CE]/30 flex items-center justify-between text-xs">
                      <span className="font-d1-mono text-[11px] text-slate-400">
                        DOI: 10.5897/TF.{article.volume}.{article.issue}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedArticle(article);
                          setCurrentSubPage('article-detail');
                        }}
                        className={`font-semibold flex items-center gap-1 text-xs transition-colors font-d1-ui ${
                          isDarkMode ? 'text-[#C48A36] hover:text-[#FAF8F5]' : 'text-[#012509] hover:text-[#C48A36]'
                        }`}
                      >
                        Read Full Article <ChevronRight className="w-3.5 h-3.5 text-[#BF6521]" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Institutional Sidebar (4 cols): Partnership Panel, Checklist, Secretariat */}
          <div className="lg:col-span-4 space-y-6">
            {/* Dedicated Partnership Panel (CITN & MOUAU COLMAS) */}
            <div
              className={`rounded-2xl border p-6 transition-colors shadow-2xs ${
                isDarkMode
                  ? 'bg-[#082214] border-[#1C452C]'
                  : 'bg-white border-[#DFD5CE]'
              }`}
            >
              <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-[#DFD5CE]/50">
                <Landmark className="w-4 h-4 text-[#C48A36]" />
                <h4
                  className={`text-xs font-d1-heading font-bold uppercase tracking-wider ${
                    isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'
                  }`}
                >
                  Institutional Partnership Panel
                </h4>
              </div>

              <div className="space-y-4 text-xs">
                {/* CITN Block */}
                <div
                  className={`p-3.5 rounded-xl border ${
                    isDarkMode
                      ? 'bg-[#04160C] border-[#1A3E26]'
                      : 'bg-[#FCFAF8] border-[#DFD5CE]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Building className="w-4 h-4 text-[#C48A36] shrink-0" />
                    <strong className={`font-semibold ${isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'}`}>
                      CITN Umuahia Chapter
                    </strong>
                  </div>
                  <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-[#DFD5CE]/80' : 'text-slate-600'}`}>
                    The Chartered Institute of Taxation of Nigeria (Chartered by Act No. 76 of 1992). Grounds research in real-world tax administration, state internal revenue services, and tax appeal tribunals.
                  </p>
                </div>

                {/* MOUAU COLMAS Block */}
                <div
                  className={`p-3.5 rounded-xl border ${
                    isDarkMode
                      ? 'bg-[#04160C] border-[#1A3E26]'
                      : 'bg-[#FCFAF8] border-[#DFD5CE]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Award className="w-4 h-4 text-[#C48A36] shrink-0" />
                    <strong className={`font-semibold ${isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'}`}>
                      MOUAU COLMAS
                    </strong>
                  </div>
                  <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-[#DFD5CE]/80' : 'text-slate-600'}`}>
                    College of Management Sciences, Michael Okpara University of Agriculture, Umudike. Provides academic oversight, faculty peer referees across Accounting, Economics, and Management Sciences.
                  </p>
                </div>

                {/* Joint Secretariat Assurance */}
                <div className="flex items-center gap-2 text-[11px] text-[#BF6521] font-medium pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#BF6521] shrink-0" />
                  <span>Joint Editorial Council & Refereed Certification</span>
                </div>
              </div>
            </div>

            {/* Author Submission Checklist */}
            <div
              className={`rounded-2xl border p-5 transition-colors space-y-3 ${
                isDarkMode
                  ? 'bg-[#071F12] border-[#1C442A]'
                  : 'bg-[#DFD5CE]/25 border-[#DFD5CE]'
              }`}
            >
              <h4
                className={`text-xs font-d1-heading font-bold uppercase tracking-wider ${
                  isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'
                }`}
              >
                Author Submission Checklist
              </h4>
              <ul className={`space-y-2 text-xs ${isDarkMode ? 'text-[#DFD5CE]/90' : 'text-slate-700'}`}>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C48A36] shrink-0 mt-0.5" />
                  <span>MS Word (.docx) format with APA 7th edition referencing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C48A36] shrink-0 mt-0.5" />
                  <span>Structured abstract between 200–250 words</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C48A36] shrink-0 mt-0.5" />
                  <span>ORCID identifiers for all contributing authors</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#BF6521] shrink-0 mt-0.5" />
                  <span>Anonymized manuscript for double-blind peer review</span>
                </li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={() => setCurrentSubPage('author-guidelines')}
                  className={`w-full py-2 font-d1-ui font-semibold rounded-xl text-xs border transition-colors text-center block ${
                    isDarkMode
                      ? 'bg-[#082214] hover:bg-[#0E331E] text-[#FAF8F5] border-[#1E452E]'
                      : 'bg-white hover:bg-[#DFD5CE]/20 text-[#012509] border-[#DFD5CE]'
                  }`}
                >
                  View Full Author Guidelines
                </button>
              </div>
            </div>

            {/* JORMASS Federation Status Card */}
            <div
              className={`rounded-2xl border p-5 space-y-2 transition-colors ${
                isDarkMode
                  ? 'bg-[#082214] border-[#1C452C]'
                  : 'bg-white border-[#DFD5CE]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-d1-mono uppercase tracking-wider text-slate-500">
                  MOUAU Network
                </span>
                <span className="text-[10px] font-d1-mono bg-[#012509] text-[#C48A36] px-1.5 py-0.5 rounded font-bold">
                  Active Gateway
                </span>
              </div>
              <h4
                className={`text-sm font-d1-heading font-bold ${
                  isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'
                }`}
              >
                JORMASS Federation Link
              </h4>
              <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-[#DFD5CE]/80' : 'text-slate-600'}`}>
                Tax Frontier maintains integrated indexing gateways with the Journal of Management Sciences (JORMASS, MOUAU) under Option {config.jormassRelationship.replace('option', '')}.
              </p>
            </div>

            {/* Editorial Secretariat Card */}
            <div
              className={`rounded-2xl border p-5 space-y-2 text-xs transition-colors ${
                isDarkMode
                  ? 'bg-[#082214] border-[#1C452C]'
                  : 'bg-white border-[#DFD5CE]'
              }`}
            >
              <span className="text-[10px] font-d1-mono uppercase tracking-wider text-slate-500">
                Secretariat
              </span>
              <h4
                className={`text-sm font-d1-heading font-bold ${
                  isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'
                }`}
              >
                Editorial Office
              </h4>
              <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-[#DFD5CE]/80' : 'text-slate-600'}`}>
                College of Management Sciences, Michael Okpara University of Agriculture, Umudike, Abia State, Nigeria.
              </p>
              <p className={`font-d1-mono text-xs font-semibold pt-1 ${isDarkMode ? 'text-[#C48A36]' : 'text-[#012509]'}`}>
                {config.editorialEmail}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Structured Institutional Footer */}
      <footer
        className={`border-t text-xs py-12 px-4 sm:px-6 transition-colors ${
          isDarkMode
            ? 'bg-[#02180A] text-[#DFD5CE] border-[#143322]'
            : 'bg-[#012509] text-[#DFD5CE] border-[#012509]'
        }`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <InstitutionalSeal size="sm" />
              <span className="font-d1-heading font-bold text-white text-base">
                Tax Frontier
              </span>
            </div>
            <p className="text-[11px] text-[#DFD5CE]/80 leading-relaxed font-d1-body">
              Joint academic and professional journal published by CITN Umuahia Chapter and MOUAU College of Management Sciences.
            </p>
            <div className="mt-3">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/15 text-[#C48A36] text-[10px] font-d1-ui transition-colors"
              >
                {isDarkMode ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                <span>{isDarkMode ? 'Switch to Light Institutional' : 'Switch to Dark Scholarly'}</span>
              </button>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2 font-d1-ui">
              Journal Governance
            </h5>
            <ul className="space-y-1.5 text-[#DFD5CE]/80 text-[11px] font-d1-body">
              <li>
                <button onClick={() => setCurrentSubPage('about')} className="hover:text-white transition-colors">
                  Institutional Mandate
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentSubPage('editorial-board')} className="hover:text-white transition-colors">
                  Editorial Council
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentSubPage('peer-review')} className="hover:text-white transition-colors">
                  14-Step Peer Review
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentSubPage('ethics')} className="hover:text-white transition-colors">
                  COPE Ethics Statement
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2 font-d1-ui">
              Author Resources
            </h5>
            <ul className="space-y-1.5 text-[#DFD5CE]/80 text-[11px] font-d1-body">
              <li>
                <button onClick={() => setCurrentSubPage('author-guidelines')} className="hover:text-white transition-colors">
                  Author Guidelines
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentSubPage('fees')} className="hover:text-white transition-colors">
                  Publication Fee Schedule
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentSubPage('call-for-papers')} className="hover:text-white transition-colors">
                  Maiden Call for Papers
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentSubPage('submit')} className="hover:text-white transition-colors">
                  Manuscript Submission
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2 font-d1-ui">
              Licensing & Indexing
            </h5>
            <p className="text-[11px] text-[#DFD5CE]/80 leading-relaxed font-d1-body">
              All articles published under Creative Commons Attribution 4.0 International (CC BY 4.0). Crossref DOI allocation and Google Scholar meta tag compliance.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-[#DFD5CE]/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-[#DFD5CE]/70 font-d1-mono">
          <span>© 2026 Tax Frontier. CITN Umuahia Chapter & MOUAU COLMAS.</span>
          <span>OnlineFirst Proposal Architecture & Implementation Framework.</span>
        </div>
      </footer>
    </div>
  );
};
