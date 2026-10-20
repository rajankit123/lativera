export const destinationCategories = [
  "Praias",
  "Natureza e aventura",
  "Cidades",
  "Cultura e história",
  "Viagens em família",
  "Escapadas de fim de semana",
] as const;

export type DestinationCategory = (typeof destinationCategories)[number];

export type DestinationFaq = {
  question: string;
  answer: string;
};

type DestinationDetails = {
  state: string;
  categories: DestinationCategory[];
  aliases: string[];
  highlight: string;
  faqs: DestinationFaq[];
};

type DestinationBase = {
  slug: string;
  name: string;
  region: string;
  eyebrow: string;
  summary: string;
  introduction: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  experiences: string[];
  tips: string[];
};

export type Destination = DestinationBase & DestinationDetails;

const destinationBase: DestinationBase[] = [
  {
    slug: "rio-de-janeiro",
    name: "Rio de Janeiro",
    region: "Sudeste",
    eyebrow: "Mar, montanha e cidade",
    summary:
      "Entre praias urbanas, bairros cheios de vida e paisagens que encontram o mar.",
    introduction:
      "O Rio combina a energia de uma grande cidade com trilhas, praias e mirantes próximos. Explore cada bairro sem pressa e descubra diferentes perspectivas da paisagem carioca.",
    image: "/images/rio-de-janeiro.jpg",
    imageAlt: "Avenida Atlântica em Copacabana, com prédios e árvores junto à orla",
    highlights: [
      "Caminhe pela orla de Copacabana e Ipanema.",
      "Conheça os mirantes e parques da cidade.",
      "Reserve tempo para explorar bairros como Santa Teresa e Urca.",
    ],
    experiences: [
      "Passeios a pé entre bairros e espaços culturais.",
      "Trilhas e mirantes com vista para a cidade.",
      "Um dia de praia com pausas para conhecer a orla.",
    ],
    tips: [
      "Considere os deslocamentos entre bairros ao organizar cada dia.",
      "Confira as condições locais e regras de acesso antes de fazer trilhas.",
      "Leve água, proteção solar e calçados adequados para caminhar.",
    ],
  },
  {
    slug: "foz-do-iguacu",
    name: "Foz do Iguaçu",
    region: "Sul",
    eyebrow: "Água em movimento",
    summary:
      "Uma viagem marcada pelas cataratas, pela floresta e por encontros de fronteira.",
    introduction:
      "Em Foz do Iguaçu, a paisagem das Cataratas do Iguaçu é o ponto de partida para descobrir a natureza e a diversidade da região. Planeje a visita com tempo para os diferentes percursos do parque.",
    image: "/images/foz-do-iguacu.jpg",
    imageAlt: "Quedas d'água volumosas cercadas pela vegetação das Cataratas do Iguaçu",
    highlights: [
      "Conheça o lado brasileiro do Parque Nacional do Iguaçu.",
      "Observe as diferentes quedas ao longo dos percursos do parque.",
      "Explore a cidade e sua diversidade cultural.",
    ],
    experiences: [
      "Caminhada pelas trilhas e mirantes das cataratas.",
      "Observação da paisagem e da vegetação do parque.",
      "Roteiro cultural pelos diferentes sabores da cidade.",
    ],
    tips: [
      "Confira horários, ingressos e condições de visita nos canais oficiais do parque.",
      "Use calçados confortáveis e prepare-se para respingos perto das quedas.",
      "Consulte as regras vigentes antes de atravessar fronteiras internacionais.",
    ],
  },
  {
    slug: "lencois-maranhenses",
    name: "Lençóis Maranhenses",
    region: "Nordeste",
    eyebrow: "Dunas e lagoas",
    summary:
      "Dunas claras e lagoas sazonais compõem uma paisagem singular no Maranhão.",
    introduction:
      "No Parque Nacional dos Lençóis Maranhenses, dunas e lagoas sazonais criam um cenário em constante transformação. A experiência depende da época, das condições do parque e dos trajetos disponíveis.",
    image: "/images/lencois-maranhenses.jpg",
    imageAlt: "Dunas de areia clara e lagoas sazonais nos Lençóis Maranhenses",
    highlights: [
      "Contemple o encontro das dunas com as lagoas sazonais.",
      "Conheça as comunidades e paisagens da região.",
      "Observe as mudanças de luz sobre as dunas ao longo do dia.",
    ],
    experiences: [
      "Caminhadas acompanhadas por profissionais locais.",
      "Banhos nas lagoas quando as condições permitirem.",
      "Passeios para conhecer os povoados próximos ao parque.",
    ],
    tips: [
      "Verifique os períodos, acessos e regras de visita antes de planejar a viagem.",
      "Confirme se o percurso requer acompanhamento de condutor autorizado.",
      "Leve proteção solar e água; há trechos com pouca sombra.",
    ],
  },
  {
    slug: "salvador",
    name: "Salvador",
    region: "Nordeste",
    eyebrow: "História e cultura viva",
    summary:
      "Uma capital costeira onde arquitetura, música e culinária contam muitas histórias.",
    introduction:
      "Salvador convida a conhecer diferentes camadas da história e da cultura baiana. Caminhe pelo centro histórico, descubra a produção cultural da cidade e faça pausas para provar sabores locais.",
    image: "/images/salvador.jpg",
    imageAlt: "Casario histórico colorido no centro de Salvador, Bahia",
    highlights: [
      "Percorra as ruas e praças do Pelourinho.",
      "Conheça museus, ateliês e espaços culturais.",
      "Descubra diferentes bairros e paisagens à beira-mar.",
    ],
    experiences: [
      "Roteiro cultural pelo centro histórico.",
      "Visita a espaços dedicados à arte e à música baiana.",
      "Percurso gastronômico por sabores da Bahia.",
    ],
    tips: [
      "Use calçados confortáveis para ruas de pedra e ladeiras.",
      "Consulte horários de funcionamento diretamente com cada espaço.",
      "Deixe espaço no roteiro para explorar os bairros com calma.",
    ],
  },
  {
    slug: "bonito",
    name: "Bonito",
    region: "Centro-Oeste",
    eyebrow: "Rios e natureza",
    summary:
      "Rios, grutas e paisagens naturais convidam a explorar com atenção e cuidado.",
    introduction:
      "Bonito é conhecido pelos rios de águas transparentes e pelas grutas da região. As visitas a atrações naturais são organizadas de acordo com regras locais de preservação e capacidade.",
    image: "/images/bonito.jpg",
    imageAlt: "Rio de águas transparentes em meio à vegetação de Bonito",
    highlights: [
      "Conheça os rios e paisagens naturais da região.",
      "Visite grutas e formações geológicas abertas à visitação.",
      "Descubra práticas locais de conservação ambiental.",
    ],
    experiences: [
      "Flutuação em rios com acompanhamento local.",
      "Caminhadas em áreas naturais autorizadas.",
      "Visitas guiadas a grutas da região.",
    ],
    tips: [
      "Confirme com antecedência as regras, disponibilidade e exigências de cada passeio.",
      "Respeite as orientações ambientais e evite tocar na vida aquática.",
      "Consulte quais equipamentos estão incluídos em cada atividade.",
    ],
  },
  {
    slug: "chapada-diamantina",
    name: "Chapada Diamantina",
    region: "Nordeste",
    eyebrow: "Trilhas e horizontes",
    summary:
      "Montanhas, cachoeiras e grutas formam cenários para conhecer a pé.",
    introduction:
      "A Chapada Diamantina reúne paisagens variadas no interior da Bahia. Trilhas, cachoeiras e grutas pedem planejamento cuidadoso, respeito às regras locais e atenção às condições do percurso.",
    image: "/images/chapada-diamantina.jpg",
    imageAlt: "Montanhas e vegetação da Chapada Diamantina, na Bahia",
    highlights: [
      "Explore trilhas e mirantes com diferentes níveis de percurso.",
      "Conheça cachoeiras e grutas abertas à visitação.",
      "Use uma das cidades da região como base para seus passeios.",
    ],
    experiences: [
      "Caminhadas guiadas por trilhas da região.",
      "Observação do pôr do sol em mirantes autorizados.",
      "Banhos de cachoeira onde o acesso estiver permitido.",
    ],
    tips: [
      "Pesquise a distância, o nível e a duração de cada trilha.",
      "Confira clima e condições de acesso antes de sair.",
      "Considere contratar um guia local em percursos desconhecidos.",
    ],
  },
  {
    slug: "sao-paulo",
    name: "São Paulo",
    region: "Sudeste",
    eyebrow: "Arte, sabores e movimento",
    summary:
      "Museus, bairros e uma cena gastronômica diversa em uma metrópole que nunca cabe em um só roteiro.",
    introduction:
      "São Paulo reúne museus, centros culturais, parques e bairros com identidades próprias. Escolha algumas áreas por dia e planeje os deslocamentos para aproveitar a cidade com mais tranquilidade.",
    image: "/images/sao-paulo.jpg",
    imageAlt: "Panorama urbano de São Paulo visto da Avenida Santa Catarina",
    highlights: [
      "Conheça museus e espaços culturais da cidade.",
      "Explore bairros com diferentes cenas gastronômicas.",
      "Reserve pausas em parques e áreas públicas.",
    ],
    experiences: [
      "Roteiro de arte e cultura por diferentes bairros.",
      "Descoberta de mercados, cafés e cozinhas regionais.",
      "Passeio por parques urbanos e espaços ao ar livre.",
    ],
    tips: [
      "Agrupe atrações por região e verifique o tempo de deslocamento.",
      "Confira horários e condições de acesso nos canais de cada espaço.",
      "Consulte fontes locais para orientações atualizadas de mobilidade.",
    ],
  },
  {
    slug: "brasilia",
    name: "Brasília",
    region: "Centro-Oeste",
    eyebrow: "Arquitetura e espaços abertos",
    summary:
      "Uma capital planejada para conhecer entre marcos arquitetônicos, áreas verdes e horizontes amplos.",
    introduction:
      "Brasília oferece uma experiência urbana marcada pela arquitetura moderna e por grandes espaços abertos. Organize os passeios por áreas e consulte previamente o funcionamento dos edifícios e espaços culturais.",
    image: "/images/brasilia.jpg",
    imageAlt: "Eixo Monumental visto da Torre de TV de Brasília",
    highlights: [
      "Percorra os marcos do Eixo Monumental.",
      "Observe a arquitetura cívica e moderna da capital.",
      "Inclua parques e espaços culturais no roteiro.",
    ],
    experiences: [
      "Passeio para observar a arquitetura da cidade.",
      "Visita a espaços culturais conforme os horários disponíveis.",
      "Tempo ao ar livre em parques e áreas públicas.",
    ],
    tips: [
      "Confira dias e horários de visitação antes de ir a edifícios públicos.",
      "Planeje os deslocamentos entre áreas, que podem ser distantes a pé.",
      "Leve proteção solar para passeios em espaços abertos.",
    ],
  },
  {
    slug: "belo-horizonte",
    name: "Belo Horizonte",
    region: "Sudeste",
    eyebrow: "Cultura e sabores mineiros",
    summary:
      "Praças, espaços culturais e uma tradição gastronômica que convida a explorar sem pressa.",
    introduction:
      "Belo Horizonte combina vida urbana, cultura e culinária mineira. Monte um roteiro por bairros e confirme os horários das atrações e do transporte antes de sair.",
    image: "/images/belo-horizonte.jpg",
    imageAlt: "Entrada do Mercado Central de Belo Horizonte",
    highlights: [
      "Conheça o Mercado Central e seus produtos regionais.",
      "Explore praças, museus e espaços culturais.",
      "Descubra a culinária mineira em diferentes bairros.",
    ],
    experiences: [
      "Passeio por mercados e sabores locais.",
      "Visitas a espaços culturais e conjuntos arquitetônicos.",
      "Caminhadas por praças e bairros da cidade.",
    ],
    tips: [
      "Consulte o funcionamento do Mercado Central e das atrações antes da visita.",
      "Considere os deslocamentos entre bairros ao montar o roteiro.",
      "Confirme opções de transporte terrestre entre o aeroporto e seu endereço.",
    ],
  },
  {
    slug: "porto-alegre",
    name: "Porto Alegre",
    region: "Sul",
    eyebrow: "Cultura urbana e orla",
    summary:
      "Uma capital sulista para conhecer entre espaços culturais, bairros e paisagens do Guaíba.",
    introduction:
      "Porto Alegre reúne parques, instituições culturais e áreas junto ao Guaíba. As condições locais podem mudar; confira informações atualizadas antes de planejar deslocamentos e passeios.",
    image: "/images/porto-alegre.jpg",
    imageAlt: "Vista do porto e da área central de Porto Alegre",
    highlights: [
      "Conheça a orla e os espaços públicos junto ao Guaíba.",
      "Explore museus, parques e bairros da capital.",
      "Inclua pausas para experimentar a culinária local.",
    ],
    experiences: [
      "Passeio por espaços culturais e históricos.",
      "Caminhada em parques e áreas abertas.",
      "Roteiro gastronômico por diferentes bairros.",
    ],
    tips: [
      "Consulte avisos locais e condições de funcionamento dos espaços.",
      "Verifique rotas de transporte antes de sair para passeios.",
      "Confirme informações atualizadas sobre o aeroporto e deslocamentos.",
    ],
  },
  {
    slug: "curitiba",
    name: "Curitiba",
    region: "Sul",
    eyebrow: "Parques e vida cultural",
    summary:
      "Parques, arquitetura e espaços culturais ajudam a compor uma escapada urbana versátil.",
    introduction:
      "Curitiba é conhecida por seus parques urbanos e por uma agenda cultural diversa. Confira as condições de visita de cada espaço e considere o clima ao organizar atividades ao ar livre.",
    image: "/images/curitiba.jpg",
    imageAlt: "Estufa principal do Jardim Botânico de Curitiba",
    highlights: [
      "Visite o Jardim Botânico e seus espaços públicos.",
      "Explore parques e áreas verdes da cidade.",
      "Conheça museus, arquitetura e atrações culturais.",
    ],
    experiences: [
      "Passeio ao ar livre por parques urbanos.",
      "Roteiro de arquitetura e cultura.",
      "Descoberta de cafés e cozinhas locais.",
    ],
    tips: [
      "Consulte regras e horários dos parques nos canais oficiais.",
      "Considere o clima variável ao escolher atividades ao ar livre.",
      "Confira as opções de transporte para chegar às atrações.",
    ],
  },
  {
    slug: "recife",
    name: "Recife",
    region: "Nordeste",
    eyebrow: "Rios, mar e patrimônio",
    summary:
      "Arquitetura histórica, cultura pernambucana e paisagens costeiras se encontram na capital.",
    introduction:
      "Recife combina áreas históricas, cultura contemporânea e uma costa urbana. Planeje os passeios considerando as distâncias e consulte avisos locais antes de entrar no mar.",
    image: "/images/recife.jpg",
    imageAlt: "Conjunto arquitetônico do Antigo Bairro do Recife",
    highlights: [
      "Caminhe pelo Bairro do Recife e conheça sua arquitetura.",
      "Explore museus, mercados e espaços culturais.",
      "Descubra a relação da cidade com seus rios e com o litoral.",
    ],
    experiences: [
      "Roteiro pelo patrimônio e pela cultura pernambucana.",
      "Passeio por mercados e sabores regionais.",
      "Tempo na orla, observando as condições locais.",
    ],
    tips: [
      "Confira marés, sinalização e recomendações locais antes de atividades no mar.",
      "Use calçados confortáveis para caminhar pelas áreas históricas.",
      "Consulte horários das atrações e condições de deslocamento.",
    ],
  },
  {
    slug: "florianopolis",
    name: "Florianópolis",
    region: "Sul",
    eyebrow: "Ilha, praias e trilhas",
    summary:
      "Praias, paisagens naturais e bairros insulares pedem um roteiro atento aos deslocamentos.",
    introduction:
      "Florianópolis combina praias, trilhas e áreas urbanas na ilha de Santa Catarina e no continente. Escolha a região de acordo com o tipo de passeio e verifique acessos e condições locais.",
    image: "/images/florianopolis.jpg",
    imageAlt: "Ponte Hercílio Luz em Florianópolis",
    highlights: [
      "Conheça a Ponte Hercílio Luz e a área central.",
      "Explore praias e trilhas conforme as condições de acesso.",
      "Descubra bairros e comunidades da ilha.",
    ],
    experiences: [
      "Passeios costeiros e momentos de praia.",
      "Trilhas em áreas autorizadas e com preparo adequado.",
      "Roteiro cultural e gastronômico pela ilha.",
    ],
    tips: [
      "Considere o trânsito e as distâncias entre as praias.",
      "Confira clima, sinalização e condições das trilhas antes de sair.",
      "Observe alertas e orientações locais para banho de mar.",
    ],
  },
  {
    slug: "goiania",
    name: "Goiânia",
    region: "Centro-Oeste",
    eyebrow: "Parques e cultura urbana",
    summary:
      "Uma capital de áreas verdes, vida cultural e sabores do Centro-Oeste.",
    introduction:
      "Goiânia oferece parques urbanos, espaços culturais e uma cena gastronômica regional. Distribua as visitas por áreas e confirme os horários antes de sair.",
    image: "/images/goiania.jpg",
    imageAlt: "Paisagem urbana de Goiânia",
    highlights: [
      "Conheça parques urbanos e espaços ao ar livre.",
      "Explore a arquitetura e os bairros da capital.",
      "Experimente pratos e ingredientes do Centro-Oeste.",
    ],
    experiences: [
      "Passeios por parques e áreas verdes.",
      "Descoberta de mercados e culinária regional.",
      "Visitas a espaços culturais da cidade.",
    ],
    tips: [
      "Confira horários e programação dos espaços culturais.",
      "Planeje deslocamentos entre bairros e áreas de visita.",
      "Leve água e proteção solar para atividades ao ar livre.",
    ],
  },
  {
    slug: "fortaleza",
    name: "Fortaleza",
    region: "Nordeste",
    eyebrow: "Orla e cultura cearense",
    summary:
      "A vida urbana se encontra com a costa em uma capital marcada por cultura e sabores locais.",
    introduction:
      "Fortaleza reúne uma orla urbana, espaços culturais e culinária cearense. Verifique condições do mar, avisos locais e horários das atrações durante o planejamento.",
    image: "/images/fortaleza.jpg",
    imageAlt: "Praia de Iracema e orla de Fortaleza",
    highlights: [
      "Conheça a Praia de Iracema e a orla urbana.",
      "Explore espaços culturais e mercados da cidade.",
      "Descubra a culinária cearense.",
    ],
    experiences: [
      "Passeios pela orla e por bairros costeiros.",
      "Roteiro cultural pela capital.",
      "Experiências gastronômicas com sabores regionais.",
    ],
    tips: [
      "Observe sinalização, marés e orientações locais antes de entrar no mar.",
      "Confira horários das atrações e mercados.",
      "Planeje o deslocamento entre a orla e outras áreas da cidade.",
    ],
  },
  {
    slug: "manaus",
    name: "Manaus",
    region: "Norte",
    eyebrow: "Cidade e águas amazônicas",
    summary:
      "Uma capital amazônica para conhecer entre referências urbanas e a paisagem do Rio Negro.",
    introduction:
      "Manaus, capital do Amazonas, reúne marcos urbanos como o Teatro Amazonas e a Ponte Rio Negro. Planeje cada visita consultando informações atualizadas sobre acesso, circulação e funcionamento dos espaços.",
    image: "/images/manaus.jpg",
    imageAlt: "Teatro Amazonas iluminado à noite, em Manaus",
    highlights: [
      "Conheça o Teatro Amazonas e a área central ao redor.",
      "Observe a Ponte Rio Negro e a paisagem do rio.",
      "Explore espaços culturais e áreas urbanas conforme as condições de visita.",
    ],
    experiences: [
      "Caminhada para observar a arquitetura do centro.",
      "Visita a espaços culturais com horários confirmados previamente.",
      "Contato com a paisagem do Rio Negro por atividades autorizadas.",
    ],
    tips: [
      "Confirme horários e condições de visita diretamente com cada espaço.",
      "Considere calor e chuva ao organizar atividades ao ar livre.",
      "Consulte orientações locais antes de planejar deslocamentos fluviais.",
    ],
  },
  {
    slug: "belem",
    name: "Belém",
    region: "Norte",
    eyebrow: "Patrimônio e vida ribeirinha",
    summary:
      "Uma capital paraense onde o patrimônio urbano e os espaços ligados à água se encontram.",
    introduction:
      "Belém, capital do Pará, reúne referências como o mercado e o porto do Ver-o-Peso. Organize a visita com tempo para caminhar pela área histórica e confirme previamente horários e condições de acesso.",
    image: "/images/belem.jpg",
    imageAlt: "Porto de pesca e mercado do Ver-o-Peso, em Belém",
    highlights: [
      "Conheça a área do mercado e do porto do Ver-o-Peso.",
      "Observe a arquitetura e os espaços históricos da cidade.",
      "Descubra a cultura local por meio de espaços e mercados da capital.",
    ],
    experiences: [
      "Passeio a pé para observar o porto e o mercado.",
      "Roteiro por espaços históricos com horários conferidos previamente.",
      "Descoberta de mercados e expressões culturais locais.",
    ],
    tips: [
      "Confirme o funcionamento dos mercados e espaços culturais antes da visita.",
      "Planeje os deslocamentos e considere as condições do clima.",
      "Peça orientação local para circulação e atividades próximas à água.",
    ],
  },
  {
    slug: "alter-do-chao",
    name: "Alter do Chão",
    region: "Norte",
    eyebrow: "Praias fluviais e Tapajós",
    summary:
      "Uma localidade de Santarém, no Pará, conhecida pela paisagem do rio Tapajós e suas praias fluviais.",
    introduction:
      "Alter do Chão fica no município de Santarém, no Pará, às margens do rio Tapajós. A paisagem e as condições de visita podem variar; consulte orientações locais atualizadas antes de planejar atividades na água ou deslocamentos.",
    image: "/images/alter-do-chao.jpg",
    imageAlt: "Praia de Alter do Chão às margens do rio Tapajós, no Pará",
    highlights: [
      "Conheça a paisagem das praias fluviais do Tapajós.",
      "Observe as mudanças do rio e da paisagem ao longo da visita.",
      "Explore a localidade respeitando orientações e áreas autorizadas.",
    ],
    experiences: [
      "Tempo junto às praias fluviais quando as condições permitirem.",
      "Observação da paisagem do rio Tapajós.",
      "Passeios locais somente após confirmar acesso e condições vigentes.",
    ],
    tips: [
      "Consulte condições do rio, acessos e orientações locais antes de atividades na água.",
      "Confirme opções e duração de deslocamento com fontes locais atualizadas.",
      "Respeite regras ambientais e orientações das comunidades da região.",
    ],
  },
];

const destinationDetails: Record<string, DestinationDetails> = {
  "rio-de-janeiro": {
    state: "Rio de Janeiro",
    categories: ["Praias", "Cidades", "Cultura e história", "Viagens em família"],
    aliases: ["Rio", "RJ", "Cidade Maravilhosa"],
    highlight: "Copacabana, Ipanema e os mirantes urbanos",
    faqs: [{
      question: "Quais aeroportos aparecem nas rotas cadastradas para o Rio?",
      answer:
        "As rotas cadastradas incluem Santos Dumont (SDU) e Galeão (GIG). Isso não confirma disponibilidade para datas específicas; consulte a equipe e o provedor antes de viajar.",
    }],
  },
  "foz-do-iguacu": {
    state: "Paraná",
    categories: ["Natureza e aventura", "Viagens em família"],
    aliases: ["Foz", "Cataratas do Iguaçu", "Iguazu"],
    highlight: "Cataratas do Iguaçu e trilhas do parque nacional",
    faqs: [{
      question: "Como planejar uma visita às Cataratas do Iguaçu?",
      answer:
        "Consulte os canais oficiais do parque para verificar ingressos, horários, acessos e regras válidas para a data da visita.",
    }],
  },
  "lencois-maranhenses": {
    state: "Maranhão",
    categories: ["Natureza e aventura"],
    aliases: ["Lençóis", "Parque Nacional dos Lençóis Maranhenses", "MA"],
    highlight: "Dunas e lagoas sazonais, cujas condições variam ao longo do ano",
    faqs: [{
      question: "As lagoas dos Lençóis Maranhenses estão sempre cheias?",
      answer:
        "Não. As lagoas são sazonais e suas condições variam. Confira informações atuais sobre período, acessos e regras com os canais oficiais do parque e operadores locais.",
    }],
  },
  salvador: {
    state: "Bahia",
    categories: ["Praias", "Cidades", "Cultura e história", "Escapadas de fim de semana"],
    aliases: ["Salvador da Bahia", "Pelourinho", "BA"],
    highlight: "Centro histórico do Pelourinho e cultura baiana",
    faqs: [{
      question: "Como conhecer o centro histórico de Salvador?",
      answer:
        "Planeje a visita ao Pelourinho e aos espaços culturais consultando horários e condições de acesso diretamente com cada local.",
    }],
  },
  bonito: {
    state: "Mato Grosso do Sul",
    categories: ["Natureza e aventura", "Viagens em família"],
    aliases: ["Bonito MS", "Mato Grosso do Sul"],
    highlight: "Rios transparentes e passeios com regras de conservação",
    faqs: [{
      question: "É preciso reservar passeios em Bonito?",
      answer:
        "A visitação de atrações naturais pode seguir regras locais de capacidade e agendamento. Confirme disponibilidade, requisitos e valores diretamente com operadores autorizados.",
    }],
  },
  "chapada-diamantina": {
    state: "Bahia",
    categories: ["Natureza e aventura"],
    aliases: ["Chapada", "Lençóis BA", "Bahia"],
    highlight: "Trilhas, cachoeiras e paisagens do interior da Bahia",
    faqs: [{
      question: "Preciso de guia para fazer trilhas na Chapada Diamantina?",
      answer:
        "A necessidade depende do percurso e das regras locais. Antes de sair, verifique nível, acesso e orientações de segurança com fontes locais ou profissionais habilitados.",
    }],
  },
  "sao-paulo": {
    state: "São Paulo",
    categories: ["Cidades", "Cultura e história", "Escapadas de fim de semana"],
    aliases: ["SP", "Sampa", "capital paulista"],
    highlight: "Museus, parques e bairros com identidades próprias",
    faqs: [{
      question: "Como aproveitar São Paulo em uma viagem curta?",
      answer:
        "Escolha poucas áreas por dia, agrupe atrações próximas e consulte horários e deslocamentos antes de definir o roteiro.",
    }],
  },
  brasilia: {
    state: "Distrito Federal",
    categories: ["Cidades", "Cultura e história", "Escapadas de fim de semana"],
    aliases: ["Brasília DF", "DF", "capital federal"],
    highlight: "Arquitetura moderna e marcos do Eixo Monumental",
    faqs: [{
      question: "É possível visitar os edifícios públicos de Brasília?",
      answer:
        "As condições de visita variam por edifício e data. Consulte os canais oficiais de cada espaço antes de organizar o passeio.",
    }],
  },
  "belo-horizonte": {
    state: "Minas Gerais",
    categories: ["Cidades", "Cultura e história", "Escapadas de fim de semana"],
    aliases: ["BH", "Belo Horizonte MG", "Minas"],
    highlight: "Mercado Central, espaços culturais e culinária mineira",
    faqs: [{
      question: "O que considerar ao chegar pelo aeroporto de Confins?",
      answer:
        "O Aeroporto de Confins fica fora da área central de Belo Horizonte. Verifique distância, tempo e opções de transporte terrestre atualizados para o endereço da hospedagem.",
    }],
  },
  "porto-alegre": {
    state: "Rio Grande do Sul",
    categories: ["Cidades", "Cultura e história", "Escapadas de fim de semana"],
    aliases: ["POA", "Porto Alegre RS", "RS"],
    highlight: "Parques, cultura urbana e paisagens do Guaíba",
    faqs: [{
      question: "Como conferir informações atualizadas para viajar a Porto Alegre?",
      answer:
        "Consulte avisos de autoridades, aeroporto e operadores locais para verificar condições de transporte e funcionamento dos espaços na data da viagem.",
    }],
  },
  curitiba: {
    state: "Paraná",
    categories: ["Cidades", "Natureza e aventura", "Viagens em família"],
    aliases: ["CWB", "Curitiba PR", "capital paranaense"],
    highlight: "Jardim Botânico e parques urbanos",
    faqs: [{
      question: "Qual época considerar para atividades ao ar livre em Curitiba?",
      answer:
        "O clima pode variar. Consulte a previsão atualizada e as condições de funcionamento dos parques antes de montar o roteiro.",
    }],
  },
  recife: {
    state: "Pernambuco",
    categories: ["Praias", "Cidades", "Cultura e história", "Viagens em família"],
    aliases: ["Recife PE", "Pernambuco", "Bairro do Recife"],
    highlight: "Patrimônio do Bairro do Recife e cultura pernambucana",
    faqs: [{
      question: "O que devo verificar antes de entrar no mar em Recife?",
      answer:
        "Observe placas, marés e alertas oficiais sobre as condições locais. Siga a sinalização e as orientações das autoridades.",
    }],
  },
  florianopolis: {
    state: "Santa Catarina",
    categories: ["Praias", "Natureza e aventura", "Viagens em família"],
    aliases: ["Florianópolis SC", "Floripa", "Ilha de Santa Catarina"],
    highlight: "Ponte Hercílio Luz, praias e trilhas da ilha",
    faqs: [{
      question: "Como escolher praias e passeios em Florianópolis?",
      answer:
        "Considere a região da ilha, os deslocamentos e as condições do mar. Confira acessos, previsão e avisos locais antes de sair.",
    }],
  },
  goiania: {
    state: "Goiás",
    categories: ["Cidades", "Cultura e história", "Escapadas de fim de semana"],
    aliases: ["Goiânia GO", "GO", "capital goiana"],
    highlight: "Parques urbanos e sabores do Centro-Oeste",
    faqs: [{
      question: "Goiânia tem opções de passeio ao ar livre?",
      answer:
        "A cidade conta com parques e espaços públicos. Consulte horários, regras e condições de funcionamento nos canais locais antes de visitar.",
    }],
  },
  fortaleza: {
    state: "Ceará",
    categories: ["Praias", "Cidades", "Viagens em família"],
    aliases: ["Fortaleza CE", "Ceará", "Praia de Iracema"],
    highlight: "Praia de Iracema e orla urbana",
    faqs: [{
      question: "Quais cuidados ter ao visitar a orla de Fortaleza?",
      answer:
        "Confira sinalização, marés e orientações locais antes de atividades no mar e consulte informações atualizadas sobre as áreas de visita.",
    }],
  },
  manaus: {
    state: "Amazonas",
    categories: ["Cidades", "Natureza e aventura", "Cultura e história"],
    aliases: ["Manaus AM", "Amazonas"],
    highlight: "Teatro Amazonas e paisagem do Rio Negro",
    faqs: [{
      question: "O que devo confirmar antes de visitar espaços em Manaus?",
      answer:
        "Consulte diretamente os espaços e canais locais para confirmar horários, acesso e condições válidas para a data da visita.",
    }],
  },
  belem: {
    state: "Pará",
    categories: ["Cidades", "Cultura e história"],
    aliases: ["Belém do Pará", "Belem PA", "Pará"],
    highlight: "Mercado e porto do Ver-o-Peso",
    faqs: [{
      question: "Como planejar uma visita ao Ver-o-Peso?",
      answer:
        "Confirme o funcionamento, o acesso e as orientações locais do mercado e do porto antes de organizar sua visita.",
    }],
  },
  "alter-do-chao": {
    state: "Pará",
    categories: ["Praias", "Natureza e aventura", "Viagens em família"],
    aliases: ["Alter do Chão PA", "Santarém", "Rio Tapajós"],
    highlight: "Praias fluviais e paisagens do rio Tapajós",
    faqs: [{
      question: "Alter do Chão fica em qual município?",
      answer:
        "Alter do Chão é uma localidade do município de Santarém, no Pará. Consulte fontes locais para confirmar acessos e condições de visita para suas datas.",
    }],
  },
};

export const destinations: Destination[] = destinationBase.map((destination) => {
  const details = destinationDetails[destination.slug];

  if (!details) {
    throw new Error(`Missing destination details for "${destination.slug}".`);
  }

  return { ...destination, ...details };
});
