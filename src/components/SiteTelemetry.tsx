"use client";

import type { ComponentType } from "react";
import { useEffect, useState } from "react";

type TelemetryComponent = ComponentType;

export function SiteTelemetry() {
  const [Telemetry, setTelemetry] = useState<TelemetryComponent | null>(null);

  useEffect(() => {
    if (Telemetry) return;

    let mounted = true;

    import("@/components/TelemetryPayload").then((mod) => {
      if (mounted) setTelemetry(() => mod.TelemetryPayload);
    });

    return () => {
      mounted = false;
    };
  }, [Telemetry]);

  if (!Telemetry) {
    return null;
  }

  return <Telemetry />;
}
