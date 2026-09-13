import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { DraAnaContent } from "./dra-ana/draAnaData";

async function existeLetrero(slug: string): Promise<boolean> {
  const { data } = await supabase
    .from("professionals")
    .select("slug")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  return Boolean(data);
}

export default async function Home() {
  const headersList = await headers();
  const host = (headersList.get("host") || "").toLowerCase();

  // Accessed via Ana's custom domain: serve her full answer surface at "/"
  // — body AND the machine-readable JSON-LD, so LLMs/crawlers read the same
  // verified data a human sees. Metadata (title/description/OG) comes from the
  // root layout's generateMetadata, which host-branches to the same source.
  if (host.includes("draanamariaramirez")) {
    return <DraAnaContent />;
  }

  // Letreros de cliente: <negocio>.caborojo.com. El subdominio ES el slug.
  //
  // Antes, CUALQUIER host que no fuera el de Ana caia en redirect("/dra-ana").
  // Efecto real: farmaciaencarnacion.caborojo.com — el subdominio que el SOP
  // Pagina Cliente manda a poner en el pitch ("metete y mirala") — llevaba 42
  // dias ensenandole a la farmacia la pagina de una dentista. Un subdominio sin
  // letrero contesta 404, que es la verdad, y no la pagina de otro negocio.
  const esSubdominioCaboRojo =
    host.endsWith(".caborojo.com") && host !== "www.caborojo.com";
  if (esSubdominioCaboRojo) {
    const slug = host.replace(/\.caborojo\.com$/, "");
    if (await existeLetrero(slug)) redirect(`/${slug}`);
    notFound();
  }

  // Default (vitrina-pro template host): route to the first professional.
  redirect("/dra-ana");
}
