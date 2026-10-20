import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { TravelPlannerProvider } from "@/components/planning/travel-planner-provider";
import { getSiteUrl } from "@/lib/metadata";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  applicationName: "Lativera",
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "Lativera | Descubra destinos pelo Brasil",
    template: "%s | Lativera",
  },
  description:
    "Descubra destinos, atrações, experiências e guias de viagem para quem vive no Brasil.",
  openGraph: {
    title: "Lativera | Descubra destinos pelo Brasil",
    description:
      "Descubra destinos, atrações, experiências e guias de viagem para quem vive no Brasil.",
    locale: "pt_BR",
    siteName: "Lativera",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Lativera | Descubra destinos pelo Brasil",
    description:
      "Descubra destinos, atrações, experiências e guias de viagem para quem vive no Brasil.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>
        <TravelPlannerProvider>
          <div className="site-shell">
            <a className="skip-link" href="#conteudo">
              Pular para o conteúdo
            </a>
            <SiteHeader />
            <main className="site-main" id="conteudo">
              {children}
            </main>
            <SiteFooter />
          </div>
        </TravelPlannerProvider>
      </body>
    </html>
  );
}
