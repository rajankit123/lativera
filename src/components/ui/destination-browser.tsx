"use client";

import { useMemo, useState } from "react";
import { DestinationCard } from "@/components/ui/travel-cards";
import {
  destinationCategories,
  type DestinationCategory,
  type Destination,
} from "@/data/destinations";

const brazilianRegions = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];

type DestinationBrowserProps = {
  destinations: Destination[];
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

export function DestinationBrowser({
  destinations,
}: DestinationBrowserProps) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState<DestinationCategory | "">("");
  const [sort, setSort] = useState("featured");
  const regionCounts = useMemo(
    () =>
      destinations.reduce<Record<string, number>>((counts, destination) => {
        counts[destination.region] = (counts[destination.region] ?? 0) + 1;
        return counts;
      }, {}),
    [destinations],
  );

  const filteredDestinations = useMemo(() => {
    const normalizedQuery = normalize(query);
    const matchingDestinations = destinations.filter((destination) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        normalize(
          [
            destination.name,
            destination.region,
            destination.state,
            destination.eyebrow,
            destination.summary,
            destination.introduction,
            destination.highlight,
            destination.aliases.join(" "),
            destination.categories.join(" "),
          ].join(" "),
        ).includes(normalizedQuery);

      const matchesRegion = !region || destination.region === region;
      const matchesCategory =
        !category ||
        destination.categories.includes(category);

      return matchesQuery && matchesRegion && matchesCategory;
    });

    if (sort === "name") {
      return [...matchingDestinations].sort((first, second) =>
        first.name.localeCompare(second.name, "pt-BR"),
      );
    }

    if (sort === "region") {
      return [...matchingDestinations].sort(
        (first, second) =>
          first.region.localeCompare(second.region, "pt-BR") ||
          first.name.localeCompare(second.name, "pt-BR"),
      );
    }

    return matchingDestinations;
  }, [destinations, query, region, category, sort]);

  function resetFilters() {
    setQuery("");
    setRegion("");
    setCategory("");
    setSort("featured");
  }

  return (
    <>
      <div
        aria-label="Buscar e filtrar destinos"
        className="destination-controls"
        role="search"
      >
        <div className="destination-control">
          <label htmlFor="destination-search">Buscar destinos</label>
          <input
            autoComplete="off"
            id="destination-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Nome, região ou estilo"
            type="search"
            value={query}
          />
        </div>
        <div className="destination-control">
          <label htmlFor="destination-category">Tipo de viagem</label>
          <select
            id="destination-category"
            onChange={(event) =>
              setCategory(
                destinationCategories.find(
                  (item) => item === event.target.value,
                ) ?? "",
              )
            }
            value={category}
          >
            <option value="">Todas as categorias</option>
            {destinationCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="destination-control">
          <label htmlFor="destination-region">Região</label>
          <select
            id="destination-region"
            onChange={(event) => setRegion(event.target.value)}
            value={region}
          >
            <option value="">Todas as regiões</option>
            {brazilianRegions.map((item) => (
              <option key={item} value={item}>
                {item} ({regionCounts[item] ?? 0})
              </option>
            ))}
          </select>
        </div>
        <div className="destination-control">
          <label htmlFor="destination-sort">Ordenar por</label>
          <select
            id="destination-sort"
            onChange={(event) => setSort(event.target.value)}
            value={sort}
          >
            <option value="featured">Ordem recomendada</option>
            <option value="name">Nome</option>
            <option value="region">Região</option>
          </select>
        </div>
        <button
          className="button button-secondary destination-reset"
          onClick={resetFilters}
          type="button"
        >
          Limpar filtros
        </button>
      </div>

      <p aria-live="polite" className="destination-result-count" role="status">
        {filteredDestinations.length}{" "}
        {filteredDestinations.length === 1 ? "destino encontrado" : "destinos encontrados"}
      </p>

      {filteredDestinations.length > 0 ? (
        <div className="card-grid card-grid-three listing-grid">
          {filteredDestinations.map((destination) => (
            <DestinationCard
              destination={destination}
              imageLoading="lazy"
              key={destination.slug}
            />
          ))}
        </div>
      ) : (
        <div className="destination-empty-state">
          <h2>Nenhum destino encontrado</h2>
          <p>Experimente outro termo ou remova os filtros para ver todos os destinos.</p>
          <button
            className="button button-primary"
            onClick={resetFilters}
            type="button"
          >
            Ver todos os destinos
          </button>
        </div>
      )}
    </>
  );
}
