export type Experience = {
  slug: string;
  title: string;
  category: string;
  categorySlugs: ExperienceCategorySlug[];
  description: string;
  introduction: string;
  planningTips: string[];
  destinationName: string;
  destinationSlug: string;
  image: string;
  imageAlt: string;
};

export type ExperienceCategorySlug =
  | "praias-e-ilhas"
  | "natureza-e-ecoturismo"
  | "cultura-e-historia"
  | "aventura-ao-ar-livre"
  | "gastronomia-e-experiencias-locais";

export type ExperienceCategory = {
  slug: ExperienceCategorySlug;
  name: string;
  title: string;
  description: string;
  destinationSlugs: string[];
  guideSlugs: string[];
};

export const experienceCategories: ExperienceCategory[] = [
  {
    slug: "praias-e-ilhas",
    name: "Praias e ilhas",
    title: "Praias e ilhas para descobrir pelo Brasil",
    description:
      "Ideias para aproveitar paisagens costeiras com atenção às condições do mar, aos acessos e às orientações locais.",
    destinationSlugs: [
      "rio-de-janeiro",
      "salvador",
      "recife",
      "florianopolis",
      "fortaleza",
    ],
    guideSlugs: ["como-planejar-viagem-pelo-brasil"],
  },
  {
    slug: "natureza-e-ecoturismo",
    name: "Natureza e ecoturismo",
    title: "Natureza e ecoturismo no Brasil",
    description:
      "Caminhadas, quedas d'água e paisagens naturais para conhecer com planejamento e respeito às regras de cada lugar.",
    destinationSlugs: [
      "foz-do-iguacu",
      "lencois-maranhenses",
      "bonito",
      "chapada-diamantina",
      "alter-do-chao",
    ],
    guideSlugs: [
      "primeira-visita-aos-lencois-maranhenses",
      "trilhas-com-planejamento",
    ],
  },
  {
    slug: "cultura-e-historia",
    name: "Cultura e história",
    title: "Cultura e história para conhecer de perto",
    description:
      "Arquitetura, espaços culturais e histórias locais para explorar com curiosidade e tempo.",
    destinationSlugs: [
      "salvador",
      "recife",
      "sao-paulo",
      "brasilia",
      "manaus",
      "belem",
    ],
    guideSlugs: ["roteiro-cultural-em-salvador"],
  },
  {
    slug: "aventura-ao-ar-livre",
    name: "Aventura e atividades ao ar livre",
    title: "Aventura e atividades ao ar livre no Brasil",
    description:
      "Percursos e paisagens que pedem preparo, atenção às condições locais e respeito às orientações de segurança.",
    destinationSlugs: [
      "rio-de-janeiro",
      "foz-do-iguacu",
      "lencois-maranhenses",
      "bonito",
      "chapada-diamantina",
      "alter-do-chao",
    ],
    guideSlugs: [
      "primeira-visita-aos-lencois-maranhenses",
      "trilhas-com-planejamento",
    ],
  },
  {
    slug: "gastronomia-e-experiencias-locais",
    name: "Gastronomia e experiências locais",
    title: "Gastronomia e experiências locais pelo Brasil",
    description:
      "Cidades e culturas para descobrir por meio de seus espaços, tradições e sabores regionais.",
    destinationSlugs: ["salvador", "recife", "belo-horizonte", "goiania"],
    guideSlugs: ["roteiro-cultural-em-salvador"],
  },
];

export const experiences: Experience[] = [
  {
    slug: "trilhas-e-mirantes",
    title: "Trilhas e mirantes",
    category: "Natureza",
    categorySlugs: ["natureza-e-ecoturismo", "aventura-ao-ar-livre"],
    description:
      "Descubra paisagens a pé, respeitando o ritmo do caminho e as orientações locais.",
    introduction:
      "Uma proposta para observar a paisagem do Rio de Janeiro a partir de percursos a pé e pontos de vista da cidade. A experiência e o esforço variam conforme o caminho escolhido e as condições locais.",
    planningTips: [
      "Confira a distância, o nível de esforço, o acesso e as orientações locais do percurso escolhido.",
      "Leve água e proteção solar adequadas ao passeio.",
    ],
    destinationName: "Rio de Janeiro",
    destinationSlug: "rio-de-janeiro",
    image: "/images/rio-de-janeiro.jpg",
    imageAlt: "Vista da orla de Copacabana no Rio de Janeiro",
  },
  {
    slug: "cataratas-e-floresta",
    title: "Cataratas e floresta",
    category: "Natureza",
    categorySlugs: ["natureza-e-ecoturismo", "aventura-ao-ar-livre"],
    description:
      "Acompanhe os percursos de caminhada e os diferentes pontos de observação das quedas.",
    introduction:
      "Explore a paisagem das Cataratas do Iguaçu por percursos e pontos de observação do parque. A visita depende das regras, dos acessos e das condições informadas pelos canais oficiais.",
    planningTips: [
      "Consulte o parque para confirmar horários, ingressos, acessos e regras da visita.",
      "Escolha calçados confortáveis e considere a possibilidade de respingos perto das quedas.",
    ],
    destinationName: "Foz do Iguaçu",
    destinationSlug: "foz-do-iguacu",
    image: "/images/foz-do-iguacu.jpg",
    imageAlt: "Vista das quedas d'água em meio à floresta",
  },
  {
    slug: "cultura-baiana",
    title: "Cultura baiana",
    category: "Cultura",
    categorySlugs: ["cultura-e-historia"],
    description:
      "Conheça espaços históricos e expressões culturais que fazem parte da cidade.",
    introduction:
      "Conheça diferentes expressões culturais de Salvador por meio de espaços históricos e culturais. Programações e condições de visita podem variar de acordo com o local e a data.",
    planningTips: [
      "Confira a programação e as condições de acesso diretamente com cada espaço cultural.",
      "Deixe tempo para deslocamentos e pausas entre bairros.",
    ],
    destinationName: "Salvador",
    destinationSlug: "salvador",
    image: "/images/salvador.jpg",
    imageAlt: "Fachadas coloridas em uma rua histórica de Salvador",
  },
  {
    slug: "arquitetura-do-pelourinho",
    title: "Arquitetura do Pelourinho",
    category: "Cultura",
    categorySlugs: ["cultura-e-historia"],
    description:
      "Observe as fachadas, largos e edifícios históricos do centro de Salvador.",
    introduction:
      "Uma caminhada para observar as fachadas, os largos e os edifícios históricos do Pelourinho. A visita combina melhor com um roteiro flexível, atento às condições de circulação e ao funcionamento de cada espaço.",
    planningTips: [
      "Use calçados confortáveis para caminhar em ruas de pedra e ladeiras.",
      "Verifique horários de museus e edifícios que queira visitar.",
    ],
    destinationName: "Salvador",
    destinationSlug: "salvador",
    image: "/images/salvador-church.jpg",
    imageAlt: "Igreja histórica de São Miguel no Pelourinho, em Salvador",
  },
  {
    slug: "dunas-e-lagoas",
    title: "Dunas e lagoas",
    category: "Natureza",
    categorySlugs: ["natureza-e-ecoturismo", "aventura-ao-ar-livre"],
    description:
      "Caminhe pela paisagem dos Lençóis Maranhenses com atenção aos percursos e às condições do parque.",
    introduction:
      "Caminhe entre dunas e lagoas sazonais nos Lençóis Maranhenses. A paisagem, os percursos e as condições de visita mudam; confirme as orientações atualizadas do parque e dos profissionais locais antes de planejar.",
    planningTips: [
      "Confirme condições das lagoas, acessos e regras de visita para as datas da viagem.",
      "Planeje a caminhada considerando sol, areia e disponibilidade de sombra.",
    ],
    destinationName: "Lençóis Maranhenses",
    destinationSlug: "lencois-maranhenses",
    image: "/images/lencois-experiencia.jpg",
    imageAlt: "Lagoa sazonal entre dunas nos Lençóis Maranhenses",
  },
  {
    slug: "rios-de-bonito",
    title: "Rios de Bonito",
    category: "Aventura tranquila",
    categorySlugs: ["natureza-e-ecoturismo", "aventura-ao-ar-livre"],
    description:
      "Observe a vida aquática em passeios autorizados, seguindo as regras locais de preservação.",
    introduction:
      "Observe a vida aquática em rios da região de Bonito por passeios que devem seguir as regras locais de conservação e visitação. As condições e os requisitos dependem da atração escolhida.",
    planningTips: [
      "Confirme diretamente com operadores autorizados as regras, os requisitos e a disponibilidade da atividade.",
      "Siga as orientações ambientais e consulte quais equipamentos estão incluídos.",
    ],
    destinationName: "Bonito",
    destinationSlug: "bonito",
    image: "/images/bonito-snorkeling.jpg",
    imageAlt: "Peixes em águas transparentes no Rio da Prata, em Bonito",
  },
  {
    slug: "caminhos-da-chapada",
    title: "Caminhos da Chapada",
    category: "Aventura",
    categorySlugs: ["natureza-e-ecoturismo", "aventura-ao-ar-livre"],
    description:
      "Conheça trilhas, vales e mirantes com planejamento e respeito às condições da região.",
    introduction:
      "Descubra trilhas, vales e mirantes da Chapada Diamantina escolhendo percursos compatíveis com seu preparo. Distâncias, acessos e condições variam conforme o caminho e a época.",
    planningTips: [
      "Pesquise duração, distância e nível de esforço e confira as condições locais antes de sair.",
      "Verifique se o percurso exige autorização ou acompanhamento profissional.",
    ],
    destinationName: "Chapada Diamantina",
    destinationSlug: "chapada-diamantina",
    image: "/images/chapada-diamantina.jpg",
    imageAlt: "Caminho entre montanhas na Chapada Diamantina",
  },
];
