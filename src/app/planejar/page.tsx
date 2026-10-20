import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/ui/page-intro";
import { createCanonicalPageMetadata } from "@/lib/metadata";

export const metadata = createCanonicalPageMetadata(
  "/planejar",
  "Ferramentas para planejar sua viagem",
  "Descubra destinos, organize um roteiro, estime seu orçamento e salve ideias localmente.",
);

const tools = [
  {
    href: "/planejar/quiz",
    title: "Encontre um destino",
    description:
      "Responda a algumas perguntas e veja destinos relacionados aos interesses editoriais disponíveis.",
    action: "Fazer o quiz",
  },
  {
    href: "/roteiro",
    title: "Monte um roteiro",
    description:
      "Organize destinos e experiências em uma lista, mude a ordem e compartilhe um link.",
    action: "Abrir meu roteiro",
  },
  {
    href: "/planejar/orcamento",
    title: "Planeje seu orçamento",
    description:
      "Informe seu orçamento e suas próprias estimativas para visualizar os cálculos.",
    action: "Abrir planejador",
  },
  {
    href: "/salvos",
    title: "Itens salvos",
    description:
      "Reúna destinos e experiências neste navegador, sem criar uma conta.",
    action: "Ver itens salvos",
  },
];

export default function PlanningPage() {
  return (
    <div className="editorial-page planning-hub">
      <Container>
        <PageIntro
          description="Use ferramentas simples para explorar ideias e começar seu planejamento. Nenhuma delas confirma preços, horários, disponibilidade ou reservas."
          eyebrow="Planeje no seu ritmo"
          title="Da inspiração ao seu próximo roteiro"
        />
        <div className="planning-tool-grid">
          {tools.map((tool) => (
            <article className="planning-tool-card" key={tool.href}>
              <h2>{tool.title}</h2>
              <p>{tool.description}</p>
              <Link className="text-link" href={tool.href}>
                {tool.action} <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}
