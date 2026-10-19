import { useEffect, useRef } from 'react';

interface FadeInUpOptions {
  threshold?: number;
  rootMargin?: string;
  staggerMs?: number;
}

/**
 * Custom hook to observe major section containers and apply
 * 'reveal-fade-in-up' and 'is-visible' classes to create a polished,
 * staggered entrance effect as sections enter the viewport.
 */
export function useFadeInUp<T extends HTMLElement = HTMLDivElement>(
  options: FadeInUpOptions = {}
) {
  const containerRef = useRef<T | null>(null);
  const {
    threshold = 0.08,
    rootMargin = '0px 0px -40px 0px',
    staggerMs = 60,
  } = options;

  useEffect(() => {
    // Respect user's accessibility preference for reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll<HTMLElement>('.reveal-fade-in-up');
    if (sections.length === 0) return;

    if (prefersReducedMotion || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      sections.forEach((sec) => sec.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const explicitDelay = target.dataset.delay
              ? parseInt(target.dataset.delay, 10)
              : 0;

            if (explicitDelay > 0) {
              setTimeout(() => {
                target.classList.add('is-visible');
              }, explicitDelay);
            } else {
              target.classList.add('is-visible');
            }

            // Once visible, stop observing to optimize performance
            observer.unobserve(target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    sections.forEach((sec, idx) => {
      // Check if already in viewport on mount (e.g. above the fold hero)
      const rect = sec.getBoundingClientRect();
      const inViewportOnMount = rect.top < window.innerHeight && rect.bottom > 0;

      if (inViewportOnMount) {
        // Fast entrance for above-the-fold content
        const delay = idx === 0 ? 0 : Math.min(idx * staggerMs, 180);
        setTimeout(() => {
          sec.classList.add('is-visible');
        }, delay);
      } else {
        observer.observe(sec);
      }
    });

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
      observer.disconnect();
    };
  }, [threshold, rootMargin, staggerMs]);

  return containerRef;
}
