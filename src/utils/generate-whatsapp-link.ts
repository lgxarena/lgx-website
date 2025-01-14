export function generateWhatsAppLink(text: string) {
  const encodedText = encodeURIComponent(text)

  return `https://wa.me/551156234874?text=${encodedText}`
}
