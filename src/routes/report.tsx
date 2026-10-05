import { createFileRoute } from "@tanstack/react-router";
import { ReportPage } from "@/components/resq-pages";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report Emergency — ResQ AI" },
      { name: "description", content: "Create a simulated emergency report for AI assessment." },
      { property: "og:title", content: "Report Emergency — ResQ AI" },
      {
        property: "og:description",
        content: "Create a simulated emergency report for AI assessment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportPage,
});
