import { readFileSync } from "fs";
import { join } from "path";
import type { Metadata } from "next";

const BASE_URL = "https://draanamariaramirez.com";

export const metadata: Metadata = {
  title: "Dra. Ana M. Ramírez — Dentista en Cabo Rojo, PR",
  description:
    "Dra. Ana M. Ramírez — Dentista familiar y cosmético en Cabo Rojo, Puerto Rico. Estética dental, blanqueamiento, joyería dental y emergencias. 17+ años de experiencia. (787) 255-1665.",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/dra-ana",
  },
  openGraph: {
    title: "Dra. Ana M. Ramírez — Dentista Cabo Rojo",
    description:
      "17+ años transformando sonrisas en Cabo Rojo. Llama al (787) 255-1665.",
    type: "website",
    url: `${BASE_URL}/dra-ana`,
    siteName: "Dra. Ana M. Ramírez — Dentista",
    locale: "es_PR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dra. Ana M. Ramírez — Dentista en Cabo Rojo, PR",
    description:
      "Estética dental, blanqueamiento, joyería dental y emergencias. 17+ años de experiencia.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Dentist", "LocalBusiness"],
      "@id": `${BASE_URL}/dra-ana#business`,
      name: "Dra. Ana M. Ramírez — Dentista",
      alternateName: "Ana María Ramírez DMD",
      description:
        "Dentista familiar y cosmético en Cabo Rojo, Puerto Rico. Especializada en estética dental, blanqueamiento, joyería dental, consultas generales y emergencias. Más de 17 años de experiencia.",
      url: `${BASE_URL}/dra-ana`,
      telephone: "+17872551665",
      email: "dra.ramirez.dmd@gmail.com",
      image: `${BASE_URL}/dra-ana-og.jpg`,
      priceRange: "$$",
      currenciesAccepted: "USD",
      paymentAccepted: "Cash, Credit Card, Insurance",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Calle Albizu Campos #125",
        addressLocality: "Cabo Rojo",
        addressRegion: "PR",
        postalCode: "00623",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 18.0863,
        longitude: -67.1493,
      },
      areaServed: [
        { "@type": "City", name: "Cabo Rojo" },
        { "@type": "City", name: "Mayagüez" },
        { "@type": "City", name: "San Germán" },
        { "@type": "AdministrativeArea", name: "Puerto Rico" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios Dentales",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Estética Dental",
              description:
                "Tratamientos cosméticos para mejorar la apariencia de su sonrisa.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Joyería Dental",
              description:
                "Aplicación de cristales Swarovski y piedras decorativas en los dientes.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Blanqueamiento Dental",
              description:
                "Blanqueamiento profesional para una sonrisa más brillante.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Consulta General",
              description:
                "Revisión completa, limpieza dental y plan de tratamiento personalizado.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Emergencias Dentales",
              description:
                "Atención de urgencias dentales: dolor, fracturas, infecciones.",
            },
          },
        ],
      },
      employee: {
        "@type": "Person",
        "@id": `${BASE_URL}/dra-ana#person`,
        name: "Ana M. Ramírez",
        jobTitle: "Dentista",
        description:
          "Dentista con más de 17 años de experiencia en Cabo Rojo, Puerto Rico. Especializada en estética dental y joyería dental.",
        telephone: "+17872551665",
        email: "dra.ramirez.dmd@gmail.com",
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Universidad de Puerto Rico — Escuela de Medicina Dental",
        },
      },
      sameAs: [
        "https://caborojo.com/dra-ana-ramirez",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${BASE_URL}/dra-ana#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Dónde está ubicada la Dra. Ana M. Ramírez?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La clínica está ubicada en Calle Albizu Campos #125, Cabo Rojo, Puerto Rico 00623.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuál es el teléfono de la Dra. Ana Ramírez dentista en Cabo Rojo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Puede llamar al (787) 255-1665 para hacer su cita o consultar sobre emergencias dentales.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué servicios ofrece la Dra. Ana Ramírez?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La Dra. Ana M. Ramírez ofrece estética dental, joyería dental, blanqueamiento, consultas generales y atención de emergencias dentales. Tiene más de 17 años de experiencia en Cabo Rojo, Puerto Rico.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué es la joyería dental y cuánto cuesta?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La joyería dental es la aplicación de cristales decorativos (como Swarovski) sobre el esmalte del diente. Es un procedimiento estético no invasivo. Para información de precios llame al (787) 255-1665.",
          },
        },
        {
          "@type": "Question",
          name: "¿La Dra. Ana Ramírez atiende emergencias dentales?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. La Dra. Ana M. Ramírez atiende emergencias dentales en Cabo Rojo. Llame al (787) 255-1665 para información sobre disponibilidad.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuántos años de experiencia tiene la Dra. Ana Ramírez?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La Dra. Ana M. Ramírez tiene más de 17 años de experiencia como dentista en Cabo Rojo, Puerto Rico.",
          },
        },
      ],
    },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {styleMatch && (
        <style dangerouslySetInnerHTML={{ __html: styleMatch[1] }} />
      )}
      {bodyMatch && (
        <div dangerouslySetInnerHTML={{ __html: bodyMatch[1] }} />
      )}
    </>
  );
}
