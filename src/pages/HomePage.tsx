import React from 'react';
import { Hero } from '../components/Hero';
import { TrustStrip } from '../components/TrustStrip';
import { ProblemSection } from '../components/ProblemSection';
import { SolutionSection } from '../components/SolutionSection';
import { EcosystemSection } from '../components/EcosystemSection';
import { IndustrySection } from '../components/IndustrySection';
import { AIAgentsSection } from '../components/AIAgentsSection';
import { WhatsAppSection } from '../components/WhatsAppSection';
import { AuditSection } from '../components/AuditSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { UseCasesSection } from '../components/UseCasesSection';
import { ScenariosSection } from '../components/ScenariosSection';
import { TechEcosystemSection } from '../components/TechEcosystemSection';
import { ResourcesSection } from '../components/ResourcesSection';
import { FAQSection } from '../components/FAQSection';
import { FinalCTASection } from '../components/FinalCTASection';
import { TrustSignalsSection } from '../components/TrustSignalsSection';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import { useFadeInUp } from '../hooks/useFadeInUp';
import { PageTab, SiteSettings } from '../types';

interface HomePageProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenAudit: () => void;
  onOpenBooking: () => void;
  settings: SiteSettings;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  onOpenAudit,
  onOpenBooking,
  settings,
}) => {
  // Intersection Observer hook tracking section visibility with staggered entrance
  const containerRef = useFadeInUp<HTMLDivElement>({
    threshold: 0.06,
    rootMargin: '0px 0px -50px 0px',
    staggerMs: 60,
  });

  return (
    <div ref={containerRef} className="space-y-0 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="reveal-fade-in-up" data-delay="0">
        <Hero
          onOpenAudit={onOpenAudit}
          onOpenBooking={onOpenBooking}
          onExploreSolutions={() => {
            const el = document.getElementById('solutions');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          settings={settings}
        />
      </section>

      {/* 2. TRUST STRIP */}
      <section className="reveal-fade-in-up" data-delay="40">
        <TrustStrip />
      </section>

      {/* 3. PROBLEM SECTION */}
      <section id="problems" className="reveal-fade-in-up" data-delay="30">
        <ProblemSection onOpenAudit={onOpenAudit} />
      </section>

      {/* 4. SOLUTION SECTION */}
      <section id="solutions" className="reveal-fade-in-up" data-delay="30">
        <SolutionSection onOpenBooking={onOpenBooking} onOpenAudit={onOpenAudit} />
      </section>

      {/* 5. 360-DEGREE BUSINESS AUTOMATION ECOSYSTEM */}
      <section className="reveal-fade-in-up" data-delay="30">
        <EcosystemSection onOpenAudit={onOpenAudit} />
      </section>

      {/* 6. INDUSTRIES SECTION */}
      <section id="industries" className="reveal-fade-in-up" data-delay="30">
        <IndustrySection onOpenBooking={onOpenBooking} onOpenAudit={onOpenAudit} />
      </section>

      {/* 7. AI AGENTS SECTION */}
      <section id="agents" className="reveal-fade-in-up" data-delay="30">
        <AIAgentsSection onOpenBooking={onOpenBooking} onOpenAudit={onOpenAudit} />
      </section>

      {/* 8. WHATSAPP AUTOMATION SECTION */}
      <section className="reveal-fade-in-up" data-delay="30">
        <WhatsAppSection onOpenBooking={onOpenBooking} settings={settings} />
      </section>

      {/* 9. AI BUSINESS AUDIT TOOL */}
      <section id="audit" className="reveal-fade-in-up" data-delay="30">
        <AuditSection onOpenBooking={onOpenBooking} settings={settings} />
      </section>

      {/* 10. HOW IT WORKS (6-STAGE PIPELINE) */}
      <section id="how-it-works" className="reveal-fade-in-up" data-delay="30">
        <HowItWorksSection onOpenBooking={onOpenBooking} />
      </section>

      {/* 11. USE CASES (FILTERABLE) */}
      <section id="use-cases" className="reveal-fade-in-up" data-delay="30">
        <UseCasesSection onOpenBooking={onOpenBooking} />
      </section>

      {/* 12. AUTOMATION SCENARIOS */}
      <section className="reveal-fade-in-up" data-delay="30">
        <ScenariosSection onOpenBooking={onOpenBooking} />
      </section>

      {/* 13. TECHNOLOGY ECOSYSTEM */}
      <section className="reveal-fade-in-up" data-delay="30">
        <TechEcosystemSection />
      </section>

      {/* 14. CONTENT / RESOURCES */}
      <section id="resources" className="reveal-fade-in-up" data-delay="30">
        <ResourcesSection />
      </section>

      {/* 15. FAQ SECTION */}
      <section className="reveal-fade-in-up" data-delay="30">
        <FAQSection settings={settings} />
      </section>

      {/* 16. CLIENT TESTIMONIALS CAROUSEL */}
      <section className="reveal-fade-in-up" data-delay="30">
        <TestimonialCarousel
          onOpenBooking={onOpenBooking}
          onOpenAudit={onOpenAudit}
        />
      </section>

      {/* 17. FINAL CTA */}
      <section className="reveal-fade-in-up" data-delay="30">
        <FinalCTASection
          onOpenAudit={onOpenAudit}
          onOpenBooking={onOpenBooking}
          settings={settings}
        />
      </section>

      {/* 17. TRUST SIGNALS SECTION (BEFORE FOOTER) */}
      <section className="reveal-fade-in-up" data-delay="20">
        <TrustSignalsSection />
      </section>
    </div>
  );
};
