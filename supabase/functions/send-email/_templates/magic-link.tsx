
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
          Welcome to Collektiv Club
        </Heading>
        <Text style={text}>
          You've been invited to join Collektiv Club! Click the button below to access your account and choose your preferred login method:
        </Text>
        <div style={{ margin: '26px 0' }}>
          <Link
            href={confirmation_url}
            style={button}
            target="_blank"
            rel="noopener noreferrer"
          >
            Accept Invitation
          </Link>
        </div>
        <Text style={footer}>
          After clicking the link above, you'll be able to choose between:
          <br />• Continuing with Google Sign-In
          <br />• Setting up a password for email login
          <br />• Using magic links for future access
          <br /><br />
          If you did not expect this invitation, you can safely ignore it.
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
