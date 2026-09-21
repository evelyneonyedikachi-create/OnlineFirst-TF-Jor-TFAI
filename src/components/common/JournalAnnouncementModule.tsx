import React, { useState } from 'react';
import { useJournalConfig } from '../../context/JournalConfigContext';
import { JournalAnnouncement, JournalSubPage } from '../../types';
import {
  Sparkles,
  AlertCircle,
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Award,
  Users,
  FileText,
  Clock,
  ExternalLink,
  ShieldCheck,
  Send,
  Flame,
  CheckCircle2,
} from 'lucide-react';

interface JournalAnnouncementModuleProps {
  variant: 'demo1' | 'demo2' | 'demo3';
  isDarkMode?: boolean; // For Demo 1 dark mode toggle
  className?: string;
  maxDisplay?: number;
}

export const JournalAnnouncementModule: React.FC<JournalAnnouncementModuleProps> = ({
  variant,
  isDarkMode = false,
  className = '',
}) => {
  const { announcements, setCurrentSubPage } = useJournalConfig();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter published announcements only
  const publishedAnnouncements = announcements
    .filter((a) => a.published)
    .sort((a, b) => {
      const priorityWeight = { urgent: 3, featured: 2, normal: 1 };
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    });

  if (publishedAnnouncements.length === 0) {
    return null;
  }

  // Ensure current index is within bounds
  const safeIndex = currentIndex >= publishedAnnouncements.length ? 0 : currentIndex;
  const current = publishedAnnouncements[safeIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : publishedAnnouncements.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < publishedAnnouncements.length - 1 ? prev + 1 : 0));
  };

  const handleNavigate = (url: string) => {
    const knownSubPages: JournalSubPage[] = [
      'home',
      'about',
      'vision-mission',
      'aims-scope',
      'current-issue',
      'articles',
      'article-detail',
      'call-for-papers',
      'announcements',
      'author-guidelines',
      'submit',
      'fees',
      'editorial-board',
      'peer-review',
      'ethics',
      'indexing',
      'events',
      'contact',
      'search',
    ];

    if (knownSubPages.includes(url as JournalSubPage)) {
      setCurrentSubPage(url as JournalSubPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback
      setCurrentSubPage('announcements');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Helper to render dynamic icon
  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'AlertCircle':
        return <AlertCircle className="w-4 h-4" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4" />;
      case 'Calendar':
        return <Calendar className="w-4 h-4" />;
      case 'Award':
        return <Award className="w-4 h-4" />;
      case 'Users':
        return <Users className="w-4 h-4" />;
      case 'Clock':
        return <Clock className="w-4 h-4" />;
      case 'Send':
        return <Send className="w-4 h-4" />;
      default:
        return current.priority === 'urgent' ? (
          <AlertCircle className="w-4 h-4" />
        ) : current.priority === 'featured' ? (
          <Sparkles className="w-4 h-4" />
        ) : (
          <Bell className="w-4 h-4" />
        );
    }
  };

  // =========================================================================
  // VARIANT 1: DEMO 1 — INSTITUTIONAL (Official Bulletin / Refined Seal)
  // Deep green #012509, Ivory #FAF8F5, Gold #C48A36, Burnt Orange #BF6521
  // =========================================================================
  if (variant === 'demo1') {
    return (
      <div
        id="demo1-official-announcement"
        className={`w-full transition-all duration-200 ${className}`}
      >
        <div
          className={`relative rounded-2xl border shadow-sm overflow-hidden transition-colors ${
            isDarkMode
              ? 'bg-[#031D0E] border-[#1F4C30] text-[#DFD5CE]'
              : 'bg-[#FCFAF8] border-[#DFD5CE] text-[#1C2621]'
          }`}
        >
          {/* Top Decorative Gold & Green Institutional Rule */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#012509] via-[#C48A36] to-[#BF6521]" />

          <div className="p-5 sm:p-6 lg:p-7">
            {/* Top Bar: Official Seal Watermark Label + Priority Badge + Stepper */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#DFD5CE]/40">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-d1-heading font-bold text-xs border ${
                    isDarkMode
                      ? 'bg-[#0A2616] text-[#C48A36] border-[#C48A36]/40'
                      : 'bg-[#012509] text-[#C48A36] border-[#C48A36]/50 shadow-2xs'
                  }`}
                >
                  TF
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-d1-mono uppercase tracking-wider font-bold text-[#C48A36]">
                      Official Editorial Bulletin
                    </span>
                    <span className="text-slate-300">•</span>
                    <span
                      className={`text-[9px] font-d1-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                        current.priority === 'urgent'
                          ? 'bg-rose-950 text-rose-300 border-rose-800'
                          : current.priority === 'featured'
                          ? isDarkMode
                            ? 'bg-[#0A2616] text-[#C48A36] border-[#C48A36]/40'
                            : 'bg-[#012509] text-white border-[#012509]'
                          : isDarkMode
                          ? 'bg-[#082213] text-[#DFD5CE] border-[#183B26]'
                          : 'bg-[#DFD5CE]/40 text-[#012509] border-[#DFD5CE]'
                      }`}
                    >
                      {current.priority === 'urgent'
                        ? 'Urgent Notice'
                        : current.priority === 'featured'
                        ? 'Featured Notice'
                        : 'Routine Circular'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Controls if Multiple Notices */}
              <div className="flex items-center gap-2">
                {publishedAnnouncements.length > 1 && (
                  <div className="flex items-center gap-1.5 bg-black/10 dark:bg-white/5 px-2 py-1 rounded-lg text-[11px] font-d1-mono">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous notice"
                      className="p-1 rounded hover:bg-white/20 transition-colors text-slate-400 hover:text-slate-100"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-1 font-semibold text-[#C48A36]">
                      {safeIndex + 1} / {publishedAnnouncements.length}
                    </span>
                    <button
                      onClick={handleNext}
                      aria-label="Next notice"
                      className="p-1 rounded hover:bg-white/20 transition-colors text-slate-400 hover:text-slate-100"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <button
                  onClick={() => setCurrentSubPage('announcements')}
                  className={`text-[11px] font-d1-ui font-semibold hover:underline flex items-center gap-1 ${
                    isDarkMode ? 'text-[#C48A36]' : 'text-[#012509]'
                  }`}
                >
                  <span>All Notices ({publishedAnnouncements.length})</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="pt-4 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <div className="lg:col-span-8 space-y-2.5">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span
                    className={`font-d1-ui font-bold text-[11px] px-2.5 py-0.5 rounded border ${
                      isDarkMode
                        ? 'bg-[#082213] text-[#FAF8F5] border-[#183B26]'
                        : 'bg-white text-[#012509] border-[#DFD5CE]'
                    }`}
                  >
                    {current.category}
                  </span>
                  {current.endDate && (
                    <span
                      className={`text-[11px] font-d1-mono flex items-center gap-1 ${
                        isDarkMode ? 'text-[#DFD5CE]/70' : 'text-slate-500'
                      }`}
                    >
                      <Calendar className="w-3 h-3 text-[#C48A36]" />
                      <span>Valid until {current.endDate}</span>
                    </span>
                  )}
                </div>

                <h3
                  className={`text-lg sm:text-xl lg:text-2xl font-d1-heading font-bold tracking-tight leading-snug ${
                    isDarkMode ? 'text-[#FAF8F5]' : 'text-[#012509]'
                  }`}
                >
                  {current.title}
                </h3>

                <p
                  className={`text-xs sm:text-sm leading-relaxed max-w-3xl ${
                    isDarkMode ? 'text-[#DFD5CE]/85' : 'text-slate-700'
                  }`}
                >
                  {current.shortMessage}
                </p>
              </div>

              {/* Action Buttons Column */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-center gap-2.5 pt-2 lg:pt-0">
                <button
                  onClick={() => handleNavigate(current.primaryButtonUrl)}
                  className="px-5 py-2.5 bg-[#C48A36] hover:bg-[#b0782b] text-[#012509] font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs hover:shadow-sm transition-all font-d1-ui"
                >
                  {renderIcon(current.icon)}
                  <span>{current.primaryButtonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {current.secondaryButtonText && (
                  <button
                    onClick={() => handleNavigate(current.secondaryButtonUrl || 'announcements')}
                    className={`px-4 py-2 font-d1-ui font-medium rounded-xl text-xs border transition-colors flex items-center justify-center gap-1.5 ${
                      isDarkMode
                        ? 'bg-[#082213] hover:bg-[#0D2F1B] text-[#FAF8F5] border-[#183B26]'
                        : 'bg-white hover:bg-[#DFD5CE]/30 text-[#012509] border-[#DFD5CE]'
                    }`}
                  >
                    <span>{current.secondaryButtonText}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VARIANT 2: DEMO 2 — POLICY & PRACTICE (Modern Contemporary Campaign Band)
  // Slate #0F172A, Emerald #047857, Accent Mint, High-Density Digital UI
  // =========================================================================
  if (variant === 'demo2') {
    return (
      <div
        id="demo2-campaign-announcement"
        className={`w-full transition-all duration-200 ${className}`}
      >
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-5 sm:p-6 relative overflow-hidden">
          {/* Urgency Edge Accent */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-1.5 ${
              current.priority === 'urgent'
                ? 'bg-rose-500'
                : current.priority === 'featured'
                ? 'bg-emerald-600'
                : 'bg-slate-400'
            }`}
          />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pl-2">
            {/* Left: Indicator, Category Pill, Title, Excerpt */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide uppercase ${
                    current.priority === 'urgent'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : current.priority === 'featured'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                      current.priority === 'urgent'
                        ? 'bg-rose-600'
                        : current.priority === 'featured'
                        ? 'bg-emerald-600'
                        : 'bg-slate-500'
                    }`}
                  />
                  <span>
                    {current.priority === 'urgent'
                      ? 'Priority Directive'
                      : current.priority === 'featured'
                      ? 'Campaign Highlight'
                      : 'Editorial Update'}
                  </span>
                </span>

                <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  {current.category}
                </span>

                {current.endDate && (
                  <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Effective through {current.endDate}</span>
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                  {current.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed line-clamp-2">
                  {current.shortMessage}
                </p>
              </div>
            </div>

            {/* Right: Actions and Stepper Controls */}
            <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-2 shrink-0">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleNavigate(current.primaryButtonUrl)}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-[#047857] hover:bg-[#059669] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  {renderIcon(current.icon)}
                  <span>{current.primaryButtonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {current.secondaryButtonText && (
                  <button
                    onClick={() => handleNavigate(current.secondaryButtonUrl || 'announcements')}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs border border-slate-200 transition-colors"
                  >
                    <span>{current.secondaryButtonText}</span>
                  </button>
                )}
              </div>

              {/* Multi-notice bar */}
              <div className="flex items-center justify-between sm:justify-end gap-3 text-[11px] text-slate-500 w-full pt-1">
                {publishedAnnouncements.length > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous announcement"
                      className="p-1 rounded hover:bg-slate-100 transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                    <span className="font-mono font-medium">
                      {safeIndex + 1} of {publishedAnnouncements.length}
                    </span>
                    <button
                      onClick={handleNext}
                      aria-label="Next announcement"
                      className="p-1 rounded hover:bg-slate-100 transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                  </div>
                )}
                <button
                  onClick={() => setCurrentSubPage('announcements')}
                  className="text-emerald-700 hover:text-emerald-800 font-semibold text-[11px] hover:underline"
                >
                  View all notices
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VARIANT 3: DEMO 3 — SCHOLARLY DISCOVERY (Static Archival Announcement Card)
  // Dark navy #081220, Refined Gold #C5A059 / #D8BA75, Ivory text, Pure Static CTA (No Slider)
  // =========================================================================
  return (
    <div
      id="demo3-archival-announcement"
      className={`w-full transition-all duration-200 ${className}`}
    >
      <div className="rounded-3xl bg-[#081220] border border-[#C5A059]/35 text-white p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Subtle Archival Glow */}
        <div className="absolute top-0 right-1/4 w-80 h-32 bg-[#C5A059]/[0.05] rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-32 bg-[#1B3250]/[0.1] rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Header Row: Archival Category Badge & Static Link to All Announcements */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#152438]">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-catalog-mono font-bold uppercase tracking-wider text-[#C5A059] bg-[#0E1A2B] px-3 py-1 rounded-full border border-[#C5A059]/35 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                <span>Journal Notice</span>
              </span>

              <span className="text-[10px] font-catalog-mono text-[#8CA0B8] bg-[#0A1422] px-2.5 py-0.5 rounded border border-[#1C2E44]">
                {current.category}
              </span>

              {current.priority === 'urgent' && (
                <span className="text-[10px] font-catalog-mono font-semibold text-[#F87171] bg-[#2A0E12] px-2 py-0.5 rounded border border-[#EF4444]/40">
                  Priority Directive
                </span>
              )}
            </div>

            {/* Static link to view all notices — NO carousel or sliders */}
            <button
              onClick={() => setCurrentSubPage('announcements')}
              className="text-xs text-[#C5A059] hover:text-[#E2C78A] font-semibold flex items-center gap-1 transition-colors hover:underline group"
            >
              <span>View all announcements ({publishedAnnouncements.length})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2.5">
              <h3 className="text-xl sm:text-2xl font-newsreader font-semibold text-[#F8F6F0] tracking-tight leading-snug">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#A6B7CC] leading-relaxed max-w-3xl font-normal">
                {current.shortMessage}
              </p>
              {current.endDate && (
                <div className="pt-0.5 flex items-center gap-2 text-[11px] font-catalog-mono text-[#768A9E]">
                  <Clock className="w-3 h-3 text-[#C5A059]" />
                  <span>Compliance Timeline Cutoff: {current.endDate}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-center gap-2.5">
              <button
                onClick={() => handleNavigate(current.primaryButtonUrl)}
                className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#D4AF37] text-[#070E1A] font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                {renderIcon(current.icon)}
                <span>{current.primaryButtonText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {current.secondaryButtonText && (
                <button
                  onClick={() => handleNavigate(current.secondaryButtonUrl || 'announcements')}
                  className="px-4 py-2 rounded-xl bg-[#0E1A2B] hover:bg-[#16273F] text-[#F8F6F0] border border-[#1E3048] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{current.secondaryButtonText}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
