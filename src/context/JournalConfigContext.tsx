import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppView,
  JournalSubPage,
  JournalConfig,
  EditorialMember,
  JournalArticle,
  ChecklistItem,
  CommercialAcceptance,
  SubmissionMode,
  JormassRelationshipOption,
  JournalAnnouncement,
} from '../types';
import {
  initialJournalConfig,
  editorialMembersList,
  sampleArticles,
  humanChecklistItems,
  initialJournalAnnouncements,
} from '../data/journalData';

interface JournalContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  currentSubPage: JournalSubPage;
  setCurrentSubPage: (page: JournalSubPage) => void;
  selectedArticle: JournalArticle | null;
  setSelectedArticle: (article: JournalArticle | null) => void;
  grayscaleMode: boolean;
  setGrayscaleMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  
  // Configuration
  config: JournalConfig;
  updateConfig: (patch: Partial<JournalConfig>) => void;
  
  // Submission & Gateway toggles
  setSubmissionMode: (mode: SubmissionMode) => void;
  setJormassRelationship: (rel: JormassRelationshipOption) => void;
  
  // Editorial members
  editorialMembers: EditorialMember[];
  updateEditorialMember: (id: string, patch: Partial<EditorialMember>) => void;
  addEditorialMember: (member: EditorialMember) => void;
  
  // Articles
  articles: JournalArticle[];

  // Announcements / Call-to-Action module (Editable via CMS)
  announcements: JournalAnnouncement[];
  addAnnouncement: (announcement: JournalAnnouncement) => void;
  updateAnnouncement: (id: string, patch: Partial<JournalAnnouncement>) => void;
  deleteAnnouncement: (id: string) => void;
  togglePublishAnnouncement: (id: string) => void;
  setAnnouncements: React.Dispatch<React.SetStateAction<JournalAnnouncement[]>>;
  
  // Checklist
  checklist: ChecklistItem[];
  updateChecklistItem: (id: string, status: ChecklistItem['status']) => void;
  
  // Commercial Acceptance
  acceptances: CommercialAcceptance[];
  recordAcceptance: (acceptance: Omit<CommercialAcceptance, 'id' | 'timestamp' | 'status' | 'notificationRecipient'>) => CommercialAcceptance;
  commercialAcceptance: {
    selectedTier: string;
    selectedConcept: string;
    signatoryName: string;
    signatoryRole: string;
    signatoryEmail: string;
    status: 'pending' | 'accepted';
    acceptedAt?: string;
    notes?: string;
  };
  setCommercialAcceptance: React.Dispatch<React.SetStateAction<{
    selectedTier: string;
    selectedConcept: string;
    signatoryName: string;
    signatoryRole: string;
    signatoryEmail: string;
    status: 'pending' | 'accepted';
    acceptedAt?: string;
    notes?: string;
  }>>;
  
  // Quick navigation helpers
  openDemo: (demo: 'demo1' | 'demo2' | 'demo3', subPage?: JournalSubPage) => void;
  openHubSection: (sectionId: string) => void;
  activeHubSection: string;
  setActiveHubSection: (id: string) => void;
  notification: string | null;
  setNotification: (msg: string | null) => void;
}

const JournalConfigContext = createContext<JournalContextType | undefined>(undefined);

export const JournalConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('hub');
  const [currentSubPage, setCurrentSubPage] = useState<JournalSubPage>('home');
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(sampleArticles[0]);
  const [grayscaleMode, setGrayscaleMode] = useState<boolean>(false);
  const [activeHubSection, setActiveHubSection] = useState<string>('01_why_platform');
  const [notification, setNotification] = useState<string | null>(null);

  // Stored state with fallbacks
  const [config, setConfig] = useState<JournalConfig>(() => {
    const saved = localStorage.getItem('taxfrontier_config');
    return saved ? JSON.parse(saved) : initialJournalConfig;
  });

  const [editorialMembers, setEditorialMembers] = useState<EditorialMember[]>(() => {
    const saved = localStorage.getItem('taxfrontier_editorial');
    return saved ? JSON.parse(saved) : editorialMembersList;
  });

  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem('taxfrontier_checklist');
    return saved ? JSON.parse(saved) : humanChecklistItems;
  });

  const [acceptances, setAcceptances] = useState<CommercialAcceptance[]>(() => {
    const saved = localStorage.getItem('taxfrontier_acceptances');
    return saved ? JSON.parse(saved) : [];
  });

  const [announcements, setAnnouncements] = useState<JournalAnnouncement[]>(() => {
    const saved = localStorage.getItem('taxfrontier_announcements');
    return saved ? JSON.parse(saved) : initialJournalAnnouncements;
  });

  const [commercialAcceptance, setCommercialAcceptance] = useState<{
    selectedTier: string;
    selectedConcept: string;
    signatoryName: string;
    signatoryRole: string;
    signatoryEmail: string;
    status: 'pending' | 'accepted';
    acceptedAt?: string;
    notes?: string;
  }>(() => {
    const saved = localStorage.getItem('taxfrontier_comm_acceptance');
    return saved
      ? JSON.parse(saved)
      : {
          selectedTier: 'professional',
          selectedConcept: 'demo1',
          signatoryName: '',
          signatoryRole: 'Chairman, Journal Editorial Board',
          signatoryEmail: initialJournalConfig.contractRecipientEmail,
          status: 'pending',
        };
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('taxfrontier_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('taxfrontier_editorial', JSON.stringify(editorialMembers));
  }, [editorialMembers]);

  useEffect(() => {
    localStorage.setItem('taxfrontier_checklist', JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem('taxfrontier_acceptances', JSON.stringify(acceptances));
  }, [acceptances]);

  useEffect(() => {
    localStorage.setItem('taxfrontier_comm_acceptance', JSON.stringify(commercialAcceptance));
  }, [commercialAcceptance]);

  useEffect(() => {
    localStorage.setItem('taxfrontier_announcements', JSON.stringify(announcements));
  }, [announcements]);

  const updateConfig = (patch: Partial<JournalConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  };

  const setSubmissionMode = (mode: SubmissionMode) => {
    updateConfig({ submissionMode: mode });
  };

  const setJormassRelationship = (rel: JormassRelationshipOption) => {
    updateConfig({ jormassRelationship: rel });
  };

  const updateEditorialMember = (id: string, patch: Partial<EditorialMember>) => {
    setEditorialMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...patch } : m))
    );
  };

  const addEditorialMember = (member: EditorialMember) => {
    setEditorialMembers((prev) => [...prev, member]);
  };

  const addAnnouncement = (announcement: JournalAnnouncement) => {
    setAnnouncements((prev) => [announcement, ...prev]);
  };

  const updateAnnouncement = (id: string, patch: Partial<JournalAnnouncement>) => {
    setAnnouncements((prev) =>
      prev.map((ann) => (ann.id === id ? { ...ann, ...patch } : ann))
    );
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((ann) => ann.id !== id));
  };

  const togglePublishAnnouncement = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((ann) => (ann.id === id ? { ...ann, published: !ann.published } : ann))
    );
  };

  const updateChecklistItem = (id: string, status: ChecklistItem['status']) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const recordAcceptance = (
    data: Omit<CommercialAcceptance, 'id' | 'timestamp' | 'status' | 'notificationRecipient'>
  ): CommercialAcceptance => {
    const newRecord: CommercialAcceptance = {
      ...data,
      id: `TF-ACC-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      status: 'DISPATCHED_TO_ONLINEFIRST',
      notificationRecipient: 'onlinefirst2026@gmail.com',
    };

    setAcceptances((prev) => [newRecord, ...prev]);
    return newRecord;
  };

  const openDemo = (demo: 'demo1' | 'demo2' | 'demo3', subPage: JournalSubPage = 'home') => {
    setCurrentView(demo);
    setCurrentSubPage(subPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openHubSection = (sectionId: string) => {
    setCurrentView('hub');
    setActiveHubSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <JournalConfigContext.Provider
      value={{
        currentView,
        setCurrentView,
        currentSubPage,
        setCurrentSubPage,
        selectedArticle,
        setSelectedArticle,
        grayscaleMode,
        setGrayscaleMode,
        config,
        updateConfig,
        setSubmissionMode,
        setJormassRelationship,
        editorialMembers,
        updateEditorialMember,
        addEditorialMember,
        articles: sampleArticles,
        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        togglePublishAnnouncement,
        setAnnouncements,
        checklist,
        updateChecklistItem,
        acceptances,
        recordAcceptance,
        commercialAcceptance,
        setCommercialAcceptance,
        openDemo,
        openHubSection,
        activeHubSection,
        setActiveHubSection,
        notification,
        setNotification,
      }}
    >
      <div className={grayscaleMode ? 'filter grayscale transition-all duration-300' : ''}>
        {children}
      </div>
    </JournalConfigContext.Provider>
  );
};

export const useJournalConfig = () => {
  const context = useContext(JournalConfigContext);
  if (!context) {
    throw new Error('useJournalConfig must be used within a JournalConfigProvider');
  }
  return context;
};
