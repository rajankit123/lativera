import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plane } from "lucide-react";
import { Container } from "@/components/layout/container";
import { DestinationBrowser } from "@/components/ui/destination-browser";
import { TravelImage } from "@/components/ui/travel-image";
import { destinations } from "@/data/destinations";
import { createCanonicalPageMetadata } from "@/lib/metadata";

const title = "Destinos no Brasil para explorar";
const description =
  "Descubra praias, cidades, natureza e cultura pelo Brasil. Explore destinos, filtre por região e encontre informações úteis para planejar sua viagem.";
export const metadata: Metadata = createCanonicalPageMetadata(
  "/destinos",
  title,
  description,
  {
    url: "/images/lencois-dunes-water.jpg",
    alt: "Dunas e lagoas nos Lençóis Maranhenses, no Maranhão",
  },
);

const questions = [
  {
    question: "Como escolher um destino para viajar no Brasil?",
    answer:
      "Comece pelo tipo de experiência que procura, pela região e pelo tempo disponível. Use os filtros para comparar destinos e consulte informações locais atualizadas antes de fechar seu roteiro.",
  },
  {
    question: "A Lativera mostra voos disponíveis e preços em tempo real?",
    answer:
      "Não. A página de voos reúne rotas cadastradas e formas de pedir atendimento. Horários, tarifas e disponibilidade precisam ser confirmados com a equipe e o provedor antes da compra.",
  },
  {
    question: "Como posso pedir ajuda para planejar um voo?",
    answer:
      "Acesse a página de voos, escolha uma rota cadastrada ou pesquise um destino e entre em contato por telefone ou WhatsApp. A página não realiza reservas automaticamente.",
  },
];

export default function DestinationsPage() {
  return (
    <>
      <section className="destinations-hero">
        <div className="destinations-hero-image image-frame">
          <TravelImage
            alt="Dunas e lagoas nos Lençóis Maranhenses, no Maranhão"
            className="destinations-hero-photo"
            preload
            sizes="100vw"
            src="/images/lencois-dunes-water.jpg"
          />
          <div aria-hidden="true" className="destinations-hero-shade" />
        </div>
        <Container>
          <div className="destinations-hero-content">
            <p className="eyebrow">Descubra o Brasil com a Lativera</p>
            <h1>Descubra os melhores destinos do Brasil</h1>
            <p>
              Explore praias, cidades, natureza e experiências culturais.
              Encontre informações úteis para planejar sua próxima viagem.
            </p>
            <div className="destinations-hero-actions">
              <Link className="button button-light" href="#explorar-destinos">
                Explorar destinos <ArrowRight aria-hidden="true" size={17} />
              </Link>
              <Link className="destinations-hero-link" href="/voos">
                <Plane aria-hidden="true" size={17} />
                Precisa de ajuda com seu voo?
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="explorar-titulo"
        className="destination-listing-section"
        id="explorar-destinos"
      >
        <Container>
          <header className="section-heading destination-listing-heading">
            <div>
              <p className="eyebrow">Inspire seu próximo roteiro</p>
              <h2 id="explorar-titulo">Encontre um lugar com a sua cara</h2>
              <p>
                Pesquise pelo nome ou escolha uma região e um tipo de viagem.
                Cada destino reúne ideias e orientações para começar a planejar.
              </p>
            </div>
          </header>
          <DestinationBrowser destinations={destinations} />
        </Container>
      </section>

      <section className="destination-assistance">
        <Container>
          <div className="destination-assistance-copy">
            <p className="eyebrow">Atendimento da equipe Lativera</p>
            <h2>Já escolheu para onde quer ir?</h2>
            <p>
              Consulte as rotas cadastradas e fale com a equipe sobre sua
              viagem. Horários, tarifas e disponibilidade devem ser confirmados
              com o provedor.
            </p>
            <Link className="button button-light" href="/voos">
              Consultar informações de voo{" "}
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </Container>
      </section>

      <section aria-labelledby="destination-faq-title" className="destination-faq">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Antes de planejar</p>
              <h2 id="destination-faq-title">Dúvidas sobre destinos e voos</h2>
            </div>
          </div>
          <div className="faq-list">
            {questions.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
