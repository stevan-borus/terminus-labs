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
  Font,
} from '@react-email/components';

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export default function ContactEmail({ name, email, message }: ContactEmailProps) {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>New inquiry from {name}</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logoText}>Terminus Labs</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Heading as="h1" style={heading}>
              New Contact Form Submission
            </Heading>

            <Section style={infoCard}>
              <Text style={label}>From</Text>
              <Text style={value}>{name}</Text>

              <Text style={label}>Email</Text>
              <Text style={valueEmail}>{email}</Text>
            </Section>

            <Hr style={divider} />

            <Text style={label}>Message</Text>
            <Section style={messageBox}>
              <Text style={messageText}>{message}</Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              This email was sent from the contact form at terminuslabs.cc
            </Text>
            <Text style={footerText}>
              Terminus Labs LLC &bull; 30 N Gould St, Ste R, Sheridan, WY 82801
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const body = {
  backgroundColor: '#09090b',
  fontFamily: 'Inter, Helvetica, Arial, sans-serif',
  margin: '0',
  padding: '40px 0',
};

const container = {
  maxWidth: '560px',
  margin: '0 auto',
};

const header = {
  textAlign: 'center' as const,
  padding: '32px 0 24px',
};

const logoText = {
  fontSize: '24px',
  fontWeight: '600' as const,
  background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  margin: '0',
  // Fallback for email clients that don't support gradient text
  color: '#06b6d4',
};

const content = {
  backgroundColor: '#18181b',
  borderRadius: '16px',
  border: '1px solid #27272a',
  padding: '32px',
};

const heading = {
  fontSize: '20px',
  fontWeight: '600' as const,
  color: '#fafafa',
  margin: '0 0 24px',
};

const infoCard = {
  backgroundColor: '#09090b',
  borderRadius: '12px',
  border: '1px solid #27272a',
  padding: '20px',
  marginBottom: '0',
};

const label = {
  fontSize: '11px',
  fontWeight: '500' as const,
  color: '#71717a',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  margin: '0 0 4px',
};

const value = {
  fontSize: '15px',
  color: '#fafafa',
  margin: '0 0 16px',
  fontWeight: '500' as const,
};

const valueEmail = {
  fontSize: '15px',
  color: '#06b6d4',
  margin: '0',
  fontWeight: '500' as const,
};

const divider = {
  borderColor: '#27272a',
  margin: '24px 0',
};

const messageBox = {
  backgroundColor: '#09090b',
  borderRadius: '12px',
  border: '1px solid #27272a',
  padding: '20px',
};

const messageText = {
  fontSize: '14px',
  color: '#a1a1aa',
  lineHeight: '1.7',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const footer = {
  textAlign: 'center' as const,
  padding: '24px 0',
};

const footerText = {
  fontSize: '12px',
  color: '#52525b',
  margin: '0 0 4px',
};
