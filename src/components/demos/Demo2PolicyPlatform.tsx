import React, { useState } from 'react';
import { useJournalConfig } from '../../context/JournalConfigContext';
import { SubPages } from './SubPages';
import { JournalAnnouncementModule } from '../common/JournalAnnouncementModule';
import {
  subjectTaxonomies,
  maidenCallForPapers,
} from '../../data/journalData';
import {
  Search,
  Filter,
  BarChart3,
  Scale,
  TrendingUp,
  FileText,
  Download,
  Share2,
  ChevronRight,
  Send,
  SlidersHorizontal,
  Bookmark,
  Sparkles,
  Layers,
  Calendar,
  Clock,
  CheckCircle2,
  Cpu,
  ArrowUpRight,
  Sliders,
  Database,
  Terminal,
} from 'lucide-react';

export const Demo2PolicyPlatform: React.FC = () => {
  const {
    currentSubPage,
    setCurrentSubPage,
    config,
    articles,
    setSelectedArticle,
  } = useJournalConfig();

  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'empirical' | 'tribunal' | 'statute'>('all');

  const filteredArticles = articles.filter((a) => {
    const matchesTopic =
      selectedTopic === 'all' ||
      (a.subjectAreas && a.subjectAreas.some((t: string) => t.toLowerCase().includes(selectedTopic.toLowerCase()))) ||
      a.title.toLowerCase().includes(selectedTopic.toLowerCase());
    const matchesSearch =
      searchQuery === '' ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.authors.some((au) => au.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTopic && matchesSearch;
  });

  const renderPlatformFooter = () => (
    <footer className="bg-[#0A0F1D] text-slate-400 border-t border-slate-800 text-xs py-10 px-4 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#047857] text-white flex items-center justify-center font-bold text-xs">
            TF
          </div>
          <span className="font-bold text-white text-sm">Tax Frontier Platform</span>
          <span className="text-slate-600">|</span>
          <span className="text-[11px] text-slate-400">CITN Umuahia Chapter & MOUAU COLMAS</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <button onClick={() => setCurrentSubPage('aims-scope')} className="hover:text-white">Taxonomies</button>
          <button onClick={() => setCurrentSubPage('author-guidelines')} className="hover:text-white">Author Guide</button>
          <button onClick={() => setCurrentSubPage('peer-review')} className="hover:text-white">Peer Review Flow</button>
          <button onClick={() => setCurrentSubPage('events')} className="hover:text-white">Events</button>
          <button onClick={() => setCurrentSubPage('contact')} className="hover:text-white">Secretariat</button>
        </div>
      </div>
    </footer>
  );

  if (currentSubPage !== 'home') {
    return (
      <div className="bg-[#F8FAFC] text-slate-900 min-h-screen font-sans">
        {/* Digital Policy Platform App Bar */}
        <header className="sticky top-12 z-40 bg-[#0F172A] text-white border-b border-slate-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            <button
              onClick={() => setCurrentSubPage('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#047857] flex items-center justify-center font-bold text-sm text-white shadow-xs">
                TF
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight block leading-none text-white group-hover:text-emerald-400 transition-colors">
                  Tax Frontier
                </span>
                <span className="text-[10px] text-emerald-400 font-mono tracking-wide">
                  Policy & Practice Platform
                </span>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-1 text-xs">
              <button
                onClick={() => setCurrentSubPage('home')}
                className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors font-medium"
              >
                Platform Home
              </button>
              <button
                onClick={() => setCurrentSubPage('aims-scope')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  currentSubPage === 'aims-scope' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                Taxonomy Engine (26 Areas)
              </button>
              <button
                onClick={() => setCurrentSubPage('call-for-papers')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  currentSubPage === 'call-for-papers' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                Maiden CFP
              </button>
              <button
                onClick={() => setCurrentSubPage('announcements')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  currentSubPage === 'announcements' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                Announcements
              </button>
              <button
                onClick={() => setCurrentSubPage('articles')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  currentSubPage === 'articles' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                Research Archive
              </button>
              <button
                onClick={() => setCurrentSubPage('editorial-board')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  currentSubPage === 'editorial-board' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                Editorial Council
              </button>
            </nav>

            <button
              onClick={() => setCurrentSubPage('submit')}
              className="px-4 py-2 bg-[#047857] hover:bg-[#059669] text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Manuscript</span>
            </button>
          </div>
        </header>

        <main>
          <SubPages />
        </main>
        {renderPlatformFooter()}
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] text-slate-900 min-h-screen font-sans">
      {/* 1. Contemporary Digital Platform App Header */}
      <header className="sticky top-12 z-40 bg-[#0F172A] text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#047857] flex items-center justify-center font-bold text-sm text-white shadow-xs">
              TF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white">
                  Tax Frontier
                </span>
                <span className="hidden sm:inline text-[9px] font-mono font-bold tracking-wider uppercase bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/60">
                  Policy & Practice Platform
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                CITN Umuahia • MOUAU COLMAS • Evidence-Led Fiscal Governance
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs">
            <button
              onClick={() => setCurrentSubPage('call-for-papers')}
              className="px-3 py-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-900 text-emerald-300 font-semibold flex items-center gap-1.5 transition-colors border border-emerald-700/60"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Maiden CFP (30% Discount)</span>
            </button>
            <button
              onClick={() => setCurrentSubPage('announcements')}
              className="px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors font-medium flex items-center gap-1.5"
            >
              <span>Announcements</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </button>
            <button
              onClick={() => setCurrentSubPage('aims-scope')}
              className="px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors font-medium"
            >
              26 Taxonomies
            </button>
            <button
              onClick={() => setCurrentSubPage('articles')}
              className="px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors font-medium"
            >
              Archive
            </button>
            <button
              onClick={() => setCurrentSubPage('editorial-board')}
              className="px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors font-medium"
            >
              Council
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSubPage('submit')}
              className="px-4 py-2 bg-[#047857] hover:bg-[#059669] text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Manuscript</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Modern Policy & Evidence Hero with Search & Live Filter Engine */}
      <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#F8FAFC] text-white pt-10 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs text-emerald-400 mb-4 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Volume 1 Intake Active • Evidence-Driven Fiscal Publishing</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Taxation Jurisprudence, Empirical Analytics & Public Policy
            </h1>

            <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed font-normal">
              A contemporary scholarly platform built for tax attorneys, revenue commissioners, chartered tax practitioners, and university researchers. Delivering actionable data and rigorous statutory analysis.
            </p>

            {/* Real-time Search Engine Bar */}
            <div className="mt-8 bg-white text-slate-900 p-2 rounded-xl shadow-xl flex flex-col sm:flex-row items-center gap-2 border border-slate-200">
              <div className="flex items-center gap-2.5 flex-1 px-3 w-full">
                <Search className="w-4 h-4 text-emerald-700 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title, author, TAT case, statute, or fiscal keyword..."
                  className="w-full text-xs sm:text-sm py-2 bg-transparent outline-none placeholder:text-slate-400 font-medium"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full sm:w-auto text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 outline-none font-semibold cursor-pointer"
                >
                  <option value="all">All 26 Tax Disciplines</option>
                  <option value="Corporate Taxation">Corporate Tax</option>
                  <option value="Digital Economy Taxation">Digital Economy</option>
                  <option value="Petroleum Profits Tax">Petroleum & Natural Resources</option>
                  <option value="Tax Dispute Resolution">Dispute Resolution & TAT</option>
                  <option value="Fiscal Federalism">Fiscal Federalism & IGR</option>
                  <option value="Transfer Pricing">Transfer Pricing</option>
                </select>

                <button
                  onClick={() => setCurrentSubPage('articles')}
                  className="px-4 py-2 bg-[#047857] hover:bg-[#059669] text-white font-bold rounded-lg text-xs transition-colors whitespace-nowrap shadow-xs"
                >
                  Browse
                </button>
              </div>
            </div>

            {/* Topic Filter Pills */}
            <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[11px] text-emerald-400 font-semibold mr-1">Trending Areas:</span>
              {[
                'Digital Economy',
                'TAT Decisions',
                'Sub-national IGR',
                'Transfer Pricing',
                'Fiscal Federalism',
                'Tax Technology',
              ].map((pill) => (
                <button
                  key={pill}
                  onClick={() => setSelectedTopic(pill)}
                  className={`text-[11px] px-2.5 py-0.5 rounded-full transition-all font-medium ${
                    selectedTopic === pill
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 Prominent Campaign Announcement Band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <JournalAnnouncementModule variant="demo2" />
      </section>

      {/* 3. Platform Data & Jurisprudence Live Widgets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Jurisprudence</span>
              <strong className="text-sm font-extrabold text-slate-900 block mt-0.5">TAT & High Court Cases</strong>
              <p className="text-[11px] text-slate-600 mt-0.5">Statutory interpretations and dispute resolution notes.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Data Engine</span>
              <strong className="text-sm font-extrabold text-slate-900 block mt-0.5">Sub-National IGR Sets</strong>
              <p className="text-[11px] text-slate-600 mt-0.5">36-state revenue productivity & VAT allocation data.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Review Workflow</span>
              <strong className="text-sm font-extrabold text-slate-900 block mt-0.5">4–6 Weeks Tracking</strong>
              <p className="text-[11px] text-slate-600 mt-0.5">Structured peer assessment with real-time intake updates.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Citation Tech</span>
              <strong className="text-sm font-extrabold text-slate-900 block mt-0.5">Crossref & DOI Ready</strong>
              <p className="text-[11px] text-slate-600 mt-0.5">Permanent metadata identifiers for global referencing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Filtered Policy & Empirical Article Feed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Current Research & Empirical Policy Articles
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Showing {filteredArticles.length} articles filtered by: <span className="font-semibold text-emerald-700">"{selectedTopic}"</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {selectedTopic !== 'all' && (
              <button
                onClick={() => setSelectedTopic('all')}
                className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
              >
                Reset Filter
              </button>
            )}
            <button
              onClick={() => setCurrentSubPage('call-for-papers')}
              className="px-3.5 py-2 bg-[#047857] hover:bg-[#059669] text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>Submit to Maiden Issue</span> <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-emerald-600 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex flex-wrap gap-1">
                    {(article.subjectAreas || []).slice(0, 2).map((tax: string) => (
                      <span
                        key={tax}
                        className="text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200"
                      >
                        {tax}
                      </span>
                    ))}
                  </div>
                  <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                    DEMO DATA
                  </span>
                </div>

                <h3
                  onClick={() => {
                    setSelectedArticle(article);
                    setCurrentSubPage('article-detail');
                  }}
                  className="font-bold text-base text-slate-900 group-hover:text-emerald-700 cursor-pointer transition-colors leading-snug"
                >
                  {article.title}
                </h3>

                <p className="text-xs text-slate-500 mt-2 font-medium">
                  {article.authors.map((a) => a.name).join(', ')}
                </p>

                <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                  {article.abstract}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] text-slate-400">
                  Vol. {article.volume}({article.issue})
                </span>
                <button
                  onClick={() => {
                    setSelectedArticle(article);
                    setCurrentSubPage('article-detail');
                  }}
                  className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  Read Policy Brief <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Maiden Edition Call For Papers Campaign Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-[#0F172A] text-white p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-2">
              Call For Papers • Maiden Edition Launch
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {maidenCallForPapers.theme}
            </h3>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Early manuscript submissions receive a <strong>30% publication discount</strong> (₦{(config.publicationFee * 0.7).toLocaleString()}). All accepted papers are issued permanent Crossref DOIs.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setCurrentSubPage('submit')}
                className="px-6 py-3 bg-[#047857] hover:bg-[#059669] text-white font-bold rounded-lg text-xs flex items-center gap-2 shadow-md transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Manuscript Online
              </button>
              <button
                onClick={() => setCurrentSubPage('call-for-papers')}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg text-xs border border-slate-700 transition-colors"
              >
                View Author Guidelines & Deadlines
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Platform Modern Footer */}
      {renderPlatformFooter()}
    </div>
  );
};
