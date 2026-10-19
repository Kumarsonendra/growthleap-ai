import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Calendar,
  Layers,
  CheckCircle2,
  Building,
  MapPin,
  Pause,
  Play,
} from 'lucide-react';
import { CLIENT_TESTIMONIALS } from '../data/siteData';
import { TestimonialItem } from '../types';

interface TestimonialCarouselProps {
  onOpenBooking: () => void;
  onOpenAudit?: () => void;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  onOpenBooking,
  onOpenAudit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  // Available industries for filtering
  const industries = ['All', ...Array.from(new Set(CLIENT_TESTIMONIALS.map((t) => t.industry)))];

  const filteredTestimonials = selectedIndustry === 'All'
    ? CLIENT_TESTIMONIALS
    : CLIENT_TESTIMONIALS.filter((t) => t.industry === selectedIndustry);

  // Ensure current index is within bounds when filter changes
  useEffect(() => {
    if (currentIndex >= filteredTestimonials.length) {
      setCurrentIndex(0);
    }
  }, [selectedIndustry, filteredTestimonials.length, currentIndex]);

  // Autoplay timer
  useEffect(() => {
    if (!isAutoPlaying || filteredTestimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredTestimonials.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const activeTestimonial: TestimonialItem = filteredTestimonials[currentIndex] || CLIENT_TESTIMONIALS[0];

  return (
    <section id="testimonials" className="bg-[#070B14] py-20 lg:py-28 relative overflow-hidden border-b border-white/10 bg-grid-pattern">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#005A9C]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#2E8540]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-semibold tracking-wider uppercase">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>PROVEN COMMERCIAL IMPACT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
            Client Success Stories &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-emerald-400 to-[#2E8540]">
              Operational Breakthroughs.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Real outcomes from Indian MSMEs, manufacturers, and export-import houses who transformed manual paperwork bottlenecks into autonomous high-speed workflows.
          </p>

          {/* Industry Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => {
                  setSelectedIndustry(ind);
                  setCurrentIndex(0);
                }}
                className={`text-xs font-heading font-medium px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  selectedIndustry === ind
                    ? 'bg-[#2E8540] text-white shadow-md shadow-emerald-950/50 border border-emerald-400/40'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Showcase Container */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Active Testimonial Card */}
          <div className="bg-[#0D1527]/95 border border-white/15 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden transition-all duration-300">
            {/* Top decorative accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#005A9C] via-[#00F0FF] to-[#2E8540]" />

            {/* Background Watermark Quote Icon */}
            <Quote className="absolute right-6 top-8 w-24 h-24 sm:w-32 sm:h-32 text-white/5 pointer-events-none stroke-1" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
              {/* Left Column: Client Profile & Verified Tag */}
              <div className="lg:col-span-4 space-y-5 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
                {/* Avatar Initial with Ring */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl ${
                      activeTestimonial.avatarBgColor || 'bg-emerald-600'
                    } flex items-center justify-center text-white font-heading font-black text-xl sm:text-2xl shadow-lg shadow-black/40 border border-white/20`}
                  >
                    {activeTestimonial.avatarInitial}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-heading font-bold text-white text-base sm:text-lg">
                        {activeTestimonial.name}
                      </span>
                      {activeTestimonial.verifiedClient && (
                        <span title="Verified Client of GrowthLeap AI" className="inline-flex items-center">
                          <ShieldCheck
                            className="w-4 h-4 text-emerald-400 shrink-0"
                          />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-cyan-300 font-medium">
                      {activeTestimonial.role}
                    </p>
                    <p className="text-xs text-slate-300 font-medium flex items-center gap-1 mt-0.5">
                      <Building className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{activeTestimonial.company}</span>
                    </p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span>{activeTestimonial.location}</span>
                    </p>
                  </div>
                </div>

                {/* Impact Metric Banner */}
                <div className="bg-gradient-to-br from-emerald-950/60 to-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>MEASURED OUTCOME</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-heading font-black text-emerald-400 tracking-tight">
                    {activeTestimonial.highlightMetric}
                  </div>
                  <div className="text-[11px] text-slate-300 font-medium">
                    Verified ROI benchmark achieved within 30 days
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-semibold">
                    5.0 / 5.0
                  </span>
                </div>
              </div>

              {/* Right Column: Headline, Quote & Workflows Deployed */}
              <div className="lg:col-span-8 space-y-6">
                {/* Headline */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-1 rounded font-semibold inline-block">
                    {activeTestimonial.industry}
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-[26px] font-heading font-extrabold text-white tracking-tight leading-snug">
                    "{activeTestimonial.headline}"
                  </h3>
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal italic bg-white/5 border border-white/5 rounded-2xl p-5 sm:p-6">
                  {activeTestimonial.quote}
                </p>

                {/* Workflows Deployed Chips */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Engineered Solutions in Production:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeTestimonial.workflowsDeployed.map((wf, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 text-xs text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg transition-colors font-medium"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#2E8540]" />
                        <span>{wf}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA inside card */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={onOpenBooking}
                    className="cta-button py-2.5 px-5 bg-[#2E8540] hover:bg-[#246B33] text-white font-heading font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-white" />
                    <span>Replicate This for Your Business</span>
                  </button>

                  {onOpenAudit && (
                    <button
                      onClick={onOpenAudit}
                      className="py-2.5 px-4 bg-white/5 hover:bg-white/10 text-white font-heading font-semibold text-xs rounded-xl border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Check Your Own Audit Score</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Navigation Controls */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {filteredTestimonials.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all rounded-full cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 h-2.5 bg-gradient-to-r from-[#00F0FF] to-[#2E8540]'
                      : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${item.name}`}
                />
              ))}
            </div>

            {/* Prev / PlayPause / Next Button Controls */}
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono text-slate-400 mr-2">
                {currentIndex + 1} / {filteredTestimonials.length}
              </span>

              {/* Pause / Resume Autoplay */}
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                title={isAutoPlaying ? 'Pause automatic slideshow' : 'Play automatic slideshow'}
                aria-label={isAutoPlaying ? 'Pause autoplay' : 'Resume autoplay'}
              >
                {isAutoPlaying ? (
                  <Pause className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Play className="w-4 h-4 text-slate-300" />
                )}
              </button>

              {/* Previous */}
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer hover:border-cyan-500/40"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Next */}
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer hover:border-cyan-500/40"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Thumbnails / Stories Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {filteredTestimonials.map((t, index) => (
              <button
                key={t.id}
                onClick={() => setCurrentIndex(index)}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                  currentIndex === index
                    ? 'bg-gradient-to-b from-[#11203A] to-[#0A1325] border-cyan-400/60 shadow-lg shadow-cyan-950/40'
                    : 'bg-[#0D1527]/60 border-white/10 hover:border-white/20 hover:bg-[#0D1527]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className={`w-6 h-6 rounded-md ${
                      t.avatarBgColor || 'bg-emerald-600'
                    } flex items-center justify-center text-white text-[10px] font-bold`}
                  >
                    {t.avatarInitial}
                  </div>
                  <span className="text-xs font-heading font-bold text-white truncate">
                    {t.name.split(' ')[0]}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-emerald-400 font-bold truncate">
                  {t.highlightMetric}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {t.company.split(' ')[0]}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
