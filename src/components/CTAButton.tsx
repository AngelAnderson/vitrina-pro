"use client";

function trackClick(professionalId: string, eventType: string) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ professional_id: professionalId, event_type: eventType }),
  }).catch(() => {});
}

export default function CTAButton({
  type,
  phone,
  url,
  professionalId,
  accentColor,
}: {
  type: "call" | "whatsapp";
  phone?: string;
  url?: string;
  professionalId: string;
  accentColor: string;
}) {
  const isCall = type === "call";
  const href = isCall ? `tel:${phone}` : url || "#";
  const label = isCall ? `Llamar al ${phone}` : "WhatsApp";
  const eventType = isCall ? "call_click" : "whatsapp_click";

  return (
    <a
      href={href}
      onClick={() => trackClick(professionalId, eventType)}
      className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold shadow-md transition-transform hover:scale-105"
      style={
        isCall
          ? { backgroundColor: "white", color: accentColor }
          : { backgroundColor: "#25D366", color: "white" }
      }
    >
      {isCall ? (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        </svg>
      )}
      {label}
    </a>
  );
}
