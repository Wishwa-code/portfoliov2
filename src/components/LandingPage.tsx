'use client'
import { getPosts } from '@/app/utils';
import { Flex } from '@/once-ui/components';
import { useEffect, useRef , useState} from 'react';
import styles from './LandingPage.module.scss'


interface ProjectsProps {
    range?: [number, number?];
    locale: string;
}

export function LandingPage({ range, locale }: ProjectsProps) {

    const overlayRef = useRef<HTMLImageElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [locked, setLocked] = useState(true); 

 useEffect(() => {
    if (locked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleWheel = (e: WheelEvent) => {
      if (!locked) return;

      e.preventDefault();
      setScrollY((prev) => {
        const next = Math.min(prev + e.deltaY, 500);
        if (next >= 500) {
          setLocked(false); // unlock scroll
        }
        return next;
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = ''; // cleanup
    };
  }, [locked]);

  useEffect(() => {
    const scale = Math.max(0.5, 1 - scrollY / 1000);
    if (overlayRef.current) {
      overlayRef.current.style.transform = `translateX(-50%) scale(${scale})`;
    }
  }, [scrollY]);

    return (
    <Flex className={styles.landingImage}>
      <img src="/images/sunrise.jpg" alt="Landing" className={styles.coverImage} />
      <img
        ref={overlayRef}
        src="/images/sunrise.jpg"
        alt="Overlay"
        className={styles.overlayImage}
      />
    </Flex>
    );
}