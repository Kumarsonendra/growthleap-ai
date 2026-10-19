import React, { useState } from 'react';
import { X, Check, RotateCcw } from 'lucide-react';
import { DEFAULT_SETTINGS } from '../data/siteData';
import { SiteSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
  onSaveSettings: (settings: SiteSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}) => {
  const [formState, setFormState] = useState<SiteSettings>({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formState);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleReset = () => {
    setFormState({ ...DEFAULT_SETTINGS });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-base leading-snug">
              Business Contact & Link Settings
            </h3>
            <p className="text-xs text-slate-400">
              Customize links across the website and static export files.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Calendly Booking Link
            </label>
            <input
              type="url"
              required
              value={formState.calendlyUrl}
              onChange={(e) => setFormState({ ...formState, calendlyUrl: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005A9C]/20 focus:border-[#005A9C]"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              All "Book Free Call" buttons can link directly to this URL.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                required
                value={formState.contactEmail}
                onChange={(e) => setFormState({ ...formState, contactEmail: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005A9C]/20 focus:border-[#005A9C]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                required
                value={formState.phone}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005A9C]/20 focus:border-[#005A9C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp Number (with country code)
              </label>
              <input
                type="text"
                required
                value={formState.whatsapp}
                onChange={(e) => setFormState({ ...formState, whatsapp: e.target.value })}
                placeholder="+919820012345"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005A9C]/20 focus:border-[#005A9C]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Founder Name
              </label>
              <input
                type="text"
                required
                value={formState.founderName}
                onChange={(e) => setFormState({ ...formState, founderName: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005A9C]/20 focus:border-[#005A9C]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Founder LinkedIn URL
            </label>
            <input
              type="url"
              required
              value={formState.founderLinkedIn}
              onChange={(e) => setFormState({ ...formState, founderLinkedIn: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005A9C]/20 focus:border-[#005A9C]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Office Locations / Address
            </label>
            <input
              type="text"
              required
              value={formState.address}
              onChange={(e) => setFormState({ ...formState, address: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005A9C]/20 focus:border-[#005A9C]"
            />
          </div>

          {/* Google Sheets Webhook Integration */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-emerald-900">
                Google Sheets Webhook URL (Lead Collection)
              </label>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono px-1.5 py-0.5 rounded font-bold">
                Auto-Sync
              </span>
            </div>
            <input
              type="url"
              placeholder="https://script.google.com/macros/s/.../exec"
              value={formState.googleSheetsWebhookUrl || ''}
              onChange={(e) => setFormState({ ...formState, googleSheetsWebhookUrl: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-mono"
            />
            <p className="text-[11px] text-emerald-800 leading-snug">
              When visitors submit their contact details (Gmail, Mobile No) in the Chatbot or Audit Form, their inquiry is immediately appended to your Google Sheet.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-3 text-xs text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-[#005A9C] hover:bg-[#00477b] text-white text-xs font-heading font-semibold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
