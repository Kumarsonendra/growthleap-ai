import React, { useState } from 'react';
import { X, Download, FileCode, Check, Copy, ExternalLink, Sparkles, FolderArchive } from 'lucide-react';
import { generateStaticWebsiteZip } from '../utils/staticZipGenerator';
import { SiteSettings } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  settings,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    try {
      setIsGenerating(true);
      const zipBlob = await generateStaticWebsiteZip(settings);
      const url = window.URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'growthleap-ai-static-website.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch (err) {
      console.error('Failed to generate ZIP:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const fileList = [
    { name: 'index.html', desc: 'Home Page: Hero, Problems, Solution, 3-Step Summary, Calculator & Testimonials' },
    { name: 'services.html', desc: 'Services Page: AI Efficiency Audit, Implementation, and Growth Retainer' },
    { name: 'how-it-works.html', desc: 'How It Works: 4-Step Process (Discover, Design, Deploy, Dominate)' },
    { name: 'about.html', desc: 'About Page: Founder Story, Credentials, and Indian MSME Mission' },
    { name: 'contact.html', desc: 'Contact Page: Strategy Call Scheduler, Functional Form, and FAQ' },
    { name: 'style.css', desc: 'Clean pure CSS with Poppins and Lato fonts, #005A9C & #2E8540 palette' },
    { name: 'app.js', desc: 'Lightweight Vanilla JS for mobile drawer, interactive ROI calculator, and forms' },
    { name: 'vercel.json', desc: 'Pre-configured static hosting configuration for Vercel' },
    { name: 'README.md', desc: 'Easy 2-minute deployment guide for non-technical founders' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-[#0f172a] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg leading-snug">
                Export Static Website Package (ZIP)
              </h3>
              <p className="text-xs text-slate-400">
                100% pure HTML, CSS, and minimal JavaScript — ready for Vercel, Netlify, or standard hosting.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Export Action Card */}
          <div className="bg-gradient-to-br from-sky-50 to-emerald-50 border border-sky-100 rounded-xl p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#005A9C] mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Instant Static Export
                </span>
                <h4 className="text-base font-heading font-bold text-slate-900">
                  growthleap-ai-static-website.zip
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Includes all 5 standalone HTML pages, pure CSS, Vanilla JS, and Vercel configuration.
                </p>
              </div>
              <button
                onClick={handleDownloadZip}
                disabled={isGenerating}
                className="w-full sm:w-auto py-3 px-6 bg-[#005A9C] hover:bg-[#00477b] text-white font-heading font-semibold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isGenerating ? (
                  <span>Generating ZIP...</span>
                ) : downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download ZIP (Ready to Host)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* How to Deploy on Vercel */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 space-y-2">
            <h5 className="font-heading font-bold text-slate-900 flex items-center gap-1.5">
              <span>How to deploy on Vercel in 2 minutes:</span>
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#005A9C] hover:underline inline-flex items-center gap-0.5"
              >
                vercel.com <ExternalLink className="w-3 h-3" />
              </a>
            </h5>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1">
              <li>Unzip the downloaded <strong>growthleap-ai-static-website.zip</strong> file on your computer.</li>
              <li>Log in to <strong>Vercel.com</strong> and click <strong>Add New... → Project</strong>.</li>
              <li>Drag and drop the unzipped folder into the Vercel dashboard.</li>
              <li>Click <strong>Deploy</strong>. Your website will be live with free HTTPS and global CDN within 30 seconds!</li>
            </ol>
          </div>

          {/* Files Included */}
          <div>
            <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
              Files Bundled in the ZIP Package
            </h5>
            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
              {fileList.map((file) => (
                <div key={file.name} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50">
                  <div className="flex items-center gap-2.5">
                    <FileCode className="w-4 h-4 text-[#005A9C] shrink-0" />
                    <div>
                      <span className="font-mono font-semibold text-slate-800">{file.name}</span>
                      <p className="text-[11px] text-slate-500">{file.desc}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Ready</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
