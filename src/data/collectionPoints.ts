import lojasCemImg from "@/assets/lojas-cem.jpg";
import aterroVerdeImg from "@/assets/aterro-verde.jpg";
import multRealImg from "@/assets/mult-real.jpg";

export interface CollectionPoint {
  id: string;
  name: string;
  address: string;
  description: string;
  lat: number;
  lng: number;
  tags: string[];
  hours: string;
  paga: boolean;
  conditions?: string;
  image?: string;
}

export const collectionPoints: CollectionPoint[] = [
  {
    id: "1",
    name: "Lojas Cem",
    address: "Rua Nilo Peçanha 60, Resende, RJ, 27542-210",
    description: "Ponto de coleta de pilhas usadas localizado dentro da loja Lojas CEM. Basta entregar as pilhas no balcão de atendimento. Não é necessário ser cliente da loja.",
    lat: -22.4688,
    lng: -44.4467,
    tags: ["Pilhas"],
    hours: "Seg a Sex 9h–19h · Sáb 9h–14h",
    paga: false,
    image: lojasCemImg,
  },
  {
    id: "2",
    name: "PEV Parque das Águas (AMAR)",
    address: "Av. Rita Ferreira da Rocha s/nº - Jardim Jalisco, 27510-060",
    description: "Ponto de Entrega Voluntário ao lado da sede da Agência do Meio Ambiente de Resende. Aceita diversos tipos de materiais recicláveis como lâmpadas, pilhas, baterias, óleo vegetal pós-consumo, papéis, plásticos, metais e vidros.",
    lat: -22.4628,
    lng: -44.4545,
    tags: ["Lâmpadas", "Pilhas", "Baterias", "Óleo Vegetal", "Papéis", "Plásticos", "Metais", "Vidros"],
    hours: "Diariamente, 6h–22h",
    paga: false,
    conditions: "Não jogar lâmpadas para que o vidro não quebre. Somente materiais domésticos.",
  },
  {
    id: "3",
    name: "Agência do Meio Ambiente (AMAR)",
    address: "Av. Rita Ferreira da Rocha s/nº - Jardim Jalisco, 27510-060",
    description: "Coleta de resíduos do serviço de saúde (hospitalares classes A e B), incluindo medicamentos vencidos e perfurocortantes como seringas e agulhas. Entrega deve ser feita no quiosque da Gestão de Resíduos Sólidos.",
    lat: -22.4625,
    lng: -44.4540,
    tags: ["Resíduos Hospitalares"],
    hours: "Seg a Sex 12h–18h",
    paga: false,
    conditions: "Entrega no quiosque da Gestão de Resíduos Sólidos, no Parque das Águas.",
  },
  {
    id: "4",
    name: "PEV Próximo ao Parque de Exposições",
    address: "Av. Professor Antônio Esteves, s/n - Próx. ao Detran",
    description: "Ponto de Entrega Voluntário para descarte de pneus inservíveis, localizado em frente ao local de provas do Detran, próximo ao Parque de Exposições.",
    lat: -22.4810,
    lng: -44.4730,
    tags: ["Pneus"],
    hours: "Seg a Sex 8h–17h",
    paga: false,
  },
  {
    id: "5",
    name: "Laura Comércio de Usados",
    address: "Av. Gal. Afonseca, 695 - Manejo, 27520-172",
    description: "Comércio que compra materiais recicláveis como todos os tipos de metálicos e plástico PET. Um dos poucos pontos da cidade que paga pelos materiais entregues.",
    lat: -22.4750,
    lng: -44.4380,
    tags: ["Metálicos", "Plástico PET"],
    hours: "Seg a Sex 8:30–17h · Sáb 9h–12h",
    paga: true,
  },
  {
    id: "6",
    name: "Cooperativa de Catadores Recicla Resende",
    address: "Av. Cel. Prof. Antonio Esteves, s/n - galpão 9, Campo de aviação, 27511-970",
    description: "Cooperativa que aceita PET, latinha, sucata, embalagens de plástico (PAD/PP), alumínio, eletrônicos (TVs, PCs), eletrodomésticos (geladeira, fogão) e vidros. Não aceita: louças, espelho, blindex, embalagens laminadas por dentro, isopor, madeira, tecidos, móveis e resíduo comum.",
    lat: -22.4785,
    lng: -44.4710,
    tags: ["PET", "Latinha", "Sucata", "Plásticos", "Alumínio", "Eletrônicos", "Vidros"],
    hours: "Seg a Sex 7h–17h",
    paga: false,
  },
  {
    id: "7",
    name: "Mult Real Reciclagem",
    address: "Av. Juscelino Kubitscheck – Elite, 27522-130",
    description: "Indústria e comércio de materiais metálicos que compra metais como ferro, alumínio, cobre e sucata em geral. O pagamento depende do tipo, quantidade e cotação do material; pode exigir separação prévia.",
    lat: -22.4830,
    lng: -44.4520,
    tags: ["Ferro", "Alumínio", "Cobre", "Sucata"],
    hours: "Seg a Qui 7h30–17h30 · Sex 8h–16h30 · Sáb 8h–12h",
    paga: true,
    conditions: "Depende do tipo, quantidade e cotação do material; pode exigir separação.",
    image: multRealImg,
  },
  {
    id: "8",
    name: "Aterro Verde Resende",
    address: "Estrada Resende–Riachuelo (Casa da Lua), Resende - RJ",
    description: "Local para descarte de entulho, restos de obra, móveis e poda. Pode haver limite de volume por descarte.",
    lat: -22.4550,
    lng: -44.4850,
    tags: ["Entulho", "Restos de Obra", "Móveis", "Poda"],
    hours: "Seg a Sex 7h–17h · Sáb 7h–12h",
    paga: false,
    conditions: "Pode haver limite de volume por descarte.",
    image: aterroVerdeImg,
  },
];
