import { drizzleDb } from ".";
import { posts } from "../data/posts";
import { categoriesTable, postsTable } from "./schemas";
import { postRepository } from "@/repositories/post";
import { userRepository } from "@/repositories/users";
import { users } from "@/data/users";
import { v4 } from "uuid";
(async () => {
  // const postsToInsert = posts.map((post) => {
  //   return {
  //     ...post,
  //     createdAt: new Date(post.createdAt),
  //     updatedAt: new Date(post.updatedAt),
  //   };
  // });
  // const insertPosts = await drizzleDb.insert(postsTable).values(postsToInsert);
  // console.log(insertPosts);
  //   const insertPosts = await drizzleDb.insert(postsTable).values(posts);
  //   console.log(insertPosts);

  const postsToInsert = [
    {
      id: v4(),
      title: "Dominando React Hooks",
      slug: "dominando-react-hooks",
      excerpt:
        "Um guia completo sobre dominando react hooks para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Dominando React Hooks. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/657/800/400",
      categoryId: "f7464aa3-55d2-44b8-bf04-ff3ade7d7d0d",
      authorId: "2b0bb833-e3d5-4039-a166-a483c0abe565",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Guia de Clean Code",
      slug: "guia-de-clean-code",
      excerpt:
        "Um guia completo sobre guia de clean code para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Guia de Clean Code. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/251/800/400",
      categoryId: "2f721914-7fdf-4114-a637-abc8fbdbfcb7",
      authorId: "79935040-9cf1-465e-8363-b3c4f2ce2432",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Futuro da IA em 2026",
      slug: "futuro-da-ia-em-2026",
      excerpt:
        "Um guia completo sobre futuro da ia em 2026 para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Futuro da IA em 2026. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/299/800/400",
      categoryId: "22f478ca-68cf-40e6-ae2c-caf21db2be93",
      authorId: "79935040-9cf1-465e-8363-b3c4f2ce2432",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Segurança em APIs REST",
      slug: "segurança-em-apis-rest",
      excerpt:
        "Um guia completo sobre segurança em apis rest para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Segurança em APIs REST. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/77/800/400",
      categoryId: "db60a3b9-b601-4fce-a0b7-bb57d9db3e93",
      authorId: "79935040-9cf1-465e-8363-b3c4f2ce2432",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Docker para Iniciantes",
      slug: "docker-para-iniciantes",
      excerpt:
        "Um guia completo sobre docker para iniciantes para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Docker para Iniciantes. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/36/800/400",
      categoryId: "6c1783b0-7164-4c8b-94a0-692acc9d79fd",
      authorId: "79935040-9cf1-465e-8363-b3c4f2ce2432",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Kubernetes em Produção",
      slug: "kubernetes-em-produção",
      excerpt:
        "Um guia completo sobre kubernetes em produção para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Kubernetes em Produção. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/651/800/400",
      categoryId: "062a24b7-3896-41ab-8ffb-251a710e9998",
      authorId: "d4f0c665-6d55-4756-aca1-9165c0d0550e",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Otimização de Performance Web",
      slug: "otimização-de-performance-web",
      excerpt:
        "Um guia completo sobre otimização de performance web para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Otimização de Performance Web. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/284/800/400",
      categoryId: "6c1783b0-7164-4c8b-94a0-692acc9d79fd",
      authorId: "79935040-9cf1-465e-8363-b3c4f2ce2432",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Design Systems Escaláveis",
      slug: "design-systems-escaláveis",
      excerpt:
        "Um guia completo sobre design systems escaláveis para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Design Systems Escaláveis. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/756/800/400",
      categoryId: "062a24b7-3896-41ab-8ffb-251a710e9998",
      authorId: "d4f0c665-6d55-4756-aca1-9165c0d0550e",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Acessibilidade na Web",
      slug: "acessibilidade-na-web",
      excerpt:
        "Um guia completo sobre acessibilidade na web para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Acessibilidade na Web. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/488/800/400",
      categoryId: "68f39e25-027f-46cb-8646-61f3e8101c28",
      authorId: "2b0bb833-e3d5-4039-a166-a483c0abe565",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Node.js vs Go",
      slug: "nodejs-vs-go",
      excerpt:
        "Um guia completo sobre node.js vs go para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Node.js vs Go. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/231/800/400",
      categoryId: "839f1ccf-e7d8-467b-b6b6-b61134fd4a77",
      authorId: "d4f0c665-6d55-4756-aca1-9165c0d0550e",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Arquitetura de Microserviços",
      slug: "arquitetura-de-microserviços",
      excerpt:
        "Um guia completo sobre arquitetura de microserviços para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Arquitetura de Microserviços. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/6/800/400",
      categoryId: "6c1783b0-7164-4c8b-94a0-692acc9d79fd",
      authorId: "2b0bb833-e3d5-4039-a166-a483c0abe565",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Testes Automatizados com Jest",
      slug: "testes-automatizados-com-jest",
      excerpt:
        "Um guia completo sobre testes automatizados com jest para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Testes Automatizados com Jest. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/982/800/400",
      categoryId: "597d2c3f-505c-4850-86b0-c05bfc7c7730",
      authorId: "2b0bb833-e3d5-4039-a166-a483c0abe565",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "TypeScript Avançado",
      slug: "typescript-avançado",
      excerpt:
        "Um guia completo sobre typescript avançado para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema TypeScript Avançado. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/160/800/400",
      categoryId: "68f39e25-027f-46cb-8646-61f3e8101c28",
      authorId: "2b0bb833-e3d5-4039-a166-a483c0abe565",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "CSS Grid e Flexbox",
      slug: "css-grid-e-flexbox",
      excerpt:
        "Um guia completo sobre css grid e flexbox para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema CSS Grid e Flexbox. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/225/800/400",
      categoryId: "22f478ca-68cf-40e6-ae2c-caf21db2be93",
      authorId: "2b0bb833-e3d5-4039-a166-a483c0abe565",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "GraphQL na Prática",
      slug: "graphql-na-prática",
      excerpt:
        "Um guia completo sobre graphql na prática para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema GraphQL na Prática. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/386/800/400",
      categoryId: "062a24b7-3896-41ab-8ffb-251a710e9998",
      authorId: "79935040-9cf1-465e-8363-b3c4f2ce2432",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Serverless Computing",
      slug: "serverless-computing",
      excerpt:
        "Um guia completo sobre serverless computing para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Serverless Computing. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/732/800/400",
      categoryId: "2f721914-7fdf-4114-a637-abc8fbdbfcb7",
      authorId: "79935040-9cf1-465e-8363-b3c4f2ce2432",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Monitoramento com Prometheus",
      slug: "monitoramento-com-prometheus",
      excerpt:
        "Um guia completo sobre monitoramento com prometheus para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Monitoramento com Prometheus. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/866/800/400",
      categoryId: "cde0831c-56e5-468b-8937-dc8f6d88c544",
      authorId: "d4f0c665-6d55-4756-aca1-9165c0d0550e",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Estratégias de SEO",
      slug: "estratégias-de-seo",
      excerpt:
        "Um guia completo sobre estratégias de seo para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Estratégias de SEO. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/999/800/400",
      categoryId: "bf6c26a4-02e5-422f-9ec3-a0b3dc184185",
      authorId: "2b0bb833-e3d5-4039-a166-a483c0abe565",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "UX Writing",
      slug: "ux-writing",
      excerpt:
        "Um guia completo sobre ux writing para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema UX Writing. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/888/800/400",
      categoryId: "f7464aa3-55d2-44b8-bf04-ff3ade7d7d0d",
      authorId: "d4f0c665-6d55-4756-aca1-9165c0d0550e",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Metodologias Ágeis",
      slug: "metodologias-ágeis",
      excerpt:
        "Um guia completo sobre metodologias ágeis para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Metodologias Ágeis. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/936/800/400",
      categoryId: "2f721914-7fdf-4114-a637-abc8fbdbfcb7",
      authorId: "d4f0c665-6d55-4756-aca1-9165c0d0550e",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Carreira em Tecnologia",
      slug: "carreira-em-tecnologia",
      excerpt:
        "Um guia completo sobre carreira em tecnologia para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Carreira em Tecnologia. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/390/800/400",
      categoryId: "597d2c3f-505c-4850-86b0-c05bfc7c7730",
      authorId: "d4f0c665-6d55-4756-aca1-9165c0d0550e",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Soft Skills para Devs",
      slug: "soft-skills-para-devs",
      excerpt:
        "Um guia completo sobre soft skills para devs para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Soft Skills para Devs. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/364/800/400",
      categoryId: "3cd5f682-8e4c-4140-be25-e903190eeba5",
      authorId: "79935040-9cf1-465e-8363-b3c4f2ce2432",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Machine Learning com Python",
      slug: "machine-learning-com-python",
      excerpt:
        "Um guia completo sobre machine learning com python para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Machine Learning com Python. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/222/800/400",
      categoryId: "db60a3b9-b601-4fce-a0b7-bb57d9db3e93",
      authorId: "79935040-9cf1-465e-8363-b3c4f2ce2432",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Big Data e Analytics",
      slug: "big-data-e-analytics",
      excerpt:
        "Um guia completo sobre big data e analytics para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Big Data e Analytics. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/3/800/400",
      categoryId: "6c1783b0-7164-4c8b-94a0-692acc9d79fd",
      authorId: "79935040-9cf1-465e-8363-b3c4f2ce2432",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Desenvolvimento iOS com Swift",
      slug: "desenvolvimento-ios-com-swift",
      excerpt:
        "Um guia completo sobre desenvolvimento ios com swift para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Desenvolvimento iOS com Swift. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/9/800/400",
      categoryId: "6c1783b0-7164-4c8b-94a0-692acc9d79fd",
      authorId: "2b0bb833-e3d5-4039-a166-a483c0abe565",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Android com Kotlin",
      slug: "android-com-kotlin",
      excerpt:
        "Um guia completo sobre android com kotlin para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Android com Kotlin. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/723/800/400",
      categoryId: "597d2c3f-505c-4850-86b0-c05bfc7c7730",
      authorId: "2b0bb833-e3d5-4039-a166-a483c0abe565",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Flutter vs React Native",
      slug: "flutter-vs-react-native",
      excerpt:
        "Um guia completo sobre flutter vs react native para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Flutter vs React Native. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/659/800/400",
      categoryId: "68f39e25-027f-46cb-8646-61f3e8101c28",
      authorId: "d4f0c665-6d55-4756-aca1-9165c0d0550e",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Web3 e Blockchain",
      slug: "web3-e-blockchain",
      excerpt:
        "Um guia completo sobre web3 e blockchain para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Web3 e Blockchain. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/262/800/400",
      categoryId: "d19f1942-3bce-47ba-9dc3-1caf206ae745",
      authorId: "79935040-9cf1-465e-8363-b3c4f2ce2432",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Cibersegurança Pessoal",
      slug: "cibersegurança-pessoal",
      excerpt:
        "Um guia completo sobre cibersegurança pessoal para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Cibersegurança Pessoal. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/618/800/400",
      categoryId: "839f1ccf-e7d8-467b-b6b6-b61134fd4a77",
      authorId: "2b0bb833-e3d5-4039-a166-a483c0abe565",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Gestão de Times Remotos",
      slug: "gestão-de-times-remotos",
      excerpt:
        "Um guia completo sobre gestão de times remotos para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Gestão de Times Remotos. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/836/800/400",
      categoryId: "d19f1942-3bce-47ba-9dc3-1caf206ae745",
      authorId: "2b0bb833-e3d5-4039-a166-a483c0abe565",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Product Management",
      slug: "product-management",
      excerpt:
        "Um guia completo sobre product management para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Product Management. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/41/800/400",
      categoryId: "d19f1942-3bce-47ba-9dc3-1caf206ae745",
      authorId: "79935040-9cf1-465e-8363-b3c4f2ce2432",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Design Thinking",
      slug: "design-thinking",
      excerpt:
        "Um guia completo sobre design thinking para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Design Thinking. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/635/800/400",
      categoryId: "f7464aa3-55d2-44b8-bf04-ff3ade7d7d0d",
      authorId: "79935040-9cf1-465e-8363-b3c4f2ce2432",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Figma para Desenvolvedores",
      slug: "figma-para-desenvolvedores",
      excerpt:
        "Um guia completo sobre figma para desenvolvedores para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Figma para Desenvolvedores. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/665/800/400",
      categoryId: "424f8079-86e7-415b-9a78-c395fcb9ba90",
      authorId: "d4f0c665-6d55-4756-aca1-9165c0d0550e",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "PostgreSQL Performance",
      slug: "postgresql-performance",
      excerpt:
        "Um guia completo sobre postgresql performance para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema PostgreSQL Performance. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/542/800/400",
      categoryId: "bf6c26a4-02e5-422f-9ec3-a0b3dc184185",
      authorId: "d4f0c665-6d55-4756-aca1-9165c0d0550e",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Redis como Cache",
      slug: "redis-como-cache",
      excerpt:
        "Um guia completo sobre redis como cache para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Redis como Cache. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/10/800/400",
      categoryId: "d19f1942-3bce-47ba-9dc3-1caf206ae745",
      authorId: "2b0bb833-e3d5-4039-a166-a483c0abe565",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Mensageria com RabbitMQ",
      slug: "mensageria-com-rabbitmq",
      excerpt:
        "Um guia completo sobre mensageria com rabbitmq para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Mensageria com RabbitMQ. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/250/800/400",
      categoryId: "bf6c26a4-02e5-422f-9ec3-a0b3dc184185",
      authorId: "d4f0c665-6d55-4756-aca1-9165c0d0550e",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Kafka para Eventos",
      slug: "kafka-para-eventos",
      excerpt:
        "Um guia completo sobre kafka para eventos para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Kafka para Eventos. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/321/800/400",
      categoryId: "22f478ca-68cf-40e6-ae2c-caf21db2be93",
      authorId: "2b0bb833-e3d5-4039-a166-a483c0abe565",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Rust para Sistemas",
      slug: "rust-para-sistemas",
      excerpt:
        "Um guia completo sobre rust para sistemas para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Rust para Sistemas. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/404/800/400",
      categoryId: "839f1ccf-e7d8-467b-b6b6-b61134fd4a77",
      authorId: "d4f0c665-6d55-4756-aca1-9165c0d0550e",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Elixir e Phoenix",
      slug: "elixir-e-phoenix",
      excerpt:
        "Um guia completo sobre elixir e phoenix para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Elixir e Phoenix. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/469/800/400",
      categoryId: "6c1783b0-7164-4c8b-94a0-692acc9d79fd",
      authorId: "2b0bb833-e3d5-4039-a166-a483c0abe565",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Vue.js 3 Composition API",
      slug: "vuejs-3-composition-api",
      excerpt:
        "Um guia completo sobre vue.js 3 composition api para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Vue.js 3 Composition API. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/961/800/400",
      categoryId: "6c1783b0-7164-4c8b-94a0-692acc9d79fd",
      authorId: "d4f0c665-6d55-4756-aca1-9165c0d0550e",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Next.js 14 App Router",
      slug: "nextjs-14-app-router",
      excerpt:
        "Um guia completo sobre next.js 14 app router para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Next.js 14 App Router. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/980/800/400",
      categoryId: "3cd5f682-8e4c-4140-be25-e903190eeba5",
      authorId: "2b0bb833-e3d5-4039-a166-a483c0abe565",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "SvelteKit Guia",
      slug: "sveltekit-guia",
      excerpt:
        "Um guia completo sobre sveltekit guia para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema SvelteKit Guia. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/664/800/400",
      categoryId: "cde0831c-56e5-468b-8937-dc8f6d88c544",
      authorId: "2b0bb833-e3d5-4039-a166-a483c0abe565",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Tailwind CSS Dicas",
      slug: "tailwind-css-dicas",
      excerpt:
        "Um guia completo sobre tailwind css dicas para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Tailwind CSS Dicas. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/27/800/400",
      categoryId: "3cd5f682-8e4c-4140-be25-e903190eeba5",
      authorId: "79935040-9cf1-465e-8363-b3c4f2ce2432",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Storybook para Componentes",
      slug: "storybook-para-componentes",
      excerpt:
        "Um guia completo sobre storybook para componentes para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Storybook para Componentes. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/325/800/400",
      categoryId: "22f478ca-68cf-40e6-ae2c-caf21db2be93",
      authorId: "79935040-9cf1-465e-8363-b3c4f2ce2432",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "CI/CD com GitHub Actions",
      slug: "ci-cd-com-github-actions",
      excerpt:
        "Um guia completo sobre ci/cd com github actions para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema CI/CD com GitHub Actions. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/79/800/400",
      categoryId: "f7464aa3-55d2-44b8-bf04-ff3ade7d7d0d",
      authorId: "79935040-9cf1-465e-8363-b3c4f2ce2432",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Terraform Infrastructure as Code",
      slug: "terraform-infrastructure-as-code",
      excerpt:
        "Um guia completo sobre terraform infrastructure as code para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Terraform Infrastructure as Code. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/628/800/400",
      categoryId: "f7464aa3-55d2-44b8-bf04-ff3ade7d7d0d",
      authorId: "d4f0c665-6d55-4756-aca1-9165c0d0550e",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Cloud Native Apps",
      slug: "cloud-native-apps",
      excerpt:
        "Um guia completo sobre cloud native apps para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Cloud Native Apps. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/861/800/400",
      categoryId: "d19f1942-3bce-47ba-9dc3-1caf206ae745",
      authorId: "79935040-9cf1-465e-8363-b3c4f2ce2432",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Edge Computing",
      slug: "edge-computing",
      excerpt:
        "Um guia completo sobre edge computing para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Edge Computing. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/339/800/400",
      categoryId: "2f721914-7fdf-4114-a637-abc8fbdbfcb7",
      authorId: "d4f0c665-6d55-4756-aca1-9165c0d0550e",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Realidade Aumentada na Web",
      slug: "realidade-aumentada-na-web",
      excerpt:
        "Um guia completo sobre realidade aumentada na web para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Realidade Aumentada na Web. Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/666/800/400",
      categoryId: "3e8ab8de-4e5b-4388-9175-ecb341409b6f",
      authorId: "79935040-9cf1-465e-8363-b3c4f2ce2432",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: v4(),
      title: "Internet das Coisas (IoT)",
      slug: "internet-das-coisas-(iot)",
      excerpt:
        "Um guia completo sobre internet das coisas (iot) para elevar o nível dos seus projetos e conhecimentos técnicos.",
      content:
        "Neste artigo, exploramos profundamente o tema Internet das Coisas (IoT). Discutimos as melhores práticas, ferramentas essenciais e como implementar soluções eficientes no dia a dia do desenvolvimento moderno. O foco é fornecer insights práticos e teóricos para profissionais de tecnologia.",
      coverImage: "https://picsum.photos/seed/234/800/400",
      categoryId: "68f39e25-027f-46cb-8646-61f3e8101c28",
      authorId: "79935040-9cf1-465e-8363-b3c4f2ce2432",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await drizzleDb.insert(postsTable).values(postsToInsert);
  // const insertCategories = await drizzleDb
  //   .insert(categoriesTable)
  //   .values(categories);
  // console.log(insertCategories);

  // const insertUsers = users.map(async (user) => {
  //   await userRepository.createUser(
  //     user.name,
  //     user.lastName,
  //     user.username,
  //     user.password,
  //   );
  // });
})();
