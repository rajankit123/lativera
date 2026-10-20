import Link from "next/link";
import { Container } from "@/components/layout/container";
import { DestinationSearch } from "@/components/ui/destination-search";
import {
  DestinationCard,
  ExperienceCategoryCard,
  GuideCard,
} from "@/components/ui/travel-cards";
import { TravelImage } from "@/components/ui/travel-image";
import { destinations } from "@/data/destinations";
import { experiences, experienceCategories } from "@/data/experiences";
import { guides } from "@/data/guides";
import { createCanonicalPageMetadata } from "@/lib/metadata";

export const metadata = createCanonicalPageMetadata(
  "/",
  "Viaje pelo Brasil com outros olhos",
  "Encontre destinos pelo Brasil, explore experiências e consulte guias para começar a planejar sua próxima viagem.",
);

export default function Home() {
  const featuredDestinationSlugs = [
    "manaus",
    "alter-do-chao",
    "rio-de-janeiro",
    "foz-do-iguacu",
    "lencois-maranhenses",
    "bonito",
  ];
  const featuredDestinations = featuredDestinationSlugs
    .map((slug) => destinations.find((destination) => destination.slug === slug))
    .filter((destination) => destination !== undefined);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Lativera",
    description:
      "Descubra destinos, atrações, experiências e guias de viagem para quem vive no Brasil.",
    inLanguage: "pt-BR",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <section className="home-hero">
        <Container>
          <div className="home-hero-grid">
            <div className="home-hero-copy">
              <p className="eyebrow">Seu próximo lugar começa aqui</p>
              <h1>O Brasil tem muitos caminhos. <em>Qual combina com você?</em></h1>
              <p className="hero-description">
                Encontre um lugar pela sua curiosidade, explore novas
                experiências e planeje no seu próprio ritmo.
              </p>
              <DestinationSearch destinations={destinations} />
              <Link className="home-browse-link" href="/destinos">
                Prefere explorar todos os destinos? <span aria-hidden="true">↗</span>
              </Link>
              <div className="hero-note">
                <span>Inspiração local · Informação para começar a planejar</span>
              </div>
            </div>
            <div className="home-hero-image image-frame">
              <TravelImage
                alt="Orla de Copacabana no Rio de Janeiro, com a cidade ao fundo"
                preload
                sizes="(max-width: 800px) 100vw, 56vw"
                src="/images/rio-de-janeiro.jpg"
              />
              <span className="hero-image-caption">
                <span>Rio de Janeiro</span>
                <span>Uma cidade entre mar e montanha</span>
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-block">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Uma primeira seleção</p>
              <h2>Destinos que despertam vontade de ir</h2>
              <p>Da vida urbana a paisagens moldadas pela água e pelo tempo.</p>
            </div>
            <Link className="text-link section-heading-link" href="/destinos">
              Ver todos os destinos <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="card-grid card-grid-three">
            {featuredDestinations.map((destination) => (
              <DestinationCard destination={destination} key={destination.slug} />
            ))}
          </div>
        </Container>
      </section>

      <section className="experience-band">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Explore pelo que inspira você</p>
              <h2>Jeitos diferentes de viver cada lugar</h2>
              <p>Encontre ideias de natureza, cultura e atividades ao ar livre.</p>
            </div>
            <Link className="text-link section-heading-link" href="/experiencias">
              Ver todas as experiências <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="experience-category-grid home-experience-categories">
            {experienceCategories.map((category) => {
              const experience = experiences.find((item) =>
                item.categorySlugs.includes(category.slug),
              );
              const destination = destinations.find((item) =>
                category.destinationSlugs.includes(item.slug),
              );
              const image = experience
                ? { src: experience.image, alt: experience.imageAlt }
                : destination
                  ? { src: destination.image, alt: destination.imageAlt }
                  : undefined;
              if (!image) return null;

              return (
                <ExperienceCategoryCard
                  category={category}
                  destinationCount={destinations.filter((item) =>
                    category.destinationSlugs.includes(item.slug),
                  ).length}
                  experienceCount={experiences.filter((item) =>
                    item.categorySlugs.includes(category.slug),
                  ).length}
                  image={image}
                  key={category.slug}
                />
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-block">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Boas ideias, bons caminhos</p>
              <h2>Guias para ir além do roteiro</h2>
              <p>Conteúdo prático para preparar a próxima viagem.</p>
            </div>
            <Link className="text-link section-heading-link" href="/guias">
              Ler todos os guias <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="card-grid card-grid-two">
            {guides.slice(0, 2).map((guide) => (
              <GuideCard guide={guide} key={guide.slug} />
            ))}
          </div>
        </Container>
      </section>

      <section className="home-planning-note">
        <Container>
          <div className="home-planning-copy">
            <p className="eyebrow">Planeje com informação</p>
            <h2>Inspiração é o começo. Confirme os detalhes antes de ir.</h2>
            <p>
              Horários, acessos e condições locais podem mudar. Use nossos
              conteúdos como ponto de partida e consulte fontes oficiais para
              informações atualizadas.
            </p>
            <div className="home-planning-links">
              <Link className="text-link" href="/voos">
                Consultar rotas e falar com a equipe{" "}
                <span aria-hidden="true">↗</span>
              </Link>
              <Link className="text-link" href="/contato">
                Falar com a Lativera <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="discovery-cta">
        <Container>
          <div className="discovery-cta-inner">
            <div>
              <p className="eyebrow">Uma ideia pode virar viagem</p>
              <h2>Deixe a curiosidade escolher o próximo destino.</h2>
              <p>
                Explore lugares, encontre novas perspectivas e comece a
                imaginar seus próximos dias fora da rotina.
              </p>
              <Link className="button button-light" href="/destinos">
                Encontre seu próximo destino <span aria-hidden="true">↗</span>
              </Link>
              <Link className="button button-light" href="/planejar">
                Explore as ferramentas de planejamento{" "}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="discovery-cta-decoration" aria-hidden="true">
              Brasil
              <span>há muito para descobrir</span>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
