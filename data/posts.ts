import { Post } from "@/model/post";

export const posts: Post[] = [
  {
    id: "1",
    title: "Introdução ao Next.js 15: Novidades e Melhorias",
    slug: "introducao-ao-nextjs-15-novidades-e-melhorias",
    excerpt:
      "Descubra as principais novidades do Next.js 15, incluindo melhorias de performance, novas APIs e recursos que tornam o desenvolvimento ainda mais eficiente.",
    content:
      "O Next.js 15 trouxe diversas melhorias significativas para a comunidade de desenvolvedores React. Neste artigo, vamos explorar as principais novidades, incluindo melhorias de performance, novas APIs e recursos que tornam o desenvolvimento ainda mais eficiente. Vamos mergulhar em detalhes sobre Server Components, Streaming SSR e muito mais.",
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    category: "Tecnologia",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    likes: 124,
  },
  {
    id: "2",
    title: "Design System com Tailwind CSS e shadcn/ui",
    slug: "design-system-com-tailwind-css-e-shadcn-ui",
    excerpt:
      "Aprenda a criar um design system robusto utilizando Tailwind CSS e shadcn/ui, criando componentes reutilizáveis e consistentes para suas aplicações.",
    content:
      "Criar um design system consistente é fundamental para o sucesso de qualquer projeto. Neste guia completo, vamos explorar como utilizar Tailwind CSS em conjunto com shadcn/ui para criar componentes reutilizáveis, acessíveis e visualmente atraentes. Vamos cobrir desde a configuração inicial até a criação de componentes complexos.",
    coverImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
    category: "Design",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-12",
    likes: 89,
  },
  {
    id: "3",
    title: "TypeScript Avançado: Tipos Condicionais e Utility Types",
    slug: "typescript-avancado-tipos-condicionais-e-utility-types",
    excerpt:
      "Explore os recursos avançados do TypeScript, incluindo tipos condicionais, mapped types e utility types que podem elevar sua produtividade como desenvolvedor.",
    content:
      "TypeScript oferece recursos poderosos que vão muito além dos tipos básicos. Neste artigo avançado, vamos mergulhar em tipos condicionais, mapped types, template literal types e utility types. Esses recursos permitem criar tipos complexos e seguros que se adaptam dinamicamente às suas necessidades.",
    coverImage:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    category: "Programação",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-08",
    likes: 156,
  },
  {
    id: "4",
    title: "Performance Web: Otimizações e Boas Práticas",
    slug: "performance-web-otimizacoes-e-boas-praticas",
    excerpt:
      "Descubra técnicas avançadas de otimização web para melhorar o desempenho de suas aplicações, incluindo lazy loading, code splitting e otimização de imagens.",
    content:
      "Performance é um dos fatores mais importantes para o sucesso de uma aplicação web. Neste guia completo, vamos explorar técnicas avançadas de otimização, incluindo lazy loading de componentes, code splitting, otimização de imagens, caching strategies e muito mais. Aprenda a identificar gargalos de performance e como resolvê-los efetivamente.",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "Performance",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-03",
    likes: 203,
  },
];
