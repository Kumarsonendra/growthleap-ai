import React from 'react';
import {
  Database,
  Clock,
  MessageSquare,
  FileSpreadsheet,
  Layers,
  FileText,
  BarChart3,
  Headphones,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { PROBLEM_CARDS } from '../data/siteData';

interface ProblemSectionProps {
  onOpenAudit: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenAudit }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Database': return Database;
      case 'Clock': return Clock;
      case 'MessageSquare': return MessageSquare;
      case 'FileSpreadsheet': return FileSpreadsheet;
      case 'Layers': return Layers;
      case 'FileText': return FileText;
      case 'BarChart3': return BarChart3;
      case 'Headphones': return Headphones;
      default: return Database;
    }
  };

  return (
    <section className="bg-[#070B14] py-16 lg:py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-rose-400 uppercase">
            <span>Operational Friction Points</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            Your Team Should Focus on Growth —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">
              Not Repetitive Work.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Every hour spent copy-pasting numbers or chasing delayed WhatsApp messages is an hour stolen from closing high-margin clients.
          </p>
        </div>

        {/* 8 Compact Visual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROBLEM_CARDS.map((card, idx) => {
            const Icon = getIcon(card.iconName);
            return (
              <div
                key={card.id}
                className="bg-[#0D1527] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      0{idx + 1} / 08
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {card.explanation}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase block tracking-wider">
                    Automation Opportunity:
                  </span>
                  <p className="text-xs text-slate-300 leading-snug">
                    {card.automationOpportunity}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom prompt to audit */}
        <div className="mt-10 p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-[#00F0FF] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">
                How many of these 8 bottlenecks exist in your business today?
              </h4>
              <p className="text-xs text-slate-400">
                Identify which workflows are costing you the most time and money.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAudit}
            className="cta-button py-2.5 px-5 bg-[#2E8540] hover:bg-[#246B33] text-white font-heading font-bold text-xs rounded-lg transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Run Free Automation Audit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
