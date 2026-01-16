"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Plus,
  ArrowUp,
  ChevronDown,
  Sparkles,
  PieChart,
  TrendingUp,
  Layers,
  ShieldAlert,
  GitBranch,
  LayoutGrid,
  BookOpen,
  Search,
  Sliders,
  FileText,
  Copy,
  FlaskConical,
  Puzzle,
  Link2,
  MapPin,
  Ban,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Domain chip data
interface DomainChip {
  id: string;
  label: string;
  prompt: string;
  disabled?: boolean;
}

// Primary domain chips (always visible)
const primaryDomains: DomainChip[] = [
  { id: "law", label: "Law", prompt: "Search campaign for Law — $60/day" },
  { id: "home-services", label: "Home Services", prompt: "Search campaign for Home Services — $40/day" },
  { id: "healthcare", label: "Healthcare", prompt: "Search campaign for Healthcare — $70/day" },
  { id: "real-estate", label: "Real Estate", prompt: "Search campaign for Real Estate — $50/day" },
];

// Extended domains (shown in More dropdown)
const extendedDomains: DomainChip[] = [
  { id: "finance", label: "Finance & Insurance", prompt: "Search campaign for Finance & Insurance — $50/day" },
  { id: "professional", label: "Professional Services", prompt: "Search campaign for Professional Services — $45/day" },
  { id: "b2b", label: "B2B Services", prompt: "Search campaign for B2B Services — $70/day" },
  { id: "education", label: "Education", prompt: "Search campaign for Education — $40/day" },
  { id: "hospitality", label: "Hospitality", prompt: "Search campaign for Hospitality — $60/day" },
  { id: "beauty", label: "Beauty & Wellness", prompt: "Search campaign for Beauty & Wellness — $45/day" },
  { id: "fitness", label: "Fitness", prompt: "Search campaign for Fitness — $40/day" },
  { id: "automotive", label: "Automotive", prompt: "Search campaign for Automotive — $50/day" },
  { id: "moving", label: "Moving & Logistics", prompt: "Search campaign for Moving & Logistics — $45/day" },
  { id: "events", label: "Events", prompt: "Search campaign for Events — $40/day" },
  { id: "nonprofit", label: "Non-profit", prompt: "Search campaign for Non-profit — $30/day" },
  { id: "ecommerce", label: "E-commerce (Soon)", prompt: "", disabled: true },
];

interface HeroProps {
  heading: string;
}

// Quick start feature cards - 18 features
interface QuickStartCard {
  title: string;
  description: string;
  icon: React.ElementType;
}

const quickStartCards: QuickStartCard[] = [
  {
    title: "AI Campaign Blueprint",
    description: "From a single prompt, generate a complete campaign plan: structure, keyword strategy, ads, and extensions — ready to review.",
    icon: Sparkles,
  },
  {
    title: "AI Budget Split",
    description: "Smart budget allocation across ad groups based on your business goal — not guesswork.",
    icon: PieChart,
  },
  {
    title: "Forecast Before You Build",
    description: "Preview demand and expected outcomes before committing to a build or sync.",
    icon: TrendingUp,
  },
  {
    title: "Smart Keyword Clustering",
    description: "Turn raw keywords into clean, high-intent ad groups with naming and logic that actually makes sense.",
    icon: Layers,
  },
  {
    title: "Negative Intelligence",
    description: "Auto-detect wasted spend, suggest negatives, and prevent ad groups from competing with each other.",
    icon: ShieldAlert,
  },
  {
    title: "Intent Funnel Mapping",
    description: "Automatically organize keywords by intent stage (TOFU/MOFU/BOFU) so your structure matches real user behavior.",
    icon: GitBranch,
  },
  {
    title: "Structure Builder",
    description: "Build the structure that fits the account — SKAG, STAG, themed, hybrid — in one click.",
    icon: LayoutGrid,
  },
  {
    title: "Structure Examples Library",
    description: "Prebuilt patterns with real examples you can copy, tweak, and deploy.",
    icon: BookOpen,
  },
  {
    title: "Long-Tail Discovery",
    description: "Surface high-intent long-tail queries you'd never find manually — built for performance and scale.",
    icon: Search,
  },
  {
    title: "Match Types Strategy",
    description: "Suggests exact/phrase/broad strategy per intent and risk level — with guardrails.",
    icon: Sliders,
  },
  {
    title: "Ad Copy Generator",
    description: "Generates RSAs aligned to each ad group's intent, including angles and messaging variety.",
    icon: FileText,
  },
  {
    title: "Ad Variations Builder",
    description: "Create multiple ad variations fast — without rewriting everything from scratch.",
    icon: Copy,
  },
  {
    title: "Ad A/B Testing",
    description: "Test ad variations cleanly across groups and compare winners without chaos.",
    icon: FlaskConical,
  },
  {
    title: "Extensions Generator",
    description: "Instantly generate sitelinks, callouts, structured snippets and more — consistent with the ad's promise.",
    icon: Puzzle,
  },
  {
    title: "Ad + Extension Alignment",
    description: "Automatically aligns headlines, descriptions, and extensions to keyword intent and targeting for tight relevance.",
    icon: Link2,
  },
  {
    title: "Smart Location Exclusions (Map)",
    description: "Exclude weak areas by map zones/radius so you stop paying for the wrong traffic.",
    icon: MapPin,
  },
  {
    title: "Smart Location Exclusions (Terms)",
    description: "Add negative location terms and geo-based exclusions that block irrelevant searches.",
    icon: Ban,
  },
  {
    title: "Demographic Fit & Routing",
    description: "Quickly tailor ads by age/gender/audience assumptions — and route to the right variant when needed.",
    icon: Users,
  },
];

// More Domains Dropdown
function MoreDomainsDropdown({
  isOpen,
  onClose,
  onSelect,
  anchorRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (domain: DomainChip) => void;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 rounded-[10px] border border-slate-200/80 bg-white shadow-sm"
    >
      <div className="max-h-72 overflow-y-auto p-1">
        {extendedDomains.map((domain) => (
          <button
            key={domain.id}
            onClick={() => {
              if (!domain.disabled) {
                onSelect(domain);
                onClose();
              }
            }}
            disabled={domain.disabled}
            title={domain.disabled ? "Coming soon" : undefined}
            className={cn(
              "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors",
              domain.disabled
                ? "cursor-not-allowed text-slate-300"
                : "text-slate-700 hover:bg-slate-50"
            )}
          >
            <span className="text-[13px] font-medium">{domain.label}</span>
            {domain.disabled && (
              <span className="text-[10px] font-medium uppercase tracking-wide text-slate-300">Soon</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// Domain Chip Component
function DomainChip({
  domain,
  onSelect,
}: {
  domain: DomainChip;
  onSelect: (domain: DomainChip) => void;
}) {
  return (
    <button
      onClick={() => onSelect(domain)}
      className="h-8 rounded-[8px] border border-slate-200/80 bg-white/60 px-3.5 text-[12px] font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-white active:border-slate-400"
    >
      {domain.label}
    </button>
  );
}

// Chat composer component
function ChatComposer({
  value,
  setValue,
  onSubmit,
  textareaRef,
}: {
  value: string;
  setValue: (v: string) => void;
  onSubmit: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSubmit();
      }
    },
    [onSubmit]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      const textarea = e.target;
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 220);
      textarea.style.height = `${newHeight}px`;
    },
    [setValue]
  );

  return (
    <div className="chat-composer mx-auto w-full max-w-[720px]">
      <div
        className={cn(
          "flex min-h-[104px] flex-col rounded-[12px] p-4 md:min-h-[116px] md:p-5",
          "border border-slate-200/70 bg-white",
          "shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]",
          "transition-all duration-150",
          isFocused && "border-slate-300/80 shadow-[0_2px_8px_0_rgba(0,0,0,0.06)]"
        )}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Build a Search campaign for [service] in [location]..."
          rows={2}
          className="no-scrollbar w-full resize-none overflow-hidden bg-transparent text-[15px] leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none md:text-[15px]"
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {/* Plus button */}
            <button
              type="button"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-slate-200/70 bg-white/80 transition-colors hover:bg-slate-50"
            >
              <Plus className="h-4 w-4 text-slate-400" />
            </button>

            {/* Google Ads connector badge */}
            <div className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-[8px] border border-slate-200/70 bg-white/80 px-2.5 transition-colors hover:bg-slate-50">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                <Image
                  src="/google ads logo.jpg"
                  alt="Google Ads"
                  width={20}
                  height={20}
                  className="h-5 w-5 rounded object-contain"
                />
              </span>
              <span className="text-[12px] font-medium text-slate-700 sm:text-[13px]">Google Ads</span>
            </div>
          </div>

          {/* Send button */}
          <button
            type="button"
            onClick={onSubmit}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-slate-900 text-white transition-colors hover:bg-slate-800"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Hero({ heading }: HeroProps) {
  const [inputValue, setInputValue] = useState("");
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleSubmit = useCallback(() => {
    if (inputValue.trim()) {
      console.log("Submitted:", inputValue);
    }
    router.push("/#pricing");
  }, [inputValue, router]);

  // Handle domain chip click - replace input and focus
  const handleDomainSelect = useCallback((domain: DomainChip) => {
    setInputValue(domain.prompt);
    // Focus the textarea after a short delay to ensure state is updated
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 10);
  }, []);

  return (
    <section className="relative -mt-14 bg-[#FAFAFA] px-4 pb-32 pt-44 sm:px-6 md:pb-40 md:pt-60 lg:px-8">
      {/* Main centered container */}
      <div className="mx-auto w-full max-w-[960px]">

        {/* Hero headline - centered, minimal */}
        <div className="mb-10 text-center md:mb-12">
          <h1
            className="mx-auto text-[30px] font-semibold leading-[1.15] tracking-[-0.02em] text-slate-900 sm:text-[36px] md:text-[42px]"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            {heading}
          </h1>
        </div>

        {/* Chat composer + domain chips - unified block */}
        <div className="flex flex-col items-center">
          {/* Chat composer */}
          <ChatComposer
            value={inputValue}
            setValue={setInputValue}
            onSubmit={handleSubmit}
            textareaRef={textareaRef}
          />

          {/* Domain chips - tight connection to input */}
          <div className="relative mt-3 flex max-w-[720px] flex-wrap items-center justify-center gap-2">
            {primaryDomains.map((domain) => (
              <DomainChip key={domain.id} domain={domain} onSelect={handleDomainSelect} />
            ))}
            <button
              ref={moreButtonRef}
              onClick={() => setShowMoreDropdown(!showMoreDropdown)}
              className="flex h-8 items-center gap-1 rounded-[8px] border border-slate-200/80 bg-white/60 px-3 text-[12px] font-medium text-slate-400 transition-all hover:border-slate-300 hover:bg-white hover:text-slate-500"
            >
              More
              <ChevronDown className={cn("h-3 w-3 transition-transform", showMoreDropdown && "rotate-180")} />
            </button>
            <MoreDomainsDropdown
              isOpen={showMoreDropdown}
              onClose={() => setShowMoreDropdown(false)}
              onSelect={handleDomainSelect}
              anchorRef={moreButtonRef}
            />
          </div>
        </div>

        {/* Features section - 18 cards, 2-column layout */}
        <div className="mx-auto mt-24 w-full max-w-[960px] md:mt-28">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Features
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {quickStartCards.map((card, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  className="group rounded-[12px] border border-slate-200/60 bg-white/40 p-4 text-left transition-all duration-150 hover:border-slate-300/80 hover:bg-white/70 hover:shadow-[0_2px_12px_0_rgba(0,0,0,0.05)]"
                >
                  <div className="flex gap-4">
                    {/* Image placeholder - mock screenshot area */}
                    <div className="h-20 w-28 shrink-0 overflow-hidden rounded-[8px] border border-slate-200/50 bg-gradient-to-br from-slate-100 to-slate-50">
                      <div className="flex h-full w-full items-center justify-center">
                        <div className="h-8 w-16 rounded-[4px] bg-slate-200/60" />
                      </div>
                    </div>
                    {/* Content */}
                    <div className="min-w-0 flex-1 py-0.5">
                      <h3 className="text-[14px] font-medium leading-tight text-slate-800">
                        {card.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-slate-500">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
