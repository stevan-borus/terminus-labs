import { Resend } from 'resend';
import { createElement } from 'react';
import { jsxs, jsx } from 'react/jsx-runtime';
import { Html, Head, Font, Preview, Body, Container, Section, Text, Heading, Hr } from '@react-email/components';
export { renderers } from '../../renderers.mjs';

function ContactEmail({ name, email, message }) {
  return /* @__PURE__ */ jsxs(Html, { lang: "en", children: [
    /* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsx(
      Font,
      {
        fontFamily: "Inter",
        fallbackFontFamily: "Helvetica",
        webFont: {
          url: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2",
          format: "woff2"
        },
        fontWeight: 400,
        fontStyle: "normal"
      }
    ) }),
    /* @__PURE__ */ jsxs(Preview, { children: [
      "New inquiry from ",
      name
    ] }),
    /* @__PURE__ */ jsx(Body, { style: body, children: /* @__PURE__ */ jsxs(Container, { style: container, children: [
      /* @__PURE__ */ jsx(Section, { style: header, children: /* @__PURE__ */ jsx(Text, { style: logoText, children: "Terminus Labs" }) }),
      /* @__PURE__ */ jsxs(Section, { style: content, children: [
        /* @__PURE__ */ jsx(Heading, { as: "h1", style: heading, children: "New Contact Form Submission" }),
        /* @__PURE__ */ jsxs(Section, { style: infoCard, children: [
          /* @__PURE__ */ jsx(Text, { style: label, children: "From" }),
          /* @__PURE__ */ jsx(Text, { style: value, children: name }),
          /* @__PURE__ */ jsx(Text, { style: label, children: "Email" }),
          /* @__PURE__ */ jsx(Text, { style: valueEmail, children: email })
        ] }),
        /* @__PURE__ */ jsx(Hr, { style: divider }),
        /* @__PURE__ */ jsx(Text, { style: label, children: "Message" }),
        /* @__PURE__ */ jsx(Section, { style: messageBox, children: /* @__PURE__ */ jsx(Text, { style: messageText, children: message }) })
      ] }),
      /* @__PURE__ */ jsxs(Section, { style: footer, children: [
        /* @__PURE__ */ jsx(Text, { style: footerText, children: "This email was sent from the contact form at terminuslabs.cc" }),
        /* @__PURE__ */ jsx(Text, { style: footerText, children: "Terminus Labs LLC • 30 N Gould St, Ste R, Sheridan, WY 82801" })
      ] })
    ] }) })
  ] });
}
const body = {
  backgroundColor: "#09090b",
  fontFamily: "Inter, Helvetica, Arial, sans-serif",
  margin: "0",
  padding: "40px 0"
};
const container = {
  maxWidth: "560px",
  margin: "0 auto"
};
const header = {
  textAlign: "center",
  padding: "32px 0 24px"
};
const logoText = {
  fontSize: "24px",
  fontWeight: "600",
  background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  margin: "0",
  // Fallback for email clients that don't support gradient text
  color: "#06b6d4"
};
const content = {
  backgroundColor: "#18181b",
  borderRadius: "16px",
  border: "1px solid #27272a",
  padding: "32px"
};
const heading = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#fafafa",
  margin: "0 0 24px"
};
const infoCard = {
  backgroundColor: "#09090b",
  borderRadius: "12px",
  border: "1px solid #27272a",
  padding: "20px",
  marginBottom: "0"
};
const label = {
  fontSize: "11px",
  fontWeight: "500",
  color: "#71717a",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  margin: "0 0 4px"
};
const value = {
  fontSize: "15px",
  color: "#fafafa",
  margin: "0 0 16px",
  fontWeight: "500"
};
const valueEmail = {
  fontSize: "15px",
  color: "#06b6d4",
  margin: "0",
  fontWeight: "500"
};
const divider = {
  borderColor: "#27272a",
  margin: "24px 0"
};
const messageBox = {
  backgroundColor: "#09090b",
  borderRadius: "12px",
  border: "1px solid #27272a",
  padding: "20px"
};
const messageText = {
  fontSize: "14px",
  color: "#a1a1aa",
  lineHeight: "1.7",
  margin: "0",
  whiteSpace: "pre-wrap"
};
const footer = {
  textAlign: "center",
  padding: "24px 0"
};
const footerText = {
  fontSize: "12px",
  color: "#52525b",
  margin: "0 0 4px"
};

const prerender = false;
const POST = async ({ request }) => {
  try {
    const { name, email, message } = await request.json();
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const apiKey = "re_gWpRCM9Z_HMQMDMGj6yFjfKytVqkALXrE";
    if (!apiKey) ;
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Terminus Labs <onboarding@resend.dev>",
      to: "contact@terminuslabs.cc",
      replyTo: email,
      subject: `New inquiry from ${name}`,
      react: createElement(ContactEmail, { name, email, message })
    });
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send message. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
