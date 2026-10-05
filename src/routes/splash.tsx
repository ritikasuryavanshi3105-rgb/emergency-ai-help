import { createFileRoute } from "@tanstack/react-router";
import { SplashPage } from "@/components/resq-pages";

export const Route = createFileRoute("/splash")({
  head: () => ({
    meta: [
      { title: "ResQ AI — Report. Respond. Rescue." },
      { name: "description", content: "Start the ResQ AI emergency response prototype." },
      { property: "og:title", content: "ResQ AI — Report. Respond. Rescue." },
      { property: "og:description", content: "Start the ResQ AI emergency response prototype." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SplashPage,
});
