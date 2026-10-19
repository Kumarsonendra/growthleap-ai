import React, { useState } from 'react';
import { ECOSYSTEM_DEPARTMENTS } from '../data/siteData';
import { Sparkles, ArrowRight, Network } from 'lucide-react';

interface EcosystemSectionProps {
  onOpenAudit: () => void;
}

export const EcosystemSection: React.FC<EcosystemSectionProps> = ({ onOpenAudit }) => {
  const [selectedDept, setSelectedDept] = useState<number>(0);

  return (
    <section className="bg-[#070B14] py-16 lg:py-24 border-b border-white/10 relative overflow-hidden bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-[#00F0FF] uppercase">
            <span>360-Degree Business Automation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            Find Automation Opportunities Across Your Entire Business.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            AI automation isn't limited to chatbots. Identify repetitive workflows across departments and connect them into intelligent systems.
          </p>
        </div>

        {/* Circular / Connected Ecosystem Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Hub Diagram */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[420px] p-4">
            {/* Center Core Node */}
            <div className="relative z-20 w-36 h-36 rounded-full bg-gradient-to-tr from-[#0066FF] to-[#00F0FF] p-1 shadow-2xl shadow-cyan-500/30 flex items-center justify-center animate-flow-pulse">
              <div className="w-full h-full bg-[#070B14] rounded-full flex flex-col items-center justify-center text-center p-2">
                <span className="font-heading font-black text-sm text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
                  GROWTHLEAP
                </span>
                <span className="text-xs font-mono font-bold text-[#00F0FF]">
                  AI ENGINE
                </span>
                <span className="text-[9px] font-mono text-slate-400 mt-0.5">
                  Central Orchestrator
                </span>
              </div>
            </div>

            {/* Orbiting Departments Ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[320px] sm:w-[380px] h-[320px] sm:h-[380px] rounded-full border border-dashed border-cyan-500/20 animate-spin-slow" />
            </div>

            {/* 12 Satellite Nodes */}
            <div className="absolute inset-0 flex items-center justify-center">
              {ECOSYSTEM_DEPARTMENTS.map((dept, index) => {
                const angle = (index / ECOSYSTEM_DEPARTMENTS.length) * 2 * Math.PI - Math.PI / 2;
                const radius = 170; // px
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const isSelected = selectedDept === index;

                return (
                  <button
                    key={dept.name}
                    onClick={() => setSelectedDept(index)}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    className={`absolute p-2 sm:px-3 sm:py-1.5 rounded-lg border text-[11px] font-heading font-semibold transition-all cursor-pointer whitespace-nowrap z-20 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#0066FF] to-[#00F0FF] text-[#070B14] border-white shadow-lg shadow-cyan-500/30 scale-110 font-bold'
                        : 'bg-[#0D1527]/90 text-slate-300 border-white/10 hover:border-cyan-500/40 hover:text-white'
                    }`}
                  >
                    {dept.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Department Detail Card */}
          <div className="lg:col-span-5 bg-[#0D1527] border border-cyan-500/30 rounded-2xl p-6 sm:p-7 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Department Deep-Dive ({selectedDept + 1} of 12)
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Interactive</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-heading font-bold text-white">
                {ECOSYSTEM_DEPARTMENTS[selectedDept].name}
              </h3>
              <p className="text-xs text-cyan-300 font-medium">
                {ECOSYSTEM_DEPARTMENTS[selectedDept].desc}
              </p>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-300 space-y-2">
              <p>
                <strong>Typical Bottleneck:</strong> Disconnected spreadsheets, fragmented emails, and delay in passing data to neighboring teams.
              </p>
              <p>
                <strong>GrowthLeap AI Integration:</strong> Auto-triggers workflows whenever an event occurs, ensuring real-time alignment across finance, sales, and fulfillment.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenAudit}
                className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#00F0FF] to-[#0066FF] text-[#070B14] font-heading font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#070B14]" />
                <span>Audit {ECOSYSTEM_DEPARTMENTS[selectedDept].name} Workflows</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
