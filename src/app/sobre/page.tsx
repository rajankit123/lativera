import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/ui/page-intro";
import { createCanonicalPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createCanonicalPageMetadata(
  "/sobre",
  "Sobre",
  "Conheça a proposta da Lativera: inspirar a descoberta de destinos e facilitar o começo de cada viagem.",
);

export default function AboutPage() {
  return (
    <div className="editorial-page">
      <Container>
        <PageIntro
          description="Uma plataforma para abrir caminhos entre a curiosidade de viajar e os lugares que esperam para ser descobertos."
          eyebrow="Sobre a Lativera"
          title="Toda viagem começa com vontade de descobrir."
        />
        <section className="about-story">
          <div className="about-accent" aria-hidden="true">
            <span>LATIVERA</span>
            <span className="about-accent-symbol">✳</span>
            <span>BRASIL · MUNDO</span>
          </div>
          <div className="about-copy">
            <p className="eyebrow">Nosso propósito</p>
            <h2>Mais inspiração. Mais possibilidades.</h2>
            <p>
              A Lativera existe para ajudar quem vive no Brasil a descobrir
              destinos, experiências e histórias que fazem cada lugar ser
              diferente.
            </p>
            <p>
              Reunimos ideias e orientações para tornar a descoberta mais
              simples: do primeiro destino que chama atenção ao detalhe que
              ajuda a preparar a viagem.
            </p>
            <p>
              Acreditamos que viajar também é observar, aprender e encontrar
              novos pontos de vista. Por aqui, cada jornada começa com
              curiosidade.
            </p>
            <Link className="button button-primary" href="/destinos">
              Encontre um destino <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
        <section className="about-values">
          <div>
            <span className="eyebrow">01 · Descobrir</span>
            <h2>Lugares com muitas camadas</h2>
            <p>
              Destinos, paisagens e culturas apresentados para despertar novas
              perguntas e caminhos.
            </p>
          </div>
          <div>
            <span className="eyebrow">02 · Explorar</span>
            <h2>Experiências que aproximam</h2>
            <p>
              Ideias para conhecer cada lugar com tempo, atenção e respeito ao
              contexto local.
            </p>
          </div>
          <div>
            <span className="eyebrow">03 · Preparar</span>
            <h2>Informação para seguir em frente</h2>
            <p>
              Guias e orientações gerais para ajudar a transformar inspiração
              em um plano de viagem.
            </p>
          </div>
        </section>
      </Container>
    </div>
  );
}
