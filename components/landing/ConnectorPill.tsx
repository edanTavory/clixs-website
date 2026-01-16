"use client";

import Image from "next/image";

interface ConnectorPillProps {
  name: string;
  iconSrc: string;
  status: string;
  statusColor?: "green" | "yellow" | "red";
}

export function ConnectorPill({
  name,
  iconSrc,
  status,
  statusColor = "green",
}: ConnectorPillProps) {
  const statusColorClass = {
    green: "bg-emerald-500",
    yellow: "bg-amber-500",
    red: "bg-red-500",
  }[statusColor];

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1.5 text-xs text-slate-700 shadow-sm backdrop-blur">
      <Image
        src={iconSrc}
        alt={name}
        width={14}
        height={14}
        className="h-3.5 w-3.5 opacity-90"
      />
      <span className="font-medium">{name}</span>
      <span className="text-slate-300">•</span>
      <span className="inline-flex items-center gap-1">
        <span className={`h-1.5 w-1.5 rounded-full ${statusColorClass}`} />
        <span className="text-slate-600">{status}</span>
      </span>
    </div>
  );
}
