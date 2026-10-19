import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Calendar,
  FileCheck,
  Bot,
  Zap,
  TrendingUp,
  Send,
  Building,
  Mail,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { AUDIT_QUESTIONS } from '../data/siteData';
import { AuditReportResult, SiteSettings } from '../types';
import { AuditSuccessAnimation, AuditInquiryData } from './AuditSuccessAnimation';
import { submitCustomerLead } from '../services/leadService';

interface AuditSectionProps {
  onOpenBooking: () => void;
  settings?: SiteSettings;
}

export const AuditSection: React.FC<AuditSectionProps> = ({ onOpenBooking, settings }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, { label: string; value: string; score: number }>
  >({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [generatedReport, setGeneratedReport] = useState<AuditReportResult | null>(null);

  // Inquiry form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [submittedInquiryData, setSubmittedInquiryData] = useState<AuditInquiryData | null>(null);

  const currentQ = AUDIT_QUESTIONS[currentQuestionIndex];
  const totalQuestions = AUDIT_QUESTIONS.length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (option: { label: string; value: string; score: number }) => {
    const updated = {
      ...selectedAnswers,
      [currentQ.id]: option,
    };
    setSelectedAnswers(updated);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Calculate report
      let totalScore = 0;
      Object.values(updated).forEach((ans) => {
        totalScore += ans.score;
      });
      // Normalized to 100 scale
      const normalizedScore = Math.min(96, Math.max(58, Math.round((totalScore / 320) * 100)));

      const report: AuditReportResult = {
        score: normalizedScore,
        readinessLevel:
          normalizedScore >= 80
            ? 'High Automation Readiness'
            : normalizedScore >= 65
            ? 'Moderate Automation Readiness'
            : 'Immediate Opportunity',
        priorityOpportunities: [
          'Inbound WhatsApp & Web Lead Auto-Qualification (<60s SLA)',
          'Automated Document Data Extraction (Invoices, Packing Lists, POs)',
          'Bi-Directional CRM & Tally ERP Synchronization',
          'Automated Customer Order Status & Dispatch Milestone Alerts',
        ],
        recommendedWorkflows: [
          'WhatsApp Cloud API + Lead Routing Agent',
          'Document OCR & Verification Pipeline with Human Exception Approval',
          'Automated Daily Executive Intelligence Briefing via WhatsApp/Email',
        ],
        recommendedAgents: [
          'AI Lead Qualification Agent',
          'AI Document Extraction Agent',
          'AI Customer Support Agent',
        ],
        suggestedNextSteps: [
          'Schedule a 30-minute Architecture Review to validate current software connectors',
          'Audit sample PDF invoices and packing lists in a secure staging sandbox',
          'Deploy pilot workflow with 0 operational downtime',
        ],
      };

      setGeneratedReport(report);
      setIsCompleted(true);
    }
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !phone) return;

    setIsSubmittingInquiry(true);

    const refCode = `GLA-${new Date().getFullYear()}-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;

    const inquiry: AuditInquiryData = {
      referenceId: refCode,
      name: name || 'Business Owner',
      email: email || 'contact@business.com',
      phone: phone || '+91 97614 40027',
      company: company || 'Enterprise Partner',
      score: generatedReport?.score || 82,
      readinessLevel: generatedReport?.readinessLevel || 'High Automation Readiness',
      bottleneck:
        selectedAnswers[1]?.label ||
        selectedAnswers[2]?.label ||
        'Paperwork & Order Reconciliation',
    };

    // Store lead and sync to Google Sheets
    submitCustomerLead(
      {
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        company: inquiry.company,
        inquiry: `Audit Request: Bottleneck=${inquiry.bottleneck}. Score=${inquiry.score}/100.`,
        source: 'audit_form',
        auditScore: inquiry.score,
        bottleneck: inquiry.bottleneck,
      },
      settings
    ).catch((err) => console.warn('Audit lead sync error:', err));

    setTimeout(() => {
      setIsSubmittingInquiry(false);
      setSubmittedInquiryData(inquiry);
      setInquirySubmitted(true);
    }, 450);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
    setGeneratedReport(null);
    setInquirySubmitted(false);
    setSubmittedInquiryData(null);
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
  };

  return (
    <section id="audit" className="bg-[#070B14] py-16 lg:py-24 border-b border-white/10 bg-grid-pattern relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-[#00F0FF] uppercase">
            <span>Free 2-Minute Diagnostic Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            How Much of Your Business Can Be Automated?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Answer a few quick questions to identify high-value automation opportunities across your operations, sales, and documentation.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-[#0D1527] border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl transition-all duration-300">
          {/* State 1: Active Audit Questions */}
          {!isCompleted && (
            <div className="space-y-6">
              {/* Progress Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-bold">
                    QUESTION {currentQuestionIndex + 1} OF {totalQuestions}
                  </span>
                  <span className="text-slate-400">{progressPercent}% Completed</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00F0FF] to-[#0066FF] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-1.5 pt-2">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                  {currentQ.label}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  {currentQ.subtitle}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {currentQ.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectOption(opt)}
                    className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-cyan-950/40 hover:border-cyan-500/50 text-left transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-heading font-medium text-slate-200 group-hover:text-white">
                      {opt.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                  </button>
                ))}
              </div>

              {/* Back navigation */}
              {currentQuestionIndex > 0 && (
                <div className="pt-2">
                  <button
                    onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                    className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    ← Previous Question
                  </button>
                </div>
              )}
            </div>
          )}

          {/* State 2: Audit Success Animation Component after Inquiry Submission */}
          {isCompleted && inquirySubmitted && submittedInquiryData && (
            <AuditSuccessAnimation
              inquiry={submittedInquiryData}
              onReset={handleReset}
              onOpenBooking={onOpenBooking}
            />
          )}

          {/* State 3: Results & Inquiry Submission Form */}
          {isCompleted && !inquirySubmitted && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Report Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                    COMPREHENSIVE AUDIT REPORT
                  </span>
                  <h3 className="text-2xl font-heading font-extrabold text-white">
                    Your Automation Opportunity Report
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block">Readiness Score</span>
                    <span className="text-2xl font-heading font-black text-cyan-400">
                      {generatedReport?.score} / 100
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs rounded-lg">
                    {generatedReport?.readinessLevel}
                  </span>
                </div>
              </div>

              {/* Opportunity Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Priority Opportunities */}
                <div className="bg-[#070B14] p-5 rounded-2xl border border-white/10 space-y-3">
                  <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    <span>Highest-Value Automation Opportunities</span>
                  </h4>
                  <ul className="space-y-2">
                    {generatedReport?.priorityOpportunities.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended AI Agents */}
                <div className="bg-[#070B14] p-5 rounded-2xl border border-white/10 space-y-3">
                  <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                    <Bot className="w-4 h-4 text-emerald-400" />
                    <span>Recommended AI Agents to Deploy</span>
                  </h4>
                  <ul className="space-y-2">
                    {generatedReport?.recommendedAgents.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Audit Inquiry Form Container */}
              <div className="bg-gradient-to-br from-[#070B14] to-[#0A162B] border border-cyan-500/40 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                      OFFICIAL AUDIT INQUIRY
                    </span>
                    <h4 className="text-lg font-heading font-bold text-white">
                      Request Your Tailored Automation Blueprint
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Receive the complete 12-page architecture review & ROI spreadsheet for your business.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/30 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>100% Free & Confidential</span>
                  </div>
                </div>

                <form onSubmit={handleSubmitInquiry} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full bg-[#101B30] text-white border border-white/15 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs placeholder:text-slate-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Company or Factory Name
                      </label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Apex Exports Pvt Ltd"
                        className="w-full bg-[#101B30] text-white border border-white/15 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs placeholder:text-slate-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Work Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rajesh@apexexports.com"
                        className="w-full bg-[#101B30] text-white border border-white/15 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs placeholder:text-slate-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        WhatsApp / Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98200 XXXXX"
                        className="w-full bg-[#101B30] text-white border border-white/15 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs placeholder:text-slate-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-400">
                      ⚡ Engineering review dispatched within 4 business hours. No spam guarantee.
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmittingInquiry}
                      className="w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-[#00F0FF] via-[#0066FF] to-cyan-500 hover:brightness-110 text-[#070B14] font-heading font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                    >
                      {isSubmittingInquiry ? (
                        <>
                          <Sparkles className="w-4 h-4 animate-spin text-black" />
                          <span>Generating Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-black" />
                          <span>Submit Audit Inquiry & Get Blueprint</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Retake Business Audit</span>
                </button>

                <button
                  onClick={onOpenBooking}
                  className="py-2.5 px-5 bg-white/10 hover:bg-white/15 text-white font-heading font-medium text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Prefer to Book Instant 30-Min Strategy Call</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
