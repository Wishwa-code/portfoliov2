'use client';

import { useState } from 'react';
import { Flex, Text, Tooltip, Dialog, Icon, Button,Grid  } from '@/once-ui/components';
import { useTranslations } from 'next-intl';
import { renderContent } from '@/app/resources';
import TiltedCard from '@/reactbits/tiltedCard.tsx/tiltedCard';
import GSAPWrapper from "@/gsap/GSAWrapper";


interface CardsProps {
  locale: string;
}

interface FrameworkItem {
  name: string;
  icon: string; 
  tooWhite?: boolean;
  tooBlack?: boolean;
}

const frameworks: FrameworkItem[] = [
  { name: 'Three.js', icon: '/logos/Three.svg', tooBlack: true },
  { name: 'Rive', icon: '/logos/rive.svg', tooWhite: true },
  { name: 'Motion', icon: '/logos/framermotion.png', tooWhite: true },

  { name: 'Tailwind', icon: '/logos/Tailwind.svg' },
  { name: 'Once UI', icon: '/logos/onceui.png', tooWhite: true },
  
  { name: 'LangChain', icon: '/logos/langchain.svg' },
  { name: 'Sci-kit learn', icon: '/logos/scikitlearn.svg' },
  { name: 'Open CV', icon: '/logos/OpenCV.svg' },
  
  { name: 'Prisma', icon: '/logos/prisma.svg' , tooBlack: true },
    { name: 'Zod', icon: '/logos/zod.svg'  },

  { name: 'Supabase', icon: '/logos/supabase-original-wordmark.svg' , tooBlack: true },
  { name: 'Neon', icon: '/logos/neondb.svg' ,tooWhite: true },
  { name: 'MongoDB', icon: '/logos/MongoDB.svg' },
  { name: 'Redis', icon: '/logos/redis-original.svg' },

  { name: 'O Auth', icon: '/logos/oauth.png' },
  { name: 'Clerk', icon: '/logos/clerk.png' },
  




  { name: 'Redux', icon: '/logos/redux-original.svg' },
  { name: 'React Context API', icon: '/logos/react-original.svg' },
  { name: 'Riverpod', icon: '/logos/riverpod.png' },
  { name: 'React/Tanstack Query', icon: '/logos/repo-dark.png' },
  { name: 'SWR', icon: '/logos/swr.png' },

  { name: 'Selenium', icon: '/logos/Selenium.svg' },
  { name: 'Jest', icon: '/logos/Jest.svg' },
  { name: 'Playwright', icon: '/logos/Playwrite.svg' },

  { name: 'Google Analytics', icon: '/logos/Google.svg' },
  { name: 'Sentry', icon: '/logos/sentry.svg',tooBlack: true },
  { name: 'Resend', icon: '/logos/resend-wordmark-white.svg', tooWhite: true },
  { name: 'Next-intl', icon: '/logos/next-inte.svg', tooBlack: true },
    { name: 'Payhere', icon: '/logos/PayHere-Logo.png' },
    { name: 'Stripe', icon: '/logos/Stripe.svg' },





  { name: 'Vercel', icon: '/logos/vercel-original.svg' , tooBlack: true },
  { name: 'Render', icon: '/logos/render.png' },
  { name: 'AWS', icon: '/logos/amazonwebservices-original-wordmark.svg' },



];

   const wrappers = [
    { className: "box box-a gradient-green", dataLag: "0.5" },
    { className: "box box-b gradient-purple", dataLag: "1.0"},
    { className: "box box-c gradient-orange", dataLag: "1.5" },
    { className: "box box-d gradient-orange", dataLag: "2.0" },
    { className: "box box-e gradient-orange", dataLag: "2.5" },
    { className: "box box-f gradient-orange", dataLag: "3.0" },
  ];

export function Libraries({ locale }: CardsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const { home } = renderContent(t);

  return (
    <>
      <Flex direction="row" alignItems="center" justifyContent="start" marginBottom="4" paddingTop='12'>
        <Text variant="heading-strong-l">Libraries</Text>
        <Tooltip onClick={() => setIsOpen(true)}  prefixIcon="info" label="𝒊"  />
        <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="These are some libraries i have used for different projects but if needed i can learn any library or framework in a short time."
        >
            <Flex fillWidth gap="12" marginTop="0" alignItems='end' justifyContent='end'>
               
                <Button label="Okey"  onClick={() => setIsOpen(false)}/>
            </Flex>
        </Dialog>
      </Flex>
      <GSAPWrapper />	
      
      <Grid
        fillWidth
        columns="4"
        // gap="12"
        marginTop="4"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          // gap: '12px',
          padding: '8px',
          // backgroundColor: 'black',
          placeItems: 'center',
        }}
      >
        {frameworks.map((fw, idx) => {
            const wrapper = wrappers[idx % wrappers.length]; // Rotate through the wrappers
            return (
              <div 
                style={{padding:'0px', margin:'0px'}} 
                className={wrapper.className} 
                data-lag={wrapper.dataLag}>
                  <TiltedCard

                    key={idx}
                    imageSrc={fw.icon}
                    altText={fw.name}
                    captionText={fw.name}
                    containerHeight="120px"
                    containerWidth="75px"
                    imageHeight="75px"
                    imageWidth="75px"
                    rotateAmplitude={18}
                    scaleOnHover={1.5}
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent={true}
                    tooWhite={fw.tooWhite}
                    tooBlack={fw.tooBlack}

                    overlayContent={
                      <p className="tilted-card-demo-text">
                        {fw.name}
                      </p>
                    }
                  />
              </div>
        );
        })}
      </Grid>
    </>
  );
}
