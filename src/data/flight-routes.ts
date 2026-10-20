export type FlightAirport = {
  city: string;
  airportName: string;
  code: string;
  image: string;
  imageAlt: string;
  travelIdea: string;
};

export type FlightRoute = {
  slug: string;
  origin: FlightAirport;
  destination: FlightAirport;
  introduction: string;
};

const airports = {
  CGH: {
    city: "São Paulo",
    airportName: "Aeroporto de Congonhas",
    code: "CGH",
    image: "/images/sao-paulo.jpg",
    imageAlt: "Panorama urbano da cidade de São Paulo",
    travelIdea:
      "organize as visitas pela cidade extensa e considere incluir o Parque Ibirapuera.",
  },
  GRU: {
    city: "São Paulo",
    airportName: "Aeroporto Internacional de São Paulo/Guarulhos",
    code: "GRU",
    image: "/images/sao-paulo.jpg",
    imageAlt: "Panorama urbano da cidade de São Paulo",
    travelIdea:
      "organize as visitas pela cidade extensa e considere incluir o Parque Ibirapuera.",
  },
  SDU: {
    city: "Rio de Janeiro",
    airportName: "Aeroporto Santos Dumont",
    code: "SDU",
    image: "/images/rio-de-janeiro.jpg",
    imageAlt: "Orla de Copacabana no Rio de Janeiro",
    travelIdea:
      "planeje um passeio pela orla de Copacabana e pelas vistas do Pão de Açúcar.",
  },
  BSB: {
    city: "Brasília",
    airportName: "Aeroporto Internacional de Brasília",
    code: "BSB",
    image: "/images/brasilia.jpg",
    imageAlt: "Eixo Monumental visto da Torre de TV de Brasília",
    travelIdea:
      "reserve tempo para conhecer o Eixo Monumental e a arquitetura da capital.",
  },
  CNF: {
    city: "Belo Horizonte",
    airportName: "Aeroporto Internacional de Belo Horizonte/Confins",
    code: "CNF",
    image: "/images/belo-horizonte.jpg",
    imageAlt: "Entrada do Mercado Central de Belo Horizonte",
    travelIdea:
      "inclua o Mercado Central e planeje o deslocamento terrestre entre Confins e a cidade.",
  },
  POA: {
    city: "Porto Alegre",
    airportName: "Aeroporto Internacional Salgado Filho",
    code: "POA",
    image: "/images/porto-alegre.jpg",
    imageAlt: "Vista do centro histórico e do porto de Porto Alegre",
    travelIdea:
      "conheça a região central e a orla do Guaíba durante a visita.",
  },
  CWB: {
    city: "Curitiba",
    airportName: "Aeroporto Internacional Afonso Pena",
    code: "CWB",
    image: "/images/curitiba.jpg",
    imageAlt: "Estufa do Jardim Botânico de Curitiba",
    travelIdea:
      "reserve um momento para visitar o Jardim Botânico e os parques urbanos.",
  },
  REC: {
    city: "Recife",
    airportName: "Aeroporto Internacional do Recife/Guararapes",
    code: "REC",
    image: "/images/recife.jpg",
    imageAlt: "Conjunto arquitetônico do Bairro do Recife",
    travelIdea:
      "explore o Bairro do Recife e sua arquitetura histórica.",
  },
  GIG: {
    city: "Rio de Janeiro",
    airportName: "Aeroporto Internacional do Rio de Janeiro/Galeão",
    code: "GIG",
    image: "/images/rio-de-janeiro.jpg",
    imageAlt: "Orla de Copacabana no Rio de Janeiro",
    travelIdea:
      "planeje um passeio pela orla de Copacabana e pelas vistas do Pão de Açúcar.",
  },
  SSA: {
    city: "Salvador",
    airportName: "Aeroporto Internacional de Salvador",
    code: "SSA",
    image: "/images/salvador.jpg",
    imageAlt: "Casario histórico no Largo do Pelourinho, em Salvador",
    travelIdea:
      "inclua o centro histórico do Pelourinho no roteiro pela capital baiana.",
  },
  FLN: {
    city: "Florianópolis",
    airportName: "Aeroporto Internacional de Florianópolis",
    code: "FLN",
    image: "/images/florianopolis.jpg",
    imageAlt: "Ponte Hercílio Luz em Florianópolis",
    travelIdea:
      "conheça a Ponte Hercílio Luz e planeje os passeios pela ilha de Santa Catarina.",
  },
  GYN: {
    city: "Goiânia",
    airportName: "Aeroporto de Goiânia/Santa Genoveva",
    code: "GYN",
    image: "/images/goiania.jpg",
    imageAlt: "Paisagem urbana de Goiânia",
    travelIdea:
      "inclua parques urbanos, como o Parque Flamboyant, nos seus passeios.",
  },
  FOR: {
    city: "Fortaleza",
    airportName: "Aeroporto Internacional de Fortaleza/Pinto Martins",
    code: "FOR",
    image: "/images/fortaleza.jpg",
    imageAlt: "Praia de Iracema em Fortaleza",
    travelIdea:
      "reserve tempo para a Praia de Iracema e para a orla da cidade.",
  },
} satisfies Record<string, FlightAirport>;

function createRoute(
  originCode: keyof typeof airports,
  destinationCode: keyof typeof airports,
): FlightRoute {
  const origin = airports[originCode];
  const destination = airports[destinationCode];

  return {
    slug: `${originCode.toLowerCase()}-${destinationCode.toLowerCase()}`,
    origin,
    destination,
    introduction: `Esta página ajuda a planejar um deslocamento entre o ${origin.airportName} (${origin.code}) e o ${destination.airportName} (${destination.code}). A disponibilidade de voos e as condições precisam ser confirmadas pela equipe para as datas desejadas. Em ${origin.city}, ${origin.travelIdea} Ao chegar a ${destination.city}, ${destination.travelIdea}`,
  };
}

export const flightRoutes: FlightRoute[] = [
  createRoute("CGH", "SDU"),
  createRoute("CGH", "BSB"),
  createRoute("CGH", "CNF"),
  createRoute("CGH", "POA"),
  createRoute("CGH", "CWB"),
  createRoute("GRU", "POA"),
  createRoute("GRU", "REC"),
  createRoute("GRU", "CNF"),
  createRoute("GRU", "GIG"),
  createRoute("CGH", "SSA"),
  createRoute("GRU", "BSB"),
  createRoute("CGH", "FLN"),
  createRoute("GRU", "CWB"),
  createRoute("SDU", "BSB"),
  createRoute("GRU", "SSA"),
  createRoute("BSB", "REC"),
  createRoute("BSB", "CNF"),
  createRoute("BSB", "GIG"),
  createRoute("CGH", "GYN"),
  createRoute("GRU", "FOR"),
];

export function getFlightRoute(slug: string) {
  return flightRoutes.find((route) => route.slug === slug);
}

export function formatFlightRoute(route: FlightRoute) {
  return `${route.origin.city} (${route.origin.code}) → ${route.destination.city} (${route.destination.code})`;
}
