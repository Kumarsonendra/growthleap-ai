import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  Zap,
  Users,
  Repeat,
  ClipboardCheck,
  Puzzle,
  Handshake,
  Search,
} from 'lucide-react';
import { SERVICES } from '../data/siteData';
import { PageTab, SiteSettings } from '../types';

interface ServicesPageProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenBooking: () => void;
  settings: SiteSettings;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  setActiveTab,
  onOpenBooking,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('implementation');

  // Helper to get corresponding icon for each service
  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'audit':
        return <ClipboardCheck className="w-6 h-6 text-[#005A9C]" />;
      case 'implementation':
        return <Puzzle className="w-6 h-6 text-[#005A9C]" />;
      case 'retainer':
        return <Handshake className="w-6 h-6 text-[#005A9C]" />;
      default:
        return <Search className="w-6 h-6 text-[#005A9C]" />;
    }
  };

  // Helper to get exact button text requested by the user
  const getServiceButtonText = (id: string) => {
    switch (id) {
      case 'audit':
        return 'Get My Custom Audit';
      case 'implementation':
        return 'Start My Project';
      case 'retainer':
        return 'Inquire About Partnership';
      default:
        return 'Get Started';
    }
  };

  return (
    <div className="space-y-0">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-white via-sky-50/20 to-[#FAFAFA] py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-heading font-bold text-[#005A9C] uppercase tracking-wider">
            Clear, Predictable & High-Impact
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Our Services: Your Path to an Automated Business.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We don't sell bloated enterprise software. We design, build, and maintain high-utility AI workflows tailored to your specific trade operations.
          </p>
        </div>
      </section>

      {/* Services List Detailed */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {SERVICES.map((service, idx) => (
            <div
              key={service.id}
              id={service.id}
              className={`rounded-3xl border transition-all ${
                service.id === 'implementation'
                  ? 'border-[#005A9C] bg-gradient-to-br from-white via-sky-50/30 to-white shadow-lg'
                  : 'border-slate-200 bg-white shadow-sm'
              } p-8 sm:p-12 relative overflow-hidden`}
            >
              {service.id === 'implementation' && (
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8 bg-[#005A9C] text-white text-[11px] font-heading font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  Most Popular for MSMEs
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Description */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[#005A9C] bg-sky-100/80 px-2.5 py-1 rounded-md">
                      SERVICE {service.number}
                    </span>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {service.duration}
                    </span>
                  </div>

                  {/* Clean Icon + Service Name Alignment */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center shrink-0 shadow-xs">
                      {getServiceIcon(service.id)}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-base font-semibold text-[#2E8540]">
                    {service.tagline}
                  </p>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
                    <strong>Ideal For:</strong> {service.targetAudience}
                  </div>

                  {/* Primary CTA Button Styled with #2E8540 & Benefit-Driven Text */}
                  <div className="pt-2">
                    <button
                      onClick={onOpenBooking}
                      className="cta-button py-3 px-6 bg-[#2E8540] hover:bg-[#246B33] text-white font-heading font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-emerald-100" />
                      <span>{getServiceButtonText(service.id)}</span>
                    </button>
                  </div>
                </div>

                {/* Right Deliverables & Outcomes */}
                <div className="lg:col-span-5 bg-white/80 rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-6">
                  <div>
                    <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-3">
                      What's Included:
                    </h3>
                    <ul className="space-y-2.5">
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#2E8540] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Guaranteed Business Outcomes:
                    </h3>
                    <div className="space-y-2">
                      {service.businessOutcomes.map((outcome, oIdx) => (
                        <div
                          key={oIdx}
                          className="p-2.5 bg-emerald-50/70 border border-emerald-100 rounded-lg text-xs text-emerald-900 font-medium"
                        >
                          ✓ {outcome}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
