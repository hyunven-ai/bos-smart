'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ 
  children, 
  animation = 'fade-up', 
  delay = 0, 
  duration = 800 
}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Return early if IntersectionObserver is not supported
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          // Stop observing once revealed
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const styles = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
  };

  return (
    <div
      ref={ref}
      className={`reveal-el reveal-${animation} ${isRevealed ? 'revealed' : ''}`}
      style={styles}
    >
      {children}
    </div>
  );
}
