"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function GSAPTextWrapper() {
  useEffect(() => {
    document.fonts.ready.then(() => {
      let split = SplitText.create(".text", {
        type: "words, chars",
      });

      gsap.from(split.chars, {
        yPercent: "random([-100,100])",
        rotation: "random(-30,30)",
        autoAlpha: 0,
        stagger: {
          amount: 1.5,
          from: "random",
          yoyo: true,
        },
        ease: "back.out",
      });
    });
  }, []);

  return null; // No UI, just GSAP initialization
}


