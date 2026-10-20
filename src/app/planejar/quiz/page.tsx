import { Container } from "@/components/layout/container";
import { DestinationQuiz } from "@/components/planning/destination-quiz";
import { PageIntro } from "@/components/ui/page-intro";
import { createCanonicalPageMetadata } from "@/lib/metadata";

export const metadata = createCanonicalPageMetadata(
  "/planejar/quiz",
  "Encontre um destino brasileiro",
  "Responda sobre interesses e estilo de viagem para descobrir destinos relacionados ao conteúdo da Lativera.",
);

export default function DestinationQuizPage() {
  return (
    <div className="editorial-page">
      <Container>
        <PageIntro
          description="Suas respostas ajudam a relacionar interesses aos temas cadastrados nos destinos. A ferramenta não prevê custos nem disponibilidade."
          eyebrow="Descoberta personalizada"
          title="Qual destino combina com você?"
        />
        <DestinationQuiz />
      </Container>
    </div>
  );
}
