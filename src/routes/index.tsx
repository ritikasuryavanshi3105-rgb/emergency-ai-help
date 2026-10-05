import { createFileRoute, redirect } from "@tanstack/react-router";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/splash" });
  },
  head: () => ({
    meta: [
      { title: "ResQ AI — Report. Respond. Rescue." },
      { name: "description", content: "Open the ResQ AI emergency response prototype." },
      { property: "og:title", content: "ResQ AI — Report. Respond. Rescue." },
      { property: "og:description", content: "Open the ResQ AI emergency response prototype." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => null,
});
