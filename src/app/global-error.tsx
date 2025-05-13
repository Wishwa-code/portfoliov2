'use client';

import { Flex, Heading, Text } from "@/once-ui/components";
import dynamic from "next/dynamic";
import animationData from '@/../public/lotties/404.json';
import { Footer, Header, RouteGuard } from "@/components";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  
            const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

  return (
        <>
    <Flex fillWidth paddingY="128" justifyContent="center">
                    
      
        <Lottie animationData={animationData} loop={true} />
        
     </Flex>
     </>
  )
}