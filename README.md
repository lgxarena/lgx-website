# LGX Arena — site

Site da [LGX Arena](https://lgxarena.com.br), feito em [Astro](https://astro.build) com Tailwind CSS.

> **Em migração.** A branch `dev` contém o novo site em Astro; a `main` ainda publica o site antigo (Next.js).
> O plano completo está na issue [#2](https://github.com/lgxarena/lgx-website/issues/2).

## Requisitos

- Node.js 22.12 ou mais novo
- pnpm 10 (`corepack enable`)

## Comandos

| Comando        | O que faz                                 |
| -------------- | ----------------------------------------- |
| `pnpm install` | Instala as dependências                   |
| `pnpm dev`     | Servidor local em `http://localhost:4321` |
| `pnpm build`   | Gera o site estático em `dist/`           |
| `pnpm preview` | Serve o `dist/` localmente                |
| `pnpm check`   | Verifica tipos e componentes Astro        |
| `pnpm lint`    | ESLint (inclui regras de acessibilidade)  |
| `pnpm format`  | Formata tudo com Prettier                 |

## Fluxo de trabalho

1. Crie uma branch a partir da `dev`: `feat/<número-da-issue>-<assunto>`.
2. Commits no padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/) (verificado pelo commitlint).
3. Abra o PR para a `dev`. O CI roda lint, Prettier, `astro check` e build.
4. Na virada (issue #25), a `dev` é mesclada na `main`.

Os hooks do Husky rodam o lint-staged no commit e `check` + `build` no push.

## Estrutura

```
public/          arquivos servidos como estão (imagens, favicon, robots.txt)
src/
  layouts/       layouts de página
  pages/         rotas (cada arquivo vira uma URL)
  styles/        CSS global e tokens do Tailwind
```
