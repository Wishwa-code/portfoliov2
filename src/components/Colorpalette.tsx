import React, { useState } from 'react';
import { ToggleButton2 } from '@/once-ui/components/ToggleButton2';
import './Colorpalette.scss'; // Import the CSS file for styling
import { useConfig } from '@/app/contexts/ConfigContext';

const colors = [
    'rgba(0, 0, 255, 0.27)',     // blue
    'rgba(75, 0, 130, 0.27)',    // indigo
    'rgba(238, 130, 238, 0.27)', // violet
    'rgba(255, 0, 255, 0.27)',   // magenta
    'rgba(255, 192, 203, 0.27)', // pink
    'rgba(255, 0, 0, 0.24)',     // red
    'rgba(255, 166, 0, 0.24)',   // orange
    'rgba(255, 255, 0, 0.24)',   // yellow
    'rgba(138, 154, 91, 0.27)',  // moss
    'rgba(0, 128, 0, 0.47)',     // green
    'rgba(80, 200, 120, 0.24)',  // emerald
    'rgba(0, 255, 255, 0.17)'    // cyan
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
                    backgroundColor={color.replace(/rgba?\((\d+,\s*\d+,\s*\d+),[^)]+\)/, 'rgb($1)')}
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