"use client";

import { useState, useRef, useEffect } from "react";
import type { Professional } from "@/lib/supabase";

type Message = { role: "assistant" | "user"; content: string };

export default function ChatWidget({ professional }: { professional: Professional }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const accentColor = professional.accent_color || "#0d9488";

  useEffect(() => {
    if (open && messages.length === 0) {
      const greeting =
        professional.chat_config?.greeting ||
        `Hola! Soy el asistente de ${professional.name}. Cuéntame, qué necesitas?`;
      setMessages([{ role: "assistant", content: greeting }]);

      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          professional_id: professional.id,
          event_type: "chat_start",
        }),
      }).catch(() => {});
    }
  }, [open, messages.length, professional]);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: professional.slug, message: userMsg }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Disculpa, hubo un error. Llama directamente al ${professional.phone}.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
        style={{ backgroundColor: accentColor }}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
      >
        {open ? (
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-96 w-80 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:w-96">
          {/* Header */}
          <div
            className="px-4 py-3 text-white"
            style={{ backgroundColor: accentColor }}
          >
            <p className="text-sm font-semibold">{professional.name}</p>
            <p className="text-xs opacity-80">Asistente virtual</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-3 ${msg.role === "user" ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-gray-100 text-gray-800"
                      : "text-white"
                  }`}
                  style={
                    msg.role === "assistant"
                      ? { backgroundColor: accentColor }
                      : undefined
                  }
                >
                  {msg.content}
                </span>
              </div>
            ))}
            {loading && (
              <div className="mb-3 text-left">
                <span
                  className="inline-block rounded-2xl px-4 py-2 text-sm text-white"
                  style={{ backgroundColor: accentColor }}
                >
                  ...
                </span>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex border-t px-3 py-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu consulta..."
              className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-800 outline-none"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="ml-2 rounded-full p-2 text-white disabled:opacity-50"
              style={{ backgroundColor: accentColor }}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
