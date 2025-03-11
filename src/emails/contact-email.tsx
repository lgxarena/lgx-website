import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import DOMPurify from 'isomorphic-dompurify'

interface ContactEmailProps {
  name: string
  email: string
  message: string
}

export function EmailTemplate({ name, email, message }: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nova mensagem de contato de {name}</Preview>
      <Body
        style={{ backgroundColor: '#0e0e0e', color: '#f2f2f2', fontFamily: 'Inter, sans-serif' }}
      >
        <Container style={{ margin: '0 auto', maxWidth: '560px', padding: '20px' }}>
          <Section
            style={{
              marginBottom: '20px',
              borderRadius: '6px',
              backgroundColor: '#272727',
              padding: '20px',
            }}
          >
            <Heading>
              <Img
                alt="Logo LGX"
                height={32}
                src={`${process.env.NEXT_PUBLIC_APP_URL}/images/brand.png`}
              />
            </Heading>

            <Text
              style={{
                color: '#b0b0b0',
                fontWeight: 'bold',
                fontSize: '14px',
                marginBottom: '4px',
              }}
            >
              Nome:
            </Text>
            <Text style={{ marginTop: 0, marginBottom: '16px', fontSize: '16px' }}>{name}</Text>

            <Text
              style={{
                color: '#b0b0b0',
                fontWeight: 'bold',
                fontSize: '14px',
                marginBottom: '4px',
              }}
            >
              E-mail:
            </Text>
            <Text
              style={{
                marginTop: 0,
                marginBottom: '16px',
                fontSize: '16px',
              }}
            >
              {email.replace('@', '\u200B@\u200B')}
            </Text>

            <Text
              style={{
                color: '#b0b0b0',
                fontWeight: 'bold',
                fontSize: '14px',
                marginBottom: '4px',
              }}
            >
              Mensagem:
            </Text>
            <Text
              style={{ marginTop: 0, fontSize: '16px' }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  message.replace(/\n{2,}/g, '\n').replace(/\n/g, '<br />')
                ),
              }}
            />
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default EmailTemplate
