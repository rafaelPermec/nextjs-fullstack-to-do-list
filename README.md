<h1 align="center">Boas vindas ao repositório do projeto de ParaTo-Do's!</h1>
<h3 align="center">Visite o projeto em seu estado atual em: https://paratodos.vercel.app/</h3>
</br>

## Técnologias usadas

<div align="center">

<h3 align="center">Quality Control:</h3>

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/summary/new_code?id=rafaelPermec_nextjs-fullstack-to-do-list)

<h3 align="center">Databases, Backend e Frontend:</h3>

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)
![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

<h3 align="center">Deploy:</h3>

![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

</div>

## Habilidades

Nesse projeto, fui capaz de desenvolver uma aplicação fullstack simples, porém robusta com:
- Diversas etapas de Error Boundaries (utiizando respostas validadas em Backend em Toasts no Frontend).
- Arquitetura backend em MVC com Middlewares de validações.
- Deploy de banco de dados PostgreSQL com abstração em ORM Prisma em Supabase.
- Autenticação e handshakes de autenticação dinamicos, dentro de API prórpria, com JWT e particularidades Server Side do NextJS.
- Armazenamento de informações em Cookies e criação de Sessões de Controle de Usuário.
- Frontend componentizado, estilizado em ChakraUI e responsivo.
- Aplicações de conhecimento em OOP e SOLID, como principio de Single Responsabity e OCP em Classes do Backend e principos de Liskov na criação de Middlewares.
- Funções padrões de frontend, como estado de formulários, validador de senhas, aplicação em tela cheia, dark mode e light mode. 
- Desenvolvimento de diversas Design Patterns, como Factories e Observers para manipulçao de objetos, seus eventos e seus estados.
- Testes E2E em padrão TDD dentro do Cypress.

---

## Rodando o Projeto:
<details>
  <summary>
    <code> Browser / URL </code>
  </summary>
  
---

### Acesse o [Link](https://para-to-dos-rafaelpermec.vercel.app/):

````bash
https://para-to-dos-rafaelpermec.vercel.app
````

---

</details>

<details>
  <summary>
    <code> Localmente </code>
  </summary>
  
  ---
  
### Dê o fork no projeto e clone-o para sua maquina digitando o comando em seu terminal:
  
  ````bash
  git clone git@github.com:rafaelPermec/nextjs-fullstack-to-do-list.git
  ````
  
### Entre com o comando em seu terminal, para entrar no diretório principal e instalar as dependências do projeto:
  ````bash
  cd nextjs-fullstack-to-do-list && npm install
  ````

### Faça um arquivo `.env` com suas credenciais, como no exemplo:

  ````bash
  DATABASE_URL=string
  NODE_ENV=development
  TOKEN_SECRET=string
  ````
> `DATABASE_TOKEN` é a hash ou URL para subir o banco de dados no local desejado.
    
### Digite um dos comandos abaixo em seu terminal e vá até http://localhost:3000!

  ````bash
  npm run start
  
  || ou ||
  
  npm run dev
  ````
---

</details>
<details>
  <summary>
    <code> Cenário de Testes </code>
  </summary>
  
### ESLint
Para garantir a qualidade do código, utilizei neste projeto os linters `ESLint` nos padrões do NextJS.
Assim o código estará alinhado com as boas práticas de desenvolvimento, sendo mais legível
e de fácil manutenção! Para rodá-lo localmente no projeto, execute o comando abaixo:

```bash
  npm run lint
```

---

### Cypress
Cypress é uma ferramenta de teste de front-end desenvolvida para a web.
Você pode rodar o cypress localmente para verificar se seus requisitos estão passando, para isso execute um dos seguintes comandos:
Para executar os testes apenas no terminal:

```bash
npm run test
```

***ou***

```bash
npx cypress run
```

Para executar os testes e vê-los rodando em uma janela de navegador:

```bash
npm run cy:open
```

***ou***
```bash
npx cypress open
```

Após executar um dos dois comandos acima, será aberta uma janela de navegador e então basta clicar no nome do arquivo de teste que quiser executar (project.spec.js), ou para executar todos os testes clique em Run all specs

---

</details>
