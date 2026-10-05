import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Circle,
  Clock,
  Compass,
  History,
  Home,
  MapPin,
  PhoneCall,
  Radio,
  Shield,
  ShieldAlert,
  Terminal,
  UserCheck,
  UserRound,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const DISCLAIMER =
  "ACADEMIC PROTOTYPE NOTICE: ResQ AI is an educational emergency-response decision support prototype. All AI triage predictions, responder telemetry, GPS coordinates, and dispatches are simulated. In a real emergency, immediately call official emergency services (911 / 112 / 108).";

export function BrandMark({
  compact = false,
  showTagline = true,
}: {
  compact?: boolean;
  showTagline?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 select-none" aria-label="ResQ AI Emergency Response">
      <div
        className={cn(
          "relative flex items-center justify-center rounded-md bg-navy text-white border border-slate-700/80 shadow-xs shrink-0 overflow-hidden",
          compact ? "size-9" : "size-10",
        )}
      >
        {/* Engineering CAD corner marks */}
        <div className="absolute top-0.5 left-0.5 size-1 border-t border-l border-emergency" />
        <div className="absolute bottom-0.5 right-0.5 size-1 border-b border-r border-emergency" />
        <ShieldAlert className={compact ? "size-5 text-emergency" : "size-5 text-emergency"} strokeWidth={2.5} />
      </div>

      <div className="leading-tight">
        <div className="flex items-center gap-1.5">
          <span className={cn("font-bold tracking-tight text-navy font-sans", compact ? "text-lg" : "text-xl")}>
            ResQ<span className="text-emergency font-extrabold">·AI</span>
          </span>
          <span className="rounded border border-slate-300 bg-slate-100 px-1 py-0.2 font-mono text-[9px] font-bold uppercase tracking-wider text-slate-700">
            CAD-DSS
          </span>
        </div>
        {showTagline && !compact ? (
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-medium">
            Report // Respond // Rescue
          </p>
        ) : null}
      </div>
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
  const [sysTime, setSysTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSysTime(
        now.toLocaleTimeString("en-GB", { hour12: false }) + " IST",
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-emergency selection:text-white">
      {/* Top Operational Status Bar */}
      <div className="bg-navy border-b border-slate-800 text-[11px] font-mono text-slate-300 px-4 sm:px-6 py-1.5">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CAD GATEWAY: ONLINE</span>
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
              <Compass className="size-3 text-slate-400" />
              <span>SECTOR 4 · METRO CENTRAL</span>
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-400">
              TELEMETRY: <span className="text-white">28.6139° N, 77.2090° E</span>
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-xs">
            <span className="text-slate-400">
              CLK: <span className="text-emerald-400 font-semibold">{sysTime || "LIVE"}</span>
            </span>
            <span className="text-slate-500">|</span>
            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-amber-300 font-mono">
              DEMO PROTOTYPE
            </span>
          </div>
        </div>
      </div>

      {/* Main Command Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-2xs">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/home" className="transition-opacity hover:opacity-90">
            <BrandMark compact />
          </Link>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link
              to="/home"
              activeProps={{ className: "border-navy text-navy font-bold bg-slate-50" }}
              inactiveProps={{ className: "border-transparent text-slate-600 hover:text-navy hover:bg-slate-50/70" }}
              className="flex items-center gap-2 border-b-2 px-3.5 py-2 rounded-t-sm transition-colors text-xs uppercase tracking-wider font-mono"
            >
              <Home className="size-4" />
              <span>Command Hub</span>
            </Link>
            <Link
              to="/history"
              activeProps={{ className: "border-navy text-navy font-bold bg-slate-50" }}
              inactiveProps={{ className: "border-transparent text-slate-600 hover:text-navy hover:bg-slate-50/70" }}
              className="flex items-center gap-2 border-b-2 px-3.5 py-2 rounded-t-sm transition-colors text-xs uppercase tracking-wider font-mono"
            >
              <History className="size-4" />
              <span>Incident Audit Log</span>
            </Link>
            <Link
              to="/profile"
              activeProps={{ className: "border-navy text-navy font-bold bg-slate-50" }}
              inactiveProps={{ className: "border-transparent text-slate-600 hover:text-navy hover:bg-slate-50/70" }}
              className="flex items-center gap-2 border-b-2 px-3.5 py-2 rounded-t-sm transition-colors text-xs uppercase tracking-wider font-mono"
            >
              <UserCheck className="size-4" />
              <span>Citizen Dossier // ICE</span>
            </Link>
          </nav>

          {/* Actions Bar */}
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                toast.info("Simulated Hotline Bridge: In an active life emergency, call 911 / 112 directly.")
              }
              className="hidden sm:inline-flex items-center gap-1.5 h-9 border-slate-300 text-xs font-mono font-semibold text-slate-700 hover:bg-slate-100 rounded-md"
            >
              <PhoneCall className="size-3.5 text-emergency" />
              <span>HOTLINE 112</span>
            </Button>

            <Button
              asChild
              size="sm"
              className="h-9 bg-emergency hover:bg-red-600 active:bg-red-700 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-xs rounded-md"
            >
              <Link to="/report">
                <ShieldAlert className="size-4" />
                <span>+ Log Incident</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Workspace Content */}
      <main
        className={cn(
          "flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8",
          showNav && "pb-24 md:pb-10",
          className,
        )}
      >
        {children}
      </main>

      {/* Technical Academic Footer */}
      <footer className="hidden md:block border-t border-slate-200 bg-white py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-navy">ResQ AI</span>
            <span>·</span>
            <span>Emergency Response Decision Support System (DSS) Prototype</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Student Final-Year Capstone Project</span>
            <span>·</span>
            <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600">
              BUILD // v2.6.4-CAD
            </span>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation Dock */}
      {showNav ? <BottomNav /> : null}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  category = "CAD // EMERGENCY DISPATCH",
  backTo = "/home",
}: {
  title: string;
  subtitle?: string;
  category?: string;
  backTo?: "/home" | "/report" | "/severity-result";
}) {
  return (
    <header className="mb-6 border-b border-slate-200 pb-4">
      <div className="flex items-start gap-3">
        <Button
          variant="outline"
          size="icon"
          asChild
          className="mt-0.5 size-8 shrink-0 rounded-md border-slate-300 bg-white text-slate-700 hover:bg-slate-100 shadow-2xs"
          aria-label="Return"
        >
          <Link to={backTo}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div className="min-w-0 flex-1">
          {category ? (
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emergency">
                {category}
              </span>
              <span className="text-slate-300">/</span>
              <span className="font-mono text-[10px] text-slate-400 uppercase">SYS_LOG</span>
            </div>
          ) : null}
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-navy">{title}</h1>
          {subtitle ? <p className="mt-0.5 text-xs sm:text-sm text-slate-600">{subtitle}</p> : null}
        </div>
      </div>
    </header>
  );
}

export function BottomNav() {
  const items = [
    { to: "/home" as const, label: "Command Hub", icon: Home },
    { to: "/history" as const, label: "Audit Log", icon: History },
    { to: "/profile" as const, label: "Citizen // ICE", icon: UserRound },
  ];
  return (
    <nav
      aria-label="Tactical Navigation"
      className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-xs backdrop-blur-md"
    >
      <div className="mx-auto grid h-14 max-w-md grid-cols-3 px-2">
        {items.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeProps={{ className: "text-emergency border-t-2 border-emergency font-bold" }}
            inactiveProps={{ className: "text-slate-500 hover:text-slate-800 border-t-2 border-transparent" }}
            className="flex flex-col items-center justify-center gap-1 font-mono text-[10px] uppercase tracking-wider transition-colors pt-1"
          >
            <Icon className="size-4" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function SafetyNote({ dark = false }: { dark?: boolean }) {
  return (
    <aside
      role="note"
      className={cn(
        "rounded-md border p-3 text-xs leading-relaxed text-left font-sans",
        dark
          ? "border-slate-800 bg-slate-900/90 text-slate-300"
          : "border-amber-200 bg-amber-50/70 text-slate-700",
      )}
    >
      <div className="flex items-start gap-2.5">
        <AlertTriangle
          className={cn("size-4 shrink-0 mt-0.5", dark ? "text-amber-400" : "text-amber-600")}
        />
        <div>
          <p
            className={cn(
              "font-mono font-bold uppercase tracking-wider text-[10px]",
              dark ? "text-amber-400" : "text-amber-800",
            )}
          >
            ACADEMIC PROTOTYPE NOTICE // NOT A REPLACEMENT FOR 911 / 112
          </p>
          <p className="mt-0.5 text-[11px] leading-relaxed">
            ResQ AI is an educational computer-aided emergency response & decision-support prototype.
            All triage severity calculations, unit telemetry, hospital routing, and response tracking
            are simulated. In any real life-threatening emergency, immediately call official emergency
            numbers (911 / 112 / 108).
          </p>
        </div>
      </div>
    </aside>
  );
}

export function SeverityBadge({
  severity,
}: {
  severity: "Critical" | "High" | "Moderate" | string;
}) {
  const isCritical = severity.toLowerCase() === "critical";
  const isHigh = severity.toLowerCase() === "high";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[11px] font-mono font-bold uppercase tracking-wider border",
        isCritical
          ? "bg-red-50 text-red-700 border-red-300"
          : isHigh
            ? "bg-amber-50 text-amber-800 border-amber-300"
            : "bg-blue-50 text-blue-800 border-blue-300",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          isCritical ? "bg-red-600 animate-pulse" : isHigh ? "bg-amber-600" : "bg-blue-600",
        )}
      />
      {isCritical ? "ESI-1 // CRITICAL" : isHigh ? "ESI-2 // HIGH" : "ESI-3 // MODERATE"}
    </span>
  );
}

export function StatusTimeline({
  items,
}: {
  items: Array<{ label: string; complete: boolean; active?: boolean; time?: string }>;
}) {
  return (
    <ol className="space-y-0 text-xs font-mono">
      {items.map((item, index) => (
        <li key={item.label} className="flex gap-3">
          <div className="flex flex-col items-center">
            <span
              className={cn(
                "grid size-5 shrink-0 place-items-center rounded-sm text-[10px] font-bold transition-colors border",
                item.complete
                  ? "bg-emerald-600 border-emerald-700 text-white"
                  : item.active
                    ? "bg-emergency border-red-700 text-white animate-pulse"
                    : "border-slate-300 bg-slate-100 text-slate-400",
              )}
            >
              {item.complete ? (
                <Check className="size-3" strokeWidth={3} />
              ) : item.active ? (
                <Radio className="size-2.5" />
              ) : (
                <Circle className="size-1.5" fill="currentColor" />
              )}
            </span>
            {index < items.length - 1 ? (
              <span
                className={cn("h-6 w-0.5", item.complete ? "bg-emerald-500" : "bg-slate-200")}
              />
            ) : null}
          </div>
          <div className="pt-0.5 pb-2">
            <p
              className={cn(
                "font-semibold text-xs leading-none",
                item.complete || item.active ? "text-slate-900" : "text-slate-500",
              )}
            >
              {item.label}
            </p>
            {item.time ? (
              <p className="mt-1 text-[10px] font-mono text-slate-400">{item.time}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function TacticalCard({
  title,
  badge,
  children,
  className,
}: {
  title: string;
  badge?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-md border border-slate-200 bg-white overflow-hidden shadow-2xs", className)}>
      <header className="border-b border-slate-200 bg-slate-50/80 px-3.5 py-2.5 flex items-center justify-between">
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-emergency" />
          <span>{title}</span>
        </h3>
        {badge ? (
          <span className="font-mono text-[10px] font-semibold text-slate-500 bg-slate-200/70 rounded px-1.5 py-0.2">
            {badge}
          </span>
        ) : null}
      </header>
      <div className="p-3.5 sm:p-4">{children}</div>
    </section>
  );
}
