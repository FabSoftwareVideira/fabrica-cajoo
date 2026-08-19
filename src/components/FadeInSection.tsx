import React, { useEffect, useRef, useState } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // delay in ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
  once?: boolean;
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.15,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold, once]);

  // Initial transform based on direction
  const getDirectionClass = () => {
    if (isVisible) return 'translate-x-0 translate-y-0 opacity-100 scale-100';

    switch (direction) {
      case 'up':
        return 'translate-y-10 opacity-0 scale-[0.98]';
      case 'down':
        return '-translate-y-10 opacity-0 scale-[0.98]';
      case 'left':
        return 'translate-x-10 opacity-0';
      case 'right':
        return '-translate-x-10 opacity-0';
      case 'none':
        return 'opacity-0 scale-95';
      default:
        return 'translate-y-10 opacity-0';
    }
  };

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${getDirectionClass()} ${className}`}
    >
      {children}
    </div>
  );
};
