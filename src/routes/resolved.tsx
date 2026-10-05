import { createFileRoute } from "@tanstack/react-router";
import { ResolvedPage } from "@/components/resq-pages";

export const Route = createFileRoute("/resolved")({
  head: () => ({ meta: [
    { title: "Emergency Resolved — ResQ AI" }, { name: "description", content: "Review the completed simulated emergency response." },
    { property: "og:title", content: "Emergency Resolved — ResQ AI" }, { property: "og:description", content: "Review the completed simulated emergency response." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ResolvedPage,
});