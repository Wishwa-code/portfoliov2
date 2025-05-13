'use client';

import { getPosts } from '@/app/utils';
import { Flex } from '@/once-ui/components';
import { useEffect, useRef, useState } from 'react';
import styles from './LandingPage.module.scss';

interface ProjectsProps {
  range?: [number, number?];
  locale: string;
}

export function LandingPage({ range, locale }: ProjectsProps) {
  const overlayRef = useRef<HTMLImageElement>(null);
    const overlayTextRef = useRef<HTMLImageElement>(null);
      const ladningImageRef = useRef<HTMLImageElement>(null);


  const [scrollY, setScrollY] = useState(0);
  const [locked, setLocked] = useState(false);
  const [zoomOutStarted, setZoomOutStarted] = useState(false);
  const unlockThreshold = 300; // Where the zoom out ends
  const reZoomStart = 300;     // Where zooming back in starts on scroll up


  // Handle scroll position via native window scroll (includes dragging scroll bar)
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = Math.min(Math.max(window.scrollY, 0), 500);
      setScrollY(currentScroll);

      // Unlock page scrolling at end of zoom out
      if (currentScroll >= unlockThreshold && locked) {

        setLocked(false);
        setZoomOutStarted(true);
      }

      // Start zoom back in only if user scrolls back to a certain point
      if (currentScroll <= reZoomStart && !locked && zoomOutStarted) {

            setLocked(true);
            setZoomOutStarted(false); // reset zoom cycle
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [locked, zoomOutStarted]);

  // Apply image transformation based on scrollY
  useEffect(() => {
  const maxScroll = 500;
  const startScale = 20;
  const endScale = 1;
  const clampedScroll = Math.max(0, Math.min(scrollY, maxScroll));
  const progress = clampedScroll / maxScroll;
  const scale = startScale - (startScale - endScale) * progress;
  const translateY = -50 + 50 * progress;

  let fixedTimer: ReturnType<typeof setTimeout> | null = null;
  let textTimer: ReturnType<typeof setTimeout> | null = null;

  if (overlayRef.current) {
    overlayRef.current.style.transform = `translate(-50%, ${translateY}%) scale(${scale})`;
    overlayRef.current.style.opacity = clampedScroll > 30 ? '1' : '0';
  }

  if (ladningImageRef.current) {
  if (clampedScroll < unlockThreshold) {
    ladningImageRef.current.style.opacity = '1';
  } else {
    // Step 1: Fade out
    ladningImageRef.current.style.opacity = '0';

    // Step 2: After transition ends, change positioclean up
  }
}

  if (overlayTextRef.current ) {
    if (translateY === 0) {
      textTimer = setTimeout(() => {
        if (overlayTextRef.current && ladningImageRef.current) {
          overlayTextRef.current.style.opacity = '1';
          ladningImageRef.current.style.opacity = '0';
        }
      }, 300);
    } else {
      overlayTextRef.current.style.opacity = '0';
    }
  }

  // Clean up both timers
  return () => {
    if (fixedTimer) clearTimeout(fixedTimer);
    if (textTimer) clearTimeout(textTimer);
  };
}, [scrollY]);

  return (
    <Flex className={styles.landingImage}>
      <img 
      ref={ladningImageRef}
      src="/images/sunrise.png" alt="Landing" className={styles.coverImage} />
      <img
        ref={overlayRef}
        src="/images/backdrop.png"
        alt="Overlay"
        className={styles.overlayImage}
      />
      <img
        ref={overlayTextRef}
        src="/images/backdroptext.png"
        alt="OverlayText"
        className={styles.overlayText}
      />
    </Flex>
  );
}


// 'use client'
// import { getPosts } from '@/app/utils';
// import { Flex } from '@/once-ui/components';
// import { useEffect, useRef , useState} from 'react';
// import styles from './LandingPage.module.scss'


// interface ProjectsProps {
//     range?: [number, number?];
//     locale: string;
// }

// export function LandingPage({ range, locale }: ProjectsProps) {

//     const overlayRef = useRef<HTMLImageElement>(null);
//   const [scrollY, setScrollY] = useState(0);
//   const [locked, setLocked] = useState(true); 

//  useEffect(() => {
//     if (locked) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }

//     const handleWheel = (e: WheelEvent) => {
//       if (!locked) return;

//       e.preventDefault();
//       setScrollY((prev) => {
//         const next = Math.min(prev + e.deltaY, 500);
//         if (next >= 500) {
//           setLocked(false); // unlock scroll
//         }
//         return next;
//       });
//     };

//     window.addEventListener('wheel', handleWheel, { passive: false });
//     return () => {
//       window.removeEventListener('wheel', handleWheel);
//       document.body.style.overflow = ''; // cleanup
//     };
//   }, [locked]);

// useEffect(() => {
//   const maxScroll = 500;
//   const startScale = 50;
//   const endScale = 1;

//   const clampedScroll = Math.max(0, Math.min(scrollY, maxScroll));
//   const progress = clampedScroll / maxScroll;
//   const scale = startScale - (startScale - endScale) * progress;

//   if (overlayRef.current) {
//     overlayRef.current.style.transform = `translateX(-50%) scale(${scale})`;
//     overlayRef.current.style.opacity = clampedScroll > 30 ? '1' : '0';
//   }
// }, [scrollY]);

//     return (
//     <Flex className={styles.landingImage}>
//       <img src="/images/sunrise.jpg" alt="Landing" className={styles.coverImage} />
//       <img
//         ref={overlayRef}
//         src="/images/backdrop.png"
//         alt="Overlay"
//         className={styles.overlayImage}
//       />
//     </Flex>
//     );
// }