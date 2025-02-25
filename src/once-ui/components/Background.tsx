//@ts-nocheck
"use client";


//!so thius compoentn cursor thing didnt work somehow i mange to come tht compoentn and use exiting z-index position in the main layout and mouse position hook to display the cursor followind gradient circle and i uses exitingg smooth function too .

import React, { CSSProperties, forwardRef, useEffect, useRef, useState } from "react";
import { SpacingToken } from "../types";
import { Flex } from "./Flex";
import { DisplayProps } from "../interfaces";
import styles from "./Background.module.scss";
import classNames from "classnames";

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref && "current" in ref) {
    (ref as React.MutableRefObject<T | null>).current = value;
  }
}

interface MaskProps {
  cursor?: boolean;
  x?: number;
  y?: number;
  radius?: number;
}

interface GradientProps {
  display?: boolean;
  opacity?: DisplayProps["opacity"];
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  tilt?: number;
  colorStart?: string;
  colorEnd?: string;
}

interface DotsProps {
  display?: boolean;
  opacity?: DisplayProps["opacity"];
  color?: string;
  size?: SpacingToken;
}

interface GridProps {
  display?: boolean;
  opacity?: DisplayProps["opacity"];
  color?: string;
  width?: string;
  height?: string;
}

interface LinesProps {
  display?: boolean;
  opacity?: DisplayProps["opacity"];
  size?: SpacingToken;
}

interface BackgroundProps extends React.ComponentProps<typeof Flex> {
  position?: CSSProperties["position"];
  gradient?: GradientProps;
  dots?: DotsProps;
  grid?: GridProps;
  lines?: LinesProps;
  mask?: MaskProps;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Background = forwardRef<HTMLDivElement, BackgroundProps>(
  (
    {
      position = "fixed",
      gradient = {},
      dots = {},
      grid = {},
      lines = {},
      mask = {},
      children,
      className,
      style,
      ...rest
    },
    forwardedRef,
  ) => {
    const dotsColor = dots.color ?? "brand-on-background-weak";
    const dotsSize = "var(--static-space-" + (dots.size ?? "24") + ")";

    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
    const backgroundRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setRef(forwardedRef, backgroundRef.current);
    }, [forwardedRef]);

    useEffect(() => {
      const handleMouseMove = (event: MouseEvent) => {
        if (backgroundRef.current) {
          const rect = backgroundRef.current.getBoundingClientRect();
        //   console.log('cursor position',rect);
          setCursorPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          });
        }
      };

      document.addEventListener("mousemove", handleMouseMove);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }, []);

    useEffect(() => {
      let animationFrameId: number;

      const updateSmoothPosition = () => {
        setSmoothPosition((prev) => {
          const dx = cursorPosition.x - prev.x;
          const dy = cursorPosition.y - prev.y;
          const easingFactor = 0.05;

          return {
            x: Math.round(prev.x + dx * easingFactor),
            y: Math.round(prev.y + dy * easingFactor),
          };
        });
        animationFrameId = requestAnimationFrame(updateSmoothPosition);
      };

      if (mask.cursor) {
        animationFrameId = requestAnimationFrame(updateSmoothPosition);
      }

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }, [cursorPosition, mask]);

    const maskStyle = (): CSSProperties => {
      if (!mask) return {};

      if (mask.cursor) {
        return {
          "--mask-position-x": `${smoothPosition.x}px`,
          "--mask-position-y": `${smoothPosition.y}px`,
          "--mask-radius": `${mask.radius || 50}vh`,
        } as CSSProperties;
      }

      if (mask.x != null && mask.y != null) {
        return {
          "--mask-position-x": `${mask.x}%`,
          "--mask-position-y": `${mask.y}%`,
          "--mask-radius": `${mask.radius || 50}vh`,
        } as CSSProperties;
      }

      return {};
    };

    const remap = (
      value: number,
      inputMin: number,
      inputMax: number,
      outputMin: number,
      outputMax: number,
    ) => {
      return ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin;
    };

    const adjustedX = cursorPosition.x != null ? remap(50, 0, 100, 37.5, 62.5) : 50;
    const adjustedY = cursorPosition.y != null ? remap(100, 0, 100, 37.5, 62.5) : 50;
    console.log('cursorPosition',smoothPosition);
    return (
      <Flex
        ref={backgroundRef}
        fill="true"
        position={position}
        className={classNames(mask && styles.mask, className)}
        top="0"
        left="0"
        zIndex={0}
        overflow="hidden"
        style={{
          ...maskStyle(),
          ...style,
          width: '100vw',
          height: '100vh',
        }}
        {...rest}
      >
        {gradient.display && (
          <Flex
            position="absolute"
            className={styles.gradient}
            opacity={gradient.opacity / 100} // Convert opacity from 0-100 to 0-1
            pointerEvents="none"
            style={{
              left: `${smoothPosition.x-600}px`, // Use pixel values for left position
              top: `${smoothPosition.y-600}px`, // Use pixel values for top position
              width: "1200px", // Use pixel values for width
              height: "1200px", // Use pixel values for height
                // Set border radius to 50% for a circular shape
              background: `radial-gradient(circle,#09382C 0%,rgba(80, 200, 120, 0) 70%, rgba(80, 200, 120, 0) 100%)`, // Radial gradient with emerald color
              transform: `rotate(${gradient.tilt != null ? gradient.tilt : 0}deg)`, // Directly set tilt
              transformOrigin: 'center', // Set transform origin to center for proper rotation
            }}
          />
        )}
        {children}
      </Flex>
    );
  },
);

Background.displayName = "Background";

export { Background };




// {dots.display && (
//     <Flex
//       position="absolute"
//       top="0"
//       left="0"
//       fill ="true"
//       pointerEvents="none"
//       className={styles.dots}
//       opacity={dots.opacity}
//       style={
//         {
//           "--dots-color": `var(--${dotsColor})`,
//           "--dots-size": dotsSize,
//         } as React.CSSProperties
//       }
//     />
//   )}
//   {lines.display && (
//     <Flex
//       position="absolute"
//       top="0"
//       left="0"
//       fill="true"
//       pointerEvents="none"
//       className={styles.lines}
//       opacity={lines.opacity}
//       style={{
//         backgroundImage: `repeating-linear-gradient(45deg, var(--brand-on-background-weak) 0, var(--brand-on-background-weak) 0.5px, var(--static-transparent) 0.5px, var(--static-transparent) ${dots.size})`,
//       }}
//     />
//   )}
//   {grid.display && (
//     <Flex
//       position="absolute"
//       top="0"
//       left="0"
//       fill="true"
//       pointerEvents="none"
//       className={styles.grid}
//       opacity={grid.opacity}
//       style={{
//         backgroundSize: `
//           ${grid.width || "var(--static-space-32)"}
//           ${grid.height || "var(--static-space-32)"}`,
//         backgroundPosition: "0 0",
//         backgroundImage: `
//           linear-gradient(
//             90deg,
//             var(--${grid.color || "brand-on-background-weak"}) 0,
//             var(--${grid.color || "brand-on-background-weak"}) 1px,
//             var(--static-transparent) 1px,
//             var(--static-transparent) ${grid.width || "var(--static-space-32)"}
//           ),
//           linear-gradient(
//             0deg,
//             var(--${grid.color || "brand-on-background-weak"}) 0,
//             var(--${grid.color || "brand-on-background-weak"}) 1px,
//             var(--static-transparent) 1px,
//             var(--static-transparent) ${grid.height || "var(--static-space-32)"}
//           )
//         `,
//       }}
//     />
//   )}