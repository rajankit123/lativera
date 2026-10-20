import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import {
  ExperienceCard,
  ExperienceCategoryCard,
} from "@/components/ui/travel-cards";
import { PageIntro } from "@/components/ui/page-intro";
import { destinations } from "@/data/destinations";
import { experiences, experienceCategories } from "@/data/experiences";
import { createCanonicalPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createCanonicalPageMetadata(
  "/experiencias",
  "Experiências de viagem",
  "Encontre ideias de natureza, cultura, gastronomia e aventura para descobrir pelo Brasil.",
);

export default function ExperiencesPage() {
  return (
    <div className="listing-page">
      <Container>
        <PageIntro
          description="Caminhe, observe, prove e conheça. Encontre inspirações para viver cada lugar de um jeito próprio."
          eyebrow="Viva cada lugar"
          title="Experiências para levar com você"
        />
        <section aria-labelledby="experience-categories-title" className="experience-category-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Encontre seu jeito de explorar</p>
              <h2 id="experience-categories-title">Explore por categoria</h2>
              <p>
                Algumas categorias ainda não têm experiências cadastradas.
                Nelas, reunimos destinos relacionados sem inventar passeios.
              </p>
            </div>
          </div>
          <div className="experience-category-grid">
            {experienceCategories.map((category) => {
              const categoryExperience = experiences.find((experience) =>
                experience.categorySlugs.includes(category.slug),
              );
              const categoryDestination = destinations.find((destination) =>
                category.destinationSlugs.includes(destination.slug),
              );
              const categoryImage = categoryExperience
                ? {
                    src: categoryExperience.image,
                    alt: categoryExperience.imageAlt,
                  }
                : categoryDestination
                  ? {
                      src: categoryDestination.image,
                      alt: categoryDestination.imageAlt,
                    }
                  : undefined;
              const experienceCount = experiences.filter((experience) =>
                experience.categorySlugs.includes(category.slug),
              ).length;

              if (!categoryImage) return null;

              return (
                <ExperienceCategoryCard
                  category={category}
                  destinationCount={destinations.filter((destination) =>
                    category.destinationSlugs.includes(destination.slug),
                  ).length}
                  experienceCount={experienceCount}
                  image={categoryImage}
                  key={category.slug}
                />
              );
            })}
          </div>
        </section>
        <section aria-labelledby="all-experiences-title" className="experience-list-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Ideias para sua viagem</p>
              <h2 id="all-experiences-title">Todas as experiências</h2>
            </div>
          </div>
        <div className="card-grid card-grid-three listing-grid">
          {experiences.map((experience, index) => (
            <ExperienceCard
              experience={experience}
              imageLoading={index === 0 ? "eager" : "lazy"}
              key={experience.slug}
            />
          ))}
        </div>
        </section>
      </Container>
    </div>
  );
}
