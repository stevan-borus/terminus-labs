import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Preview,
  Link,
} from '@react-email/components';

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export default function ContactEmail({ name, email, message }: ContactEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New inquiry from {name} — {message.slice(0, 80)}</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Logo */}
          <Text style={logo}>T</Text>

          {/* Main card */}
          <Section style={card}>
            <Heading as="h2" style={heading}>New message from your website</Heading>

            <Hr style={hr} />

            {/* Sender info */}
            <table style={{ width: '100%' }} cellPadding={0} cellSpacing={0}>
              <tr>
                <td style={infoLabel}>Name</td>
                <td style={infoValue}>{name}</td>
              </tr>
              <tr>
                <td style={infoLabel}>Email</td>
                <td style={infoValueLink}>
                  <Link href={`mailto:${email}`} style={emailLink}>{email}</Link>
                </td>
              </tr>
            </table>

            <Hr style={hr} />

            {/* Message */}
            <Text style={messageLabel}>Message</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          {/* Footer */}
          <Text style={footer}>
            Sent via the contact form at{' '}
            <Link href="https://www.terminuslabs.cc" style={footerLink}>terminuslabs.cc</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: '#f4f4f5',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  margin: '0',
  padding: '40px 20px',
};

const container = {
  maxWidth: '480px',
  margin: '0 auto',
};

const logo = {
  fontSize: '28px',
  fontWeight: '700' as const,
  fontFamily: 'Georgia, "Times New Roman", serif',
  color: '#18181b',
  textAlign: 'center' as const,
  margin: '0 0 24px',
  padding: '0',
};

const card = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #e4e4e7',
  padding: '32px',
};

const heading = {
  fontSize: '16px',
  fontWeight: '600' as const,
  color: '#18181b',
  margin: '0',
  lineHeight: '1.4',
};

const hr = {
  borderColor: '#e4e4e7',
  margin: '20px 0',
};

const infoLabel = {
  fontSize: '12px',
  fontWeight: '500' as const,
  color: '#a1a1aa',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  padding: '4px 0',
  width: '60px',
  verticalAlign: 'top' as const,
};

const infoValue = {
  fontSize: '14px',
  color: '#18181b',
  fontWeight: '500' as const,
  padding: '4px 0',
};

const infoValueLink = {
  fontSize: '14px',
  padding: '4px 0',
};

const emailLink = {
  color: '#7c3aed',
  textDecoration: 'none',
  fontWeight: '500' as const,
};

const messageLabel = {
  fontSize: '12px',
  fontWeight: '500' as const,
  color: '#a1a1aa',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  margin: '0 0 8px',
};

const messageText = {
  fontSize: '14px',
  color: '#3f3f46',
  lineHeight: '1.7',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const footer = {
  fontSize: '12px',
  color: '#a1a1aa',
  textAlign: 'center' as const,
  margin: '20px 0 0',
  padding: '0',
};

const footerLink = {
  color: '#7c3aed',
  textDecoration: 'underline',
};
