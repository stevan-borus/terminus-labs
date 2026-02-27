# Terminus Labs

Website for **Terminus Labs LLC** — a software development and consulting firm.

## Tech Stack

- [Astro](https://astro.build) — static site generator
- [Tailwind CSS v4](https://tailwindcss.com) — styling
- [Resend](https://resend.com) — contact form email delivery
- [Bun](https://bun.sh) — package manager & runtime

## Getting Started

```bash
bun install
bun run dev
```

## Environment Variables

Copy `.env.example` to `.env` and add your Resend API key:

```
RESEND_API_KEY=re_your_api_key_here
```

## Build

```bash
bun run build
```

## Pages

- `/` — Home
- `/privacy-policy` — Privacy Policy
- `/terms` — Terms & Conditions
