import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DraAnaContent } from "./dra-ana/draAnaData";

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  // Accessed via Ana's custom domain: serve her full answer surface at "/"
  // — body AND the machine-readable JSON-LD, so LLMs/crawlers read the same
  // verified data a human sees. Metadata (title/description/OG) comes from the
  // root layout's generateMetadata, which host-branches to the same source.
  if (host.includes("draanamariaramirez")) {
    return <DraAnaContent />;
  }

  // Default (vitrina-pro template host): route to the first professional.
  redirect("/dra-ana");
}
