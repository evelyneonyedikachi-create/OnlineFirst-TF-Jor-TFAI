import React, { useState } from 'react';
import { useJournalConfig } from '../../context/JournalConfigContext';
import {
  ExternalLink,
  Sliders,
  FileCheck,
  Eye,
  CheckCircle,
  Layers,
  Sparkles,
  BookOpen,
  ChevronDown,
  Building2,
  Cpu,
  Globe2,
} from 'lucide-react';

export const TopBarPreviewNav: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    openDemo,
    openHubSection,
    grayscaleMode,
    setGrayscaleMode,
  } = useJournalConfig();

  const [demosDropdownOpen, setDemosDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#041D13] border-b border-[#0B3D28] text-xs text-slate-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-2">
        {/* Left: OnlineFirst Studio Brand & Domain simulation */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setCurrentView('hub');
              openHubSection('executive-summary');
            }}
            className="flex items-center gap-2 font-bold tracking-wider text-[#D8BA75] hover:text-[#EFE2BF] transition-colors uppercase text-[11px]"
          >
            <span className="w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_8px_rgba(197,160,89,0.8)]" />
            ONLINEFIRST STUDIO
          </button>
          <span className="hidden lg:inline text-[#0F5A3C]">|</span>
          <span className="hidden lg:inline text-slate-300/80 font-medium">Academic & Professional Publishing Systems</span>
          
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#06291B] border border-[#0F4A32] text-[10px] text-emerald-200">
            <span className="text-slate-400 font-mono">taxfrontier-preview.onlinefirst.ng</span>
            <span className="text-[#D8BA75] font-mono text-[9px] bg-[#041D13] px-1.5 py-0.2 rounded border border-[#C5A059]/30">
              {currentView === 'hub' ? '/' : currentView === 'admin' || currentView === 'cms' ? '/admin' : `/demo/${currentView}`}
            </span>
          </div>
        </div>

        {/* Center: Quick navigation between Hub, 3 Demos, CMS, and Commercial Selection */}
        <nav className="flex items-center gap-1 sm:gap-1.5">
          <button
            id="nav-hub-btn"
            onClick={() => setCurrentView('hub')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              currentView === 'hub'
                ? 'bg-[#A7F432] text-[#08130D] shadow-sm font-bold'
                : 'hover:bg-[#073322] text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Proposal Hub</span>
          </button>

          {/* Demos selector */}
          <div className="relative">
            <button
              onClick={() => setDemosDropdownOpen(!demosDropdownOpen)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                currentView.startsWith('demo')
                  ? 'bg-[#0B4D32] text-[#F3E5AB] border border-[#C5A059]/40 shadow-sm font-semibold'
                  : 'hover:bg-[#073322] text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D8BA75]" />
              <span>
                {currentView === 'demo1'
                  ? 'Demo 1: Structured Institutional'
                  : currentView === 'demo2'
                  ? 'Demo 2: Policy & Practice Platform'
                  : currentView === 'demo3'
                  ? 'Demo 3: Scholarly Discovery Archive'
                  : 'Review 3 Concepts'}
              </span>
              <ChevronDown className="w-3 h-3 opacity-80" />
            </button>

            {demosDropdownOpen && (
              <div
                className="absolute left-0 mt-1 w-80 rounded-xl bg-[#052619] border border-[#0D4E33] shadow-2xl py-1.5 z-50 text-left"
                onMouseLeave={() => setDemosDropdownOpen(false)}
              >
                <div className="px-3.5 py-1.5 border-b border-[#0D4E33] text-[10px] text-[#D8BA75] font-bold uppercase tracking-wider">
                  3 Distinct Design Concepts
                </div>
                <button
                  onClick={() => {
                    openDemo('demo1');
                    setDemosDropdownOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 text-left flex items-start gap-3 hover:bg-[#083624] transition-colors ${
                    currentView === 'demo1' ? 'bg-[#083624] text-[#EFE2BF]' : 'text-slate-200'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-[#D8BA75] mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-xs flex items-center gap-1.5">
                      Demo 1: Structured Institutional
                      <span className="text-[9px] bg-[#012509] text-[#C48A36] px-1 rounded border border-[#C48A36]/40 font-bold">CITN / MOUAU</span>
                    </div>
                    <p className="text-[10px] text-slate-300 mt-0.5">Dark green #012509 • Gold #C48A36 • Burnt orange accents • Light off-white base • Modern Sans: Montserrat & Inter</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    openDemo('demo2');
                    setDemosDropdownOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 text-left flex items-start gap-3 hover:bg-[#083624] transition-colors ${
                    currentView === 'demo2' ? 'bg-[#083624] text-[#EFE2BF]' : 'text-slate-200'
                  }`}
                >
                  <Cpu className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-xs flex items-center gap-1.5">
                      Demo 2: Policy & Practice Platform
                      <span className="text-[9px] bg-[#021810] text-emerald-300 px-1 rounded border border-emerald-700/50">Digital UI</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">Sans-first modern interface • Slate & rich emerald • Real-time search & policy briefs</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    openDemo('demo3');
                    setDemosDropdownOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 text-left flex items-start gap-3 hover:bg-[#083624] transition-colors ${
                    currentView === 'demo3' ? 'bg-[#083624] text-[#EFE2BF]' : 'text-slate-200'
                  }`}
                >
                  <Globe2 className="w-4 h-4 text-[#D8BA75] mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-xs flex items-center gap-1.5">
                      Demo 3: Scholarly Discovery Archive
                      <span className="text-[9px] bg-[#051410] text-[#D8BA75] px-1.5 py-0.5 rounded border border-[#C5A059]/40 font-mono">Catalog</span>
                    </div>
                    <p className="text-[10px] text-slate-300 mt-0.5">Library-catalog identity • Security watermark • Refined gold accents • Ivory index cards</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* CMS / Admin preview button */}
          <button
            id="nav-cms-btn"
            onClick={() => setCurrentView('admin')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              currentView === 'admin'
                ? 'bg-[#6D28D9] text-white shadow-sm font-semibold'
                : 'hover:bg-[#073322] text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-purple-300" />
            <span className="hidden sm:inline">CMS & Governance</span>
            <span className="sm:hidden">CMS</span>
          </button>

          {/* Commercial / Acceptance button */}
          <button
            id="nav-commercial-btn"
            onClick={() => {
              setCurrentView('hub');
              openHubSection('acceptance-workflow');
            }}
            className="px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 bg-[#A7F432]/15 text-[#A7F432] border border-[#A7F432]/40 hover:bg-[#A7F432]/25 shadow-xs"
          >
            <FileCheck className="w-3.5 h-3.5 text-[#A7F432]" />
            <span>Select Package</span>
          </button>
        </nav>

        {/* Right: Grayscale Test Toggle + Configuration Status */}
        <div className="flex items-center gap-2">
          <button
            id="grayscale-test-toggle"
            onClick={() => setGrayscaleMode((prev) => !prev)}
            title="Convert preview to grayscale to verify structural layout differences"
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 border transition-all text-[11px] ${
              grayscaleMode
                ? 'bg-zinc-700 text-white border-zinc-500 font-semibold'
                : 'bg-[#06281B] text-slate-300 border-[#0D4E33] hover:text-white'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">Grayscale Test</span>
            <span className={`w-1.5 h-1.5 rounded-full ${grayscaleMode ? 'bg-[#D8BA75]' : 'bg-slate-500'}`} />
          </button>
        </div>
      </div>
    </header>
  );
};
