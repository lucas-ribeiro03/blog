export type Category = {
  nome: string;
  totalLikes: number;
  quantidadePosts: number;
  createdAt: Date;
  updatedAt: Date;
};

export const categories: Category[] = [
  {
    nome: "Performance",
    totalLikes: 203,
    quantidadePosts: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nome: "Programação",
    totalLikes: 156,
    quantidadePosts: 18,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nome: "Tecnologia",
    totalLikes: 124,
    quantidadePosts: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nome: "Design",
    totalLikes: 89,
    quantidadePosts: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
