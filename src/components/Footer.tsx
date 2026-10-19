import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, MessageCircle, Download } from 'lucide-react';
import { PageTab, SiteSettings } from '../types';

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenAudit: () => void;
  onOpenBooking: () => void;
  onOpenExport: () => void;
  settings: SiteSettings;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenAudit,
  onOpenBooking,
  onOpenExport,
  settings,
}) => {
  const handleNav = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050811] text-slate-400 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00F0FF] p-0.5">
                <div className="w-full h-full bg-[#070B14] rounded-[6px] flex items-center justify-center font-heading font-black text-xs text-[#00F0FF]">
                  GL
                </div>
              </div>
              <span className="text-xl font-heading font-extrabold text-white tracking-tight">
                GrowthLeap <span className="text-[#00F0FF]">AI</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 font-semibold text-[#00F0FF]">
              AI Business Automation for MSMEs, Exporters and Importers.
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              We design, build, and support autonomous AI workflows and digital agents that connect your existing business tools into high-productivity systems.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/919761440027?text=${encodeURIComponent(
                    'Hi Sonendra / GrowthLeap AI, I would like to know more about automating my business workflows.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <span>{settings.phone}</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800">
                    WhatsApp Message
                  </span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-white transition-colors">
                  {settings.contactEmail}
                </a>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('solutions')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  AI Workflow Automation
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('agents')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Intelligent AI Agents
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('solutions')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  WhatsApp Automation
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('solutions')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  CRM & Sales Pipelines
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('solutions')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Document Processing
                </button>
              </li>
            </ul>
          </div>

          {/* Industries Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white">
              Industries
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Exporters
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Importers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  MSMEs & Small Biz
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Manufacturers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Trading Houses
                </button>
              </li>
            </ul>
          </div>

          {/* Use Cases & Resources */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white">
              Use Cases & Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('use-cases')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Lead Qualification
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('use-cases')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Product Catalog Engine
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('resources')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Automation Guides
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('how-it-works')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  6-Stage Pipeline
                </button>
              </li>
              <li>
                <button onClick={onOpenExport} className="text-cyan-400 hover:text-cyan-300 transition-colors text-left cursor-pointer flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  <span>Export Code ZIP</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Founder */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  About GrowthLeap AI
                </button>
              </li>
              <li>
                <a
                  href={settings.founderLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Sonendra Kumar</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Contact Us
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenAudit}
                  className="cta-button w-full py-2.5 px-3 bg-[#2E8540] hover:bg-[#246B33] text-white font-heading font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Start Business Audit
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} GrowthLeap AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <a
              href={settings.founderLinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00F0FF] transition-colors"
            >
              LinkedIn Profile
            </a>
            <a
              href={`https://wa.me/919761440027?text=${encodeURIComponent(
                'Hi Sonendra / GrowthLeap AI, I would like to know more about automating my business workflows.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              WhatsApp (+91 97614 40027)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
