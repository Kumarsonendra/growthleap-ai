import React, { useState } from 'react';
import { RESOURCE_CARDS } from '../data/siteData';
import { ResourceCard } from '../types';
import { BookOpen, ArrowRight, X, Clock, CheckCircle2 } from 'lucide-react';

export const ResourcesSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<ResourceCard | null>(null);

  return (
    <section id="resources" className="bg-[#0A0F1D] py-16 lg:py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase">
            <span>Knowledge & Strategy Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            Learn How AI Can Improve Your Business.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Practical briefings and playbooks written strictly from an operational, non-technical B2B viewpoint.
          </p>
        </div>

        {/* 8 Resource Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {RESOURCE_CARDS.map((res) => (
            <div
              key={res.id}
              className="bg-[#0D1527] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-cyan-500/40 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                    {res.category}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {res.readTime}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                  {res.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => setActiveArticle(res)}
                  className="text-xs font-heading font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Read Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Article Deep-Dive */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-lg bg-[#0D1527] border border-cyan-500/40 rounded-2xl p-6 text-white shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                    {activeArticle.category} · {activeArticle.readTime}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-white mt-0.5">
                    {activeArticle.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeArticle.description}
              </p>

              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-bold">
                  Key Operational Takeaways:
                </span>
                <div className="space-y-2">
                  {activeArticle.keyTakeaways.map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[11px] text-slate-400">
                Want to implement this in your company? We can tailor these workflows for your team in under 3 weeks.
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="py-2 px-4 bg-white/10 hover:bg-white/20 text-slate-300 text-xs rounded-xl"
                >
                  Close Briefing
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
