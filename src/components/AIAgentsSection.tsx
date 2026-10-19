import React from 'react';
import {
  Bot,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Cpu,
  Layers,
} from 'lucide-react';
import { AI_AGENTS } from '../data/siteData';

interface AIAgentsSectionProps {
  onOpenBooking: () => void;
  onOpenAudit: () => void;
}

export const AIAgentsSection: React.FC<AIAgentsSectionProps> = ({
  onOpenBooking,
  onOpenAudit,
}) => {
  return (
    <section id="agents" className="bg-[#070B14] py-16 lg:py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase">
            <span>Autonomous Digital Teammates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            Give Your Business Digital AI Workers.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Intelligent software agents that perform specific, repetitive business tasks 24/7 with human verification.
          </p>
        </div>

        {/* 6 AI Agent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="bg-[#0D1527] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5 transition-all group"
            >
              <div className="space-y-4">
                {/* Agent Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    AUTONOMOUS
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-cyan-300 font-medium mt-0.5">
                    {agent.role}
                  </p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {agent.description}
                  </p>
                </div>

                {/* Animated Mini Workflow */}
                <div className="p-3.5 bg-[#070B14] rounded-xl border border-white/5 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    Execution Flow:
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <span className="px-2 py-1 bg-white/5 rounded border border-white/10 truncate max-w-[90px]">
                      {agent.miniWorkflow.step1}
                    </span>
                    <span className="text-cyan-400 font-bold shrink-0">→</span>
                    <span className="px-2 py-1 bg-cyan-950/60 text-cyan-200 rounded border border-cyan-500/30 truncate max-w-[100px]">
                      {agent.miniWorkflow.step2}
                    </span>
                    <span className="text-cyan-400 font-bold shrink-0">→</span>
                    <span className="px-2 py-1 bg-emerald-950/60 text-emerald-200 rounded border border-emerald-500/30 truncate max-w-[90px]">
                      {agent.miniWorkflow.step3}
                    </span>
                  </div>
                </div>

                {/* Connects To Tags */}
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1.5">
                    Connected Integrations:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.connectsTo.map((c, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/10"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Benefit & CTA */}
              <div className="pt-4 mt-4 border-t border-white/5 space-y-3">
                <div className="text-[11px] text-emerald-300 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{agent.benefit}</span>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full py-2 px-3 bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/40 border border-white/10 text-white font-heading font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Deploy {agent.name.replace('AI ', '')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
