# Golden Raspberry Awards

Frontend em [Next.js](https://nextjs.org) (App Router) para o desafio [Golden Raspberry Awards da outsera](https://challenge.outsera.tech/swagger-ui/index.html) . O projeto consome a API de filmes e exibe um **dashboard** com indicadores e uma **lista paginada** com filtros.

## Pré-requisitos

- [Node.js](https://nodejs.org) 20+
- [pnpm](https://pnpm.io/installation)

## Instalação

```bash
pnpm install
```

## Como rodar

### Desenvolvimento

Sobe o servidor com hot reload em [http://localhost:3000](http://localhost:3000):

```bash
pnpm dev
```

### Produção

Gera o build otimizado e inicia o servidor de produção:

```bash
pnpm build
pnpm start
```

### Qualidade de código

```bash
pnpm lint          # verifica com Biome
pnpm lint:fix      # corrige automaticamente
pnpm format        # formata arquivos
```

### Testes

Testes unitários com [Vitest](https://vitest.dev) e [React Testing Library](https://testing-library.com/docs/):

```bash
pnpm test          # modo watch (desenvolvimento)
pnpm test:run      # execução única (CI / validação local)
```

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Dashboard com painéis da API |
| `/list` | Lista de filmes com filtros e paginação |

## Arquitetura

O projeto usa **App Router** (`app/`), o modelo recomendado do Next.js para aplicações novas.

### Server Components assíncronos

A maior parte dos painéis do dashboard e a lista de filmes são **Server Components** que buscam dados com `async/await` diretamente no componente ou em funções chamadas por ele:

```tsx
export async function MultipleWinners() {
  const { years } = await getYearsWithMultipleWinners()
  return (/* renderiza a tabela */)
}
```

A página da lista recebe `searchParams` e repassa os filtros para `getMovies()` no servidor — a URL (`/list?page=0&year=1980&winner=true`) é a fonte da verdade.

### Cache do `fetch` no Next.js

As chamadas à API passam por `app/lib/api/api.ts`, que configura o cache nativo do Next para `fetch`:

```ts
fetch(url, {
  cache: tag ? "force-cache" : "no-store",
  next: tag ? { tags: [tag], revalidate } : undefined,
})
```

- **`tag` + `revalidate`**: respostas estáveis (ex.: anos com múltiplos vencedores) podem ser cacheadas por um tempo (`revalidate` em segundos) e invalidadas por tag quando necessário.
- **Sem tag** (ou lista com filtros dinâmicos): `no-store` — dados sempre frescos conforme os parâmetros da requisição.

Isso usa o [sistema de cache de Data Cache do Next.js](https://nextjs.org/docs/app/building-your-application/caching), integrado ao build e ao servidor, sem biblioteca extra de estado para dados remotos.

### `Suspense` e streaming

Cada bloco pesado do dashboard fica dentro de `<Suspense>` com um **skeleton** próprio. Enquanto um painel carrega, os outros podem aparecer — melhor percepção de performance do que uma tela em branco até tudo terminar.

### O que fica no cliente (e por quê)

Só o que exige interação no browser é `"use client"`:

- **Winners by year**: formulário com `useActionState` e Server Action.
- **Lista**: tabela (TanStack Table), filtros e paginação que atualizam a URL.
- **Sidebar / header**: navegação e layout interativo.

## Por que essa abordagem supera o modelo tradicional do React?

No padrão mais antigo — SPA ou páginas quase todas com `"use client"` — o fluxo de dados costuma ser:

1. Montar o componente.
2. `useEffect` dispara o fetch.
3. `useState` guarda loading / erro / dados.
4. Re-render quando a promise resolve.

Problemas comuns: flash de loading, race conditions, dependências do effect difíceis de acertar, código duplicado entre páginas e dados que não participam do cache do framework.

Com **Server Components + `fetch` cacheável**:

| Aspecto | Abordagem deste projeto |
|--------|-------------------------|
| Quando busca | No servidor, antes de enviar HTML |
| Loading | `Suspense` + skeleton (declarativo) |
| Cache | Configurado no `fetch` (`revalidate`, `tags`) |
| Filtros da lista | `searchParams` → novo render no servidor |
| Interatividade pontual | Client apenas onde necessário (formulário, tabela) |

O ganho principal é **menos estado e menos efeitos colaterais no cliente**: o carregamento inicial acontece no servidor, com cache explícito e loading declarativo via `Suspense`. `useEffect` ainda faz sentido para integrações no browser (eventos, APIs nativas), mas deixa de ser o centro da arquitetura de dados da aplicação.

### Implementação e critérios do desafio

Este repositório seguiu a orientação de **não utilizar inteligência artificial** para análise de requisitos e geração de código. A proposta do teste era avaliar competências reais do candidato — leitura da API, decisões de arquitetura, organização do projeto e domínio de React/Next.js — e não a capacidade de montar uma solução a partir de prompts.

Por isso, escolhas como App Router, camada `lib/api` espelhando os endpoints do Swagger, componentes por domínio (`multipleWinners`, `moviesList`, etc.), cache com `tag`/`revalidate`, `Suspense` com skeletons e testes com Vitest/Testing Library foram feitas de forma consciente, para deixar explícitos **pensamento de software** e **habilidade técnica**, além do uso de bibliotecas (shadcn/ui, TanStack Table).

## Estrutura principal

```
app/
  page.tsx              # Dashboard
  list/                 # Página de lista
  components/           # Painéis do dashboard
  lib/api/              # Cliente HTTP e funções por endpoint
components/ui/          # Componentes shadcn/ui
```

## API externa

Base: `https://challenge.outsera.tech/api/movies`

Documentação: [Swagger UI](https://challenge.outsera.tech/swagger-ui/index.html)
