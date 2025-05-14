'use client';

import { Flex, Heading, Text } from "@/once-ui/components";
import dynamic from "next/dynamic";
import animationData from '@/../public/lotties/404.json';
import { Footer, Header, RouteGuard } from "@/components";

// import Lottie from "lottie-react";
// import animationData from '@/../public/lotties/cofee.json';

// export default function NotFound() {
//     return (
//     <html>
//       <body>
//         <h2>Something went wrong! in global error</h2>
//         <button onClick={() => console.log('retry attempt')}>Try again</button>
//       </body>
//     </html>
//     )
// }

export default function NotFound() {
        const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
    
  return (
    <>
      <Flex fillWidth paddingY="128" justifyContent="center">
          <Lottie animationData={animationData} loop={true} />
      </Flex>
     </>
  );
}