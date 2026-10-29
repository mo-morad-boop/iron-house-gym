import { config } from "@/lib/config";
import { DumbbellIcon } from "./Icons";

export default function Logo({ href = "#home", className = "" }) {
  const { name, highlight, sub } = config.brand;
  const first = name.replace(highlight, "").trim();
  return (
    <a href={href} aria-label={`${name} ${sub}`} className={`flex items-center gap-3 ${className}`}>
      <DumbbellIcon className="h-6 w-12 text-brand" />
      <span className="flex flex-col font-display uppercase leading-none" dir="ltr">
        <span className="text-2xl font-bold tracking-wide">{first}</span>
        <span className="text-2xl font-bold tracking-wide text-brand">{highlight}</span>
        <span className="mt-1 text-[11px] tracking-[0.45em] text-muted">{sub}</span>
      </span>
    </a>
  );
}