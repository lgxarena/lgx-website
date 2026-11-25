/**
 * Texto da imagem de compartilhamento (Open Graph) de cada página, gerada no build em
 * `/og/<pagina>.png`. A chave é o caminho sem a barra ("" é a página inicial).
 */
export const PAGINAS_OG: Record<string, { titulo: string; texto: string }> = {
  inicio: {
    titulo: 'Centro de games e e-sports em São Paulo',
    texto: 'Salas Pro e VIP, 40 PCs, internet de 2 Gbps e Corujão de madrugada.',
  },
  precos: {
    titulo: 'Preços',
    texto: 'Horas avulsas a partir de R$ 7 e pacotes nas salas Pro e VIP.',
  },
  corujao: { titulo: 'Corujão', texto: 'A madrugada inteira de jogo, das 22h às 6h.' },
  espaco: {
    titulo: 'O Espaço',
    texto: 'Salas Pro e VIP, sala de stream e lanchonete na Av. Cupecê.',
  },
  jogos: { titulo: 'Jogos', texto: 'Os jogos instalados em todos os PCs. Não achou o seu? Peça.' },
  aniversarios: {
    titulo: 'Aniversários',
    texto: 'PCs reservados para a galera e buffet completo.',
  },
  campeonatos: { titulo: 'Campeonatos', texto: 'LGX CUP, Liga SP, ranking e campeões.' },
  empresas: {
    titulo: 'Empresas & times',
    texto: 'Bootcamps, mix, campeonatos internos e confraternizações.',
  },
  faq: {
    titulo: 'Perguntas frequentes',
    texto: 'Reservas, preços, idade, comida e estacionamento.',
  },
  regras: { titulo: 'Regras da casa', texto: 'Cadastro, reservas, equipamentos e condomínio.' },
  cardapio: { titulo: 'Cardápio', texto: 'Bebidas, salgados e lanches sem sair do jogo.' },
  contato: { titulo: 'Como chegar', texto: 'Av. Cupecê, 6062, Jardim Prudência, São Paulo.' },
}

/** Chave de `PAGINAS_OG` para um caminho ("/precos" → "precos"; "/" → "inicio"). */
export function chaveDaPagina(caminho: string) {
  const chave = caminho.replace(/^\/|\.html$/g, '') || 'inicio'
  return chave in PAGINAS_OG ? chave : 'inicio'
}
