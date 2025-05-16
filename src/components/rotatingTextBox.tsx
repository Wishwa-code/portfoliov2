'use client';

import { getPosts } from '@/app/utils';
import { useEffect, useRef, useState } from 'react';
import { useConfig } from '@/app/contexts/ConfigContext';
import  RotatingText  from  '@/reactbits/rotatingText/rotatingText';
import { Heading, Flex, Text, Button,  Avatar, RevealFx } from '@/once-ui/components';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { baseURL, routes, renderContent } from '@/app/resources'; 
import { Projects } from '@/components/work/Projects';
import styles from '@/components/about/about.module.scss'




interface ProjectsProps {
  range?: [number, number?];
  locale: string;
}
export function RotatingTextBox({ range, locale }: ProjectsProps) {

	const t = useTranslations();
	const { home, about, person, newsletter } = renderContent(t);
  const { config, setConfig } = useConfig();
  const [title, setTitle] = useState<string>(home.title);
  const [adjective, setAdjective] = useState<string>('Creative');


  useEffect(() => {
    let updatedAdjective = 'Creative';

    // Example logic - update this as needed
    if (title.toLowerCase().includes('thinker')) {
      updatedAdjective = 'Creative';
    } else if (title.toLowerCase().includes('engineer')) {
      updatedAdjective = 'Pragmetic';
    } else if (title.toLowerCase().includes('designer')) {
      updatedAdjective = 'Intuitive';
    } else if (title.toLowerCase().includes('architect')) {
      updatedAdjective = 'Strategic';
    }

    setAdjective(updatedAdjective);
  }, [title]);


  
  return (
    <Flex direction="row" gap="2" className="w-full h-full items-center justify-center">
        <Flex
        style={{
                  backdropFilter: 'blur(var(--static-space-1))',
                  width: 'fit-content',
                  borderRadius: 'var(--radius-s)',
                  paddingTop: 'var(--static-space-4)',
                  paddingRight: 'var(--static-space-8)',
                  fontFamily: 'var(--font-family-body)',
                  color:'var(--neutral-on-background-weak)',
                  fontSize: 'var(--font-size-display-xs)',
                  fontWeight: 'var(--font-weight-10)',
              }}>
                {adjective}
                </Flex>
        <RotatingText
          style={{
                  backdropFilter: 'blur(var(--static-space-1))',
                  background: ' var(--brand-alpha-medium)',
                  width: 'fit-content',
                  borderRadius: 'var(--radius-s)',
                  padding: 'var(--static-space-4)',
                  paddingLeft: 'var(--static-space-4)',
                  paddingRight: 'var(--static-space-4)',
                  fontFamily: 'var(--font-family-body)',
                  color:'var(--neutral-on-background-weak)',
                  fontSize: 'var(--font-size-display-xs)',
                  fontWeight: 'var(--font-weight-10)',
              }}
              
          className={styles.textAlign}
          
          texts={['thinker', 'engineer', 'designer', 'architect']}
          mainClassName="px-0 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
          staggerFrom={"first"}
          initial={{ y: "200%" , opacity: 0.2 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-220%" , opacity: 0}}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
          externalSetText={setTitle}
        />
        </Flex>
  );
}


//just making a chage for git issuem 