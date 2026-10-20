import { Container } from "@/components/layout/container";
import { BudgetPlanner } from "@/components/planning/budget-planner";
import { PageIntro } from "@/components/ui/page-intro";
import { createCanonicalPageMetadata } from "@/lib/metadata";

export const metadata = createCanonicalPageMetadata(
  "/planejar/orcamento",
  "Planejador de orçamento de viagem",
  "Organize seu orçamento em reais usando suas próprias estimativas, sem tarifas ou preços fornecidos pela Lativera.",
);

export default function BudgetPlannerPage() {
  return (
    <div className="editorial-page">
      <Container>
        <PageIntro
          description="Informe os valores que você pesquisou para ter um resumo editável. A Lativera não consulta tarifas, preços ou cotações."
          eyebrow="Estimativa pessoal"
          title="Organize o orçamento da viagem"
        />
        <BudgetPlanner />
      </Container>
    </div>
  );
}
