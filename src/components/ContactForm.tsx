import { useState, type FormEvent } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
        setErrorMsg(result.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">Message sent!</h3>
        <p className="text-[var(--color-text-secondary)] mb-6">We'll get back to you within 24 hours.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm text-[var(--color-accent-cyan)] hover:text-[var(--color-text-primary)] transition-colors underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm text-[var(--color-text-muted)] mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 bg-[var(--color-surface-raised)] border border-[var(--color-border-subtle)] rounded-xl text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[color-mix(in_srgb,var(--color-accent-cyan)_50%,transparent)] focus:ring-1 focus:ring-[color-mix(in_srgb,var(--color-accent-cyan)_20%,transparent)] transition-all duration-300"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-[var(--color-text-muted)] mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-[var(--color-surface-raised)] border border-[var(--color-border-subtle)] rounded-xl text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[color-mix(in_srgb,var(--color-accent-cyan)_50%,transparent)] focus:ring-1 focus:ring-[color-mix(in_srgb,var(--color-accent-cyan)_20%,transparent)] transition-all duration-300"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-[var(--color-text-muted)] mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 bg-[var(--color-surface-raised)] border border-[var(--color-border-subtle)] rounded-xl text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[color-mix(in_srgb,var(--color-accent-cyan)_50%,transparent)] focus:ring-1 focus:ring-[color-mix(in_srgb,var(--color-accent-cyan)_20%,transparent)] transition-all duration-300 resize-none"
          placeholder="Tell us about your project..."
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-magnetic inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-medium bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-violet)] text-white shadow-lg shadow-[color-mix(in_srgb,var(--color-accent-violet)_20%,transparent)] hover:shadow-[color-mix(in_srgb,var(--color-accent-violet)_40%,transparent)] transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? (
            <>
              Sending...
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" />
              </svg>
            </>
          ) : (
            <>
              Send Message
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </>
          )}
        </button>

        {status === 'error' && (
          <span className="text-sm text-red-400">{errorMsg}</span>
        )}
      </div>
    </form>
  );
}
