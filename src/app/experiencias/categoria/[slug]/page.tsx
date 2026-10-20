import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import {
  DestinationCard,
  ExperienceCard,
  GuideCard,
} from "@/components/ui/travel-cards";
import { PageIntro } from "@/components/ui/page-intro";
import { destinations } from "@/data/destinations";
import { experiences, experienceCategories } from "@/data/experiences";
import { guides } from "@/data/guides";
import { createCanonicalPageMetadata, getSiteUrl } from "@/lib/metadata";

type ExperienceCategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return experienceCategories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ExperienceCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = experienceCategories.find((item) => item.slug === slug);
  if (!category) return {};

  const featuredExperience = experiences.find((experience) =>
    experience.categorySlugs.includes(category.slug),
  );
  const featuredDestination = destinations.find((destination) =>
    category.destinationSlugs.includes(destination.slug),
  );
  const image = featuredExperience
    ? { url: featuredExperience.image, alt: featuredExperience.imageAlt }
    : featuredDestination
      ? { url: featuredDestination.image, alt: featuredDestination.imageAlt }
      : undefined;

  return createCanonicalPageMetadata(
    `/experiencias/categoria/${category.slug}`,
    category.title,
    category.description,
    image,
  );
}

export default async function ExperienceCategoryPage({
  params,
}: ExperienceCategoryPageProps) {
  const { slug } = await params;
  const category = experienceCategories.find((item) => item.slug === slug);
  if (!category) notFound();

  const categoryExperiences = experiences.filter((experience) =>
    experience.categorySlugs.includes(category.slug),
  );
  const categoryDestinations = destinations.filter((destination) =>
    category.destinationSlugs.includes(destination.slug),
  );
  const categoryGuides = guides.filter((guide) =>
    category.guideSlugs.includes(guide.slug),
  );
  const siteUrl = getSiteUrl();
  const canonical = siteUrl
    ? new URL(`/experiencias/categoria/${category.slug}`, siteUrl).toString()
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
            name: category.name,
            item: canonical,
          },
        ],
      }
    : undefined;

  return (
    <div className="listing-page experience-category-page">
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
            <li aria-current="page">{category.name}</li>
          </ol>
        </nav>
        <PageIntro
          description={category.description}
          eyebrow="Explore por interesse"
          title={category.title}
        />

        <section aria-labelledby="category-experiences-title" className="section-block">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Ideias para viver cada lugar</p>
              <h2 id="category-experiences-title">Experiências nesta categoria</h2>
            </div>
          </div>
          {categoryExperiences.length ? (
            <div className="card-grid card-grid-three listing-grid">
              {categoryExperiences.map((experience) => (
                <ExperienceCard experience={experience} key={experience.slug} />
              ))}
            </div>
          ) : (
            <p className="experience-category-empty">
              Ainda não há uma experiência cadastrada nesta categoria. Explore
              os destinos relacionados para encontrar ideias de viagem.
            </p>
          )}
        </section>

        {categoryDestinations.length > 0 && (
          <section
            aria-labelledby="category-destinations-title"
            className="section-block"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">Lugares relacionados</p>
                <h2 id="category-destinations-title">Destinos para explorar</h2>
              </div>
              <Link className="text-link" href="/destinos">
                Ver todos os destinos <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="card-grid card-grid-three">
              {categoryDestinations.map((destination) => (
                <DestinationCard
                  destination={destination}
                  imageLoading="lazy"
                  key={destination.slug}
                />
              ))}
            </div>
          </section>
        )}

        {categoryGuides.length > 0 && (
          <section aria-labelledby="category-guides-title" className="section-block">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Para planejar com cuidado</p>
                <h2 id="category-guides-title">Guias relacionados</h2>
              </div>
            </div>
            <div className="card-grid card-grid-two">
              {categoryGuides.map((guide) => (
                <GuideCard guide={guide} key={guide.slug} />
              ))}
            </div>
          </section>
        )}
        <p className="experience-category-back">
          <Link className="text-link" href="/experiencias">
            Explorar todas as categorias e experiências{" "}
            <span aria-hidden="true">↗</span>
          </Link>
        </p>
      </Container>
    </div>
  );
}
