import React, { useState } from 'react';
import { useJournalConfig } from '../../context/JournalConfigContext';
import { JournalAnnouncement, AnnouncementPriority } from '../../types';
import { announcementCategories } from '../../data/journalData';
import {
  Bell,
  Sparkles,
  AlertCircle,
  Calendar,
  Clock,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Send,
  Sliders,
  Layers,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';

export const AdminAnnouncementsManager: React.FC = () => {
  const {
    announcements,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    togglePublishAnnouncement,
    setNotification,
    openDemo,
    setCurrentSubPage,
  } = useJournalConfig();

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form state
  const initialForm: Omit<JournalAnnouncement, 'id'> = {
    title: '',
    shortMessage: '',
    category: 'Call for Papers',
    startDate: '2026-09-01',
    endDate: '2026-11-30',
    primaryButtonText: 'Submit Manuscript',
    primaryButtonUrl: 'submit',
    secondaryButtonText: 'View Guidelines',
    secondaryButtonUrl: 'call-for-papers',
    icon: 'Sparkles',
    priority: 'featured',
    published: true,
  };

  const [formData, setFormData] = useState<Omit<JournalAnnouncement, 'id'>>(initialForm);

  const handleStartCreate = () => {
    setFormData(initialForm);
    setIsEditing(null);
    setIsCreating(true);
  };

  const handleStartEdit = (ann: JournalAnnouncement) => {
    setFormData({
      title: ann.title,
      shortMessage: ann.shortMessage,
      category: ann.category,
      startDate: ann.startDate,
      endDate: ann.endDate,
      primaryButtonText: ann.primaryButtonText,
      primaryButtonUrl: ann.primaryButtonUrl,
      secondaryButtonText: ann.secondaryButtonText || '',
      secondaryButtonUrl: ann.secondaryButtonUrl || '',
      icon: ann.icon || 'Sparkles',
      priority: ann.priority,
      published: ann.published,
    });
    setIsEditing(ann.id);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.shortMessage.trim()) {
      setNotification('Please provide both a title and short message for the announcement.');
      setTimeout(() => setNotification(null), 4000);
      return;
    }

    if (isEditing) {
      updateAnnouncement(isEditing, formData);
      setNotification(`Updated announcement: "${formData.title}"`);
    } else {
      const newAnnouncement: JournalAnnouncement = {
        ...formData,
        id: `ann-${Date.now().toString(36)}`,
        createdAt: new Date().toISOString(),
      };
      addAnnouncement(newAnnouncement);
      setNotification(`Created new announcement: "${formData.title}"`);
    }

    setIsEditing(null);
    setIsCreating(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the notice: "${title}"?`)) {
      deleteAnnouncement(id);
      setNotification(`Deleted notice: "${title}"`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Quick Preset Handlers for Editorial Ease
  const applyPreset = (presetType: 'cfp' | 'published' | 'deadline' | 'reviewers') => {
    if (presetType === 'published') {
      setFormData({
        title: 'Maiden Issue Now Published — Explore Volume 1, Issue 1 (2026)',
        shortMessage:
          'The inaugural issue of Tax Frontier is officially live online. Read peer-reviewed treatises covering digital tax administration, VAT harmonization, and extractive fiscal treaties.',
        category: 'Issue Published',
        startDate: '2026-12-01',
        endDate: '2027-06-30',
        primaryButtonText: 'View Current Issue',
        primaryButtonUrl: 'current-issue',
        secondaryButtonText: 'Browse Full Archive',
        secondaryButtonUrl: 'articles',
        icon: 'BookOpen',
        priority: 'featured',
        published: true,
      });
    } else if (presetType === 'deadline') {
      setFormData({
        title: 'Submission Deadline Extension: November 15, 2026',
        shortMessage:
          'In response to requests from academic departments and professional fellows across West Africa, the deadline for Volume 1 Number 1 has been extended to November 15, 2026.',
        category: 'Deadline Extension',
        startDate: '2026-10-15',
        endDate: '2026-11-15',
        primaryButtonText: 'Submit Paper Now',
        primaryButtonUrl: 'submit',
        secondaryButtonText: 'Author Guidelines',
        secondaryButtonUrl: 'author-guidelines',
        icon: 'Clock',
        priority: 'urgent',
        published: true,
      });
    } else if (presetType === 'reviewers') {
      setFormData({
        title: 'Call for Specialist Peer Reviewers: Fiscal Policy & Tax Law',
        shortMessage:
          'The Editorial Council invites Senior Lecturers, Professors, and CITN Fellows to register on our double-blind referee panel. Honorarium waivers apply for referee-authored submissions.',
        category: 'Reviewer Recruitment',
        startDate: '2026-09-01',
        endDate: '2026-12-31',
        primaryButtonText: 'Express Interest',
        primaryButtonUrl: 'contact',
        secondaryButtonText: 'Review Guidelines',
        secondaryButtonUrl: 'peer-review',
        icon: 'Users',
        priority: 'normal',
        published: true,
      });
    } else {
      setFormData({
        title: 'Maiden Call for Papers — Volume 1, Number 1 (2026)',
        shortMessage:
          'Theme: Navigating the New Era of Taxation. Original empirical manuscripts and policy evaluations invited. 30% publication discount applies to all accepted maiden papers.',
        category: 'Call for Papers',
        startDate: '2026-07-15',
        endDate: '2026-10-31',
        primaryButtonText: 'Submit Manuscript',
        primaryButtonUrl: 'submit',
        secondaryButtonText: 'Call Guidelines & Themes',
        secondaryButtonUrl: 'call-for-papers',
        icon: 'Sparkles',
        priority: 'featured',
        published: true,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Tier Scope & Value Proposition */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-950 text-white p-6 rounded-2xl border border-emerald-700/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
              Professional & Premium Tier Module
            </span>
            <span className="text-xs text-slate-300">CMS Control</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#C48A36]" />
            Reusable Announcement & Call-to-Action Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Control the prominent bulletin cards displayed on Demo 1, Demo 2, and Demo 3 homepages, as well as the public Announcements page. Transition seamlessly between Call for Papers, Issue Published, and Emergency Notices.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleStartCreate}
            className="px-4 py-2.5 bg-[#C48A36] hover:bg-[#b0782b] text-[#012509] font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Announcement</span>
          </button>
        </div>
      </div>

      {/* Editor Modal / Panel (When Creating or Editing) */}
      {(isCreating || isEditing) && (
        <form
          onSubmit={handleSave}
          className="bg-white rounded-2xl border-2 border-emerald-600 p-6 sm:p-7 shadow-lg space-y-5 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between border-b pb-3 border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isEditing ? 'Edit Announcement' : 'Create New Journal Announcement'}
              </h3>
              <p className="text-xs text-slate-500">
                Fields directly update the prominent banner across all demo homepages and the dedicated Announcements page.
              </p>
            </div>

            {/* Presets dropdown */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-medium">Quick Template:</span>
              <button
                type="button"
                onClick={() => applyPreset('cfp')}
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-semibold"
              >
                Call for Papers
              </button>
              <button
                type="button"
                onClick={() => applyPreset('published')}
                className="px-2 py-1 bg-emerald-100 hover:bg-emerald-200 rounded text-emerald-800 font-semibold"
              >
                Issue Published
              </button>
              <button
                type="button"
                onClick={() => applyPreset('deadline')}
                className="px-2 py-1 bg-rose-100 hover:bg-rose-200 rounded text-rose-800 font-semibold"
              >
                Deadline Extension
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Title */}
            <div className="md:col-span-8 space-y-1">
              <label className="text-xs font-bold text-slate-700">Announcement Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Maiden Issue Now Published — Explore Volume 1, Issue 1"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
              />
            </div>

            {/* Category */}
            <div className="md:col-span-4 space-y-1">
              <label className="text-xs font-bold text-slate-700">Category / Label *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
              >
                {announcementCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Short Message */}
            <div className="md:col-span-12 space-y-1">
              <label className="text-xs font-bold text-slate-700">Short Message / Summary *</label>
              <textarea
                rows={3}
                required
                value={formData.shortMessage}
                onChange={(e) => setFormData({ ...formData, shortMessage: e.target.value })}
                placeholder="Clear, concise message explaining the notice..."
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
              />
            </div>

            {/* Start Date & End Date */}
            <div className="md:col-span-4 space-y-1">
              <label className="text-xs font-bold text-slate-700">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
              />
            </div>

            <div className="md:col-span-4 space-y-1">
              <label className="text-xs font-bold text-slate-700">End Date / Deadline</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
              />
            </div>

            {/* Priority */}
            <div className="md:col-span-4 space-y-1">
              <label className="text-xs font-bold text-slate-700">Priority Level *</label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value as AnnouncementPriority })
                }
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 outline-none font-semibold"
              >
                <option value="normal">Normal (Standard Bulletin)</option>
                <option value="featured">Featured (Prominent Highlight)</option>
                <option value="urgent">Urgent (Top Priority Notice)</option>
              </select>
            </div>

            {/* Primary Button */}
            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-bold text-slate-700">Primary Button Text *</label>
              <input
                type="text"
                required
                value={formData.primaryButtonText}
                onChange={(e) => setFormData({ ...formData, primaryButtonText: e.target.value })}
                placeholder="e.g. Submit Manuscript"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
              />
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-bold text-slate-700">Primary Button Destination *</label>
              <select
                value={formData.primaryButtonUrl}
                onChange={(e) => setFormData({ ...formData, primaryButtonUrl: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
              >
                <option value="submit">Submit Manuscript (Portal)</option>
                <option value="current-issue">Current Issue (Vol 1 No 1)</option>
                <option value="articles">Articles Archive</option>
                <option value="call-for-papers">Call for Papers Page</option>
                <option value="author-guidelines">Author Guidelines</option>
                <option value="peer-review">Peer Review Protocol</option>
                <option value="ethics">Publication Ethics</option>
                <option value="indexing">Indexing Roadmap</option>
                <option value="contact">Editorial Contact</option>
                <option value="events">Conferences & Events</option>
                <option value="announcements">All Announcements Page</option>
              </select>
            </div>

            {/* Secondary Button (Optional) */}
            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-bold text-slate-700">Secondary Button Text (Optional)</label>
              <input
                type="text"
                value={formData.secondaryButtonText || ''}
                onChange={(e) => setFormData({ ...formData, secondaryButtonText: e.target.value })}
                placeholder="e.g. Call Guidelines & Themes"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
              />
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-bold text-slate-700">Secondary Destination</label>
              <select
                value={formData.secondaryButtonUrl || 'call-for-papers'}
                onChange={(e) => setFormData({ ...formData, secondaryButtonUrl: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
              >
                <option value="call-for-papers">Call for Papers Page</option>
                <option value="articles">Browse Full Archive</option>
                <option value="author-guidelines">Author Guidelines</option>
                <option value="peer-review">Peer Review Protocol</option>
                <option value="ethics">Publication Ethics</option>
                <option value="editorial-board">Editorial Council Profile</option>
                <option value="announcements">All Announcements</option>
              </select>
            </div>

            {/* Icon & Published status */}
            <div className="md:col-span-4 space-y-1">
              <label className="text-xs font-bold text-slate-700">Card Icon</label>
              <select
                value={formData.icon || 'Sparkles'}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
              >
                <option value="Sparkles">Sparkles (Campaign / Launch)</option>
                <option value="AlertCircle">AlertCircle (Urgent / Directive)</option>
                <option value="BookOpen">BookOpen (Published Issue / Journal)</option>
                <option value="Calendar">Calendar (Symposium / Schedule)</option>
                <option value="Clock">Clock (Deadline / Time-sensitive)</option>
                <option value="Award">Award (Milestone / Indexing)</option>
                <option value="Users">Users (Recruitment / Panel)</option>
                <option value="Send">Send (Submissions)</option>
              </select>
            </div>

            <div className="md:col-span-8 flex items-center gap-3 pt-5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm font-bold text-slate-800">
                  Publish to Live Journal Immediately
                </span>
              </label>
              <span className="text-xs text-slate-400">
                (When unchecked, notice is stored as a draft in CMS)
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => {
                setIsEditing(null);
                setIsCreating(false);
              }}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isEditing ? 'Save Changes' : 'Create & Publish Notice'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Announcements List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Active Journal Announcements ({announcements.length})
            </h3>
            <p className="text-xs text-slate-500">
              Notices are automatically ranked on homepages by Priority (Urgent → Featured → Normal).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openDemo('demo1')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Demo 1</span>
            </button>
            <button
              onClick={() => openDemo('demo2')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Demo 2</span>
            </button>
            <button
              onClick={() => openDemo('demo3')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Demo 3</span>
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className={`py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                !ann.published ? 'opacity-60 bg-slate-50/70 px-3 rounded-xl' : ''
              }`}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Priority Badge */}
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      ann.priority === 'urgent'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : ann.priority === 'featured'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {ann.priority === 'urgent'
                      ? '● Urgent'
                      : ann.priority === 'featured'
                      ? '★ Featured'
                      : 'Normal'}
                  </span>

                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {ann.category}
                  </span>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      ann.published
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {ann.published ? 'Published (Live)' : 'Draft (Hidden)'}
                  </span>

                  {ann.endDate && (
                    <span className="text-[11px] font-mono text-slate-400">
                      Expires: {ann.endDate}
                    </span>
                  )}
                </div>

                <h4 className="text-sm sm:text-base font-bold text-slate-900">{ann.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2 max-w-3xl">{ann.shortMessage}</p>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                  <span className="font-mono">Primary CTA:</span>
                  <span className="font-semibold text-emerald-700 bg-slate-100 px-1.5 py-0.5 rounded">
                    [{ann.primaryButtonText}] → {ann.primaryButtonUrl}
                  </span>
                  {ann.secondaryButtonText && (
                    <>
                      <span className="font-mono">Secondary:</span>
                      <span className="font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                        [{ann.secondaryButtonText}]
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => togglePublishAnnouncement(ann.id)}
                  title={ann.published ? 'Hide announcement' : 'Publish announcement'}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-colors ${
                    ann.published
                      ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600'
                  }`}
                >
                  {ann.published ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-[11px]">Unpublish</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-white" />
                      <span className="text-[11px]">Publish</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleStartEdit(ann)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                  title="Edit notice"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(ann.id, ann.title)}
                  className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl transition-colors"
                  title="Delete notice"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
