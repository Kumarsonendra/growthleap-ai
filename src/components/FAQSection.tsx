import React, { useState } from 'react';
import { FAQS_LIST } from '../data/siteData';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { SiteSettings } from '../types';

interface FAQSectionProps {
  settings: SiteSettings;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ settings }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="bg-[#070B14] py-16 lg:py-20 border-b border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase">
            <span>Direct Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            Frequently Asked Questions.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Everything you need to know about adopting practical AI automation for your operations.
          </p>
        </div>

        {/* 10 FAQs Accordion */}
        <div className="space-y-3">
          {FAQS_LIST.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#0D1527] border border-white/10 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <span className="font-heading font-bold text-sm sm:text-base text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform duration-200 ${
                    openIdx === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIdx === idx && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Need more answers */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <span>Have a specific process question? </span>
          <a
            href={`https://wa.me/919761440027?text=${encodeURIComponent(
              'Hi Sonendra / GrowthLeap AI, I have a question about automating our business.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 font-semibold underline inline-flex items-center gap-1 ml-1"
          >
            <MessageSquare className="w-3 h-3" />
            <span>Ask us directly on WhatsApp (+91 97614 40027)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
