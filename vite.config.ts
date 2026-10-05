// ResQ AI Vite build configuration with TanStack Start integration.
// Pre-configured plugins include TanStack devtools, Start SSR, React, Tailwind CSS, and Nitro.
// Additional configuration can be passed via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
