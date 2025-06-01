"use client"

import React from "react";
import "./GlassIcons.css";
import {  Icon } from '@/once-ui/components/Icon';
import { useConfig } from '@/app/contexts/ConfigContext';

export interface GlassIconsItem {
  icon: string;
  color: string;
  label: string;
  link: string;

  customClass?: string;
  size?: "xs" | "s" | "m" | "l" | "xl";
}

export interface GlassIconsProps {
  items: GlassIconsItem[];
  className?: string;
  
}

const gradientMapping: Record<string, string> = {
      gray: "linear-gradient(hsl(0, 0.00%, 22.70%), hsl(0, 0.00%, 46.70%))",

  blue: "linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))",
  indigo: "linear-gradient(hsl(283, 82.30%, 51.40%), hsl(286, 67.70%, 67.30%))",
  purple: "linear-gradient(hsl(303, 90%, 50%), hsl(288, 90%, 50%))",
  red: "linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))",
  brown: "linear-gradient(hsl(29, 72.00%, 42.00%), hsl(34, 54.20%, 53.70%))",

  orange: "linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))",
  yellow: "linear-gradient(hsl(60, 90%, 50%), hsl(50, 90%, 50%))",
  green: "linear-gradient(hsl(143, 90%, 40%), hsl(128, 90%, 40%))",
  cyan: "linear-gradient(hsl(183, 90%, 50%), hsl(168, 90%, 50%))"
};

const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
        const { config } = useConfig();
    
  const getBackgroundStyle = (color: string): React.CSSProperties => {
    if (!config.backlight.state) {
      return { background: "transparent" };
    }
    if (config.backlight.color) {
      return { background: config.backlight.color };
    }
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] };
    }
    return { background: color };
  };

  return (
    <div className={`icon-btns ${className || ""}`}>
      {items.map((item, index) => (
        <a
          href={item.link}
          key={index}
          type="button"
          className={`icon-btn ${item.customClass || ""}`}
          aria-label={item.label}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span
            className="icon-btn__back"
            style={getBackgroundStyle(item.color)}
          ></span>
          <span className="icon-btn__front">
            <span className="icon-btn__icon" aria-hidden="true">
              <Icon name={item.icon} size={item.size}/>
            </span>
          </span>
          <span className="icon-btn__label">{item.label}</span>
        </a>
      ))}
    </div>
  );
};

export default GlassIcons;
