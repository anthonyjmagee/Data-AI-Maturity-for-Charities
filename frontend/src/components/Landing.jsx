import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, GraduationCap, BarChart3, ExternalLink, Github } from 'lucide-react';

const artifacts = [
  {
    title: 'SEND Diagnostic Tool',
    description: 'MAT-level diagnostic for Special Educational Needs provision. Executive (ELD) and School (SLD) frameworks aligned to SEND Code of Practice 2015 + Ofsted 2025.',
    href: '/send-diagnostic',
    external: false,
    icon: GraduationCap,
    tag: 'React',
    accent: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Enhanced Clinical Neurodivergent Assessment',
    description: 'Clinical platform for neurodivergent assessment with patient records, ASRS questionnaire, outcomes tracking and reporting dashboards.',
    href: '/neuro-assessment',
    external: false,
    icon: Brain,
    tag: 'React + Recharts',
    accent: 'from-purple-500 to-pink-600',
  },
  {
    title: 'Data & AI Maturity Index (Charity Edition)',
    description: 'Interactive maturity assessment for charities with built-in GA4 tracking. Self-contained HTML — ready to embed in Wix or any site.',
    href: '/data-ai-maturity.html',
    external: true,
    icon: BarChart3,
    tag: 'Standalone HTML',
    accent: 'from-emerald-500 to-teal-600',
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" data-testid="landing-page">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <header className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700 text-xs uppercase tracking-widest text-slate-400 mb-6">
            <Github size={14} /> Claude Artifacts → GitHub
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Artifact Library
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            A collection of Claude artifacts migrated into a runnable, deployable project. Pick one to launch, or push the whole repo to GitHub from the Emergent chat.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {artifacts.map((a) => {
            const Icon = a.icon;
            const cardInner = (
              <div className="group relative h-full bg-slate-900/60 border border-slate-800 hover:border-slate-600 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40">
                <div className={`absolute inset-x-0 -top-px h-px bg-gradient-to-r ${a.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${a.accent} flex items-center justify-center mb-4`}>
                  <Icon size={22} className="text-white" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-slate-500">{a.tag}</span>
                  {a.external && <ExternalLink size={14} className="text-slate-500" />}
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-white">{a.title}</h2>
                <p className="text-sm text-slate-400 leading-relaxed">{a.description}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-300 group-hover:text-white">
                  Launch
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            );

            return a.external ? (
              <a
                key={a.title}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`artifact-card-${a.href.replace(/[^a-z0-9]/gi, '-')}`}
              >
                {cardInner}
              </a>
            ) : (
              <Link
                key={a.title}
                to={a.href}
                data-testid={`artifact-card-${a.href.replace(/[^a-z0-9]/gi, '-')}`}
              >
                {cardInner}
              </Link>
            );
          })}
        </div>

        <footer className="mt-16 pt-8 border-t border-slate-800 text-sm text-slate-500">
          <p>
            Migrated from Claude.ai via Emergent. Use <span className="text-slate-300 font-medium">Save to GitHub</span> in the chat input to push this repo to your account.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
