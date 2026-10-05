import { Link, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Ambulance,
  ArrowRight,
  Bell,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  Cpu,
  Download,
  FileBadge,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Filter,
  Flame,
  HardDrive,
  HeartPulse,
  Hospital,
  Info,
  KeyRound,
  Layers,
  Locate,
  LocateFixed,
  Lock,
  LogOut,
  MapPin,
  Mic,
  Navigation,
  Phone,
  PhoneCall,
  Printer,
  Radio,
  Search,
  Share2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Sliders,
  Sparkles,
  Stethoscope,
  Terminal,
  Upload,
  User,
  UserCheck,
  Users,
  Volume2,
  Wifi,
} from "lucide-react";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  AppFrame,
  BrandMark,
  PageHeader,
  SafetyNote,
  SeverityBadge,
  StatusTimeline,
  TacticalCard,
} from "@/components/resq-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  type EmergencyProfile,
  type EmergencyReport,
  type EmergencyType,
  emergencyProfiles,
  fallbackReport,
  historyItems,
  REPORT_STORAGE_KEY,
} from "@/lib/resq-data";

function getReport(): EmergencyReport {
  if (typeof window === "undefined") return fallbackReport;
  try {
    const value = window.localStorage.getItem(REPORT_STORAGE_KEY);
    return value ? (JSON.parse(value) as EmergencyReport) : fallbackReport;
  } catch {
    return fallbackReport;
  }
}

/* =========================================================================
   1. SPLASH SCREEN: Tactical CAD Diagnostic & Subsystem Boot
   ========================================================================= */
export function SplashPage() {
  const navigate = useNavigate();
  const [initStep, setInitStep] = useState(0);
  const [sysLog, setSysLog] = useState<string[]>([
    "INITIALIZING RESQ AI CAD-DSS KERNEL v2.6.4...",
  ]);

  const bootSequence = useMemo(
    () => [
      { pct: 25, log: "[OK] GEOLOCATION SUBSYSTEM LOCKED (LAT 28.6139° N, LON 77.2090° E)" },
      { pct: 55, log: "[OK] RESQ NLP TRIAGE MATRIX CORE LOADED (ESI CLASSIFIER READY)" },
      { pct: 85, log: "[OK] CAD SECTOR FLEET MESH CONNECTED (3 AMBULANCES, 2 FIRE, 4 POLICE)" },
      { pct: 100, log: "[READY] DISPATCH GATEWAY SYNCHRONIZED. OPENING SECURE PORTAL..." },
    ],
    [],
  );

  useEffect(() => {
    const t1 = setTimeout(() => {
      setInitStep(1);
      setSysLog((prev) => [...prev, bootSequence[0].log]);
    }, 450);

    const t2 = setTimeout(() => {
      setInitStep(2);
      setSysLog((prev) => [...prev, bootSequence[1].log]);
    }, 1000);

    const t3 = setTimeout(() => {
      setInitStep(3);
      setSysLog((prev) => [...prev, bootSequence[2].log]);
    }, 1600);

    const t4 = setTimeout(() => {
      setInitStep(4);
      setSysLog((prev) => [...prev, bootSequence[3].log]);
    }, 2200);

    const tFinal = setTimeout(() => {
      navigate({ to: "/login" });
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(tFinal);
    };
  }, [navigate, bootSequence]);

  const currentPct = initStep === 0 ? 10 : bootSequence[initStep - 1].pct;

  return (
    <div className="relative min-h-screen bg-navy text-white flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden cad-grid-dark font-sans">
      {/* Top Header telemetry */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-slate-200">RESQ·AI CAD KERNEL v2.6.4</span>
        </div>
        <div className="hidden sm:block text-slate-500">
          NODE: DEL-METRO-04 // PROTOCOL: ESI-TRIAGE
        </div>
        <div className="text-emerald-400 font-semibold">STATUS: BOOT_TESTING</div>
      </div>

      {/* Central Diagnostic Hub */}
      <div className="mx-auto w-full max-w-lg my-auto py-8">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 inline-flex items-center justify-center size-16 rounded-md bg-slate-900 border border-slate-700 text-emergency shadow-sm">
            <ShieldAlert className="size-9 text-emergency" strokeWidth={2.4} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-sans">
            ResQ<span className="text-emergency">·AI</span>
          </h1>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-slate-400">
            Emergency Response & Decision Support System
          </p>
          <div className="mt-2 inline-flex items-center gap-2 rounded border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-[11px] font-mono text-amber-300">
            <span>Student Final-Year Capstone Project</span>
            <span>·</span>
            <span>Simulation Demo</span>
          </div>
        </div>

        {/* Live Diagnostics Terminal Box */}
        <div className="rounded-md border border-slate-800 bg-slate-950 p-4 font-mono text-xs shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <Terminal className="size-3.5 text-emerald-400" />
              <span>SUBSYSTEM DIAGNOSTICS</span>
            </span>
            <span className="font-bold text-emerald-400">{currentPct}%</span>
          </div>

          <Progress
            value={currentPct}
            className="h-1.5 bg-slate-900 [&>div]:bg-emergency rounded-none transition-all duration-300 mb-3.5"
          />

          <div className="space-y-1.5 min-h-[96px] text-[11px]">
            {sysLog.map((log) => (
              <p
                key={log}
                className={
                  log.startsWith("[OK]")
                    ? "text-emerald-400 font-medium"
                    : log.startsWith("[READY]")
                      ? "text-amber-300 font-bold"
                      : "text-slate-400"
                }
              >
                {log}
              </p>
            ))}
          </div>
        </div>

        {/* Quick Launch Skip */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate({ to: "/login" })}
            className="font-mono text-xs text-slate-400 hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
          >
            Skip Diagnostics // Direct Access →
          </button>
        </div>
      </div>

      {/* Academic Safety Note */}
      <div className="mx-auto w-full max-w-xl">
        <SafetyNote dark />
      </div>
    </div>
  );
}

/* =========================================================================
   2. LOGIN SCREEN: Secure Emergency Access & Role Selection
   ========================================================================= */
export function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"citizen" | "responder">("citizen");
  const [email, setEmail] = useState("ritika@example.com");
  const [password, setPassword] = useState("••••••••••••");
  const [badgeId, setBadgeId] = useState("EMS-402");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success(
        role === "citizen"
          ? "Authenticated: Citizen ID #RQ-8821 (Ritika Sen)"
          : "Duty Station Authenticated: Officer K. Sharma (EMS Unit 104)",
      );
      navigate({ to: "/home" });
    }, 400);
  };

  const handleQuickDemo = (targetRole: "citizen" | "responder") => {
    setRole(targetRole);
    if (targetRole === "citizen") {
      setEmail("ritika@example.com");
      setPassword("ResQ2026Secure!");
      toast.info("Citizen Demo Credentials Loaded: Ritika Sen (#RQ-8821)");
    } else {
      setBadgeId("EMS-402");
      setPassword("DutyStation2026!");
      toast.info("Responder Demo Credentials Loaded: Paramedic Lead (#EMS-402)");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between py-8 px-4 sm:px-6 antialiased">
      {/* Top Banner */}
      <div className="mx-auto w-full max-w-md flex items-center justify-between border-b border-slate-200 pb-3 text-xs font-mono text-slate-500">
        <span className="font-bold text-navy flex items-center gap-1.5">
          <ShieldAlert className="size-4 text-emergency" />
          <span>RESQ AI EMERGENCY PORTAL</span>
        </span>
        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600 font-semibold">
          SECURE DISPATCH
        </span>
      </div>

      {/* Main Authentication Card */}
      <div className="mx-auto w-full max-w-md my-auto pt-6 pb-8">
        <div className="border border-slate-200 bg-white rounded-md p-6 shadow-xs">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex justify-center mb-2">
              <BrandMark compact={false} showTagline={false} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-navy">
              Emergency Incident Access
            </h1>
            <p className="mt-1 text-xs text-slate-500 font-mono">
              Authenticate to report incidents or view real-time CAD dispatch
            </p>
          </div>

          {/* Role Selector Tabs */}
          <div className="grid grid-cols-2 gap-1.5 rounded-md bg-slate-100 p-1 mb-5 font-mono text-xs">
            <button
              type="button"
              onClick={() => handleQuickDemo("citizen")}
              className={`py-2 px-3 rounded-sm font-semibold transition-all ${
                role === "citizen"
                  ? "bg-white text-navy shadow-2xs font-bold border border-slate-200"
                  : "text-slate-600 hover:text-navy"
              }`}
            >
              Citizen Reporter
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("responder")}
              className={`py-2 px-3 rounded-sm font-semibold transition-all ${
                role === "responder"
                  ? "bg-white text-navy shadow-2xs font-bold border border-slate-200"
                  : "text-slate-600 hover:text-navy"
              }`}
            >
              Duty Responder
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {role === "citizen" ? (
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Citizen Mobile / Email ID
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ritika@example.com"
                    className="h-10 pl-9 font-sans text-sm rounded-md border-slate-300"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Responder Badge ID // Callsign
                </label>
                <div className="relative">
                  <HardDrive className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <Input
                    required
                    value={badgeId}
                    onChange={(e) => setBadgeId(e.target.value)}
                    placeholder="EMS-402"
                    className="h-10 pl-9 font-mono text-sm uppercase rounded-md border-slate-300"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Password // Access PIN
                </label>
                <button
                  type="button"
                  onClick={() => toast.info("Demo Mode: Use quick access buttons below.")}
                  className="text-xs font-medium text-emergency hover:underline font-mono text-[11px]"
                >
                  Forgot PIN?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter PIN"
                  className="h-10 pl-9 font-mono text-sm rounded-md border-slate-300"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-navy hover:bg-slate-800 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-md mt-2 shadow-xs"
            >
              {loading ? "Authenticating CAD Session..." : "Authorize Access →"}
            </Button>
          </form>

          {/* Fast Track Quick-Demo Buttons */}
          <div className="mt-5 border-t border-slate-200 pt-4 space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 text-center font-bold">
              Rapid Demo Sandbox Access
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("citizen")}
                className="flex items-center justify-center gap-1.5 p-2 rounded border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 text-left font-mono text-[11px] text-slate-700 transition-colors"
              >
                <UserCheck className="size-3.5 text-navy" />
                <span>Load Ritika Sen</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("responder")}
                className="flex items-center justify-center gap-1.5 p-2 rounded border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 text-left font-mono text-[11px] text-slate-700 transition-colors"
              >
                <Ambulance className="size-3.5 text-emergency" />
                <span>Load EMS-402</span>
              </button>
            </div>
          </div>
        </div>

        {/* Prototype compliance note */}
        <div className="mt-5">
          <SafetyNote />
        </div>
      </div>

      {/* Footer Info */}
      <div className="mx-auto w-full max-w-md text-center text-xs font-mono text-slate-400">
        ResQ AI Prototype // B.Tech Final Year Evaluation
      </div>
    </div>
  );
}

/* =========================================================================
   3. DASHBOARD / HOME SCREEN: Incident Command Center Hub
   ========================================================================= */
export function HomePage() {
  const navigate = useNavigate();
  const [sosActive, setSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(5);
  const [activeIncident] = useState<EmergencyReport | null>(getReport());
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);

  // Quick Action Protocols
  const protocols = [
    {
      id: "cpr",
      name: "Adult CPR Protocol",
      steps: [
        "Check responsiveness and clear immediate hazards.",
        "Call emergency services immediately (112 / 911).",
        "Place hands center of chest. Push hard and fast (100-120 bpm, 2 inches deep).",
        "Allow full chest recoil between compressions. Continue until ALS arrives.",
      ],
    },
    {
      id: "bleeding",
      name: "Severe Hemorrhage Control",
      steps: [
        "Apply direct firm pressure with clean cloth or sterile gauze.",
        "Do not remove soaked cloth; add more layers on top.",
        "Elevate injury above heart level if no fracture is suspected.",
        "If arterial bleeding persists, apply commercial tourniquet 2 inches above wound.",
      ],
    },
    {
      id: "burns",
      name: "Thermal Burn Care",
      steps: [
        "Cool burn immediately under clean running water for 10-15 minutes.",
        "Do not apply ice, butter, or oil to the burn.",
        "Cover loosely with sterile non-stick plastic wrap or clean sheet.",
        "Watch for hypothermia and prepare for emergency transport.",
      ],
    },
  ];

  // SOS Countdown logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sosActive && sosCountdown > 0) {
      timer = setTimeout(() => setSosCountdown((c) => c - 1), 1000);
    } else if (sosActive && sosCountdown === 0) {
      toast.error("SOS Emergency Alert Broadcasted to Sector Responders!");
      navigate({ to: "/tracking" });
    }
    return () => clearTimeout(timer);
  }, [sosActive, sosCountdown, navigate]);

  const handleEmergencyTrigger = (type: EmergencyType) => {
    const report: EmergencyReport = {
      type,
      description: `Rapid one-tap CAD alert triggered for ${type}.`,
      location: "Sector 4 Junction, Metro Central",
      coordinates: "28.6139° N, 77.2090° E",
      timestamp: new Date().toLocaleTimeString("en-GB", { hour12: false }) + " IST",
    };
    if (typeof window !== "undefined") {
      window.localStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify(report));
    }
    navigate({ to: "/ai-analysis" });
  };

  return (
    <AppFrame showNav>
      {/* Command Center Operational Top Bar */}
      <div className="mb-6 rounded-md border border-slate-200 bg-white p-4 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-500 mb-1">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span>COMMAND SECTOR 4 · METRO DISPATCH</span>
              <span>//</span>
              <span className="text-navy">LOGGED IN: RITIKA SEN (#RQ-8821)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy tracking-tight font-sans">
              Incident Response Console
            </h1>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-5 font-mono text-xs">
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-bold">Sector Units</p>
              <p className="text-base font-black text-navy">9 Ready</p>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-bold">Avg Response</p>
              <p className="text-base font-black text-emerald-600">4.8 min</p>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-bold">CAD Status</p>
              <p className="text-base font-black text-navy">Optimal</p>
            </div>
          </div>
        </div>
      </div>

      {/* SOS High-Priority Trigger Banner */}
      <div className="mb-6 rounded-md border-2 border-red-500 bg-red-50/70 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 text-center sm:text-left">
            <div className="size-11 rounded-md bg-emergency text-white flex items-center justify-center shrink-0 shadow-xs">
              <Siren className="size-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-mono text-xs font-black uppercase tracking-wider text-emergency">
                  Immediate SOS Distress Broadcast
                </span>
                <span className="rounded bg-red-200 text-red-800 text-[10px] font-mono px-1.5 py-0.2 font-bold">
                  HIGH PRIORITY
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-1 max-w-xl">
                Triggers instantaneous telemetry packet (GPS, Medical ID, Incident Distress) to all nearby
                paramedic, fire, and police sector units.
              </p>
            </div>
          </div>

          {/* Trigger Button / Countdown */}
          <div>
            {sosActive ? (
              <div className="flex items-center gap-3">
                <div className="text-center font-mono">
                  <span className="text-2xl font-black text-emergency animate-pulse">
                    00:0{sosCountdown}
                  </span>
                  <p className="text-[10px] text-slate-500">BROADCASTING IN...</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSosActive(false);
                    setSosCountdown(5);
                    toast.info("SOS Broadcast Aborted by Citizen.");
                  }}
                  className="border-slate-300 font-mono text-xs text-slate-700 hover:bg-slate-100"
                >
                  Cancel SOS
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setSosActive(true)}
                className="h-11 px-6 bg-emergency hover:bg-red-600 text-white font-mono font-black text-xs uppercase tracking-wider shadow-sm rounded-md"
              >
                <AlertOctagon className="size-4 mr-1.5" />
                <span>BROADCAST 1-TAP SOS</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main 2-Column Tactical Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): Triage Channels & Emergency Filing */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Incident Quick Resume Bar (if existing) */}
          {activeIncident ? (
            <div className="rounded-md border border-slate-300 bg-white p-4 shadow-2xs flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <span className="size-3 rounded-full bg-emergency animate-ping" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-navy">
                      INCIDENT IN PROGRESS: {activeIncident.type.toUpperCase()}
                    </span>
                    <SeverityBadge severity="Critical" />
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    {activeIncident.location} // Units Assigned
                  </p>
                </div>
              </div>
              <Button
                asChild
                size="sm"
                className="h-8 bg-navy hover:bg-slate-800 text-white font-mono text-xs"
              >
                <Link to="/tracking">
                  <Navigation className="size-3.5 mr-1" />
                  <span>View Live Telemetry</span>
                </Link>
              </Button>
            </div>
          ) : null}

          {/* Primary Incident Categories */}
          <TacticalCard
            title="SELECT EMERGENCY INCIDENT CHANNEL"
            badge="RAPID TRIAGE INTAKE"
          >
            <p className="text-xs text-slate-600 mb-4">
              Select the primary emergency domain to trigger specialized AI clinical triage and resource allocation:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  type: "Medical Emergency" as EmergencyType,
                  title: "Medical & Trauma",
                  desc: "Cardiac arrest, acute distress, severe bleeding, stroke.",
                  icon: HeartPulse,
                  callsign: "ALS AMBULANCE",
                  color: "border-red-200 hover:border-red-400 bg-red-50/30",
                  badge: "MED-01",
                },
                {
                  type: "Road Accident" as EmergencyType,
                  title: "Vehicular Collision",
                  desc: "Multi-vehicle crash, trapped occupants, roadway blockage.",
                  icon: Ambulance,
                  callsign: "MEDIC + POLICE",
                  color: "border-amber-200 hover:border-amber-400 bg-amber-50/30",
                  badge: "RTA-02",
                },
                {
                  type: "Fire" as EmergencyType,
                  title: "Fire & Structure Rescue",
                  desc: "Building fire, industrial hazard, heavy smoke inhalation.",
                  icon: Flame,
                  callsign: "FIRE RESCUE",
                  color: "border-orange-200 hover:border-orange-400 bg-orange-50/30",
                  badge: "FIR-03",
                },
                {
                  type: "Police" as EmergencyType,
                  title: "Law & Public Safety",
                  desc: "Assault, active threat, burglary, civilian protection.",
                  icon: Shield,
                  callsign: "SECTOR PATROL",
                  color: "border-blue-200 hover:border-blue-400 bg-blue-50/30",
                  badge: "POL-04",
                },
              ].map((channel) => (
                <button
                  key={channel.type}
                  onClick={() => handleEmergencyTrigger(channel.type)}
                  className={`text-left p-4 rounded-md border ${channel.color} transition-all duration-150 hover:shadow-2xs group cursor-pointer flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="size-9 rounded bg-white border border-slate-200 flex items-center justify-center text-navy shadow-2xs group-hover:scale-105 transition-transform">
                        <channel.icon className="size-5 text-emergency" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                        {channel.badge}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-navy font-sans">{channel.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{channel.desc}</p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>UNIT: {channel.callsign}</span>
                    <span className="text-emergency font-bold group-hover:translate-x-0.5 transition-transform">
                      Trigger Triage →
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Multi-step Report Intake Button */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs text-slate-500 font-mono">
                Need to attach photos, coordinate telemetry, or voice notes?
              </span>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-slate-300 font-mono text-xs text-navy hover:bg-slate-100"
              >
                <Link to="/report">
                  <FileText className="size-3.5 mr-1 text-emergency" />
                  <span>Open Full Incident Intake Form</span>
                </Link>
              </Button>
            </div>
          </TacticalCard>

          {/* First-Aid Emergency Procedures (Interactive Protocol Viewer) */}
          <TacticalCard
            title="EMERGENCY FIRST-AID STABILIZATION PROTOCOLS"
            badge="CITIZEN LIFE SUPPORT"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
              {protocols.map((p) => (
                <button
                  key={p.id}
                  onClick={() =>
                    setSelectedProtocol(selectedProtocol === p.id ? null : p.id)
                  }
                  className={`p-2.5 rounded border text-left font-mono text-xs transition-colors cursor-pointer ${
                    selectedProtocol === p.id
                      ? "border-navy bg-navy text-white font-bold"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <p className="font-bold text-[11px]">{p.name}</p>
                  <span className="text-[10px] opacity-80">
                    {selectedProtocol === p.id ? "Close Protocol" : "View Steps →"}
                  </span>
                </button>
              ))}
            </div>

            {selectedProtocol ? (
              <div className="rounded border border-navy/20 bg-slate-50 p-3.5 animate-fade-in font-sans">
                <h4 className="font-mono text-xs font-bold text-navy uppercase mb-2">
                  Action Steps:{" "}
                  {protocols.find((p) => p.id === selectedProtocol)?.name}
                </h4>
                <ol className="space-y-1.5 text-xs text-slate-700 list-decimal list-inside">
                  {protocols
                    .find((p) => p.id === selectedProtocol)
                    ?.steps.map((step, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                </ol>
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-mono">
                Select a protocol above to view immediate life-saving stabilization instructions while units are en route.
              </p>
            )}
          </TacticalCard>
        </div>

        {/* Right Column (1/3): Sector Telemetry & Speed Dial */}
        <div className="space-y-6">
          {/* Sector Resource Readiness Monitor */}
          <TacticalCard
            title="SECTOR 4 RESOURCE READINESS"
            badge="LIVE TELEMETRY"
          >
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Hospital className="size-4 text-blue-600" />
                  <div>
                    <p className="font-bold text-slate-800">City Metro Hospital</p>
                    <p className="text-[10px] text-slate-500">Trauma Level 1 · 2.1 km</p>
                  </div>
                </div>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[11px]">
                  14 ICU Beds
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Ambulance className="size-4 text-emerald-600" />
                  <div>
                    <p className="font-bold text-slate-800">ALS Unit AMB-204</p>
                    <p className="text-[10px] text-slate-500">Station 12 · On Patrol</p>
                  </div>
                </div>
                <span className="font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                  AVAILABLE
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Flame className="size-4 text-orange-600" />
                  <div>
                    <p className="font-bold text-slate-800">Fire Engine Squad 07</p>
                    <p className="text-[10px] text-slate-500">Central Station · 3.4 km</p>
                  </div>
                </div>
                <span className="font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                  STANDBY
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                <span>Traffic Flow Index</span>
                <span className="font-bold text-emerald-600">Green Corridor Active</span>
              </div>
            </div>
          </TacticalCard>

          {/* Citizen ICE (In Case of Emergency) Quick Bar */}
          <TacticalCard
            title="ICE EMERGENCY CONTACTS"
            badge="1-TAP BROADCAST"
          >
            <div className="space-y-2.5 font-mono text-xs">
              {[
                { name: "Rajesh Sen", relation: "Father", phone: "+91 98765 43210" },
                { name: "Ananya Sen", relation: "Sister", phone: "+91 98765 43211" },
                { name: "Dr. P. K. Mehta", relation: "Physician", phone: "+91 98765 43212" },
              ].map((contact) => (
                <div
                  key={contact.phone}
                  className="flex items-center justify-between p-2 rounded border border-slate-200 bg-slate-50/70"
                >
                  <div>
                    <p className="font-bold text-navy font-sans text-xs">{contact.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono">
                      {contact.relation} · {contact.phone}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      toast.success(`Simulated Emergency SMS Sent to ${contact.name}: "ResQ AI SOS Alert"`)
                    }
                    className="size-7 rounded bg-white border border-slate-300 text-emergency hover:bg-slate-100 flex items-center justify-center transition-colors shadow-2xs"
                    aria-label={`Alert ${contact.name}`}
                  >
                    <Phone className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-3 text-center">
              <Link
                to="/profile"
                className="font-mono text-[11px] text-navy hover:underline font-bold"
              >
                Manage Medical ID & Emergency Contacts →
              </Link>
            </div>
          </TacticalCard>

          {/* Academic Prototype Notice */}
          <SafetyNote />
        </div>
      </div>
    </AppFrame>
  );
}

/* =========================================================================
   4. REPORT INCIDENT SCREEN: Step-Guided Clinical Triage Intake Form
   ========================================================================= */
export function ReportPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [type, setType] = useState<EmergencyType>("Medical Emergency");
  const [location, setLocation] = useState("Sector 4 Junction, Metro Central");
  const [coordinates, setCoordinates] = useState("28.6139° N, 77.2090° E");
  const [description, setDescription] = useState("");
  const [victimCount, setVictimCount] = useState("1");
  const [isConscious, setIsConscious] = useState(true);
  const [hasBleeding, setHasBleeding] = useState(false);
  const [recordingVoice, setRecordingVoice] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const [voiceTranscribed, setVoiceTranscribed] = useState("");
  const [photoAttached, setPhotoAttached] = useState(false);

  // Voice note timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (recordingVoice) {
      interval = setInterval(() => setVoiceSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [recordingVoice]);

  const handleStopRecording = () => {
    setRecordingVoice(false);
    setVoiceTranscribed(
      "Audio Transcript: Two injured victims at intersection, severe bleeding, urgent medical ALS ambulance needed.",
    );
    if (!description) {
      setDescription(
        "Two injured victims at intersection, severe bleeding, urgent medical ALS ambulance needed.",
      );
    }
    toast.success("Voice note transcribed by ResQ Speech-to-Text module.");
  };

  const handleAcquireGPS = () => {
    toast.info("Acquiring high-accuracy hardware coordinates...");
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(4);
          const lon = pos.coords.longitude.toFixed(4);
          setCoordinates(`${lat}° N, ${lon}° E`);
          toast.success(`Coordinates acquired: ${lat}° N, ${lon}° E (Accuracy: ±${pos.coords.accuracy.toFixed(0)}m)`);
        },
        () => {
          setCoordinates("28.6139° N, 77.2090° E");
          toast.info("Using simulated GPS telemetry: 28.6139° N, 77.2090° E");
        },
      );
    } else {
      setCoordinates("28.6139° N, 77.2090° E");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const finalDesc = description.trim()
      ? description
      : `${type} reported at ${location}. Victims: ${victimCount}. Bleeding: ${hasBleeding ? "Yes" : "No"}.`;

    const report: EmergencyReport = {
      type,
      description: finalDesc,
      location,
      coordinates,
      timestamp: new Date().toLocaleTimeString("en-GB", { hour12: false }) + " IST",
      photoAttached,
    };

    if (typeof window !== "undefined") {
      window.localStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify(report));
    }
    navigate({ to: "/ai-analysis" });
  };

  return (
    <AppFrame showNav>
      <PageHeader
        title="Emergency Incident Intake Form"
        subtitle="Structured Clinical & Tactical Triage Intake Console"
        category="CAD // TRIAGE PROTOCOL 01"
      />

      {/* Stepper Progress Bar */}
      <div className="mb-6 rounded-md border border-slate-200 bg-white p-3 font-mono text-xs shadow-2xs">
        <div className="grid grid-cols-4 gap-2">
          {[
            { stepNum: 1, label: "01. HAZARD TYPE" },
            { stepNum: 2, label: "02. GPS TELEMETRY" },
            { stepNum: 3, label: "03. SITUATION" },
            { stepNum: 4, label: "04. DISPATCH" },
          ].map((s) => (
            <button
              key={s.stepNum}
              type="button"
              onClick={() => setStep(s.stepNum)}
              className={`p-2 rounded text-left transition-colors cursor-pointer ${
                step === s.stepNum
                  ? "bg-navy text-white font-bold"
                  : step > s.stepNum
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              <div className="text-[10px] opacity-75">STEP {s.stepNum}</div>
              <div className="font-bold truncate text-[11px]">{s.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form Column (2/3) */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Hazard Type Selection */}
            {step === 1 && (
              <TacticalCard
                title="STEP 01: SELECT PRIMARY INCIDENT CLASSIFICATION"
                badge="STAGE 1/4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: "Medical Emergency" as EmergencyType,
                      title: "Medical & Trauma",
                      desc: "Cardiovascular, severe injury, respiratory failure.",
                      icon: HeartPulse,
                    },
                    {
                      id: "Road Accident" as EmergencyType,
                      title: "Road Collision",
                      desc: "Vehicular accident, rollover, entrapment.",
                      icon: Ambulance,
                    },
                    {
                      id: "Fire" as EmergencyType,
                      title: "Fire & Rescue",
                      desc: "Structural fire, toxic smoke, chemical flame.",
                      icon: Flame,
                    },
                    {
                      id: "Police" as EmergencyType,
                      title: "Public Threat / Crime",
                      desc: "Assault, active risk, intruder, physical hazard.",
                      icon: Shield,
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setType(item.id);
                        setStep(2);
                      }}
                      className={`p-3.5 rounded border text-left transition-all cursor-pointer ${
                        type === item.id
                          ? "border-navy bg-navy text-white shadow-2xs font-bold"
                          : "border-slate-200 bg-white hover:border-slate-300 text-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <item.icon
                          className={`size-4 ${type === item.id ? "text-emergency" : "text-navy"}`}
                        />
                        <span className="font-sans font-bold text-sm">{item.title}</span>
                      </div>
                      <p
                        className={`text-xs ${type === item.id ? "text-slate-300" : "text-slate-500"}`}
                      >
                        {item.desc}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex justify-end">
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-navy hover:bg-slate-800 text-white font-mono text-xs uppercase"
                  >
                    Proceed to Telemetry →
                  </Button>
                </div>
              </TacticalCard>
            )}

            {/* Step 2: Location & GPS */}
            {step === 2 && (
              <TacticalCard
                title="STEP 02: GPS & LOCATION TELEMETRY"
                badge="STAGE 2/4"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1.5">
                      Incident Address / Street Landmark
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                      <Input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        placeholder="e.g. Sector 4 Junction, Near Central Metro Gate"
                        className="pl-9 font-sans text-sm h-10 border-slate-300"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-mono font-bold uppercase text-slate-700">
                        Hardware GPS Coordinates
                      </label>
                      <button
                        type="button"
                        onClick={handleAcquireGPS}
                        className="text-xs font-mono text-emergency hover:underline flex items-center gap-1 font-bold"
                      >
                        <LocateFixed className="size-3" />
                        <span>Acquire Device Coordinates</span>
                      </button>
                    </div>
                    <div className="relative">
                      <Compass className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                      <Input
                        value={coordinates}
                        onChange={(e) => setCoordinates(e.target.value)}
                        className="pl-9 font-mono text-xs h-10 border-slate-300 bg-slate-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="font-mono text-xs"
                  >
                    ← Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-navy hover:bg-slate-800 text-white font-mono text-xs uppercase"
                  >
                    Proceed to Assessment →
                  </Button>
                </div>
              </TacticalCard>
            )}

            {/* Step 3: Clinical & Situation Assessment */}
            {step === 3 && (
              <TacticalCard
                title="STEP 03: CLINICAL & SITUATION ASSESSMENT"
                badge="STAGE 3/4"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1.5">
                      Number of Victims / Casualties
                    </label>
                    <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                      {["1", "2-3", "4-6", "Mass (>6)"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setVictimCount(opt)}
                          className={`p-2 rounded border transition-colors ${
                            victimCount === opt
                              ? "border-navy bg-navy text-white font-bold"
                              : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <label className="flex items-center gap-2.5 p-3 rounded border border-slate-200 bg-slate-50/70 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isConscious}
                        onChange={(e) => setIsConscious(e.target.checked)}
                        className="size-4 rounded text-navy"
                      />
                      <span className="text-xs font-mono text-slate-800 font-bold">
                        Patient / Victim is Conscious
                      </span>
                    </label>

                    <label className="flex items-center gap-2.5 p-3 rounded border border-slate-200 bg-slate-50/70 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasBleeding}
                        onChange={(e) => setHasBleeding(e.target.checked)}
                        className="size-4 rounded text-emergency"
                      />
                      <span className="text-xs font-mono text-slate-800 font-bold">
                        Active Severe Bleeding Observed
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1.5">
                      Incident Description & Clinical Symptoms
                    </label>
                    <Textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe what happened, patient injuries, trapped passengers, or hazards..."
                      className="font-sans text-sm border-slate-300"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="font-mono text-xs"
                  >
                    ← Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(4)}
                    className="bg-navy hover:bg-slate-800 text-white font-mono text-xs uppercase"
                  >
                    Proceed to Review →
                  </Button>
                </div>
              </TacticalCard>
            )}

            {/* Step 4: Voice/Photo Evidence & Submission */}
            {step === 4 && (
              <TacticalCard
                title="STEP 04: AUDIO & VISUAL EVIDENCE TELEMETRY"
                badge="FINAL STAGE"
              >
                <div className="space-y-4">
                  {/* Voice Recorder Box */}
                  <div className="p-4 rounded border border-slate-200 bg-slate-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Mic className="size-4 text-emergency" />
                        <span className="font-mono text-xs font-bold text-navy uppercase">
                          Simulated Voice Dispatch Note
                        </span>
                      </div>
                      {recordingVoice ? (
                        <span className="font-mono text-xs text-emergency font-bold animate-pulse">
                          ● RECORDING (00:0{voiceSeconds})
                        </span>
                      ) : null}
                    </div>

                    {recordingVoice ? (
                      <div className="space-y-2">
                        <div className="h-6 flex items-center justify-center gap-1">
                          <span className="h-3 w-1 bg-emergency animate-pulse" />
                          <span className="h-5 w-1 bg-emergency animate-pulse" />
                          <span className="h-2 w-1 bg-emergency animate-pulse" />
                          <span className="h-6 w-1 bg-emergency animate-pulse" />
                          <span className="h-4 w-1 bg-emergency animate-pulse" />
                        </div>
                        <Button
                          type="button"
                          onClick={handleStopRecording}
                          className="w-full bg-emergency hover:bg-red-600 text-white font-mono text-xs"
                        >
                          Stop & Transcribe Note
                        </Button>
                      </div>
                    ) : (
                      <div>
                        {voiceTranscribed ? (
                          <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800">
                            {voiceTranscribed}
                          </div>
                        ) : (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setRecordingVoice(true);
                              setVoiceSeconds(0);
                            }}
                            className="w-full border-slate-300 font-mono text-xs text-slate-700 hover:bg-white"
                          >
                            <Mic className="size-3.5 mr-1 text-emergency" />
                            <span>Record Emergency Audio Memo</span>
                          </Button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Photo Simulation */}
                  <div className="p-4 rounded border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <p className="font-mono text-xs font-bold text-navy uppercase">
                        Attach Scene Photo Evidence
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {photoAttached
                          ? "Photo attached (accident_scene_telemetry.jpg)"
                          : "Upload crash/fire/injury photo for AI classification"}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant={photoAttached ? "default" : "outline"}
                      onClick={() => {
                        setPhotoAttached(!photoAttached);
                        toast.info(photoAttached ? "Photo removed" : "Simulated scene photo attached.");
                      }}
                      className="font-mono text-xs"
                    >
                      <Upload className="size-3.5 mr-1" />
                      <span>{photoAttached ? "Attached [✓]" : "Attach Photo"}</span>
                    </Button>
                  </div>

                  {/* Submit Action */}
                  <Button
                    type="submit"
                    className="w-full h-12 bg-emergency hover:bg-red-600 text-white font-mono font-black text-sm uppercase tracking-wider shadow-sm rounded-md mt-4"
                  >
                    <Cpu className="size-4 mr-2" />
                    <span>Run AI Emergency Decision Support →</span>
                  </Button>
                </div>

                <div className="mt-4 flex justify-start">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(3)}
                    className="font-mono text-xs"
                  >
                    ← Back to Assessment
                  </Button>
                </div>
              </TacticalCard>
            )}
          </form>
        </div>

        {/* Right Summary Docket (1/3) */}
        <div>
          <TacticalCard
            title="LIVE INCIDENT DOCKET SUMMARY"
            badge="TELEMETRY"
          >
            <div className="space-y-3 font-mono text-xs">
              <div className="pb-2 border-b border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Category</span>
                <p className="font-bold text-navy mt-0.5">{type}</p>
              </div>

              <div className="pb-2 border-b border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Coordinates</span>
                <p className="font-bold text-slate-800 mt-0.5">{coordinates}</p>
              </div>

              <div className="pb-2 border-b border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Location</span>
                <p className="text-slate-700 mt-0.5">{location}</p>
              </div>

              <div className="pb-2 border-b border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Victims & Status</span>
                <p className="text-slate-700 mt-0.5">
                  Casualties: {victimCount} · Conscious: {isConscious ? "Yes" : "No"} · Bleeding: {hasBleeding ? "Yes" : "No"}
                </p>
              </div>

              <div className="pt-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Projected Unit</span>
                <p className="font-bold text-emergency mt-0.5">
                  {emergencyProfiles[type]?.response || "ALS Ambulance"}
                </p>
              </div>
            </div>
          </TacticalCard>
        </div>
      </div>
    </AppFrame>
  );
}

/* =========================================================================
   5. AI DECISION SUPPORT SCREEN: Machine Learning Triage Pipeline
   ========================================================================= */
export function AiAnalysisPage() {
  const navigate = useNavigate();
  const [report] = useState<EmergencyReport>(getReport());
  const [pipelineProgress, setPipelineProgress] = useState(15);
  const [activeStage, setActiveStage] = useState(0);

  const stages = useMemo(
    () => [
      {
        id: "nlp",
        label: "NLP Entity & Symptom Tokenizer",
        detail: "Extracting clinical tokens: 'severe trauma', 'entrapment', 'active hemorrhage'...",
      },
      {
        id: "esi",
        label: "Emergency Severity Index (ESI) Classifier",
        detail: "Evaluating multi-hazard probability matrix (ESI-1: 94.2%, ESI-2: 4.8%)...",
      },
      {
        id: "fleet",
        label: "Geospatial Fleet Routing & Hospital Availability",
        detail: "Triangulating nearest ALS unit: AMB-204 @ 1.8km (ETA: 4.5 min)...",
      },
      {
        id: "docket",
        label: "Formulating Dispatch Order & First-Aid Guidance",
        detail: "Synthesizing protocol: Immediate Paramedic + Police traffic clearance...",
      },
    ],
    [],
  );

  useEffect(() => {
    const t1 = setTimeout(() => {
      setActiveStage(1);
      setPipelineProgress(45);
    }, 700);

    const t2 = setTimeout(() => {
      setActiveStage(2);
      setPipelineProgress(75);
    }, 1500);

    const t3 = setTimeout(() => {
      setActiveStage(3);
      setPipelineProgress(95);
    }, 2200);

    const tFinal = setTimeout(() => {
      setPipelineProgress(100);
      navigate({ to: "/severity-result" });
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tFinal);
    };
  }, [navigate]);

  return (
    <AppFrame showNav>
      <PageHeader
        title="Emergency Decision Support Core"
        subtitle="Real-Time Machine Learning Clinical Triage & Fleet Optimization"
        category="CAD // AI-DSS INFERENCE ENGINE"
      />

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Telemetry Header */}
        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-2xs font-mono">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4 text-xs">
            <span className="flex items-center gap-2 font-bold text-navy">
              <Cpu className="size-4 text-emergency animate-spin" />
              <span>INFERENCE PIPELINE ACTIVE // CASE: {report.type.toUpperCase()}</span>
            </span>
            <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              CONFIDENCE: 94.8%
            </span>
          </div>

          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-bold">PIPELINE EXECUTION PROGRESS</span>
            <span className="text-emergency font-black">{pipelineProgress}%</span>
          </div>
          <Progress
            value={pipelineProgress}
            className="h-2 bg-slate-100 [&>div]:bg-emergency rounded-none mb-6"
          />

          {/* Sequential Stage Cards */}
          <div className="space-y-3">
            {stages.map((stg, idx) => {
              const isDone = activeStage > idx;
              const isCurrent = activeStage === idx;

              return (
                <div
                  key={stg.id}
                  className={`p-3.5 rounded border transition-all ${
                    isDone
                      ? "border-emerald-200 bg-emerald-50/50 text-slate-800"
                      : isCurrent
                        ? "border-navy bg-slate-50 text-navy ring-1 ring-navy font-bold"
                        : "border-slate-100 bg-white text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2">
                      {isDone ? (
                        <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                      ) : isCurrent ? (
                        <span className="size-2 rounded-full bg-emergency animate-ping shrink-0" />
                      ) : (
                        <Circle className="size-3.5 text-slate-300 shrink-0" />
                      )}
                      <span className="font-bold uppercase tracking-wider">{stg.label}</span>
                    </span>
                    <span className="text-[10px]">
                      {isDone ? "COMPLETE [✓]" : isCurrent ? "PROCESSING..." : "QUEUED"}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] font-sans text-slate-600 pl-6 leading-relaxed">
                    {stg.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Input Telemetry Snapshot */}
        <div className="rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-600">
          <p className="font-bold text-navy mb-1 uppercase tracking-wider text-[11px]">
            Active Incident Telemetry Payload:
          </p>
          <p className="truncate">LOCATION: {report.location}</p>
          <p className="truncate">COORDINATES: {report.coordinates}</p>
          <p className="truncate text-slate-500">PAYLOAD: "{report.description}"</p>
        </div>

        {/* Fast forward bypass */}
        <div className="text-center">
          <button
            onClick={() => navigate({ to: "/severity-result" })}
            className="font-mono text-xs text-slate-400 hover:text-navy underline cursor-pointer"
          >
            Bypass Analysis Animation → View Severity Result
          </button>
        </div>
      </div>
    </AppFrame>
  );
}

/* =========================================================================
   6. SEVERITY RESULT SCREEN: Operational Dispatch Order & Action Sheet
   ========================================================================= */
export function SeverityResultPage() {
  const navigate = useNavigate();
  const [report] = useState<EmergencyReport>(getReport());
  const profile = emergencyProfiles[report.type] || emergencyProfiles["Medical Emergency"];
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const actionSteps = [
    "Ensure scene perimeter is secure. Clear bystanders from traffic or hazard path.",
    "Verify patient airway, breathing, and circulation. Do not move spine if collision.",
    "Apply firm direct pressure to bleeding with clean dressing.",
    "Prepare patient identification and medical history for incoming paramedic team.",
  ];

  return (
    <AppFrame showNav>
      <PageHeader
        title="Triage Assessment & Dispatch Authorization"
        subtitle="Official CAD Incident Docket and Authorized Response Order"
        category="CAD // TRIAGE DOCKET #RQ-8821"
        backTo="/report"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): Docket & Action Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Classification Banner */}
          <div className="rounded-md border-2 border-red-500 bg-red-50/60 p-5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-red-200 pb-3 mb-3">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emergency">
                  TRIAGE CLASSIFICATION LEVEL
                </span>
                <h2 className="text-2xl font-black text-navy font-sans tracking-tight">
                  {profile.severity === "Critical" ? "ESI-1 // CRITICAL DISTRESS" : "ESI-2 // HIGH PRIORITY"}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <SeverityBadge severity={profile.severity} />
                <span className="font-mono text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded">
                  ETA: {profile.eta}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              {profile.explanation}
            </p>
          </div>

          {/* Assigned Units Docket */}
          <TacticalCard
            title="ASSIGNED CAD RESPONSE FLEET"
            badge="DISPATCH READY"
          >
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Ambulance className="size-5 text-emergency" />
                  <div>
                    <p className="font-bold text-navy font-sans text-sm">{profile.response}</p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      Callsign: {profile.unitCallsign} · Station 12
                    </p>
                  </div>
                </div>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  DISPATCHED
                </span>
              </div>

              <div className="p-3 rounded border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Hospital className="size-5 text-blue-600" />
                  <div>
                    <p className="font-bold text-navy font-sans text-sm">Metro City Trauma Center</p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      2.1 km away · Emergency ER Ready · 14 ICU Beds
                    </p>
                  </div>
                </div>
                <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  ALERT SENT
                </span>
              </div>
            </div>
          </TacticalCard>

          {/* Interactive First-Aid Checklist */}
          <TacticalCard
            title="ON-SCENE FIRST-AID STABILIZATION CHECKLIST"
            badge="CHECK OFF COMPLETED"
          >
            <p className="text-xs text-slate-600 mb-3 font-sans">
              Perform these immediate stabilization measures while emergency units navigate to your coordinates:
            </p>

            <div className="space-y-2 font-sans text-xs">
              {actionSteps.map((step, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleCheck(idx)}
                  className={`w-full p-2.5 rounded border text-left flex items-start gap-2.5 transition-colors cursor-pointer ${
                    checkedItems[idx]
                      ? "border-emerald-300 bg-emerald-50 text-emerald-900 font-medium"
                      : "border-slate-200 bg-white hover:bg-slate-50 text-slate-800"
                  }`}
                >
                  <span
                    className={`mt-0.5 size-4 rounded flex items-center justify-center text-[10px] font-bold border ${
                      checkedItems[idx]
                        ? "bg-emerald-600 border-emerald-700 text-white"
                        : "border-slate-300 bg-slate-100 text-slate-400"
                    }`}
                  >
                    {checkedItems[idx] ? "✓" : idx + 1}
                  </span>
                  <span className="flex-1 leading-relaxed">{step}</span>
                </button>
              ))}
            </div>
          </TacticalCard>

          {/* Primary Action Button */}
          <Button
            onClick={() => navigate({ to: "/tracking" })}
            className="w-full h-12 bg-emergency hover:bg-red-600 text-white font-mono font-black text-sm uppercase tracking-wider rounded-md shadow-sm"
          >
            <Navigation className="size-4 mr-2" />
            <span>AUTHORIZE DISPATCH & LIVE TRACK UNITS →</span>
          </Button>
        </div>

        {/* Right Telemetry Column (1/3) */}
        <div className="space-y-6">
          <TacticalCard
            title="INCIDENT VERIFICATION DOCKET"
            badge="#RQ-8821"
          >
            <div className="space-y-3 font-mono text-xs">
              <div className="pb-2 border-b border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Location</span>
                <p className="font-bold text-slate-800 mt-0.5">{report.location}</p>
                <p className="text-[10px] text-slate-500">{report.coordinates}</p>
              </div>

              <div className="pb-2 border-b border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Reported Type</span>
                <p className="font-bold text-navy mt-0.5">{report.type}</p>
              </div>

              <div className="pb-2 border-b border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Logged Description</span>
                <p className="text-slate-600 font-sans text-xs mt-0.5 leading-relaxed">
                  "{report.description}"
                </p>
              </div>

              <div className="pt-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">AI Protocol Confidence</span>
                <p className="font-black text-emerald-600 text-sm mt-0.5">{profile.confidence}%</p>
              </div>
            </div>
          </TacticalCard>

          <SafetyNote />
        </div>
      </div>
    </AppFrame>
  );
}

/* =========================================================================
   7. TRACKING SCREEN: Purpose-Built Emergency Telemetry & Dispatch Console
   ========================================================================= */
export function TrackingPage() {
  const navigate = useNavigate();
  const [report] = useState<EmergencyReport>(getReport());
  const profile = emergencyProfiles[report.type] || emergencyProfiles["Medical Emergency"];
  const [etaMinutes, setEtaMinutes] = useState(4);
  const [distanceKm, setDistanceKm] = useState(1.6);
  const [sirenActive, setSirenActive] = useState(false);

  // Simulated live radio dispatch chatter feed
  const radioFeed = [
    { time: "20:51:10", sender: "DISPATCH", msg: "CAD Incident #RQ-8821 acknowledged. Priority ESI-1." },
    { time: "20:51:45", sender: "AMB-204", msg: "Unit AMB-204 rolling from Station 12. ETA 5 minutes." },
    { time: "20:52:30", sender: "DISPATCH", msg: "Sector 4 traffic police assigned for green corridor clearance." },
    { time: "20:53:15", sender: "AMB-204", msg: "Approaching Ring Road intersection, moving through light traffic." },
  ];

  // Dynamic simulation step
  useEffect(() => {
    const timer = setInterval(() => {
      setDistanceKm((d) => Math.max(0.2, Number((d - 0.1).toFixed(2))));
      setEtaMinutes((m) => Math.max(1, m - (Math.random() > 0.6 ? 1 : 0)));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AppFrame showNav>
      <PageHeader
        title="Live CAD Unit Tracking & Telemetry"
        subtitle={`Tracking ${profile.unitCallsign} En Route to Scene`}
        category="CAD // ACTIVE DISPATCH TELEMETRY"
        backTo="/home"
      />

      {/* Top Telemetry Strip */}
      <div className="mb-6 rounded-md border border-slate-200 bg-white p-4 shadow-2xs font-mono text-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold">Estimated Arrival</span>
            <p className="text-xl font-black text-emergency mt-0.5">{etaMinutes} MINS</p>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold">Remaining Distance</span>
            <p className="text-xl font-black text-navy mt-0.5">{distanceKm} KM</p>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold">Vehicle Speed</span>
            <p className="text-xl font-black text-slate-800 mt-0.5">62 KM/H</p>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold">CAD Transponder</span>
            <p className="text-xl font-black text-emerald-600 mt-0.5">154.280 MHz</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Simulated CAD Map (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative rounded-md border border-slate-800 bg-slate-950 p-6 min-h-[380px] flex flex-col justify-between cad-grid-dark text-white overflow-hidden shadow-sm">
            {/* Map Telemetry HUD */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                <span>GPS RADAR: ACTIVE (SECTOR 4 GRID)</span>
              </span>
              <span>GRID REF: 28.6139N / 77.2090E</span>
            </div>

            {/* Tactical Vector Visualization Canvas */}
            <div className="relative my-auto py-8">
              {/* Route Trajectory Line */}
              <div className="relative mx-auto max-w-md h-28 border border-dashed border-slate-700 rounded-md p-4 flex items-center justify-between bg-slate-900/60">
                {/* Ambulance Unit Node */}
                <div className="flex flex-col items-center">
                  <div className="relative size-12 rounded bg-emergency text-white flex items-center justify-center shadow-emergency animate-pulse">
                    <Ambulance className="size-7" />
                  </div>
                  <span className="mt-2 font-mono text-[11px] font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                    AMB-204
                  </span>
                </div>

                {/* Connecting Radar Path */}
                <div className="flex-1 mx-4 flex flex-col items-center">
                  <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>SPEED: 62 km/h</span>
                    <span className="text-emerald-400 font-bold">{distanceKm} km to scene</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-500"
                      style={{ width: `${Math.max(20, 100 - distanceKm * 40)}%` }}
                    />
                  </div>
                  <span className="mt-1 font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                    Green Corridor Active // Siren ON
                  </span>
                </div>

                {/* Citizen Scene Node */}
                <div className="flex flex-col items-center">
                  <div className="size-12 rounded bg-navy border border-slate-600 text-white flex items-center justify-center shadow-xs">
                    <MapPin className="size-6 text-emerald-400" />
                  </div>
                  <span className="mt-2 font-mono text-[11px] font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                    SCENE #RQ-8821
                  </span>
                </div>
              </div>
            </div>

            {/* Tactical Controls & Siren Simulator */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSirenActive(!sirenActive);
                    toast.info(sirenActive ? "Simulated Siren Off" : "Simulated High-Priority Siren Active");
                  }}
                  className="border-slate-700 bg-slate-900 text-white hover:bg-slate-800 h-8 text-xs font-mono"
                >
                  <Volume2 className="size-3.5 mr-1 text-emergency" />
                  <span>{sirenActive ? "Siren Active [ON]" : "Test Siren"}</span>
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast.info("Direct Paramedic Radio Audio: Connected (Simulated Voice Bridge)")}
                  className="border-slate-700 bg-slate-900 text-white hover:bg-slate-800 h-8 text-xs font-mono"
                >
                  <PhoneCall className="size-3.5 mr-1 text-emerald-400" />
                  <span>Call Paramedic</span>
                </Button>
              </div>

              {/* Fast Forward Arrival */}
              <Button
                size="sm"
                onClick={() => navigate({ to: "/resolved" })}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold h-8"
              >
                <span>Simulate Unit Arrival →</span>
              </Button>
            </div>
          </div>

          {/* 2-Way CAD Radio Dispatch Feed */}
          <TacticalCard
            title="CAD 2-WAY DISPATCH RADIO TRANSCRIPT"
            badge="LIVE LOG"
          >
            <div className="space-y-2 font-mono text-xs">
              {radioFeed.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded border border-slate-100 bg-slate-50/60 flex items-start gap-2.5"
                >
                  <span className="text-slate-400 text-[10px] shrink-0 mt-0.5">{item.time}</span>
                  <span
                    className={`font-bold px-1.5 py-0.2 rounded text-[10px] shrink-0 ${
                      item.sender === "DISPATCH"
                        ? "bg-slate-200 text-navy"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.sender}
                  </span>
                  <p className="text-slate-700 font-sans text-xs flex-1">{item.msg}</p>
                </div>
              ))}
            </div>
          </TacticalCard>
        </div>

        {/* Right Telemetry Column (1/3) */}
        <div className="space-y-6">
          <TacticalCard
            title="INCIDENT TELEMETRY DOCKET"
            badge="#RQ-8821"
          >
            <div className="space-y-3 font-mono text-xs">
              <div className="pb-2 border-b border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Assigned Unit</span>
                <p className="font-bold text-navy mt-0.5">{profile.unitCallsign}</p>
                <p className="text-[10px] text-slate-500">Lead Paramedic: A. Verma (MD-4991)</p>
              </div>

              <div className="pb-2 border-b border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Scene Destination</span>
                <p className="font-bold text-slate-800 mt-0.5">{report.location}</p>
                <p className="text-[10px] text-slate-500">{report.coordinates}</p>
              </div>

              <div className="pb-2 border-b border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Triage Protocol</span>
                <p className="font-bold text-emerald-600 mt-0.5">{profile.protocol}</p>
              </div>

              <div className="pt-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Patient Trauma Care</span>
                <p className="text-slate-600 font-sans text-xs mt-0.5 leading-relaxed">
                  Metro Trauma Center notified. Trauma bay pre-cleared for incoming admission.
                </p>
              </div>
            </div>
          </TacticalCard>

          <SafetyNote />
        </div>
      </div>
    </AppFrame>
  );
}

/* =========================================================================
   8. INCIDENT RESOLVED SCREEN: Formal Post-Incident Closure & Audit Docket
   ========================================================================= */
export function ResolvedPage() {
  const navigate = useNavigate();
  const [report] = useState<EmergencyReport>(getReport());
  const [rating, setRating] = useState(5);

  const handleExportPDF = () => {
    toast.success("Generating official CAD Incident Docket PDF (#RQ-8821)...");
    setTimeout(() => {
      toast.info("Incident Audit Docket downloaded successfully.");
    }, 800);
  };

  return (
    <AppFrame showNav>
      <PageHeader
        title="Incident Closure & Handover Summary"
        subtitle="Official Emergency CAD Resolution & Audit Docket"
        category="CAD // INCIDENT RESOLUTION #RQ-8821"
        backTo="/home"
      />

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Status Completed Card */}
        <div className="rounded-md border border-emerald-300 bg-emerald-50/60 p-6 text-center shadow-2xs font-mono">
          <div className="size-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 shadow-xs">
            <CheckCircle2 className="size-7" />
          </div>
          <span className="text-[11px] font-bold text-emerald-800 tracking-widest uppercase">
            STATUS: RESOLVED // PATIENT HANDOVER COMPLETE
          </span>
          <h2 className="text-2xl font-black text-navy font-sans tracking-tight mt-1">
            Emergency Response Successfully Completed
          </h2>
          <p className="text-xs text-slate-600 font-sans mt-1 max-w-lg mx-auto leading-relaxed">
            Incident #RQ-8821 was logged, triaged via ResQ AI, and on-scene stabilization achieved in 4m 30s.
            Patient transferred safely to Metro Trauma Center.
          </p>

          <div className="mt-4 pt-3 border-t border-emerald-200/80 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-700">
            <span>DISPATCH TIME: 4m 30s</span>
            <span>·</span>
            <span>RESPONDER: AMB-204</span>
            <span>·</span>
            <span>HOSPITAL: METRO CENTRAL</span>
          </div>
        </div>

        {/* Detailed Incident Audit Summary */}
        <TacticalCard
          title="OFFICIAL INCIDENT AUDIT TRAIL"
          badge="AUDIT LOG"
        >
          <div className="space-y-3 font-mono text-xs">
            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-100">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Docket ID</span>
                <p className="font-bold text-navy">#RQ-2026-8821</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Category</span>
                <p className="font-bold text-navy">{report.type}</p>
              </div>
            </div>

            <div className="pb-3 border-b border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-bold">Location & Coordinates</span>
              <p className="font-bold text-slate-800">{report.location}</p>
              <p className="text-[10px] text-slate-500">{report.coordinates}</p>
            </div>

            <div className="pb-3 border-b border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-bold">Audit Chronology</span>
              <div className="mt-2 space-y-1.5 text-[11px] text-slate-600">
                <p>19:48:12 IST · Incident alert received from Citizen App (#RQ-8821)</p>
                <p>19:48:14 IST · ResQ Decision Support classified ESI-1 Critical Distress</p>
                <p>19:48:20 IST · Unit AMB-204 dispatched from Sector 12 Station</p>
                <p>19:52:50 IST · AMB-204 arrived on-scene. First-aid stabilized</p>
                <p>19:57:30 IST · Patient transferred to Metro City Trauma Center</p>
              </div>
            </div>

            {/* Document Export Actions */}
            <div className="pt-2 flex flex-wrap gap-2 justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPDF}
                className="font-mono text-xs border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                <Download className="size-3.5 mr-1" />
                <span>Download CAD Audit Report (PDF)</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  window.print();
                }}
                className="font-mono text-xs border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                <Printer className="size-3.5 mr-1" />
                <span>Print Incident Docket</span>
              </Button>
            </div>
          </div>
        </TacticalCard>

        {/* Prototype Response Rating */}
        <div className="rounded-md border border-slate-200 bg-white p-4 font-mono text-xs text-center shadow-2xs">
          <p className="font-bold text-navy uppercase text-xs mb-2">
            Rate Simulated Response Accuracy
          </p>
          <div className="flex justify-center gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`size-8 rounded font-mono font-bold text-sm transition-colors cursor-pointer ${
                  rating >= star
                    ? "bg-amber-400 text-navy"
                    : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                }`}
              >
                ★
              </button>
            ))}
          </div>
          <Button
            asChild
            className="w-full bg-navy hover:bg-slate-800 text-white font-mono text-xs uppercase"
          >
            <Link to="/home">Return to Command Hub →</Link>
          </Button>
        </div>

        <SafetyNote />
      </div>
    </AppFrame>
  );
}

/* =========================================================================
   9. INCIDENT HISTORY SCREEN: Incident Registry & CAD Database Browser
   ========================================================================= */
export function HistoryPage() {
  const [filterType, setFilterType] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIncident, setSelectedIncident] = useState<any | null>(null);

  const filtered = useMemo(() => {
    return historyItems.filter((item) => {
      const matchType =
        filterType === "ALL" ||
        item.type.toLowerCase().includes(filterType.toLowerCase());
      const matchSearch =
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchSearch;
    });
  }, [filterType, searchQuery]);

  return (
    <AppFrame showNav>
      <PageHeader
        title="Incident Audit Log & Database"
        subtitle="Historical Incident Registry, CAD Dispatches, and Resolution Logs"
        category="CAD // AUDIT DATABASE"
      />

      {/* Metrics Banner */}
      <div className="mb-6 rounded-md border border-slate-200 bg-white p-4 shadow-2xs font-mono text-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold">Total Logged</span>
            <p className="text-xl font-black text-navy mt-0.5">14 Incidents</p>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold">Resolution Rate</span>
            <p className="text-xl font-black text-emerald-600 mt-0.5">100%</p>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold">Avg Arrival Time</span>
            <p className="text-xl font-black text-slate-800 mt-0.5">4.8 min</p>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold">Database Status</span>
            <p className="text-xl font-black text-emerald-600 mt-0.5">HEALTHY</p>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3 items-stretch justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search incident by ID, street address, or category..."
            className="pl-9 font-sans text-sm h-10 border-slate-300"
          />
        </div>

        <div className="flex items-center gap-1.5 font-mono text-xs overflow-x-auto pb-1 sm:pb-0">
          {["ALL", "Medical", "Accident", "Fire"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-3 py-2 rounded border transition-colors cursor-pointer ${
                filterType === cat
                  ? "border-navy bg-navy text-white font-bold"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Incident List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-md border border-slate-200 bg-white p-4 shadow-2xs hover:border-slate-300 transition-all font-mono text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-navy text-sm">{item.id}</span>
                <span className="text-slate-300">|</span>
                <span className="font-sans font-bold text-slate-800 text-xs">{item.type}</span>
                <SeverityBadge severity={item.severity} />
              </div>
              <div className="text-[11px] text-slate-500">
                {item.date} · {item.time}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-sans text-xs text-slate-600 mb-3">
              <div>
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold block">
                  Location
                </span>
                <span>{item.location}</span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold block">
                  Dispatched Unit
                </span>
                <span>{item.unit}</span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold block">
                  Response Latency
                </span>
                <span className="font-mono font-bold text-emerald-600">{item.responseTime}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-sans italic text-[11px]">
                Outcome: {item.outcome}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedIncident(item);
                  toast.info(`Opened CAD docket detail for ${item.id}`);
                }}
                className="font-mono text-xs h-7"
              >
                View CAD Record →
              </Button>
            </div>
          </div>
        ))}

        {filtered.length === 0 ? (
          <div className="text-center py-10 rounded border border-dashed border-slate-300 bg-slate-50 font-mono text-xs text-slate-500">
            No incident records matched your query.
          </div>
        ) : null}
      </div>

      {/* Selected Incident Drawer / Modal Simulator */}
      {selectedIncident ? (
        <div className="mt-6 rounded-md border-2 border-navy bg-white p-5 shadow-sm font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
            <span className="font-bold text-navy uppercase text-sm">
              CAD DOSSIER: {selectedIncident.id}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedIncident(null)}
              className="h-7 text-xs"
            >
              Close Record ✕
            </Button>
          </div>
          <div className="space-y-2 font-sans text-xs text-slate-700">
            <p><strong>Incident Domain:</strong> {selectedIncident.type}</p>
            <p><strong>Location:</strong> {selectedIncident.location}</p>
            <p><strong>Fleet Assigned:</strong> {selectedIncident.unit}</p>
            <p><strong>Response Time:</strong> {selectedIncident.responseTime}</p>
            <p><strong>Clinical Outcome:</strong> {selectedIncident.outcome}</p>
          </div>
        </div>
      ) : null}
    </AppFrame>
  );
}

/* =========================================================================
   10. PROFILE & MEDICAL ID SCREEN: Citizen Emergency Dossier & ICE Card
   ========================================================================= */
export function ProfilePage() {
  const [bloodGroup, setBloodGroup] = useState("O+ Rh Positive");
  const [allergies, setAllergies] = useState("Penicillin, Sulfa Drugs");
  const [chronicConditions, setChronicConditions] = useState("Mild Asthma (Inhaler Carried)");
  const [emergencyNotes, setEmergencyNotes] = useState(
    "Contact father immediately in case of hospitalization. Organ donor registered.",
  );

  const handleSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Citizen Emergency Dossier & Medical ID Updated.");
  };

  return (
    <AppFrame showNav>
      <PageHeader
        title="Citizen Emergency Dossier & Medical ID"
        subtitle="First-Responder Clinical Dossier & In Case of Emergency (ICE) Protocols"
        category="CAD // CITIZEN DOSSIER #RQ-8821"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): Medical ID Form */}
        <div className="lg:col-span-2 space-y-6">
          <TacticalCard
            title="CITIZEN MEDICAL ID & CLINICAL DIRECTIVES"
            badge="PARAMEDIC ACCESSIBLE"
          >
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1.5">
                    Full Citizen Name
                  </label>
                  <Input
                    defaultValue="Ritika Sen"
                    className="font-sans text-sm h-10 border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1.5">
                    Blood Group // Rh Factor
                  </label>
                  <Input
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="font-mono text-sm h-10 border-slate-300 font-bold text-emergency"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1.5">
                  Critical Drug & Environmental Allergies
                </label>
                <Input
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="e.g. Penicillin, NSAIDs, Peanuts..."
                  className="font-sans text-sm h-10 border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1.5">
                  Chronic Conditions & Medical Directives
                </label>
                <Input
                  value={chronicConditions}
                  onChange={(e) => setChronicConditions(e.target.value)}
                  placeholder="e.g. Asthma, Diabetes, Hypertension..."
                  className="font-sans text-sm h-10 border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1.5">
                  First-Responder Emergency Directives
                </label>
                <Textarea
                  rows={3}
                  value={emergencyNotes}
                  onChange={(e) => setEmergencyNotes(e.target.value)}
                  className="font-sans text-sm border-slate-300"
                />
              </div>

              <Button
                type="submit"
                className="bg-navy hover:bg-slate-800 text-white font-mono text-xs uppercase"
              >
                Save Emergency Dossier
              </Button>
            </form>
          </TacticalCard>

          {/* ICE Contacts Card */}
          <TacticalCard
            title="IN CASE OF EMERGENCY (ICE) CONTACT LIST"
            badge="ACTIVE TELEMETRY"
          >
            <div className="space-y-3 font-mono text-xs">
              {[
                { name: "Rajesh Sen", relation: "Father", phone: "+91 98765 43210" },
                { name: "Ananya Sen", relation: "Sister", phone: "+91 98765 43211" },
                { name: "Dr. P. K. Mehta", relation: "Primary Physician", phone: "+91 98765 43212" },
              ].map((c) => (
                <div
                  key={c.phone}
                  className="p-3 rounded border border-slate-200 bg-slate-50 flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-navy font-sans text-sm">{c.name}</p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {c.relation} · {c.phone}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.success(`Simulated Test SMS broadcasted to ${c.name}`)}
                    className="font-mono text-xs h-8 border-slate-300"
                  >
                    Test Alert
                  </Button>
                </div>
              ))}
            </div>
          </TacticalCard>
        </div>

        {/* Right Hardware Telemetry & Identity Column (1/3) */}
        <div className="space-y-6">
          <TacticalCard
            title="CITIZEN ID CARD #RQ-8821"
            badge="VERIFIED"
          >
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded bg-navy text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-emergency">ResQ·AI CITIZEN ID</span>
                  <span className="text-[10px] text-slate-400">#RQ-8821</span>
                </div>
                <p className="text-base font-bold font-sans">Ritika Sen</p>
                <p className="text-xs text-slate-300 font-mono mt-0.5">BLOOD: O+ RH POSITIVE</p>
                <div className="mt-3 pt-2 border-t border-slate-700 flex justify-between text-[10px] text-slate-400">
                  <span>ORGAN DONOR: YES</span>
                  <span>REG: 2026-CAPSTONE</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-600 font-mono space-y-1">
                <p>● GPS Telemetry: HIGH-ACCURACY (±4m)</p>
                <p>● Sensor Telemetry: CRASH DETECT ACTIVE</p>
                <p>● Local Cache: OFFLINE SYNC ENABLED</p>
              </div>
            </div>
          </TacticalCard>

          <SafetyNote />
        </div>
      </div>
    </AppFrame>
  );
}

export { AiAnalysisPage as AnalysisPage, SeverityResultPage as SeverityPage };
