import Link from "next/link";
import type { Destination } from "@/data/destinations";
import type { Experience } from "@/data/experiences";
import type { ExperienceCategory } from "@/data/experiences";
import type { Guide } from "@/data/guides";
import { ItineraryToggleButton, SaveToggleButton } from "@/components/planning/travel-actions";
import { TravelImage } from "./travel-image";

export function ExperienceCategoryCard({
  category,
  image,
  experienceCount,
  destinationCount,
}: {
  category: ExperienceCategory;
  image: { src: string; alt: string };
  experienceCount: number;
  destinationCount: number;
}) {
  return (
    <article className="experience-category-card">
      <div className="experience-category-image image-frame">
        <TravelImage alt={image.alt} loading="lazy" src={image.src} />
      </div>
      <div className="experience-category-copy">
        <p className="eyebrow">
          {experienceCount
            ? `${experienceCount} ${experienceCount === 1 ? "experiência" : "experiências"}`
            : `${destinationCount} ${destinationCount === 1 ? "destino relacionado" : "destinos relacionados"}`}
        </p>
        <h3>{category.name}</h3>
        <p>{category.description}</p>
        <Link
          className="text-link"
          href={`/experiencias/categoria/${category.slug}`}
        >
          Explorar categoria <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}

export function DestinationCard({
  destination,
  imageLoading,
}: {
  destination: Destination;
  imageLoading?: "eager" | "lazy";
}) {
  return (
    <article className="travel-card">
      <div className="travel-card-image image-frame">
        <TravelImage
          alt={destination.imageAlt}
          loading={imageLoading}
          src={destination.image}
        />
        <span className="image-region">{destination.region}</span>
      </div>
      <div className="travel-card-copy">
        <div className="destination-card-meta">
          <span className="eyebrow">{destination.eyebrow}</span>
          <span>{destination.state} · {destination.region}</span>
        </div>
        <Link className="travel-card-title" href={`/destinos/${destination.slug}`}>
          <h3>{destination.name}</h3>
        </Link>
        <p>{destination.summary}</p>
        <p className="destination-card-highlight">
          Destaque: {destination.highlight}
        </p>
        <ul aria-label={`Categorias de ${destination.name}`} className="destination-card-categories">
          {destination.categories.slice(0, 2).map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
        <Link className="text-link" href={`/destinos/${destination.slug}`}>
          Explorar destino <span aria-hidden="true">↗</span>
        </Link>
        <div className="planner-card-actions">
          <SaveToggleButton kind="destination" name={destination.name} slug={destination.slug} />
          <ItineraryToggleButton kind="destination" name={destination.name} slug={destination.slug} />
        </div>
      </div>
    </article>
  );
}

export function ExperienceCard({
  experience,
  imageLoading,
}: {
  experience: Experience;
  imageLoading?: "eager" | "lazy";
}) {
  return (
    <article className="travel-card">
      <div className="travel-card-image image-frame">
        <TravelImage
          alt={experience.imageAlt}
          loading={imageLoading}
          src={experience.image}
        />
        <span className="image-region">{experience.category}</span>
      </div>
      <div className="travel-card-copy">
        <span className="eyebrow">{experience.destinationName}</span>
        <Link className="travel-card-title" href={`/experiencias/${experience.slug}`}>
          <h3>{experience.title}</h3>
        </Link>
        <p>{experience.description}</p>
        <Link className="text-link" href={`/experiencias/${experience.slug}`}>
          Ver experiência <span aria-hidden="true">↗</span>
        </Link>
        <Link className="experience-destination-link" href={`/destinos/${experience.destinationSlug}`}>
          Conhecer {experience.destinationName}
        </Link>
        <div className="planner-card-actions">
          <SaveToggleButton kind="experience" name={experience.title} slug={experience.slug} />
          <ItineraryToggleButton kind="experience" name={experience.title} slug={experience.slug} />
        </div>
      </div>
    </article>
  );
}

export function GuideCard({
  guide,
  imageLoading,
}: {
  guide: Guide;
  imageLoading?: "eager" | "lazy";
}) {
  return (
    <article className="guide-card">
      <div className="guide-card-image image-frame">
        <TravelImage alt={guide.imageAlt} loading={imageLoading} src={guide.image} />
      </div>
      <div className="guide-card-copy">
        <div className="guide-card-meta">
          <span className="eyebrow">{guide.category}</span>
          <span>{guide.readTime}</span>
        </div>
        <Link className="travel-card-title" href={`/guias/${guide.slug}`}>
          <h3>{guide.title}</h3>
        </Link>
        <p>{guide.description}</p>
        <Link className="text-link" href={`/guias/${guide.slug}`}>
          Leia o guia <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
