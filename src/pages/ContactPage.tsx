import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Send,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { SiteSettings } from '../types';
import { submitCustomerLead } from '../services/leadService';

interface ContactPageProps {
  onOpenAudit: () => void;
  onOpenBooking: () => void;
  settings: SiteSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onOpenAudit,
  onOpenBooking,
  settings,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [businessType, setBusinessType] = useState('MSME Manufacturing');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitCustomerLead(
        {
          name,
          email,
          phone,
          company,
          inquiry: `Contact Page Inquiry: [Type: ${businessType}] ${message}`,
          source: 'contact_page',
        },
        settings
      );
    } catch (err) {
      console.warn('Could not save contact inquiry lead:', err);
    }

    setIsSubmitting(false);
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#070B14] text-white">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#0D1527] to-[#070B14] py-16 lg:py-20 border-b border-white/10 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase">
            <span>Direct Communication</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Connect with GrowthLeap AI.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Schedule a 30-minute consultation, chat directly with our team on WhatsApp, or send an inquiry below.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Instant Direct Channels */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp Highlight Box */}
              <div className="bg-gradient-to-br from-emerald-950/70 to-[#0D1527] border border-emerald-500/40 rounded-3xl p-7 space-y-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    FASTEST RESPONSE
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    Talk on WhatsApp
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Message Sonendra Kumar directly for immediate operational questions, feasibility checks, or quick audio notes.
                  </p>
                </div>

                <a
                  href={`https://wa.me/919761440027?text=${encodeURIComponent(
                    'Hi Sonendra / GrowthLeap AI, I would like to know more about automating our business.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 bg-[#25D366] hover:bg-[#20ba5a] text-[#070B14] font-heading font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Start WhatsApp Chat (+91 97614 40027)</span>
                </a>
              </div>

              {/* Direct Info Card */}
              <div className="bg-[#0D1527] border border-white/10 rounded-3xl p-7 space-y-4">
                <h4 className="font-heading font-bold text-base text-white">
                  Direct Contact Details
                </h4>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">PHONE & WHATSAPP</span>
                      <a href="tel:+919761440027" className="font-semibold text-white hover:text-cyan-400">
                        +91 97614 40027
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">FOUNDER LINKEDIN</span>
                      <a
                        href={settings.founderLinkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-white hover:text-cyan-400 flex items-center gap-1"
                      >
                        <span>Sonendra Kumar on LinkedIn</span>
                        <ExternalLink className="w-3 h-3 text-cyan-400" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">OFFICIAL EMAIL</span>
                      <a href={`mailto:${settings.contactEmail}`} className="font-semibold text-white hover:text-cyan-400">
                        {settings.contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">OPERATIONAL HUBS</span>
                      <span className="font-semibold text-white leading-snug">
                        {settings.address}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <button
                    onClick={onOpenBooking}
                    className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-heading font-semibold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Schedule 30-Min Strategy Call</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Message Form */}
            <div className="lg:col-span-7 bg-[#0D1527] border border-white/10 rounded-3xl p-7 sm:p-9 shadow-xl">
              <div className="space-y-1.5 mb-6">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Operational Inquiry Form
                </span>
                <h3 className="text-2xl font-heading font-bold text-white">
                  Tell Us About Your Process
                </h3>
                <p className="text-xs text-slate-400">
                  We review your submission and reply within 24 business hours.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 text-center bg-cyan-950/40 border border-cyan-500/30 rounded-2xl space-y-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-[#00F0FF] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-white">
                    Inquiry Received!
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{name}</strong>. Sonendra Kumar and the GrowthLeap AI team will connect with you via email ({email}) or WhatsApp ({phone}).
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setCompany('');
                      setMessage('');
                    }}
                    className="py-2 px-4 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh Patel"
                        className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
                        WORK EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ramesh@company.com"
                        className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
                        PHONE / WHATSAPP *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 97614 40027"
                        className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
                        COMPANY NAME
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Patel Exports Ltd"
                        className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
                      BUSINESS TYPE
                    </label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#070B14] border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="MSME Manufacturing">MSME Manufacturing</option>
                      <option value="Export & Import House">Export & Import House</option>
                      <option value="Wholesale Trading & Distribution">Wholesale Trading & Distribution</option>
                      <option value="Freight & Logistics">Freight & Logistics</option>
                      <option value="Other Commercial Enterprise">Other Commercial Enterprise</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
                      WHAT REPETITIVE CHORE OR WORKFLOW WOULD YOU LIKE TO AUTOMATE?
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. We spend hours every morning entering supplier GST invoices into Tally, and replying to buyer shipping status queries on WhatsApp..."
                      className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cta-button w-full py-3.5 px-6 bg-[#2E8540] hover:bg-[#246B33] text-white font-heading font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message to GrowthLeap AI</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
