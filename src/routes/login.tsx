import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/components/resq-pages";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [
    { title: "Welcome Back — ResQ AI" }, { name: "description", content: "Sign in to the ResQ AI educational prototype." },
    { property: "og:title", content: "Welcome Back — ResQ AI" }, { property: "og:description", content: "Sign in to the ResQ AI educational prototype." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: LoginPage,
});