import React from 'react';
import {
  JournalConfigProvider,
  useJournalConfig,
} from './context/JournalConfigContext';
import { TopBarPreviewNav } from './components/common/TopBarPreviewNav';
import { ProposalHub } from './components/proposal/ProposalHub';
import { Demo1Institutional } from './components/demos/Demo1Institutional';
import { Demo2PolicyPlatform } from './components/demos/Demo2PolicyPlatform';
import { Demo3AfricanDiscovery } from './components/demos/Demo3AfricanDiscovery';
import { AdminCMS } from './components/admin/AdminCMS';

const MainViewRouter: React.FC = () => {
  const { currentView, notification } = useJournalConfig();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 selection:bg-amber-300 selection:text-slate-950 font-sans">
      {/* 1. Global OnlineFirst Navigation & Switcher Bar */}
      <TopBarPreviewNav />

      {/* 2. Global Toast Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50 bg-emerald-950 text-amber-300 border border-amber-500/40 px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* 3. Main View Renderer */}
      <div className="flex-1">
        {currentView === 'hub' && <ProposalHub />}
        {currentView === 'demo1' && <Demo1Institutional />}
        {currentView === 'demo2' && <Demo2PolicyPlatform />}
        {currentView === 'demo3' && <Demo3AfricanDiscovery />}
        {currentView === 'admin' && <AdminCMS />}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <JournalConfigProvider>
      <MainViewRouter />
    </JournalConfigProvider>
  );
}
