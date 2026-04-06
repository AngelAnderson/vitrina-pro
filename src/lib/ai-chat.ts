import OpenAI from "openai";
import type { Professional } from "./supabase";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

function buildSystemPrompt(pro: Professional): string {
  const serviceList = pro.services
    .map(
      (s) =>
        `- ${s.name}: ${s.description} (${s.price_range}) [intent: ${s.intent}]`
    )
    .join("\n");

  const intentResponses = pro.chat_config?.intents
    ? Object.entries(pro.chat_config.intents)
        .map(
          ([key, val]) =>
            `- ${key}: "${val.response}" (urgency: ${val.urgency}, show_gallery: ${val.show_gallery})`
        )
        .join("\n")
    : "No specific intent responses configured.";

  return `You are the virtual assistant for ${pro.name}, a ${pro.profession} in Cabo Rojo, Puerto Rico.
Your job: understand what the patient needs and connect them with ${pro.name}.

Available services:
${serviceList || "General consultation available."}

Intent responses:
${intentResponses}

When the patient describes their need:
1. Classify as: pain, aesthetics, routine, or emergency
2. Respond with the matching intent message
3. If the intent has show_gallery: true, mention that you can show before/after results
4. End with the appropriate CTA:
   - high urgency: "Llama ahora al ${pro.phone}"
   - medium/low urgency: "${pro.whatsapp_url ? `Escríbele por WhatsApp: ${pro.whatsapp_url}` : `Llama al ${pro.phone}`}"

If you cannot classify the intent, respond with:
"${pro.chat_config?.fallback || `No estoy seguro de cómo ayudarte. Llama directamente al ${pro.phone}`}"

Rules:
- Always respond in Spanish
- Be warm, professional, brief (2-3 sentences max)
- Never diagnose
- Never promise results
- Always direct to calling or WhatsApp`;
}

export async function chat(
  pro: Professional,
  message: string
): Promise<string> {
  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: buildSystemPrompt(pro) },
      { role: "user", content: message },
    ],
    max_tokens: 200,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content || pro.chat_config?.fallback || "Llama directamente para más información.";
}
