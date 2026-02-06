# 📝 Blog Pessoal

Este repositório contém o código-fonte de um blog pessoal completo, desenvolvido com as mais recentes tecnologias web. O projeto oferece uma plataforma robusta para criação e gerenciamento de conteúdo, com foco em performance, experiência do usuário e escalabilidade.

## ✨ Funcionalidades

O blog pessoal inclui as seguintes funcionalidades:

*   🔐 **Autenticação de Usuários:** Sistema completo de login, registro e gerenciamento de sessões, garantindo a segurança e personalização da experiência do usuário.
*   ✍️ **Gerenciamento de Posts:** Interface intuitiva para criar, editar, visualizar e excluir posts. Suporte a conteúdo em Markdown para formatação rica e flexível.
*   👍 **Sistema de Likes:** Usuários podem interagir com os posts através de um sistema de "curtidas", promovendo engajamento.
*   📧 **Newsletter:** Funcionalidade de inscrição para newsletter, permitindo que os usuários recebam atualizações por e-mail sempre que um novo post for publicado.
*   👤 **Gerenciamento de Perfil:** Usuários podem editar suas informações de perfil e gerenciar suas contas.
*   🗂️ **Categorias de Posts:** Organização de posts por categorias, facilitando a navegação e descoberta de conteúdo relevante.
*   🔍 **Barra de Pesquisa:** Ferramenta de busca integrada para encontrar posts rapidamente por palavras-chave.
*   ⚙️ **Painel Administrativo:** Componentes e funcionalidades para administração do blog, como gerenciamento de posts e usuários (detalhes específicos podem ser expandidos conforme a implementação).
*   📄 **Renderização de Markdown:** Conteúdo dos posts é renderizado a partir de Markdown, oferecendo flexibilidade na criação de artigos.
*   🔗 **Geração de Slugs Amigáveis:** URLs amigáveis e otimizadas para SEO são geradas automaticamente para cada post.

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando uma stack moderna e eficiente:

*   ⚛️ **Next.js:** Framework React para desenvolvimento de aplicações web com renderização do lado do servidor (SSR) e geração de sites estáticos (SSG), proporcionando alta performance e SEO.
*   🟦 **TypeScript:** Superconjunto tipado de JavaScript que melhora a manutenibilidade e a detecção de erros em tempo de desenvolvimento.
*   💧 **Drizzle ORM:** Um ORM moderno e leve para TypeScript, utilizado para interagir com o banco de dados de forma segura e eficiente.
*   🗄️ **SQLite:** Banco de dados relacional leve e serverless, ideal para projetos que necessitam de um banco de dados local ou de fácil implantação.
*   💨 **Tailwind CSS:** Framework CSS utilitário que permite a construção rápida de interfaces de usuário personalizadas e responsivas.
*   ✉️ **Nodemailer:** Módulo para Node.js que facilita o envio de e-mails, utilizado para a funcionalidade de newsletter.
*   🔑 **NextAuth.js (ou similar):** Para autenticação e gerenciamento de sessões de usuários, garantindo um fluxo de autenticação seguro e flexível.
*   🛡️ **Zod:** Biblioteca de validação de esquemas TypeScript-first, utilizada para garantir a integridade dos dados.
*   📝 **React Hook Form:** Biblioteca para gerenciamento de formulários no React, simplificando a criação e validação de formulários complexos.
*   🔒 **Jose (JSON Web Encryption and Signing):** Biblioteca para manipulação de JSON Web Tokens (JWT), utilizada para segurança e autenticação.

## 📂 Estrutura do Projeto

A estrutura do repositório é organizada da seguinte forma:

*   `actions/`: 🛠️ Lógica de negócios para autenticação, likes, posts e usuários.
*   `app/`: 🌐 Páginas e rotas da aplicação Next.js.
*   `components/`: 🧩 Componentes React reutilizáveis, incluindo formulários, elementos de UI, navegação, etc.
*   `data/`: 📊 Dados de exemplo e seeds para o banco de dados.
*   `db/`: 🗄️ Definições de esquemas do banco de dados e configurações do Drizzle ORM.
*   `hooks/`: 🎣 Hooks React personalizados para lógica reutilizável.
*   `lib/`: 📚 Funções utilitárias e de suporte geral.
*   `model/`: 🧠 Definições de modelos de dados (e.g., autor, categoria).
*   `public/`: 🖼️ Arquivos estáticos como imagens, ícones e assets.
*   `repositories/`: 📦 Camada de acesso a dados para interagir com o banco de dados (likes, posts, usuários).
*   `utils/`: 💡 Funções utilitárias diversas, como gerenciamento de login, gerador de slug e validações.

## 💻 Como Rodar o Projeto Localmente

Para configurar e rodar o projeto em sua máquina local, siga os passos abaixo:

1.  **Clone o repositório:** ⬇️
    ```bash
    git clone https://github.com/lucas-ribeiro03/blog.git
    cd blog
    ```

2.  **Instale as dependências:** 📦
    ```bash
    npm install
    # ou yarn install
    # ou pnpm install
    # ou bun install
    ```

3.  **Configure as variáveis de ambiente:** ⚙️
    Crie um arquivo `.env.local` na raiz do projeto e adicione as variáveis de ambiente necessárias (e.g., chaves de API, configurações de banco de dados, segredos JWT).

4.  **Execute as migrações do banco de dados:** 🔄
    ```bash
    npx drizzle-kit push:sqlite
    ```

5.  **Inicie o servidor de desenvolvimento:** 🚀
    ```bash
    npm run dev
    # ou yarn dev
    # ou pnpm dev
    # ou bun dev
    ```

6.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado. 🌐

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorias, correções de bugs ou novas funcionalidades.

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Lucas Ribeiro
[GitHub](https://github.com/lucas-ribeiro03)
[LinkedIn](https://www.linkedin.com/in/lucasribeirodevfrontend/)
