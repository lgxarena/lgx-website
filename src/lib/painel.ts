// Separado de config.ts porque também entra no código do painel que roda no navegador.
/**
 * Painel de edição (Keystatic) no modo GitHub: sempre no site publicado; no `pnpm dev` só com
 * `PUBLIC_PAINEL_GITHUB=sim` (sem isso ele grava direto nos arquivos do computador).
 */
export const MODO_PAINEL_GITHUB =
  import.meta.env.PROD || import.meta.env.PUBLIC_PAINEL_GITHUB === 'sim'
