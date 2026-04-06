import { readFileSync } from "fs";
import { join } from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dra. Ana M. Ramírez — Dentista en Cabo Rojo, PR",
  description:
    "Dra. Ana M. Ramírez — Dentista familiar y cosmético en Cabo Rojo, Puerto Rico. Estética dental, blanqueamiento, joyería dental y emergencias. 17+ años de experiencia. (787) 255-1665.",
  openGraph: {
    title: "Dra. Ana M. Ramírez — Dentista Cabo Rojo",
    description:
      "17+ años transformando sonrisas en Cabo Rojo. Llama al (787) 255-1665.",
    type: "website",
  },
};

// This HTML is a trusted, developer-authored template file from the build
// directory (not user input). It contains the approved Sonrisa Limpia design
// for Dra. Ana's microsite. No sanitization needed for static build-time content.
export default function DraAnaPage() {
  const html = readFileSync(
    join(process.cwd(), "src/app/dra-ana/template.html"),
    "utf-8"
  );

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/i);

  return (
    <>
      {styleMatch && (
        <style dangerouslySetInnerHTML={{ __html: styleMatch[1] }} />
      )}
      {bodyMatch && (
        <div dangerouslySetInnerHTML={{ __html: bodyMatch[1] }} />
      )}
    </>
  );
}
