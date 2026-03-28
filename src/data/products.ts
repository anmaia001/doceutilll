export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'utilidades' | 'doces';
  badge?: string;
  featured?: boolean;
}

export const products: Product[] = [
  // === UTILIDADES DOMÉSTICAS ===
  {
    id: 'u1',
    name: 'Conjunto de Panelas Antiaderentes 5 Peças',
    description: 'Panelas com revestimento antiaderente de alta qualidade, alças ergonômicas e tampas de vidro. Ideal para cozinhar com menos óleo.',
    price: 189.90,
    image: 'https://images.unsplash.com/photo-1743684456567-a3d32dbf702e?w=600&q=80',
    category: 'utilidades',
    badge: 'Mais Vendido',
    featured: true,
  },
  {
    id: 'u2',
    name: 'Jogo de Facas Profissional Aço Inox',
    description: 'Conjunto de facas em aço inoxidável de alta durabilidade. Lâminas precisas, cabos antiderrapantes e resistência à corrosão.',
    price: 129.90,
    image: 'https://images.unsplash.com/photo-1674660346036-4b3df3f07cca?w=600&q=80',
    category: 'utilidades',
  },
  {
    id: 'u3',
    name: 'Forma de Bolo Antiaderente Kit 3 Tamanhos',
    description: 'Kit com 3 formas redondas antiaderentes em tamanhos diferentes. Perfeitas para bolos, tortas e sobremesas. Fácil limpeza.',
    price: 79.90,
    image: 'https://images.unsplash.com/photo-1612293905904-d45b1e5d0960?w=600&q=80',
    category: 'utilidades',
    badge: 'Promoção',
  },
  {
    id: 'u4',
    name: 'Escorredor de Macarrão Premium',
    description: 'Escorredor em aço inox com design moderno e furos de alta precisão. Suporta até 5kg e possui alças de silicone antitérmicas.',
    price: 49.90,
    image: 'https://images.unsplash.com/photo-1601556126838-56939e7b43f0?w=600&q=80',
    category: 'utilidades',
  },
  {
    id: 'u5',
    name: 'Conjunto de Potes Herméticos 12 Peças',
    description: 'Potes de plástico BPA Free com tampa hermética. Mantêm os alimentos frescos por mais tempo. Vão à geladeira e ao freezer.',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1584990347165-6da57a4be47d?w=600&q=80',
    category: 'utilidades',
    badge: 'Novidade',
  },
  {
    id: 'u6',
    name: 'Tábua de Corte Bambu Orgânica',
    description: 'Tábua artesanal em bambu orgânico sustentável. Superfície resistente, não arranha as facas e possui sulco coletor de líquidos.',
    price: 59.90,
    image: 'https://images.unsplash.com/photo-1687863919689-2b6ef563ec54?w=600&q=80',
    category: 'utilidades',
  },

  // === DOCES ARTESANAIS ===
  {
    id: 'd1',
    name: 'Caixa de Brigadeiros Especiais (24 un)',
    description: 'Brigadeiros gourmet feitos com chocolate belga 70% cacau, cobertos com granulado crocante e confeitos especiais. Sabores variados.',
    price: 69.90,
    image: 'https://images.unsplash.com/photo-1701944579022-8d1e84bc56a7?w=600&q=80',
    category: 'doces',
    badge: 'Mais Vendido',
    featured: true,
  },
  {
    id: 'd2',
    name: 'Trufas de Chocolate Belga (12 un)',
    description: 'Trufas artesanais com ganache de chocolate belga premium, cobertura crocante e recheios especiais. Embalagem presenteável.',
    price: 59.90,
    image: 'https://images.unsplash.com/photo-1566565286951-f81c7ba5619d?w=600&q=80',
    category: 'doces',
    badge: 'Premium',
  },
  {
    id: 'd3',
    name: 'Cesta de Doces Sortidos Premium',
    description: 'Linda cesta com seleção especial de doces artesanais: brigadeiros, trufas, beijinhos e muito mais. Perfeita para presentes.',
    price: 119.90,
    image: 'https://images.unsplash.com/photo-1734009575299-476bc0e3bd71?w=600&q=80',
    category: 'doces',
    featured: true,
  },
  {
    id: 'd4',
    name: 'Kit Brigadeiro Gourmet Personalizado',
    description: 'Kit especial com brigadeiros gourmet em sabores personalizáveis. Embalagem exclusiva com laço e cartão. Ideal para eventos.',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1772985431762-fd6e5071e2ff?w=600&q=80',
    category: 'doces',
    badge: 'Personalizado',
  },
  {
    id: 'd5',
    name: 'Bombons Finos Sortidos (500g)',
    description: 'Seleção de bombons finos com recheios variados: amêndoa, avelã, frutas e coco. Feitos artesanalmente com ingredientes nobres.',
    price: 54.90,
    image: 'https://images.unsplash.com/photo-1767396867485-7e41ee6fec97?w=600&q=80',
    category: 'doces',
  },
  {
    id: 'd6',
    name: 'Bolo de Chocolate Artesanal (fatia)',
    description: 'Fatia generosa de bolo de chocolate com recheio de ganache e cobertura de trufa. Feito fresco diariamente com ingredientes selecionados.',
    price: 18.90,
    image: 'https://images.unsplash.com/photo-1512911455673-5b69a621b1a0?w=600&q=80',
    category: 'doces',
    badge: 'Promoção',
  },
];

export const featuredProducts = products.filter(p => p.featured);
export const utilidades = products.filter(p => p.category === 'utilidades');
export const doces = products.filter(p => p.category === 'doces');
