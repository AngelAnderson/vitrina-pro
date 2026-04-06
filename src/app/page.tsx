import { headers } from "next/headers";
import { readFileSync } from "fs";
import { join } from "path";
import { redirect } from "next/navigation";

// Trusted static HTML template - developer-authored, not user input
export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  // If accessed via Ana's custom domain, serve her page directly at /
  if (host.includes("draanamariaramirez")) {
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

  // Default: redirect to first professional
  redirect("/dra-ana");
}
