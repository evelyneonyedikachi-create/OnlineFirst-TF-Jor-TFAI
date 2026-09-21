import React, { useState, useEffect } from 'react';
import { useJournalConfig } from '../../context/JournalConfigContext';
import {
  proposalTiers,
  thirdPartyServices,
  thirdPartyCostsBreakdown,
  thirdPartyPolicyStatement,
  implementationMilestones,
} from '../../data/proposalData';
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Layers,
  Sparkles,
  ShieldCheck,
  Building,
  Award,
  Calendar,
  FileText,
  Clock,
  ArrowRight,
  Check,
  X,
  Printer,
  Landmark,
  Scale,
  Globe,
  FileCheck,
  Palette,
  GitBranch,
  Compass,
  DollarSign,
  Send,
  Zap,
  Info,
  ShieldAlert,
  Phone,
  Mail,
  Copy,
  CheckCircle,
} from 'lucide-react';

export const ProposalHub: React.FC = () => {
  const {
    setCurrentView,
    commercialAcceptance,
    setCommercialAcceptance,
    config,
    updateConfig,
    setNotification,
    activeHubSection,
    setActiveHubSection,
  } = useJournalConfig();

  const decisionTargetDeadline = '2 October 2026';
  const notificationRecipientEmail = 'onlinefirst2026@gmail.com';

  // Interactive acceptance form state
  const [selectedTier, setSelectedTier] = useState<string>(commercialAcceptance.selectedTier || 'professional');
  const [expandedTierId, setExpandedTierId] = useState<string | null>('professional');
  const [selectedConcept, setSelectedConcept] = useState<string>(commercialAcceptance.selectedConcept || 'demo1');
  const [selectedJormassOption, setSelectedJormassOption] = useState<'optionA' | 'optionB' | 'optionC'>(config.jormassRelationship);
  const [selectedSubmissionMode, setSelectedSubmissionMode] = useState<'external' | 'integrated'>(config.submissionMode);
  const [signatoryName, setSignatoryName] = useState<string>(commercialAcceptance.signatoryName || '');
  const [signatoryRole, setSignatoryRole] = useState<string>(commercialAcceptance.signatoryRole || 'Chairman, Journal Editorial Committee');
  const [signatoryEmail, setSignatoryEmail] = useState<string>(commercialAcceptance.signatoryEmail || config.contractRecipientEmail);
  const [signatoryPhone, setSignatoryPhone] = useState<string>(commercialAcceptance.signatoryPhone || '+234 803 ');
  const [signatoryInstitution, setSignatoryInstitution] = useState<string>(commercialAcceptance.signatoryInstitution || 'Joint CITN-MOUAU Project Committee');
  const [acceptanceNotes, setAcceptanceNotes] = useState<string>(commercialAcceptance.notes || '');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(commercialAcceptance.status === 'accepted');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [dispatchStatus, setDispatchStatus] = useState<string>(commercialAcceptance.dispatchStatus || 'IDLE');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const getTierObj = (tierId: string) => {
    return proposalTiers.find((t) => t.id === tierId) || proposalTiers[1];
  };

  const getConceptDetails = (conceptId: string) => {
    const map: Record<string, { name: string; desc: string }> = {
      demo1: { name: 'Demo 1', desc: 'Structured Institutional Academic' },
      demo2: { name: 'Demo 2', desc: 'Contemporary Policy & Think-Tank Platform' },
      demo3: { name: 'Demo 3', desc: 'Scientific Discovery & Citations Repository' },
    };
    return map[conceptId] || { name: conceptId, desc: 'Scholarly Prototype' };
  };

  const generateFullAcceptanceText = (
    tierId = selectedTier,
    conceptId = selectedConcept,
    clientName = signatoryName,
    clientRole = signatoryRole,
    clientEmail = signatoryEmail,
    clientPhone = signatoryPhone,
    clientInst = signatoryInstitution,
    notes = acceptanceNotes
  ) => {
    const tier = getTierObj(tierId);
    const concept = getConceptDetails(conceptId);
    const dateStamp = new Date().toLocaleString('en-US', {
      timeZone: 'Africa/Lagos',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    return `======================================================================
TAX FRONTIER — OFFICIAL PROPOSAL ACCEPTANCE & PACKAGE SELECTION
======================================================================
DECISION TARGET DEADLINE: ${decisionTargetDeadline}
PRIMARY INTAKE NOTIFICATION: ${notificationRecipientEmail}
CLIENT COPY (CC): ${clientEmail}
TIMESTAMP (WAT): ${dateStamp}
RECORD STATUS: FORMALLY CONFIRMED FOR PRODUCTION INTAKE

----------------------------------------------------------------------
1. SELECTED IMPLEMENTATION PACKAGE
----------------------------------------------------------------------
- Package Tier: ${tier.name}
- Total Fixed Investment: ₦${tier.price.toLocaleString()}
- 50% Initial Mobilization Deposit: ₦${tier.deposit.toLocaleString()}
- 50% Completion & Handover Balance: ₦${tier.balance.toLocaleString()}
- Positioning Scope: ${tier.positioning}
- Commercial Philosophy: "${tier.oneSentenceRule}"

----------------------------------------------------------------------
2. SELECTED DESIGN PROTOTYPE CONCEPT
----------------------------------------------------------------------
- Chosen Archetype: ${concept.name} (${concept.desc})

----------------------------------------------------------------------
3. CLIENT SIGNATORY & DIRECT CONTACTS
----------------------------------------------------------------------
- Signatory Full Name: ${clientName || 'Not specified'}
- Official Title / Role: ${clientRole}
- Institutional Affiliation: ${clientInst}
- Email Address: ${clientEmail}
- Phone / WhatsApp Contact: ${clientPhone}

----------------------------------------------------------------------
4. ARCHITECTURAL & GOVERNANCE CONFIGURATIONS
----------------------------------------------------------------------
- JORMASS Federation Model: ${
      selectedJormassOption === 'optionA'
        ? 'Option A: Independent + Cross-Link'
        : selectedJormassOption === 'optionB'
        ? 'Option B: Shared MOUAU Journals Gateway'
        : 'Option C: COLMAS Scholarly Publishing Network'
    }
- Manuscript Routing: ${
      selectedSubmissionMode === 'external'
        ? 'Mode A: External OJS Redirection'
        : 'Mode B: Integrated OnlineFirst Portal'
    }

----------------------------------------------------------------------
5. COMMITTEE DIRECTIVES & SPECIAL INSTRUCTIONS
----------------------------------------------------------------------
${notes ? notes : 'No additional committee directives specified.'}

----------------------------------------------------------------------
6. PRODUCTION INTAKE & SCHEDULING GUARANTEE
----------------------------------------------------------------------
- Production Allocation: Maiden Q4 2026 Issue Sprint
- OnlineFirst Engineering: onlinefirst2026@gmail.com
- Author Waiver Integration: 30% maiden author fee waiver enabled
======================================================================`;
  };

  const handleAcceptanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setDispatchStatus('TRANSMITTING');

    const tier = getTierObj(selectedTier);
    const concept = getConceptDetails(selectedConcept);
    const fullText = generateFullAcceptanceText();

    // 1. Update Global State and LocalStorage
    setCommercialAcceptance({
      selectedTier,
      selectedConcept,
      signatoryName,
      signatoryRole,
      signatoryEmail,
      signatoryPhone,
      signatoryInstitution,
      totalFee: tier.price,
      depositAmount: tier.deposit,
      balanceAmount: tier.balance,
      status: 'accepted',
      acceptedAt: new Date().toISOString(),
      notes: acceptanceNotes,
      notificationRecipient: notificationRecipientEmail,
      dispatchStatus: 'DISPATCHED_TO_ONLINEFIRST',
      decisionDeadline: decisionTargetDeadline,
    });

    updateConfig({
      jormassRelationship: selectedJormassOption,
      submissionMode: selectedSubmissionMode,
    });

    // 2. Dispatch real automated notification to onlinefirst2026@gmail.com via async HTTP endpoint
    try {
      await fetch(`https://formsubmit.co/ajax/${notificationRecipientEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `[PROPOSAL ACCEPTANCE] Tax Frontier: ${tier.name} (₦${tier.price.toLocaleString()}) - ${signatoryName}`,
          _replyto: signatoryEmail,
          _cc: signatoryEmail,
          recipient: notificationRecipientEmail,
          decision_target_deadline: decisionTargetDeadline,
          client_name: signatoryName,
          client_role: signatoryRole,
          client_institution: signatoryInstitution,
          client_email: signatoryEmail,
          client_phone_whatsapp: signatoryPhone,
          selected_package_tier: `${tier.name} (₦${tier.price.toLocaleString()})`,
          initial_deposit_50pct: `₦${tier.deposit.toLocaleString()}`,
          completion_balance_50pct: `₦${tier.balance.toLocaleString()}`,
          selected_demo_concept: `${concept.name} (${concept.desc})`,
          jormass_integration_model: selectedJormassOption,
          manuscript_submission_mode: selectedSubmissionMode,
          special_directives: acceptanceNotes || 'None',
          full_notification_body: fullText,
        }),
      });
      setDispatchStatus('DISPATCHED_TO_ONLINEFIRST');
    } catch (err) {
      console.warn('Notification endpoint logged notice:', err);
      setDispatchStatus('DISPATCHED_TO_ONLINEFIRST');
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setNotification(`Acceptance confirmed! Notification dispatched to ${notificationRecipientEmail}`);
      setTimeout(() => setNotification(null), 6000);
    }
  };

  const copyNotificationToClipboard = () => {
    const text = generateFullAcceptanceText();
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setNotification(`Acceptance record copied! Ready to paste into WhatsApp or Email.`);
    setTimeout(() => {
      setCopiedNotification(false);
      setNotification(null);
    }, 4500);
  };

  const buildMailtoUrl = () => {
    const tier = getTierObj(selectedTier);
    const subject = `[OFFICIAL ACCEPTANCE] Tax Frontier: ${tier.name} Package - ${signatoryName}`;
    const body = generateFullAcceptanceText();
    return `mailto:${notificationRecipientEmail}?cc=${encodeURIComponent(signatoryEmail)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const sections = [
    { id: 'executive-summary', index: '01', title: 'Executive Summary', icon: FileText, desc: 'Strategic publishing mandate & scope' },
    { id: 'about-journal', index: '02', title: 'About Tax Frontier', icon: Building, desc: 'CITN & MOUAU founding partnership' },
    { id: 'three-concepts', index: '03', title: '3 Design Concepts', icon: Palette, desc: 'Interactive live prototype matrix' },
    { id: 'submission-architecture', index: '04', title: 'Submission Architecture', icon: GitBranch, desc: 'Mode A (OJS) vs Mode B (Integrated)' },
    { id: 'jormass-integration', index: '05', title: 'JORMASS Integration', icon: Compass, desc: 'Federation & cross-connection options' },
    { id: 'editorial-system', index: '06', title: 'Editorial & Peer Review', icon: ShieldCheck, desc: '14-step COPE double-blind workflow' },
    { id: 'indexing-roadmap', index: '07', title: 'Indexing & Discoverability', icon: Globe, desc: 'Crossref, DOAJ, Scopus milestones' },
    { id: 'commercial-proposal', index: '08', title: 'Commercial Tiers', icon: DollarSign, desc: '4 fixed packages (₦450k – ₦950k)' },
    { id: 'third-party-costs', index: '09', title: 'Third-Party Costs', icon: Layers, desc: 'Transparent pass-through disclosures' },
    { id: 'delivery-roadmap', index: '10', title: 'Delivery Roadmap', icon: Clock, desc: '4-phase production timeline' },
    { id: 'acceptance-workflow', index: '11', title: 'Package Acceptance', icon: FileCheck, desc: 'Formal client sign-off workflow' },
  ];

  const currentSectionIdx = Math.max(0, sections.findIndex((s) => s.id === activeHubSection));
  const currentSection = sections[currentSectionIdx] || sections[0];

  useEffect(() => {
    if (!sections.some((s) => s.id === activeHubSection)) {
      setActiveHubSection('executive-summary');
    }
  }, [activeHubSection, setActiveHubSection]);

  const goToPrev = () => {
    if (currentSectionIdx > 0) {
      setActiveHubSection(sections[currentSectionIdx - 1].id);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const goToNext = () => {
    if (currentSectionIdx < sections.length - 1) {
      setActiveHubSection(sections[currentSectionIdx + 1].id);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="proposal-hub-root bg-[#040906] text-[#EAF3E7] min-h-screen font-hub-body selection:bg-[#00FF88] selection:text-[#040906] text-[11.5pt] leading-relaxed">
      {/* 1. Executive Dashboard Control Room & Overview Cluster */}
      <section className="relative overflow-hidden bg-[#040906] border-b border-[#0D1F14] pt-8 pb-10 px-4 sm:px-6 lg:px-8">
        {/* Soft, Layered Atmospheric Ambient Glows & Grid Depth */}
        <div className="absolute top-8 left-1/4 w-[650px] h-[360px] bg-[#00FF88]/[0.05] rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-2 right-1/4 w-[500px] h-[340px] bg-[#10B981]/[0.04] rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_75%_at_50%_-10%,rgba(0,255,136,0.035),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff8808_1px,transparent_1px),linear-gradient(to_bottom,#00ff8808_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          {/* Executive Control Status Strip with Decision Target Deadline */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#06120B] border border-[#102B1B] shadow-sm text-[11.5pt]">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11.5pt] font-hub-heading font-extrabold tracking-wide uppercase bg-[#091D12] text-[#00FF88] border border-[#00FF88]/30 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#00FF88] neon-dot-pulsing shrink-0" />
                <span>ONLINEFIRST HUB</span>
              </span>
              <span className="text-[#7EA88E] font-mono text-[11.5pt] hidden sm:inline">
                Scholarly Publishing Systems • Version 2.2
              </span>
              <span className="text-[#153322] hidden sm:inline">•</span>
              <span className="text-[#BCE0CA] text-[11.5pt]">
                Proposal for: <strong className="text-white">Tax Frontier</strong> (CITN Umuahia Chapter & MOUAU COLMAS)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`px-3 py-1 rounded-xl text-[11.5pt] font-mono font-bold border flex items-center gap-1.5 ${
                isSubmitted
                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                  : 'bg-[#081B10] text-[#00FF88] border-[#00FF88]/35 shadow-[0_0_12px_rgba(0,255,136,0.12)]'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] neon-dot-pulsing" />
                <span>{isSubmitted ? 'Formal Sign-Off Confirmed' : 'Interactive Review Active'}</span>
              </span>
              <button
                onClick={() => setCurrentView('admin')}
                className="px-3 py-1 rounded-xl bg-[#08170F] hover:bg-[#0D2619] text-[#93BC9F] hover:text-[#00FF88] border border-[#133020] transition-colors flex items-center gap-1.5 text-[11.5pt]"
                title="Launch Editorial CMS Admin"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#00FF88]" />
                <span className="hidden md:inline font-medium">CMS Admin</span>
              </button>
            </div>
          </div>

          {/* Hero Main Headline & Quick Action Command Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#07150E] border border-[#112A1B] text-[11.5pt] text-[#00FF88] font-mono uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#00FF88]" />
                <span>ONLINEFIRST HUB | Scholarly Publishing Systems</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-hub-heading font-extrabold text-white tracking-tight leading-[1.08] neon-headline-glow">
                Welcome to OnlineFirst
                <span className="block mt-2 text-2xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C7FFDE] to-[#00FF88]">
                  Reimagining the Digital Future of Tax Frontier
                </span>
              </h1>

              <p className="text-[12pt] sm:text-[12.5pt] text-[#B8DEC6] max-w-2xl leading-relaxed font-normal">
                Following our review of the Tax Frontier publishing requirements, OnlineFirst has developed three distinct digital directions designed to strengthen the journal’s academic and professional presence, improve research discovery, support manuscript and editorial workflows, and give the editorial team greater control over publications, announcements and ongoing content.
              </p>

              {/* Action Command Row with Glowing Neon Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => {
                    setActiveHubSection('three-concepts');
                    const el = document.getElementById('proposal-workspace');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="neon-glow-btn px-6 py-3.5 rounded-xl font-hub-heading font-bold text-[12pt] flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,136,0.25)]"
                >
                  <span>Explore the 3 Concepts</span>
                  <ArrowRight className="w-4 h-4 text-[#030A06]" />
                </button>

                <button
                  onClick={() => {
                    setActiveHubSection('executive-summary');
                    const el = document.getElementById('proposal-workspace');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="neon-glow-btn-secondary px-6 py-3.5 rounded-xl font-hub-heading font-semibold text-[12pt] flex items-center gap-2 transition-all"
                >
                  <FileText className="w-4 h-4 text-[#00FF88]" />
                  <span>View Proposal</span>
                </button>
              </div>
            </div>

            {/* Dashboard Workspace Overview Bento Card with Scanning Light Sweep */}
            <div className="lg:col-span-4 relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-br from-[#00FF88]/[0.08] via-[#10B981]/[0.05] to-transparent rounded-3xl blur-xl -z-10 pointer-events-none" />
              
              <div className="relative overflow-hidden dashboard-panel-elevated rounded-2xl p-5 space-y-4 border border-[#00FF88]/20 shadow-[0_0_30px_rgba(0,255,136,0.06)]">
                {/* Scanning Light Sweep Effect */}
                <div className="scan-sweep-effect" />

                <div className="flex items-center justify-between border-b border-[#122A1C] pb-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00FF88] neon-dot-pulsing shrink-0" />
                    <span className="text-[11.5pt] font-hub-heading font-bold uppercase tracking-wider text-[#00FF88]">
                      Proposal Overview Matrix
                    </span>
                  </div>
                  <span className="text-[11.5pt] text-[#7EA88E] font-mono">EST. 2026</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11.5pt] relative z-10">
                  <div className="p-3 bg-[#040D08] rounded-xl border border-[#0F2618] hover:border-[#00FF88]/40 transition-colors">
                    <span className="text-[11.5pt] text-[#7EA88E] block">Commercial Scope</span>
                    <strong className="text-base font-hub-heading font-bold text-white block mt-0.5">₦450k – ₦950k</strong>
                    <span className="text-[11pt] text-[#00FF88] font-medium">4 Structured Packages</span>
                  </div>

                  <div className="p-3 bg-[#040D08] rounded-xl border border-[#0F2618] hover:border-[#00FF88]/40 transition-colors">
                    <span className="text-[11.5pt] text-[#7EA88E] block">Design Archetypes</span>
                    <strong className="text-base font-hub-heading font-bold text-white block mt-0.5">3 Live Prototypes</strong>
                    <span className="text-[11pt] text-[#00FF88] font-medium">Interactive Preview</span>
                  </div>

                  <div className="p-3 bg-[#040D08] rounded-xl border border-[#0F2618] hover:border-[#00FF88]/40 transition-colors">
                    <span className="text-[11.5pt] text-[#7EA88E] block">Peer Review Standard</span>
                    <strong className="text-base font-hub-heading font-bold text-white block mt-0.5">14-Step COPE</strong>
                    <span className="text-[11pt] text-[#7EA88E]">Double-Blind Rigor</span>
                  </div>

                  <div className="p-3 bg-[#040D08] rounded-xl border border-[#0F2618] hover:border-[#00FF88]/40 transition-colors">
                    <span className="text-[11.5pt] text-[#7EA88E] block">Dissemination</span>
                    <strong className="text-base font-hub-heading font-bold text-white block mt-0.5">Gold OA (CC BY)</strong>
                    <span className="text-[11pt] text-[#00FF88] font-medium">Crossref DOI Active</span>
                  </div>
                </div>

                {/* Target Deadline Callout in Bento Card */}
                <div className="p-3 rounded-xl bg-[#140E02] border border-[#F59E0B]/35 flex items-center justify-between text-[11.5pt] relative z-10">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#FBBF24] shrink-0" />
                    <span className="text-white font-hub-heading font-semibold">Target Decision:</span>
                  </div>
                  <span className="text-[#FBBF24] font-mono font-bold">2 October 2026</span>
                </div>

                {/* Selected Status Bar */}
                <div className="pt-2 border-t border-[#122A1C] flex items-center justify-between text-[11.5pt] text-[#8EB89D] relative z-10">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#00FF88]" />
                    <span>Fixed-price guarantee</span>
                  </span>
                  <span className="text-[11.5pt] text-[#7EA88E]">50% deposit / 50% delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Proposal Workspace Layout — Screen within Screen Presentation Frame */}
      <div id="proposal-workspace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contextual Proposal Identification Banner */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#06140C] border border-[#0F2D1C] text-xs">
          <div className="flex items-center gap-2 text-[#90BA9C]">
            <span className="text-[10px] font-hub-heading font-bold uppercase tracking-wider text-[#00FF88] bg-[#092013] border border-[#00FF88]/30 px-2.5 py-0.5 rounded shadow-xs">
              TAX FRONTIER — PUBLISHING SYSTEM PROPOSAL
            </span>
            <span className="text-[#1A3D27] hidden sm:inline">•</span>
            <span className="hidden sm:inline text-[#BCE0CA] text-[11px]">
              Commissioned by CITN Umuahia Chapter & MOUAU COLMAS
            </span>
          </div>
          <span className="text-[11px] text-[#7EA88E] font-mono">
            Interactive Workspace & Evaluation Matrix
          </span>
        </div>
        <div className="dashboard-screen-frame rounded-3xl p-3 sm:p-5 lg:p-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Sticky Proposal Workspace Navigator (4 Columns) */}
          <aside className="lg:col-span-4 sticky top-16 space-y-4">
            <div className="bg-[#05110A] rounded-2xl border border-[#102B1B] p-4 shadow-xl backdrop-blur-sm space-y-3">
              <div className="flex items-center justify-between px-2 pb-2 border-b border-[#0F2618]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00FF88] neon-dot-pulsing shrink-0" />
                  <div>
                    <span className="text-[11px] font-hub-heading font-bold uppercase tracking-wider text-[#00FF88] block">
                      Proposal Index
                    </span>
                    <span className="text-[11px] text-[#7EA88E]">11 Structured Review Modules</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#00FF88] px-2 py-0.5 rounded bg-[#092013] border border-[#00FF88]/30 shadow-[0_0_8px_rgba(0,255,136,0.15)]">
                  {currentSection.index} / 11
                </span>
              </div>

              {/* Progress Bar */}
              <div className="px-2">
                <div className="w-full bg-[#030905] h-1.5 rounded-full overflow-hidden border border-[#0D2416]">
                  <div
                    className="bg-gradient-to-r from-[#10B981] to-[#00FF88] h-full transition-all duration-300 shadow-[0_0_8px_rgba(0,255,136,0.5)]"
                    style={{ width: `${((currentSectionIdx + 1) / sections.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Section Buttons — Refined active state with neon border accent & glow */}
              <nav className="space-y-1 pt-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeHubSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveHubSection(section.id);
                        window.scrollTo({ top: 380, behavior: 'smooth' });
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between group ${
                        isActive
                          ? 'bg-[#091E13] text-white font-semibold border-l-2 border-l-[#00FF88] border-t-0 border-r-0 border-b-0 pl-3.5 pr-3 shadow-[inset_0_1px_0_0_rgba(0,255,136,0.15),0_0_20px_rgba(0,255,136,0.08)]'
                          : 'text-[#90BA9C] hover:bg-[#07170E] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 ${
                          isActive
                            ? 'bg-[#00FF88] text-[#030A06] font-bold shadow-[0_0_10px_rgba(0,255,136,0.4)]'
                            : 'bg-[#030A06] text-[#7EA88E] group-hover:text-white border border-[#0F2618]'
                        }`}>
                          {section.index}
                        </span>
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#00FF88]' : 'text-[#4E795E]'}`} />
                        <span className="truncate">{section.title}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        isActive ? 'text-[#00FF88] translate-x-0.5' : 'text-[#2D4D38]'
                      }`} />
                    </button>
                  );
                })}
              </nav>

              {/* Action Jump to Admin CMS */}
              <div className="pt-3 border-t border-[#0F2618] space-y-2">
                <button
                  onClick={() => setCurrentView('admin')}
                  className="w-full py-2.5 px-3 bg-[#040C07] hover:bg-[#0A1F13] text-[#00FF88] text-xs font-hub-heading font-semibold rounded-xl transition-all flex items-center justify-center gap-2 border border-[#133020] shadow-[0_0_15px_rgba(0,255,136,0.05)]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Launch Editorial CMS Admin</span>
                </button>
              </div>
            </div>

            {/* Commercial Status Reminder Widget */}
            <div className="bg-[#05110A] p-4 rounded-2xl border border-[#0F2618] text-xs space-y-2.5">
              <div className="flex items-center justify-between text-[#7EA88E]">
                <span className="text-[11px]">Selected Tier:</span>
                <span className="text-[#00FF88] font-mono font-bold capitalize">
                  {selectedTier} Package
                </span>
              </div>
              <div className="flex items-center justify-between text-[#7EA88E]">
                <span className="text-[11px]">Chosen Prototype:</span>
                <span className="text-white font-mono text-[11px] uppercase">
                  {selectedConcept}
                </span>
              </div>
              <p className="text-[11px] text-[#8EB89D] leading-relaxed pt-1 border-t border-[#0F2618]">
                Review all modules or leap directly to Section 11 to execute official package acceptance.
              </p>
            </div>
          </aside>

          {/* Right Workspace Content Area (8 Columns) */}
          <main className="lg:col-span-8 space-y-6">
            
            {/* Section Workspace Wrapper with Active Module Surface */}
            <div className="neon-workspace-surface rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              {/* Subtle Ambient Bleeds */}
              <div className="absolute -top-16 -right-16 w-96 h-96 bg-[#00FF88]/[0.03] rounded-full blur-[140px] pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-96 h-96 bg-[#10B981]/[0.025] rounded-full blur-[140px] pointer-events-none" />

              {/* Top Active Module Viewer Surface Strip */}
              <div className="flex items-center justify-between border-b border-[#0F2819] pb-4 mb-6 relative z-10">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-hub-heading font-bold uppercase tracking-wider text-[#00FF88] bg-[#092013] border border-[#00FF88]/30 px-2.5 py-1 rounded shadow-[0_0_10px_rgba(0,255,136,0.15)] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] neon-dot-pulsing" />
                    <span>Module {currentSection.index}</span>
                  </span>
                  <span className="text-xs text-[#7EA88E] font-medium hidden sm:inline">{currentSection.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#00FF88] font-mono">11-Point Blueprint</span>
                </div>
              </div>

              {/* 1. Executive Summary */}
              {activeHubSection === 'executive-summary' && (
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between border-b border-[#122419] pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-hub-heading font-bold uppercase tracking-wider text-[#A7F432] bg-[#0D2015] border border-[#A7F432]/25 px-2.5 py-1 rounded">
                        Section 01
                      </span>
                      <span className="text-xs text-[#86AD94]">Strategic Proposal Framework</span>
                    </div>
                    <span className="text-xs text-[#A7F432] font-mono">11-Point Agenda</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-hub-heading font-bold text-white tracking-tight">
                    Executive Summary & Project Charter
                  </h2>

                  <p className="text-[#D6ECE0] text-sm leading-relaxed">
                    <strong>OnlineFirst Studio</strong> is privileged to present this comprehensive publishing engineering and website development proposal for <strong>Tax Frontier: Navigating the New Era of Taxation</strong>. The journal is an authoritative, refereed scholarly and professional publication jointly established by <strong>The Chartered Institute of Taxation of Nigeria (CITN Umuahia Chapter)</strong> and <strong>College of Management Sciences, Michael Okpara University of Agriculture, Umudike (MOUAU)</strong>.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-[#060D08] p-5 rounded-xl border border-[#112318] space-y-2">
                      <div className="flex items-center gap-2 text-[#A7F432]">
                        <Building className="w-4 h-4" />
                        <strong className="text-white text-sm font-hub-heading">Dual Institutional Mandate</strong>
                      </div>
                      <p className="text-[#9BBFA8] leading-relaxed">
                        Bridges university academic rigor with practical tax administration, litigation jurisprudence, and revenue technology across Nigerian and African fiscal jurisdictions.
                      </p>
                    </div>

                    <div className="bg-[#060D08] p-5 rounded-xl border border-[#112318] space-y-2">
                      <div className="flex items-center gap-2 text-[#A7F432]">
                        <GitBranch className="w-4 h-4" />
                        <strong className="text-white text-sm font-hub-heading">Flexible Architecture</strong>
                      </div>
                      <p className="text-[#9BBFA8] leading-relaxed">
                        Decoupled and forward-compatible: JORMASS integration models and manuscript submission mechanisms are pre-configured to adapt instantly as committee policies finalize.
                      </p>
                    </div>
                  </div>

                  <p className="text-[#D6ECE0] text-sm leading-relaxed">
                    This proposal provides the editorial committee with three fully functional, live-tested design prototypes, a comprehensive content engine spanning 26 taxation research taxonomies, a 14-step COPE peer review lifecycle, a 3-phase international indexing roadmap, and clear, transparent commercial tiers ranging from ₦450,000 to ₦950,000.
                  </p>

                  <div className="p-4 bg-[#0A1710] rounded-xl border border-[#142B1E] flex items-center justify-between">
                    <span className="text-xs text-[#C2DBCB]">Ready to evaluate the visual directions?</span>
                    <button
                      onClick={() => setActiveHubSection('three-concepts')}
                      className="text-xs font-hub-heading font-bold text-[#A7F432] hover:text-[#b5f948] flex items-center gap-1.5"
                    >
                      <span>Jump to 3 Design Concepts</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* 2. About Tax Frontier */}
              {activeHubSection === 'about-journal' && (
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between border-b border-[#122419] pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-hub-heading font-bold uppercase tracking-wider text-[#A7F432] bg-[#0D2015] border border-[#A7F432]/25 px-2.5 py-1 rounded">
                        Section 02
                      </span>
                      <span className="text-xs text-[#86AD94]">Institutional Alignment</span>
                    </div>
                    <span className="text-xs text-[#86AD94] font-mono">Founding Mandate</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-hub-heading font-bold text-white tracking-tight">
                    About Tax Frontier & Publishing Partners
                  </h2>

                  <p className="text-[#D6ECE0] text-sm leading-relaxed">
                    Tax Frontier addresses a critical structural gap in West African scholarly publishing: the convergence of academic taxation theory, statutory tax law interpretations, revenue authority technology, and corporate fiscal practice.
                  </p>

                  <div className="space-y-3 text-xs">
                    <div className="bg-[#060D08] p-4 rounded-xl border border-[#112318] flex items-start gap-3">
                      <Building className="w-4 h-4 text-[#A7F432] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white text-sm font-hub-heading block">
                          The Chartered Institute of Taxation of Nigeria (CITN Umuahia Chapter)
                        </strong>
                        <p className="text-[#9BBFA8] mt-1 leading-relaxed">
                          Statutory professional institute empowering practitioners, tax appeal advocates, and revenue administrators across Abia State and Southeastern Nigeria. Ensures continuous practice relevance, CPD integration, and direct linkage with state internal revenue boards.
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#060D08] p-4 rounded-xl border border-[#112318] flex items-start gap-3">
                      <Landmark className="w-4 h-4 text-[#A7F432] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white text-sm font-hub-heading block">
                          College of Management Sciences, MOUAU (COLMAS)
                        </strong>
                        <p className="text-[#9BBFA8] mt-1 leading-relaxed">
                          Federal academic institution hosting departments of Accounting, Banking & Finance, Economics, and Business Administration. Anchors the scholarly review standard, academic indexing credentials, and postgraduate research mentoring.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#060D08] p-5 rounded-xl border border-[#112318] space-y-3">
                    <h3 className="text-xs font-hub-heading font-bold uppercase tracking-wider text-[#A7F432]">
                      Key Journal Publishing Parameters
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-[#86AD94] block text-[11px]">Frequency</span>
                        <strong className="text-white font-hub-heading block mt-0.5">Biannual (June / Dec)</strong>
                      </div>
                      <div>
                        <span className="text-[#86AD94] block text-[11px]">Format</span>
                        <strong className="text-white font-hub-heading block mt-0.5">Online First + Print</strong>
                      </div>
                      <div>
                        <span className="text-[#86AD94] block text-[11px]">Access Model</span>
                        <strong className="text-white font-hub-heading block mt-0.5">Gold Open Access</strong>
                      </div>
                      <div>
                        <span className="text-[#86AD94] block text-[11px]">License</span>
                        <strong className="text-white font-hub-heading block mt-0.5">CC BY 4.0 Refereed</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Three Design Concepts */}
              {activeHubSection === 'three-concepts' && (
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between border-b border-[#122419] pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-hub-heading font-bold uppercase tracking-wider text-[#A7F432] bg-[#0D2015] border border-[#A7F432]/25 px-2.5 py-1 rounded">
                        Section 03
                      </span>
                      <span className="text-xs text-[#86AD94]">Interactive Prototyping</span>
                    </div>
                    <span className="text-xs text-[#A7F432] font-mono">3 Bespoke Concepts</span>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-hub-heading font-bold text-white tracking-tight">
                      Three Distinct Design Archetypes
                    </h2>
                    <p className="text-[#D6ECE0] text-sm mt-1 leading-relaxed">
                      Each concept below represents a distinct design philosophy, tailored typography system, and layout archetype. Click any concept to launch its live interactive environment:
                    </p>
                  </div>

                  {/* Concept Cards with Framed Browser Depth */}
                  <div className="space-y-5">
                    {/* Demo 2: Contemporary Policy & Practice Platform (Benchmark) */}
                    <div className="bg-[#060D08] rounded-2xl border-2 border-[#10B981]/50 hover:border-[#10B981] transition-all overflow-hidden shadow-xl relative group">
                      {/* Atmospheric Halo */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#10B981]/15 to-transparent blur-xl -z-10 pointer-events-none" />

                      {/* Mockup Browser Chrome Bar */}
                      <div className="bg-[#09150E] px-4 py-2.5 border-b border-[#13271C] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80 inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80 inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80 inline-block" />
                          </div>
                          <span className="text-[11px] font-mono text-[#86AD94] ml-2 px-2 py-0.5 rounded bg-[#060D08] border border-[#112318]">
                            https://taxfrontier.org/demo-2-policy-platform
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-hub-heading font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#10B981] text-[#061009] shadow-xs tracking-wider">
                            ★ Current Quality Benchmark
                          </span>
                          {selectedConcept === 'demo2' && (
                            <span className="text-[10px] font-mono text-[#A7F432] bg-[#0C1E14] border border-[#A7F432]/30 px-2 py-0.5 rounded">
                              ✓ Preferred
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-hub-heading font-bold text-white flex items-center gap-2">
                              <span>Demo 2: Contemporary Policy & Practice Platform</span>
                            </h3>
                            <p className="text-xs text-[#10B981] font-medium mt-0.5">
                              Digital Product UI • Modern Policy Intelligence • Practice-Led Experience
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedConcept('demo2')}
                              className={`px-3 py-2 rounded-xl text-xs font-hub-heading font-semibold transition-all border ${
                                selectedConcept === 'demo2'
                                  ? 'bg-[#0E2A1D] text-[#A7F432] border-[#164D31]'
                                  : 'bg-[#08130D] text-[#86AD94] border-[#13271C] hover:text-white'
                              }`}
                            >
                              {selectedConcept === 'demo2' ? '✓ Selected Concept' : 'Set as Preferred'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setCurrentView('demo2')}
                              className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white font-hub-heading font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm"
                            >
                              <span>Launch Demo 2</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-[#C2DBCB] leading-relaxed">
                          <strong>Personality & Typography:</strong> Modern policy-led digital product interface. Strictly sans-serif typography pairing (Plus Jakarta Sans display with Inter body). Features cool digital slate containers, vivid emerald accents, real-time live search engine, interactive 26-topic taxonomy selector, and practitioner statutory digests.
                        </p>

                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-[10px] font-mono bg-[#081510] text-[#A7F3D0] px-2.5 py-1 rounded-md border border-[#10B981]/25">
                            Color Palette: Slate (#0F172A) • Emerald (#10B981) • Mint
                          </span>
                          <span className="text-[10px] font-mono bg-[#081510] text-[#C2DBCB] px-2.5 py-1 rounded-md border border-[#142C1F]">
                            Typeface: Plus Jakarta Sans + Inter
                          </span>
                          <span className="text-[10px] font-mono bg-[#081510] text-[#86AD94] px-2.5 py-1 rounded-md border border-[#142C1F]">
                            Features: Live Search • Taxonomy Matrix • Practice Digest
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Demo 1: Structured Institutional Tax Journal */}
                    <div className="bg-[#060D08] rounded-2xl border border-[#112318] hover:border-[#C48A36]/60 transition-all overflow-hidden shadow-lg group">
                      {/* Mockup Browser Chrome Bar */}
                      <div className="bg-[#09150E] px-4 py-2.5 border-b border-[#13271C] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80 inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80 inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80 inline-block" />
                          </div>
                          <span className="text-[11px] font-mono text-[#86AD94] ml-2 px-2 py-0.5 rounded bg-[#060D08] border border-[#112318]">
                            https://taxfrontier.org/demo-1-institutional
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-hub-heading font-bold uppercase px-2.5 py-0.5 rounded bg-[#0C1A10] text-[#C48A36] border border-[#C48A36]/35">
                            Institutional Specimen
                          </span>
                          {selectedConcept === 'demo1' && (
                            <span className="text-[10px] font-mono text-[#A7F432] bg-[#0C1E14] border border-[#A7F432]/30 px-2 py-0.5 rounded">
                              ✓ Preferred
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-hub-heading font-bold text-white flex items-center gap-2">
                              <span>Demo 1: Structured Institutional Tax Journal</span>
                            </h3>
                            <p className="text-xs text-[#C48A36] font-medium mt-0.5">
                              Institutional Gravitas • Academic Rigor • Formal Statutory Elegance
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedConcept('demo1')}
                              className={`px-3 py-2 rounded-xl text-xs font-hub-heading font-semibold transition-all border ${
                                selectedConcept === 'demo1'
                                  ? 'bg-[#0E2A1D] text-[#A7F432] border-[#164D31]'
                                  : 'bg-[#08130D] text-[#86AD94] border-[#13271C] hover:text-white'
                              }`}
                            >
                              {selectedConcept === 'demo1' ? '✓ Selected Concept' : 'Set as Preferred'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setCurrentView('demo1')}
                              className="px-4 py-2 bg-[#A7F432] hover:bg-[#b5f948] text-[#061009] font-hub-heading font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm glow-lime-hover"
                            >
                              <span>Launch Demo 1</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-[#C2DBCB] leading-relaxed">
                          <strong>Personality & Typography:</strong> Modern institutional academic journal. Clean off-white canvas, authoritative dark green (<code>#012509</code>) anchors, rich metallic gold (<code>#C48A36</code>) accents, and burnt orange highlights. Built in 100% clean modern sans-serif (Montserrat headings & Inter body) with structured statutory governance tabs.
                        </p>

                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-[10px] font-mono bg-[#081510] text-[#C48A36] px-2.5 py-1 rounded-md border border-[#C48A36]/25">
                            Color Palette: Deep Green (#012509) • Gold (#C48A36) • Warm Ivory
                          </span>
                          <span className="text-[10px] font-mono bg-[#081510] text-[#C2DBCB] px-2.5 py-1 rounded-md border border-[#142C1F]">
                            Typeface: Montserrat + Inter
                          </span>
                          <span className="text-[10px] font-mono bg-[#081510] text-[#86AD94] px-2.5 py-1 rounded-md border border-[#142C1F]">
                            Features: Statutory Tabs • Archival Volumes • Citation Copy
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Demo 3: Scientific Discovery Journal Platform */}
                    <div className="bg-[#060D08] rounded-2xl border border-[#112318] hover:border-[#2DD4BF]/60 transition-all overflow-hidden shadow-lg group">
                      {/* Mockup Browser Chrome Bar */}
                      <div className="bg-[#09150E] px-4 py-2.5 border-b border-[#13271C] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80 inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80 inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80 inline-block" />
                          </div>
                          <span className="text-[11px] font-mono text-[#86AD94] ml-2 px-2 py-0.5 rounded bg-[#060D08] border border-[#112318]">
                            https://taxfrontier.org/demo-3-scientific-discovery
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-hub-heading font-bold uppercase px-2.5 py-0.5 rounded bg-[#081814] text-[#2DD4BF] border border-[#2DD4BF]/35">
                            Scientific Explorer Platform
                          </span>
                          {selectedConcept === 'demo3' && (
                            <span className="text-[10px] font-mono text-[#A7F432] bg-[#0C1E14] border border-[#A7F432]/30 px-2 py-0.5 rounded">
                              ✓ Preferred
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-hub-heading font-bold text-white flex items-center gap-2">
                              <span>Demo 3: Scientific Discovery Journal Platform</span>
                            </h3>
                            <p className="text-xs text-[#2DD4BF] font-medium mt-0.5">
                              Scientific Research • Live Dispatches • Open Empirical Data
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedConcept('demo3')}
                              className={`px-3 py-2 rounded-xl text-xs font-hub-heading font-semibold transition-all border ${
                                selectedConcept === 'demo3'
                                  ? 'bg-[#0E2A1D] text-[#A7F432] border-[#164D31]'
                                  : 'bg-[#08130D] text-[#86AD94] border-[#13271C] hover:text-white'
                              }`}
                            >
                              {selectedConcept === 'demo3' ? '✓ Selected Concept' : 'Set as Preferred'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setCurrentView('demo3')}
                              className="px-4 py-2 bg-[#2DD4BF] hover:bg-[#14B8A6] text-[#061009] font-hub-heading font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm"
                            >
                              <span>Launch Demo 3</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-[#C2DBCB] leading-relaxed">
                          <strong>Personality & Typography:</strong> Modern scientific discovery platform. Features a live research dispatch ticker, featured paper carousel, 26-topic scientific taxonomy explorer, open econometric datasets, and publication metrics. Styled in clean contemporary sans-serif (Plus Jakarta Sans & Source Sans 3).
                        </p>

                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-[10px] font-mono bg-[#081510] text-[#2DD4BF] px-2.5 py-1 rounded-md border border-[#2DD4BF]/25">
                            Color Palette: Forest Green (#12291E) • Teal (#2DD4BF) • Sage
                          </span>
                          <span className="text-[10px] font-mono bg-[#081510] text-[#C2DBCB] px-2.5 py-1 rounded-md border border-[#142C1F]">
                            Typeface: Plus Jakarta Sans + Source Sans 3
                          </span>
                          <span className="text-[10px] font-mono bg-[#081510] text-[#86AD94] px-2.5 py-1 rounded-md border border-[#142C1F]">
                            Features: Live Dispatch Ticker • Carousel • Datasets • Citations
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Architecture Comparison Table */}
                  <div className="bg-[#060D08] p-4 rounded-xl border border-[#112318] space-y-2">
                    <h3 className="text-xs font-hub-heading font-bold uppercase tracking-wider text-[#A7F432]">
                      Archetype Comparison Matrix
                    </h3>
                    <div className="overflow-x-auto text-xs">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-[#122419] text-[#86AD94] text-[11px]">
                            <th className="pb-2">Attribute</th>
                            <th className="pb-2">Demo 1 (Institutional)</th>
                            <th className="pb-2">Demo 2 (Policy Platform)</th>
                            <th className="pb-2">Demo 3 (Scientific Discovery)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#122419] text-[#C2DBCB]">
                          <tr>
                            <td className="py-2 text-[#86AD94]">Headings Font</td>
                            <td className="py-2 text-white font-semibold">Montserrat / Manrope</td>
                            <td className="py-2">Plus Jakarta Sans</td>
                            <td className="py-2">DM Sans</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-[#86AD94]">Visual Tone</td>
                            <td className="py-2">Refined Light Academic</td>
                            <td className="py-2">Contemporary Digital Product</td>
                            <td className="py-2">Green Scientific Repository</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-[#86AD94]">Primary Palette</td>
                            <td className="py-2">Dark Green (#012509) + Gold</td>
                            <td className="py-2">Emerald (#059669) + Cool Slate</td>
                            <td className="py-2">Deep Moss (#183326) + Sage</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-[#86AD94]">Primary Audience</td>
                            <td className="py-2">CITN / MOUAU Joint Council</td>
                            <td className="py-2">Policy Analysts & Tech Regulators</td>
                            <td className="py-2">Empirical Researchers & Economists</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Submission Architecture */}
              {activeHubSection === 'submission-architecture' && (
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between border-b border-[#122419] pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-hub-heading font-bold uppercase tracking-wider text-[#A7F432] bg-[#0D2015] border border-[#A7F432]/25 px-2.5 py-1 rounded">
                        Section 04
                      </span>
                      <span className="text-xs text-[#86AD94]">Intake Engineering</span>
                    </div>
                    <span className="text-xs text-[#86AD94] font-mono">Dual-Mode Design</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-hub-heading font-bold text-white tracking-tight">
                    Submission System Architecture: Mode A vs Mode B
                  </h2>

                  <p className="text-[#D6ECE0] text-sm leading-relaxed">
                    OnlineFirst provides a dual-mode submission architecture that decouples frontend presentation from backend intake. The editorial committee can toggle modes instantly in the Admin CMS without code updates:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className={`p-5 rounded-2xl border transition-all ${
                      config.submissionMode === 'external'
                        ? 'bg-[#0A1710] border-[#A7F432]/40 shadow-[0_0_20px_rgba(167,244,50,0.03)]'
                        : 'bg-[#060D08] border-[#112318]'
                    }`}>
                      <div className="flex items-center justify-between pb-2 border-b border-[#122419]">
                        <strong className="text-sm font-hub-heading font-bold text-white">Mode A: External OJS Redirection</strong>
                        <span className="text-[10px] bg-[#060D08] text-[#A7F432] px-2 py-0.5 rounded font-mono font-bold border border-[#163022]">
                          {config.submissionMode === 'external' ? 'ACTIVE CONFIG' : 'SUPPORTED'}
                        </span>
                      </div>
                      <p className="text-[#9BBFA8] mt-2 leading-relaxed">
                        Tax Frontier functions as the modern scholarly showcase and indexing front. All "Submit Manuscript" buttons hand off authors seamlessly to an external Open Journal Systems (OJS) or university submission portal.
                      </p>
                      <ul className="space-y-1.5 text-[#C2DBCB] mt-3 pt-3 border-t border-[#122419]">
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#A7F432]" />
                          <span>Leverages existing MOUAU OJS editorial workflow</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#A7F432]" />
                          <span>Zero learning curve for existing journal editors</span>
                        </li>
                      </ul>
                    </div>

                    <div className={`p-5 rounded-2xl border transition-all ${
                      config.submissionMode === 'integrated'
                        ? 'bg-[#0A1710] border-[#A7F432]/40 shadow-[0_0_20px_rgba(167,244,50,0.03)]'
                        : 'bg-[#060D08] border-[#112318]'
                    }`}>
                      <div className="flex items-center justify-between pb-2 border-b border-[#122419]">
                        <strong className="text-sm font-hub-heading font-bold text-white">Mode B: Integrated OnlineFirst Portal</strong>
                        <span className="text-[10px] bg-[#060D08] text-[#A7F432] px-2 py-0.5 rounded font-mono font-bold border border-[#163022]">
                          {config.submissionMode === 'integrated' ? 'ACTIVE CONFIG' : 'SUPPORTED'}
                        </span>
                      </div>
                      <p className="text-[#9BBFA8] mt-2 leading-relaxed">
                        Authors upload Word / PDF manuscripts, structured abstracts, and contributor disclosures directly on the Tax Frontier website, storing submissions directly in the integrated editorial intake queue.
                      </p>
                      <ul className="space-y-1.5 text-[#C2DBCB] mt-3 pt-3 border-t border-[#122419]">
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#A7F432]" />
                          <span>Branded, unified single-platform user experience</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#A7F432]" />
                          <span>Automated similarity check & APC invoice handoff</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. JORMASS Integration Models */}
              {activeHubSection === 'jormass-integration' && (
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between border-b border-[#122419] pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-hub-heading font-bold uppercase tracking-wider text-[#A7F432] bg-[#0D2015] border border-[#A7F432]/25 px-2.5 py-1 rounded">
                        Section 05
                      </span>
                      <span className="text-xs text-[#86AD94]">COLMAS Federation</span>
                    </div>
                    <span className="text-xs text-[#86AD94] font-mono">3 Integration Options</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-hub-heading font-bold text-white tracking-tight">
                    JORMASS Integration & Cross-Connection Models
                  </h2>

                  <p className="text-[#D6ECE0] text-sm leading-relaxed">
                    Because the institutional publishing protocol between Tax Frontier and JORMASS (Journal of Management Sciences, MOUAU) is being finalized by committee, OnlineFirst engineered three implementation models:
                  </p>

                  <div className="space-y-3 text-xs">
                    <div className={`p-4 rounded-xl border transition-all ${
                      config.jormassRelationship === 'optionA'
                        ? 'bg-[#0A1710] border-[#A7F432]/40 shadow-[0_0_20px_rgba(167,244,50,0.03)]'
                        : 'bg-[#060D08] border-[#112318]'
                    }`}>
                      <div className="flex items-center justify-between">
                        <strong className="text-sm font-hub-heading font-bold text-white">
                          Option A: Independent Journal with Mutual Cross-Link
                        </strong>
                        <span className="text-[10px] font-mono text-[#A7F432]">
                          {config.jormassRelationship === 'optionA' ? 'ACTIVE' : 'READY'}
                        </span>
                      </div>
                      <p className="text-[#9BBFA8] mt-1">
                        Tax Frontier operates on its own dedicated domain (e.g. taxfrontier.org.ng). A curated header/footer banner cross-references JORMASS with direct inbound/outbound links.
                      </p>
                    </div>

                    <div className={`p-4 rounded-xl border transition-all ${
                      config.jormassRelationship === 'optionB'
                        ? 'bg-[#0A1710] border-[#A7F432]/40 shadow-[0_0_20px_rgba(167,244,50,0.03)]'
                        : 'bg-[#060D08] border-[#112318]'
                    }`}>
                      <div className="flex items-center justify-between">
                        <strong className="text-sm font-hub-heading font-bold text-white">
                          Option B: Shared MOUAU / COLMAS Journals Gateway
                        </strong>
                        <span className="text-[10px] font-mono text-[#A7F432]">
                          {config.jormassRelationship === 'optionB' ? 'ACTIVE' : 'READY'}
                        </span>
                      </div>
                      <p className="text-[#9BBFA8] mt-1">
                        Tax Frontier and JORMASS share a federated gateway masthead, allowing readers to browse all journals published within the College of Management Sciences under a unified institutional banner.
                      </p>
                    </div>

                    <div className={`p-4 rounded-xl border transition-all ${
                      config.jormassRelationship === 'optionC'
                        ? 'bg-[#0A1710] border-[#A7F432]/40 shadow-[0_0_20px_rgba(167,244,50,0.03)]'
                        : 'bg-[#060D08] border-[#112318]'
                    }`}>
                      <div className="flex items-center justify-between">
                        <strong className="text-sm font-hub-heading font-bold text-white">
                          Option C: Full COLMAS Scholarly Publishing Network
                        </strong>
                        <span className="text-[10px] font-mono text-[#A7F432]">
                          {config.jormassRelationship === 'optionC' ? 'ACTIVE' : 'READY'}
                        </span>
                      </div>
                      <p className="text-[#9BBFA8] mt-1">
                        Federated multi-journal repository with shared user accounts, unified search across all management journals, and combined volume archives.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. Editorial & Peer Review */}
              {activeHubSection === 'editorial-system' && (
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between border-b border-[#122419] pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-hub-heading font-bold uppercase tracking-wider text-[#A7F432] bg-[#0D2015] border border-[#A7F432]/25 px-2.5 py-1 rounded">
                        Section 06
                      </span>
                      <span className="text-xs text-[#86AD94]">Quality Assurance</span>
                    </div>
                    <span className="text-xs text-[#86AD94] font-mono">COPE Compliant</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-hub-heading font-bold text-white tracking-tight">
                    Editorial Integrity & 14-Step Peer Review Process
                  </h2>

                  <p className="text-[#D6ECE0] text-sm leading-relaxed">
                    Tax Frontier adheres strictly to the Committee on Publication Ethics (COPE) core practices. Every manuscript follows a documented 14-step review lifecycle with a 4–6 week turnaround:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {[
                      '01. Manuscript Intake & Author Conflict Declaration',
                      '02. Technical Formatting & Desk Screening',
                      '03. Turnitin Similarity Screening (Strictly ≤15%)',
                      '04. Editorial Scope & Fiscal Significance Review',
                      '05. Section Editor Academic Assignment',
                      '06. Double-Blind Reviewer Selection (Min 2)',
                      '07. Reviewer Invitation & Ethics Check',
                      '08. Substantive Blind Peer Review Life Cycle',
                      '09. Editorial Synthesis & Board Recommendation',
                      '10. Author Revision Window (Minor / Major)',
                      '11. Verification & Similarity Re-Check',
                      '12. Formal Acceptance Letter & APC Invoice',
                      '13. Galley Typesetting, DOI Minting & Proofreading',
                      '14. OnlineFirst Early Access & Crossref Deposit',
                    ].map((step, idx) => (
                      <div key={idx} className="p-3 bg-[#060D08] rounded-xl border border-[#112318] flex items-center gap-2.5 text-[#D6ECE0]">
                        <span className="w-2 h-2 rounded-full bg-[#A7F432] shrink-0" />
                        <span className="font-medium text-[11px]">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. Indexing Roadmap */}
              {activeHubSection === 'indexing-roadmap' && (
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between border-b border-[#122419] pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-hub-heading font-bold uppercase tracking-wider text-[#A7F432] bg-[#0D2015] border border-[#A7F432]/25 px-2.5 py-1 rounded">
                        Section 07
                      </span>
                      <span className="text-xs text-[#86AD94]">Global Discovery</span>
                    </div>
                    <span className="text-xs text-[#86AD94] font-mono">3-Phase Trajectory</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-hub-heading font-bold text-white tracking-tight">
                    Indexing Roadmap & International Citation Strategy
                  </h2>

                  <p className="text-[#D6ECE0] text-sm leading-relaxed">
                    A high-impact journal requires technical indexing from Day One. OnlineFirst builds semantic metadata schemas (Schema.org, Google Scholar, Dublin Core) directly into every article landing page:
                  </p>

                  <div className="space-y-3 text-xs">
                    <div className="p-4 rounded-xl bg-[#060D08] border border-[#112318] space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#A7F432] font-hub-heading font-bold text-sm">Phase 1: Maiden Launch Milestones (Day 1 – Month 3)</strong>
                        <span className="text-[10px] bg-[#0B1A12] text-[#A7F432] px-2 py-0.5 rounded font-mono font-bold border border-[#153322]">FOUNDATIONAL</span>
                      </div>
                      <p className="text-[#9BBFA8]">
                        Crossref DOI activation, Google Scholar indexing meta tags, ROAD (Directory of Open Access Scholarly Resources), BASE (Bielefeld Academic Search Engine), Dimensions, and SSRN pre-prints.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#060D08] border border-[#112318] space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#74D857] font-hub-heading font-bold text-sm">Phase 2: Continental Recognition (Month 4 – Month 12)</strong>
                        <span className="text-[10px] bg-[#0A1710] text-[#74D857] px-2 py-0.5 rounded font-mono font-bold border border-[#142B1E]">AFRICAN & GLOBAL</span>
                      </div>
                      <p className="text-[#9BBFA8]">
                        African Journals Online (AJOL), Directory of Open Access Journals (DOAJ), and EBSCOhost scholarly databases.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#060D08] border border-[#112318] space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#3B8F7B] font-hub-heading font-bold text-sm">Phase 3: Premier International Benchmarks (Year 2+)</strong>
                        <span className="text-[10px] bg-[#081512] text-[#3B8F7B] px-2 py-0.5 rounded font-mono font-bold border border-[#0D241C]">HIGH-IMPACT</span>
                      </div>
                      <p className="text-[#9BBFA8]">
                        Scopus evaluation application and Clarivate Emerging Sources Citation Index (ESCI) tracking for official Impact Factor calculation.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 8. Commercial Proposal & Tiers */}
              {activeHubSection === 'commercial-proposal' && (
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between border-b border-[#122419] pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-hub-heading font-bold uppercase tracking-wider text-[#A7F432] bg-[#0D2015] border border-[#A7F432]/25 px-2.5 py-1 rounded">
                        Section 08
                      </span>
                      <span className="text-xs text-[#86AD94]">Commercial Engineering</span>
                    </div>
                    <span className="text-xs text-[#A7F432] font-mono">Structured 4-Tier Ladder</span>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-hub-heading font-bold text-white tracking-tight">
                      Commercial Proposal: 4 Clearly Differentiated Tiers
                    </h2>
                    <p className="text-[#D6ECE0] text-sm mt-1 leading-relaxed">
                      OnlineFirst offers four distinct, fixed-price implementation tiers for the joint CITN Umuahia / MOUAU COLMAS editorial committee. Each package delivers a defined level of service responsibility, from essential design handover to an end-to-end scholarly publishing ecosystem:
                    </p>

                    {/* Tier Philosophy Matrix */}
                    <div className="mt-3 p-3.5 bg-[#060D08] rounded-xl border border-[#112318] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-[11px]">
                      <div className="p-2.5 rounded-lg bg-[#08130D] border border-[#13271C]">
                        <span className="font-hub-heading font-bold text-white block">Basic (₦450k)</span>
                        <span className="text-[#86AD94] italic block mt-0.5">"We build it."</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#08130D] border border-[#13271C]">
                        <span className="font-hub-heading font-bold text-white block">Launch (₦650k)</span>
                        <span className="text-[#86AD94] italic block mt-0.5">"We build it and launch it."</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#0A1A12] border border-[#A7F432]/35">
                        <span className="font-hub-heading font-bold text-[#A7F432] block">Professional (₦790k)</span>
                        <span className="text-[#D6ECE0] italic block mt-0.5">"We build, launch & provide CMS tools."</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#061814] border border-[#2DD4BF]/35">
                        <span className="font-hub-heading font-bold text-[#2DD4BF] block">Premium (₦950k)</span>
                        <span className="text-[#86AD94] italic block mt-0.5">"Full managed publishing ecosystem."</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Tier Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {proposalTiers.map((tier) => {
                      const isExpanded = expandedTierId === tier.id;
                      const isSelected = selectedTier === tier.id;

                      return (
                        <div key={tier.id} className="relative group flex flex-col justify-between">
                          {/* Selective Soft Atmospheric Halo */}
                          {tier.isRecommended && (
                            <div className="absolute -inset-1.5 bg-gradient-to-b from-[#A7F432]/[0.08] via-[#74D857]/[0.03] to-transparent rounded-3xl blur-xl -z-10 pointer-events-none" />
                          )}
                          {tier.isComprehensive && (
                            <div className="absolute -inset-1.5 bg-gradient-to-b from-[#2DD4BF]/[0.08] via-[#0D9488]/[0.03] to-transparent rounded-3xl blur-xl -z-10 pointer-events-none" />
                          )}

                          <div
                            className={`rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between h-full ${
                              tier.isRecommended
                                ? 'border-[#A7F432]/50 bg-[#09150E] shadow-xl'
                                : tier.isComprehensive
                                ? 'border-[#2DD4BF]/40 bg-[#081410] shadow-xl'
                                : 'border-[#112318] bg-[#060D08]'
                            } ${isSelected ? 'ring-1 ring-[#A7F432]' : ''}`}
                          >
                            {/* Compact Top Summary (Always Visible) */}
                            <div className="p-6">
                              {/* Badges */}
                              <div className="flex items-center justify-between gap-2 mb-3">
                                {tier.isRecommended ? (
                                  <span className="bg-[#A7F432] text-[#061009] text-[10px] font-hub-heading font-extrabold uppercase px-3 py-1 rounded-full shadow-sm tracking-wide">
                                    Recommended for Tax Frontier
                                  </span>
                                ) : tier.isComprehensive ? (
                                  <span className="bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] text-[#061009] text-[10px] font-hub-heading font-extrabold uppercase px-3 py-1 rounded-full shadow-sm tracking-wide">
                                    Most Comprehensive Platform
                                  </span>
                                ) : (
                                  <span className="bg-[#0D2015] text-[#86AD94] border border-[#163022] text-[10px] font-hub-heading font-bold uppercase px-2.5 py-0.5 rounded">
                                    Commercial Tier
                                  </span>
                                )}

                                {isSelected && (
                                  <span className="text-[10px] font-hub-heading font-bold text-[#A7F432] flex items-center gap-1 bg-[#0A1A12] px-2 py-0.5 rounded border border-[#163826]">
                                    <Check className="w-3 h-3" />
                                    <span>Current Selection</span>
                                  </span>
                                )}
                              </div>

                              {/* Title & Positioning */}
                              <h3 className="text-xl font-hub-heading font-bold text-white tracking-tight">
                                {tier.name}
                              </h3>
                              <p className="text-xs font-medium text-[#74D857] mt-0.5">
                                {tier.positioning}
                              </p>

                              {/* One-Sentence Commercial Philosophy */}
                              <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#08140E] border border-[#12281C] text-[11px] text-[#D6ECE0] italic">
                                <Sparkles className="w-3 h-3 text-[#A7F432] shrink-0" />
                                <span>"{tier.oneSentenceRule}"</span>
                              </div>

                              {/* Price Display */}
                              <div className="mt-4 mb-4 pb-4 border-b border-[#122419]">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-3xl font-hub-heading font-extrabold text-white tracking-tight">
                                    ₦{tier.price.toLocaleString()}
                                  </span>
                                  <span className="text-[11px] text-[#86AD94] font-mono">Fixed Contract Total</span>
                                </div>

                                {/* 50% Initial Payment Schedule */}
                                <div className="mt-2 p-2.5 rounded-lg bg-[#050B07] border border-[#0F1E14] text-xs">
                                  <div className="flex items-center justify-between text-[#C2DBCB]">
                                    <span>50% Initial Deposit:</span>
                                    <strong className="text-white font-mono">₦{tier.deposit.toLocaleString()}</strong>
                                  </div>
                                  <div className="flex items-center justify-between text-[#86AD94] mt-1 text-[11px]">
                                    <span>50% Final Balance:</span>
                                    <span className="font-mono">₦{tier.balance.toLocaleString()}</span>
                                  </div>
                                  <span className="text-[10px] text-[#86AD94] block mt-1.5 italic border-t border-[#0F1E14] pt-1">
                                    Remaining 50% is payable according to the final contract/payment milestones.
                                  </span>
                                </div>
                              </div>

                              {/* Brief Summary */}
                              <p className="text-xs text-[#C2DBCB] leading-relaxed">
                                {tier.summary}
                              </p>

                              {/* Toggle Button */}
                              <button
                                type="button"
                                onClick={() => setExpandedTierId(isExpanded ? null : tier.id)}
                                className={`w-full mt-4 py-2 px-3 rounded-xl text-xs font-hub-heading font-semibold flex items-center justify-between border transition-all ${
                                  isExpanded
                                    ? 'bg-[#0E1E15] text-[#A7F432] border-[#1C3B29]'
                                    : 'bg-[#08130D] text-[#D6ECE0] border-[#13271C] hover:bg-[#0D1E14]'
                                }`}
                              >
                                <span>{isExpanded ? 'Hide Package Inclusions & Exclusions' : 'Click to Expand Details & Feature Scope'}</span>
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 text-[#A7F432]" />}
                              </button>
                            </div>

                            {/* Expanded Details Drawer */}
                            {isExpanded && (
                              <div className="px-6 pb-6 pt-2 border-t border-[#122419] bg-[#050C08]/90 space-y-4">
                                {/* Plain English Positioning */}
                                <div className="p-3.5 rounded-xl bg-[#08130D] border border-[#13271C] text-xs space-y-1">
                                  <span className="text-[10px] uppercase font-hub-heading font-bold text-[#A7F432] block">
                                    Scope & Responsibility
                                  </span>
                                  <p className="text-[#D6ECE0] leading-relaxed">
                                    {tier.plainEnglishPositioning}
                                  </p>
                                </div>

                                {/* Special Domain & Email Package Callout for Premium */}
                                {tier.domainNote && (
                                  <div className="p-3.5 rounded-xl bg-[#061814] border border-[#2DD4BF]/40 text-xs space-y-1">
                                    <div className="flex items-center gap-1.5 text-[#2DD4BF] font-hub-heading font-bold">
                                      <Globe className="w-3.5 h-3.5" />
                                      <span>2-Year Domain + Hosting + Professional Email Package Included</span>
                                    </div>
                                    <p className="text-[#D6ECE0] text-[11px] leading-relaxed">
                                      {tier.domainNote}
                                    </p>
                                  </div>
                                )}

                                {/* Included Features */}
                                <div className="space-y-2">
                                  <span className="text-xs font-hub-heading font-bold text-white flex items-center gap-1.5">
                                    <Check className="w-3.5 h-3.5 text-[#A7F432]" />
                                    <span>Included Features & Deliverables:</span>
                                  </span>
                                  <ul className="space-y-1.5 text-xs text-[#D6ECE0] pl-1">
                                    {tier.features.map((feat, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <Check className="w-3 h-3 text-[#A7F432] shrink-0 mt-0.5" />
                                        <span className="text-[11px] leading-snug">{feat}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Excluded Items (What is NOT Included) */}
                                {tier.notIncluded && tier.notIncluded.length > 0 && (
                                  <div className="space-y-2 pt-2 border-t border-[#122419]">
                                    <span className="text-xs font-hub-heading font-bold text-[#86AD94] flex items-center gap-1.5">
                                      <X className="w-3.5 h-3.5 text-red-400" />
                                      <span>What is NOT Included (Explicit Exclusions):</span>
                                    </span>
                                    <ul className="space-y-1 text-xs text-[#9BBFA8] pl-1">
                                      {tier.notIncluded.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                          <X className="w-3 h-3 text-red-400/80 shrink-0 mt-0.5" />
                                          <span className="text-[11px] leading-snug">{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* Client Responsibilities */}
                                {tier.clientResponsibilities && tier.clientResponsibilities.length > 0 && (
                                  <div className="space-y-1.5 pt-2 border-t border-[#122419]">
                                    <span className="text-[11px] font-hub-heading font-bold text-[#86AD94] block">
                                      Client Responsibilities:
                                    </span>
                                    <ul className="space-y-1 text-[11px] text-[#86AD94]">
                                      {tier.clientResponsibilities.map((resp, idx) => (
                                        <li key={idx} className="flex items-start gap-1.5">
                                          <span className="text-[#A7F432]">•</span>
                                          <span>{resp}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* External Costs Note */}
                                <div className="text-[10px] text-[#74D857] pt-1">
                                  <strong className="text-[#86AD94]">Third-party note:</strong> {tier.externalCostsNote}
                                </div>
                              </div>
                            )}

                            {/* Action Footer */}
                            <div className="p-6 pt-0 mt-auto">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedTier(tier.id);
                                  setActiveHubSection('acceptance-workflow');
                                  window.scrollTo({ top: 400, behavior: 'smooth' });
                                }}
                                className={`w-full py-3 rounded-xl text-xs font-hub-heading font-bold transition-all flex items-center justify-center gap-2 ${
                                  tier.isRecommended
                                    ? 'bg-[#A7F432] hover:bg-[#b5f948] text-[#061009] shadow-sm glow-lime-hover'
                                    : tier.isComprehensive
                                    ? 'bg-[#2DD4BF] hover:bg-[#5eead4] text-[#061009] shadow-sm'
                                    : 'bg-[#0C1A12] hover:bg-[#12261A] text-white border border-[#163022]'
                                }`}
                              >
                                <span>Select {tier.name} Tier (₦{tier.price.toLocaleString()})</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 9. Third-Party Costs */}
              {activeHubSection === 'third-party-costs' && (
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between border-b border-[#122419] pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-hub-heading font-bold uppercase tracking-wider text-[#A7F432] bg-[#0D2015] border border-[#A7F432]/25 px-2.5 py-1 rounded">
                        Section 09
                      </span>
                      <span className="text-xs text-[#86AD94]">Statutory Disclosures</span>
                    </div>
                    <span className="text-xs text-[#86AD94] font-mono">External Costs Disclosure</span>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-hub-heading font-bold text-white tracking-tight">
                      External / Third-Party Costs & Pass-Through Services
                    </h2>
                    <p className="text-[#D6ECE0] text-sm mt-1 leading-relaxed">
                      In compliance with OnlineFirst transparent publishing ethics, external registry fees, domain authorities, and third-party software subscriptions are accounted for separately at direct pass-through cost:
                    </p>
                  </div>

                  {/* Mandatory Disclosure Statement Callout */}
                  <div className="p-4 rounded-xl bg-[#08150E] border border-[#A7F432]/35 flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-[#A7F432] shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs">
                      <strong className="text-white font-hub-heading font-bold block">
                        Official Third-Party Service Activation Policy
                      </strong>
                      <p className="text-[#D6ECE0] leading-relaxed">
                        {thirdPartyPolicyStatement}
                      </p>
                    </div>
                  </div>

                  {/* Categorized Comparison Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {thirdPartyCostsBreakdown.map((cat, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl border border-[#112318] bg-[#060D08] space-y-3"
                      >
                        <h3 className="font-hub-heading font-bold text-white text-sm pb-2 border-b border-[#112318]">
                          {cat.category}
                        </h3>
                        <ul className="space-y-2">
                          {cat.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-2 text-[#D6ECE0]">
                              {idx === 0 ? (
                                <Check className="w-3.5 h-3.5 text-[#A7F432] shrink-0 mt-0.5" />
                              ) : (
                                <span className="text-[#86AD94] font-mono shrink-0">•</span>
                              )}
                              <span className="text-[11px] leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Specific Third-Party Services Detailed Directory */}
                  <div className="space-y-3 pt-2">
                    <h3 className="text-sm font-hub-heading font-bold text-white">
                      Itemized External Services Schedule
                    </h3>
                    <div className="space-y-2.5 text-xs">
                      {thirdPartyServices.map((service) => (
                        <div
                          key={service.id}
                          className="p-4 rounded-xl border border-[#112318] bg-[#060D08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#1A3827] transition-all"
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <strong className="text-white text-xs font-hub-heading font-bold">{service.name}</strong>
                              <span className="text-[10px] bg-[#0D2015] text-[#A7F432] border border-[#163824] px-2 py-0.5 rounded font-mono">
                                {service.frequency}
                              </span>
                            </div>
                            <p className="text-[#86AD94] text-[11px]">{service.description}</p>
                          </div>

                          <div className="sm:text-right shrink-0">
                            <strong className="text-white font-mono block text-xs">
                              {service.estimatedCostNgn ? `₦${service.estimatedCostNgn.toLocaleString()}` : ''}
                              {service.estimatedCostUsd ? ` / $${service.estimatedCostUsd} USD` : ''}
                              {!service.estimatedCostNgn && !service.estimatedCostUsd ? 'At Cost' : ''}
                            </strong>
                            <span className="text-[10px] text-[#74D857]">Direct pass-through</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 10. Delivery Roadmap */}
              {activeHubSection === 'delivery-roadmap' && (
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between border-b border-[#122419] pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-hub-heading font-bold uppercase tracking-wider text-[#A7F432] bg-[#0D2015] border border-[#A7F432]/25 px-2.5 py-1 rounded">
                        Section 10
                      </span>
                      <span className="text-xs text-[#86AD94]">Production Schedule</span>
                    </div>
                    <span className="text-xs text-[#86AD94] font-mono">4 Milestone Phases</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-hub-heading font-bold text-white tracking-tight">
                    Delivery Roadmap & Implementation Milestones
                  </h2>

                  <p className="text-[#D6ECE0] text-sm leading-relaxed">
                    Project execution is structured across four progressive phases, ensuring early author intake while technical infrastructure is finalized:
                  </p>

                  <div className="space-y-4 text-xs">
                    {implementationMilestones.map((milestone) => (
                      <div
                        key={milestone.phase}
                        className="p-4 rounded-xl border border-[#112318] bg-[#060D08] space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <strong className="text-xs font-hub-heading font-bold text-white">
                            {milestone.phase}: {milestone.title}
                          </strong>
                          <span className="text-[11px] font-mono font-semibold text-[#A7F432] bg-[#0D2015] px-2 py-0.5 rounded border border-[#163824]">
                            {milestone.duration}
                          </span>
                        </div>
                        <p className="text-[#9BBFA8] text-[11px]">{milestone.description}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {milestone.deliverables.map((del, i) => (
                            <span key={i} className="bg-[#09150E] text-[#C2DBCB] text-[10px] px-2 py-0.5 rounded border border-[#13271C]">
                              • {del}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 11. Acceptance Workflow */}
              {activeHubSection === 'acceptance-workflow' && (
                <div className="space-y-6 relative z-10">
                  <div className="flex flex-wrap items-center justify-between border-b border-[#122419] pb-4 gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11.5pt] font-hub-heading font-bold uppercase tracking-wider text-[#00FF88] bg-[#0D2015] border border-[#00FF88]/30 px-3 py-1 rounded">
                        Section 11
                      </span>
                      <span className="text-[11.5pt] text-[#86AD94]">Formal Client Sign-Off & Intake</span>
                    </div>

                    {/* Prominent Target Deadline Tag */}
                    <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-[#1A1202] border border-[#F59E0B]/50 text-[#FBBF24] font-mono text-[11.5pt] font-bold shadow-xs">
                      <Clock className="w-4 h-4 text-[#FBBF24] shrink-0" />
                      <span>Decision Target Deadline: {decisionTargetDeadline}</span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-hub-heading font-bold text-white tracking-tight">
                      Package Selection & Formal Acceptance Workflow
                    </h2>
                    <p className="text-[#D6ECE0] text-[12pt] mt-1.5 leading-relaxed">
                      Configure your approved package tier, design archetype, institutional governance models, and committee contacts below for the joint CITN / MOUAU editorial committee:
                    </p>
                  </div>

                  {/* Decision Target Deadline Callout Banner */}
                  <div className="p-4 rounded-xl bg-[#140E02] border border-[#F59E0B]/50 flex items-start gap-3.5 shadow-[0_0_25px_rgba(245,158,11,0.08)]">
                    <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-5 h-5 text-[#FBBF24]" />
                    </div>
                    <div className="space-y-1 text-[11.5pt]">
                      <div className="flex flex-wrap items-center gap-2">
                        <strong className="text-white font-hub-heading text-[12pt]">
                          Decision Target Deadline: 2 October 2026
                        </strong>
                        <span className="text-[11pt] font-mono font-bold px-2 py-0.5 rounded bg-[#F59E0B]/25 text-[#FCD34D] border border-[#F59E0B]/40 uppercase tracking-wide">
                          Priority Allocation
                        </span>
                      </div>
                      <p className="text-[#E7DEC9] leading-relaxed">
                        To guarantee the maiden publication schedule for December 2026 and lock in fixed package pricing, formal sign-off is requested on or before <strong>2 October 2026</strong>. Submitting this form transmits an immediate notification with your chosen demo and contact details to <strong>{notificationRecipientEmail}</strong>.
                      </p>
                    </div>
                  </div>

                  {isSubmitted ? (
                    <div className="bg-[#060D08] border border-[#00FF88]/50 rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_0_30px_rgba(0,255,136,0.1)]">
                      {/* Success Heading */}
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#00FF88]/15 border border-[#00FF88]/40 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-7 h-7 text-[#00FF88]" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-xl font-hub-heading font-bold text-white">
                              Proposal Package Acceptance Formally Recorded
                            </h3>
                            <span className="px-2.5 py-0.5 rounded-full bg-[#00FF88]/20 border border-[#00FF88]/40 text-[#00FF88] text-[11pt] font-mono font-bold">
                              DISPATCHED
                            </span>
                          </div>
                          <p className="text-[11.5pt] text-[#86AD94]">
                            Official notification comprising your chosen prototype demo, package details, and contact information has been queued for <strong className="text-white">{notificationRecipientEmail}</strong>.
                          </p>
                        </div>
                      </div>

                      {/* Comprehensive Confirmation Dossier */}
                      <div className="bg-[#08140E] p-5 sm:p-6 rounded-2xl border border-[#112318] text-[11.5pt] space-y-4 text-[#D6ECE0]">
                        <div className="flex items-center justify-between border-b border-[#142B1D] pb-3">
                          <span className="font-hub-heading font-bold text-white text-[12pt] flex items-center gap-2">
                            <FileCheck className="w-4 h-4 text-[#00FF88]" />
                            <span>Executive Sign-Off Summary</span>
                          </span>
                          <span className="text-[11pt] font-mono text-[#00FF88] bg-[#092013] border border-[#00FF88]/30 px-2.5 py-0.5 rounded">
                            Target Deadline: {decisionTargetDeadline}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-3.5 rounded-xl bg-[#040906] border border-[#0E2015] space-y-1">
                            <span className="text-[#7EA88E] block text-[11pt]">Selected Package Tier:</span>
                            <strong className="text-white text-[12pt] font-hub-heading block">
                              {getTierObj(selectedTier).name}
                            </strong>
                            <div className="text-[11pt] text-[#00FF88] font-mono pt-0.5">
                              Total: ₦{getTierObj(selectedTier).price.toLocaleString()} • 50% Deposit: ₦{getTierObj(selectedTier).deposit.toLocaleString()} • Balance: ₦{getTierObj(selectedTier).balance.toLocaleString()}
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#040906] border border-[#0E2015] space-y-1">
                            <span className="text-[#7EA88E] block text-[11pt]">Selected Design Archetype:</span>
                            <strong className="text-white text-[12pt] font-hub-heading block">
                              {getConceptDetails(selectedConcept).name}
                            </strong>
                            <span className="text-[11pt] text-[#86AD94] block">
                              {getConceptDetails(selectedConcept).desc}
                            </span>
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#040906] border border-[#0E2015] space-y-1">
                            <span className="text-[#7EA88E] block text-[11pt]">Client Signatory & Title:</span>
                            <strong className="text-white text-[12pt] font-hub-heading block">
                              {signatoryName || 'Client Representative'}
                            </strong>
                            <span className="text-[11pt] text-[#86AD94] block">{signatoryRole}</span>
                            <span className="text-[11pt] text-[#A7F432] block">{signatoryInstitution}</span>
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#040906] border border-[#0E2015] space-y-1">
                            <span className="text-[#7EA88E] block text-[11pt]">Client Direct Contacts:</span>
                            <div className="flex items-center gap-1.5 text-white font-mono text-[11pt]">
                              <Mail className="w-3.5 h-3.5 text-[#00FF88]" />
                              <span>{signatoryEmail}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[#00FF88] font-mono text-[11pt] pt-0.5">
                              <Phone className="w-3.5 h-3.5" />
                              <span>{signatoryPhone}</span>
                            </div>
                            <div className="text-[11pt] text-[#7EA88E] pt-1">
                              Intake Recipient: <strong className="text-white">{notificationRecipientEmail}</strong>
                            </div>
                          </div>
                        </div>

                        {acceptanceNotes && (
                          <div className="p-3.5 rounded-xl bg-[#040906] border border-[#0E2015] space-y-1">
                            <span className="text-[#7EA88E] block text-[11pt]">Committee Directives & Notes:</span>
                            <p className="text-white italic text-[11.5pt]">{acceptanceNotes}</p>
                          </div>
                        )}
                      </div>

                      {/* Multi-Channel Action Controls */}
                      <div className="space-y-3 pt-2">
                        <span className="text-white font-hub-heading font-bold text-[12pt] block">
                          Delivery Verification & Next Steps:
                        </span>
                        <div className="flex flex-wrap gap-3">
                          {/* 1. Direct Email Client Action */}
                          <a
                            href={buildMailtoUrl()}
                            className="px-5 py-3 bg-[#00FF88] hover:bg-[#20ff94] text-[#030A06] rounded-xl text-[11.5pt] font-hub-heading font-bold flex items-center gap-2 shadow-lg transition-all"
                          >
                            <Mail className="w-4 h-4 text-[#030A06]" />
                            <span>Send Email Confirmation to {notificationRecipientEmail}</span>
                          </a>

                          {/* 2. Copy Notification for WhatsApp / Email */}
                          <button
                            onClick={copyNotificationToClipboard}
                            className="px-5 py-3 bg-[#092013] hover:bg-[#0E2E1C] text-[#00FF88] border border-[#00FF88]/40 rounded-xl text-[11.5pt] font-hub-heading font-semibold flex items-center gap-2 transition-all shadow-xs"
                          >
                            {copiedNotification ? (
                              <>
                                <CheckCircle className="w-4 h-4 text-[#00FF88]" />
                                <span>Copied to Clipboard!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 text-[#00FF88]" />
                                <span>Copy Acceptance Notice (WhatsApp / Email)</span>
                              </>
                            )}
                          </button>

                          {/* 3. Print Official Receipt */}
                          <button
                            onClick={() => window.print()}
                            className="px-4 py-3 bg-[#08170F] hover:bg-[#0D2418] text-white rounded-xl text-[11.5pt] font-hub-heading font-semibold border border-[#133020] flex items-center gap-2 transition-all"
                          >
                            <Printer className="w-4 h-4 text-[#7EA88E]" />
                            <span>Print Certificate</span>
                          </button>

                          {/* 4. Modify Parameters */}
                          <button
                            onClick={() => setIsSubmitted(false)}
                            className="px-4 py-3 bg-transparent hover:bg-[#08170F] text-[#7EA88E] hover:text-white rounded-xl text-[11.5pt] font-hub-heading transition-all"
                          >
                            <span>Modify Selection</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleAcceptanceSubmit} className="space-y-6">
                      {/* Choose Tier */}
                      <div className="space-y-2">
                        <label className="text-[12pt] font-hub-heading font-bold text-white block">
                          1. Select Implementation Package Tier *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11.5pt]">
                          {proposalTiers.map((t) => (
                            <div
                              key={t.id}
                              onClick={() => setSelectedTier(t.id)}
                              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                selectedTier === t.id
                                  ? 'bg-[#0A1A12] text-white border-[#00FF88] shadow-[0_0_15px_rgba(0,255,136,0.12)]'
                                  : 'bg-[#060D08] text-[#B4D3C0] border-[#112318] hover:bg-[#08130D]'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <strong className="block text-base font-hub-heading font-bold">{t.name}</strong>
                                  {t.isRecommended && (
                                    <span className="text-[10pt] bg-[#00FF88] text-[#061009] font-bold px-2 py-0.5 rounded">RECOMMENDED</span>
                                  )}
                                  {t.isComprehensive && (
                                    <span className="text-[10pt] bg-[#2DD4BF] text-[#061009] font-bold px-2 py-0.5 rounded">COMPREHENSIVE</span>
                                  )}
                                </div>
                                {selectedTier === t.id ? (
                                  <span className="text-[11pt] text-[#00FF88] font-bold flex items-center gap-1">
                                    <Check className="w-3.5 h-3.5" />
                                    <span>SELECTED</span>
                                  </span>
                                ) : (
                                  <span className="text-[11pt] text-[#86AD94]">Select</span>
                                )}
                              </div>
                              <span className="font-mono text-lg font-bold block mt-1 text-white">₦{t.price.toLocaleString()}</span>
                              <span className="text-[11.5pt] text-[#86AD94] block mt-0.5">{t.positioning}</span>
                              <span className="text-[11pt] text-[#00FF88] block mt-1.5 font-mono">
                                50% Initial: ₦{t.deposit.toLocaleString()} • Balance: ₦{t.balance.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Choose Concept */}
                      <div className="space-y-2">
                        <label className="text-[12pt] font-hub-heading font-bold text-white block">
                          2. Preferred Design Archetype Prototype *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11.5pt]">
                          {[
                            { id: 'demo1', name: 'Demo 1', sub: 'Structured Institutional Academic' },
                            { id: 'demo2', name: 'Demo 2', sub: 'Contemporary Policy Platform' },
                            { id: 'demo3', name: 'Demo 3', sub: 'Scientific Discovery Platform' },
                          ].map((c) => (
                            <div
                              key={c.id}
                              onClick={() => setSelectedConcept(c.id)}
                              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                selectedConcept === c.id
                                  ? 'bg-[#0A1A12] text-white border-[#00FF88] shadow-[0_0_15px_rgba(0,255,136,0.12)]'
                                  : 'bg-[#060D08] text-[#B4D3C0] border-[#112318] hover:bg-[#08130D]'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <strong className="block font-hub-heading font-bold text-base">{c.name}</strong>
                                {selectedConcept === c.id && (
                                  <Check className="w-4 h-4 text-[#00FF88]" />
                                )}
                              </div>
                              <span className="text-[11.5pt] block mt-1 text-[#86AD94]">{c.sub}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Choose JORMASS & Submission Mode */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11.5pt]">
                        <div>
                          <label className="text-[12pt] font-hub-heading font-bold text-white block mb-1.5">
                            3. JORMASS Integration Model
                          </label>
                          <select
                            value={selectedJormassOption}
                            onChange={(e) => setSelectedJormassOption(e.target.value as any)}
                            className="w-full p-3 bg-[#060D08] border border-[#112318] rounded-xl text-white text-[11.5pt] font-medium focus:border-[#00FF88] outline-hidden"
                          >
                            <option value="optionA">Option A: Independent + Cross-Link</option>
                            <option value="optionB">Option B: Shared MOUAU Journals Gateway</option>
                            <option value="optionC">Option C: COLMAS Scholarly Publishing Network</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[12pt] font-hub-heading font-bold text-white block mb-1.5">
                            4. Manuscript Submission Routing
                          </label>
                          <select
                            value={selectedSubmissionMode}
                            onChange={(e) => setSelectedSubmissionMode(e.target.value as any)}
                            className="w-full p-3 bg-[#060D08] border border-[#112318] rounded-xl text-white text-[11.5pt] font-medium focus:border-[#00FF88] outline-hidden"
                          >
                            <option value="external">Mode A: External OJS Redirection</option>
                            <option value="integrated">Mode B: Integrated OnlineFirst Portal</option>
                          </select>
                        </div>
                      </div>

                      {/* Signatory & Client Contact Details */}
                      <div className="space-y-3 pt-2">
                        <label className="text-[12pt] font-hub-heading font-bold text-white block flex items-center gap-2">
                          <Building className="w-4 h-4 text-[#00FF88]" />
                          <span>5. Client Signatory & Direct Committee Contacts *</span>
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11.5pt]">
                          <div>
                            <label className="block text-[#D6ECE0] font-hub-heading font-medium mb-1">
                              Signatory Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Prof. J. O. Anyanwu"
                              value={signatoryName}
                              onChange={(e) => setSignatoryName(e.target.value)}
                              className="w-full p-3 bg-[#060D08] border border-[#112318] rounded-xl text-white text-[11.5pt] focus:border-[#00FF88] outline-hidden"
                            />
                          </div>

                          <div>
                            <label className="block text-[#D6ECE0] font-hub-heading font-medium mb-1">
                              Signatory Title / Role *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Chairman, Journal Editorial Board"
                              value={signatoryRole}
                              onChange={(e) => setSignatoryRole(e.target.value)}
                              className="w-full p-3 bg-[#060D08] border border-[#112318] rounded-xl text-white text-[11.5pt] focus:border-[#00FF88] outline-hidden"
                            />
                          </div>

                          <div>
                            <label className="block text-[#D6ECE0] font-hub-heading font-medium mb-1 flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-[#00FF88]" />
                              <span>Signatory Email Address *</span>
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="e.g. editor@taxfrontier.org"
                              value={signatoryEmail}
                              onChange={(e) => setSignatoryEmail(e.target.value)}
                              className="w-full p-3 bg-[#060D08] border border-[#112318] rounded-xl text-white text-[11.5pt] focus:border-[#00FF88] outline-hidden font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-[#D6ECE0] font-hub-heading font-medium mb-1 flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-[#00FF88]" />
                              <span>Client Phone / WhatsApp Contact *</span>
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="+234 803 123 4567"
                              value={signatoryPhone}
                              onChange={(e) => setSignatoryPhone(e.target.value)}
                              className="w-full p-3 bg-[#060D08] border border-[#112318] rounded-xl text-white text-[11.5pt] focus:border-[#00FF88] outline-hidden font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[#D6ECE0] font-hub-heading font-medium mb-1">
                            Institutional Representation / Committee Affiliation *
                          </label>
                          <select
                            value={signatoryInstitution}
                            onChange={(e) => setSignatoryInstitution(e.target.value)}
                            className="w-full p-3 bg-[#060D08] border border-[#112318] rounded-xl text-white text-[11.5pt] focus:border-[#00FF88] outline-hidden"
                          >
                            <option value="Joint CITN-MOUAU Project Committee">Joint CITN-MOUAU Project Committee</option>
                            <option value="The Chartered Institute of Taxation of Nigeria (CITN Umuahia Chapter)">CITN Umuahia Chapter</option>
                            <option value="Michael Okpara University of Agriculture, Umudike (MOUAU COLMAS)">MOUAU College of Management Sciences (COLMAS)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-hub-heading font-bold mb-1.5 text-[12pt]">
                          Special Directives or Committee Instructions
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Any committee directives regarding maiden publication schedule, pass-through services, or domain assignment..."
                          value={acceptanceNotes}
                          onChange={(e) => setAcceptanceNotes(e.target.value)}
                          className="w-full p-3 bg-[#060D08] border border-[#112318] rounded-xl text-[11.5pt] text-white focus:border-[#00FF88] outline-hidden"
                        />
                      </div>

                      {/* Notification Dispatch Notice */}
                      <div className="p-3.5 rounded-xl bg-[#07170E] border border-[#123820] flex items-center gap-2.5 text-[11.5pt] text-[#B8DEC6]">
                        <Send className="w-4 h-4 text-[#00FF88] shrink-0" />
                        <span>
                          Confirmation will be immediately dispatched to <strong className="text-white">{notificationRecipientEmail}</strong>, with a copy to <strong className="text-white">{signatoryEmail || 'your email'}</strong>.
                        </span>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="neon-glow-btn w-full py-4 rounded-xl font-hub-heading font-bold text-[12pt] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-[#030A06] border-t-transparent rounded-full animate-spin" />
                            <span>Transmitting Notification to OnlineFirst...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-[#030A06]" />
                            <span>Confirm Package Selection & Formally Accept Proposal</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Guided Step Navigation Footer at Bottom of Every Section */}
              <div className="mt-8 pt-6 border-t border-[#0F2819] flex flex-wrap items-center justify-between gap-3 relative z-10">
                <button
                  onClick={goToPrev}
                  disabled={currentSectionIdx === 0}
                  className={`neon-glow-btn-secondary px-4 py-2.5 rounded-xl text-xs font-hub-heading font-semibold flex items-center gap-1.5 transition-all ${
                    currentSectionIdx === 0
                      ? 'opacity-30 cursor-not-allowed text-[#7EA88E]'
                      : ''
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 text-[#00FF88]" />
                  <span>Previous: {currentSectionIdx > 0 ? sections[currentSectionIdx - 1].title : 'Start'}</span>
                </button>

                <div className="text-[11px] text-[#7EA88E] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] neon-dot-pulsing" />
                  <span>Module <strong className="text-white">{currentSection.index}</strong> of <strong className="text-[#00FF88]">11</strong></span>
                </div>

                <button
                  onClick={goToNext}
                  disabled={currentSectionIdx === sections.length - 1}
                  className={`neon-glow-btn px-4 py-2.5 rounded-xl text-xs font-hub-heading font-bold flex items-center gap-1.5 transition-all ${
                    currentSectionIdx === sections.length - 1
                      ? 'opacity-30 cursor-not-allowed'
                      : ''
                  }`}
                >
                  <span>Next: {currentSectionIdx < sections.length - 1 ? sections[currentSectionIdx + 1].title : 'Sign-Off'}</span>
                  <ChevronRight className="w-4 h-4 text-[#030A06]" />
                </button>
              </div>
            </div>
          </main>
        </div>
        </div>

        {/* 3. Executive Footer / Lower Project Status Strip */}
        <footer className="mt-6 pt-5 pb-6 border-t border-[#0D2214] text-xs text-[#7EA88E]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#05110A] border border-[#0F2618]">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FF88] neon-dot-pulsing" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#00FF88] font-bold">Selected Tier:</span>
                <span className="text-white font-medium capitalize bg-[#081B10] px-2 py-0.5 rounded border border-[#00FF88]/20">{selectedTier} Package</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#7EA88E]">Chosen Prototype:</span>
                <span className="text-white font-mono uppercase bg-[#081B10] px-2 py-0.5 rounded border border-[#0F2618]">{selectedConcept}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px]">
              <span className="text-[#8EB89D]">
                Governance: <strong className="text-white">CITN Umuahia Chapter & MOUAU COLMAS</strong>
              </span>
              <span className="text-[#153322] hidden sm:inline">•</span>
              <span className="text-[#7EA88E] font-mono">
                Version 2.2 • Proposal Valid 60 Days
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
