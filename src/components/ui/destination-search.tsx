"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent, type KeyboardEvent } from "react";
import type { Destination } from "@/data/destinations";

type DestinationSearchProps = {
  destinations: Destination[];
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

export function DestinationSearch({ destinations }: DestinationSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const matches = useMemo(() => {
    const search = normalize(query);
    if (!search) return [];

    return destinations
      .filter((destination) =>
        normalize([destination.name, ...destination.aliases].join(" ")).includes(
          search,
        ),
      )
      .slice(0, 6);
  }, [destinations, query]);

  function navigateToSelectedDestination() {
    const selected = matches[activeIndex] ?? matches[0];
    if (selected) router.push(`/destinos/${selected.slug}`);
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigateToSelectedDestination();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && matches.length) {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % matches.length);
    } else if (event.key === "ArrowUp" && matches.length) {
      event.preventDefault();
      setActiveIndex(
        (index) => (index - 1 + matches.length) % matches.length,
      );
    } else if (event.key === "Enter" && matches.length) {
      event.preventDefault();
      navigateToSelectedDestination();
    } else if (event.key === "Escape") {
      setQuery("");
      setActiveIndex(0);
    }
  }

  return (
    <form className="destination-search" onSubmit={submitSearch}>
      <label htmlFor="home-destination-search">Qual lugar você quer conhecer?</label>
      <div className="destination-search-row">
        <input
          aria-autocomplete="list"
          aria-describedby="home-destination-search-status"
          autoComplete="off"
          id="home-destination-search"
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Busque uma cidade ou destino"
          type="search"
          value={query}
        />
        <button className="button button-primary" type="submit">
          Buscar destino
        </button>
      </div>
      <span
        aria-live="polite"
        className="sr-only"
        id="home-destination-search-status"
      >
        {matches.length
          ? `${matches.length} ${matches.length === 1 ? "destino encontrado" : "destinos encontrados"}. Sugestão selecionada: ${matches[activeIndex]?.name ?? matches[0].name}.`
          : query
            ? "Nenhum destino encontrado."
            : ""}
      </span>
      {query && (
        <div className="destination-search-results">
          {matches.length ? (
            <ul
              aria-label="Sugestões de destinos"
              className="destination-search-options"
            >
              {matches.map((destination, index) => (
                <li className="destination-search-option" key={destination.slug}>
                  <Link
                    className={index === activeIndex ? "is-active" : undefined}
                    href={`/destinos/${destination.slug}`}
                  >
                    <span>{destination.name}</span>
                    <span>{destination.state} · {destination.region}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="destination-search-empty" role="status">
              Nenhum destino encontrado. Tente outro nome ou explore todos os
              destinos.
            </p>
          )}
        </div>
      )}
    </form>
  );
}
