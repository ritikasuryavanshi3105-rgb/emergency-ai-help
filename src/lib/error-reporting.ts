// Internal error telemetry module for ResQ AI Prototype
export function reportApplicationError(error: unknown, context: Record<string, unknown> = {}) {
  if (process.env.NODE_ENV !== "production") {
    console.warn("[ResQ AI Telemetry]", error, context);
  }
}
