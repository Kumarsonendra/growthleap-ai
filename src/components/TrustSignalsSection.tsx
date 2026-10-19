import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const TrustSignalsSection: React.FC = () => {
  return (
    <section className="bg-[#F0F0F0] py-14 border-t border-b border-slate-300 text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1A202C] tracking-tight mb-8">
          Tools We Use to Build Your Success
        </h3>

        {/* Row of small, grayscale logos of trusted technologies */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 mb-8">
          {/* Google */}
          <div className="flex items-center gap-2.5 grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-200">
            <svg className="w-6 h-6 fill-current text-slate-700" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            <span className="font-heading font-bold text-base tracking-tight text-slate-700">
              Google
            </span>
          </div>

          {/* Zapier */}
          <div className="flex items-center gap-2.5 grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-200">
            <svg className="w-6 h-6 fill-current text-slate-700" viewBox="0 0 24 24">
              <path d="M12.923 0L7.846 9.231h5.538L9.231 24l10.923-12.923h-5.538L18.462 0h-5.539z" />
            </svg>
            <span className="font-heading font-bold text-base tracking-tight text-slate-700">
              Zapier
            </span>
          </div>

          {/* Trello */}
          <div className="flex items-center gap-2.5 grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-200">
            <svg className="w-6 h-6 fill-current text-slate-700" viewBox="0 0 24 24">
              <path d="M19.5 0H4.5C2.015 0 0 2.015 0 4.5v15C0 21.985 2.015 24 4.5 24h15c2.485 0 4.5-2.015 4.5-4.5V4.5C24 2.015 21.985 0 19.5 0zM9.75 16.5c0 .828-.672 1.5-1.5 1.5H5.25c-.828 0-1.5-.672-1.5-1.5V5.25c0-.828.672-1.5 1.5-1.5h3c.828 0 1.5.672 1.5 1.5v11.25zm10.5-5.25c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V5.25c0-.828.672-1.5 1.5-1.5h3c.828 0 1.5.672 1.5 1.5v6z" />
            </svg>
            <span className="font-heading font-bold text-base tracking-tight text-slate-700">
              Trello
            </span>
          </div>

          {/* Airtable */}
          <div className="flex items-center gap-2.5 grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-200">
            <svg className="w-6 h-6 fill-current text-slate-700" viewBox="0 0 24 24">
              <path d="M11.968 0L0 5.432v7.625l11.968 5.432 11.968-5.432V5.432L11.968 0zm-1.042 12.378L2.083 8.35v3.456l8.843 3.996v-3.424zm2.084 0v3.424l8.843-3.996V8.35l-8.843 4.028zM11.968 2.308l7.86 3.568-7.86 3.568-7.86-3.568 7.86-3.568z" />
            </svg>
            <span className="font-heading font-bold text-base tracking-tight text-slate-700">
              Airtable
            </span>
          </div>
        </div>

        {/* Centered Confidentiality Statement */}
        <h4 className="text-sm sm:text-base font-heading font-bold text-[#2E8540] flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#2E8540]" />
          <span>Your Business Information is Always 100% Confidential.</span>
        </h4>
      </div>
    </section>
  );
};
