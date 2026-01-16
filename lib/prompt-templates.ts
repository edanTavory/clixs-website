// Prompt Templates for Quick Actions
// These templates are used in the Hero section chips

export interface PromptTemplate {
  id: string;
  label: string;
  template: string;
  category?: "campaign" | "keywords" | "ads" | "review" | "other";
}

// Primary templates (shown as chips)
export const primaryTemplates: PromptTemplate[] = [
  {
    id: "new-campaign",
    label: "New campaign",
    template: "Build a Google Search campaign for [business type] in [city], budget $[amount]/day. Optimize for leads.",
    category: "campaign",
  },
  {
    id: "add-keywords",
    label: "Add keywords",
    template: "Generate keyword groups for [service] in [location]. Include negatives and match types.",
    category: "keywords",
  },
  {
    id: "write-ad-copy",
    label: "Write ad copy",
    template: "Write RSA headlines/descriptions for [service], emphasize [USP], include 6 sitelinks ideas.",
    category: "ads",
  },
  {
    id: "review-draft",
    label: "Review draft",
    template: "Review my draft: check structure, targeting, keywords, ads, and policy risks. Suggest fixes.",
    category: "review",
  },
];

// Extended templates (shown in "More" dropdown)
export const extendedTemplates: PromptTemplate[] = [
  {
    id: "negative-keywords",
    label: "Negative keywords",
    template: "Generate comprehensive negative keyword lists for [industry/service] to block irrelevant traffic.",
    category: "keywords",
  },
  {
    id: "location-targeting",
    label: "Location targeting",
    template: "Set up location targeting for [business] serving [areas]. Include radius targeting recommendations.",
    category: "campaign",
  },
  {
    id: "budget-optimization",
    label: "Budget optimization",
    template: "Analyze and recommend budget allocation for [campaign type] with $[total budget] monthly goal.",
    category: "campaign",
  },
  {
    id: "ad-extensions",
    label: "Ad extensions",
    template: "Create sitelinks, callouts, and structured snippets for [business type] highlighting [key benefits].",
    category: "ads",
  },
  {
    id: "competitor-analysis",
    label: "Competitor analysis",
    template: "Analyze competitor keywords and ad copy for [industry] in [market]. Suggest differentiation strategies.",
    category: "keywords",
  },
  {
    id: "landing-page-review",
    label: "Landing page review",
    template: "Review landing page at [URL] for Google Ads quality score optimization. Suggest improvements.",
    category: "review",
  },
  {
    id: "conversion-tracking",
    label: "Conversion tracking",
    template: "Set up conversion tracking for [goal type: calls/forms/purchases] with proper attribution.",
    category: "campaign",
  },
  {
    id: "audience-targeting",
    label: "Audience targeting",
    template: "Define audience segments for [product/service] including demographics, interests, and remarketing lists.",
    category: "campaign",
  },
  {
    id: "rsa-variations",
    label: "RSA variations",
    template: "Create 15 headline and 4 description variations for RSA promoting [offer] to [target audience].",
    category: "ads",
  },
  {
    id: "campaign-structure",
    label: "Campaign structure",
    template: "Design campaign structure for [business] with [number] services. Recommend ad groups and naming conventions.",
    category: "campaign",
  },
  {
    id: "bid-strategy",
    label: "Bid strategy",
    template: "Recommend bidding strategy for [campaign goal] with [budget] budget and [CPA/ROAS] target.",
    category: "campaign",
  },
  {
    id: "policy-check",
    label: "Policy check",
    template: "Check if my [industry] ads comply with Google Ads policies. Flag potential issues and suggest fixes.",
    category: "review",
  },
];

// All templates combined
export const allTemplates: PromptTemplate[] = [...primaryTemplates, ...extendedTemplates];
