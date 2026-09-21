import React, { useState } from 'react';
import { useJournalConfig } from '../../context/JournalConfigContext';
import { JournalAnnouncement, JournalSubPage } from '../../types';
import { announcementCategories } from '../../data/journalData';
import {
  Bell,
  Sparkles,
  AlertCircle,
  Calendar,
  Clock,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Users,
  Sliders,
  CheckCircle2,
  Send,
  Eye,
  Tag,
} from 'lucide-react';

export const AnnouncementsSubPage: React.FC = () => {
  const {
    announcements,
    setCurrentSubPage,
    setCurrentView,
    togglePublishAnnouncement,
    setNotification,
  } = useJournalConfig();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'current' | 'archived'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'urgent' | 'featured' | 'normal'>('all');

  const now = new Date('2026-09-21T00:00:00Z');

  // Filter announcements
  const filteredAnnouncements = announcements.filter((ann) => {
    // Search match
    const matchesSearch =
      searchQuery === '' ||
      ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.shortMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Category match
    const matchesCategory = selectedCategory === 'All' || ann.category === selectedCategory;

    // Priority match
    const matchesPriority = priorityFilter === 'all' || ann.priority === priorityFilter;

    // Status match (current vs archived)
    const endDate = ann.endDate ? new Date(ann.endDate) : null;
    const isPast = endDate ? endDate < now : false;

    let matchesStatus = true;
    if (selectedStatus === 'current') {
      matchesStatus = !isPast;
    } else if (selectedStatus === 'archived') {
      matchesStatus = isPast;
    }

    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

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
      setCurrentSubPage('announcements');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Find post-launch maiden published announcement for fast demo
  const maidenPublishedAnnouncement = announcements.find((a) => a.id === 'ann-4');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
          <Bell className="w-3.5 h-3.5 text-emerald-600" />
          <span>Official Editorial Communications</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Journal Announcements & Dispatches
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
          Author calls for papers, referee recruitment circulars, statutory deadline reminders, and indexing milestones issued by the Joint Editorial Council of CITN Umuahia Chapter and MOUAU COLMAS.
        </p>
      </div>

      {/* Editorial Lifecycle Demonstration Callout */}
      <div className="mb-10 bg-gradient-to-r from-emerald-950 via-[#06291B] to-slate-900 text-white p-5 sm:p-6 rounded-2xl border border-emerald-700/50 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                Professional & Premium CMS Feature
              </span>
              <span className="text-xs text-emerald-300 font-medium hidden sm:inline">
                Dynamic Post-Launch Transformation
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-amber-200">
              Reusable Call-to-Action Engine Across Journal Lifecycle
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              When the maiden Call for Papers window concludes, editorial staff can toggle the homepage announcement to instantly showcase <strong className="text-white">"Maiden Issue Now Published — Explore Volume 1, Issue 1"</strong> with a direct <strong className="text-white">[View Current Issue]</strong> CTA, without writing any code.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {maidenPublishedAnnouncement && (
              <button
                onClick={() => {
                  togglePublishAnnouncement(maidenPublishedAnnouncement.id);
                  setNotification(
                    maidenPublishedAnnouncement.published
                      ? 'Reverted Maiden Issue announcement to Draft'
                      : 'Published "Maiden Issue Published" announcement! Check any demo homepage.'
                  );
                  setTimeout(() => setNotification(null), 4000);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                  maidenPublishedAnnouncement.published
                    ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                    : 'bg-emerald-700 hover:bg-emerald-600 text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {maidenPublishedAnnouncement.published
                    ? 'Active: Maiden Issue Live (Toggle Off)'
                    : 'Simulate Post-Launch (Publish Vol 1)'}
                </span>
              </button>
            )}

            <button
              onClick={() => setCurrentView('admin')}
              className="px-3.5 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Open CMS Manager</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs mb-8 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notices by keyword, title, topic or category..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 text-xs sm:text-sm rounded-xl border border-slate-200 focus:bg-white focus:border-emerald-600 outline-none transition-all"
            />
          </div>

          {/* Status Segment */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold w-full md:w-auto">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedStatus === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Notices ({announcements.length})
            </button>
            <button
              onClick={() => setSelectedStatus('current')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedStatus === 'current'
                  ? 'bg-white text-emerald-800 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Active Notices
            </button>
            <button
              onClick={() => setSelectedStatus('archived')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedStatus === 'archived'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Archived
            </button>
          </div>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="w-full md:w-auto px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent Only</option>
            <option value="featured">Featured Only</option>
            <option value="normal">Normal Priority</option>
          </select>
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-slate-400 font-mono text-[11px] mr-1 flex items-center gap-1 shrink-0">
            <Tag className="w-3 h-3" /> Category:
          </span>
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-2.5 py-1 rounded-lg shrink-0 transition-colors ${
              selectedCategory === 'All'
                ? 'bg-emerald-800 text-white font-semibold'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            All Categories
          </button>
          {announcementCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white font-semibold'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-5">
        {filteredAnnouncements.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <Bell className="w-8 h-8 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">No notices found</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              No journal announcements match your current filter criteria. Try resetting filters or search terms.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedStatus('all');
                setPriorityFilter('all');
              }}
              className="mt-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredAnnouncements.map((item) => {
            const isUrgent = item.priority === 'urgent';
            const isFeatured = item.priority === 'featured';

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden ${
                  isUrgent
                    ? 'border-rose-300 ring-1 ring-rose-200/50'
                    : isFeatured
                    ? 'border-amber-300/80 bg-gradient-to-br from-white via-amber-50/20 to-white'
                    : 'border-slate-200'
                }`}
              >
                {/* Priority Edge Banner */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    isUrgent ? 'bg-rose-600' : isFeatured ? 'bg-[#C48A36]' : 'bg-slate-300'
                  }`}
                />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  <div className="space-y-2.5 flex-1">
                    {/* Tags row */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          isUrgent
                            ? 'bg-rose-50 text-rose-800 border-rose-200'
                            : isFeatured
                            ? 'bg-amber-50 text-amber-900 border-amber-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {isUrgent ? '● Urgent Notice' : isFeatured ? '★ Featured Campaign' : 'Standard Bulletin'}
                      </span>

                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                        {item.category}
                      </span>

                      {!item.published && (
                        <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-dashed border-slate-300">
                          Draft / Hidden in Home
                        </span>
                      )}

                      {item.startDate && item.endDate && (
                        <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>
                            {item.startDate} — {item.endDate}
                          </span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed max-w-4xl">
                      {item.shortMessage}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-center gap-2.5 shrink-0 pt-2 lg:pt-0">
                    <button
                      onClick={() => handleNavigate(item.primaryButtonUrl)}
                      className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
                    >
                      <span>{item.primaryButtonText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {item.secondaryButtonText && (
                      <button
                        onClick={() => handleNavigate(item.secondaryButtonUrl || 'call-for-papers')}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>{item.secondaryButtonText}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Back to Home Button */}
      <div className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between">
        <button
          onClick={() => {
            setCurrentSubPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xs font-bold text-slate-600 hover:text-emerald-800 transition-colors flex items-center gap-1.5"
        >
          <span>← Return to Journal Home</span>
        </button>

        <button
          onClick={() => {
            setCurrentSubPage('call-for-papers');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors flex items-center gap-1.5"
        >
          <span>View Call for Papers Guidelines →</span>
        </button>
      </div>
    </div>
  );
};
