import { Link, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  Circle,
  Clock3,
  History,
  Home,
  ShieldPlus,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const DISCLAIMER =
  "ResQ AI is a prototype decision-support system and does not replace professional emergency services.";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3" aria-label="ResQ AI">
      <span className={cn("grid place-items-center rounded-lg bg-emergency text-emergency-foreground shadow-emergency", compact ? "size-9" : "size-12")}> 
        <ShieldPlus className={compact ? "size-5" : "size-7"} strokeWidth={2.4} />
      </span>
      <span className={cn("font-display font-bold text-primary", compact ? "text-lg" : "text-2xl")}>ResQ <span className="text-emergency">AI</span></span>
    </div>
  );
}

export function AppFrame({
  children,
  showNav = false,
  className,
}: {
  children: ReactNode;
  showNav?: boolean;
  className?: string;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className={cn("mx-auto min-h-screen w-full max-w-6xl px-4 pb-10 pt-5 sm:px-6 lg:px-8", showNav && "pb-28", className)}>
        {children}
      </main>
      {showNav ? <BottomNav /> : null}
    </div>
  );
}

export function PageHeader({ title, subtitle, backTo = "/home" }: { title: string; subtitle?: string; backTo?: "/home" | "/report" | "/severity-result" }) {
  return (
    <header className="mb-7 flex items-start gap-4">
      <Button variant="outline" size="icon" asChild className="mt-0.5 shrink-0 rounded-full shadow-none" aria-label="Go back">
        <Link to={backTo}><ArrowLeft /></Link>
      </Button>
      <div>
        <h1 className="font-display text-2xl font-bold text-primary sm:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
    </header>
  );
}

export function BottomNav() {
  const items = [
    { to: "/home" as const, label: "Home", icon: Home },
    { to: "/history" as const, label: "History", icon: History },
    { to: "/profile" as const, label: "Profile", icon: UserRound },
  ];
  return (
    <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] shadow-nav backdrop-blur">
      <div className="mx-auto grid h-18 max-w-md grid-cols-3 px-3">
        {items.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeProps={{ className: "text-emergency" }}
            inactiveProps={{ className: "text-muted-foreground" }}
            className="flex flex-col items-center justify-center gap-1 text-xs font-semibold transition-colors"
          >
            <Icon className="size-5" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function SafetyNote({ dark = false }: { dark?: boolean }) {
  return <p className={cn("mx-auto max-w-xl text-center text-xs leading-relaxed", dark ? "text-primary-foreground/65" : "text-muted-foreground")}>{DISCLAIMER}</p>;
}

export function StatusTimeline({ items }: { items: Array<{ label: string; complete: boolean; active?: boolean }> }) {
  return (
    <ol className="space-y-0">
      {items.map((item, index) => (
        <li key={item.label} className="flex gap-3">
          <div className="flex flex-col items-center">
            <span className={cn("grid size-7 shrink-0 place-items-center rounded-full border-2", item.complete ? "border-success bg-success text-success-foreground" : item.active ? "border-emergency bg-emergency-soft text-emergency" : "border-border bg-background text-muted-foreground")}>
              {item.complete ? <Check className="size-4" strokeWidth={3} /> : item.active ? <Clock3 className="size-3.5" /> : <Circle className="size-2.5" fill="currentColor" />}
            </span>
            {index < items.length - 1 ? <span className={cn("h-8 w-0.5", item.complete ? "bg-success" : "bg-border")} /> : null}
          </div>
          <span className={cn("pt-1 text-sm font-medium", item.complete || item.active ? "text-foreground" : "text-muted-foreground")}>{item.label}</span>
        </li>
      ))}
    </ol>
  );
}

export function useBack() {
  const router = useRouter();
  return () => router.history.back();
}