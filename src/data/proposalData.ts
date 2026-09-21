import { ImplementationTier } from '../types';

export const proposalTiers: ImplementationTier[] = [
  {
    id: 'basic',
    name: 'BASIC',
    tagline: 'Design & Handover',
    positioning: 'Design & Handover',
    price: 450000,
    deposit: 225000,
    balance: 225000,
    isRecommended: false,
    isComprehensive: false,
    oneSentenceRule: 'We build it.',
    plainEnglishPositioning:
      'OnlineFirst designs and builds the complete website and hands over the code. The client is responsible for hosting, deployment, domain management and future technical operation.',
    summary:
      'A complete responsive Tax Frontier website with source-code handover for client-managed hosting.',
    features: [
      'Selected design concept implementation (Demo 1, 2, or 3)',
      'Responsive public journal website (Desktop, Tablet, Mobile)',
      'Core Tax Frontier journal pages',
      'Call for Papers interactive showcase page',
      'About / Scope / Editorial / Policies pages',
      'Current issue & Volume archive presentation',
      'Article-detail view templates with structured citation blocks',
      'Contact & inquiries page',
      'Basic search presentation interface',
      'Full source-code handover & documentation package',
    ],
    notIncluded: [
      'Hosting infrastructure',
      'Domain purchase',
      'DNS setup & configuration',
      'Professional domain-based email',
      'Deployment management',
      'CMS / admin dashboard',
      'OJS integration',
      'Database / content-management system',
      'Cloud file / PDF storage',
      'Ongoing technical maintenance',
      'Historical content migration',
    ],
    clientResponsibilities: [
      'Client provisions, funds, and manages server hosting and domain registration',
      'Client manages production deployment, DNS records, and SSL certificates',
      'Client performs future technical operations and content updates directly in source code',
    ],
    externalCostsNote:
      'Client is responsible for server hosting, domain fees, and any third-party scholarly indexing memberships.',
  },
  {
    id: 'launch',
    name: 'LAUNCH',
    tagline: 'Managed Website Launch',
    positioning: 'Managed Website Launch',
    price: 650000,
    deposit: 325000,
    balance: 325000,
    isRecommended: false,
    isComprehensive: false,
    oneSentenceRule: 'We build it and launch it.',
    plainEnglishPositioning:
      'OnlineFirst not only builds the website, but also takes responsibility for putting it online correctly and keeping the standard hosting infrastructure in place for two years.',
    summary:
      'A complete website professionally deployed, configured and hosted by OnlineFirst for two years.',
    domainNote:
      'If the client already owns the domain: connect and configure it. If OnlineFirst is asked to purchase a domain: domain registration cost is separate unless explicitly included in Premium.',
    features: [
      'Everything included in the Basic Package',
      'Production deployment to enterprise cloud hosting environment',
      'Hosting configuration & server optimization',
      'Automated SSL / HTTPS security encryption certificate setup',
      'DNS setup & institutional domain connection',
      'Two (2) Years standard website hosting included (24 months uptime management)',
      'Launch configuration & performance optimization',
      'Production testing & device cross-compatibility verification',
      'Basic security configuration & DDoS protection',
      'Backup & deployment pipeline setup',
      'Official launch support & stabilization window',
      'Standard technical handover documentation',
    ],
    notIncluded: [
      'Full CMS / admin dashboard',
      'Publication manager (Volumes/Issues/Articles)',
      'Event management system',
      'Advanced article management & editor queues',
      'OJS integration or submission bridge',
      'Professional email package',
      'Online payment gateway integration',
      'Advanced search engine & faceted filtering',
      'Large-scale content migration',
    ],
    clientResponsibilities: [
      'Providing institutional domain access or authorizing DNS record modifications',
      'Managing routine journal content updates via technical support requests',
    ],
    externalCostsNote:
      'Includes 24 months hosting. Domain purchase is separate if not client-owned. Statutory Crossref/DOI fees remain client responsibility.',
  },
  {
    id: 'professional',
    name: 'PROFESSIONAL',
    tagline: 'Publishing Management Platform',
    positioning: 'Publishing Management Platform',
    price: 790000,
    deposit: 395000,
    balance: 395000,
    isRecommended: true,
    isComprehensive: false,
    oneSentenceRule: 'We build it, launch it and give the client tools to manage it.',
    plainEnglishPositioning:
      'This package gives Tax Frontier operational independence. The editorial team can manage publications, calls for papers, events, deadlines and routine content without relying on a developer for every update.',
    summary:
      'A managed journal website with CMS tools for publications, calls for papers, events, editorial content and routine updates.',
    features: [
      'Everything included in the Launch Package (with 2 Years hosting)',
      'Secure Admin Dashboard & authorized editorial user login',
      'Homepage content management & headline announcements manager',
      'Publications Manager: create & edit volumes, issues, and articles',
      'PDF & galley upload management with metadata indexing',
      'Manage authors, affiliations, and 26-topic taxonomy categories',
      'Call for Papers Engine: create/update campaigns, deadlines, themes, and fees',
      'Configurable maiden discounts (e.g. 30% discount logic toggle)',
      'Publish & unpublish calls for papers and announcements on demand',
      'Event Management: conferences, workshops, lectures, and professional events',
      'Editorial Board Management: profiles, roles, institutions, and ORCID fields',
      'Policies & Peer-Review Information management panels',
      'Settings: contact info, submission links, fee values, deadline values, indexing status',
      'JORMASS link / gateway configuration switch',
      'Standard cloud document / PDF storage allocation',
      'Reasonable initial content-migration allowance (pre-loading initial issues/articles)',
    ],
    notIncluded: [
      'Full OJS setup / integration',
      'Payment gateway integration',
      'Complex Crossref automation',
      'Advanced external search engine',
      'Professional domain-based email service',
      'Premium domain registration',
      'Unlimited cloud file storage',
      'Custom institutional multi-journal gateway federation',
    ],
    clientResponsibilities: [
      'Designating editorial staff and managing internal peer review operations',
      'Entering future volumes, articles, and calls for papers using provided CMS tools',
    ],
    externalCostsNote:
      'Covers full CMS engineering and 2-year deployment. Crossref/DOI deposits and plagiarism screening licenses billed separately.',
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    tagline: 'Integrated Scholarly Publishing Platform',
    positioning: 'Integrated Scholarly Publishing Platform',
    price: 950000,
    deposit: 475000,
    balance: 475000,
    isRecommended: false,
    isComprehensive: true,
    oneSentenceRule: 'We build the full managed publishing ecosystem and integrations around it.',
    plainEnglishPositioning:
      'Premium is for the client who wants OnlineFirst to deliver a more complete scholarly publishing ecosystem, including domain/email infrastructure, advanced integrations, publishing workflows and the option to connect Tax Frontier with JORMASS or a broader COLMAS journal gateway.',
    summary:
      'A comprehensive publishing platform with advanced integrations, domain/email package, enhanced administration and optional JORMASS/COLMAS gateway capability.',
    domainNote:
      '2-Year Domain + Hosting + Professional Email Package Included. Standard domain registration is included subject to availability and normal registration cost. Premium/acquired domains may require an additional charge.',
    features: [
      'Everything included in the Professional Package',
      '2-Year Domain + Hosting + Professional Email Package Included',
      '2-Year standard domain registration (subject to normal registration availability)',
      '2-Year managed cloud hosting with enhanced uptime monitoring & priority backups',
      'Professional domain-based email setup (e.g. editor@taxfrontier.org, submissions@taxfrontier.org, admin@taxfrontier.org)',
      'DNS configuration & email authentication (DKIM, SPF, DMARC configuration)',
      'Open Journal Systems (OJS) integration / setup support & submission-flow integration',
      'Structured scholarly metadata configuration (Google Scholar, Highwire Press, Dublin Core)',
      'DOI-ready metadata fields & Crossref-ready publishing structure',
      'ORCID integration support for contributing authors & editorial board',
      'Advanced article filtering, taxonomy facets, and instant full-text search',
      'Role-based administration (Editor-in-Chief, Section Editors, Technical Staff)',
      'JORMASS / Gateway Integration: Tax Frontier ↔ JORMASS cross-link or shared COLMAS gateway',
      'Enhanced content migration: broader initial publication, policy & document migration assistance',
      'Advanced Analytics: publication activity, downloads, traffic, and content performance metrics',
      'Priority dedicated technical support SLA for 12 months',
    ],
    notIncluded: [
      'Premium aftermarket domain acquisition fees (if requested domain is priced above standard rates)',
      'Statutory Crossref annual membership dues (paid directly by institution to Crossref)',
      'Per-article Crossref DOI deposit fees ($1/article paid directly to Crossref)',
      'Turnitin or iThenticate institutional plagiarism software license',
    ],
    clientResponsibilities: [
      'Institutional approval for official domain names and institutional email addresses',
      'Governance decisions regarding shared COLMAS gateway policies',
    ],
    externalCostsNote:
      'OnlineFirst platform fee is fixed at ₦950,000. Statutory third-party memberships (Crossref, Turnitin) require client approval and are paid directly.',
  },
];

export const pricingTiers = proposalTiers.map((t) => ({
  id: t.id,
  name: t.name,
  tagline: t.tagline,
  price: t.price,
  recommended: t.isRecommended,
  features: t.features,
}));

export const thirdPartyServices = [
  {
    id: 'domain-premium-renewal',
    name: 'Premium Domain Registration / Special TLDs',
    description: 'Standard domains are included in Premium. Premium aftermarket domains or specialized international TLDs billed at cost if requested.',
    estimatedCostNgn: 15000,
    frequency: 'Annual / At Acquisition',
  },
  {
    id: 'crossref-membership',
    name: 'Crossref Annual Publisher Membership',
    description: 'Statutory annual subscription as an academic publisher, enabling registered DOI prefix allocation (paid directly to Crossref).',
    estimatedCostUsd: 275,
    estimatedCostNgn: 412500,
    frequency: 'Annual (Direct to Crossref)',
  },
  {
    id: 'crossref-doi-deposits',
    name: 'Crossref DOI Article Registrations',
    description: 'Per-article deposit fee creating permanent digital persistent identifiers ($1.00/article paid directly to Crossref).',
    estimatedCostUsd: 1,
    estimatedCostNgn: 1500,
    frequency: 'Per Published Article',
  },
  {
    id: 'turnitin-license',
    name: 'Turnitin / iThenticate Plagiarism Screening',
    description: 'Institutional similarity checking software license for maintaining COPE ≤15% similarity thresholds.',
    estimatedCostNgn: 85000,
    frequency: 'Annual / Consortial License',
  },
  {
    id: 'paid-ojs-plugins',
    name: 'Paid OJS Plugins / Commercial Extensions',
    description: 'Optional proprietary OJS plugins or commercial themes requested beyond standard open-source core modules.',
    estimatedCostNgn: 0,
    frequency: 'Optional / Upon Approval',
  },
  {
    id: 'premium-cloud-storage',
    name: 'High-Volume Cold Archive / Premium Cloud Storage',
    description: 'Additional high-volume document storage beyond the standard 2-year cloud hosting allocation.',
    estimatedCostNgn: 0,
    frequency: 'Optional / Usage-Based',
  },
  {
    id: 'email-overage',
    name: 'Enterprise Email Provider Fees Beyond Included Allowance',
    description: 'Enterprise Google Workspace / Microsoft 365 seats beyond the included 3 domain mailboxes in Premium.',
    estimatedCostNgn: 0,
    frequency: 'Per User / Monthly (Optional)',
  },
  {
    id: 'payment-gateway',
    name: 'Online Payment Gateway Processing (Paystack / Flutterwave)',
    description: 'Merchant processing fees (typically 1.5% local transaction fee) for direct author online fee settlement.',
    estimatedCostNgn: 0,
    frequency: 'Per Transaction (Processor Deducted)',
  },
  {
    id: 'specialist-search',
    name: 'Specialist Search Services & External Paid APIs',
    description: 'Dedicated third-party enterprise search clusters (e.g. Algolia/Typesense Cloud) or external evaluation APIs if requested.',
    estimatedCostNgn: 0,
    frequency: 'Optional / Upon Request',
  },
];

export const thirdPartyPolicyStatement =
  'Third-party services are not activated without client approval. Where external provider fees apply, these will be disclosed separately before implementation. OnlineFirst does not bundle or hide third-party licensing obligations inside vague package wording.';

export const implementationMilestones = [
  {
    phase: 'Phase 1',
    title: 'Mobilization & Brand Finalization',
    duration: 'Week 1',
    description: 'Acceptance execution, 50% initial payment confirmation, client review of the 3 design concepts, and confirmation of core data items (domain, official emails, final board members).',
    deliverables: ['Signed Acceptance', 'Design Concept Finalization', 'Domain & Email Protocol Verification'],
  },
  {
    phase: 'Phase 2',
    title: 'Core Engineering & CMS Provisioning',
    duration: 'Week 2',
    description: 'Implementation of the selected design system, setup of the Admin CMS, deployment of the 26-topic taxonomy engine, and configuration of peer review workflow pages.',
    deliverables: ['Production Frontend Build', 'CMS Admin Deployment', '26 Taxonomies Engine'],
  },
  {
    phase: 'Phase 3',
    title: 'Maiden Edition Campaign & Content Seeding',
    duration: 'Week 3',
    description: 'Deployment of the interactive Maiden Call for Papers portal, submission mechanism configuration (OJS vs Integrated), fee structure activation with 30% discount logic, and editorial testing.',
    deliverables: ['Maiden CFP Portal', 'Submission Routing (Mode A/B)', 'Fee Discount Configuration'],
  },
  {
    phase: 'Phase 4',
    title: 'Client Training, Staging Review & Launch',
    duration: 'Week 4',
    description: 'Live staging review with CITN Umuahia and MOUAU COLMAS project leaders, hands-on editorial CMS training, production deployment, and project handover upon balance settlement.',
    deliverables: ['Live Staging Sign-Off', 'Editorial CMS Training', 'DNS Cutover & Public Launch'],
  },
];

export const thirdPartyCostsBreakdown = [
  {
    category: 'Included in OnlineFirst Packages',
    items: [
      'All UI/UX design concepts, responsive styling, and front-end engineering',
      'Production deployment, domain configuration, and SSL provisioning (Launch, Professional, Premium)',
      'Two (2) Years standard high-speed cloud hosting (Launch, Professional, Premium)',
      'Custom Admin CMS, publication management, and fee configuration tools (Professional, Premium)',
      '2-Year Domain + Hosting + Professional Email Package (Included in Premium)',
      'Source-code handover and complete digital asset ownership (All tiers)',
      'Maiden Edition digital campaign and Call for Papers UX execution (All tiers)',
      'Technical OJS setup advisory and JORMASS gateway architecture (Premium)',
    ],
  },
  {
    category: 'External / Third-Party Costs (Paid Directly to Issuing Bodies Upon Client Approval)',
    items: [
      'Crossref Annual Publisher Membership (approx. $275 USD/year for developing nations or institutional consortia)',
      'Crossref DOI Registration Charges (approx. $1.00 USD per registered journal article)',
      'Institutional Domain Registration / Renewal (.org.ng / .edu.ng usually ₦5,000 – ₦15,000/yr — standard included in Premium)',
      'Plagiarism Detection Software Licenses (e.g., Turnitin or iThenticate institutional account)',
      'Paid OJS plugins or commercial theme licenses (if proprietary modules are requested)',
      'Premium cloud storage expansions beyond standard allocation',
      'Email provider seats beyond the 3 included professional mailboxes in Premium',
      'Online payment gateway processor transaction fees (e.g., Paystack/Flutterwave standard 1.5%)',
      'Specialist search services or external commercial APIs (if requested)',
    ],
  },
];

export const deliveryRoadmapSteps = [
  {
    step: 'Phase 1: Mobilization & Brand Finalization',
    duration: 'Week 1',
    description: 'Acceptance execution, 50% initial payment confirmation, client review of the 3 design concepts, and confirmation of core data items (domain, official emails, final board members).',
  },
  {
    step: 'Phase 2: Core Engineering & CMS Provisioning',
    duration: 'Week 2',
    description: 'Implementation of the selected design system, setup of the Admin CMS, deployment of the 26-topic taxonomy engine, and configuration of peer review workflow pages.',
  },
  {
    step: 'Phase 3: Maiden Edition Campaign & Content Seeding',
    duration: 'Week 3',
    description: 'Deployment of the interactive Maiden Call for Papers portal, submission mechanism configuration (OJS vs Integrated), fee structure activation with 30% discount logic, and editorial testing.',
  },
  {
    step: 'Phase 4: Client Training, Staging Review & Launch',
    duration: 'Week 4',
    description: 'Live staging review with CITN Umuahia and MOUAU COLMAS project leaders, hands-on editorial CMS training, production deployment, and project handover upon balance settlement.',
  },
];
