"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface NavDropdownProps {
  label: string;
  /** Rendered inside the dropdown panel — panel width/layout is up to the caller. */
  children: ReactNode;
  /** Panel width class, e.g. "w-64" or "w-[36rem]". Defaults to a single-column width. */
  panelClassName?: string;
}

/**
 * Desktop nav item that opens a panel of related links on click, instead of
 * navigating directly — used for "Weather" (destinations) and "Guides"
 * (categories) in Header.tsx, which each have enough sub-pages to be worth
 * surfacing one level up rather than making people land on an index page
 * first. Follows the same click-toggle + click-outside-to-close pattern as
 * LanguageSelector.tsx for consistency with the rest of the header.
 */
export function NavDropdown({ label, children, panelClassName = "w-64" }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
      >
        {label}
        <ChevronDown
          size={15}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div
          className={`absolute left-0 z-40 mt-2 overflow-hidden rounded-xl2 border border-slate-200 bg-white p-4 shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle ${panelClassName}`}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}
