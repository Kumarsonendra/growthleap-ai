import React, { useState } from 'react';
import {
  Menu,
  X,
  Sparkles,
  PhoneCall,
  Calendar,
  Download,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { PageTab, SiteSettings } from '../types';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  onOpenAudit: () => void;
  onOpenBooking: () => void;
  onOpenExport: () => void;
  onOpenLeads?: () => void;
  settings: SiteSettings;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAudit,
  onOpenBooking,
  onOpenExport,
  onOpenLeads,
  settings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; tab: PageTab }[] = [
    { label: 'Solutions', tab: 'solutions' },
    { label: 'Industries', tab: 'industries' },
    { label: 'AI Agents', tab: 'agents' },
    { label: 'Use Cases', tab: 'use-cases' },
    { label: 'How It Works', tab: 'how-it-works' },
    { label: 'Resources', tab: 'resources' },
    { label: 'About', tab: 'about' },
    { label: 'Contact', tab: 'contact' },
  ];

  const handleNav = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#070B14]/90 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00F0FF] p-0.5 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <div className="w-full h-full bg-[#070B14] rounded-[10px] flex items-center justify-center">
                <span className="font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#0066FF] text-lg">
                  GL
                </span>
              </div>
            </div>
            <div>
              <span className="text-xl font-heading font-extrabold text-white tracking-tight flex items-center gap-1.5">
                GrowthLeap <span className="text-[#00F0FF]">AI</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase block">
                Enterprise Automation
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((item) => (
              <button
                key={item.tab}
                onClick={() => handleNav(item.tab)}
                className={`text-xs font-heading tracking-wide transition-colors cursor-pointer py-1 relative ${
                  activeTab === item.tab
                    ? 'text-[#00F0FF] font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {activeTab === item.tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00F0FF] rounded-full shadow-xs shadow-cyan-400" />
                )}
              </button>
            ))}
          </nav>

          {/* Actions Zone */}
          <div className="hidden sm:flex items-center gap-3">
            {/* WhatsApp Direct Chat */}
            <a
              href={`https://wa.me/919761440027?text=${encodeURIComponent(
                'Hi Sonendra / GrowthLeap AI, I would like to know more about automating my business workflows.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs font-heading font-medium text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 rounded-lg transition-all flex items-center gap-1.5"
              title="Talk on WhatsApp (+91 97614 40027)"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>WhatsApp</span>
            </a>

            {/* Leads Vault (Google Sheets) */}
            {onOpenLeads && (
              <button
                onClick={onOpenLeads}
                title="View customer leads & Google Sheets export"
                className="px-2.5 py-2 text-xs font-heading font-medium text-emerald-300 hover:text-emerald-200 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>📊 Leads</span>
              </button>
            )}

            {/* Book Consultation */}
            <button
              onClick={onOpenBooking}
              className="px-3.5 py-2 text-xs font-heading font-medium text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all cursor-pointer"
            >
              Book Consultation
            </button>

            {/* Primary CTA: Get AI Business Audit */}
            <button
              onClick={onOpenAudit}
              className="cta-button px-4 py-2 text-xs font-heading font-bold text-white bg-[#2E8540] hover:bg-[#246B33] active:scale-[0.98] rounded-lg shadow-sm shadow-emerald-950/40 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Get AI Business Audit</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenAudit}
              className="cta-button px-2.5 py-1.5 text-[11px] font-heading font-bold text-white bg-[#2E8540] hover:bg-[#246B33] rounded-md"
            >
              Audit
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D1527] border-t border-white/10 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          <div className="grid grid-cols-2 gap-1.5 pb-3 border-b border-white/10">
            {navLinks.map((item) => (
              <button
                key={item.tab}
                onClick={() => handleNav(item.tab)}
                className={`text-left px-3 py-2 rounded-lg text-xs font-heading ${
                  activeTab === item.tab
                    ? 'bg-cyan-500/10 text-[#00F0FF] font-semibold border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAudit();
              }}
              className="cta-button w-full py-2.5 bg-[#2E8540] hover:bg-[#246B33] text-white font-heading font-bold text-xs rounded-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>GET YOUR AI BUSINESS AUDIT</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 bg-white/10 text-white font-heading font-medium text-xs rounded-lg flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Consultation</span>
            </button>

            <a
              href={`https://wa.me/919761440027?text=${encodeURIComponent(
                'Hi Sonendra / GrowthLeap AI, I would like to know more about automating my business workflows.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 font-heading font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5"
            >
              <span>Talk on WhatsApp (9761440027)</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenExport();
              }}
              className="w-full py-2 text-slate-400 hover:text-white text-[11px] flex items-center justify-center gap-1.5"
            >
              <Download className="w-3 h-3" />
              <span>Export Website ZIP for Vercel</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
