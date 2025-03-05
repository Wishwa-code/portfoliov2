// 'use client'

// import React from 'react';

// const SendEmailButton = () => {


//   const handleMailto = (e:any) => {
//     e.preventDefault();
//     const email = "example@email.com";
//     const mailto = `mailto:${email}`;
//     console.log(`mailto:${email}?subject=${encodeURIComponent( email)}&body=${encodeURIComponent(mailto)}`);

//     window.location.href = mailto;
// };
  
//   return (
//     <div>
//       <button onClick={handleMailto}>
//         Send me an email
//       </button>
//     </div>
//   );
// }

// export default SendEmailButton;

'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/router

const SendEmailButton = () => {
  const router = useRouter(); // Get access to the router

  const handleMailto = (e: any) => {
    e.preventDefault();

    const email = "example@email.com"; // Replace with your email
    const subject = "Hello from User";
    const body = "I want to contact you.";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Optional: Log or do something with the mailto link before redirecting
    console.log(mailtoLink);

    // If you want to redirect to a different route in your app after this action
    // For example, let's redirect to a 'thank you' page:
    router.push(mailtoLink); // This will navigate to /thank-you page

    // Alternatively, you can directly open the email client:
    window.location.href = mailtoLink;
  };

  return (
    <div>
      <button onClick={handleMailto}>
        Send me an email
      </button>
    </div>
  );
}

export default SendEmailButton;
