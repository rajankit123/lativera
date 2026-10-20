import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { GuideCard } from "@/components/ui/travel-cards";
import { PageIntro } from "@/components/ui/page-intro";
import { guides } from "@/data/guides";
import { createCanonicalPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createCanonicalPageMetadata(
  "/guias",
  "Guias de viagem",
  "Ideias, orientações práticas e inspiração para organizar sua próxima viagem pelo Brasil.",
);

export default function GuidesPage() {
  return (
    <div className="listing-page">
      <Container>
        <PageIntro
          description="Leituras para organizar os próximos passos e conhecer melhor os lugares que despertam sua curiosidade."
          eyebrow="Histórias e ideias"
          title="Guias para viajar melhor"
        />
        <div className="card-grid card-grid-two listing-grid">
          {guides.map((guide, index) => (
            <GuideCard
              guide={guide}
              imageLoading={index === 0 ? "eager" : "lazy"}
              key={guide.slug}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
