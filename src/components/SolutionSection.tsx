import React, { useState } from 'react';
import {
  Cpu,
  Bot,
  MessageCircle,
  Users,
  Network,
  FileCheck,
  TrendingUp,
  Globe,
  PieChart,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  X,
  Calendar,
} from 'lucide-react';
import { SOLUTION_CARDS } from '../data/siteData';
import { SolutionCard } from '../types';

interface SolutionSectionProps {
  onOpenBooking: () => void;
  onOpenAudit: () => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({
  onOpenBooking,
  onOpenAudit,
}) => {
  const [activeModalSolution, setActiveModalSolution] = useState<SolutionCard | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return Cpu;
      case 'Bot': return Bot;
      case 'MessageCircle': return MessageCircle;
      case 'Users': return Users;
      case 'Network': return Network;
      case 'FileCheck': return FileCheck;
      case 'TrendingUp': return TrendingUp;
      case 'Globe': return Globe;
      case 'PieChart': return PieChart;
      case 'GraduationCap': return GraduationCap;
      default: return Cpu;
    }
  };

  return (
    <section id="solutions" className="bg-[#0A0F1D] py-16 lg:py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase">
            <span>Modular Enterprise Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            One Automation Partner.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#0066FF]">
              Multiple Business Solutions.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            From single-task workflow bridges to end-to-end autonomous business departments.
          </p>
        </div>

        {/* 10 Solution Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {SOLUTION_CARDS.map((sol) => {
            const Icon = getIcon(sol.iconName);
            return (
              <div
                key={sol.id}
                className="bg-[#0D1527] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      {sol.department}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                      {sol.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {sol.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalSolution(sol)}
                    className="text-xs font-heading font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] text-slate-500">Production-Ready</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Solution Deep-Dive */}
        {activeModalSolution && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-lg bg-[#0D1527] border border-cyan-500/40 rounded-2xl p-6 text-white shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-[#00F0FF] flex items-center justify-center">
                    {React.createElement(getIcon(activeModalSolution.iconName), { className: 'w-4 h-4' })}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-white">
                      {activeModalSolution.title}
                    </h3>
                    <span className="text-[10px] font-mono text-cyan-400">
                      Department: {activeModalSolution.department}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModalSolution(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeModalSolution.description}
              </p>

              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-bold">
                  Core Implementation Features:
                </span>
                <div className="space-y-1.5">
                  {activeModalSolution.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex gap-2">
                <button
                  onClick={() => {
                    setActiveModalSolution(null);
                    onOpenBooking();
                  }}
                  className="flex-1 py-2.5 bg-gradient-to-r from-[#00F0FF] to-[#0066FF] text-[#070B14] font-heading font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#070B14]" />
                  <span>Book Consultation for this Solution</span>
                </button>
                <button
                  onClick={() => setActiveModalSolution(null)}
                  className="py-2.5 px-4 bg-white/10 hover:bg-white/20 text-slate-300 text-xs rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
