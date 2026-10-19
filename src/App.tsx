import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ExportModal } from './components/ExportModal';
import { SettingsModal } from './components/SettingsModal';
import { LeadsModal } from './components/LeadsModal';
import { AIChatbot } from './components/AIChatbot';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { DEFAULT_SETTINGS } from './data/siteData';
import { PageTab, SiteSettings } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [leadsModalOpen, setLeadsModalOpen] = useState(false);

  // Settings with localStorage persistence & auto-migration
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('growthleap_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          !parsed.founderLinkedIn ||
          parsed.founderLinkedIn.includes('growthleapai') ||
          parsed.phone?.includes('98200')
        ) {
          localStorage.setItem('growthleap_settings', JSON.stringify(DEFAULT_SETTINGS));
          return DEFAULT_SETTINGS;
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Could not read settings from localStorage', e);
    }
    return DEFAULT_SETTINGS;
  });

  const handleSaveSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem('growthleap_settings', JSON.stringify(newSettings));
    } catch (e) {
      console.warn('Could not save settings to localStorage', e);
    }
  };

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    setActiveTab('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleNavChange = (tab: PageTab) => {
    if (tab === 'solutions' || tab === 'industries' || tab === 'agents' || tab === 'use-cases' || tab === 'how-it-works' || tab === 'resources' || tab === 'audit') {
      scrollToSection(tab);
    } else {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenAudit = () => {
    scrollToSection('audit');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070B14] text-slate-100 selection:bg-[#00F0FF] selection:text-black">
      {/* Top Banner for Global AI Automation Notice */}
      <div className="bg-[#0A1122] text-slate-300 py-1.5 px-4 text-[11px] font-mono text-center border-b border-white/10 flex items-center justify-center gap-2">
        <span className="text-cyan-400 font-bold">● GROWTHLEAP AI</span>
        <span>Enterprise AI Automation for MSMEs, Exporters & Importers</span>
        <span className="hidden sm:inline text-slate-500">|</span>
        <button
          onClick={handleOpenAudit}
          className="text-[#00F0FF] hover:underline font-semibold cursor-pointer hidden sm:inline"
        >
          Run Free Automation Audit →
        </button>
        <span className="hidden md:inline text-slate-600">|</span>
        <button
          onClick={() => setLeadsModalOpen(true)}
          className="text-emerald-400 hover:underline font-semibold cursor-pointer hidden md:inline"
        >
          📊 Leads & Sheets Sync
        </button>
      </div>

      {/* Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavChange}
        onOpenAudit={handleOpenAudit}
        onOpenBooking={() => setBookingModalOpen(true)}
        onOpenExport={() => setExportModalOpen(true)}
        onOpenLeads={() => setLeadsModalOpen(true)}
        settings={settings}
      />

      {/* Main Views */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={handleNavChange}
            onOpenAudit={handleOpenAudit}
            onOpenBooking={() => setBookingModalOpen(true)}
            settings={settings}
          />
        )}
        {activeTab === 'about' && (
          <AboutPage
            setActiveTab={handleNavChange}
            onOpenAudit={handleOpenAudit}
            onOpenBooking={() => setBookingModalOpen(true)}
            settings={settings}
          />
        )}
        {activeTab === 'contact' && (
          <ContactPage
            onOpenAudit={handleOpenAudit}
            onOpenBooking={() => setBookingModalOpen(true)}
            settings={settings}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={handleNavChange}
        onOpenAudit={handleOpenAudit}
        onOpenBooking={() => setBookingModalOpen(true)}
        onOpenExport={() => setExportModalOpen(true)}
        settings={settings}
      />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        settings={settings}
      />

      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        settings={settings}
      />

      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
      />

      <LeadsModal
        isOpen={leadsModalOpen}
        onClose={() => setLeadsModalOpen(false)}
        settings={settings}
        onOpenSettings={() => {
          setLeadsModalOpen(false);
          setSettingsModalOpen(true);
        }}
      />

      {/* Interactive AI Chatbot */}
      <AIChatbot
        onOpenBooking={() => setBookingModalOpen(true)}
        onOpenAudit={handleOpenAudit}
        settings={settings}
      />

      {/* Floating WhatsApp Action Button */}
      <a
        href={`https://wa.me/919761440027?text=${encodeURIComponent(
          'Hi Sonendra / GrowthLeap AI, I would like to know more about automating my business workflows.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Sonendra Kumar on WhatsApp: 9761440027"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-[#070B14] p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all flex items-center gap-2 group cursor-pointer border border-emerald-400/40"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline text-xs font-heading font-extrabold tracking-wide">
          WhatsApp 9761440027
        </span>
      </a>
    </div>
  );
}
