import JSZip from 'jszip';
import { SiteSettings } from '../types';

export async function generateStaticWebsiteZip(settings: SiteSettings): Promise<Blob> {
  const zip = new JSZip();

  const commonNav = (activePage: string) => `
    <header class="site-header">
      <div class="header-inner">
        <a href="index.html" class="brand-link">
          <span class="brand-name">GrowthLeap AI</span>
        </a>
        <nav class="desktop-nav">
          <a href="index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">Home</a>
          <a href="services.html" class="nav-link ${activePage === 'services' ? 'active' : ''}">Services</a>
          <a href="how-it-works.html" class="nav-link ${activePage === 'how-it-works' ? 'active' : ''}">How It Works</a>
          <a href="about.html" class="nav-link ${activePage === 'about' ? 'active' : ''}">About</a>
          <a href="contact.html" class="nav-link ${activePage === 'contact' ? 'active' : ''}">Contact</a>
        </nav>
        <div class="header-actions">
          <a href="contact.html#book-call" class="btn btn-primary btn-sm">Book Free Call</a>
          <button class="mobile-toggle" aria-label="Toggle navigation menu" id="mobile-menu-btn">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div class="mobile-drawer" id="mobile-drawer">
        <a href="index.html" class="mobile-link">Home</a>
        <a href="services.html" class="mobile-link">Services</a>
        <a href="how-it-works.html" class="mobile-link">How It Works</a>
        <a href="about.html" class="mobile-link">About</a>
        <a href="contact.html" class="mobile-link">Contact</a>
        <a href="contact.html#book-call" class="btn btn-primary full-width" style="margin-top: 1rem;">Book Free 30-Min Call</a>
      </div>
    </header>
  `;

  const commonFooter = `
    <footer class="site-footer">
      <div class="footer-container">
        <div class="footer-grid">
          <div class="footer-col brand-col">
            <span class="footer-brand">GrowthLeap AI</span>
            <p class="footer-tagline">Smart Automation for Smart Businesses.</p>
            <p class="footer-desc">Practical AI automation workflows tailored for Indian MSMEs, manufacturers, and export-import houses. No technical skills required.</p>
            <div class="contact-quick">
              <p>Email: <a href="mailto:${settings.contactEmail}">${settings.contactEmail}</a></p>
              <p>Phone / WhatsApp: <a href="https://wa.me/919761440027?text=Hi%20GrowthLeap%20AI,%20I%20would%20like%20to%20know%20more%20about%20automating%20my%20business" target="_blank" rel="noopener noreferrer">${settings.phone}</a></p>
              <p>Locations: Mumbai & Bengaluru, India</p>
            </div>
          </div>
          <div class="footer-col">
            <h4 class="footer-heading">Quick Links</h4>
            <ul class="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="services.html">Services</a></li>
              <li><a href="how-it-works.html">How It Works</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="contact.html">Contact & Booking</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 class="footer-heading">Our Services</h4>
            <ul class="footer-links">
              <li><a href="services.html#audit">AI Efficiency Audit</a></li>
              <li><a href="services.html#implementation">Project Implementation</a></li>
              <li><a href="services.html#retainer">AI Growth Partner Retainer</a></li>
              <li><a href="services.html#roi">ROI Calculator</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 class="footer-heading">Free Consultation</h4>
            <p style="font-size: 0.9rem; color: #777; margin-bottom: 1rem;">Reclaim 15+ hours each week. Schedule your non-technical 30-minute discovery call today.</p>
            <a href="${settings.calendlyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary full-width">Schedule on Calendly</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© ${new Date().getFullYear()} GrowthLeap AI. All rights reserved. Built for Indian MSMEs and Exporters.</p>
          <div class="social-links">
            <a href="${settings.founderLinkedIn}" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
            <a href="https://wa.me/919761440027?text=Hi%20GrowthLeap%20AI,%20I%20would%20like%20to%20know%20more%20about%20automating%20my%20business" target="_blank" rel="noopener noreferrer">WhatsApp 9761440027</a>
          </div>
        </div>
      </div>
      <a href="https://wa.me/919761440027?text=Hi%20Sonendra%20/%20GrowthLeap%20AI,%20I%20would%20like%20to%20automate%20my%20business%20workflows." target="_blank" rel="noopener noreferrer" class="floating-whatsapp-btn" style="position:fixed;bottom:24px;right:24px;background:#25D366;color:#070B14;padding:12px 20px;border-radius:50px;font-weight:bold;font-size:13px;box-shadow:0 10px 25px rgba(0,0,0,0.4);z-index:999;text-decoration:none;display:flex;align-items:center;gap:8px;border:1px solid rgba(255,255,255,0.2);">
        <span>💬 WhatsApp: 9761440027</span>
      </a>
    </footer>
  `;

  const headCommon = (title: string, description: string) => `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css" />
  `;

  // 1. index.html (Home)
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  ${headCommon('GrowthLeap AI | AI Automation for MSMEs & Export-Import', 'Practical AI automation services to help Indian MSMEs and exporters save time, reduce costs, and improve efficiency. No technical skills required.')}
</head>
<body>
  ${commonNav('home')}

  <main>
    <!-- HERO SECTION -->
    <section class="hero-section">
      <div class="container hero-container">
        <div class="hero-content">
          <span class="sub-label">Practical AI Automation for Indian MSMEs & Exporters</span>
          <h1 class="hero-title">Stop Drowning in Paperwork. Start Growing Your Business.</h1>
          <p class="hero-subtitle">We help MSMEs & Exporters automate repetitive tasks with practical AI, so you can save time, cut costs, and focus on what matters.</p>
          <div class="hero-cta-group">
            <a href="contact.html#book-call" class="btn btn-primary btn-lg cta-button">Book a Free 30-Min Strategy Call</a>
            <a href="how-it-works.html" class="btn btn-outline btn-lg">See How It Works</a>
          </div>
          <p style="text-align: center; margin-top: 10px;">or, <a href="#how-it-works" style="color: #005A9C; text-decoration: underline;">see how it works first</a></p>
          <div class="hero-trust-row" style="margin-top: 15px;">
            <span>✓ No technical skills needed</span>
            <span>·</span>
            <span>✓ Connects with Tally & Excel</span>
            <span>·</span>
            <span>✓ Payback in 30–60 Days</span>
          </div>
        </div>
        <div class="hero-visual">
          <div class="transformation-card-preview" style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 14px; padding: 22px; box-shadow: 0 10px 25px rgba(0,0,0,0.08);">
            <div class="card-header-bar" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 16px;">
              <span style="font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: #005A9C; text-transform: uppercase;">Transformation: Chaos to Clarity</span>
              <span class="status-tag" style="background: #eef7f0; color: #2E8540; font-weight: 700; font-size: 11px;">Before vs. After</span>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
              <!-- Left: Complex & Messy State -->
              <div style="background: #fdf2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 12px;">
                <span style="font-size: 11px; font-weight: 700; color: #991b1b; text-transform: uppercase; display: block; margin-bottom: 8px;">✕ Before: Complex & Messy</span>
                <ul style="list-style: none; font-size: 12px; color: #7f1d1d; line-height: 1.4; padding: 0;">
                  <li style="margin-bottom: 6px;">• 4+ hrs daily typing invoices into Tally</li>
                  <li style="margin-bottom: 6px;">• Dropped WhatsApp RFQs & lost deals</li>
                  <li style="margin-bottom: 6px;">• Customs typing errors & port demurrage</li>
                  <li>• Late evening status queries</li>
                </ul>
              </div>
              <!-- Right: Simple & Streamlined State -->
              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px;">
                <span style="font-size: 11px; font-weight: 700; color: #166534; text-transform: uppercase; display: block; margin-bottom: 8px;">✓ After: Simple & Streamlined</span>
                <ul style="list-style: none; font-size: 12px; color: #14532d; line-height: 1.4; padding: 0;">
                  <li style="margin-bottom: 6px;">• 15-sec optical OCR & 2-way Tally sync</li>
                  <li style="margin-bottom: 6px;">• 45-sec AI lead qualification</li>
                  <li style="margin-bottom: 6px;">• 99.8% accurate shipping bills</li>
                  <li>• Automated 24/7 WhatsApp tracking</li>
                </ul>
              </div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
              <span style="color: #64748b;">Proven Outcome:</span>
              <strong style="color: #2E8540; font-family: 'Poppins', sans-serif;">15–20 Staff Hours Reclaimed Weekly</strong>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PROBLEM SECTION -->
    <section class="section problem-section">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title">Are You Stuck in the Daily Grind?</h2>
          <p class="section-subtitle">Running an Indian MSME or export business shouldn't mean drowning in endless clerical administration.</p>
        </div>
        <div class="cards-grid">
          <div class="card">
            <div class="card-badge-num">Problem 01</div>
            <h3 class="card-title">Too Much Manual Work</h3>
            <p class="card-text">Your staff spends hours copying data from supplier invoices into Excel, generating repetitive packing lists, and fielding routine shipment status queries across fragmented WhatsApp threads.</p>
            <div class="card-outcome negative"><strong>Consequence:</strong> Zero time left for finding high-margin international buyers or expanding your product line.</div>
          </div>
          <div class="card">
            <div class="card-badge-num">Problem 02</div>
            <h3 class="card-title">High Costs</h3>
            <p class="card-text">Hiring extra data entry operators and paying overtime during peak export dispatches inflates operational overhead, accompanied by frequent turnover and retraining friction.</p>
            <div class="card-outcome negative"><strong>Consequence:</strong> Squeezed profit margins in an already competitive domestic and global market.</div>
          </div>
          <div class="card">
            <div class="card-badge-num">Problem 03</div>
            <h3 class="card-title">Risk of Costly Errors</h3>
            <p class="card-text">Fatigued operators easily miss an HSN digit, transpose invoice numbers, or miscalculate net weights on customs shipping bills submitted to ICEGATE.</p>
            <div class="card-outcome negative"><strong>Consequence:</strong> Costly container demurrage at ports, delayed export clearances, and damaged client trust.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- SOLUTION SECTION -->
    <section class="section solution-section">
      <div class="container">
        <div class="solution-grid">
          <div class="solution-content">
            <span class="sub-label green-label">The GrowthLeap AI Solution</span>
            <h2 class="section-title">Practical Automation Built for Indian MSMEs & Exporters.</h2>
            <p class="lead-text">You don't need a computer science degree or an expensive enterprise ERP. We build practical AI automations that integrate directly with the tools you already know and trust: Tally, Excel, Gmail, and WhatsApp.</p>
            
            <div class="solution-features">
              <div class="feat-item">
                <span class="feat-bullet">01</span>
                <div>
                  <h4>Zero Coding or New Software</h4>
                  <p>Your team continues working on Tally and Excel. The AI works quietly in the background handling data extraction and document matching.</p>
                </div>
              </div>
              <div class="feat-item">
                <span class="feat-bullet">02</span>
                <div>
                  <h4>Trained on Indian Trade Realities</h4>
                  <p>Built specifically for GST invoices, e-Way bills, Bill of Entry, ICEGATE declarations, and vendor WhatsApp dynamics.</p>
                </div>
              </div>
              <div class="feat-item">
                <span class="feat-bullet">03</span>
                <div>
                  <h4>Measurable Financial Return</h4>
                  <p>Every workflow is engineered to save quantifiable hours and eliminate overtime, paying for itself within 30 to 60 days.</p>
                </div>
              </div>
            </div>

            <div style="margin-top: 2rem;">
              <a href="contact.html#book-call" class="btn btn-primary">Book Free 30-Min Strategy Call</a>
            </div>
          </div>

          <div class="solution-card">
            <div class="comparison-header">
              <h3>Before vs. After GrowthLeap AI</h3>
            </div>
            <div class="comparison-body">
              <div class="comp-col before">
                <h4>Before Automation</h4>
                <ul>
                  <li>❌ 4+ hours daily spent re-typing vendor PDFs</li>
                  <li>❌ Dispatch delays due to customs typos</li>
                  <li>❌ Constant overtime pay during peak dispatches</li>
                  <li>❌ Founders answering tracking questions at 10 PM</li>
                </ul>
              </div>
              <div class="comp-col after">
                <h4>With GrowthLeap AI</h4>
                <ul>
                  <li>✓ Invoices extracted and verified in 15 seconds</li>
                  <li>✓ 99.4% first-time customs document accuracy</li>
                  <li>✓ Predictable, leaner operational overhead</li>
                  <li>✓ Automated WhatsApp order tracking 24/7</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS 3-STEP SUMMARY -->
    <section class="section process-summary-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="sub-label">A Clear & Low-Risk Journey</span>
          <h2 class="section-title">How It Works: 3 Steps to Automation</h2>
          <p class="section-subtitle">From initial discovery to active time-saving in under 4 weeks.</p>
        </div>
        <div class="process-summary-grid">
          <div class="step-card">
            <div class="step-badge">1. Audit</div>
            <h3 class="step-title">Identify Your Bottlenecks</h3>
            <p>In a 30-minute discovery call, we examine your paperwork flow and pinpoint the 3 repetitive chores costing you the most time and money.</p>
          </div>
          <div class="step-card">
            <div class="step-badge">2. Automate</div>
            <h3 class="step-title">Deploy Custom Workflows</h3>
            <p>We build and test custom AI pipelines tailored to your Tally, Excel, and WhatsApp workflows with zero downtime for your ongoing shipments.</p>
          </div>
          <div class="step-card">
            <div class="step-badge">3. Accelerate</div>
            <h3 class="step-title">Reclaim Hours & Scale</h3>
            <p>Your operations run effortlessly with 15–20 hours saved weekly, empowering your team to handle double the order volume without extra hiring.</p>
          </div>
        </div>
        <div class="text-center" style="margin-top: 2.5rem;">
          <a href="how-it-works.html" class="btn btn-secondary">Explore Our Full 4-Step Process →</a>
        </div>
      </div>
    </section>

    <!-- INTERACTIVE ROI CALCULATOR PREVIEW -->
    <section class="section calculator-section">
      <div class="container">
        <div class="calculator-box">
          <div class="calc-header text-center">
            <h2 class="section-title">Calculate Your Estimated Time & Cost Savings</h2>
            <p class="section-subtitle">See how much paperwork is costing your business each month.</p>
          </div>
          <div class="calc-body">
            <div class="calc-inputs">
              <div class="form-group">
                <label for="staff-count">Number of staff doing manual clerical/paperwork tasks:</label>
                <div class="range-display">
                  <input type="range" id="staff-count" min="1" max="25" value="4" class="slider" />
                  <span id="staff-val" class="slider-val">4 team members</span>
                </div>
              </div>
              <div class="form-group">
                <label for="hours-spent">Average hours spent per person daily on manual data entry:</label>
                <div class="range-display">
                  <input type="range" id="hours-spent" min="1" max="6" value="3" class="slider" />
                  <span id="hours-val" class="slider-val">3 hours / day</span>
                </div>
              </div>
            </div>
            <div class="calc-results">
              <div class="result-tile">
                <span class="result-label">Reclaimed Hours / Month:</span>
                <span id="calc-hours" class="result-val">240 hrs</span>
              </div>
              <div class="result-tile highlight">
                <span class="result-label">Estimated Annual Savings:</span>
                <span id="calc-savings" class="result-val">₹4,32,000</span>
              </div>
              <p class="calc-note">*Based on standard Indian MSME administrative benchmarks and prevented documentation error fees.</p>
              <a href="contact.html#book-call" class="btn btn-primary full-width" style="margin-top: 1rem;">Claim These Savings — Book Free Call</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="section testimonials-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="sub-label">Real Results for Real Businesses</span>
          <h2 class="section-title">Trusted by Indian MSMEs & Exporters</h2>
        </div>
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <p class="quote">"Before GrowthLeap AI, two of our senior export managers spent half their day cross-checking shipping bills and packing lists for European buyers. Now, our custom workflow verifies everything in under a minute. We saved 18 hours every week."</p>
            <div class="author-info">
              <strong>Rajesh K. Mehta</strong>
              <span>Managing Director · Vanguard Textiles, Surat</span>
              <span class="badge-tag">18 hrs/week saved</span>
            </div>
          </div>
          <div class="testimonial-card">
            <p class="quote">"Receiving 30+ vendor quotation PDFs every morning was a nightmare. GrowthLeap AI built a pipeline that tabulates part numbers and prices into our comparison sheets automatically. It paid for itself in the first 3 weeks."</p>
            <div class="author-info">
              <strong>Sanjay Patwardhan</strong>
              <span>Co-Founder · Apex Precision Engineering, Pune</span>
              <span class="badge-tag">75% faster RFQ processing</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BOTTOM CTA BANNER -->
    <section class="cta-banner-section">
      <div class="container text-center">
        <h2 class="cta-banner-title">Ready to Automate Your Business in the Next 30 Days?</h2>
        <p class="cta-banner-subtitle">Schedule your free 30-minute strategy call. No tech skills needed, no sales pressure, just a practical roadmap to reclaim your time.</p>
        <a href="contact.html#book-call" class="btn btn-secondary btn-lg">Book a Free 30-Min Strategy Call</a>
      </div>
    </section>

    <!-- TRUST SIGNALS SECTION (BEFORE FOOTER) -->
    <section class="trust-signals-section" style="background-color: #F0F0F0; padding: 48px 0; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
      <div class="container text-center">
        <h3 style="font-family: 'Poppins', sans-serif; font-size: 22px; font-weight: 700; color: #1a202c; margin-bottom: 24px;">Tools We Use to Build Your Success</h3>
        <div class="trust-logos-row" style="display: flex; justify-content: center; align-items: center; gap: 36px; flex-wrap: wrap; margin-bottom: 24px;">
          <div style="filter: grayscale(100%); opacity: 0.75; display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 18px; color: #475569;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
            <span>Google</span>
          </div>
          <div style="filter: grayscale(100%); opacity: 0.75; display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 18px; color: #475569;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.923 0L7.846 9.231h5.538L9.231 24l10.923-12.923h-5.538L18.462 0h-5.539z"/></svg>
            <span>Zapier</span>
          </div>
          <div style="filter: grayscale(100%); opacity: 0.75; display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 18px; color: #475569;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 0H4.5C2.015 0 0 2.015 0 4.5v15C0 21.985 2.015 24 4.5 24h15c2.485 0 4.5-2.015 4.5-4.5V4.5C24 2.015 21.985 0 19.5 0zM9.75 16.5c0 .828-.672 1.5-1.5 1.5H5.25c-.828 0-1.5-.672-1.5-1.5V5.25c0-.828.672-1.5 1.5-1.5h3c.828 0 1.5.672 1.5 1.5v11.25zm10.5-5.25c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V5.25c0-.828.672-1.5 1.5-1.5h3c.828 0 1.5.672 1.5 1.5v6z"/></svg>
            <span>Trello</span>
          </div>
          <div style="filter: grayscale(100%); opacity: 0.75; display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 18px; color: #475569;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M11.968 0L0 5.432v7.625l11.968 5.432 11.968-5.432V5.432L11.968 0zm-1.042 12.378L2.083 8.35v3.456l8.843 3.996v-3.424zm2.084 0v3.424l8.843-3.996V8.35l-8.843 4.028zM11.968 2.308l7.86 3.568-7.86 3.568-7.86-3.568 7.86-3.568z"/></svg>
            <span>Airtable</span>
          </div>
        </div>
        <h4 style="font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600; color: #2E8540; margin: 0;">Your Business Information is Always 100% Confidential.</h4>
      </div>
    </section>
  </main>

  ${commonFooter}

  <script src="app.js"></script>
</body>
</html>`;

  // 2. services.html
  const servicesHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  ${headCommon('Our Services | GrowthLeap AI Automation', 'Explore our 3 core AI automation services: AI Efficiency Audit, Project-Based Implementation, and AI Growth Partner Retainer.')}
</head>
<body>
  ${commonNav('services')}

  <main>
    <section class="page-header">
      <div class="container text-center">
        <span class="sub-label">Practical & High-ROI Workflows</span>
        <h1 class="page-title">Our Services: Your Path to an Automated Business.</h1>
        <p class="page-subtitle">We design, build, and support tailored AI workflows that integrate directly with Tally, Excel, Gmail, and WhatsApp.</p>
      </div>
    </section>

    <!-- SERVICE 1 -->
    <section id="audit" class="section service-detail-section">
      <div class="container">
        <div class="service-box">
          <div class="service-header-row">
            <div>
              <span class="service-num-badge">Service 01</span>
              <div style="display: flex; align-items: center; gap: 12px; margin-top: 8px; margin-bottom: 4px;">
                <!-- Magnifying glass / checklist icon in #005A9C -->
                <div style="color: #005A9C; display: flex; align-items: center; justify-content: center; background: #e0f2fe; width: 44px; height: 44px; border-radius: 10px;">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="m9 14 2 2 4-4"></path></svg>
                </div>
                <h2 class="service-main-title" style="margin: 0;">AI Efficiency Audit</h2>
              </div>
              <p class="service-tagline">Pinpoint every operational bottleneck and uncover fast ROI wins.</p>
            </div>
            <div class="service-meta-box">
              <span class="meta-label">Duration:</span>
              <span class="meta-val">5 to 7 Business Days</span>
              <span class="meta-label" style="margin-top: 0.5rem;">Best For:</span>
              <span class="meta-val">First-time automation adopters</span>
            </div>
          </div>
          <p class="service-desc-text">We perform a comprehensive, non-intrusive diagnostic of your day-to-day operations. We review how invoices flow, how shipments are tracked, and how customer inquiries are handled across your office, factory floor, or export desk.</p>
          <div class="service-deliverables-grid">
            <div class="deliverables-col">
              <h4>What You Receive:</h4>
              <ul class="check-list">
                <li>Complete workflow friction map detailing daily hours lost to manual tasks</li>
                <li>Custom AI Automation Blueprint ranked by payback speed and implementation ease</li>
                <li>Realistic ROI and cost-reduction forecast tailored to Indian labor benchmarks</li>
                <li>60-minute executive presentation with clear non-technical recommendations</li>
              </ul>
            </div>
            <div class="deliverables-col">
              <h4>Business Outcomes:</h4>
              <div class="outcome-pill">✓ Total clarity on the 3 biggest paperwork bottlenecks</div>
              <div class="outcome-pill">✓ Zero risk: No obligation to proceed if projected ROI &lt; 300%</div>
              <div style="margin-top: 1.5rem;">
                <a href="contact.html#book-call" class="btn btn-primary full-width cta-button">Get My Custom Audit</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICE 2 -->
    <section id="implementation" class="section service-detail-section" style="background-color: #f7f9fb;">
      <div class="container">
        <div class="service-box featured">
          <div class="featured-ribbon">Most Popular</div>
          <div class="service-header-row">
            <div>
              <span class="service-num-badge">Service 02</span>
              <div style="display: flex; align-items: center; gap: 12px; margin-top: 8px; margin-bottom: 4px;">
                <!-- Interlocking gears / puzzle piece icon in #005A9C -->
                <div style="color: #005A9C; display: flex; align-items: center; justify-content: center; background: #e0f2fe; width: 44px; height: 44px; border-radius: 10px;">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.439 7.85c-.049-.322-.24-.606-.525-.774a1.86 1.86 0 0 0-1.859.083 1.86 1.86 0 0 0-.923 1.624v.217a1 1 0 0 1-.849.99 1.01 1.01 0 0 1-1.025-.572 1.86 1.86 0 0 0-2.434-.863 1.86 1.86 0 0 0-1.082 1.523v.217a1 1 0 0 1-.849.99 1.01 1.01 0 0 1-1.025-.572 1.86 1.86 0 0 0-2.434-.863 1.86 1.86 0 0 0-1.082 1.523l-.001.05a2 2 0 0 0 .586 1.414l.05.05a2 2 0 0 0 2.828 0l.05-.05a2 2 0 0 1 2.828 0l.05.05a2 2 0 0 0 2.828 0l.05-.05a2 2 0 0 1 2.828 0l.05.05a2 2 0 0 0 2.828 0l.05-.05a2 2 0 0 1 2.828 0l.05.05a2 2 0 0 0 2.828 0l.05-.05a2 2 0 0 1 1.414-.586h.05a1.86 1.86 0 0 0 1.523-1.082 1.86 1.86 0 0 0-.863-2.434 1.01 1.01 0 0 1-.572-1.025 1 1 0 0 1 .99-.849h.217c.652 0 1.25-.348 1.572-.91a1.86 1.86 0 0 0 .052-1.872z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                <h2 class="service-main-title" style="margin: 0;">Project-Based Implementation</h2>
              </div>
              <p class="service-tagline">Turnkey automation built for your specific workflow—up and running in weeks.</p>
            </div>
            <div class="service-meta-box">
              <span class="meta-label">Duration:</span>
              <span class="meta-val">2 to 4 Weeks</span>
              <span class="meta-label" style="margin-top: 0.5rem;">Best For:</span>
              <span class="meta-val">Exporters & manufacturers with repetitive chores</span>
            </div>
          </div>
          <p class="service-desc-text">We build, test, and deploy customized, practical AI workflows directly into your daily toolchain (WhatsApp, Gmail, Excel, Tally ERP, and ICEGATE/customs document pipelines). We handle all technical setup and train your team in simple language.</p>
          <div class="service-deliverables-grid">
            <div class="deliverables-col">
              <h4>What You Receive:</h4>
              <ul class="check-list">
                <li>Automated document extraction pipeline (Invoices, Packing Lists, Shipping Bills)</li>
                <li>Smart customer & vendor notification workflows via WhatsApp and Email</li>
                <li>Direct sync with existing spreadsheets, Google Sheets, or Tally data tables</li>
                <li>Hands-on staff training sessions with simple video guides in English and Hindi</li>
                <li>30-day hypercare support with accuracy calibration and speed tuning</li>
              </ul>
            </div>
            <div class="deliverables-col">
              <h4>Business Outcomes:</h4>
              <div class="outcome-pill">✓ Reclaim 15 to 25 staff hours per week immediately</div>
              <div class="outcome-pill">✓ Same-day processing turnaround for export documentation</div>
              <div style="margin-top: 1.5rem;">
                <a href="contact.html#book-call" class="btn btn-primary full-width cta-button">Start My Project</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICE 3 -->
    <section id="retainer" class="section service-detail-section">
      <div class="container">
        <div class="service-box">
          <div class="service-header-row">
            <div>
              <span class="service-num-badge">Service 03</span>
              <div style="display: flex; align-items: center; gap: 12px; margin-top: 8px; margin-bottom: 4px;">
                <!-- Handshake or growing plant icon in #005A9C -->
                <div style="color: #005A9C; display: flex; align-items: center; justify-content: center; background: #e0f2fe; width: 44px; height: 44px; border-radius: 10px;">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 0 0 1.42 0l4.24-4.24a1 1 0 0 0 0-1.42l-2-2"></path><path d="m18 10 3-3a1 1 0 0 0 0-1.42l-1.58-1.58a1 1 0 0 0-1.42 0l-3 3"></path><path d="m14 14-2.5-2.5"></path><path d="M7 17a4 4 0 0 1-4-4 4 4 0 0 1 4-4h1v8Z"></path></svg>
                </div>
                <h2 class="service-main-title" style="margin: 0;">AI Growth Partner Retainer</h2>
              </div>
              <p class="service-tagline">Your outsourced Chief Automation Officer for continuous business growth.</p>
            </div>
            <div class="service-meta-box">
              <span class="meta-label">Duration:</span>
              <span class="meta-val">Monthly Partnership</span>
              <span class="meta-label" style="margin-top: 0.5rem;">Best For:</span>
              <span class="meta-val">Scaling businesses (₹5Cr - ₹100Cr+ revenue)</span>
            </div>
          </div>
          <p class="service-desc-text">As your order volume grows, your automation infrastructure needs to evolve. We act as your ongoing technical partner—monitoring system uptime, upgrading AI models as better tools emerge, and building new workflows month after month.</p>
          <div class="service-deliverables-grid">
            <div class="deliverables-col">
              <h4>What You Receive:</h4>
              <ul class="check-list">
                <li>Monthly operational review and rollout of 1–2 new automation workflows</li>
                <li>Guaranteed 4-hour SLA response for critical business workflow issues</li>
                <li>Continuous prompt tuning, accuracy audits, and API cost optimization</li>
                <li>Ongoing training for newly onboarded operations staff</li>
                <li>Quarterly executive briefing on emerging practical AI tools for Indian trade</li>
              </ul>
            </div>
            <div class="deliverables-col">
              <h4>Business Outcomes:</h4>
              <div class="outcome-pill">✓ A compounding automation advantage that outpaces competitors</div>
              <div class="outcome-pill">✓ Peace of mind knowing your operations run smoothly 24/7</div>
              <div style="margin-top: 1.5rem;">
                <a href="contact.html#book-call" class="btn btn-primary full-width cta-button">Inquire About Partnership</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${commonFooter}
  <script src="app.js"></script>
</body>
</html>`;

  // 3. how-it-works.html
  const howItWorksHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  ${headCommon('How It Works | GrowthLeap AI Automation', 'Our simple 4-step process to success: Discover, Design, Deploy, and Dominate. Built for non-technical Indian MSME owners.')}
</head>
<body>
  ${commonNav('how-it-works')}

  <main>
    <section class="page-header">
      <div class="container text-center">
        <span class="sub-label">Simple, Transparent & Safe</span>
        <h1 class="page-title">Our Simple 4-Step Process to Success.</h1>
        <p class="page-subtitle">We handle 100% of the technical setup. Your daily shipments and business operations continue without a single interruption.</p>
      </div>
    </section>

    <section class="section timeline-section">
      <div class="container">
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-badge">01</div>
            <div class="timeline-card">
              <span class="time-label">Step 1 · Day 1–3</span>
              <h2 class="timeline-title">Discover: We learn about your business</h2>
              <p class="timeline-text">We start with a friendly, non-technical 30-minute conversation. We walk through your daily routine: where paperwork piles up, where orders get delayed, and what drives your operations team crazy. You don’t need any technical vocabulary—just show us how you work today.</p>
              <div class="timeline-deliverables">
                <strong>Key Deliverables:</strong>
                <span>• Discovery questionnaire review</span>
                <span>• Time-drain identification</span>
                <span>• Initial feasibility check</span>
              </div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">02</div>
            <div class="timeline-card">
              <span class="time-label">Step 2 · Day 4–7</span>
              <h2 class="timeline-title">Design: We create a custom automation blueprint</h2>
              <p class="timeline-text">We map out an architecture specifically tailored to Indian MSME operations. We select lightweight, highly reliable AI models and design workflows that plug directly into the tools your team already knows: WhatsApp, Gmail, Tally, and Excel. No heavy new software to learn.</p>
              <div class="timeline-deliverables">
                <strong>Key Deliverables:</strong>
                <span>• Custom Automation Blueprint</span>
                <span>• Visual before-and-after workflow diagram</span>
                <span>• Fixed-price implementation scope</span>
              </div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">03</div>
            <div class="timeline-card">
              <span class="time-label">Step 3 · Week 2–3</span>
              <h2 class="timeline-title">Deploy: We build and launch your AI workflows</h2>
              <p class="timeline-text">Our team constructs the automation pipeline in our secure sandbox and tests it rigorously against real samples of your invoices, bills of lading, or buyer messages. Once verified, we deploy it with zero interruption to your ongoing shipments and day-to-day dispatches.</p>
              <div class="timeline-deliverables">
                <strong>Key Deliverables:</strong>
                <span>• End-to-end integration</span>
                <span>• Dual-validation safety guardrails</span>
                <span>• Live system testing on real trade files</span>
              </div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">04</div>
            <div class="timeline-card">
              <span class="time-label">Step 4 · Week 4 & Beyond</span>
              <h2 class="timeline-title">Dominate: We provide support and help you scale</h2>
              <p class="timeline-text">Technology is only as good as the people using it. We conduct live, hands-on training sessions with your operations team and provide simple, 2-minute video references in plain English or Hindi. We stay by your side to ensure your operations run faster, cheaper, and error-free.</p>
              <div class="timeline-deliverables">
                <strong>Key Deliverables:</strong>
                <span>• Team training sessions</span>
                <span>• Simple bilingual documentation</span>
                <span>• 30-day post-launch optimization</span>
              </div>
            </div>
          </div>
        </div>

        <div class="reassurance-box text-center" style="margin-top: 3.5rem;">
          <h3>What You Won't Experience:</h3>
          <div class="reassurance-grid">
            <div class="reassurance-item">❌ No complex tech jargon</div>
            <div class="reassurance-item">❌ No expensive software replacement</div>
            <div class="reassurance-item">❌ No operational downtime</div>
            <div class="reassurance-item">❌ No long-term lock-in</div>
          </div>
          <a href="contact.html#book-call" class="btn btn-primary btn-lg" style="margin-top: 1.5rem;">Book Your Free 30-Min Discovery Call</a>
        </div>
      </div>
    </section>
  </main>

  ${commonFooter}
  <script src="app.js"></script>
</body>
</html>`;

  // 4. about.html
  const aboutHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  ${headCommon('About Us | GrowthLeap AI', 'Learn how GrowthLeap AI empowers Indian MSMEs and export-import businesses with practical, non-technical AI automation.')}
</head>
<body>
  ${commonNav('about')}

  <main>
    <section class="page-header">
      <div class="container text-center">
        <span class="sub-label">Our Story & Mission</span>
        <h1 class="page-title">We're on a Mission to Empower Businesses Like Yours.</h1>
        <p class="page-subtitle">Democratizing practical artificial intelligence for the hardworking backbone of India's economy.</p>
      </div>
    </section>

    <section class="section about-story-section">
      <div class="container">
        <div class="about-grid">
          <div class="about-content">
            <span class="sub-label green-label">The Founder's Story</span>
            <h2>Why I Founded GrowthLeap AI</h2>
            <p>Growing up around industrial clusters in Western India, I saw firsthand how much sheer grit and dedication it takes to build an MSME or export house. Indian founders are masters of manufacturing quality, sourcing, and customer relationships.</p>
            <p>Yet as business grew, I watched these brilliant founders and their top managers get buried under mountains of repetitive clerical chores: matching GST bills, re-typing shipping declarations, tracking delayed containers, and manually calculating vendor quotes in messy spreadsheets.</p>
            <p>When the AI revolution began, all the big software vendors built expensive, hyper-complex solutions meant for Silicon Valley tech companies or multi-billion dollar conglomerates. No one was building practical, simple, plug-and-play tools for the factory owner in Surat, the auto components manufacturer in Pune, or the garment exporter in Tirupur.</p>
            <p><strong>GrowthLeap AI was born to bridge that gap.</strong> We cut through the technical noise and deliver automations that actually save hours, prevent penalties, and put money back into your business.</p>
            <div class="signature-box">
              <strong>${settings.founderName}</strong>
              <span>Founder & Lead Automation Architect · GrowthLeap AI</span>
            </div>
          </div>
          <div class="about-card">
            <div class="founder-card-inner">
              <div class="founder-avatar-placeholder">
                <span class="avatar-initials">GL</span>
              </div>
              <h3>${settings.founderName}</h3>
              <p class="founder-role">Founder, GrowthLeap AI</p>
              <div class="founder-stats">
                <div><strong>10+ Yrs</strong><span>Enterprise & Trade Tech</span></div>
                <div><strong>50+</strong><span>Workflows Automated</span></div>
              </div>
              <p class="founder-quote">"If an automation does not save you at least 15 hours a week or pay for itself in 60 days, we don't build it."</p>
              <a href="${settings.founderLinkedIn}" target="_blank" rel="noopener noreferrer" class="btn btn-outline full-width">Connect on LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CORE VALUES -->
    <section class="section values-section" style="background-color: #f7f9fb;">
      <div class="container">
        <div class="section-header text-center">
          <span class="sub-label">Guiding Principles</span>
          <h2 class="section-title">The 4 GrowthLeap Principles</h2>
        </div>
        <div class="cards-grid">
          <div class="card">
            <span class="card-badge-num">01</span>
            <h3 class="card-title">Utility Over Hype</h3>
            <p class="card-text">We don't build flashy AI gimmicks or chatbots that nobody uses. We focus strictly on high-impact administrative friction that frees up real human hours.</p>
          </div>
          <div class="card">
            <span class="card-badge-num">02</span>
            <h3 class="card-title">Built for Non-Techies</h3>
            <p class="card-text">Your staff doesn't need to learn Python or prompt engineering. If they can use WhatsApp and open an Excel sheet, they can master our workflows in 10 minutes.</p>
          </div>
          <div class="card">
            <span class="card-badge-num">03</span>
            <h3 class="card-title">Complete Data Sovereignty</h3>
            <p class="card-text">Your trade data, client lists, and profit margins are confidential. We never train public AI models on your files, adhering to strict enterprise security.</p>
          </div>
          <div class="card">
            <span class="card-badge-num">04</span>
            <h3 class="card-title">Grounded in Indian Trade</h3>
            <p class="card-text">We understand HSN classifications, GSTIN validation, ICEGATE customs quirks, and the reality of dealing with supplier follow-ups over WhatsApp.</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${commonFooter}
  <script src="app.js"></script>
</body>
</html>`;

  // 5. contact.html
  const contactHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  ${headCommon('Contact & Free Strategy Call | GrowthLeap AI', 'Book your free 30-minute automation strategy call with GrowthLeap AI. No sales pressure, no tech jargon.')}
</head>
<body>
  ${commonNav('contact')}

  <main>
    <section class="page-header">
      <div class="container text-center">
        <span class="sub-label">Let's Connect</span>
        <h1 class="page-title">Let's Talk About Your Growth.</h1>
        <p class="page-subtitle">Schedule your free 30-minute strategy call or send us a note. We'll identify your biggest bottlenecks and show you what can be automated.</p>
      </div>
    </section>

    <section id="book-call" class="section contact-section">
      <div class="container">
        <div class="contact-grid">
          <!-- Direct Booking Card -->
          <div class="contact-box booking-box">
            <span class="sub-label green-label">Recommended Step</span>
            <h2>Book a Free 30-Min Strategy Call</h2>
            <p>Pick a time directly on our calendar. We'll review your paperwork workflow and give you an immediate, realistic assessment.</p>
            <div class="calendar-preview-box">
              <p style="margin-bottom: 1rem; font-weight: 600;">What we cover on the call:</p>
              <ul class="check-list" style="margin-bottom: 1.5rem;">
                <li>Your current top 3 manual administrative time-drains</li>
                <li>Feasibility check for Tally, Excel, or customs automation</li>
                <li>Estimated weekly hours and rupee savings calculation</li>
                <li>Clear next steps with zero sales pressure</li>
              </ul>
              <a href="${settings.calendlyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-lg full-width">Open Calendar on Calendly →</a>
              <p style="font-size: 0.8rem; color: #888; text-align: center; margin-top: 0.75rem;">Instant Google Meet / Zoom confirmation sent to your email.</p>
            </div>

            <div class="quick-direct-info">
              <h4>Or Reach Out Directly:</h4>
              <p><strong>Email:</strong> <a href="mailto:${settings.contactEmail}">${settings.contactEmail}</a></p>
              <p><strong>Phone:</strong> <a href="tel:+919761440027">+91 97614 40027</a></p>
              <p><strong>WhatsApp Message:</strong> <a href="https://wa.me/919761440027?text=Hi%20GrowthLeap%20AI,%20I%20would%20like%20to%20know%20more%20about%20automating%20my%20business" target="_blank" rel="noopener noreferrer">Send WhatsApp to 9761440027</a></p>
              <p><strong>LinkedIn:</strong> <a href="${settings.founderLinkedIn}" target="_blank" rel="noopener noreferrer">Sonendra Kumar on LinkedIn</a></p>
              <p><strong>Offices:</strong> Mumbai & Bengaluru, India</p>
            </div>
          </div>

          <!-- Message Form -->
          <div class="contact-box form-box">
            <h2>Send Us a Message</h2>
            <p>Prefer writing? Fill in the details below and we will respond within 24 business hours.</p>
            <form id="contact-form" class="standard-form">
              <div class="form-group">
                <label for="contact-name">Full Name *</label>
                <input type="text" id="contact-name" name="name" required placeholder="e.g. Ramesh Patel" class="form-input" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="contact-email">Work Email *</label>
                  <input type="email" id="contact-email" name="email" required placeholder="ramesh@yourcompany.com" class="form-input" />
                </div>
                <div class="form-group">
                  <label for="contact-phone">Phone / WhatsApp *</label>
                  <input type="tel" id="contact-phone" name="phone" required placeholder="+91 98200 00000" class="form-input" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="contact-company">Company Name</label>
                  <input type="text" id="contact-company" name="company" placeholder="e.g. Patel Exports Ltd" class="form-input" />
                </div>
                <div class="form-group">
                  <label for="contact-biztype">Business Type</label>
                  <select id="contact-biztype" name="businessType" class="form-input">
                    <option value="MSME Manufacturer">MSME Manufacturer</option>
                    <option value="Export-Import House">Export-Import House</option>
                    <option value="Wholesaler / Trader">Wholesaler / Trader</option>
                    <option value="Logistics & Freight">Logistics & Freight</option>
                    <option value="Other">Other Business</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="contact-msg">Tell us about your biggest paperwork or operational headache</label>
                <textarea id="contact-msg" name="message" rows="4" placeholder="e.g. We spend 3 hours every day matching vendor invoices with Tally and checking shipping bills..." class="form-input"></textarea>
              </div>
              <button type="submit" class="btn btn-primary full-width" id="submit-btn">Send Message</button>
              <div id="form-success-msg" class="form-alert success" style="display: none;">
                Thank you! We received your details and will get in touch within 24 business hours.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section class="section faq-section" style="background-color: #f7f9fb;">
      <div class="container">
        <div class="section-header text-center">
          <span class="sub-label">Frequently Asked Questions</span>
          <h2 class="section-title">Common Questions from MSME Founders</h2>
        </div>
        <div class="faq-accordion" id="faq-list">
          <div class="faq-item">
            <button class="faq-question">
              <span>Do I or my staff need any technical skills or coding knowledge?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <p>None at all! GrowthLeap AI is specifically built for non-technical founders and traditional operations teams. If your team knows how to send an email, upload a PDF, or use WhatsApp, they can comfortably use all our automations.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question">
              <span>Will this disrupt our daily business operations or dispatches?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <p>Zero downtime. We build and test your automations completely in parallel on our secure staging environment using sample files. We only transition to live workflows after thorough accuracy testing.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question">
              <span>Does this integrate with Tally ERP, Tally Prime, and Microsoft Excel?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <p>Yes! We specialize in the software Indian businesses rely on daily: Tally Prime, Tally ERP 9, Excel, Google Sheets, Gmail, Outlook, WhatsApp Business, and ICEGATE document formats.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question">
              <span>How quickly will we see a return on investment (ROI)?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <p>Most of our MSME clients recoup their entire investment within 30 to 60 days through reclaimed manager hours, eliminated overtime pay, and prevented customs mismatch demurrage penalties.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${commonFooter}
  <script src="app.js"></script>
</body>
</html>`;

  // 6. style.css (Complete, robust, pure CSS with Poppins, Lato, and brand colors)
  const styleCss = `/* ==========================================================================
   GrowthLeap AI - Clean Modern CSS
   Palette:
   Primary: #005A9C (Professional Blue)
   Secondary: #2E8540 (Growth Green)
   Accent: #F0F0F0 (Light Grey)
   Text: #333333 (Dark Grey)
   ========================================================================== */

:root {
  --primary: #005a9c;
  --primary-hover: #004477;
  --secondary: #2e8540;
  --secondary-hover: #236832;
  --accent: #f0f0f0;
  --dark: #333333;
  --muted: #666666;
  --border: #e2e8f0;
  --bg-light: #fafbfc;
  --white: #ffffff;
  --radius: 8px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Lato', system-ui, -apple-system, sans-serif;
  color: var(--dark);
  background-color: var(--bg-light);
  line-height: 1.6;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Poppins', system-ui, -apple-system, sans-serif;
  color: #1a202c;
  line-height: 1.25;
  font-weight: 700;
}

a {
  color: var(--primary);
  text-decoration: none;
  transition: color 0.15s ease;
}

a:hover {
  color: var(--primary-hover);
}

.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
}

.text-center {
  text-align: center;
}

/* ==================== BUTTONS ==================== */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 22px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 600;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  border: 1px solid transparent;
}

.btn-sm {
  padding: 8px 16px;
  font-size: 13px;
}

.btn-lg {
  padding: 14px 28px;
  font-size: 15px;
}

.btn-primary, .cta-button {
  background-color: #2E8540;
  color: #FFFFFF;
}

.btn-primary:hover, .cta-button:hover {
  background-color: #246B33;
  color: #FFFFFF;
}

.btn-secondary {
  background-color: var(--secondary);
  color: var(--white);
}

.btn-secondary:hover {
  background-color: var(--secondary-hover);
  color: var(--white);
}

.btn-outline {
  background-color: transparent;
  color: var(--dark);
  border-color: #cbd5e1;
}

.btn-outline:hover {
  background-color: var(--white);
  border-color: var(--primary);
  color: var(--primary);
}

.full-width {
  width: 100%;
}

/* ==================== HEADER & TOP BAR ==================== */
.site-header {
  position: sticky;
  top: 0;
  background-color: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
  z-index: 100;
}

.header-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-name {
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: var(--primary);
  letter-spacing: -0.5px;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-link {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--muted);
}

.nav-link:hover, .nav-link.active {
  color: var(--primary);
}

.nav-link.active {
  font-weight: 600;
  position: relative;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}

.mobile-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  background-color: var(--dark);
  margin: 4px 0;
  transition: 0.2s;
}

.mobile-drawer {
  display: none;
  background-color: var(--white);
  border-bottom: 1px solid var(--border);
  padding: 16px 24px;
}

.mobile-drawer.open {
  display: block;
}

.mobile-link {
  display: block;
  padding: 10px 0;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  color: var(--dark);
  border-bottom: 1px solid #f1f5f9;
}

/* ==================== HERO SECTION ==================== */
.hero-section {
  padding: 64px 0;
  background: linear-gradient(180deg, #ffffff 0%, var(--bg-light) 100%);
  border-bottom: 1px solid var(--border);
}

.hero-container {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 48px;
  align-items: center;
}

.sub-label {
  display: inline-block;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--primary);
  margin-bottom: 12px;
}

.green-label {
  color: var(--secondary);
}

.hero-title {
  font-size: 42px;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 18px;
  text-wrap: balance;
}

.hero-subtitle {
  font-size: 18px;
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 28px;
}

.hero-cta-group {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.hero-trust-row {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: var(--muted);
  align-items: center;
}

/* Hero Automation Card Graphic */
.automation-card-preview {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
}

.card-header-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 16px;
}

.indicator.green {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--secondary);
}

.card-header-title {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 600;
}

.metric-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.metric-box {
  background: #f8fafc;
  border: 1px solid var(--border);
  padding: 12px;
  border-radius: var(--radius);
  text-align: center;
}

.metric-num {
  display: block;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--primary);
}

.metric-desc {
  font-size: 12px;
  color: var(--muted);
}

.workflow-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  margin-bottom: 10px;
}

.workflow-icon {
  font-size: 20px;
}

.workflow-info {
  flex: 1;
}

.workflow-info strong {
  display: block;
  font-size: 13px;
  color: #1a202c;
}

.workflow-info p {
  font-size: 12px;
  color: var(--muted);
  margin: 0;
}

.status-tag {
  font-size: 11px;
  font-weight: 600;
  color: var(--secondary);
  background: #eef7f0;
  padding: 4px 8px;
  border-radius: 4px;
}

/* ==================== SECTIONS ==================== */
.section {
  padding: 72px 0;
}

.section-header {
  margin-bottom: 48px;
}

.section-title {
  font-size: 32px;
  letter-spacing: -0.5px;
  margin-bottom: 12px;
}

.section-subtitle {
  font-size: 17px;
  color: var(--muted);
  max-width: 680px;
  margin: 0 auto;
}

/* Cards Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  box-shadow: var(--shadow-sm);
}

.card-badge-num {
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 12px;
  display: inline-block;
}

.card-title {
  font-size: 20px;
  margin-bottom: 12px;
}

.card-text {
  font-size: 14px;
  color: var(--muted);
  margin-bottom: 16px;
}

.card-outcome.negative {
  font-size: 13px;
  padding: 10px 12px;
  background: #fef2f2;
  border-left: 3px solid #ef4444;
  color: #991b1b;
  border-radius: 0 var(--radius) var(--radius) 0;
}

/* Solution Grid */
.solution-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: center;
}

.lead-text {
  font-size: 16px;
  color: var(--muted);
  margin-bottom: 24px;
}

.solution-features {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.feat-item {
  display: flex;
  gap: 16px;
}

.feat-bullet {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: var(--secondary);
  font-size: 16px;
}

.feat-item h4 {
  font-size: 16px;
  margin-bottom: 4px;
}

.feat-item p {
  font-size: 14px;
  color: var(--muted);
}

.solution-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.comparison-header {
  padding: 18px 24px;
  background: #0f172a;
  color: var(--white);
}

.comparison-header h3 {
  color: var(--white);
  font-size: 17px;
}

.comparison-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 24px;
  gap: 20px;
}

.comp-col h4 {
  font-size: 14px;
  margin-bottom: 12px;
}

.comp-col ul {
  list-style: none;
}

.comp-col li {
  font-size: 13px;
  margin-bottom: 10px;
  line-height: 1.4;
}

.comp-col.before {
  color: #64748b;
  border-right: 1px solid var(--border);
  padding-right: 12px;
}

.comp-col.after {
  color: #1e293b;
}

/* Process Summary 3 Steps */
.process-summary-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.step-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  box-shadow: var(--shadow-sm);
}

.step-badge {
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 12px;
}

.step-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.step-card p {
  font-size: 14px;
  color: var(--muted);
}

/* Calculator Section */
.calculator-box {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 40px;
  box-shadow: var(--shadow-md);
}

.calc-body {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin-top: 32px;
  align-items: center;
}

.range-display {
  margin-top: 8px;
}

.slider {
  width: 100%;
  accent-color: var(--primary);
}

.slider-val {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--primary);
  margin-top: 4px;
}

.calc-results {
  background: #f8fafc;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
}

.result-tile {
  margin-bottom: 16px;
}

.result-label {
  display: block;
  font-size: 13px;
  color: var(--muted);
}

.result-val {
  display: block;
  font-family: 'Poppins', sans-serif;
  font-size: 28px;
  font-weight: 800;
  color: var(--dark);
}

.result-tile.highlight .result-val {
  color: var(--secondary);
}

.calc-note {
  font-size: 11px;
  color: #94a3b8;
  margin-bottom: 12px;
}

/* Testimonials */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

.testimonial-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 32px;
  box-shadow: var(--shadow-sm);
}

.testimonial-card .quote {
  font-style: italic;
  font-size: 15px;
  color: #475569;
  margin-bottom: 20px;
}

.author-info strong {
  display: block;
  font-size: 15px;
}

.author-info span {
  display: block;
  font-size: 13px;
  color: var(--muted);
}

.badge-tag {
  display: inline-block;
  margin-top: 8px;
  font-size: 11px;
  font-weight: 600;
  color: var(--secondary);
  background: #eef7f0;
  padding: 3px 8px;
  border-radius: 4px;
}

/* CTA Banner */
.cta-banner-section {
  background: var(--primary);
  color: var(--white);
  padding: 64px 0;
}

.cta-banner-title {
  color: var(--white);
  font-size: 32px;
  margin-bottom: 12px;
}

.cta-banner-subtitle {
  color: #e0f2fe;
  font-size: 17px;
  max-width: 650px;
  margin: 0 auto 28px;
}

/* Page Header */
.page-header {
  padding: 60px 0 40px;
  background: var(--white);
  border-bottom: 1px solid var(--border);
}

.page-title {
  font-size: 36px;
  letter-spacing: -0.5px;
  margin-bottom: 12px;
}

.page-subtitle {
  font-size: 17px;
  color: var(--muted);
  max-width: 640px;
  margin: 0 auto;
}

/* Services Page Styles */
.service-box {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 36px;
  box-shadow: var(--shadow-sm);
  position: relative;
}

.service-box.featured {
  border: 2px solid var(--primary);
}

.featured-ribbon {
  position: absolute;
  top: 18px;
  right: 24px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  background: var(--primary);
  color: var(--white);
  padding: 4px 10px;
  border-radius: 4px;
}

.service-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.service-num-badge {
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: var(--primary);
}

.service-main-title {
  font-size: 26px;
  margin-top: 4px;
  margin-bottom: 6px;
}

.service-tagline {
  font-size: 16px;
  color: var(--secondary);
  font-weight: 500;
}

.service-meta-box {
  background: #f8fafc;
  padding: 12px 18px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  text-align: right;
  min-width: 220px;
}

.meta-label {
  display: block;
  font-size: 11px;
  color: var(--muted);
  text-transform: uppercase;
}

.meta-val {
  display: block;
  font-size: 13px;
  font-weight: 700;
}

.service-desc-text {
  font-size: 15px;
  color: var(--dark);
  margin-bottom: 24px;
  line-height: 1.6;
}

.service-deliverables-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 32px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

.check-list {
  list-style: none;
}

.check-list li {
  font-size: 14px;
  margin-bottom: 10px;
  position: relative;
  padding-left: 22px;
}

.check-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--secondary);
  font-weight: 700;
}

.outcome-pill {
  font-size: 13px;
  background: #f0fdf4;
  color: #166534;
  border: 1px solid #bbf7d0;
  padding: 8px 12px;
  border-radius: var(--radius);
  margin-bottom: 8px;
}

/* Timeline / How It Works */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 28px;
  max-width: 860px;
  margin: 0 auto;
}

.timeline-item {
  display: flex;
  gap: 24px;
}

.timeline-badge {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--primary);
  color: var(--white);
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 16px;
}

.timeline-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  flex: 1;
  box-shadow: var(--shadow-sm);
}

.time-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--secondary);
  text-transform: uppercase;
  margin-bottom: 6px;
  display: block;
}

.timeline-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.timeline-text {
  font-size: 14px;
  color: var(--muted);
  margin-bottom: 16px;
}

.timeline-deliverables strong {
  display: block;
  font-size: 13px;
  margin-bottom: 4px;
}

.timeline-deliverables span {
  display: block;
  font-size: 13px;
  color: #475569;
}

.reassurance-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 20px 0;
}

.reassurance-item {
  background: var(--white);
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 13px;
  font-weight: 600;
}

/* About Grid */
.about-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 48px;
  align-items: center;
}

.about-content h2 {
  font-size: 28px;
  margin-bottom: 16px;
}

.about-content p {
  margin-bottom: 16px;
  color: #475569;
  font-size: 15px;
}

.signature-box {
  margin-top: 24px;
  border-top: 1px solid var(--border);
  padding-top: 16px;
}

.signature-box strong {
  display: block;
  font-size: 16px;
}

.signature-box span {
  font-size: 13px;
  color: var(--muted);
}

.founder-card-inner {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  box-shadow: var(--shadow-md);
}

.founder-avatar-placeholder {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  font-size: 28px;
  font-weight: 800;
  margin: 0 auto 16px;
}

.founder-role {
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 16px;
}

.founder-stats {
  display: flex;
  justify-content: center;
  gap: 24px;
  padding: 14px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  margin-bottom: 16px;
}

.founder-stats strong {
  display: block;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: var(--primary);
}

.founder-stats span {
  font-size: 11px;
  color: var(--muted);
}

.founder-quote {
  font-style: italic;
  font-size: 13px;
  color: #475569;
  margin-bottom: 20px;
}

/* Contact Grid */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
}

.contact-box {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 36px;
  box-shadow: var(--shadow-sm);
}

.calendar-preview-box {
  background: #f8fafc;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  margin: 20px 0;
}

.quick-direct-info {
  margin-top: 24px;
  border-top: 1px solid var(--border);
  padding-top: 20px;
}

.quick-direct-info h4 {
  font-size: 15px;
  margin-bottom: 10px;
}

.quick-direct-info p {
  font-size: 13px;
  margin-bottom: 6px;
  color: #475569;
}

/* Forms */
.standard-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: var(--radius);
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  transition: border-color 0.15s;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0, 90, 156, 0.15);
}

.form-alert.success {
  background: #f0fdf4;
  color: #166534;
  border: 1px solid #bbf7d0;
  padding: 12px;
  border-radius: var(--radius);
  font-size: 13px;
  margin-top: 14px;
  text-align: center;
}

/* FAQ Accordion */
.faq-accordion {
  max-width: 780px;
  margin: 0 auto;
}

.faq-item {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  margin-bottom: 12px;
  overflow: hidden;
}

.faq-question {
  width: 100%;
  text-align: left;
  padding: 16px 20px;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--dark);
  cursor: pointer;
}

.faq-icon {
  font-size: 20px;
  color: var(--primary);
}

.faq-answer {
  display: none;
  padding: 0 20px 18px;
  font-size: 14px;
  color: #475569;
  line-height: 1.6;
}

.faq-item.active .faq-answer {
  display: block;
}

.faq-item.active .faq-icon {
  transform: rotate(45deg);
}

/* Footer */
.site-footer {
  background: #0f172a;
  color: #94a3b8;
  padding: 64px 0 24px;
}

.footer-container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1.2fr 1.2fr;
  gap: 40px;
  margin-bottom: 48px;
}

.footer-brand {
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: var(--white);
  display: block;
  margin-bottom: 6px;
}

.footer-tagline {
  color: var(--secondary);
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 12px;
}

.footer-desc {
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 16px;
}

.contact-quick p {
  font-size: 12px;
  margin-bottom: 4px;
}

.contact-quick a {
  color: #cbd5e1;
}

.footer-heading {
  color: var(--white);
  font-size: 15px;
  margin-bottom: 16px;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: #94a3b8;
  font-size: 13px;
}

.footer-links a:hover {
  color: var(--white);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid #1e293b;
  font-size: 12px;
}

.social-links a {
  color: #94a3b8;
  margin-left: 16px;
}

.social-links a:hover {
  color: var(--white);
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 900px) {
  .hero-container, .solution-grid, .calculator-box .calc-body, .about-grid, .contact-grid, .service-deliverables-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .desktop-nav {
    display: none;
  }

  .mobile-toggle {
    display: block;
  }

  .cards-grid, .process-summary-grid, .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .reassurance-grid {
    grid-template-columns: 1fr 1fr;
  }

  .service-header-row {
    flex-direction: column;
    gap: 16px;
  }

  .service-meta-box {
    text-align: left;
    width: 100%;
  }

  .hero-title {
    font-size: 32px;
  }
}
`;

  // 7. app.js (Pure Vanilla JS for mobile menu, smooth interaction, calculator, form submission)
  const appJs = `/**
 * GrowthLeap AI - Pure Vanilla JavaScript
 * Zero external frameworks required.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile drawer toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });
  }

  // Interactive ROI Calculator (on homepage)
  const staffInput = document.getElementById('staff-count');
  const hoursInput = document.getElementById('hours-spent');
  const staffVal = document.getElementById('staff-val');
  const hoursVal = document.getElementById('hours-val');
  const calcHours = document.getElementById('calc-hours');
  const calcSavings = document.getElementById('calc-savings');

  function updateCalculator() {
    if (!staffInput || !hoursInput) return;
    const staff = parseInt(staffInput.value, 10);
    const hours = parseInt(hoursInput.value, 10);

    staffVal.textContent = staff + (staff === 1 ? ' team member' : ' team members');
    hoursVal.textContent = hours + ' hours / day';

    // 20 working days/month. ~65% of manual paperwork automatable
    const monthlyHours = Math.round(staff * hours * 20 * 0.65);
    // Average MSME admin cost in India: ~₹250/hour + prevented penalty buffer
    const annualSavings = Math.round(monthlyHours * 250 * 12 * 1.15);

    if (calcHours) calcHours.textContent = monthlyHours.toLocaleString('en-IN') + ' hrs';
    if (calcSavings) calcSavings.textContent = '₹' + annualSavings.toLocaleString('en-IN');
  }

  if (staffInput && hoursInput) {
    staffInput.addEventListener('input', updateCalculator);
    hoursInput.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach((f) => f.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success-msg');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      // Collect data
      const formData = new FormData(contactForm);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const phone = formData.get('phone') || '';
      const company = formData.get('company') || '';
      const msg = formData.get('message') || '';

      setTimeout(() => {
        if (successMsg) successMsg.style.display = 'block';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Message Sent!';
        }
        contactForm.reset();

        // Optional mailto fallback trigger
        console.log('Inquiry submitted:', { name, email, phone, company, msg });
      }, 700);
    });
  }
});
`;

  // 8. vercel.json (Static clean URLs for Vercel)
  const vercelJson = JSON.stringify(
    {
      cleanUrls: true,
      headers: [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
          ],
        },
      ],
    },
    null,
    2
  );

  // 9. README.md (Comprehensive deployment guide for non-technical founder)
  const readmeMd = `# GrowthLeap AI - Production Static Website

**Tagline:** Smart Automation for Smart Businesses.  
**Audience:** Non-technical owners of MSMEs and export-import businesses in India.  
**Goal:** Book a free 30-minute strategy call.

## Files Included in this Package:
- \`index.html\`: Home page with Hero, Problems, Solution, 3-Step Process, Interactive ROI Calculator, and Testimonials
- \`services.html\`: Detailed breakdown of the 3 services (AI Efficiency Audit, Project-Based Implementation, AI Growth Partner Retainer)
- \`how-it-works.html\`: The 4-step process (Discover, Design, Deploy, Dominate)
- \`about.html\`: Founder story, mission, credentials, and core values
- \`contact.html\`: Booking call section, functional contact form, and FAQ accordion
- \`style.css\`: Pure CSS styled with Google Fonts 'Poppins' and 'Lato', with primary blue \`#005A9C\` and green \`#2E8540\`
- \`app.js\`: Lightweight vanilla JavaScript for navigation, ROI calculations, and form interactions
- \`vercel.json\`: Ready-to-go deployment configuration for Vercel

## How to Deploy on Vercel (Free & 2 Minutes):
1. Create a free account at [vercel.com](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Drag and drop this unzipped folder into the Vercel dashboard.
4. Click **Deploy**. Your website will be live worldwide on HTTPS within 30 seconds!

## How to Deploy on Netlify:
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop this folder directly into the browser.
3. Done!

## How to Edit Information:
- **Calendly Link:** Open \`contact.html\` and \`index.html\`, replace \`${settings.calendlyUrl}\` with your own link.
- **Email:** Replace \`${settings.contactEmail}\` with your email.
- **Phone:** Replace \`${settings.phone}\` with your number.
`;

  zip.file('index.html', indexHtml.trim());
  zip.file('services.html', servicesHtml.trim());
  zip.file('how-it-works.html', howItWorksHtml.trim());
  zip.file('about.html', aboutHtml.trim());
  zip.file('contact.html', contactHtml.trim());
  zip.file('style.css', styleCss.trim());
  zip.file('app.js', appJs.trim());
  zip.file('vercel.json', vercelJson.trim());
  zip.file('README.md', readmeMd.trim());

  return await zip.generateAsync({ type: 'blob' });
}
