

'use client';

import React, { useEffect, useState, useRef, ReactNode } from 'react';
import { useConfig } from '@/app/contexts/ConfigContext';

type Props = {
  children: string;
};

export default function ScrollReveal({ children }: Props) {
  const words = children.split(/(\s+|\.)/g);
  const [revealedCount, setRevealedCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
    const { config, setConfig } = useConfig();
  

  const WORDS_PER_SCROLL = 4;

  const revealNextWord = () => {
    setRevealedCount((prev) => Math.min(prev + WORDS_PER_SCROLL, words.length));
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const handleScroll = (e: WheelEvent | TouchEvent) => {
      e.preventDefault();
      if (revealedCount < words.length) {
        revealNextWord();
      } else {
        document.body.style.overflow = '';
        window.removeEventListener('wheel', handleScroll as any);
        window.removeEventListener('touchmove', handleScroll as any);
      }
    };

    window.addEventListener('wheel', handleScroll as any, { passive: false });
    window.addEventListener('touchmove', handleScroll as any, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll as any);
      window.removeEventListener('touchmove', handleScroll as any);
    };
  }, [revealedCount, words.length]);

   

  return (
    <div
      ref={containerRef}
            style={{
        // minHeight: '40vh',
        height:'fit-content',
        display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: '0.1rem',
        // backgroundColor: '#ffffff',
      }}
    >
      <p 
      style={{
          fontSize: '1.7rem',
          lineHeight: '1.29',
          maxWidth: '48rem',
          // textAlign: 'center',
        }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            style={{
              color: i < revealedCount ? 
                   config.style.theme === 'dark' ? 
                      '#ffffff' : '#000000' 
                  : config.style.theme === 'dark' ? 
                      'var(--neutral-solid-weak)': 'var(--neutral-on-background-weak)',
                      
              transition: 'color 0.3s ease',
              marginRight: '0.01rem',
            }}
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
}
              // color: i < revealedCount ? '#000000' : 'var(--neutral-on-background-weak)',
