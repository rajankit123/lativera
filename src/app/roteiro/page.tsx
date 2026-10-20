import { Container } from "@/components/layout/container";
import { ItineraryPlanner } from "@/components/planning/itinerary-planner";
import { PageIntro } from "@/components/ui/page-intro";
import { createCanonicalPageMetadata } from "@/lib/metadata";

export const metadata = createCanonicalPageMetadata(
  "/roteiro",
  "Meu roteiro de viagem",
  "Organize destinos e experiências em uma lista e compartilhe seu roteiro sem criar uma conta.",
);

export default function ItineraryPage() {
  return (
    <div className="editorial-page">
      <Container>
        <PageIntro
          description="Adicione destinos e experiências, organize a ordem e compartilhe um link. O roteiro é uma lista de ideias, não uma reserva ou cronograma confirmado."
          eyebrow="Seu espaço de planejamento"
          title="Monte seu roteiro pelo Brasil"
        />
        <ItineraryPlanner />
      </Container>
    </div>
  );
}
