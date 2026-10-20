export type GuideSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  category: string;
  description: string;
  readTime: string;
  image: string;
  imageAlt: string;
  sections: GuideSection[];
  relatedDestinationSlugs: string[];
};

export const guides: Guide[] = [
  {
    slug: "como-planejar-viagem-pelo-brasil",
    title: "Como planejar uma viagem pelo Brasil com mais calma",
    category: "Planejamento",
    description:
      "Um roteiro prático para escolher destinos, organizar deslocamentos e deixar espaço para descobertas.",
    readTime: "6 min de leitura",
    image: "/images/rio-pao-de-acucar.jpg",
    imageAlt: "Pão de Açúcar visto da Baía de Guanabara no Rio de Janeiro",
    sections: [
      {
        heading: "Comece pelo ritmo da viagem",
        paragraphs: [
          "Antes de escolher cada passeio, pense em quantos dias você tem e no tipo de experiência que procura. Um itinerário com poucas bases costuma deixar mais tempo para conhecer cada lugar.",
          "O Brasil é extenso e os deslocamentos podem ocupar parte importante da viagem. Agrupar destinos por região ajuda a montar planos mais realistas.",
        ],
      },
      {
        heading: "Pesquise os deslocamentos",
        paragraphs: [
          "Compare opções de transporte e confirme horários diretamente com empresas e fontes oficiais. Considere o tempo entre o aeroporto, a hospedagem e os passeios.",
        ],
        list: [
          "Confira as distâncias entre as atrações escolhidas.",
          "Reserve intervalos para refeições e descanso.",
          "Mantenha alguma flexibilidade para mudanças no clima.",
        ],
      },
      {
        heading: "Confirme detalhes antes de sair",
        paragraphs: [
          "Acessos, horários e condições de visita podem mudar. Verifique as informações mais recentes com parques, museus, operadores autorizados e órgãos locais antes de viajar.",
        ],
      },
    ],
    relatedDestinationSlugs: ["rio-de-janeiro", "salvador"],
  },
  {
    slug: "primeira-visita-aos-lencois-maranhenses",
    title: "O que considerar antes de visitar os Lençóis Maranhenses",
    category: "Natureza",
    description:
      "Entenda por que o período da visita e as condições do parque importam para o roteiro.",
    readTime: "5 min de leitura",
    image: "/images/lencois-dunes-water.jpg",
    imageAlt: "Dunas e lagoas nos Lençóis Maranhenses",
    sections: [
      {
        heading: "A paisagem muda ao longo do ano",
        paragraphs: [
          "O parque reúne dunas e lagoas sazonais. A quantidade de água e as condições dos percursos variam; por isso, a experiência pode ser diferente em cada época.",
          "Converse com os canais oficiais e profissionais locais para saber quais passeios e acessos estão disponíveis na data da sua visita.",
        ],
      },
      {
        heading: "Prepare-se para caminhar",
        paragraphs: [
          "O sol e a areia fazem parte do percurso. Planeje os deslocamentos com antecedência e confira a duração e o nível de esforço de cada passeio.",
        ],
        list: [
          "Leve água e proteção contra o sol.",
          "Use roupas e calçados apropriados para caminhar na areia.",
          "Respeite as regras do parque e não deixe resíduos.",
        ],
      },
      {
        heading: "Organize sua base",
        paragraphs: [
          "As cidades de acesso oferecem bases diferentes para conhecer a região. Compare deslocamentos, estrutura e disponibilidade para escolher a que combina com seu roteiro.",
        ],
      },
    ],
    relatedDestinationSlugs: ["lencois-maranhenses"],
  },
  {
    slug: "roteiro-cultural-em-salvador",
    title: "Um roteiro cultural para descobrir Salvador",
    category: "Cultura",
    description:
      "Ideias para percorrer o centro histórico, conhecer espaços culturais e provar sabores baianos.",
    readTime: "5 min de leitura",
    image: "/images/salvador-capoeira.jpg",
    imageAlt: "Roda de capoeira em Salvador, Bahia",
    sections: [
      {
        heading: "Percorra o centro histórico sem pressa",
        paragraphs: [
          "O Pelourinho reúne ruas, praças e edifícios ligados a diferentes períodos da história da cidade. Reserve tempo para observar a arquitetura e conferir a programação dos espaços culturais.",
        ],
      },
      {
        heading: "Inclua pausas e outros bairros",
        paragraphs: [
          "Uma visita pode combinar o centro histórico com bairros e paisagens costeiras. Confira as opções de transporte e o tempo de deslocamento entre as regiões.",
        ],
        list: [
          "Verifique horários de museus e centros culturais.",
          "Inclua uma pausa para conhecer a culinária local.",
          "Consulte a programação cultural disponível para suas datas.",
        ],
      },
      {
        heading: "Deixe o roteiro aberto",
        paragraphs: [
          "Salvador tem muitas camadas culturais. Escolha alguns pontos de interesse e deixe espaço para exposições, música e lugares que encontrar pelo caminho.",
        ],
      },
    ],
    relatedDestinationSlugs: ["salvador"],
  },
  {
    slug: "trilhas-com-planejamento",
    title: "Como se preparar para uma trilha durante a viagem",
    category: "Atividades ao ar livre",
    description:
      "Orientações gerais para escolher percursos com cuidado e respeitar as regras locais.",
    readTime: "4 min de leitura",
    image: "/images/chapada-waterfall.jpg",
    imageAlt: "Vista da Cachoeira da Fumaça na Chapada Diamantina",
    sections: [
      {
        heading: "Escolha um percurso compatível",
        paragraphs: [
          "Pesquise a distância, o desnível, a duração estimada e as condições do caminho. A descrição de uma trilha pode não refletir a dificuldade para cada pessoa.",
        ],
      },
      {
        heading: "Confira as condições locais",
        paragraphs: [
          "Clima, acessos e regras podem mudar. Consulte fontes locais atualizadas e verifique se o percurso exige autorização ou acompanhamento.",
        ],
        list: [
          "Avise alguém sobre seu itinerário.",
          "Leve água e itens adequados ao percurso.",
          "Siga as sinalizações e não saia das trilhas autorizadas.",
        ],
      },
      {
        heading: "Cuide do ambiente",
        paragraphs: [
          "Respeite as regras da área protegida, evite deixar resíduos e mantenha distância da fauna. Em caso de dúvida, siga a orientação das equipes locais.",
        ],
      },
    ],
    relatedDestinationSlugs: ["rio-de-janeiro", "chapada-diamantina"],
  },
];
