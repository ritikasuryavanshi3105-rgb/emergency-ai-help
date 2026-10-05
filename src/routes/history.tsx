import { createFileRoute } from "@tanstack/react-router";
import { HistoryPage } from "@/components/resq-pages";

export const Route = createFileRoute("/history")({
  head: () => ({ meta: [
    { title: "Emergency History — ResQ AI" }, { name: "description", content: "Review previous simulated emergency reports." },
    { property: "og:title", content: "Emergency History — ResQ AI" }, { property: "og:description", content: "Review previous simulated emergency reports." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: HistoryPage,
});