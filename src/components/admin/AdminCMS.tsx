import React, { useState } from 'react';
import { useJournalConfig } from '../../context/JournalConfigContext';
import {
  Sliders,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Calendar,
  DollarSign,
  Users,
  Settings,
  BarChart3,
  Network,
  Save,
  Plus,
  Edit2,
  Eye,
  EyeOff,
  Globe,
  Mail,
  Shield,
  Clock,
  Sparkles,
  Link2,
  Bell,
} from 'lucide-react';
import { EditorialMember, ChecklistItem } from '../../types';
import { AdminAnnouncementsManager } from './AdminAnnouncementsManager';

export const AdminCMS: React.FC = () => {
  const {
    config,
    updateConfig,
    editorialMembers,
    updateEditorialMember,
    addEditorialMember,
    checklist,
    updateChecklistItem,
    articles,
    setNotification,
    setCurrentView,
  } = useJournalConfig();

  const [activeTab, setActiveTab] = useState<
    'conflicts' | 'announcements' | 'fees' | 'gateway' | 'editorial' | 'analytics' | 'checklist'
  >('conflicts');

  // Form states for editable config
  const [formData, setFormData] = useState({
    submissionDeadline: config.submissionDeadline,
    submissionDeadlineStatus: config.submissionDeadlineStatus,
    reviewFee: config.reviewFee,
    reviewFeeStatus: config.reviewFeeStatus,
    publicationFee: config.publicationFee,
    publicationFeeStatus: config.publicationFeeStatus,
    maidenDiscount: config.maidenDiscount,
    maidenDiscountActive: config.maidenDiscountActive,
    editorialEmail: config.editorialEmail,
    editorialEmailStatus: config.editorialEmailStatus,
    journalDomain: config.journalDomain,
    journalDomainStatus: config.journalDomainStatus,
    maidenPublicationDate: config.maidenPublicationDate,
    maidenPublicationDateStatus: config.maidenPublicationDateStatus,
    contractRecipientEmail: config.contractRecipientEmail,
    contractRecipientStatus: config.contractRecipientStatus,
    submissionMode: config.submissionMode,
    jormassRelationship: config.jormassRelationship,
    creativeCommonsLicense: config.creativeCommonsLicense,
  });

  const [newMemberModal, setNewMemberModal] = useState(false);
  const [newMember, setNewMember] = useState<Omit<EditorialMember, 'id'>>({
    name: '',
    role: 'Associate Editor',
    institution: '',
    country: 'Nigeria',
    biography: '',
    orcid: '',
    expertise: ['Taxation', 'Corporate Tax'],
    status: 'unpublished',
  });

  const handleSaveConfig = () => {
    updateConfig(formData);
    setNotification('Journal settings updated successfully!');
    setTimeout(() => setNotification(null), 3500);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const created: EditorialMember = {
      ...newMember,
      id: `ed-${Date.now().toString(36)}`,
    };
    addEditorialMember(created);
    setNewMemberModal(false);
    setNewMember({
      name: '',
      role: 'Associate Editor',
      institution: '',
      country: 'Nigeria',
      biography: '',
      orcid: '',
      expertise: ['Taxation'],
      status: 'unpublished',
    });
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* CMS Header Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider text-purple-400 uppercase">
                OnlineFirst Admin CMS & Editorial Governance Panel
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Tax Frontier Journal Administration
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Configure data conflicts, submission routing, JORMASS gateway options, fee schedules, and pre-launch human verification checklist.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('demo1')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              <Eye className="w-4 h-4" />
              Preview Public Site
            </button>
            <button
              onClick={handleSaveConfig}
              className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              Save Configuration
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('conflicts')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'conflicts'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Data Conflicts & Field Confirmations</span>
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all relative ${
              activeTab === 'announcements'
                ? 'bg-purple-600 text-white shadow-sm ring-1 ring-amber-400/50'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-[#C48A36]" />
            <span>Announcements & Call-to-Action</span>
            <span className="text-[9px] font-mono font-bold bg-[#C48A36] text-[#012509] px-1.5 py-0.2 rounded-full uppercase">
              CMS
            </span>
          </button>

          <button
            onClick={() => setActiveTab('fees')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'fees'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Fees & Maiden Discount</span>
          </button>

          <button
            onClick={() => setActiveTab('gateway')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'gateway'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Network className="w-3.5 h-3.5 text-blue-400" />
            <span>JORMASS Gateway & Submission Mode</span>
          </button>

          <button
            onClick={() => setActiveTab('editorial')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'editorial'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-pink-400" />
            <span>Editorial Board Registry</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'checklist'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Human Client Confirmation Checklist</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'analytics'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
            <span>Journal Analytics (Demo Data)</span>
          </button>
        </div>

        {/* Tab: Announcements & Call to Action (CMS) */}
        {activeTab === 'announcements' && <AdminAnnouncementsManager />}

        {/* Tab 1: Data Conflicts & Configurable Fields */}
        {activeTab === 'conflicts' && (
          <div className="space-y-6">
            <div className="bg-amber-950/40 border border-amber-500/30 p-4 rounded-xl text-amber-200 text-xs flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-300 font-semibold text-sm">
                  Source-of-Truth Conflict Management Rule
                </strong>
                <p className="mt-1 leading-relaxed">
                  Several supplied promotional details conflict between early documents and current campaigns. The system does not silently choose or hard-code permanent values. All unresolved fields below carry the explicit status:
                  <span className="bg-amber-900 text-amber-200 px-1.5 py-0.5 rounded font-bold ml-1 border border-amber-600">
                    CLIENT CONFIRMATION REQUIRED
                  </span>.
                  You may edit current operational defaults at any time without source code modifications.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Submission Deadline */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200">submissionDeadline</label>
                  <span className="text-[10px] font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/40">
                    {formData.submissionDeadlineStatus}
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.submissionDeadline}
                  onChange={(e) => setFormData({ ...formData, submissionDeadline: e.target.value })}
                  className="w-full text-xs p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-purple-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400">Current active cutoff for maiden submissions.</p>
              </div>

              {/* Maiden Publication Date */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200">maidenPublicationDate</label>
                  <span className="text-[10px] font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/40">
                    {formData.maidenPublicationDateStatus}
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.maidenPublicationDate}
                  onChange={(e) => setFormData({ ...formData, maidenPublicationDate: e.target.value })}
                  className="w-full text-xs p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-purple-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400">Target release month for Volume 1 Number 1 online release.</p>
              </div>

              {/* Editorial Email */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200">editorialEmail</label>
                  <span className="text-[10px] font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/40">
                    {formData.editorialEmailStatus}
                  </span>
                </div>
                <input
                  type="email"
                  value={formData.editorialEmail}
                  onChange={(e) => setFormData({ ...formData, editorialEmail: e.target.value })}
                  className="w-full text-xs p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-purple-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400">Official contact address for author correspondence.</p>
              </div>

              {/* Journal Domain */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200">journalDomain</label>
                  <span className="text-[10px] font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/40">
                    {formData.journalDomainStatus}
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.journalDomain}
                  onChange={(e) => setFormData({ ...formData, journalDomain: e.target.value })}
                  className="w-full text-xs p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-purple-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400">Official domain destination (pending DNS confirmation).</p>
              </div>

              {/* Contract Recipient Email */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200">CONTRACT_RECIPIENT_EMAIL</label>
                  <span className="text-[10px] font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/40">
                    {formData.contractRecipientStatus}
                  </span>
                </div>
                <input
                  type="email"
                  value={formData.contractRecipientEmail}
                  onChange={(e) => setFormData({ ...formData, contractRecipientEmail: e.target.value })}
                  className="w-full text-xs p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-purple-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400">Designated commercial & legal recipient (CITN/MOUAU lead).</p>
              </div>

              {/* Creative Commons License */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200">creativeCommonsLicense</label>
                  <span className="text-[10px] font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/40">
                    CLIENT CONFIRMATION REQUIRED
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.creativeCommonsLicense}
                  onChange={(e) => setFormData({ ...formData, creativeCommonsLicense: e.target.value })}
                  className="w-full text-xs p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-purple-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400">Specific license (CC BY 4.0 recommended for DOAJ indexing).</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Fees & Maiden Discount */}
        {activeTab === 'fees' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-6">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                Configurable Publication & Assessment Fee Schedules
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    reviewFee (Assessment / Similarity Fee) (₦)
                  </label>
                  <input
                    type="number"
                    value={formData.reviewFee}
                    onChange={(e) => setFormData({ ...formData, reviewFee: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-purple-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Status: <strong className="text-amber-400">{formData.reviewFeeStatus}</strong>
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    publicationFee (Base Article Processing Charge) (₦)
                  </label>
                  <input
                    type="number"
                    value={formData.publicationFee}
                    onChange={(e) => setFormData({ ...formData, publicationFee: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-purple-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Status: <strong className="text-amber-400">{formData.publicationFeeStatus}</strong>
                  </span>
                </div>
              </div>

              {/* Maiden Discount Campaign Toggle */}
              <div className="p-4 bg-purple-950/30 border border-purple-800/40 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <strong className="text-xs text-white">
                      Maiden Edition Promotional Campaign: 30% Waiver
                    </strong>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.maidenDiscountActive}
                      onChange={(e) => setFormData({ ...formData, maidenDiscountActive: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-300">
                  <span>Maiden Discount Percentage:</span>
                  <input
                    type="number"
                    value={formData.maidenDiscount}
                    onChange={(e) => setFormData({ ...formData, maidenDiscount: Number(e.target.value) })}
                    className="w-20 text-xs p-1.5 bg-slate-950 border border-slate-700 rounded text-center text-white font-mono"
                  />
                  <span>%</span>
                  <span className="text-emerald-400 font-mono">
                    Discounted Maiden APC: ₦{(formData.publicationFee * (1 - formData.maidenDiscount / 100)).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: JORMASS Gateway & Submission Mode */}
        {activeTab === 'gateway' && (
          <div className="space-y-6">
            {/* Submission Mode Selector */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Link2 className="w-5 h-5 text-blue-400" />
                Submission Architecture: Mode A vs Mode B
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                The approved journal plan anticipates online submission. Choose whether the website links directly to an Open Journal Systems (OJS) backend, or hosts an integrated front-end submission portal.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  onClick={() => setFormData({ ...formData, submissionMode: 'external' })}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.submissionMode === 'external'
                      ? 'bg-blue-950/40 border-blue-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-sm font-bold">Mode A: External / OJS Submission</strong>
                    {formData.submissionMode === 'external' && (
                      <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded">Active</span>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed">
                    The Tax Frontier website acts as the discovery showcase, with submission CTAs directing authors to the institutional OJS author dashboard.
                  </p>
                </div>

                <div
                  onClick={() => setFormData({ ...formData, submissionMode: 'integrated' })}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.submissionMode === 'integrated'
                      ? 'bg-blue-950/40 border-blue-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-sm font-bold">Mode B: Integrated OnlineFirst Portal</strong>
                    {formData.submissionMode === 'integrated' && (
                      <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded">Active</span>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed">
                    Authors upload manuscripts and abstracts directly through the Tax Frontier frontend, connecting seamlessly with the publishing workflow.
                  </p>
                </div>
              </div>
            </div>

            {/* JORMASS Relationship Options (Option A, Option B, Option C) */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-emerald-400" />
                JORMASS Connection Architecture: All 3 Options Built
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                The client has not yet decided the formal institutional relationship between Tax Frontier and JORMASS. Toggle any of the three pre-architected deployment models below without redesigning the platform:
              </p>

              <div className="space-y-3">
                <div
                  onClick={() => setFormData({ ...formData, jormassRelationship: 'optionA' })}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.jormassRelationship === 'optionA'
                      ? 'bg-emerald-950/40 border-emerald-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-xs font-bold text-emerald-300">
                      Option A: Independent Journal + Mutual Cross-Link (Simplest Option)
                    </strong>
                    {formData.jormassRelationship === 'optionA' && (
                      <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded">Selected</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Tax Frontier operates completely independently. The header and footer display an institutional link: <em>Other MOUAU Journals → JORMASS</em>, and JORMASS links back to Tax Frontier.
                  </p>
                </div>

                <div
                  onClick={() => setFormData({ ...formData, jormassRelationship: 'optionB' })}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.jormassRelationship === 'optionB'
                      ? 'bg-emerald-950/40 border-emerald-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-xs font-bold text-emerald-300">
                      Option B: Shared Journal Gateway (MOUAU / COLMAS Journals Gateway)
                    </strong>
                    {formData.jormassRelationship === 'optionB' && (
                      <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded">Selected</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Creates an institutional gateway: <em>MOUAU / COLMAS Journals</em> featuring both JORMASS and Tax Frontier. Each journal retains its own identity, domain, and workflow, but readers switch between them via an integrated banner.
                  </p>
                </div>

                <div
                  onClick={() => setFormData({ ...formData, jormassRelationship: 'optionC' })}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.jormassRelationship === 'optionC'
                      ? 'bg-emerald-950/40 border-emerald-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-xs font-bold text-emerald-300">
                      Option C: Institutional Publishing Network (COLMAS Scholarly Publishing)
                    </strong>
                    {formData.jormassRelationship === 'optionC' && (
                      <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded">Selected</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    A comprehensive future publishing layer: <em>COLMAS Scholarly Publishing</em> designed to host JORMASS, Tax Frontier, future university journals, conference proceedings, and special fiscal publications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Editorial Board Registry */}
        {activeTab === 'editorial' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Editorial Board & Governance Registry</h2>
                <p className="text-xs text-slate-400">
                  Approved appointments are displayed publicly. Incomplete appointments remain stored safely as unpublished records and are never displayed publicly as "To be filled".
                </p>
              </div>

              <button
                onClick={() => setNewMemberModal(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Editorial Record
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {editorialMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block">
                        {member.role}
                      </span>
                      <strong className="text-sm font-bold text-white block mt-0.5">
                        {member.name}
                      </strong>
                      <span className="text-xs text-slate-400">{member.institution}, {member.country}</span>
                    </div>

                    <button
                      onClick={() =>
                        updateEditorialMember(member.id, {
                          status: member.status === 'published' ? 'unpublished' : 'published',
                        })
                      }
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors flex items-center gap-1 ${
                        member.status === 'published'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {member.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{member.status === 'published' ? 'Published' : 'Unpublished'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2">{member.biography}</p>

                  <div className="flex flex-wrap gap-1 text-[10px]">
                    {member.expertise.map((exp, i) => (
                      <span key={i} className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Human Client Confirmation Checklist */}
        {activeTab === 'checklist' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    Pre-Launch Human Client-Confirmation Items (OnlineFirst Protocol)
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Internal launch checklist for OnlineFirst. These 12 unresolved items do not block demo development and can be confirmed by the client committee prior to production launch.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-xs font-bold text-slate-200">{item.label}</strong>
                        <span className="text-[10px] text-purple-400 font-mono">Assigned: {item.assignedTo}</span>
                      </div>
                      <p className="text-xs text-slate-400">{item.description}</p>
                    </div>

                    <select
                      value={item.status}
                      onChange={(e) =>
                        updateChecklistItem(item.id, e.target.value as ChecklistItem['status'])
                      }
                      className={`text-xs px-3 py-1.5 rounded-lg font-semibold border bg-slate-900 ${
                        item.status === 'Verified'
                          ? 'text-emerald-400 border-emerald-700'
                          : item.status === 'Under Review'
                          ? 'text-blue-400 border-blue-700'
                          : 'text-amber-400 border-amber-700'
                      }`}
                    >
                      <option value="Pending Client Confirmation">Pending Client Confirmation</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Verified">Verified</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Analytics Dashboard (Tagged DEMO DATA) */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-amber-400" />
                    Tax Frontier Journal Analytics Architecture
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Pre-configured scholarly publishing metrics. All metrics below carry the mandatory designation:
                    <span className="bg-amber-950 text-amber-300 font-bold px-1.5 py-0.5 rounded ml-1 border border-amber-600">
                      DEMO DATA
                    </span>
                  </p>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Total Submissions (Maiden)</span>
                  <div className="text-2xl font-bold font-mono text-white mt-1">18 Manuscripts</div>
                  <span className="text-[10px] text-emerald-400">12 currently in peer review</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Average Turnaround</span>
                  <div className="text-2xl font-bold font-mono text-white mt-1">34 Days</div>
                  <span className="text-[10px] text-slate-400">Within 4–6 weeks window</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Article Downloads</span>
                  <div className="text-2xl font-bold font-mono text-white mt-1">4,260</div>
                  <span className="text-[10px] text-emerald-400">Across 14 countries</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Similarity Screening</span>
                  <div className="text-2xl font-bold font-mono text-white mt-1">100% Passed</div>
                  <span className="text-[10px] text-emerald-400">Strict ≤15% threshold</span>
                </div>
              </div>

              {/* Topic Popularity Breakdown */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Top Research Topics in Maiden Submissions
                </h3>
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Significant Economic Presence & Digital Taxation</span>
                      <span>32%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full w-[32%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>MSME Presumptive Taxation & Sub-National IGR</span>
                      <span>28%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[28%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Petroleum Industry Act (PIA) Host Community Trusts</span>
                      <span>22%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-[22%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>AI & Automated Risk Profiling in State IRS</span>
                      <span>18%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[18%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Member Modal */}
      {newMemberModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-white">Add Editorial Board Member</h3>
            <form onSubmit={handleAddMember} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Full Name & Honorifics *</label>
                <input
                  type="text"
                  required
                  placeholder="Prof./Dr. Name, FCTI"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Role *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Associate Editor (Tax Law)"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Institution *</label>
                <input
                  type="text"
                  required
                  placeholder="University / Organization"
                  value={newMember.institution}
                  onChange={(e) => setNewMember({ ...newMember, institution: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Status</label>
                <select
                  value={newMember.status}
                  onChange={(e) => setNewMember({ ...newMember, status: e.target.value as 'published' | 'unpublished' })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                >
                  <option value="unpublished">Unpublished (Internal registry only)</option>
                  <option value="published">Published (Display on public website)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewMemberModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white font-bold rounded"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
