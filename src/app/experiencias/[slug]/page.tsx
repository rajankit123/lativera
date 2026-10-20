import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { ItineraryToggleButton, SaveToggleButton } from "@/components/planning/travel-actions";
import {
  DestinationCard,
  ExperienceCard,
  GuideCard,
} from "@/components/ui/travel-cards";
import { TravelImage } from "@/components/ui/travel-image";
import { destinations } from "@/data/destinations";
import {
  experiences,
  experienceCategories,
} from "@/data/experiences";
import { guides } from "@/data/guides";
import { createCanonicalPageMetadata, getSiteUrl } from "@/lib/metadata";

type ExperiencePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return experiences.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ExperiencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = experiences.find((item) => item.slug === slug);
  if (!experience) return {};

  return createCanonicalPageMetadata(
    `/experiencias/${experience.slug}`,
    `${experience.title} em ${experience.destinationName}`,
    experience.description,
    { url: experience.image, alt: experience.imageAlt },
    "article",
  );
}

export default async function ExperienceDetailPage({
  params,
}: ExperiencePageProps) {
  const { slug } = await params;
  const experience = experiences.find((item) => item.slug === slug);
  if (!experience) notFound();

  const destination = destinations.find(
    (item) => item.slug === experience.destinationSlug,
  );
  if (!destination) notFound();

  const categories = experienceCategories.filter((category) =>
    experience.categorySlugs.includes(category.slug),
  );
  const relatedExperiences = experiences
    .filter(
      (item) =>
        item.slug !== experience.slug &&
        item.categorySlugs.some((slug) =>
          experience.categorySlugs.includes(slug),
        ),
    )
    .slice(0, 3);
  const relatedGuides = guides.filter((guide) =>
    guide.relatedDestinationSlugs.includes(destination.slug),
  );
  const siteUrl = getSiteUrl();
  const canonical = siteUrl
    ? new URL(`/experiencias/${experience.slug}`, siteUrl).toString()
    : undefined;
  const breadcrumbData = canonical
    ? {
        "@context": "https://schema.org",
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
            name: "Experiências",
            item: new URL("/experiencias", siteUrl).toString(),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: experience.title,
            item: canonical,
          },
        ],
      }
    : undefined;

  return (
    <article className="article-page experience-detail-page">
      {breadcrumbData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <Container>
        <nav aria-label="Trilha de navegação" className="breadcrumbs">
          <ol>
            <li><Link href="/">Início</Link></li>
            <li><Link href="/experiencias">Experiências</Link></li>
            <li aria-current="page">{experience.title}</li>
          </ol>
        </nav>
        <header className="article-heading experience-detail-heading">
          <p className="eyebrow">
            {experience.category} <span aria-hidden="true">·</span>{" "}
            {destination.name} · {destination.region}
          </p>
          <h1>{experience.title}</h1>
          <p>{experience.introduction}</p>
          <ul aria-label="Categorias desta experiência" className="experience-category-tags">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/experiencias/categoria/${category.slug}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="planner-card-actions">
            <SaveToggleButton
              kind="experience"
              name={experience.title}
              slug={experience.slug}
            />
            <ItineraryToggleButton
              kind="experience"
              name={experience.title}
              slug={experience.slug}
            />
          </div>
        </header>

        <figure className="article-hero image-frame">
          <TravelImage
            alt={experience.imageAlt}
            preload
            sizes="(max-width: 1200px) 100vw, 1200px"
            src={experience.image}
          />
        </figure>

        <div className="article-body">
          <section className="article-section">
            <h2>O que esperar</h2>
            <p>{experience.description}</p>
            <p>
              A proposta e as condições da visita dependem do local escolhido.
              Consulte informações atualizadas com os espaços responsáveis e
              siga as orientações vigentes antes de sair.
            </p>
          </section>
          <section className="article-section">
            <h2>Antes de planejar</h2>
            <ul className="editorial-list">
              {experience.planningTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
              {destination.tips.slice(0, 2).map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
            <p className="fine-print">
              Não há duração, preço ou disponibilidade confirmados para esta
              experiência. Confirme detalhes diretamente com os canais locais
              antes de viajar.
            </p>
          </section>
        </div>

        <section aria-labelledby="experience-destination-title" className="article-related">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Conheça o lugar</p>
              <h2 id="experience-destination-title">
                Mais sobre {destination.name}
              </h2>
            </div>
          </div>
          <div className="card-grid card-grid-three">
            <DestinationCard destination={destination} imageLoading="lazy" />
          </div>
        </section>

        {relatedGuides.length > 0 && (
          <section aria-labelledby="experience-guides-title" className="article-more">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Leituras para ajudar no planejamento</p>
                <h2 id="experience-guides-title">Guias relacionados</h2>
              </div>
            </div>
            <div className="card-grid card-grid-two">
              {relatedGuides.map((guide) => (
                <GuideCard guide={guide} key={guide.slug} />
              ))}
            </div>
          </section>
        )}

        {relatedExperiences.length > 0 && (
          <section
            aria-labelledby="related-experiences-title"
            className="article-more"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">Continue explorando</p>
                <h2 id="related-experiences-title">Outras experiências</h2>
              </div>
            </div>
            <div className="card-grid card-grid-three">
              {relatedExperiences.map((item) => (
                <ExperienceCard experience={item} key={item.slug} />
              ))}
            </div>
          </section>
        )}
        <Link className="back-link" href="/experiencias">
          ← Todas as experiências
        </Link>
      </Container>
    </article>
  );
}
