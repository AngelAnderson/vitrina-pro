"use client";

import { useEffect } from "react";

export default function TrackPageView({ professionalId }: { professionalId: string }) {
  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ professional_id: professionalId, event_type: "page_view" }),
    }).catch(() => {});
  }, [professionalId]);

  return null;
}
