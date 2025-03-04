import React, { useState } from 'react';
import { ToggleButton2 } from '@/once-ui/components/ToggleButton2';
import './Colorpalette.scss'; // Import the CSS file for styling
import { useConfig } from '@/app/contexts/ConfigContext';

const colors = [
    '#0000FF', // blue
    '#4B0082', // indigo
    '#EE82EE', // violet
    '#FF00FF', // magenta
    '#FFC0CB', // pink
    '#FF0000', // red
    '#FFA500', // orange
    '#FFFF00', // yellow
    '#8A9A5B', // moss
    '#008000', // green
    '#50C878', // emerald
    '#00FFFF'  // cyan
  ];

const ParentComponent: React.FC = () => {
    const { config, setConfig } = useConfig();

    const handleColorChange = (newChange: string, change: 'state' | 'color') => {
        setConfig((prevConfig: any) => ({
            ...prevConfig,  // Keep all existing config values
            backlight: {
                ...prevConfig.backlight, // Keep other accent properties if any
                [change]: newChange  // Use the change parameter as the key
            }
        }));
        console.log(`Backlight ${change} changed to:`, newChange);
    };

    return (
        <div className="grid-container">
            {colors.map((color, index) => (
                <ToggleButton2
                    key={index}
                    prefixIcon="tick"
                    backgroundColor={color}
                    selected={config.backlight.color === color}
                    onClick={() => handleColorChange(color, 'color')}
                >
                    <div>{color.charAt(0).toUpperCase() + color.slice(1)}</div>
                </ToggleButton2>
            ))}
        </div>
    );
};

export default ParentComponent;