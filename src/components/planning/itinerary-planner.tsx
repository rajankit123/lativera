"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { DestinationCard, ExperienceCard } from "@/components/ui/travel-cards";
import { destinations } from "@/data/destinations";
import { experiences } from "@/data/experiences";
import {
  useTravelPlanner,
  type PlannerItem,
} from "./travel-planner-provider";

const destinationBySlug = new Map(
  destinations.map((destination) => [destination.slug, destination]),
);
const experienceBySlug = new Map(
  experiences.map((experience) => [experience.slug, experience]),
);
const maxItineraryItems = 30;

function resolveItem(item: PlannerItem) {
  return item.kind === "destination"
    ? destinationBySlug.get(item.slug)
    : experienceBySlug.get(item.slug);
}

function getItemName(item: PlannerItem) {
  return item.kind === "destination"
    ? destinationBySlug.get(item.slug)?.name
    : experienceBySlug.get(item.slug)?.title;
}

function parseSharedItems(value: string) {
  if (value.length > 4096) {
    return { items: [] as PlannerItem[], invalidCount: 1 };
  }
  const items: PlannerItem[] = [];
  const tokens = value.split(",");
  let invalidCount = Math.max(0, tokens.length - maxItineraryItems);
  for (const token of tokens.slice(0, maxItineraryItems)) {
    const [prefix, ...slugParts] = token.split("~");
    const slug = slugParts.join("~");
    const kind =
      prefix === "d" ? "destination" : prefix === "e" ? "experience" : null;
    const valid =
      kind === "destination"
        ? destinationBySlug.has(slug)
        : kind === "experience"
          ? experienceBySlug.has(slug)
          : false;
    if (!kind || !valid || items.some((item) => item.kind === kind && item.slug === slug)) {
      invalidCount += 1;
      continue;
    }
    items.push({ kind, slug });
  }
  return { items, invalidCount };
}

function makeShareUrl(items: PlannerItem[]) {
  const url = new URL("/roteiro", window.location.origin);
  url.searchParams.set(
    "itens",
    items.map(({ kind, slug }) => `${kind === "destination" ? "d" : "e"}~${slug}`).join(","),
  );
  return url.toString();
}

export function ItineraryPlanner() {
  const {
    itinerary,
    isReady,
    storageAvailable,
    removeFromItinerary,
    moveItineraryItem,
    replaceItinerary,
  } = useTravelPlanner();
  const [search, setSearch] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [shareFingerprint, setShareFingerprint] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const [sharedLinkMessage, setSharedLinkMessage] = useState("");
  const sharedLinkProcessed = useRef(false);

  useEffect(() => {
    if (!isReady || sharedLinkProcessed.current) return;
    sharedLinkProcessed.current = true;
    const sharedItems = new URLSearchParams(window.location.search).get("itens");
    if (!sharedItems) return;
    const parsed = parseSharedItems(sharedItems);
    if (parsed.items.length) {
      replaceItinerary(parsed.items);
      const message = parsed.invalidCount
        ? `Roteiro carregado. ${parsed.invalidCount} item(ns) desconhecido(s) foram ignorados.`
        : "Roteiro compartilhado carregado.";
      queueMicrotask(() => setSharedLinkMessage(message));
    } else {
      queueMicrotask(() =>
        setSharedLinkMessage(
          "Este link não contém itens reconhecidos. O roteiro salvo neste navegador foi mantido.",
        ),
      );
    }
  }, [isReady, replaceItinerary]);

  const normalizedSearch = search.trim().toLocaleLowerCase("pt-BR");
  const itineraryFingerprint = itinerary
    .map(({ kind, slug }) => `${kind}:${slug}`)
    .join("|");
  const shareIsCurrent =
    shareUrl.length > 0 && shareFingerprint === itineraryFingerprint;
  const matchingDestinations = useMemo(
    () =>
      destinations.filter((destination) =>
        destination.name.toLocaleLowerCase("pt-BR").includes(normalizedSearch),
      ),
    [normalizedSearch],
  );
  const matchingExperiences = useMemo(
    () =>
      experiences.filter((experience) =>
        `${experience.title} ${experience.destinationName}`
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedSearch),
      ),
    [normalizedSearch],
  );

  function generateShareUrl() {
    if (!itinerary.length) return;
    setShareUrl(makeShareUrl(itinerary));
    setShareFingerprint(itineraryFingerprint);
    setShareMessage("Link do roteiro atualizado. Você pode copiar o resumo e compartilhar.");
  }

  async function copySummary() {
    if (!shareIsCurrent) return;
    const summary = [
      "Meu roteiro Lativera:",
      ...itinerary.map((item, index) => `${index + 1}. ${getItemName(item) ?? "Item"}`),
      "",
      `Abra ou edite o roteiro: ${shareUrl}`,
    ].join("\n");
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API indisponível.");
      await navigator.clipboard.writeText(summary);
      setShareMessage("Resumo e link do roteiro copiados.");
    } catch {
      setShareMessage(
        "Não foi possível copiar automaticamente. Selecione e copie o texto do roteiro abaixo.",
      );
    }
  }

  return (
    <div className="itinerary-layout">
      <section aria-labelledby="itinerary-current-title" className="planner-panel itinerary-current">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Seu planejamento</p>
            <h2 id="itinerary-current-title">Roteiro em ordem</h2>
          </div>
          <span className="itinerary-count">
            {itinerary.length} de {maxItineraryItems} itens
          </span>
        </div>
        {!isReady ? (
          <p role="status">Carregando seu roteiro salvo neste navegador…</p>
        ) : itinerary.length ? (
          <ol className="itinerary-list">
            {itinerary.map((item, index) => {
              const resolved = resolveItem(item);
              const name = getItemName(item) ?? "Item do roteiro";
              if (!resolved) return null;
              const href =
                item.kind === "destination"
                  ? `/destinos/${item.slug}`
                  : `/experiencias/${item.slug}`;
              return (
                <li className="itinerary-item" key={`${item.kind}-${item.slug}`}>
                  <div className="itinerary-item-copy">
                    <span className="itinerary-item-number">{index + 1}</span>
                    <div>
                      <span className="eyebrow">
                        {item.kind === "destination" ? "Destino" : "Experiência"}
                      </span>
                      <Link href={href}>{name}</Link>
                    </div>
                  </div>
                  <div className="itinerary-item-actions">
                    <button
                      aria-label={`Mover ${name} para cima`}
                      className="planner-icon-button"
                      disabled={index === 0}
                      onClick={() => moveItineraryItem(index, -1)}
                      type="button"
                    >
                      ↑
                    </button>
                    <button
                      aria-label={`Mover ${name} para baixo`}
                      className="planner-icon-button"
                      disabled={index === itinerary.length - 1}
                      onClick={() => moveItineraryItem(index, 1)}
                      type="button"
                    >
                      ↓
                    </button>
                    <button
                      aria-label={`Remover ${name} do roteiro`}
                      className="planner-text-button planner-remove-button"
                      onClick={() => removeFromItinerary(index)}
                      type="button"
                    >
                      Remover
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="planner-empty-state">
            <h3>Seu roteiro ainda está vazio</h3>
            <p>
              Adicione destinos ou experiências abaixo, ou use os botões nas
              páginas de descoberta.
            </p>
            <Link className="text-link" href="/destinos">
              Explorar destinos <span aria-hidden="true">↗</span>
            </Link>
          </div>
        )}
        {sharedLinkMessage && (
          <p className="planner-notice" role="status">{sharedLinkMessage}</p>
        )}
        {storageAvailable === false && (
          <p className="planner-notice" role="status">
            O armazenamento local está indisponível; alterações do roteiro
            permanecem somente nesta sessão do navegador.
          </p>
        )}
        <div className="planner-share-controls">
          <button
            className="button button-primary"
            disabled={!itinerary.length}
            onClick={generateShareUrl}
            type="button"
          >
            Gerar link do roteiro
          </button>
          <button
            className="button button-secondary"
            disabled={!shareIsCurrent}
            onClick={copySummary}
            type="button"
          >
            Copiar resumo e link
          </button>
        </div>
        {shareIsCurrent && (
          <div className="form-field">
            <label htmlFor="itinerary-share-text">Resumo compartilhável</label>
            <textarea
              id="itinerary-share-text"
              onFocus={(event) => event.currentTarget.select()}
              readOnly
              rows={Math.min(itinerary.length + 3, 12)}
              value={[
                "Meu roteiro Lativera:",
                ...itinerary.map((item, index) => `${index + 1}. ${getItemName(item) ?? "Item"}`),
                "",
                `Abra ou edite o roteiro: ${shareUrl}`,
              ].join("\n")}
            />
          </div>
        )}
        {(shareMessage || (shareUrl && !shareIsCurrent)) && (
          <p aria-live="polite" className="form-status" role="status">
            {shareUrl && !shareIsCurrent
              ? "O roteiro mudou desde a criação do link. Gere um novo link antes de copiar ou compartilhar."
              : shareMessage}
          </p>
        )}
        <p className="planner-helper">
          O roteiro é uma lista ordenada, não um cronograma confirmado. O link
          contém apenas os códigos dos itens escolhidos e pode ser encaminhado
          para outras pessoas.
        </p>
      </section>

      <section aria-labelledby="itinerary-add-title" className="itinerary-catalog">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Inspire-se</p>
            <h2 id="itinerary-add-title">Adicione ao roteiro</h2>
          </div>
        </div>
        <div className="form-field itinerary-search">
          <label htmlFor="itinerary-search">Buscar destinos e experiências</label>
          <input
            autoComplete="off"
            id="itinerary-search"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Digite um nome"
            type="search"
            value={search}
          />
        </div>
        <details className="itinerary-catalog-section" open>
          <summary>Destinos ({matchingDestinations.length})</summary>
          {matchingDestinations.length ? (
            <div className="card-grid card-grid-three listing-grid">
              {matchingDestinations.map((destination) => (
                <DestinationCard
                  destination={destination}
                  imageLoading="lazy"
                  key={destination.slug}
                />
              ))}
            </div>
          ) : (
            <p>Nenhum destino corresponde à busca.</p>
          )}
        </details>
        <details className="itinerary-catalog-section">
          <summary>Experiências ({matchingExperiences.length})</summary>
          {matchingExperiences.length ? (
            <div className="card-grid card-grid-three listing-grid">
              {matchingExperiences.map((experience) => (
                <ExperienceCard
                  experience={experience}
                  imageLoading="lazy"
                  key={experience.slug}
                />
              ))}
            </div>
          ) : (
            <p>Nenhuma experiência corresponde à busca.</p>
          )}
        </details>
      </section>
    </div>
  );
}
