
'use client';

import { useEffect, useRef, useState } from 'react';
import { useConfig } from '@/app/contexts/ConfigContext';
import { Heading, Flex,Text, Tooltip, Dialog, Input,  Button} from '@/once-ui/components';

import { useTranslations } from 'next-intl';
import { baseURL, routes, renderContent } from '@/app/resources'; 




interface ProjectsProps {
  range?: [number, number?];
  locale: string;
}
export function TechnicalTitle({ range, locale }: ProjectsProps) {
const [isOpen, setIsOpen] = useState(false);

  // setRequestLocale(locale);
	const t = useTranslations();
	const { home, about, person, newsletter } = renderContent(t);

  const overlayRef = useRef<HTMLImageElement>(null);
  const overlayTextRef = useRef<HTMLImageElement>(null);
  const ladningImageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLImageElement>(null);
  const aboutemeButtontRef = useRef<HTMLImageElement>(null);



  return (
    <>
        <Flex
            direction='row'
            justifyContent='start'
            alignItems='end'>
            <Text 
                  paddingTop='20'
                  align='end'
                  variant="heading-strong-l">
                  Frameworks
            </Text>
            <Tooltip onClick={() => setIsOpen(true)}  prefixIcon="info" label="𝒊"  />
                <Dialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Please use shift + mouse wheel to zoom in and out, and drag to pan the graph."
                >
                <Flex fillWidth gap="12" marginTop="4" alignItems='end' justifyContent='end'>
                    <Flex>
                        The graph below illustrates the different features of each framework based on my evaluation from relevant perspectives. Click on the spheres to view the projects i have done with each framework.
                    </Flex>
                    <Button label="Okey"  onClick={() => setIsOpen(false)}/>
                </Flex>
            </Dialog>
        </Flex>
    
    </>
  );
}


//just making a chage for git issuem 