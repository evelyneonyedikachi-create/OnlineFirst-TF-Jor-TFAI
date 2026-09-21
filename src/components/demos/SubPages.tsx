import React, { useState } from 'react';
import { useJournalConfig } from '../../context/JournalConfigContext';
import {
  subjectTaxonomies,
  peerReviewWorkflowSteps,
  indexingRoadmapData,
  maidenCallForPapers,
} from '../../data/journalData';
import { AnnouncementsSubPage } from './AnnouncementsSubPage';
import {
  FileText,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  Search,
  BookOpen,
  Send,
  ExternalLink,
  Award,
  Users,
  ChevronRight,
  Globe,
  DollarSign,
  Tag,
  Eye,
  BarChart3,
  Bookmark,
  Building,
  Quote,
  Scale,
  Sparkles,
  ArrowRight,
  Share2,
} from 'lucide-react';
import { JournalArticle } from '../../types';

export const SubPages: React.FC = () => {
  const {
    currentView,
    currentSubPage,
    setCurrentSubPage,
    config,
    articles,
    selectedArticle,
    setSelectedArticle,
    editorialMembers,
    setNotification,
  } = useJournalConfig();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTaxonomy, setSelectedTaxonomy] = useState<string>('all');
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);

  // Integrated submission state
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submittingForm, setSubmittingForm] = useState({
    title: '',
    authorName: '',
    authorEmail: '',
    authorAffiliation: '',
    category: subjectTaxonomies[0].name,
    abstract: '',
    coverLetter: '',
  });

  // Calculate discounted fee
  const discountedPubFee = config.maidenDiscountActive
    ? config.publicationFee * (1 - config.maidenDiscount / 100)
    : config.publicationFee;

  // Filter published editorial board members only (never show unpublished records as "To be filled" in public)
  const publicEditorialMembers = editorialMembers.filter((m) => m.status === 'published');

  // Filter articles
  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.authors.some((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTaxonomy =
      selectedTaxonomy === 'all' || art.subjectAreas.includes(selectedTaxonomy);
    return matchesSearch && matchesTaxonomy;
  });

  // Helper for citation copy
  const handleCopyCitation = (article: JournalArticle) => {
    const citation = `${article.authors.map((a) => a.name).join(', ')} (${article.publicationDate.split(' ')[1] || '2026'}). ${article.title}. Tax Frontier, ${article.volume}(${article.issue}), ${article.pages}. https://doi.org/${article.doi}`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(article.id);
    setTimeout(() => setCopiedCitation(null), 3000);
  };

  // Subpage router
  switch (currentSubPage) {
    case 'about':
    case 'vision-mission':
      return (
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Institutional Foundation & Mandate
            </span>
            <h1 className="text-3xl sm:text-4xl font-d1-heading font-bold text-slate-900 mt-3 tracking-tight">
              About Tax Frontier: Navigating the New Era of Taxation
            </h1>
            <p className="text-base text-slate-600 mt-2 font-medium">
              Jointly published by The Chartered Institute of Taxation of Nigeria (CITN Umuahia Chapter) and College of Management Sciences, Michael Okpara University of Agriculture, Umudike (MOUAU).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2 space-y-6 text-slate-700 leading-relaxed">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-700" />
                  Journal Purpose & Nature
                </h2>
                <p>
                  <strong>Tax Frontier</strong> is a peer-reviewed biannual scholarly and professional publication established to bridge the critical gap between academic fiscal research and the dynamic realities of tax administration, policy reforms, and corporate practice in Nigeria and across the African continent.
                </p>
                <p className="mt-3">
                  Recognizing the transformative pressures of the digital economy, emerging international tax compacts (BEPS/OECD Inclusive Framework), sub-national fiscal challenges, and modern statutory developments such as the Nigerian Finance Acts and Petroleum Industry Act, Tax Frontier provides an authoritative, evidence-based forum for scholarly debate and statutory interpretation.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-700" />
                  Vision & Mission
                </h2>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800">Our Vision</h3>
                  <p className="text-slate-700 mt-1">
                    To be Africa’s premier academic and professional taxation journal, recognized globally for rigorous scholarship, impactful policy insights, and leadership in navigating modern fiscal frontiers.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800">Our Mission</h3>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-700 text-sm">
                    <li>Promote cutting-edge research across all facets of direct, indirect, digital, and natural resource taxation.</li>
                    <li>Equip tax practitioners, tax directors, and revenue authorities with empirical methodologies and evidence.</li>
                    <li>Inform national, sub-national, and continental tax policy formulation with unbiased scholarly inquiry.</li>
                    <li>Foster ethical tax scholarship adhering to international COPE standards and transparent double-blind peer review.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Institutional Sidebar */}
            <div className="space-y-6">
              <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md border border-slate-800">
                <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-4">
                  Dual Publishing Partners
                </h3>
                
                <div className="space-y-4">
                  <div className="border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                      <Building className="w-4 h-4" />
                      CITN Umuahia Chapter
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      Chartered Institute of Taxation of Nigeria — the statutory professional body regulating tax practice, standards, and fiscal education across Nigeria.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                      <Building className="w-4 h-4" />
                      MOUAU COLMAS
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      College of Management Sciences, Michael Okpara University of Agriculture, Umudike — a leading center of postgraduate management, finance, and accounting research.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
                  <p><strong>Frequency:</strong> Biannual (June & December)</p>
                  <p className="mt-1"><strong>Format:</strong> Online First / Open Access</p>
                  <p className="mt-1"><strong>Archival:</strong> Limited ceremonial print run</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl text-amber-900">
                <h4 className="font-bold text-sm flex items-center gap-1.5 text-amber-950 mb-1">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  Maiden Edition Campaign
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Submissions are currently active for Volume 1, Number 1. Accepted manuscripts receive a 30% maiden waiver on publication fees.
                </p>
                <button
                  onClick={() => setCurrentSubPage('call-for-papers')}
                  className="mt-3 text-xs font-bold text-amber-950 underline hover:text-amber-800 flex items-center gap-1"
                >
                  View Call for Papers <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      );

    case 'aims-scope':
      return (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Broad Fiscal Mandate
            </span>
            <h1 className="text-3xl sm:text-4xl font-d1-heading font-bold text-slate-900 mt-3 tracking-tight">
              Aims & Scope: 26 Comprehensive Taxation Taxonomies
            </h1>
            <p className="text-base text-slate-600 mt-2">
              Tax Frontier covers the full breadth of direct and indirect taxation, fiscal jurisprudence, emerging digital technologies, and cross-border transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {subjectTaxonomies.map((tax) => (
              <div
                key={tax.id}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {tax.category}
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-2 group-hover:text-emerald-700 transition-colors">
                  {tax.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Empirical studies, statutory case briefs, administrative models, and practitioner perspectives accepted.
                </p>
                <button
                  onClick={() => {
                    setSelectedTaxonomy(tax.name);
                    setCurrentSubPage('articles');
                  }}
                  className="mt-3 text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 opacity-80 group-hover:opacity-100"
                >
                  Browse articles in this area <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      );

    case 'call-for-papers':
      return (
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Maiden Edition Hero Banner - Digital translation of campaign flyer */}
          <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-2xl p-8 sm:p-10 border border-emerald-800 shadow-xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-amber-400 text-slate-950 text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-sm">
                  Maiden Edition
                </span>
                <span className="bg-emerald-800/80 text-emerald-200 border border-emerald-700 text-xs font-medium px-3 py-1 rounded-full">
                  Volume 1, Issue 1
                </span>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-semibold px-3 py-1 rounded-full">
                  30% Early Discount Active
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-d1-heading font-bold text-white tracking-tight leading-tight">
                Call for Papers: {maidenCallForPapers.theme}
              </h1>

              <p className="text-slate-300 mt-4 text-base sm:text-lg max-w-3xl leading-relaxed">
                The Editorial Board of <strong>Tax Frontier</strong> invites high-quality original empirical research papers, analytical policy treatises, and tax law commentaries for our historic inaugural maiden volume.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  id="cfp-submit-hero-btn"
                  onClick={() => setCurrentSubPage('submit')}
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" />
                  Submit Your Manuscript
                </button>

                <button
                  id="cfp-guidelines-btn"
                  onClick={() => setCurrentSubPage('author-guidelines')}
                  className="px-6 py-3 bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 border border-emerald-700/80 font-semibold rounded-xl transition-all flex items-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  Author Guidelines
                </button>

                <button
                  onClick={() => {
                    setNotification('Maiden Edition Call for Papers announcement flyer downloaded (Digital Simulation).');
                    setTimeout(() => setNotification(null), 4000);
                  }}
                  className="px-4 py-3 text-slate-400 hover:text-white text-xs flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Download Flyer (PDF)
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-emerald-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300">
                <div>
                  <span className="text-slate-400 block">Call Opened:</span>
                  <strong className="text-white text-sm">{maidenCallForPapers.openingDate}</strong>
                </div>
                <div>
                  <span className="text-amber-400 block font-semibold">Submission Deadline:</span>
                  <strong className="text-amber-300 text-sm">{config.submissionDeadline}</strong>
                  {config.submissionDeadlineStatus === 'CLIENT CONFIRMATION REQUIRED' && (
                    <span className="text-[9px] text-amber-400/80 block mt-0.5">*Client confirmation required</span>
                  )}
                </div>
                <div>
                  <span className="text-slate-400 block">Target Publication:</span>
                  <strong className="text-white text-sm">{config.maidenPublicationDate}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Review Turnaround:</span>
                  <strong className="text-white text-sm">4–6 Weeks</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {/* Areas of Interest */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-emerald-700" />
                  Priority Areas of Interest for Maiden Volume
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {maidenCallForPapers.areasOfInterest.map((area, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who Can Submit & Paper Types */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-700" />
                    Who Can Submit
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-700 pl-4 list-disc">
                    {maidenCallForPapers.whoCanSubmit.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    Types of Papers Accepted
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-700 pl-4 list-disc">
                    {maidenCallForPapers.paperTypes.map((type, idx) => (
                      <li key={idx}>{type}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar with Fees and Contact */}
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-900 mb-3 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-700" />
                  Maiden Edition Fees & Discount
                </h3>
                <div className="space-y-3 text-xs text-emerald-950">
                  <div className="flex justify-between items-center py-1.5 border-b border-emerald-200">
                    <span className="text-slate-600">Review / Assessment Fee:</span>
                    <strong className="text-slate-900 font-mono text-sm">₦{config.reviewFee.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-emerald-200">
                    <span className="text-slate-600">Standard Publication Fee:</span>
                    <span className="line-through text-slate-400 font-mono text-xs">₦{config.publicationFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 bg-amber-100/80 px-2 rounded border border-amber-300 text-amber-950">
                    <div>
                      <span className="font-bold block">30% Maiden Discount:</span>
                      <span className="text-[10px] text-amber-800">Applied upon manuscript acceptance</span>
                    </div>
                    <strong className="font-mono text-base text-emerald-900">
                      ₦{discountedPubFee.toLocaleString()}
                    </strong>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 mt-4 italic">
                  *Review fee is payable upon initial editorial clearance prior to peer review. Publication fee is payable only after formal acceptance.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs text-slate-700">
                <h3 className="font-bold text-slate-900 text-sm mb-2">Submission Inquiries</h3>
                <p>For inquiries regarding manuscript eligibility or special symposium submissions, contact the Managing Editor:</p>
                <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100 font-mono text-xs text-slate-800 break-all">
                  {config.editorialEmail}
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'announcements':
      return <AnnouncementsSubPage />;

    case 'articles':
    case 'current-issue':
      return (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Scholarly Repository
              </span>
              <h1 className="text-3xl font-d1-heading font-bold text-slate-900 mt-2 tracking-tight">
                {currentSubPage === 'current-issue' ? 'Current Issue: Vol. 1 No. 1 (Inaugural Edition)' : 'Articles & Volume Archive'}
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Explore peer-reviewed taxation scholarship published under Gold Open Access.
              </p>
            </div>

            {/* Search and filter bar */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64 text-slate-800"
                />
              </div>

              <select
                value={selectedTaxonomy}
                onChange={(e) => setSelectedTaxonomy(e.target.value)}
                className="py-2 px-3 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 max-w-[200px]"
              >
                <option value="all">All Taxonomies</option>
                {subjectTaxonomies.map((tax) => (
                  <option key={tax.id} value={tax.name}>
                    {tax.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Articles list */}
          <div className="space-y-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-500 shadow-sm transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {article.type}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Vol. {article.volume} No. {article.issue} ({article.publicationDate})
                    </span>
                    <span className="text-[10px] text-slate-500">pp. {article.pages}</span>
                  </div>

                  {article.isDemoData && (
                    <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                      DEMO DATA
                    </span>
                  )}
                </div>

                <h2
                  onClick={() => {
                    setSelectedArticle(article);
                    setCurrentSubPage('article-detail');
                  }}
                  className="text-lg sm:text-xl font-d1-heading font-bold text-slate-900 hover:text-emerald-700 cursor-pointer transition-colors leading-snug"
                >
                  {article.title}
                </h2>

                <div className="text-xs text-slate-600 mt-2 font-medium">
                  {article.authors.map((a, i) => (
                    <span key={i}>
                      {a.name} ({a.affiliation})
                      {i < article.authors.length - 1 ? '; ' : ''}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-slate-700 mt-3 line-clamp-3 leading-relaxed">
                  {article.abstract}
                </p>

                {/* Keywords & Actions */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    {article.keywords.map((kw, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                        {kw}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleCopyCitation(article)}
                      className="text-slate-500 hover:text-slate-900 flex items-center gap-1 text-[11px]"
                    >
                      <Quote className="w-3.5 h-3.5" />
                      {copiedCitation === article.id ? 'Copied!' : 'Cite'}
                    </button>

                    <button
                      onClick={() => {
                        setSelectedArticle(article);
                        setCurrentSubPage('article-detail');
                      }}
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold rounded-lg transition-colors flex items-center gap-1 text-xs"
                    >
                      View Full Abstract & Metrics <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'article-detail':
      if (!selectedArticle) {
        return (
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <p>No article selected.</p>
            <button onClick={() => setCurrentSubPage('articles')} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded">
              Back to Articles
            </button>
          </div>
        );
      }

      return (
        <div className="max-w-5xl mx-auto px-4 py-12">
          <button
            onClick={() => setCurrentSubPage('articles')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 mb-6"
          >
            ← Back to Articles Repository
          </button>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {selectedArticle.type}
                </span>
                <span className="text-xs text-slate-500">
                  Tax Frontier Vol. {selectedArticle.volume} No. {selectedArticle.issue} ({selectedArticle.publicationDate})
                </span>
              </div>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                DEMO DATA
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-d1-heading font-bold text-slate-900 leading-snug tracking-tight">
              {selectedArticle.title}
            </h1>

            {/* Authors and Affiliations */}
            <div className="mt-6 space-y-2 border-y border-slate-100 py-4">
              {selectedArticle.authors.map((author, idx) => (
                <div key={idx} className="flex flex-wrap items-center gap-2 text-sm text-slate-700">
                  <span className="font-bold text-slate-900">{author.name}</span>
                  <span className="text-slate-500">— {author.affiliation}</span>
                  {author.orcid && (
                    <span className="text-[11px] text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      ORCID: {author.orcid}
                    </span>
                  )}
                  {author.isCorresponding && (
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 rounded">Corresponding Author</span>
                  )}
                </div>
              ))}
            </div>

            {/* DOI & License metadata */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <strong>DOI:</strong>
                <span className="font-mono text-emerald-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                  https://doi.org/{selectedArticle.doi}
                </span>
                <span className="text-[9px] text-amber-600 bg-amber-50 px-1 rounded border border-amber-200">DEMO DOI</span>
              </div>
              <div>
                <strong>Licence:</strong> {selectedArticle.license}
              </div>
            </div>

            {/* Abstract */}
            <div className="mt-8">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">Abstract</h2>
              <p className="text-slate-700 text-sm leading-relaxed text-justify bg-slate-50/70 p-6 rounded-xl border border-slate-100">
                {selectedArticle.abstract}
              </p>
            </div>

            {/* Keywords */}
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {selectedArticle.keywords.map((kw, i) => (
                  <span key={i} className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setNotification(`Downloading galley PDF for: "${selectedArticle.title}" with Crossref metadata (Digital Simulation).`);
                    setTimeout(() => setNotification(null), 4000);
                  }}
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all flex items-center gap-2 text-sm shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Download Full PDF Galley
                </button>

                <button
                  onClick={() => handleCopyCitation(selectedArticle)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl transition-colors flex items-center gap-1.5 text-xs"
                >
                  <Quote className="w-4 h-4" />
                  {copiedCitation === selectedArticle.id ? 'Citation Copied!' : 'Export Citation'}
                </button>
              </div>

              {/* Metrics Badge */}
              <div className="flex items-center gap-4 text-xs text-slate-600 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                <span className="flex items-center gap-1 font-semibold">
                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  {selectedArticle.metrics.views.toLocaleString()} Views
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold">
                  <Download className="w-3.5 h-3.5 text-emerald-600" />
                  {selectedArticle.metrics.downloads.toLocaleString()} Downloads
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold">
                  <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
                  {selectedArticle.metrics.citations} Citations
                </span>
                <span className="text-[9px] text-amber-600 font-bold bg-amber-50 px-1 rounded border border-amber-200">DEMO METRICS</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'submit':
      return (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Editorial Submission Portal
            </span>
            <h1 className="text-3xl font-d1-heading font-bold text-slate-900 mt-2 tracking-tight">
              Submit Your Manuscript to Tax Frontier
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Active Configuration: <strong>Mode {config.submissionMode === 'external' ? 'A (External OJS Redirect)' : 'B (Integrated Portal Experience)'}</strong>
            </p>
          </div>

          {config.submissionMode === 'external' ? (
            /* Mode A - External / OJS Redirect */
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                <Globe className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950">
                  <h4 className="font-bold text-sm">Mode A: Open Journal Systems (OJS) Submission Gateway</h4>
                  <p className="mt-1">
                    Tax Frontier utilizes an integrated Open Journal Systems (OJS) backend for double-blind reviewer assignment and copy-editing workflows. Authors are securely redirected to create or log in to their OJS author accounts.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                <h3 className="font-bold text-sm text-slate-900">Before proceeding to OJS, confirm your readiness:</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" />
                    <span>Manuscript is fully anonymized for double-blind peer review (no author names in text or metadata).</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" />
                    <span>Plagiarism check satisfies the journal’s strict ≤15% Turnitin/iThenticate threshold.</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" />
                    <span>Cover letter prepared addressing the Editor-in-Chief highlighting paper contribution.</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-4">
                <a
                  href={`https://${config.journalDomain}/ojs/index.php/taxfrontier/submission`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    setNotification(`Launching External OJS Submission Gateway at https://${config.journalDomain}/ojs/submission (Simulated Link).`);
                    setTimeout(() => setNotification(null), 4000);
                  }}
                  className="px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all flex items-center gap-2 text-sm shadow-md"
                >
                  Proceed to OJS Submission Portal <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setCurrentSubPage('author-guidelines')}
                  className="px-4 py-2.5 text-xs text-slate-600 hover:text-slate-900 font-semibold"
                >
                  Review Author Guidelines
                </button>
              </div>
            </div>
          ) : (
            /* Mode B - Integrated Submission Experience */
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              {submissionSuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-bold text-emerald-950">Manuscript Successfully Logged</h3>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto">
                    Your paper <strong>"{submittingForm.title}"</strong> has been queued for initial editorial screening and anti-plagiarism check. An acknowledgment has been transmitted to {submittingForm.authorEmail}.
                  </p>
                  <button
                    onClick={() => {
                      setSubmissionSuccess(false);
                      setSubmittingForm({
                        title: '',
                        authorName: '',
                        authorEmail: '',
                        authorAffiliation: '',
                        category: subjectTaxonomies[0].name,
                        abstract: '',
                        coverLetter: '',
                      });
                    }}
                    className="mt-3 px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold"
                  >
                    Submit Another Manuscript
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmissionSuccess(true);
                  }}
                  className="space-y-5"
                >
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
                    <strong>Mode B: Integrated OnlineFirst Submission.</strong> Upload your manuscript directly through the journal front-end for automated assignment.
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Manuscript Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sub-National Presumptive Taxation and Revenue Resilience"
                      value={submittingForm.title}
                      onChange={(e) => setSubmittingForm({ ...submittingForm, title: e.target.value })}
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Lead Author Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Prof./Dr./Barr. Full Name"
                        value={submittingForm.authorName}
                        onChange={(e) => setSubmittingForm({ ...submittingForm, authorName: e.target.value })}
                        className="w-full text-xs p-2.5 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Author Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="author@institution.edu.ng"
                        value={submittingForm.authorEmail}
                        onChange={(e) => setSubmittingForm({ ...submittingForm, authorEmail: e.target.value })}
                        className="w-full text-xs p-2.5 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Institutional Affiliation *</label>
                      <input
                        type="text"
                        required
                        placeholder="University / Organization"
                        value={submittingForm.authorAffiliation}
                        onChange={(e) => setSubmittingForm({ ...submittingForm, authorAffiliation: e.target.value })}
                        className="w-full text-xs p-2.5 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Subject Taxonomy Area *</label>
                      <select
                        value={submittingForm.category}
                        onChange={(e) => setSubmittingForm({ ...submittingForm, category: e.target.value })}
                        className="w-full text-xs p-2.5 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      >
                        {subjectTaxonomies.map((tax) => (
                          <option key={tax.id} value={tax.name}>
                            {tax.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Abstract (200 - 300 words) *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Paste manuscript abstract..."
                      value={submittingForm.abstract}
                      onChange={(e) => setSubmittingForm({ ...submittingForm, abstract: e.target.value })}
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Upload Manuscript (DOCX/PDF) *</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center text-xs text-slate-500 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                      <FileText className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                      <p className="font-semibold text-slate-700">Click to select or drag and drop manuscript file</p>
                      <p className="text-[11px] text-slate-400 mt-1">Anonymized document, max 25MB (DOCX, PDF)</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-md"
                  >
                    Submit Manuscript for Review
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      );

    case 'author-guidelines':
      return (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Author Instructions
            </span>
            <h1 className="text-3xl font-d1-heading font-bold text-slate-900 mt-2 tracking-tight">
              Author Guidelines & Manuscript Preparation
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Guidelines for submitting original research to Tax Frontier.
            </p>
          </div>

          <div className="space-y-6 text-xs text-slate-700 leading-relaxed">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900">1. Manuscript Structure & Word Counts</h2>
              <p>
                Articles must be written in clear, academic English. The recommended length for empirical research articles is between <strong>6,000 and 9,000 words</strong> including abstract, footnotes, and references. Policy and statutory case commentaries should range between <strong>3,000 and 5,000 words</strong>.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Title:</strong> Concise, descriptive, avoiding abbreviations (maximum 20 words).</li>
                <li><strong>Abstract:</strong> Structured or unstructured abstract between 200–250 words summarizing research problem, methodology, key findings, and statutory/policy implications.</li>
                <li><strong>Keywords:</strong> 4 to 6 keywords indexed in standard fiscal taxonomies.</li>
                <li><strong>Introduction:</strong> Problem statement, theoretical anchor, research gap, and paper outline.</li>
                <li><strong>Statutory / Empirical Methodology:</strong> Clear econometric, doctrinal legal, or survey design explanation.</li>
                <li><strong>Results & Fiscal Implications:</strong> Rigorous presentation with policy-relevant insights.</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                2. Anti-Plagiarism Screening (15% Threshold)
              </h2>
              <p>
                All manuscripts undergo mandatory similarity screening via Turnitin or iThenticate prior to reviewer assignment. <strong>The journal strictly enforces a maximum similarity threshold of 15%</strong> (excluding statutory citations, standard bibliography, and quotations under 8 words). Manuscripts exceeding this threshold will be returned for revision without peer review.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-base font-bold text-slate-900">3. Referencing Style</h2>
              <p>
                Tax Frontier follows the <strong>APA 7th Edition</strong> citation format for social sciences and economic analyses. For articles heavily rooted in tax law, statutory interpretation, or Tax Appeal Tribunal jurisprudence, authors may utilize <strong>OSCOLA</strong> citation rules for statutes and reported cases alongside APA references.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-base font-bold text-slate-900">4. Anonymization for Double-Blind Review</h2>
              <p>
                To ensure impartial review, author identities, affiliations, acknowledgments, and self-referencing phrases (e.g., "in our earlier study") must be expunged from the initial submission manuscript file. Author details should be submitted exclusively on a separate title page.
              </p>
            </div>
          </div>
        </div>
      );

    case 'editorial-board':
      return (
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Governance & Integrity
            </span>
            <h1 className="text-3xl font-d1-heading font-bold text-slate-900 mt-2 tracking-tight">
              Editorial Board & Governance
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Distinguished academic researchers and chartered tax practitioners steering Tax Frontier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {publicEditorialMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-500 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {member.role}
                    </span>
                    <h3 className="text-lg font-d1-heading font-bold text-slate-900 mt-2">
                      {member.name}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">{member.institution}</p>
                    <p className="text-xs text-slate-400">{member.country}</p>
                  </div>
                  {member.orcid && (
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-mono">
                      ORCID
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {member.biography}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1">
                  {member.expertise.map((exp, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500">
            <strong>Editorial Appointment Policy:</strong> Tax Frontier adheres strictly to transparent governance. Additional international and regional advisory positions currently undergoing vetting are managed confidentially in the editorial administrative registry and published only upon full formal ratification.
          </div>
        </div>
      );

    case 'peer-review':
      return (
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Rigorous Evaluation
            </span>
            <h1 className="text-3xl font-d1-heading font-bold text-slate-900 mt-2 tracking-tight">
              14-Step Peer Review Process
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Documented reviewer turnaround: <strong>4–6 weeks</strong>. All manuscripts undergo strict double-blind peer review.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            {peerReviewWorkflowSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-emerald-400 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs border border-emerald-300">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{step.name}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'fees':
      return (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Transparent Financing
            </span>
            <h1 className="text-3xl font-d1-heading font-bold text-slate-900 mt-2 tracking-tight">
              Publication Fees & Waiver Policy
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Tax Frontier operates as an open-access journal supported by article processing charges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900">Review & Assessment Fee</h2>
              <div className="text-2xl font-bold font-mono text-slate-900">
                ₦{config.reviewFee.toLocaleString()}
              </div>
              <p className="text-xs text-slate-600">
                Non-refundable fee covering initial similarity check (Turnitin), editorial desk assessment, and reviewer coordination honoraria.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-emerald-300 shadow-sm space-y-4 relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-amber-400 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded uppercase">
                Maiden 30% Waiver
              </div>
              <h2 className="text-base font-bold text-slate-900">Publication Fee (APC)</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-emerald-700">
                  ₦{discountedPubFee.toLocaleString()}
                </span>
                <span className="line-through text-xs text-slate-400 font-mono">
                  ₦{config.publicationFee.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Payable strictly upon peer-review acceptance. Covers DOI minting, XML galley typesetting, proofreading, server hosting, and open-access dissemination.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Waiver & Hardship Policy</h3>
            <p>
              The Editorial Board provides fee concessions for postgraduate student lead authors, independent researchers from low-income developing nations, and authors presenting research of exceptional statutory urgency. Waiver requests must be submitted alongside initial manuscript submission.
            </p>
          </div>
        </div>
      );

    case 'ethics':
      return (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Ethical Standards
            </span>
            <h1 className="text-3xl font-d1-heading font-bold text-slate-900 mt-2 tracking-tight">
              Publication Ethics & Editorial Policies
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Aligned with Committee on Publication Ethics (COPE) core practices.
            </p>
          </div>

          <div className="space-y-6 text-xs text-slate-700 leading-relaxed">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <h3 className="font-bold text-sm text-slate-900">Double-Blind Peer Review</h3>
              <p>
                Both reviewer identities and author identities are kept strictly anonymous throughout the peer-review life cycle. Reviewers are required to disclose any financial, professional, or institutional conflicts of interest.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <h3 className="font-bold text-sm text-slate-900">AI and Generative Tools Usage Policy</h3>
              <p>
                Generative AI tools (e.g. LLMs) cannot be listed as authors. Authors using AI tools for statistical coding or grammar polishing must transparently disclose their use in an Acknowledgments or Methodology note. Authors bear sole responsibility for all factual citations and statutory interpretations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <h3 className="font-bold text-sm text-slate-900">Corrections, Retractions & Expressions of Concern</h3>
              <p>
                Tax Frontier follows COPE guidelines for issuing errata, corrigenda, or retractions. Retracted articles remain accessible on the web platform but will carry prominent, permanent retraction watermarks detailing grounds.
              </p>
            </div>
          </div>
        </div>
      );

    case 'indexing':
      return (
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Discovery Roadmap
            </span>
            <h1 className="text-3xl font-d1-heading font-bold text-slate-900 mt-2 tracking-tight">
              Indexing, Discovery & Metadata Roadmaps
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Clear segregation between active platform verification and phased target indexing roadmaps.
            </p>
          </div>

          {/* Active / Verified */}
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Current Verified Foundation
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {indexingRoadmapData.verified.map((v, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 text-xs">
                  <span className="font-bold text-emerald-950 block">{v.name}</span>
                  <span className="text-emerald-700 block mt-1">{v.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Phase 1 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h3 className="font-bold text-slate-900 text-base">{indexingRoadmapData.phase1.phase}</h3>
              <span className="text-xs text-slate-500 font-medium">{indexingRoadmapData.phase1.timeline}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {indexingRoadmapData.phase1.services.map((s, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900">{s.name}</strong>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">{s.badge}</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-1">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Phase 2 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h3 className="font-bold text-slate-900 text-base">{indexingRoadmapData.phase2.phase}</h3>
              <span className="text-xs text-slate-500 font-medium">{indexingRoadmapData.phase2.timeline}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {indexingRoadmapData.phase2.services.map((s, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900">{s.name}</strong>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">{s.badge}</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-1">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Phase 3 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h3 className="font-bold text-slate-900 text-base">{indexingRoadmapData.phase3.phase}</h3>
              <span className="text-xs text-slate-500 font-medium">{indexingRoadmapData.phase3.timeline}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {indexingRoadmapData.phase3.services.map((s, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900">{s.name}</strong>
                    <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded">{s.badge}</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-1">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'events':
      return (
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Academic & Professional Convenings
            </span>
            <h1 className="text-3xl sm:text-4xl font-d1-heading font-bold text-slate-900 mt-3 tracking-tight">
              Symposia, Conferences & Technical Workshops
            </h1>
            <p className="text-base text-slate-600 mt-2">
              Jointly sponsored by CITN Umuahia Chapter and MOUAU COLMAS to foster empirical tax scholarship, professional capacity building, and policy dialog.
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {/* Event 1 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:border-emerald-500 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-100 text-amber-900 text-xs font-bold uppercase px-2.5 py-0.5 rounded border border-amber-300">
                    Annual Hybrid Symposium
                  </span>
                  <span className="text-xs text-slate-500">Vol. 1 Special Issue Track</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>November 24–25, 2026</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                National Tax Policy & Sub-National Revenue Mobilization Symposium
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Theme: <em>"Navigating the New Era of Fiscal Federalism: Digital Platforms, Informal Sector Compliance, and Sub-National Fiscal Autonomy in Nigeria."</em>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5 pt-4 border-t border-slate-100 text-xs text-slate-600">
                <div>
                  <strong className="block text-slate-900">Venue & Mode:</strong>
                  <span>COLMAS Conference Auditorium, MOUAU Umudike & Zoom Global Hybrid</span>
                </div>
                <div>
                  <strong className="block text-slate-900">Accreditation:</strong>
                  <span>CITN Mandatory Professional Training (12 CPD Credit Units)</span>
                </div>
                <div>
                  <strong className="block text-slate-900">Publication Pipeline:</strong>
                  <span className="text-emerald-700 font-semibold">Accepted papers fast-tracked for Tax Frontier Vol. 1, Issue 2</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setCurrentSubPage('submit')}
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Symposium Abstract
                </button>
                <button
                  onClick={() => {
                    setNotification('Symposium delegate registration form opened (Digital Simulation).');
                    setTimeout(() => setNotification(null), 4000);
                  }}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs transition-colors"
                >
                  Register as Delegate
                </button>
              </div>
            </div>

            {/* Event 2 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:border-emerald-500 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-purple-100 text-purple-900 text-xs font-bold uppercase px-2.5 py-0.5 rounded border border-purple-300">
                    Faculty & Practitioner Workshop
                  </span>
                  <span className="text-xs text-slate-500">Peer Referee Masterclass</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-900 bg-purple-50 px-3 py-1 rounded-lg border border-purple-200">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>October 14, 2026</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Joint Editorial & Reviewer Workshop: Enhancing African Scholarly Publishing Rigor
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                A hands-on methodology training for associate editors, reviewers, and doctoral researchers focusing on COPE double-blind evaluation, Turnitin similarity analytics, statutory legal referencing, and Open Access compliance.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setCurrentSubPage('contact')}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs flex items-center gap-2 transition-all"
                >
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  Apply to Join Reviewer Panel
                </button>
                <button
                  onClick={() => setCurrentSubPage('peer-review')}
                  className="px-4 py-2.5 text-slate-600 hover:text-slate-900 text-xs font-semibold"
                >
                  Review 14-Step Peer Review Protocol →
                </button>
              </div>
            </div>
          </div>
        </div>
      );

    case 'search':
      return (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Scholarly Discovery Engine
            </span>
            <h1 className="text-3xl sm:text-4xl font-d1-heading font-bold text-slate-900 mt-3 tracking-tight">
              Search Tax Frontier Publications & Archive
            </h1>
            <p className="text-base text-slate-600 mt-2">
              Browse peer-reviewed empirical research, statutory policy analyses, and case commentaries.
            </p>
          </div>

          {/* Search bar & filters */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keywords, title, author name, or abstract text..."
                className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700 bg-slate-200/80 px-2 py-1 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
                Filter Area:
              </span>
              <button
                onClick={() => setSelectedTaxonomy('all')}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                  selectedTaxonomy === 'all'
                    ? 'bg-emerald-800 text-white font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Areas ({articles.length})
              </button>
              {subjectTaxonomies.slice(0, 7).map((tax) => (
                <button
                  key={tax.id}
                  onClick={() => setSelectedTaxonomy(tax.name)}
                  className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                    selectedTaxonomy === tax.name
                      ? 'bg-emerald-800 text-white font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tax.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results list */}
          <div className="space-y-4">
            <div className="text-xs font-semibold text-slate-500 flex items-center justify-between px-1">
              <span>Showing {filteredArticles.length} scholarly treatise{filteredArticles.length !== 1 ? 's' : ''}</span>
              {selectedTaxonomy !== 'all' && (
                <span className="text-emerald-700">Area: {selectedTaxonomy}</span>
              )}
            </div>

            {filteredArticles.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-slate-300">
                <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="font-bold text-slate-800 text-base">No matching articles found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your search keywords or resetting the subject area taxonomy filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTaxonomy('all');
                  }}
                  className="mt-4 px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredArticles.map((art) => (
                <div
                  key={art.id}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all group"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                      {art.type}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      Vol. {art.volume}, Issue {art.issue} ({art.publicationDate})
                    </span>
                    <span className="text-xs text-emerald-700 font-mono">
                      DOI: {art.doi}
                    </span>
                  </div>

                  <h3
                    onClick={() => {
                      setSelectedArticle(art);
                      setCurrentSubPage('article-detail');
                    }}
                    className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 cursor-pointer transition-colors"
                  >
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    {art.authors.map((a) => a.name).join(', ')} —{' '}
                    <span className="text-slate-400">{art.authors[0]?.affiliation}</span>
                  </p>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {art.abstract}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {art.keywords.slice(0, 3).map((kw, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {kw}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyCitation(art)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                      >
                        <Quote className="w-3.5 h-3.5" />
                        {copiedCitation === art.id ? 'Copied' : 'Cite'}
                      </button>

                      <button
                        onClick={() => {
                          setSelectedArticle(art);
                          setCurrentSubPage('article-detail');
                        }}
                        className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
                      >
                        <span>View Article</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );

    case 'contact':
    default:
      return (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Communication Office
            </span>
            <h1 className="text-3xl font-d1-heading font-bold text-slate-900 mt-2 tracking-tight">
              Contact Tax Frontier Editorial Secretariat
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs text-slate-700">
              <h3 className="font-bold text-slate-900 text-sm">Editorial Correspondence</h3>
              <p>
                Address manuscript inquiries, reviewer applications, and institutional subscription queries to:
              </p>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 font-mono text-emerald-800">
                {config.editorialEmail}
              </div>
              <p className="text-slate-500">
                <strong>Postal Office:</strong> College of Management Sciences (COLMAS), Michael Okpara University of Agriculture, Umudike, Abia State, Nigeria.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs text-slate-700">
              <h3 className="font-bold text-slate-900 text-sm">Professional Chapter Office</h3>
              <p>
                <strong>The Chartered Institute of Taxation of Nigeria (CITN):</strong>
              </p>
              <p className="text-slate-600">
                Umuahia District Society / Chapter Secretariat, Umuahia, Abia State, Nigeria.
              </p>
              <p className="text-slate-500 pt-2 border-t border-slate-100">
                Tax Frontier is jointly governed by the MOUAU COLMAS Academic Editorial Council and CITN Umuahia Professional Publications Committee.
              </p>
            </div>
          </div>
        </div>
      );
  }
};
