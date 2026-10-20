import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { GuideCard } from "@/components/ui/travel-cards";
import { TravelImage } from "@/components/ui/travel-image";
import { guides } from "@/data/guides";
import { destinations } from "@/data/destinations";
import { createCanonicalPageMetadata } from "@/lib/metadata";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) return {};
  return createCanonicalPageMetadata(
    `/guias/${guide.slug}`,
    guide.title,
    guide.description,
    { url: guide.image, alt: guide.imageAlt },
    "article",
  );
}

export default async function GuideArticlePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();
  const relatedDestinations = destinations.filter((destination) =>
    guide.relatedDestinationSlugs.includes(destination.slug),
  );
  const relatedGuides = guides.filter((item) => item.slug !== guide.slug).slice(0, 2);

  return (
    <article className="article-page">
      <Container>
        <Link className="back-link" href="/guias">
          <span aria-hidden="true">←</span> Todos os guias
        </Link>
        <header className="article-heading">
          <p className="eyebrow">{guide.category} <span aria-hidden="true">·</span> {guide.readTime}</p>
          <h1>{guide.title}</h1>
          <p>{guide.description}</p>
        </header>
        <figure className="article-hero image-frame">
          <TravelImage
            alt={guide.imageAlt}
            preload
            sizes="(max-width: 1200px) 100vw, 1200px"
            src={guide.image}
          />
        </figure>

        <div className="article-body">
          {guide.sections.map((section) => (
            <section className="article-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.list && (
                <ul className="editorial-list">
                  {section.list.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>

        {relatedDestinations.length > 0 && (
          <section className="article-related">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Continue explorando</p>
                <h2>Destinos relacionados</h2>
              </div>
            </div>
            <ul className="related-link-list">
              {relatedDestinations.map((destination) => (
                <li key={destination.slug}>
                  <Link href={`/destinos/${destination.slug}`}>{destination.name} <span aria-hidden="true">↗</span></Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="article-more">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Mais para ler</p>
              <h2>Outras ideias para sua viagem</h2>
            </div>
          </div>
          <div className="card-grid card-grid-two">
            {relatedGuides.map((item) => <GuideCard guide={item} key={item.slug} />)}
          </div>
        </section>
      </Container>
    </article>
  );
}
