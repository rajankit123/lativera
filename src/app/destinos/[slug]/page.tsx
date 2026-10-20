import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Plane } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ItineraryToggleButton, SaveToggleButton } from "@/components/planning/travel-actions";
import {
  DestinationCard,
  ExperienceCard,
} from "@/components/ui/travel-cards";
import { TravelImage } from "@/components/ui/travel-image";
import { destinations } from "@/data/destinations";
import { flightRoutes, formatFlightRoute } from "@/data/flight-routes";
import { experiences } from "@/data/experiences";
import { guides } from "@/data/guides";
import { createCanonicalPageMetadata, getSiteUrl } from "@/lib/metadata";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return destinations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);
  if (!destination) return {};

  const title = `O que conhecer em ${destination.name}`;
  const description =
    `${destination.summary} Veja destaques, dicas de planejamento e informações sobre rotas cadastradas para ${destination.name}, ${destination.state}.`;
  return createCanonicalPageMetadata(
    `/destinos/${destination.slug}`,
    title,
    description,
    { url: destination.image, alt: destination.imageAlt },
  );
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);
  if (!destination) notFound();

  const relatedGuides = guides.filter((guide) =>
    guide.relatedDestinationSlugs.includes(destination.slug),
  );
  const relatedExperiences = experiences.filter(
    (experience) => experience.destinationSlug === destination.slug,
  );
  const relatedDestinations = destinations
    .filter(
      (item) =>
        item.slug !== destination.slug &&
        item.region === destination.region &&
        item.categories.some((category) =>
          destination.categories.includes(category),
        ),
    )
    .slice(0, 3);
  const destinationRoutes = flightRoutes.filter(
    (route) =>
      route.origin.city === destination.name ||
      route.destination.city === destination.name,
  );
  const destinationAirports = Array.from(
    new Map(
      destinationRoutes
        .flatMap((route) => [route.origin, route.destination])
        .filter((airport) => airport.city === destination.name)
        .map((airport) => [airport.code, airport]),
    ).values(),
  );
  const siteUrl = getSiteUrl();
  const canonical = siteUrl
    ? new URL(`/destinos/${destination.slug}`, siteUrl).toString()
    : undefined;
  const imageUrl = siteUrl
    ? new URL(destination.image, siteUrl).toString()
    : undefined;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristDestination",
        name: destination.name,
        description: destination.introduction,
        ...(canonical && imageUrl ? { url: canonical, image: imageUrl } : {}),
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: destination.state,
          containedInPlace: {
            "@type": "Country",
            name: "Brasil",
          },
        },
      },
      ...(canonical
        ? [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Início",
                  item: new URL("/", siteUrl).toString(),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Destinos",
                  item: new URL("/destinos", siteUrl).toString(),
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: destination.name,
                  item: canonical,
                },
              ],
            },
          ]
        : []),
      {
        "@type": "FAQPage",
        mainEntity: destination.faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <article className="detail-page destination-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Container>
        <nav aria-label="Trilha de navegação" className="breadcrumbs">
          <ol>
            <li><Link href="/">Início</Link></li>
            <li><Link href="/destinos">Destinos</Link></li>
            <li aria-current="page">{destination.name}</li>
          </ol>
        </nav>
        <header className="detail-heading destination-detail-heading">
          <p className="eyebrow">
            {destination.state} · Região {destination.region}
          </p>
          <h1>{destination.name}</h1>
          <p>{destination.introduction}</p>
          <ul aria-label="Estilos de viagem" className="destination-category-list">
            {destination.categories.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
          <div className="planner-card-actions">
            <SaveToggleButton
              kind="destination"
              name={destination.name}
              slug={destination.slug}
            />
            <ItineraryToggleButton
              kind="destination"
              name={destination.name}
              slug={destination.slug}
            />
          </div>
        </header>
        <figure className="detail-hero image-frame">
          <TravelImage
            alt={destination.imageAlt}
            preload
            sizes="(max-width: 1200px) 100vw, 1200px"
            src={destination.image}
          />
        </figure>

        <div className="detail-content-grid">
          <div className="detail-primary">
            <section className="content-section">
              <p className="eyebrow">Para conhecer</p>
              <h2>O que descobrir em {destination.name}</h2>
              <ul className="editorial-list">
                {destination.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </section>
            <section className="content-section">
              <p className="eyebrow">Viva o lugar</p>
              <h2>Ideias de experiências</h2>
              <ul className="editorial-list">
                {destination.experiences.map((experience) => (
                  <li key={experience}>{experience}</li>
                ))}
              </ul>
              {relatedExperiences.length > 0 && (
                <div className="destination-related-experiences">
                  <h3>Conheça estas experiências</h3>
                  <div className="card-grid card-grid-two">
                    {relatedExperiences.map((experience) => (
                      <ExperienceCard
                        experience={experience}
                        imageLoading="lazy"
                        key={experience.slug}
                      />
                    ))}
                  </div>
                </div>
              )}
            </section>
            {relatedGuides.length > 0 && (
              <section className="content-section related-content">
                <p className="eyebrow">Para planejar</p>
                <h2>Leia também</h2>
                <ul className="related-link-list">
                  {relatedGuides.map((guide) => (
                    <li key={guide.slug}>
                      <Link href={`/guias/${guide.slug}`}>
                        {guide.title} <span aria-hidden="true">↗</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
          <aside className="travel-tips">
            <p className="eyebrow">Antes de ir</p>
            <h2>Dicas para sua viagem</h2>
            <ul>
              {destination.tips.map((tip) => <li key={tip}>{tip}</li>)}
            </ul>
            <p className="fine-print">
              Acessos, horários, regras e condições podem mudar. Confirme os
              detalhes com fontes oficiais e locais antes de viajar.
            </p>
          </aside>
        </div>

        <section
          aria-labelledby="destination-routes-title"
          className="destination-routes content-section"
        >
          <p className="eyebrow">Planeje o deslocamento</p>
          <h2 id="destination-routes-title">
            Informações de voo para {destination.name}
          </h2>
          {destinationRoutes.length > 0 ? (
            <>
              <p>
                Estas são rotas cadastradas no site que envolvem a cidade. Elas
                não confirmam voos, horários ou disponibilidade para datas
                específicas.
              </p>
              <div className="destination-airports">
                <h3>Aeroportos nas rotas cadastradas</h3>
                <ul>
                  {destinationAirports.map((airport) => (
                    <li key={airport.code}>
                      {airport.airportName} ({airport.code})
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="related-link-list destination-flight-list">
                {destinationRoutes.map((route) => (
                  <li key={route.slug}>
                    <Link href={`/voos/${route.slug}`}>
                      <Plane aria-hidden="true" size={16} />
                      {formatFlightRoute(route)}
                      <span aria-hidden="true">↗</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>
              Ainda não há uma rota cadastrada para este destino. Consulte a
              equipe para perguntar sobre opções; trajetos e disponibilidade
              precisam ser confirmados com o provedor.
            </p>
          )}
          <Link
            className="button button-secondary destination-flight-cta"
            href={`/voos?destino=${encodeURIComponent(destination.name)}`}
          >
            Consultar informações de voo{" "}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </section>

        <section
          aria-labelledby="destination-sources-heading"
          className="destination-sources"
        >
          <p className="eyebrow">Consulte fontes oficiais</p>
          <h2 id="destination-sources-heading">
            Informações atualizadas antes de viajar
          </h2>
          <ul className="related-link-list">
            <li>
              <a
                href="https://www.gov.br/anac/pt-br/assuntos/passageiros/anac_passageiro/"
                rel="noreferrer"
                target="_blank"
              >
                Orientações da ANAC para passageiros{" "}
                <span aria-hidden="true">↗</span>
              </a>
            </li>
            {destination.categories.includes("Natureza e aventura") && (
              <li>
                <a
                  href="https://www.gov.br/icmbio/pt-br/assuntos/unidade-de-conservacao/copy_of_unidades-de-conservacao"
                  rel="noreferrer"
                  target="_blank"
                >
                  Informações do ICMBio sobre unidades de conservação{" "}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            )}
          </ul>
          <p className="fine-print">
            As regras de atrações, parques e serviços podem mudar. Confirme
            sempre os detalhes diretamente com o órgão ou operador responsável.
          </p>
        </section>

        <section aria-labelledby="destination-faq-heading" className="destination-detail-faq">
          <p className="eyebrow">Informação prática</p>
          <h2 id="destination-faq-heading">Dúvidas sobre {destination.name}</h2>
          <div className="faq-list">
            {destination.faqs.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {relatedDestinations.length > 0 && (
          <section aria-labelledby="related-destinations-heading" className="related-destinations">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Continue explorando</p>
                <h2 id="related-destinations-heading">
                  Outros destinos na região
                </h2>
              </div>
              <Link className="text-link" href="/destinos">
                Ver todos <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
            <div className="card-grid card-grid-three">
              {relatedDestinations.map((item) => (
                <DestinationCard
                  destination={item}
                  imageLoading="lazy"
                  key={item.slug}
                />
              ))}
            </div>
          </section>
        )}

        <section className="destination-detail-assistance">
          <p className="eyebrow">Atendimento da equipe Lativera</p>
          <h2>Precisa de ajuda com sua viagem?</h2>
          <p>
            Consulte as rotas cadastradas e fale com a equipe por telefone ou
            WhatsApp. A disponibilidade, as tarifas e as condições são
            confirmadas com o provedor.
          </p>
          <Link
            className="button button-primary"
            href={`/voos?destino=${encodeURIComponent(destination.name)}`}
          >
            Falar com nossa equipe <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </section>
      </Container>
    </article>
  );
}
