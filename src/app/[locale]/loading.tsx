//  // app/[locale]/(overview)/loading.tsx
// import React from 'react';
'use client';

import { Flex } from '@/once-ui/components';
import dynamic from "next/dynamic";
import animationData from '@/../public/lotties/cofee.json';

// import Lottie from "lottie-react";
// import animationData from '@/../public/lotties/cofee.json';


export default function Loading() {
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
    
  return (
          <Flex fillWidth paddingY="128" justifyContent="center">
            <Lottie animationData={animationData} loop={true} />
        </Flex>
  );
}


 // app/[locale]/(overview)/loading.tsx
// import React from 'react';

// export default function Loading() {
//   // Use a simple, obvious div with inline styles
//   return (
//     <div style={{
//       position: 'fixed', // or absolute, depending on desired overlay behavior
//       top: 0,
//       left: 0,
//       width: '100vw',
//       height: '100vh',
//       backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black background
//       color: 'white',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       fontSize: '2rem',
//       zIndex: 9999 // Ensure it's on top
//     }}>
//       CUSTOM FULL PAGE LOADING...
//     </div>
//   );
// }
