import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, ExternalLink, ShieldCheck, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SiteSettings } from '../types';
import { submitCustomerLead } from '../services/leadService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  settings,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [businessType, setBusinessType] = useState('MSME Manufacturer');
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM IST');
  const [selectedDay, setSelectedDay] = useState('Tomorrow');
  const [biggestPain, setBiggestPain] = useState('Invoices & Data Entry into Tally');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitCustomerLead(
        {
          name: fullName,
          email,
          phone,
          company,
          inquiry: `Strategy Call Booking: ${selectedDay} at ${selectedSlot}. Type: ${businessType}. Key challenge: ${biggestPain}`,
          source: 'booking_modal',
          bottleneck: biggestPain,
        },
        settings
      );
    } catch (err) {
      console.warn('Could not record booking lead:', err);
    }

    setIsSubmitting(false);
    setStep('success');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#005A9C', '#2E8540', '#38bdf8'],
    });
  };

  const handleDownloadIcs = () => {
    const title = `GrowthLeap AI - 30-Min Strategy Call (${company || fullName})`;
    const description = `Discussion with GrowthLeap AI Automation Consultant regarding MSME paperwork automation and time-saving workflows.`;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//GrowthLeap AI//Strategy Call//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      'LOCATION:Google Meet / Phone Call',
      `DTSTART:${new Date(Date.now() + 86400000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTEND:${new Date(Date.now() + 86400000 + 1800000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'GrowthLeap-AI-Strategy-Call.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#005A9C] to-[#004273] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white">
              <Calendar className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg leading-snug">
                Book a Free 30-Min Strategy Call
              </h3>
              <p className="text-xs text-sky-100">
                Practical, non-technical advice for Indian MSMEs & Exporters.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-sky-50 border border-sky-100 rounded-xl p-3.5 flex items-start gap-3 text-xs text-slate-700">
                <ShieldCheck className="w-4 h-4 text-[#005A9C] shrink-0 mt-0.5" />
                <p>
                  <strong>Zero Obligation, 100% Confidential:</strong> We will review your current paperwork bottlenecks and provide a concrete feasibility plan with estimated rupee and hour savings.
                </p>
              </div>

              {/* Slot Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Select Preferred Day & Time (IST)
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {['Today', 'Tomorrow', 'This Friday'].map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center cursor-pointer ${
                        selectedDay === day
                          ? 'border-[#005A9C] bg-sky-50 text-[#005A9C] font-semibold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {['10:30 AM', '11:00 AM IST', '2:30 PM', '4:00 PM', '5:30 PM'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-1.5 px-2 text-xs rounded-md border transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                        selectedSlot === slot
                          ? 'border-[#2E8540] bg-emerald-50 text-[#2E8540] font-semibold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>{slot}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005A9C]/20 focus:border-[#005A9C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ramesh@company.com"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005A9C]/20 focus:border-[#005A9C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 97614 40027"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005A9C]/20 focus:border-[#005A9C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Patel Exports"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005A9C]/20 focus:border-[#005A9C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Business Type
                  </label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005A9C]/20 focus:border-[#005A9C] bg-white"
                  >
                    <option value="MSME Manufacturer">MSME Manufacturer</option>
                    <option value="Export-Import House">Export-Import House</option>
                    <option value="Wholesale Trader">Wholesale Trader</option>
                    <option value="Freight & Logistics">Freight & Logistics</option>
                    <option value="Other Business">Other Business</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Top Paperwork Bottleneck
                  </label>
                  <select
                    value={biggestPain}
                    onChange={(e) => setBiggestPain(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005A9C]/20 focus:border-[#005A9C] bg-white"
                  >
                    <option value="Invoices & Data Entry into Tally">Invoices & Data Entry into Tally</option>
                    <option value="Export Shipping Bills & Packing Lists">Export Shipping Bills & Packing Lists</option>
                    <option value="Vendor Quotes & Comparison Spreadsheets">Vendor Quotes & Comparison Spreadsheets</option>
                    <option value="Customer Inquiries on WhatsApp/Email">Customer Inquiries on WhatsApp/Email</option>
                    <option value="GST & E-Way Bill Reconciliation">GST & E-Way Bill Reconciliation</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cta-button flex-1 py-3 px-4 bg-[#2E8540] hover:bg-[#246B33] text-white font-heading font-semibold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Confirming Slot...</span>
                  ) : (
                    <>
                      <span>Confirm 30-Min Strategy Call</span>
                    </>
                  )}
                </button>
                <a
                  href={settings.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Or use Calendly</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </form>
          ) : (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-[#2E8540] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-heading font-bold text-slate-900">
                Strategy Call Confirmed!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. We have reserved your strategy slot for{' '}
                <strong>
                  {selectedDay} at {selectedSlot}
                </strong>
                . A meeting link has been prepared for <strong>{email}</strong>.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-left text-slate-600 max-w-md mx-auto space-y-1.5">
                <p>
                  <strong>Company:</strong> {company || 'Not specified'} ({businessType})
                </p>
                <p>
                  <strong>Discussion Focus:</strong> {biggestPain}
                </p>
                <p>
                  <strong>WhatsApp Notification:</strong> We will send a confirmation reminder to{' '}
                  <span className="text-[#005A9C] font-semibold">{phone}</span>.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleDownloadIcs}
                  className="py-2.5 px-4 bg-[#005A9C] hover:bg-[#00477b] text-white font-medium text-xs rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Add to Google / Outlook Calendar (.ics)</span>
                </button>
                <button
                  onClick={onClose}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
