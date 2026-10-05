import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

describe("App routing and screens", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  it("matches a page for / instead of falling back to not found", () => {
    const matches = router.matchRoutes("/");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  const routes = [
    "/splash",
    "/login",
    "/home",
    "/report",
    "/ai-analysis",
    "/severity-result",
    "/tracking",
    "/resolved",
    "/history",
    "/profile",
  ];

  routes.forEach((route) => {
    it(`matches valid route for ${route}`, () => {
      const matches = router.matchRoutes(route);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
      expect(matches.length).toBeGreaterThan(0);
    });
  });
});
