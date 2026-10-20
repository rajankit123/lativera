import type { MetadataRoute } from "next";
import { destinations } from "@/data/destinations";
import { flightRoutes } from "@/data/flight-routes";
import { guides } from "@/data/guides";
import { experiences, experienceCategories } from "@/data/experiences";
import { getSiteUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  const paths = [
    "/",
    "/destinos",
    ...destinations.map(({ slug }) => `/destinos/${slug}`),
    "/experiencias",
    ...experienceCategories.map(
      ({ slug }) => `/experiencias/categoria/${slug}`,
    ),
    ...experiences.map(({ slug }) => `/experiencias/${slug}`),
    "/planejar",
    "/planejar/quiz",
    "/planejar/orcamento",
    "/roteiro",
    "/guias",
    ...guides.map(({ slug }) => `/guias/${slug}`),
    "/voos",
    ...flightRoutes.map(({ slug }) => `/voos/${slug}`),
    "/sobre",
    "/contato",
    "/faq",
    "/fontes-e-creditos",
  ];

  return [...new Set(paths)].map((path) => ({
    url: new URL(path, siteUrl).toString(),
  }));
}
