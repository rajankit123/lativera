import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, Plane } from "lucide-react";
import { Container } from "@/components/layout/container";
import { FlightContactOptions } from "@/components/ui/flight-contact-options";
import { FlightRouteBrowser } from "@/components/ui/flight-route-browser";
import { TravelImage } from "@/components/ui/travel-image";
import { flightRoutes } from "@/data/flight-routes";
import { createCanonicalPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createCanonicalPageMetadata(
  "/voos",
  "Ajuda para encontrar voos no Brasil",
  "Explore rotas aéreas pelo Brasil e fale com a equipe Lativera para pedir ajuda com sua viagem.",
);

type FlightsPageProps = {
  searchParams: Promise<{ destino?: string | string[] }>;
};

export default async function FlightsPage({ searchParams }: FlightsPageProps) {
  const { destino } = await searchParams;
  const initialSearch = Array.isArray(destino) ? destino[0] : destino;

  return (
    <>
      <section className="flight-hero">
        <div className="flight-hero-image image-frame">
          <TravelImage
            alt="Aeronave comercial voando sobre Las Vegas"
            className="flight-hero-photo"
            loading="eager"
            sizes="100vw"
            src="/images/flight-hero.jpg"
          />
          <div aria-hidden="true" className="flight-hero-shade" />
        </div>
        <Container>
          <div className="flight-hero-content">
            <p className="flight-hero-eyebrow">
              <Plane aria-hidden="true" size={16} />
              Sua próxima viagem começa com uma conversa
            </p>
            <h1>Encontre seu próximo voo pelo Brasil.</h1>
            <p>
              Escolha uma rota e converse com nossa equipe para pedir ajuda
              com sua viagem.
            </p>
            <Link className="button button-light" href="#rotas">
              Explorar rotas <ArrowDown aria-hidden="true" size={17} />
            </Link>
            <span className="flight-hero-note">
              Consulta de voos, tarifas e disponibilidade feita pela equipe.
            </span>
          </div>
        </Container>
      </section>

      <section className="flight-section" id="rotas">
        <Container>
          <div className="section-heading flight-section-heading">
            <div>
              <p className="eyebrow">Rotas selecionadas</p>
              <h2>Para onde você quer ir?</h2>
              <p>
                Encontre uma rota e fale com a equipe sobre opções para suas
                datas.
              </p>
            </div>
          </div>
          <FlightRouteBrowser
            initialSearch={initialSearch}
            key={initialSearch}
            routes={flightRoutes}
          />
        </Container>
      </section>

      <section className="flight-assistance-section">
        <Container>
          <div className="flight-assistance-layout">
            <div className="flight-assistance-image image-frame">
              <TravelImage
                alt="Pão de Açúcar no Rio de Janeiro visto da baía de Guanabara"
                loading="lazy"
                sizes="(max-width: 700px) 100vw, 45vw"
                src="/images/rio-pao-de-acucar.jpg"
              />
            </div>
            <div className="flight-assistance-copy">
              <p className="eyebrow">Atendimento da equipe Lativera</p>
              <h2>Precisa de ajuda para planejar?</h2>
              <p>
                Fale conosco por telefone ou WhatsApp. Consulte com a equipe
                disponibilidade, tarifas e condições antes de decidir.
              </p>
              <a className="text-link" href="#contato-voos">
                Ver opções de contato <ArrowRight aria-hidden="true" size={17} />
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="flight-contact-section" id="contato-voos">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Estamos aqui para ajudar</p>
              <h2>Fale com nossa equipe</h2>
              <p>
                Escolha um número para ligar ou iniciar uma conversa pelo
                WhatsApp.
              </p>
            </div>
          </div>
          <FlightContactOptions />
          <p className="flight-service-note">
            Esta página recebe pedidos de assistência. A Lativera não exibe
            tarifas ou disponibilidade em tempo real; a equipe confirma as
            opções e as condições aplicáveis. Alterações, cancelamentos e
            reembolsos dependem das regras da companhia aérea e da tarifa.
          </p>
        </Container>
      </section>
    </>
  );
}
