import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/components/resq-pages";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Ritika's Profile — ResQ AI" },
      { name: "description", content: "View Ritika's ResQ AI prototype profile and settings." },
      { property: "og:title", content: "Ritika's Profile — ResQ AI" },
      {
        property: "og:description",
        content: "View Ritika's ResQ AI prototype profile and settings.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});
