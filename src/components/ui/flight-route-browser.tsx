"use client";

import { useMemo, useState } from "react";
import { FlightRouteCard } from "@/components/ui/flight-route-card";
import type { FlightRoute } from "@/data/flight-routes";

type FlightRouteBrowserProps = {
  routes: FlightRoute[];
  initialSearch?: string;
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

export function FlightRouteBrowser({
  routes,
  initialSearch = "",
}: FlightRouteBrowserProps) {
  const [query, setQuery] = useState(initialSearch);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const cities = useMemo(
    () =>
      [...new Set(routes.flatMap((route) => [
        route.origin.city,
        route.destination.city,
      ]))].sort((first, second) => first.localeCompare(second, "pt-BR")),
    [routes],
  );

  const filteredRoutes = useMemo(() => {
    const search = normalize(query);

    return routes.filter((route) => {
      const matchesSearch =
        !search ||
        [
          route.origin.city,
          route.origin.airportName,
          route.origin.code,
          route.destination.city,
          route.destination.airportName,
          route.destination.code,
        ].some((value) => normalize(value).includes(search));
      const matchesOrigin = !origin || route.origin.city === origin;
      const matchesDestination =
        !destination || route.destination.city === destination;

      return matchesSearch && matchesOrigin && matchesDestination;
    });
  }, [destination, origin, query, routes]);

  function resetFilters() {
    setQuery("");
    setOrigin("");
    setDestination("");
  }

  return (
    <>
      <div
        aria-label="Buscar voos por rota"
        className="flight-route-filters"
        role="search"
      >
        <div className="flight-route-filter">
          <label htmlFor="flight-route-search">Buscar rota ou aeroporto</label>
          <input
            id="flight-route-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cidade ou código IATA"
            type="search"
            value={query}
          />
        </div>
        <div className="flight-route-filter">
          <label htmlFor="flight-origin">Origem</label>
          <select
            id="flight-origin"
            onChange={(event) => setOrigin(event.target.value)}
            value={origin}
          >
            <option value="">Todas as origens</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="flight-route-filter">
          <label htmlFor="flight-destination">Destino</label>
          <select
            id="flight-destination"
            onChange={(event) => setDestination(event.target.value)}
            value={destination}
          >
            <option value="">Todos os destinos</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <button
          className="button button-secondary flight-filter-reset"
          onClick={resetFilters}
          type="button"
        >
          Limpar
        </button>
      </div>

      <p aria-live="polite" className="flight-results-count" role="status">
        {filteredRoutes.length}{" "}
        {filteredRoutes.length === 1 ? "rota cadastrada" : "rotas cadastradas"}
      </p>

      {filteredRoutes.length ? (
        <div className="flight-route-grid">
          {filteredRoutes.map((route) => (
            <FlightRouteCard key={route.slug} route={route} />
          ))}
        </div>
      ) : (
        <div className="flight-empty-state">
          <h2>Nenhuma rota encontrada</h2>
          <p>
            Tente outra busca ou fale com nossa equipe para perguntar sobre
            outros trajetos.
          </p>
          <button
            className="button button-primary"
            onClick={resetFilters}
            type="button"
          >
            Ver todas as rotas
          </button>
        </div>
      )}
    </>
  );
}
