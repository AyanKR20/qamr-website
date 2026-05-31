"use client";

import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type TelemetryComponent = ComponentType;

export function SiteTelemetry() {
  const pathname = usePathname();
  const [Telemetry, setTelemetry] = useState<TelemetryComponent | null>(null);
  const isStore = pathname === "/store" || pathname?.startsWith("/store/");

  useEffect(() => {
    if (isStore || Telemetry) return;

    let mounted = true;

    import("@/components/TelemetryPayload").then((mod) => {
      if (mounted) setTelemetry(() => mod.TelemetryPayload);
    });

    return () => {
      mounted = false;
    };
  }, [Telemetry, isStore]);

  if (isStore || !Telemetry) {
    return null;
  }

  return <Telemetry />;
}
