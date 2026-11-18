const reais = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const reaisInteiros = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

/** `12` → "R$ 12,00". Com `{ inteiro: true }` → "R$ 12" (só quando o valor não tem centavos). */
export function formatarPreco(valor: number, { inteiro = false } = {}) {
  const semCentavos = Number.isInteger(valor)
  return (inteiro && semCentavos ? reaisInteiros : reais).format(valor).replace(/\s/g, ' ')
}

/** "22:00" → "22h"; "21:30" → "21h30". */
export function formatarHora(hora: string) {
  const [h, m] = hora.split(':')
  return m === '00' ? `${h}h` : `${h}h${m}`
}

/** Telefone em E.164 (+551156234874) → "11 5623-4874". */
export function formatarTelefone(e164: string) {
  const nacional = e164.replace(/^\+55/, '')
  return nacional.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '$1 $2-$3')
}

/** Link do WhatsApp com mensagem pronta. */
export function linkWhatsApp(numero: string, mensagem?: string) {
  const url = new URL(`https://wa.me/${numero}`)
  if (mensagem) url.searchParams.set('text', mensagem)
  return url.toString()
}
