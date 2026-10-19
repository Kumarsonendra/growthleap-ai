import React from 'react';
import { TECH_ECOSYSTEM } from '../data/siteData';
import { Cpu, Network, CheckCircle2, ShieldCheck } from 'lucide-react';

export const TechEcosystemSection: React.FC = () => {
  return (
    <section className="bg-[#070B14] py-16 lg:py-20 border-b border-white/10 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-[#00F0FF] uppercase">
            <span>Seamless Interoperability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            Connect the Tools Your Business Already Uses.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Zero rip-and-replace. We integrate intelligent AI orchestration with your daily software, databases, and trade portals.
          </p>
        </div>

        {/* Central Engine Visual + Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {TECH_ECOSYSTEM.map((cat, idx) => (
            <div
              key={cat.category}
              className="bg-[#0D1527] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    LAYER 0{idx + 1}
                  </span>
                  <Network className="w-4 h-4 text-cyan-400" />
                </div>
                <h3 className="font-heading font-bold text-base text-white">
                  {cat.category}
                </h3>
                <div className="space-y-2 pt-1">
                  {cat.tools.map((tool, i) => (
                    <div
                      key={i}
                      className="p-2.5 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between text-xs text-slate-200"
                    >
                      <span className="font-semibold">{tool}</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                        API Ready
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[10px] font-mono text-slate-500">
                Encrypted & Sovereign Sync
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
