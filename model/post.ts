export type Post = {
  id: string;
  titulo: string;
  excerpt: string;
  slug: string;
  conteudo: string;
  imagemCapa: string;
  categoria: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
  likes: number;
};
