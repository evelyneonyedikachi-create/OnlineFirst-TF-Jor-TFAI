import React from 'react';

export const ProposalAccessClosed: React.FC = () => {
  const email = 'onlinefirst2026@gmail.com';
  const subject = encodeURIComponent('Tax Frontier proposal access request');
  const mailto = `mailto:${email}?subject=${subject}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard may be unavailable; the email remains visible on screen.
    }
  };

  return (
    <main className="min-h-screen bg-[#07111d] text-slate-100 flex items-center justify-center px-5 py-12">
      <div className="fixed inset-0 pointer-events-none opacity-70" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(37,170,210,0.12),transparent_38%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(53,125,160,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(53,125,160,0.055)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <section className="relative w-full max-w-3xl rounded-3xl border border-slate-700/80 bg-[#0c1a2d]/95 shadow-2xl shadow-black/40 px-7 py-9 sm:px-12 sm:py-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-slate-600 bg-slate-800/70 px-4 py-2 text-xs font-semibold tracking-wide text-slate-300">
            Tax Frontier Website Proposal
          </span>

          <h1 className="mt-8 text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Proposal Review Currently Closed
          </h1>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-cyan-400/80" />

          <p className="mt-8 text-base sm:text-lg leading-8 text-slate-300">
            Thank you for reviewing the Tax Frontier digital publishing proposal prepared by OnlineFirst Studio.
          </p>

          <p className="mt-5 text-base sm:text-lg leading-8 text-slate-300">
            The proposal review period is currently closed and public access to the design concepts,
            implementation packages and proposal workspace has been suspended.
          </p>

          <p className="mt-5 text-base sm:text-lg leading-8 text-slate-300">
            If the Tax Frontier / COLMAS team would like to continue the discussion or request renewed access,
            please contact OnlineFirst Studio.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-stretch justify-center gap-3">
            <a
              href={mailto}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#0c1a2d]"
            >
              Contact OnlineFirst
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-600 bg-slate-800/70 px-6 py-3 font-semibold text-slate-100 transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-[#0c1a2d]"
            >
              Copy Email
            </button>
          </div>

          <div className="mt-9 rounded-2xl border border-slate-700 bg-slate-900/50 px-5 py-4 text-left sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contact</div>
              <a href={mailto} className="mt-1 inline-block font-mono text-sm text-cyan-300 underline underline-offset-4">
                {email}
              </a>
            </div>
            <div className="mt-4 text-sm text-slate-400 sm:mt-0 sm:text-right">
              <div className="font-semibold text-slate-200">OnlineFirst Studio</div>
              <div>Academic & Professional Publishing Systems</div>
            </div>
          </div>

          <div className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
            Proposal status: Closed
          </div>
        </div>
      </section>
    </main>
  );
};
