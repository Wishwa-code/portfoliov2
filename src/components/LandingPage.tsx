'use client';

import { getPosts } from '@/app/utils';
import { useEffect, useRef, useState } from 'react';
import styles from './LandingPage.module.scss';
import { useConfig } from '@/app/contexts/ConfigContext';
import TextPressure from  '@/reactbits/textPressure/textpressure';
import { Heading, Flex, Text, Button,  Avatar, RevealFx } from '@/once-ui/components';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { baseURL, routes, renderContent } from '@/app/resources'; 
import { Projects } from '@/components/work/Projects';



interface ProjectsProps {
  range?: [number, number?];
  locale: string;
}
export function LandingPage({ range, locale }: ProjectsProps) {

  // setRequestLocale(locale);
	const t = useTranslations();
	const { home, about, person, newsletter } = renderContent(t);

  const overlayRef = useRef<HTMLImageElement>(null);
  const overlayTextRef = useRef<HTMLImageElement>(null);
  const ladningImageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLImageElement>(null);
  const aboutemeButtontRef = useRef<HTMLImageElement>(null);


  const { config, setConfig } = useConfig();
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

  if (ladningImageRef.current && textRef.current && aboutemeButtontRef.current) {
  if (clampedScroll < unlockThreshold) {
    ladningImageRef.current.style.opacity = '1';
    textRef.current.style.opacity = '1';
    aboutemeButtontRef.current.style.opacity = '1'
  } else {
    // Step 1: Fade out
    ladningImageRef.current.style.opacity = '0';
    textRef.current.style.opacity = '0';
    aboutemeButtontRef.current.style.opacity = '0'

    // Step 2: After transition ends, change positioclean up
  }
}

  if (overlayTextRef.current && overlayRef.current) {
    if (translateY === 0) {
      textTimer = setTimeout(() => {
        if (overlayTextRef.current && ladningImageRef.current && overlayRef.current) {
          overlayTextRef.current.style.opacity = '1';
          overlayRef.current.style.opacity = '0';

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
    <>
    <Flex className={styles.landingImage}>
                  
      <Flex>
        <Flex 
         ref={textRef}
          direction="column"
          className={styles.landingNameContainer}>
            <Flex 
              style={{
                marginLeft:'8vw',
                marginTop: '26vh'
                    }}>
                <p > Wishwa </p>
            </Flex>
            <Flex className={styles.pressuretext}>
              <TextPressure
                text="Kankanamge"
                flex={false}
                alpha={false}
                stroke={false}
                width={false}
                weight={true}
                italic={true}
                textColor={config.style.theme === 'dark' ? "#ffffff" : "#000000"}
                strokeColor={config.style.theme === 'dark' ? "#ffffff" : "#000000"}
                minFontSize={146}
                scale={true}
              />
            </Flex>
            
        </Flex>
        <img 
        ref={ladningImageRef}
        src={config.style.theme === 'dark' ? "/images/sunrise.png" : "/images/sunrise.png"} 
        alt="Landing" 
        className={config.style.theme === 'dark' ? styles.coverImage : styles.coverImage2} />
      </Flex>
      
      <img
        ref={overlayRef}
        src={config.style.theme === 'dark' ? "/images/backdrop-dark.png" : "/images/backdrop.png"}
        alt="Overlay"
        className={styles.overlayImage}
      />
      <img
        ref={overlayTextRef}
        src={config.style.theme === 'dark' ? "/images/backdroptext.png" : "/images/backdrop-text-dark.png"}
        alt="OverlayText"
        className={styles.overlayText}
      />
      
    </Flex>
    <Flex 
      ref={aboutemeButtontRef}
      className={styles.aboutemebuutton}>
      <Button
        data-border="rounded"
        href={`/en/about`}
        variant="tertiary"
        suffixIcon="chevronRight"
        size="m">
        <Flex
          gap="8"
          alignItems="center">
          {about.avatar.display && (
            <Avatar
              style={{marginLeft: '-0.75rem', marginRight: '0.25rem'}}
              src={person.avatar}
              size="m"/>
            )}
            {t("about.title")}
        </Flex>
      </Button>
    </Flex>
    
    </>
  );
}


//just making a chage for git issuem 