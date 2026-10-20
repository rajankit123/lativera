import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/ui/page-intro";
import { createCanonicalPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createCanonicalPageMetadata(
  "/faq",
  "Perguntas frequentes",
  "Respostas sobre como explorar destinos, experiências e guias de viagem na Lativera.",
);

const questions = [
  {
    question: "O que encontro na Lativera?",
    answer:
      "A Lativera reúne inspiração sobre destinos, ideias de experiências e guias gerais para ajudar você a começar a planejar viagens.",
  },
  {
    question: "Como encontro um destino?",
    answer:
      "Visite a página Destinos para explorar lugares pelo Brasil. Cada página apresenta uma introdução, destaques e ideias de experiências.",
  },
  {
    question: "As informações substituem fontes oficiais?",
    answer:
      "Não. Informações de acesso, horários, regras, transporte e condições podem mudar. Confirme detalhes atualizados diretamente com parques, atrações, operadores autorizados e canais locais.",
  },
  {
    question: "A Lativera faz reservas ou vende passeios?",
    answer:
      "Não. A Lativera é uma plataforma de descoberta e conteúdo. Não oferece reservas, ingressos ou serviços de viagem.",
  },
  {
    question: "Como uso os guias de viagem?",
    answer:
      "Os guias oferecem ideias e orientações gerais para apoiar seu planejamento. Considere suas necessidades e confirme informações específicas antes de tomar decisões.",
  },
  {
    question: "As experiências têm preço ou disponibilidade garantidos?",
    answer:
      "Não. As páginas apresentam ideias de experiências, não ofertas. Consulte diretamente as fontes locais para informações atualizadas sobre disponibilidade, regras e valores.",
  },
  {
    question: "Como posso enviar uma sugestão?",
    answer:
      "Você pode preencher o formulário de contato para validar sua mensagem. No momento, ele ainda não está conectado a um serviço de envio e não transmite nem armazena as informações.",
  },
];

export default function FAQPage() {
  return (
    <div className="editorial-page faq-page">
      <Container>
        <PageIntro
          description="Informações para aproveitar melhor a plataforma e entender o que esperar dos nossos conteúdos."
          eyebrow="Perguntas frequentes"
          title="Dúvidas, esclarecidas."
        />
        <div className="faq-list">
          {questions.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </div>
  );
}
