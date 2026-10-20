import type { Destination, DestinationCategory } from "@/data/destinations";
import {
  experienceCategories,
  type Experience,
  type ExperienceCategorySlug,
} from "@/data/experiences";

export const destinationInterests = [
  { id: "beaches", label: "Praias", category: "Praias" },
  { id: "nature", label: "Natureza", category: "Natureza e aventura" },
  { id: "culture", label: "Cultura", category: "Cultura e história" },
  { id: "history", label: "História", category: "Cultura e história" },
  { id: "adventure", label: "Aventura", category: "Natureza e aventura" },
  {
    id: "gastronomy",
    label: "Gastronomia e experiências locais",
    experienceCategorySlug: "gastronomia-e-experiencias-locais",
  },
] as const;

export type DestinationInterest = (typeof destinationInterests)[number]["id"];

export const travelStyles = [
  {
    id: "rest",
    label: "Praia e descanso",
    categories: ["Praias"] as DestinationCategory[],
  },
  {
    id: "nature",
    label: "Natureza e paisagens",
    categories: ["Natureza e aventura"] as DestinationCategory[],
  },
  {
    id: "culture",
    label: "Cultura e cidades",
    categories: ["Cidades", "Cultura e história"] as DestinationCategory[],
  },
  {
    id: "family",
    label: "Viagem em família",
    categories: ["Viagens em família"] as DestinationCategory[],
  },
] as const;

export type TravelStyle = (typeof travelStyles)[number]["id"];

export type DestinationQuizAnswers = {
  interests: DestinationInterest[];
  duration: "1-3" | "4-7" | "8-plus";
  budget: "up-to-1500" | "1501-3000" | "3001-6000" | "over-6000";
  style: TravelStyle;
  region: string;
};

export type DestinationMatch = {
  destination: Destination;
  score: number;
  reasons: string[];
};

export type ExperienceMatch = {
  experience: Experience;
  score: number;
  reasons: string[];
};

function interestMatchSignal(
  destination: Destination,
  interest: DestinationInterest,
): string | null {
  const selected = destinationInterests.find((item) => item.id === interest);
  if (!selected) return null;
  if ("category" in selected) {
    return destination.categories.includes(selected.category)
      ? `destination:${selected.category}`
      : null;
  }

  const category = experienceCategories.find(
    (item) => item.slug === selected.experienceCategorySlug,
  );
  return category?.destinationSlugs.includes(destination.slug)
    ? `experience-category:${category.slug}`
    : null;
}

function interestReason(interest: DestinationInterest) {
  return destinationInterests.find((item) => item.id === interest)?.label;
}

export function rankDestinations(
  destinations: Destination[],
  answers: DestinationQuizAnswers,
): DestinationMatch[] {
  const style = travelStyles.find((item) => item.id === answers.style);
  const matches = destinations.map((destination) => {
    const reasons: string[] = [];
    const matchedSignals = new Set<string>();
    let score = 0;

    for (const interest of answers.interests) {
      const signal = interestMatchSignal(destination, interest);
      if (signal) {
        if (!matchedSignals.has(signal)) score += 3;
        matchedSignals.add(signal);
        const label = interestReason(interest);
        if (label && !reasons.includes(label)) reasons.push(label);
      }
    }

    if (style?.categories.some((category) => destination.categories.includes(category))) {
      score += 2;
      reasons.push(`combina com o estilo ${style.label.toLocaleLowerCase("pt-BR")}`);
    }
    if (answers.region && destination.region === answers.region) {
      score += 2;
      reasons.push(`está na região ${destination.region}`);
    }
    if (
      answers.duration === "1-3" &&
      destination.categories.includes("Escapadas de fim de semana")
    ) {
      score += 1;
      reasons.push("está marcada no conteúdo como opção para escapada de fim de semana");
    }

    return { destination, score, reasons };
  });

  return matches
    .filter(({ score }) => score > 0)
    .sort(
      (first, second) =>
        second.score - first.score ||
        first.destination.name.localeCompare(second.destination.name, "pt-BR"),
    )
    .slice(0, 5);
}

const interestExperienceCategories: Partial<
  Record<DestinationInterest, ExperienceCategorySlug>
> = {
  beaches: "praias-e-ilhas",
  nature: "natureza-e-ecoturismo",
  culture: "cultura-e-historia",
  history: "cultura-e-historia",
  adventure: "aventura-ao-ar-livre",
  gastronomy: "gastronomia-e-experiencias-locais",
};

const styleExperienceCategories: Partial<
  Record<TravelStyle, ExperienceCategorySlug[]>
> = {
  rest: ["praias-e-ilhas"],
  nature: ["natureza-e-ecoturismo", "aventura-ao-ar-livre"],
  culture: ["cultura-e-historia"],
};

export function rankExperiences(
  experiences: Experience[],
  destinations: Destination[],
  answers: DestinationQuizAnswers,
): ExperienceMatch[] {
  const destinationBySlug = new Map(
    destinations.map((destination) => [destination.slug, destination]),
  );
  const style = travelStyles.find((item) => item.id === answers.style);
  return experiences
    .map((experience) => {
      const reasons: string[] = [];
      const matchedSignals = new Set<string>();
      let score = 0;

      for (const interest of answers.interests) {
        const category = interestExperienceCategories[interest];
        if (category && experience.categorySlugs.includes(category)) {
          const signal = `experience:${category}`;
          if (!matchedSignals.has(signal)) score += 3;
          matchedSignals.add(signal);
          const label = interestReason(interest);
          if (label && !reasons.includes(label)) reasons.push(label);
        }
      }

      const styleCategories = styleExperienceCategories[answers.style] ?? [];
      if (
        styleCategories.some((category) =>
          experience.categorySlugs.includes(category),
        )
      ) {
        score += 2;
        if (style) reasons.push(`combina com o estilo ${style.label.toLocaleLowerCase("pt-BR")}`);
      }

      const destination = destinationBySlug.get(experience.destinationSlug);
      if (answers.region && destination?.region === answers.region) {
        score += 2;
        reasons.push(`está relacionada a um destino da região ${answers.region}`);
      }
      if (
        answers.duration === "1-3" &&
        destination?.categories.includes("Escapadas de fim de semana")
      ) {
        score += 1;
        reasons.push("está relacionada a um destino marcado para escapadas de fim de semana");
      }

      return { experience, score, reasons };
    })
    .filter(({ score }) => score > 0)
    .sort(
      (first, second) =>
        second.score - first.score ||
        first.experience.title.localeCompare(second.experience.title, "pt-BR"),
    )
    .slice(0, 5);
}
