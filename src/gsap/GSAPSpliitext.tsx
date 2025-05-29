"use client";

import { useEffect } from "react";
import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function GSAPTextWrapper() {
  useEffect(() => {
    let split = SplitText.create(".text",{
      type: "words, chars",
    });
    // Example GSAP animation
    // gsap.to(".box", { x: 360 });
    gsap.from(split.words, {
      yPercent:"random([-100,100])",
      rotation:"random(-30,30)",
      autoAlpha: 0,
      stagger: {
        amount: 1.5,
        from: "random",
        yoyo: true,
      },
      ease: "back.out", 
    });
  }, []);

  return null; // No UI, just GSAP initialization
}


