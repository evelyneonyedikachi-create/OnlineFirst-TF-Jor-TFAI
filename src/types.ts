export type AppView = 'hub' | 'demo1' | 'demo2' | 'demo3' | 'cms' | 'commercial' | 'admin';

export type JournalSubPage =
  | 'home'
  | 'about'
  | 'vision-mission'
  | 'aims-scope'
  | 'current-issue'
  | 'articles'
  | 'article-detail'
  | 'call-for-papers'
  | 'announcements'
  | 'author-guidelines'
  | 'submit'
  | 'fees'
  | 'editorial-board'
  | 'peer-review'
  | 'ethics'
  | 'indexing'
  | 'events'
  | 'contact'
  | 'search';

export type AnnouncementPriority = 'normal' | 'featured' | 'urgent';

export interface JournalAnnouncement {
  id: string;
  title: string;
  shortMessage: string;
  category: string; // 'Call for Papers' | 'Submission Deadline' | 'Deadline Extension' | 'Issue Published' | 'Special Issue' | 'Conference / Workshop' | 'Reviewer Recruitment' | 'Editorial Notice' | 'Indexing Milestone' | 'Policy Update' | 'Award / Recognition' | 'Urgent Author Communication'
  startDate: string;
  endDate: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  icon?: string;
  priority: AnnouncementPriority;
  published: boolean;
  createdAt?: string;
}

export type SubmissionMode = 'external' | 'integrated';

export type JormassRelationshipOption = 'optionA' | 'optionB' | 'optionC';

export interface JournalConfig {
  // Configurable fields with conflicts
  submissionDeadline: string;
  submissionDeadlineStatus: 'CONFIRMED' | 'CLIENT CONFIRMATION REQUIRED';
  
  reviewFee: number;
  reviewFeeStatus: 'CONFIRMED' | 'CLIENT CONFIRMATION REQUIRED';
  
  publicationFee: number;
  publicationFeeStatus: 'CONFIRMED' | 'CLIENT CONFIRMATION REQUIRED';
  
  maidenDiscount: number; // e.g. 30%
  maidenDiscountActive: boolean;
  
  editorialEmail: string;
  editorialEmailStatus: 'CONFIRMED' | 'CLIENT CONFIRMATION REQUIRED';
  
  journalDomain: string;
  journalDomainStatus: 'CONFIRMED' | 'CLIENT CONFIRMATION REQUIRED';
  
  maidenPublicationDate: string;
  maidenPublicationDateStatus: 'CONFIRMED' | 'CLIENT CONFIRMATION REQUIRED';
  
  contractRecipientEmail: string;
  contractRecipientStatus: 'CONFIRMED' | 'CLIENT CONFIRMATION REQUIRED';

  // Architectural switches
  submissionMode: SubmissionMode;
  jormassRelationship: JormassRelationshipOption;
  
  // Policies & Identity
  journalName: string;
  tagline: string;
  frequency: string;
  publishers: {
    citn: string;
    mouau: string;
  };
  creativeCommonsLicense: string;
  creativeCommonsStatus: 'CONFIRMED' | 'CLIENT CONFIRMATION REQUIRED';
  similarityThreshold: number; // 15%
  decisionTargetDeadline?: string; // 2 October 2026
}

export interface EditorialMember {
  id: string;
  name: string;
  role: string;
  institution: string;
  country: string;
  biography: string;
  photoUrl?: string;
  orcid?: string;
  expertise: string[];
  status: 'published' | 'unpublished'; // Missing appointments handled as unpublished, not "To be filled" in public
}

export interface JournalArticle {
  id: string;
  title: string;
  authors: {
    name: string;
    affiliation: string;
    orcid?: string;
    isCorresponding?: boolean;
  }[];
  abstract: string;
  keywords: string[];
  volume: number;
  issue: number;
  pages: string;
  publicationDate: string;
  doi: string; // Has "DEMO DATA" designation
  pdfUrl: string;
  subjectAreas: string[];
  license: string;
  metrics: {
    downloads: number;
    views: number;
    citations: number;
  };
  isDemoData: boolean;
  type: 'Research Article' | 'Policy Review' | 'Case Commentary' | 'Fiscal Note';
}

export interface CallForPapersCampaign {
  title: string;
  theme: string;
  openingDate: string;
  deadline: string;
  maidenDiscountNote: string;
  whoCanSubmit: string[];
  paperTypes: string[];
  areasOfInterest: string[];
  submissionEmail: string;
}

export interface ImplementationTier {
  id: 'basic' | 'launch' | 'professional' | 'premium' | 'advanced';
  name: string;
  tagline: string;
  price: number;
  deposit: number; // 50%
  balance: number; // 50%
  isRecommended?: boolean;
  isComprehensive?: boolean;
  positioning: string;
  oneSentenceRule: string;
  plainEnglishPositioning: string;
  summary: string;
  features: string[];
  notIncluded: string[];
  domainNote?: string;
  clientResponsibilities: string[];
  externalCostsNote: string;
}

export interface CommercialAcceptance {
  id: string;
  timestamp: string;
  selectedDemo: 'demo1' | 'demo2' | 'demo3';
  selectedTier: 'basic' | 'launch' | 'professional' | 'premium' | 'advanced' | string;
  totalFee: number;
  depositAmount: number;
  balanceAmount: number;
  representativeName: string;
  representativeTitle: string;
  representativeEmail: string;
  representativePhone: string;
  institutionAffiliation: 'CITN Umuahia Chapter' | 'MOUAU COLMAS' | 'Joint Project Committee';
  contractRecipientEmail: string;
  governingLawAcknowledged: boolean;
  implementationNotes: string;
  status: 'RECORDED' | 'DISPATCHED_TO_ONLINEFIRST';
  notificationRecipient: string; // onlinefirst2026@gmail.com
}

export interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  status: 'Pending Client Confirmation' | 'Under Review' | 'Verified';
  assignedTo: string;
}
