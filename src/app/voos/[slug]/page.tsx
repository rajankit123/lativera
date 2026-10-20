import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Plane } from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { FlightContactOptions } from "@/components/ui/flight-contact-options";
import { TravelImage } from "@/components/ui/travel-image";
import { flightRoutes, formatFlightRoute, getFlightRoute } from "@/data/flight-routes";
import { createCanonicalPageMetadata } from "@/lib/metadata";

type FlightRoutePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return flightRoutes.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: FlightRoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = getFlightRoute(slug);
  if (!route) return {};

  return createCanonicalPageMetadata(
    `/voos/${route.slug}`,
    `Voos de ${route.origin.city} para ${route.destination.city} (${route.origin.code}–${route.destination.code})`,
    `Peça ajuda à equipe Lativera para consultar opções de voo entre ${route.origin.city} (${route.origin.code}) e ${route.destination.city} (${route.destination.code}).`,
  );
}

export default async function FlightRoutePage({ params }: FlightRoutePageProps) {
  const { slug } = await params;
  const route = getFlightRoute(slug);
  if (!route) notFound();

  const whatsappMessage = `Olá! Gostaria de ajuda com a rota ${formatFlightRoute(route)}. Quero consultar opções para minhas datas.`;
  const whatsappUrl = `https://wa.me/551152822609?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <article className="flight-detail-page">
      <Container>
        <Link className="back-link" href="/voos">
          <ArrowLeft aria-hidden="true" size={17} /> Todas as rotas
        </Link>

        <header className="flight-detail-heading">
          <p className="eyebrow">Assistência para sua viagem</p>
          <h1>
            Voos de {route.origin.city} para {route.destination.city}
          </h1>
          <div aria-label={formatFlightRoute(route)} className="flight-code-line">
            <span>{route.origin.code}</span>
            <Plane aria-hidden="true" size={20} />
            <span>{route.destination.code}</span>
          </div>
          <p>{route.introduction}</p>
        </header>

        <div className="flight-detail-images">
          <figure className="flight-detail-image image-frame">
            <TravelImage
              alt={route.origin.imageAlt}
              loading="lazy"
              sizes="(max-width: 700px) 100vw, 50vw"
              src={route.origin.image}
            />
            <figcaption>
              <span className="eyebrow">Origem · {route.origin.code}</span>
              <strong>{route.origin.city}</strong>
              <span>{route.origin.airportName}</span>
            </figcaption>
          </figure>
          <figure className="flight-detail-image image-frame">
            <TravelImage
              alt={route.destination.imageAlt}
              loading="lazy"
              sizes="(max-width: 700px) 100vw, 50vw"
              src={route.destination.image}
            />
            <figcaption>
              <span className="eyebrow">
                Destino · {route.destination.code}
              </span>
              <strong>{route.destination.city}</strong>
              <span>{route.destination.airportName}</span>
            </figcaption>
          </figure>
        </div>

        <section aria-labelledby="flight-route-help" className="flight-route-help">
          <div className="flight-route-help-copy">
            <p className="eyebrow">Fale com a equipe</p>
            <h2 id="flight-route-help">
              Consulte opções para sua viagem
            </h2>
            <p>
              Conte suas datas e o número de passageiros pelo WhatsApp. A
              equipe verifica as opções disponíveis e explica as condições
              antes da confirmação.
            </p>
            <a
              className="button button-primary"
              href={whatsappUrl}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle aria-hidden="true" size={18} />
              Consultar esta rota no WhatsApp
            </a>
          </div>
          <a
            aria-label={`Ligar para pedir ajuda com a rota ${formatFlightRoute(route)}`}
            className="button button-secondary flight-route-call"
            href="tel:+551152822609"
          >
            Ligar para +55 11 5282-2609
          </a>
        </section>

        <section aria-label="Outras formas de contato" className="flight-detail-contacts">
          <h2>Outros números da equipe</h2>
          <FlightContactOptions route={route} />
        </section>

        <p className="flight-service-note flight-detail-note">
          As informações desta página são um pedido de assistência, não uma
          oferta ou confirmação de voo. Horários, tarifas, disponibilidade,
          alterações, cancelamentos e reembolsos devem ser confirmados com a
          equipe e dependem da companhia aérea e das regras da tarifa.
        </p>
      </Container>
    </article>
  );
}
