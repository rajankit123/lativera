"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { destinations } from "@/data/destinations";
import { experiences } from "@/data/experiences";

export type PlannerItem = {
  kind: "destination" | "experience";
  slug: string;
};

type SavedItems = {
  destinations: string[];
  experiences: string[];
};

type StoredPlannerData = {
  saved: SavedItems;
  itinerary: PlannerItem[];
};

type TravelPlannerContextValue = StoredPlannerData & {
  isReady: boolean;
  storageAvailable: boolean | null;
  notice: string;
  isSaved: (kind: PlannerItem["kind"], slug: string) => boolean;
  isInItinerary: (item: PlannerItem) => boolean;
  toggleSaved: (kind: PlannerItem["kind"], slug: string) => void;
  toggleItinerary: (item: PlannerItem) => void;
  removeFromItinerary: (index: number) => void;
  moveItineraryItem: (index: number, direction: -1 | 1) => void;
  replaceItinerary: (items: PlannerItem[]) => void;
  clearNotice: () => void;
};

const storageKey = "lativera:travel-planner:v1";
const maxItineraryItems = 30;
const destinationSlugs = new Set(destinations.map(({ slug }) => slug));
const experienceSlugs = new Set(experiences.map(({ slug }) => slug));

const emptyData: StoredPlannerData = {
  saved: { destinations: [], experiences: [] },
  itinerary: [],
};

const TravelPlannerContext = createContext<TravelPlannerContextValue | null>(
  null,
);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validSlug(kind: PlannerItem["kind"], slug: unknown): slug is string {
  if (typeof slug !== "string") return false;
  return kind === "destination"
    ? destinationSlugs.has(slug)
    : experienceSlugs.has(slug);
}

function parseItems(value: unknown): PlannerItem[] {
  if (!Array.isArray(value)) return [];
  const items: PlannerItem[] = [];
  for (const item of value) {
    if (
      !isRecord(item) ||
      (item.kind !== "destination" && item.kind !== "experience") ||
      !validSlug(item.kind, item.slug)
    ) {
      continue;
    }
    if (!items.some((existing) => existing.kind === item.kind && existing.slug === item.slug)) {
      items.push({ kind: item.kind, slug: item.slug });
    }
    if (items.length === maxItineraryItems) break;
  }
  return items;
}

function parseSaved(value: unknown): SavedItems {
  if (!isRecord(value)) return { destinations: [], experiences: [] };
  return {
    destinations: parseItems(
      Array.isArray(value.destinations)
        ? value.destinations.map((slug) => ({ kind: "destination", slug }))
        : [],
    ).map(({ slug }) => slug),
    experiences: parseItems(
      Array.isArray(value.experiences)
        ? value.experiences.map((slug) => ({ kind: "experience", slug }))
        : [],
    ).map(({ slug }) => slug),
  };
}

function parseStoredData(value: unknown): StoredPlannerData {
  if (!isRecord(value)) return emptyData;
  return {
    saved: parseSaved(value.saved),
    itinerary: parseItems(value.itinerary),
  };
}

export function TravelPlannerProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StoredPlannerData>(emptyData);
  const [isReady, setIsReady] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState<boolean | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;
    const loadStoredData = () => {
      if (!active) return;
      try {
        const stored = window.localStorage.getItem(storageKey);
        if (stored) {
          try {
            setData(parseStoredData(JSON.parse(stored) as unknown));
          } catch {
            setNotice(
              "Os dados locais do planejador não puderam ser lidos. Um novo planejamento começará vazio.",
            );
          }
        }
        setStorageAvailable(true);
      } catch {
        setStorageAvailable(false);
        setNotice(
          "O armazenamento local está indisponível. Suas alterações ficam apenas nesta sessão do navegador.",
        );
      } finally {
        if (active) setIsReady(true);
      }
    };

    function handleStorage(event: StorageEvent) {
      if (event.key !== storageKey) return;
      try {
        setData(event.newValue ? parseStoredData(JSON.parse(event.newValue) as unknown) : emptyData);
        setNotice("O planejador foi atualizado em outra aba.");
      } catch {
        setNotice("Não foi possível atualizar os dados recebidos de outra aba.");
      }
    }

    queueMicrotask(loadStoredData);
    window.addEventListener("storage", handleStorage);
    return () => {
      active = false;
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const commit = useCallback((next: StoredPlannerData, message: string) => {
    setData(next);
    setNotice(message);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      setStorageAvailable(true);
    } catch {
      setStorageAvailable(false);
      setNotice(
        `${message} O navegador não permitiu salvar; os dados permanecem somente nesta sessão.`,
      );
    }
  }, []);

  const isSaved = useCallback(
    (kind: PlannerItem["kind"], slug: string) =>
      data.saved[kind === "destination" ? "destinations" : "experiences"].includes(slug),
    [data.saved],
  );

  const isInItinerary = useCallback(
    (item: PlannerItem) =>
      data.itinerary.some(
        (existing) => existing.kind === item.kind && existing.slug === item.slug,
      ),
    [data.itinerary],
  );

  const toggleSaved = useCallback(
    (kind: PlannerItem["kind"], slug: string) => {
      if (!isReady || !validSlug(kind, slug)) return;
      const collection = kind === "destination" ? "destinations" : "experiences";
      const exists = data.saved[collection].includes(slug);
      const saved = {
        ...data.saved,
        [collection]: exists
          ? data.saved[collection].filter((item) => item !== slug)
          : [...data.saved[collection], slug],
      };
      commit(
        { ...data, saved },
        exists ? "Item removido dos salvos." : "Item adicionado aos salvos.",
      );
    },
    [commit, data, isReady],
  );

  const toggleItinerary = useCallback(
    (item: PlannerItem) => {
      if (!isReady || !validSlug(item.kind, item.slug)) return;
      const index = data.itinerary.findIndex(
        (existing) => existing.kind === item.kind && existing.slug === item.slug,
      );
      if (index >= 0) {
        commit(
          {
            ...data,
            itinerary: data.itinerary.filter((_, itemIndex) => itemIndex !== index),
          },
          "Item removido do roteiro.",
        );
        return;
      }
      if (data.itinerary.length >= maxItineraryItems) {
        setNotice(`O roteiro pode ter até ${maxItineraryItems} itens.`);
        return;
      }
      commit(
        { ...data, itinerary: [...data.itinerary, item] },
        "Item adicionado ao roteiro.",
      );
    },
    [commit, data, isReady],
  );

  const removeFromItinerary = useCallback(
    (index: number) => {
      if (!isReady || index < 0 || index >= data.itinerary.length) return;
      commit(
        {
          ...data,
          itinerary: data.itinerary.filter((_, itemIndex) => itemIndex !== index),
        },
        "Item removido do roteiro.",
      );
    },
    [commit, data, isReady],
  );

  const moveItineraryItem = useCallback(
    (index: number, direction: -1 | 1) => {
      if (!isReady) return;
      const target = index + direction;
      if (index < 0 || target < 0 || target >= data.itinerary.length) return;
      const itinerary = [...data.itinerary];
      [itinerary[index], itinerary[target]] = [itinerary[target], itinerary[index]];
      commit({ ...data, itinerary }, "Ordem do roteiro atualizada.");
    },
    [commit, data, isReady],
  );

  const replaceItinerary = useCallback(
    (items: PlannerItem[]) => {
      if (!isReady) return;
      const itinerary = parseItems(items);
      commit({ ...data, itinerary }, "Roteiro compartilhado carregado.");
    },
    [commit, data, isReady],
  );

  const value = useMemo<TravelPlannerContextValue>(
    () => ({
      ...data,
      isReady,
      storageAvailable,
      notice,
      isSaved,
      isInItinerary,
      toggleSaved,
      toggleItinerary,
      removeFromItinerary,
      moveItineraryItem,
      replaceItinerary,
      clearNotice: () => setNotice(""),
    }),
    [
      data,
      isReady,
      storageAvailable,
      notice,
      isSaved,
      isInItinerary,
      toggleSaved,
      toggleItinerary,
      removeFromItinerary,
      moveItineraryItem,
      replaceItinerary,
    ],
  );

  return (
    <TravelPlannerContext.Provider value={value}>
      {children}
      <p aria-live="polite" className="planner-global-status" role="status">
        {notice}
      </p>
    </TravelPlannerContext.Provider>
  );
}

export function useTravelPlanner() {
  const value = useContext(TravelPlannerContext);
  if (!value) {
    throw new Error("useTravelPlanner must be used inside TravelPlannerProvider.");
  }
  return value;
}
