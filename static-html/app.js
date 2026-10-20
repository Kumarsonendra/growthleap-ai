/**
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