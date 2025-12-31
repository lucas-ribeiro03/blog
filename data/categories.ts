export type Category = {
  nome: string;
  totalLikes: number;
  quantidadePosts: number;
};

export const categories: Category[] = [
  {
    nome: "Performance",
    totalLikes: 203,
    quantidadePosts: 12,
  },
  {
    nome: "Programação",
    totalLikes: 156,
    quantidadePosts: 18,
  },
  {
    nome: "Tecnologia",
    totalLikes: 124,
    quantidadePosts: 15,
  },
  {
    nome: "Design",
    totalLikes: 89,
    quantidadePosts: 10,
  },
];
