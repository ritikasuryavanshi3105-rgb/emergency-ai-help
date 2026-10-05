import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/resq-pages";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [
    { title: "Emergency Dashboard — ResQ AI" }, { name: "description", content: "View simulated emergency tools and nearby services in ResQ AI." },
    { property: "og:title", content: "Emergency Dashboard — ResQ AI" }, { property: "og:description", content: "View simulated emergency tools and nearby services in ResQ AI." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: HomePage,
});