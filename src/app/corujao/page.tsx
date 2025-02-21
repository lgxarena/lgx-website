import { Button } from '@/components/ui/button'
import { generateWhatsAppLink } from '@/utils/generate-whatsapp-link'

export default function LANParty() {
  // TODO: Mudar para Accordion
  const reservationLink = generateWhatsAppLink(
    'Olá, gostaria de fazer uma reserva para o Corujão. Poderia me ajudar?'
  )

  return (
    <main className="relative z-[5] flex flex-1 flex-col bg-neutral px-5 py-8 md:py-10">
      <h1 className="mb-4 text-center text-3xl font-bold sm:text-[32px]">Corujão</h1>

      <h3 className="mx-auto mb-2 w-full max-w-screen-xl text-center text-xl font-semibold">
        O que é o Corujão?
      </h3>
      <p className="mx-auto max-w-screen-xl text-justify font-normal">
        O Corujão é uma prática de jogar durante a madrugada, geralmente de sexta para sábado,
        sábado para domingo, ou em vésperas de feriados. É uma oportunidade para reunir os amigos
        para uma noite inteira de jogos.
      </p>

      <h3 className="mx-auto mb-2 mt-8 w-full max-w-screen-xl text-center text-xl font-semibold">
        Como funciona o expediente durante o Corujão?
      </h3>
      <p className="mx-auto max-w-screen-xl text-justify font-normal">
        Nas vésperas do Corujão, a loja opera até às 21h30. Os clientes que não participarão serão
        informados com 30 minutos de antecedência sobre o encerramento. Se o computador que você
        está usando não estiver reservado, pode permanecer até às 00h00. Caso contrário, pediremos
        que encerre seu tempo. Aqueles que reservarem um computador para passar a madrugada na LGX
        podem chegar 15 minutos antes. Se houver atraso, avise-nos ao fazer a reserva para que
        possamos garantir seu lugar. As reservas para o Corujão expiram às 22h45 e podem ser
        liberadas para outros clientes na lista de espera. Não comparecer ao Corujão pode impactar
        em futuras reservas.
      </p>

      <h3 className="mx-auto mb-2 mt-8 w-full max-w-screen-xl text-center text-xl font-semibold">
        Alimentação durante o Corujão
      </h3>
      <p className="mx-auto max-w-screen-xl text-justify font-normal">
        A LGX oferece um cardápio variado com preços acessíveis, incluindo bebidas, salgados,
        lanches, sorvetes, e muito mais. Não é permitido trazer alimentos de fora ou de outras
        praças de alimentação. Recomendamos o uso da nossa lanchonete para consumo, especialmente de
        alimentos que possam danificar os periféricos ou prejudicar outros clientes. Isso ajuda a
        manter um ambiente limpo e agradável para todos.
      </p>

      <h3 className="mx-auto mb-2 mt-8 w-full max-w-screen-xl text-center text-xl font-semibold">
        Segurança
      </h3>
      <p className="mx-auto max-w-screen-xl text-justify font-normal">
        Nossa localização é privilegiada, dentro de um condomínio fechado, garantindo segurança e
        tranquilidade para nossos clientes se divertirem durante a madrugada. Menores de 18 anos
        precisam de autorização dos pais via contato telefônico ou por escrito. Menores de 12 anos
        devem ser acompanhados por um responsável adulto.
      </p>

      <h3 className="mx-auto mb-2 mt-8 w-full max-w-screen-xl text-center text-xl font-semibold">
        Estacionamento nos Corujões
      </h3>
      <p className="mx-auto max-w-screen-xl text-justify font-normal">
        Durante os Corujões, temos autorização para utilizar até 7 vagas de estacionamento.
        Recomendamos que organizem caronas para garantir que todos consigam estacionar. Caso o
        estacionamento esteja completo, outros veículos precisarão ficar na avenida próxima ao
        condomínio.
      </p>

      <Button className="mx-auto mt-10 w-full max-w-96" asChild>
        <a href={reservationLink} rel="noreferrer" target="_blank">
          Fazer reserva
        </a>
      </Button>
    </main>
  )
}
