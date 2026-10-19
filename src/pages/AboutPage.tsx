import React from 'react';
import {
  Calendar,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { PageTab, SiteSettings } from '../types';

interface AboutPageProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenAudit: () => void;
  onOpenBooking: () => void;
  settings: SiteSettings;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  setActiveTab,
  onOpenAudit,
  onOpenBooking,
  settings,
}) => {
  return (
    <div className="bg-[#070B14] text-white">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#0D1527] to-[#070B14] py-16 lg:py-20 border-b border-white/10 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            Our Purpose & Mission
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Engineering Autonomous Systems for Real Businesses.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Democratizing enterprise-grade AI automation for the hardworking backbone of MSMEs, exporters, importers, and manufacturers.
          </p>
        </div>
      </section>

      {/* Story & Leadership */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Leadership & Vision
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight">
                Built Around Practical Business Problems, Not AI Hype
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                <p>
                  Most software technology companies build tools meant for developers or Fortune 500 tech teams. They overlook the operational reality of manufacturing plants, trading desks, export agencies, and growing MSMEs.
                </p>
                <p>
                  At <strong>GrowthLeap AI</strong>, we believe business owners and operations teams shouldn't need a computer science degree to enjoy the speed of artificial intelligence. If your team can use WhatsApp and open an Excel sheet, you can deploy autonomous AI workers across your company.
                </p>
                <p className="font-semibold text-cyan-300">
                  We measure our engineering success on only two metrics: staff hours reclaimed and error rates eliminated.
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-base text-white">
                    {settings.founderName}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Lead AI Automation Consultant · GrowthLeap AI
                  </p>
                </div>
                <a
                  href={settings.founderLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Profile Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#0D1527] rounded-3xl p-8 border border-cyan-500/30 shadow-2xl text-center space-y-5">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-[#00F0FF] p-1 mx-auto flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <div className="w-full h-full bg-[#070B14] rounded-[14px] flex items-center justify-center font-heading font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#0066FF]">
                    SK
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-xl text-white">
                    {settings.founderName}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400">
                    Automation & Digital Transformation
                  </p>
                  <p className="text-xs text-slate-400">
                    Mumbai & Bengaluru, India
                  </p>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs text-slate-300 italic">
                  "We don't build tech for tech's sake. We build systems that run quietly in the background so your business grows faster."
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <a
                    href={settings.founderLinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-heading font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View LinkedIn</span>
                  </a>

                  <a
                    href={`https://wa.me/919761440027?text=${encodeURIComponent(
                      'Hi Sonendra, I came across your GrowthLeap AI website and would like to connect.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 bg-emerald-600/20 border border-emerald-500/30 hover:bg-emerald-600/30 text-emerald-300 font-heading font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Chat</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Guiding Principles */}
      <section className="py-20 border-b border-white/10 bg-[#0A0F1D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Engineering Values
            </span>
            <h2 className="text-3xl font-heading font-bold text-white tracking-tight">
              The 4 GrowthLeap Core Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0D1527] p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-heading font-bold text-sm">
                01
              </div>
              <h3 className="font-heading font-bold text-lg text-white">Utility Over Hype</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We strictly reject gimmicks. We build workhorse automations that run reliably millions of times without breaking.
              </p>
            </div>

            <div className="bg-[#0D1527] p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-heading font-bold text-sm">
                02
              </div>
              <h3 className="font-heading font-bold text-lg text-white">Built for Non-Techies</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                No complex dashboards or terminal prompts. Everything integrates seamlessly with your WhatsApp, Tally, and Excel.
              </p>
            </div>

            <div className="bg-[#0D1527] p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 flex items-center justify-center font-heading font-bold text-sm">
                03
              </div>
              <h3 className="font-heading font-bold text-lg text-white">Data Sovereignty</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your client lists, margins, and commercial files are confidential. We never train public AI models on your files.
              </p>
            </div>

            <div className="bg-[#0D1527] p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-center font-heading font-bold text-sm">
                04
              </div>
              <h3 className="font-heading font-bold text-lg text-white">Continuous Partnership</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We don't abandon you after launch. We monitor accuracy, maintain uptime, and expand capabilities as your business scales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <button
          onClick={onOpenAudit}
          className="py-3.5 px-7 bg-gradient-to-r from-[#00F0FF] to-[#0066FF] text-[#070B14] font-heading font-bold text-xs rounded-xl shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#070B14]" />
          <span>Start Free AI Business Audit</span>
        </button>
      </section>
    </div>
  );
};
