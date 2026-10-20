"use client";

import { Bookmark, BookmarkCheck, ListPlus, ListX } from "lucide-react";
import { useTravelPlanner, type PlannerItem } from "./travel-planner-provider";

export function SaveToggleButton({
  kind,
  slug,
  name,
}: PlannerItem & { name: string }) {
  const { isReady, isSaved, toggleSaved } = useTravelPlanner();
  const saved = isSaved(kind, slug);
  const label = saved ? `Remover ${name} dos salvos` : `Salvar ${name}`;

  return (
    <button
      aria-label={label}
      aria-pressed={saved}
      className="planner-action-button"
      disabled={!isReady}
      onClick={() => toggleSaved(kind, slug)}
      type="button"
    >
      {saved ? <BookmarkCheck aria-hidden="true" size={17} /> : <Bookmark aria-hidden="true" size={17} />}
      {saved ? "Salvo" : "Salvar"}
    </button>
  );
}

export function ItineraryToggleButton({
  kind,
  slug,
  name,
}: PlannerItem & { name: string }) {
  const { isReady, isInItinerary, toggleItinerary } = useTravelPlanner();
  const added = isInItinerary({ kind, slug });

  return (
    <button
      aria-pressed={added}
      className="planner-action-button"
      disabled={!isReady}
      onClick={() => toggleItinerary({ kind, slug })}
      type="button"
    >
      {added ? <ListX aria-hidden="true" size={17} /> : <ListPlus aria-hidden="true" size={17} />}
      {added ? "Remover do roteiro" : `Adicionar ${name} ao roteiro`}
    </button>
  );
}
