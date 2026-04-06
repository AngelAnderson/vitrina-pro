import { supabase } from "@/lib/supabase";
import type { Professional, GalleryItem } from "@/lib/supabase";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ChatWidget from "@/components/ChatWidget";
import Gallery from "@/components/Gallery";
import CTAButton from "@/components/CTAButton";
import TrackPageView from "@/components/TrackPageView";

async function getProfessional(slug: string): Promise<Professional | null> {
  const { data } = await supabase
    .from("professionals")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();
  return data as Professional | null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pro = await getProfessional(slug);
  if (!pro) return { title: "No encontrado" };
  return {
    title: `${pro.name} — ${pro.profession} en Cabo Rojo`,
    description:
      pro.tagline ||
      `${pro.name}, ${pro.profession} en Cabo Rojo, Puerto Rico. Llama al ${pro.phone}.`,
    openGraph: {
      title: `${pro.name} — ${pro.profession}`,
      description: pro.tagline || `${pro.profession} en Cabo Rojo`,
      type: "website",
    },
  };
}

export default async function ProfessionalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pro = await getProfessional(slug);
  if (!pro) notFound();

  const accentColor = pro.accent_color || "#0d9488";

  return (
    <main className="min-h-screen bg-white">
      <TrackPageView professionalId={pro.id} />

      {/* Hero */}
      <section
        className="px-6 py-16 text-center text-white"
        style={{ backgroundColor: accentColor }}
      >
        <h1 className="text-3xl font-bold sm:text-4xl">{pro.name}</h1>
        <p className="mt-2 text-lg opacity-90">{pro.profession}</p>
        {pro.tagline && (
          <p className="mx-auto mt-4 max-w-md text-base opacity-80">
            {pro.tagline}
          </p>
        )}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <CTAButton
            type="call"
            phone={pro.phone}
            professionalId={pro.id}
            accentColor={accentColor}
          />
          {pro.whatsapp_url && (
            <CTAButton
              type="whatsapp"
              url={pro.whatsapp_url}
              professionalId={pro.id}
              accentColor={accentColor}
            />
          )}
        </div>
      </section>

      {/* Gallery */}
      {pro.gallery && pro.gallery.length > 0 && (
        <section className="px-6 py-12">
          <h2
            className="mb-8 text-center text-2xl font-bold"
            style={{ color: accentColor }}
          >
            Resultados
          </h2>
          <Gallery items={pro.gallery} />
        </section>
      )}

      {/* Services */}
      {pro.services && pro.services.length > 0 && (
        <section className="bg-gray-50 px-6 py-12">
          <h2
            className="mb-8 text-center text-2xl font-bold"
            style={{ color: accentColor }}
          >
            Servicios
          </h2>
          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
            {pro.services.map((service, i) => (
              <div key={i} className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900">{service.name}</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {service.description}
                </p>
                <p
                  className="mt-2 text-sm font-medium"
                  style={{ color: accentColor }}
                >
                  {service.price_range}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="px-6 py-12 text-center">
        <p className="mb-4 text-lg text-gray-700">
          Agenda tu cita hoy
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <CTAButton
            type="call"
            phone={pro.phone}
            professionalId={pro.id}
            accentColor={accentColor}
          />
          {pro.whatsapp_url && (
            <CTAButton
              type="whatsapp"
              url={pro.whatsapp_url}
              professionalId={pro.id}
              accentColor={accentColor}
            />
          )}
        </div>
        <p className="mt-6 text-xs text-gray-400">
          Vitrina por{" "}
          <a href="https://caborojo.com" className="underline">
            CaboRojo.com
          </a>
        </p>
      </section>

      {/* Chat Widget */}
      <ChatWidget professional={pro} />
    </main>
  );
}
