'use client';

import { useState } from 'react';
import { Flex, Text, Tooltip, Dialog, Icon, Button,Grid  } from '@/once-ui/components';
import { useTranslations } from 'next-intl';
import { renderContent } from '@/app/resources';
import TiltedCard from '@/reactbits/tiltedCard.tsx/tiltedCard';

interface CardsProps {
  locale: string;
}

interface LanguageItem {
  name: string;
  icon: string; 
  tooWhite?: boolean;
  tooBlack?: boolean;
}

const frameworks: LanguageItem[] = [
  { name: 'Typescript', icon: '/logos/typescript.png' },
  { name: 'Dart', icon: '/logos/Dart.svg' },
  { name: 'Go', icon: '/logos/Go.svg' },
  { name: 'Java', icon: '/logos/Java.svg' },
  { name: 'Rust', icon: '/logos/Rust.svg', tooBlack: true },
  { name: 'C', icon: '/logos/C.svg' },
  { name: 'PHP', icon: '/logos/PHP.svg' },
  { name: 'Python', icon: '/logos/Python.svg' },
  { name: 'SQL', icon: '/logos/sql.png' },

  { name: 'HTML', icon: '/logos/HTML5.svg' },
  { name: 'CSS', icon: '/logos/CSS3.svg' },
  { name: 'Sass', icon: '/logos/sass-original.svg' },
  { name: 'JSON', icon: '/logos/json-original.svg' },
  { name: 'YAML', icon: '/logos/YAML.svg' },
  { name: 'TOML', icon: '/logos/toml.png' },
  { name: 'R', icon: '/logos/R.svg' },
];

export function Languages({ locale }: CardsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const { home } = renderContent(t);

  return (
    <>
      <Flex direction="row" alignItems="center" justifyContent="start" marginBottom="4" paddingTop='56'>
        <Text variant="heading-strong-l">Computer Languages</Text>
        <Tooltip onClick={() => setIsOpen(true)}  prefixIcon="info" label="𝒊"  />
        <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Wrote my first hello world in html when i was in grade 8 and learned c, php and javascript in collage. Mostly have written javascript,dart and java for work. Also read the rust book recently(2024) seems quite groundbreaking with LLMs and stuff. "
        >
            <Flex fillWidth gap="12" marginTop="0" alignItems='end' justifyContent='end'>
               
                <Button label="Okey"  onClick={() => setIsOpen(false)}/>
            </Flex>
        </Dialog>
      </Flex>

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
        {frameworks.map((fw, idx) => (

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

        ))}
      </Grid>
    </>
  );
}
