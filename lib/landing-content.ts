import {
  Zap,
  Shield,
  BarChart3,
  Clock,
  MousePointerClick,
  FileText,
  Settings,
  Eye,
  Target,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Layers,
} from "lucide-react";

// Navigation
export const navLinks = [
  { label: "Product", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

// Hero
export const heroContent = {
  heading: "The campaign builder for PPC teams",
  subheading:
    "Draft first, launch with confidence. Full control over your Google Ads campaigns.",
  inputPlaceholder: "Describe your campaign...",
};

// Social Proof
export const socialProofContent = {
  text: "Built for agencies and in-house teams who value control",
  stats: [
    { value: "Draft first", label: "Review before launch" },
    { value: "Full control", label: "Over every detail" },
    { value: "No lock-in", label: "Export anytime" },
  ],
};

// Problems
export const problemsContent = [
  {
    icon: AlertTriangle,
    title: "Complex interfaces",
    description:
      "Google Ads Editor and the web UI are powerful but overwhelming. Too many options, too many clicks.",
  },
  {
    icon: Clock,
    title: "Time-consuming setup",
    description:
      "Building campaigns from scratch takes hours. Keyword research, ad copy, extensions—it all adds up.",
  },
  {
    icon: XCircle,
    title: "Risky live edits",
    description:
      "Making changes directly in Google Ads means mistakes go live immediately. No staging, no review.",
  },
];

// Solutions
export const solutionsContent = [
  {
    icon: FileText,
    title: "Draft-first workflow",
    description:
      "Build your entire campaign as a draft. Review keywords, ads, and settings before anything touches Google Ads.",
  },
  {
    icon: Zap,
    title: "Fast campaign creation",
    description:
      "Structured forms guide you through setup. What used to take hours now takes minutes.",
  },
  {
    icon: Eye,
    title: "Full preview before launch",
    description:
      "See exactly what will be created. Approve or edit anything before syncing to your Google Ads account.",
  },
];

// Demo
export const demoContent = {
  heading: "See how it works",
  subheading:
    "Watch a quick walkthrough of the campaign creation process",
  bullets: [
    "Create campaigns with guided forms",
    "Build ad groups and keywords in bulk",
    "Preview everything before sync",
    "Push to Google Ads with one click",
  ],
};

// Features
export const featuresContent = [
  {
    icon: FileText,
    title: "Draft campaigns",
    description:
      "Build complete campaigns offline. Review and refine before going live.",
  },
  {
    icon: Layers,
    title: "Bulk operations",
    description:
      "Add keywords, ads, and extensions in bulk. Paste from spreadsheets or type directly.",
  },
  {
    icon: Eye,
    title: "Full preview",
    description:
      "See exactly what will be created in Google Ads before you sync.",
  },
  {
    icon: MousePointerClick,
    title: "One-click sync",
    description:
      "Push approved campaigns to Google Ads instantly. No copy-paste, no exports.",
  },
  {
    icon: Settings,
    title: "All campaign settings",
    description:
      "Bidding, targeting, schedules, networks—configure everything in one place.",
  },
  {
    icon: BarChart3,
    title: "Performance data",
    description:
      "View clicks, impressions, and conversions directly in Clixs after sync.",
  },
  {
    icon: Shield,
    title: "Secure connection",
    description:
      "OAuth 2.0 authentication. We never store your Google Ads credentials.",
  },
  {
    icon: Target,
    title: "Multiple accounts",
    description:
      "Manage campaigns across different Google Ads accounts from one dashboard.",
  },
];

// How it works
export const howItWorksContent = [
  {
    number: 1,
    title: "Connect your account",
    description:
      "Link your Google Ads account with secure OAuth. Takes 30 seconds.",
  },
  {
    number: 2,
    title: "Build your campaign",
    description:
      "Use guided forms to create campaigns, ad groups, keywords, and ads as drafts.",
  },
  {
    number: 3,
    title: "Review and launch",
    description:
      "Preview everything, make adjustments, then sync to Google Ads with one click.",
  },
];

// Integrations
export const integrationsContent = {
  heading: "Integrations",
  subheading: "Connect your advertising accounts",
  current: [
    {
      name: "Google Ads",
      description: "Full support for Search campaigns",
      isAvailable: true,
    },
  ],
  comingSoon: [
    {
      name: "Microsoft Ads",
      description: "Bing Search campaigns",
      isAvailable: false,
    },
    {
      name: "Meta Ads",
      description: "Facebook & Instagram",
      isAvailable: false,
    },
    {
      name: "LinkedIn Ads",
      description: "B2B advertising",
      isAvailable: false,
    },
  ],
};

// Pricing
export const pricingContent = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "For individuals testing Clixs",
    features: [
      "1 Google Ads account",
      "5 draft campaigns",
      "Basic support",
      "Community access",
    ],
    ctaText: "Start free",
    ctaHref: "#",
    isPopular: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For freelancers and small teams",
    features: [
      "5 Google Ads accounts",
      "Unlimited draft campaigns",
      "Bulk operations",
      "Priority support",
      "Performance data sync",
    ],
    ctaText: "Start free trial",
    ctaHref: "#",
    isPopular: true,
  },
  {
    name: "Agency",
    price: "$149",
    period: "/month",
    description: "For agencies managing multiple clients",
    features: [
      "Unlimited Google Ads accounts",
      "Unlimited draft campaigns",
      "Team collaboration",
      "Client workspaces",
      "Dedicated support",
      "Custom onboarding",
    ],
    ctaText: "Contact sales",
    ctaHref: "#",
    isPopular: false,
  },
];

// FAQ
export const faqContent = [
  {
    question: "What is Clixs?",
    answer:
      "Clixs is a campaign builder for Google Ads. It lets you create Search campaigns using a draft-first workflow—build everything offline, review it, then sync to Google Ads when ready.",
  },
  {
    question: "How does the draft-first workflow work?",
    answer:
      "Instead of making changes directly in Google Ads, you build campaigns as drafts in Clixs. You can review keywords, ad copy, settings, and more before anything goes live. When you're happy, sync to Google Ads with one click.",
  },
  {
    question: "Is my Google Ads account secure?",
    answer:
      "Yes. We use OAuth 2.0 for authentication—the industry standard. We never see or store your Google Ads password. You can revoke access anytime from your Google account settings.",
  },
  {
    question: "What campaign types are supported?",
    answer:
      "Currently, Clixs supports Google Search campaigns. This includes text ads, responsive search ads, keywords, negative keywords, ad extensions, and all standard campaign settings.",
  },
  {
    question: "Can I use Clixs with multiple Google Ads accounts?",
    answer:
      "Yes. On Pro and Agency plans, you can connect multiple Google Ads accounts and switch between them. This is ideal for agencies or businesses with separate accounts.",
  },
  {
    question: "What happens to my campaigns if I cancel?",
    answer:
      "Campaigns you've synced to Google Ads remain in your Google Ads account—they're not affected. Draft campaigns in Clixs will be retained for 30 days after cancellation.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes. If you're not satisfied within the first 14 days of a paid plan, contact us for a full refund. No questions asked.",
  },
  {
    question: "How is this different from Google Ads Editor?",
    answer:
      "Google Ads Editor is powerful but complex. Clixs provides a simpler, guided experience focused on campaign creation. Think of it as a streamlined front-end for building campaigns before they touch your account.",
  },
];

// Footer
export const footerContent = {
  columns: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Integrations", href: "#integrations" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Help Center", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Status", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
      ],
    },
  ],
  copyright: "2025 Clixs. All rights reserved.",
};

// Final CTA
export const finalCtaContent = {
  heading: "Ready to streamline your campaign workflow?",
  subheading:
    "Start building Google Ads campaigns the easier way. Draft first, launch with confidence.",
  primaryCTA: { text: "Start free", href: "#pricing" },
  secondaryCTA: { text: "Watch demo", href: "#demo" },
};
