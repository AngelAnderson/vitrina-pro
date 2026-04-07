import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/dra-ana-favicon.svg",
  },
};

export default function DraAnaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
