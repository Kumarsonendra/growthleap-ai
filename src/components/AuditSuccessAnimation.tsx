import React, { useEffect } from 'react';
import {
  CheckCircle2,
  Calendar,
  MessageCircle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  FileText,
  Building,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface AuditInquiryData {
  referenceId: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry?: string;
  score?: number;
  readinessLevel?: string;
  bottleneck?: string;
}

interface AuditSuccessAnimationProps {
  inquiry: AuditInquiryData;
  onReset: () => void;
  onOpenBooking: () => void;
  whatsappNumber?: string;
}

export const AuditSuccessAnimation: React.FC<AuditSuccessAnimationProps> = ({
  inquiry,
  onReset,
  onOpenBooking,
  whatsappNumber = '9761440027',
}) => {
  // Fire refined brand confetti burst on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#00F0FF', '#0066FF', '#10B981', '#ffffff'],
        disableForReducedMotion: true,
      });
    } catch (e) {
      // Gracefully handle if canvas is unavailable
    }
  }, []);

  const whatsappMessage = `Hi Sonendra / GrowthLeap AI, I just submitted an Audit Inquiry on your website (Ref: ${inquiry.referenceId}). Company: ${inquiry.company || inquiry.name}, Readiness Score: ${inquiry.score || 80}/100. I would like to review the custom automation blueprint.`;

  return (
    <div className="animate-success-card w-full py-2 space-y-6 text-left">
      {/* Top Banner Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#070B14]/80 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 backdrop-blur-md">
        <div className="flex items-center gap-3.5">
          {/* Animated Glowing Success Ring */}
          <div className="relative shrink-0 w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ring-expand" />
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-black font-bold shadow-lg shadow-emerald-500/30 relative z-10">
              <svg
                className="w-5 h-5 text-black"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" className="animate-checkmark-path" />
              </svg>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-emerald-400 uppercase bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              INQUIRY RECEIVED • PRIORITY QUEUE
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-tight">
              Your Automation Blueprint Request Is Confirmed!
            </h3>
          </div>
        </div>

        <div className="text-left sm:text-right shrink-0 pl-15 sm:pl-0">
          <span className="text-[10px] font-mono text-slate-400 block uppercase">
            Inquiry Reference
          </span>
          <span className="text-sm font-mono font-bold text-cyan-400 tracking-wider">
            {inquiry.referenceId}
          </span>
        </div>
      </div>

      {/* Confirmation Subtitle & SLA Guarantee */}
      <div className="bg-[#0C1527] border border-white/10 rounded-2xl p-5 space-y-3">
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
          Thank you, <strong className="text-white font-semibold">{inquiry.name || 'Partner'}</strong>. 
          Founder <strong className="text-cyan-300">Sonendra Kumar</strong> and our technical team are preparing your custom 
          <strong className="text-white"> AI Automation Architecture Blueprint</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-[#070B14] p-3 rounded-xl border border-white/5 flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-bold text-white block">4-Hour Response SLA</span>
              <span className="text-[10px] text-slate-400 leading-tight block">
                Direct review by engineering, no automated sales spam.
              </span>
            </div>
          </div>

          <div className="bg-[#070B14] p-3 rounded-xl border border-white/5 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-bold text-white block">100% Confidential</span>
              <span className="text-[10px] text-slate-400 leading-tight block">
                Protected by strict enterprise NDA standards.
              </span>
            </div>
          </div>

          <div className="bg-[#070B14] p-3 rounded-xl border border-white/5 flex items-start gap-2.5">
            <FileText className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-bold text-white block">Zero-Disruption Plan</span>
              <span className="text-[10px] text-slate-400 leading-tight block">
                Connects with Tally & Excel without software changes.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Summary Snapshot Card */}
      <div className="bg-[#070B14] border border-cyan-500/20 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs font-heading font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-cyan-400" />
            Audit Profile Snapshot
          </span>
          <span className="text-xs font-mono text-cyan-300">
            Readiness Score: <strong className="text-white">{inquiry.score || 82}/100</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block font-mono">Company</span>
            <span className="font-semibold text-slate-200">{inquiry.company || 'Enterprise'}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-mono">Email</span>
            <span className="font-semibold text-slate-200 truncate block">{inquiry.email}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-mono">WhatsApp</span>
            <span className="font-semibold text-emerald-400">{inquiry.phone || '+91 97614 40027'}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-mono">Focus Area</span>
            <span className="font-semibold text-cyan-300 truncate block">
              {inquiry.bottleneck || 'Workflow Automation'}
            </span>
          </div>
        </div>
      </div>

      {/* Direct Escalation CTAs */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer order-3 sm:order-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retake or Submit Another Audit</span>
        </button>

        <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto order-1 sm:order-2">
          {/* Direct WhatsApp Action */}
          <a
            href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-5 bg-[#25D366] hover:bg-[#20ba5a] text-[#070B14] font-heading font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp (+91 {whatsappNumber})</span>
          </a>

          {/* Book Calendar Slot */}
          <button
            onClick={onOpenBooking}
            className="py-3 px-5 bg-gradient-to-r from-[#00F0FF] to-[#0066FF] hover:brightness-110 text-[#070B14] font-heading font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Calendar className="w-4 h-4 text-[#070B14]" />
            <span>Schedule 30-Min Strategy Call</span>
          </button>
        </div>
      </div>
    </div>
  );
};
