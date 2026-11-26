# LGX Arena — site

Site da [LGX Arena](https://lgxarena.com.br), feito em [Astro](https://astro.build) com Tailwind CSS.

Hospedado no [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) (Worker `lgx-website`):
a branch `main` publica o site oficial e cada outra branch ou PR ganha um preview próprio.

## Requisitos

- Node.js 22.12 ou mais novo
- pnpm 10 (`corepack enable`)

## Comandos

| Comando           | O que faz                                 |
| ----------------- | ----------------------------------------- |
| `pnpm install`    | Instala as dependências                   |
| `pnpm dev`        | Servidor local em `http://localhost:4321` |
| `pnpm build`      | Gera o site estático em `dist/`           |
| `pnpm preview`    | Serve o `dist/` localmente                |
| `pnpm check`      | Verifica tipos e componentes Astro        |
| `pnpm lint`       | ESLint (inclui regras de acessibilidade)  |
| `pnpm format`     | Formata tudo com Prettier                 |
| `pnpm icones`     | Gera favicon e ícones a partir do X       |
| `pnpm lighthouse` | Mede Performance, Acessibilidade e SEO    |

## Fluxo de trabalho

1. Crie uma branch a partir da `dev`: `feat/<número-da-issue>-<assunto>`.
2. Commits no padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/) (verificado pelo commitlint).
3. Abra o PR para a `dev`. O CI roda lint, Prettier, `astro check`, build e Lighthouse; a Cloudflare gera o preview.
4. Para publicar no site oficial, abra um PR da `dev` para a `main`.

Os hooks do Husky rodam o lint-staged no commit e `check` + `build` no push.

## Estrutura

```
public/          arquivos servidos como estão (ícones, _headers, _redirects)
src/
  components/    componentes por área (layout, ui, inicio, eventos…)
  content/       conteúdo editável (jogos, preços, horários, FAQ, regras…)
  layouts/       layouts de página
  lib/           dados do site, SEO, cookies, formatação
  pages/         rotas (cada arquivo vira uma URL)
  styles/        CSS global e tokens do Tailwind
```
