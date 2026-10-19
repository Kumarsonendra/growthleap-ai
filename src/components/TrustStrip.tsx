import React from 'react';
import { Cpu, Bot, Network, ShieldCheck } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const cards = [
    {
      icon: Cpu,
      title: 'AI Automation',
      description: 'Automate repetitive workflows.',
      color: 'text-cyan-400',
    },
    {
      icon: Bot,
      title: 'AI Agents',
      description: 'Deploy intelligent digital workers.',
      color: 'text-blue-400',
    },
    {
      icon: Network,
      title: 'Business Integration',
      description: 'Connect your existing systems.',
      color: 'text-emerald-400',
    },
    {
      icon: ShieldCheck,
      title: 'Human Support',
      description: 'Keep people in control of important decisions.',
      color: 'text-amber-400',
    },
  ];

  return (
    <section className="bg-[#0A0F1D] border-b border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="bg-[#0D1527] border border-white/10 rounded-xl p-4 flex items-center gap-3.5 hover:border-cyan-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <IconComponent className={`w-5 h-5 ${card.color}`} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-white">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-tight mt-0.5">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
