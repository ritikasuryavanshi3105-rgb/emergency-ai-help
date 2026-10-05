import { Link, useNavigate } from "@tanstack/react-router";
import {
  Ambulance,
  Bell,
  BellRing,
  Camera,
  Car,
  Check,
  ChevronRight,
  CircleUserRound,
  Cross,
  Flame,
  HeartPulse,
  Hospital,
  LocateFixed,
  LockKeyhole,
  LogOut,
  MapPin,
  Mic,
  Phone,
  Radio,
  Route as RouteIcon,
  Settings,
  Share2,
  Shield,
  ShieldCheck,
  ShieldPlus,
  Sparkles,
  UserRound,
  UsersRound,
} from "lucide-react";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { AppFrame, BrandMark, PageHeader, SafetyNote, StatusTimeline } from "@/components/resq-ui";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { emergencyProfiles, fallbackReport, historyItems, REPORT_STORAGE_KEY, type EmergencyReport, type EmergencyType } from "@/lib/resq-data";
import { cn } from "@/lib/utils";

const emergencyTypes: Array<{ type: EmergencyType; icon: typeof HeartPulse }> = [
  { type: "Medical Emergency", icon: HeartPulse }, { type: "Road Accident", icon: Car },
  { type: "Fire", icon: Flame }, { type: "Police", icon: Shield }, { type: "Other", icon: Sparkles },
];

function getReport(): EmergencyReport {
  if (typeof window === "undefined") return fallbackReport;
  try {
    const value = window.localStorage.getItem(REPORT_STORAGE_KEY);
    return value ? (JSON.parse(value) as EmergencyReport) : fallbackReport;
  } catch { return fallbackReport; }
}

export function SplashPage() {
  const navigate = useNavigate();
  useEffect(() => { const id = window.setTimeout(() => navigate({ to: "/login" }), 2400); return () => window.clearTimeout(id); }, [navigate]);
  return (
    <div className="relative min-h-screen overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-x-0 bottom-0 h-56 opacity-20" aria-hidden="true">
        <div className="absolute bottom-0 left-[8%] h-24 w-20 bg-primary-foreground/50" />
        <div className="absolute bottom-0 left-[25%] h-40 w-28 bg-primary-foreground/30" />
        <div className="absolute bottom-0 left-[48%] h-28 w-20 bg-primary-foreground/40" />
        <div className="absolute bottom-0 right-[16%] h-48 w-32 bg-primary-foreground/25" />
        <div className="absolute bottom-20 right-[23%] h-20 w-1 bg-emergency" />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center animate-fade-in">
        <div className="mb-7 grid size-24 place-items-center rounded-3xl bg-emergency shadow-emergency animate-pulse-soft"><ShieldPlus className="size-14" strokeWidth={2.2} /></div>
        <h1 className="font-display text-5xl font-extrabold sm:text-6xl">ResQ <span className="text-emergency">AI</span></h1>
        <p className="mt-4 text-lg font-semibold">Report. Respond. Rescue.</p>
        <div className="mt-7 flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm"><Sparkles className="size-4 text-warning" /> Powered by AI</div>
        <div className="absolute bottom-8"><SafetyNote dark /></div>
      </div>
    </div>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [loading, setLoading] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setLoading(true); window.setTimeout(() => navigate({ to: "/home" }), 450); };
  return (
    <AppFrame className="flex max-w-md flex-col justify-center py-10">
      <div className="animate-fade-in"><BrandMark /><div className="mt-12"><h1 className="font-display text-3xl font-extrabold text-primary">Welcome Back</h1><p className="mt-2 text-muted-foreground">Sign in to continue to your emergency dashboard.</p></div>
      <form className="mt-8 space-y-5" onSubmit={submit}>
        <label className="block text-sm font-semibold">Email or mobile number<Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ritika@example.com" className="mt-2 h-12 bg-card" /></label>
        <label className="block text-sm font-semibold">Password<Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="mt-2 h-12 bg-card" /></label>
        <button type="button" onClick={() => toast.info("Password recovery is simulated in this prototype.")} className="text-sm font-semibold text-emergency">Forgot password?</button>
        <Button type="submit" className="h-12 w-full text-base" disabled={loading}>{loading ? "Signing in…" : "Login"}</Button>
      </form>
      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />OR<span className="h-px flex-1 bg-border" /></div>
      <Button variant="outline" className="h-12 w-full bg-card" onClick={() => toast.info("Google sign-in is simulated for this demo.")}><span className="font-extrabold text-primary">G</span> Continue with Google</Button>
      <p className="mt-6 text-center text-sm text-muted-foreground">New to ResQ AI? <button onClick={() => toast.info("Account creation is simulated for this demo.")} className="font-bold text-emergency">Create account</button></p>
      <div className="mt-10"><SafetyNote /></div></div>
    </AppFrame>
  );
}

export function HomePage() {
  const quick = [{ label: "Medical", icon: HeartPulse }, { label: "Accident", icon: Car }, { label: "Fire", icon: Flame }, { label: "Police", icon: Shield }];
  const services = [{ name: "Ambulance", distance: "1.2 km", icon: Ambulance }, { name: "Police", distance: "2.1 km", icon: Shield }, { name: "Fire Station", distance: "3.4 km", icon: Flame }, { name: "Hospital", distance: "2.7 km", icon: Hospital }];
  return <AppFrame showNav><div className="mx-auto max-w-3xl animate-fade-in">
    <header className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">Good afternoon</p><h1 className="font-display text-2xl font-extrabold text-primary">Hello, Ritika <span aria-hidden="true">👋</span></h1><div className="mt-2 flex items-center gap-2 text-xs font-semibold text-success"><span className="size-2 rounded-full bg-success animate-pulse" />Emergency Services Online</div></div><Button variant="outline" size="icon" className="rounded-full bg-card" onClick={() => toast("No new notifications")} aria-label="Notifications"><Bell /></Button></header>
    <section className="mt-8 rounded-2xl bg-primary p-6 text-primary-foreground shadow-card"><p className="text-sm text-primary-foreground/70">Need immediate help?</p><h2 className="mt-1 text-xl font-bold">Start a guided emergency report</h2><Button asChild className="mt-6 h-16 w-full bg-emergency text-base font-extrabold text-emergency-foreground shadow-emergency hover:bg-emergency/90"><Link to="/report"><BellRing className="size-6" />REPORT EMERGENCY</Link></Button></section>
    <section className="mt-8"><h2 className="text-lg font-bold text-primary">Quick Emergency</h2><div className="mt-4 grid grid-cols-4 gap-2 sm:gap-4">{quick.map(({ label, icon: Icon }) => <Link key={label} to="/report" className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-2 text-center text-xs font-semibold shadow-card transition-transform hover:-translate-y-1 sm:text-sm"><Icon className="size-6 text-emergency" />{label}</Link>)}</div></section>
    <section className="mt-8"><div className="flex items-end justify-between"><h2 className="text-lg font-bold text-primary">Nearby Services</h2><span className="text-xs text-muted-foreground">Simulated distances</span></div><div className="mt-4 grid gap-3 sm:grid-cols-2">{services.map(({ name, distance, icon: Icon }) => <div key={name} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card"><span className="grid size-11 place-items-center rounded-lg bg-accent text-primary"><Icon className="size-5" /></span><div className="flex-1"><p className="font-bold">{name}</p><p className="text-xs text-success">Available</p></div><span className="text-sm font-semibold text-muted-foreground">{distance}</span></div>)}</div></section>
    <div className="mt-8"><SafetyNote /></div></div></AppFrame>;
}

export function ReportPage() {
  const navigate = useNavigate(); const initial = getReport();
  const [type, setType] = useState<EmergencyType | "">(initial.type); const [description, setDescription] = useState(initial.description); const [location, setLocation] = useState(initial.location); const [errors, setErrors] = useState({ type: "", description: "" });
  const submit = (e: FormEvent) => { e.preventDefault(); const next = { type: type ? "" : "Select an emergency type.", description: description.trim() ? "" : "Describe what happened." }; setErrors(next); if (!type || !description.trim()) return; window.localStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify({ type, description: description.trim(), location })); navigate({ to: "/ai-analysis" }); };
  return <AppFrame><div className="mx-auto max-w-3xl animate-fade-in"><PageHeader title="Report Emergency" subtitle="Tell us what happened. This report remains on your device." />
    <form onSubmit={submit} className="space-y-7"><section><h2 className="font-bold text-primary">Emergency type</h2><div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">{emergencyTypes.map(({ type: itemType, icon: Icon }) => <Button type="button" variant="outline" key={itemType} onClick={() => { setType(itemType); setErrors((x) => ({ ...x, type: "" })); }} className={cn("flex h-28 whitespace-normal flex-col items-center justify-center gap-2 rounded-xl border p-3 text-center text-xs font-semibold transition-all", type === itemType ? "border-emergency bg-emergency-soft text-emergency shadow-card hover:bg-emergency-soft hover:text-emergency" : "border-border bg-card hover:border-emergency/40")}><Icon className="size-6" />{itemType}</Button>)}</div>{errors.type ? <p className="mt-2 text-sm font-medium text-emergency">{errors.type}</p> : null}</section>
    <section><label htmlFor="description" className="font-bold text-primary">Emergency description</label><Textarea id="description" value={description} onChange={(e) => { setDescription(e.target.value); setErrors((x) => ({ ...x, description: "" })); }} placeholder="Describe the situation and any visible risks…" className="mt-3 min-h-32 resize-none bg-card" maxLength={500} /><div className="mt-1 flex justify-between text-xs text-muted-foreground"><span>{errors.description ? <span className="font-medium text-emergency">{errors.description}</span> : "Include only details you can observe."}</span><span>{description.length}/500</span></div></section>
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-3"><Button type="button" variant="outline" className="h-12 bg-card" onClick={() => toast.info("Voice input is simulated in this prototype.")}><Mic />Voice Input</Button><Button type="button" variant="outline" className="h-12 bg-card" onClick={() => toast.success("Sample photo attached for this demo.")}><Camera />Add Photo</Button><Button type="button" variant="outline" className="col-span-2 h-12 bg-card sm:col-span-1" onClick={() => { setLocation("Current Location"); toast.success("Using simulated current location."); }}><LocateFixed />{location || "Use Current Location"}</Button></section>
    <Button type="submit" className="h-14 w-full bg-emergency text-base font-bold text-emergency-foreground hover:bg-emergency/90"><Sparkles />Analyze Emergency</Button></form><div className="mt-7"><SafetyNote /></div></div></AppFrame>;
}

export function AnalysisPage() {
  const navigate = useNavigate(); const [progress, setProgress] = useState(0);
  useEffect(() => { const id = window.setInterval(() => setProgress((p) => Math.min(100, p + 4)), 90); const next = window.setTimeout(() => navigate({ to: "/severity-result" }), 2800); return () => { window.clearInterval(id); window.clearTimeout(next); }; }, [navigate]);
  const steps = ["Understanding incident", "Identifying emergency type", "Estimating severity", "Finding appropriate response"];
  return <div className="min-h-screen bg-primary text-primary-foreground"><main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-10 text-center"><div className="mx-auto grid size-24 place-items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10"><Sparkles className="size-10 text-warning animate-pulse-soft" /></div><p className="mt-8 text-sm font-semibold uppercase text-primary-foreground/60">ResQ Intelligence</p><h1 className="mt-2 font-display text-3xl font-extrabold">AI is analyzing the emergency…</h1><p className="mt-3 text-sm text-primary-foreground/65">Running a safe, simulated assessment for this prototype.</p><div className="mt-10 rounded-2xl bg-primary-foreground/10 p-6 text-left" aria-live="polite"><div className="mb-5 flex items-end justify-between"><span className="text-sm font-semibold">Analysis progress</span><span className="text-2xl font-bold">{progress}%</span></div><Progress value={progress} className="h-2.5 bg-primary-foreground/15 [&>div]:bg-emergency" /><div className="mt-7 space-y-4">{steps.map((step, index) => { const done = progress >= (index + 1) * 23; return <div key={step} className="flex items-center gap-3 text-sm"><span className={cn("grid size-6 place-items-center rounded-full border", done ? "border-success bg-success text-success-foreground" : "border-primary-foreground/25 text-primary-foreground/50")}>{done ? <Check className="size-3.5" /> : <span className="size-1.5 rounded-full bg-current" />}</span><span className={done ? "font-semibold" : "text-primary-foreground/60"}>{step}</span></div>; })}</div></div><div className="mt-8"><SafetyNote dark /></div></main></div>;
}

export function SeverityPage() {
  const report = getReport(); const profile = emergencyProfiles[report.type];
  return <AppFrame><div className="mx-auto max-w-3xl animate-fade-in"><PageHeader title="Emergency Assessment" subtitle="Simulated AI assessment based on your report" backTo="/report" /><section className="overflow-hidden rounded-2xl border border-emergency/30 bg-card shadow-card"><div className="bg-emergency p-6 text-emergency-foreground"><div className="flex items-center gap-3"><ShieldCheck className="size-8" /><div><p className="text-xs font-bold uppercase">{profile.severity} emergency</p><h2 className="text-2xl font-extrabold">{report.type}</h2></div></div></div><div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">{[["Severity", profile.severity], ["Confidence", `${profile.confidence}%`], ["Priority", profile.priority], ["Response", profile.response]].map(([label, value]) => <div key={label} className="bg-card p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 text-sm font-extrabold text-primary">{value}</p></div>)}</div></section>
    <div className="mt-5 grid gap-5 sm:grid-cols-2"><section className="rounded-xl border border-border bg-card p-5 shadow-card"><div className="flex items-center gap-2 text-primary"><Sparkles className="size-5" /><h2 className="font-bold">AI Assessment</h2></div><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{profile.explanation}</p></section><section className="rounded-xl border border-border bg-card p-5 shadow-card"><div className="flex items-center gap-2 text-primary"><MapPin className="size-5" /><h2 className="font-bold">Incident Location</h2></div><p className="mt-3 font-semibold">{report.location || "Current Location"}</p><p className="mt-1 text-xs text-muted-foreground">Simulated location · not shared externally</p></section></div>
    <div className="mt-7 grid gap-3 sm:grid-cols-2"><Button asChild className="h-13 bg-emergency text-emergency-foreground hover:bg-emergency/90"><Link to="/tracking"><Ambulance />View Response</Link></Button><Button asChild variant="outline" className="h-13 bg-card"><Link to="/report">Edit Report</Link></Button></div><div className="mt-7"><SafetyNote /></div></div></AppFrame>;
}

function MapVisual({ arrived, progress }: { arrived: boolean; progress: number }) {
  return <div className="relative h-80 overflow-hidden rounded-2xl bg-accent shadow-card sm:h-[420px]" aria-label="Simulated emergency response map"><div className="absolute inset-0 opacity-70" style={{ backgroundImage: "linear-gradient(28deg, transparent 47%, var(--background) 48%, var(--background) 53%, transparent 54%), linear-gradient(110deg, transparent 45%, var(--background) 46%, var(--background) 52%, transparent 53%)", backgroundSize: "120px 120px" }} /><div className="absolute left-[16%] top-[18%] h-16 w-24 rounded bg-primary/8"/><div className="absolute bottom-[15%] right-[10%] h-24 w-32 rounded bg-primary/8"/><div className="absolute left-[28%] top-[38%] h-2 w-[48%] rotate-12 rounded-full bg-emergency/30"><span className="block h-full rounded-full bg-emergency transition-all duration-700" style={{ width: `${progress}%` }} /></div><div className="absolute left-[22%] top-[40%] grid size-12 place-items-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-card"><MapPin className="size-5" /></div><div className="absolute top-[31%] grid size-12 place-items-center rounded-full border-4 border-background bg-emergency text-emergency-foreground shadow-emergency transition-all duration-700" style={{ left: `${Math.min(66, 25 + progress * 0.4)}%` }}><Ambulance className="size-5" /></div><div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-card px-3 py-2 text-xs font-bold text-emergency shadow-card"><span className="size-2 rounded-full bg-emergency animate-pulse" />LIVE · SIMULATED</div>{arrived ? <div className="absolute inset-x-5 bottom-5 rounded-xl bg-success p-4 text-center font-bold text-success-foreground shadow-card">Response team has arrived</div> : null}</div>;
}

export function TrackingPage() {
  const navigate = useNavigate(); const [elapsed, setElapsed] = useState(0); const arrived = elapsed >= 6; const eta = Math.max(0, 6 - elapsed);
  useEffect(() => { const id = window.setInterval(() => setElapsed((x) => Math.min(6, x + 1)), 1300); return () => window.clearInterval(id); }, []);
  const timeline = [{ label: "Emergency reported", complete: true }, { label: "AI assessment completed", complete: true }, { label: "Response team assigned", complete: true }, { label: "Ambulance on the way", complete: !arrived, active: !arrived }, { label: "Response team arrived", complete: arrived }];
  return <AppFrame><div className="mx-auto max-w-5xl animate-fade-in"><PageHeader title="Live Response Tracking" subtitle="Prototype movement and ETA simulation" backTo="/severity-result" /><div className="grid gap-5 lg:grid-cols-[1.4fr_0.8fr]"><MapVisual arrived={arrived} progress={(elapsed / 6) * 100} /><aside className="space-y-5"><section className="rounded-2xl border border-border bg-card p-5 shadow-card"><div className="flex items-start justify-between"><div><p className="text-sm text-muted-foreground">Ambulance {arrived ? "Arrived" : "Arriving"}</p><p className="mt-1 text-3xl font-extrabold text-primary">{arrived ? "On scene" : `${eta} min`}</p></div><span className="grid size-12 place-items-center rounded-xl bg-emergency-soft text-emergency"><Ambulance className="size-6" /></span></div><div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm"><div><p className="text-xs text-muted-foreground">Unit</p><p className="font-bold">AMB-204</p></div><div><p className="text-xs text-muted-foreground">Distance</p><p className="font-bold">{arrived ? "0 km" : "1.2 km"}</p></div><div className="col-span-2"><p className="text-xs text-muted-foreground">Provider</p><p className="font-bold">City Care Ambulance</p></div></div><div className="mt-5 grid grid-cols-2 gap-3"><Button variant="outline" onClick={() => toast.info("Calling is disabled in this prototype.")}><Phone />Call Team</Button><Button variant="outline" onClick={() => toast.success("A simulated location link was prepared.")}><Share2 />Share</Button></div></section><section className="rounded-2xl border border-border bg-card p-5 shadow-card"><h2 className="mb-5 font-bold text-primary">Response timeline</h2><StatusTimeline items={timeline} /></section><Button disabled={!arrived} onClick={() => navigate({ to: "/resolved" })} className="h-13 w-full bg-success text-success-foreground hover:bg-success/90">Complete Emergency</Button></aside></div><div className="mt-7"><SafetyNote /></div></div></AppFrame>;
}

export function ResolvedPage() {
  const report = getReport(); const profile = emergencyProfiles[report.type];
  return <AppFrame><div className="mx-auto max-w-2xl py-6 animate-fade-in"><div className="text-center"><div className="mx-auto grid size-24 place-items-center rounded-full bg-success-soft text-success"><Check className="size-12" strokeWidth={3} /></div><h1 className="mt-6 font-display text-3xl font-extrabold text-primary">Emergency Resolved</h1><p className="mt-2 text-sm text-muted-foreground">Simulated response completed successfully</p></div><section className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card"><div className="flex items-center justify-between border-b border-border pb-5"><div><p className="text-xs font-semibold uppercase text-muted-foreground">Request ID</p><p className="mt-1 font-bold text-primary">ER-2026-10482</p></div><span className="rounded-full bg-success-soft px-3 py-1 text-xs font-bold text-success">Resolved</span></div><dl className="mt-5 grid grid-cols-2 gap-5 text-sm">{[["Emergency", report.type], ["Severity", profile.severity], ["Response", profile.response], ["Unit", "AMB-204"], ["Response Time", "7 min"], ["Status", "Resolved"]].map(([term, value]) => <div key={term}><dt className="text-xs text-muted-foreground">{term}</dt><dd className="mt-1 font-bold">{value}</dd></div>)}</dl></section><section className="mt-5 rounded-2xl border border-border bg-card p-6 shadow-card"><h2 className="mb-5 font-bold text-primary">Completed timeline</h2><StatusTimeline items={["Emergency reported", "AI assessment completed", "Response team assigned", "Ambulance arrived", "Emergency resolved"].map((label) => ({ label, complete: true }))} /></section><div className="mt-7 grid gap-3 sm:grid-cols-2"><Button variant="outline" onClick={() => toast.info("The emergency report is summarized above.")}>View Emergency Report</Button><Button asChild><Link to="/home">Back to Home</Link></Button></div><div className="mt-7"><SafetyNote /></div></div></AppFrame>;
}

export function HistoryPage() {
  const [selected, setSelected] = useState<(typeof historyItems)[number] | null>(null);
  return <AppFrame showNav><div className="mx-auto max-w-3xl animate-fade-in"><header><p className="text-sm font-semibold text-emergency">Your activity</p><h1 className="mt-1 font-display text-3xl font-extrabold text-primary">Emergency History</h1><p className="mt-2 text-sm text-muted-foreground">Previous simulated reports and outcomes</p></header><div className="mt-7 space-y-3">{historyItems.map((item) => <button key={item.id} onClick={() => setSelected(item)} className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-5 text-left shadow-card transition-transform hover:-translate-y-0.5"><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-emergency-soft text-emergency">{item.type.includes("Fire") ? <Flame /> : item.type.includes("Medical") ? <HeartPulse /> : <Car />}</span><div className="min-w-0 flex-1"><p className="font-bold text-primary">{item.type}</p><div className="mt-1 flex flex-wrap items-center gap-2 text-xs"><span className="font-semibold text-emergency">{item.severity}</span><span className="text-muted-foreground">• {item.date}</span><span className="rounded-full bg-success-soft px-2 py-0.5 font-bold text-success">Resolved</span></div></div><ChevronRight className="size-5 text-muted-foreground" /></button>)}</div><div className="mt-8"><SafetyNote /></div></div><Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}><DialogContent className="max-w-sm rounded-2xl"><DialogHeader><DialogTitle className="text-primary">{selected?.type}</DialogTitle><DialogDescription>Emergency details for {selected?.id}</DialogDescription></DialogHeader><div className="grid grid-cols-2 gap-4 pt-2 text-sm"><div><p className="text-xs text-muted-foreground">Severity</p><p className="font-bold">{selected?.severity}</p></div><div><p className="text-xs text-muted-foreground">Status</p><p className="font-bold text-success">Resolved</p></div><div className="col-span-2"><p className="text-xs text-muted-foreground">Response</p><p className="font-bold">{selected?.response}</p></div></div></DialogContent></Dialog></AppFrame>;
}

export function ProfilePage() {
  const options = [{ label: "Personal Information", icon: UserRound }, { label: "Emergency Contacts", icon: UsersRound }, { label: "Location Permissions", icon: MapPin }, { label: "Notifications", icon: Bell }, { label: "Settings", icon: Settings }];
  return <AppFrame showNav><div className="mx-auto max-w-3xl animate-fade-in"><header><p className="text-sm font-semibold text-emergency">Your account</p><h1 className="mt-1 font-display text-3xl font-extrabold text-primary">Profile</h1></header><section className="mt-7 flex items-center gap-5 rounded-2xl bg-primary p-6 text-primary-foreground shadow-card"><div className="grid size-20 shrink-0 place-items-center rounded-full bg-primary-foreground/12 text-2xl font-extrabold">R</div><div className="min-w-0"><h2 className="text-2xl font-extrabold">Ritika</h2><p className="mt-1 truncate text-sm text-primary-foreground/70">ritika@example.com</p><p className="text-sm text-primary-foreground/70">+91 ••••• 4821</p></div></section><section className="mt-5 overflow-hidden rounded-2xl border border-border bg-card shadow-card">{options.map(({ label, icon: Icon }, index) => <button key={label} onClick={() => toast.info(`${label} is a prototype setting.`)} className={cn("flex w-full items-center gap-4 p-4 text-left hover:bg-accent", index < options.length - 1 && "border-b border-border")}><span className="grid size-10 place-items-center rounded-lg bg-accent text-primary"><Icon className="size-5" /></span><span className="flex-1 font-semibold">{label}</span><ChevronRight className="size-5 text-muted-foreground" /></button>)}</section><Button asChild variant="outline" className="mt-5 h-12 w-full border-emergency/30 text-emergency hover:bg-emergency-soft hover:text-emergency"><Link to="/login"><LogOut />Logout</Link></Button><div className="mt-8"><SafetyNote /></div></div></AppFrame>;
}