import { createFileRoute } from "@tanstack/react-router";
import { TrackingPage } from "@/components/resq-pages";

export const Route = createFileRoute("/tracking")({
  head: () => ({ meta: [
    { title: "Live Response Tracking — ResQ AI" }, { name: "description", content: "Follow a simulated emergency response unit and ETA." },
    { property: "og:title", content: "Live Response Tracking — ResQ AI" }, { property: "og:description", content: "Follow a simulated emergency response unit and ETA." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: TrackingPage,
});