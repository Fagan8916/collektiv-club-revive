
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface MagicLinkEmailProps {
  confirmation_url: string
  site_url?: string
}

export const MagicLinkEmail = ({
  confirmation_url,
  site_url,
}: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Magic Link Login for {site_url || "your account"}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading as="h2" style={h2}>
          Magic Link Login
        </Heading>
        <Text style={text}>
          Click the button below to securely log in to{site_url ? ` ${site_url}` : " your account"}:
        </Text>
        <div style={{ margin: '26px 0' }}>
          <Link
            href={confirmation_url}
            style={button}
            target="_blank"
            rel="noopener noreferrer"
          >
            Log in with Magic Link
          </Link>
        </div>
        <Text style={footer}>
          If you did not request this email, you can safely ignore it.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail

const main = {
  backgroundColor: '#fff',
  fontFamily: 'sans-serif',
}

const container = {
  padding: '32px 18px',
  maxWidth: '456px',
  margin: '0 auto',
  backgroundColor: '#fff',
  border: '1px solid #e5e5e5',
  borderRadius: '8px',
}

const h2 = {
  fontFamily: 'sans-serif',
  color: '#205a3d',
  fontSize: '1.6em',
  fontWeight: 700,
  margin: '0 0 18px 0',
}

const text = {
  fontFamily: 'sans-serif',
  color: '#222',
  margin: '0 0 14px 0',
  fontSize: '1em',
  lineHeight: 1.5,
}

const button = {
  background: '#1dc67d',
  color: 'white',
  padding: '10px 16px',
  borderRadius: '5px',
  textDecoration: 'none',
  fontFamily: 'inherit',
  fontWeight: 600,
  fontSize: '1.09em',
  display: 'inline-block',
}

const footer = {
  fontFamily: 'sans-serif',
  fontSize: '0.96em',
  color: '#555',
  marginTop: '24px',
}
