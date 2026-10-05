import { createFileRoute } from "@tanstack/react-router";
import { SeverityPage } from "@/components/resq-pages";

export const Route = createFileRoute("/severity-result")({
  head: () => ({ meta: [
    { title: "Emergency Assessment — ResQ AI" }, { name: "description", content: "Review a simulated emergency severity and response recommendation." },
    { property: "og:title", content: "Emergency Assessment — ResQ AI" }, { property: "og:description", content: "Review a simulated emergency severity and response recommendation." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: SeverityPage,
});