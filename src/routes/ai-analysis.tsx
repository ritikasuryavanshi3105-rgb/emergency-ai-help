import { createFileRoute } from "@tanstack/react-router";
import { AnalysisPage } from "@/components/resq-pages";

export const Route = createFileRoute("/ai-analysis")({
  head: () => ({ meta: [
    { title: "AI Analysis — ResQ AI" }, { name: "description", content: "Watch a safe simulated AI emergency analysis." },
    { property: "og:title", content: "AI Analysis — ResQ AI" }, { property: "og:description", content: "Watch a safe simulated AI emergency analysis." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: AnalysisPage,
});