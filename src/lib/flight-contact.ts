import type { FlightRoute } from "@/data/flight-routes";

export const flightContactNumbers = [
  { label: "+55 11 5282-2609", international: "551152822609" },
  { label: "+55 11 5282-0955", international: "551152820955" },
  { label: "+55 11 5118-9203", international: "551151189203" },
] as const;

export function createFlightWhatsAppUrl(
  internationalNumber: string,
  route?: FlightRoute,
) {
  const message = route
    ? `Olá! Gostaria de ajuda com uma passagem de ${route.origin.city} (${route.origin.code}) para ${route.destination.city} (${route.destination.code}). Quero consultar opções e disponibilidade.`
    : "Olá! Gostaria de ajuda para planejar uma viagem de avião pelo Brasil.";

  return `https://wa.me/${internationalNumber}?text=${encodeURIComponent(message)}`;
}
