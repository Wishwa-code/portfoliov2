import React, { useState } from 'react';
import { ToggleButton2 } from '@/once-ui/components/ToggleButton2';
import './Colorpalette.scss'; // Import the CSS file for styling
import { useConfig } from '@/app/contexts/ConfigContext';

const colors = [
    'rgba(0, 0, 255, 0.47)',     // blue
    'rgba(75, 0, 130, 0.47)',    // indigo
    'rgba(238, 130, 238, 0.47)', // violet
    'rgba(255, 0, 255, 0.47)',   // magenta
    'rgba(255, 192, 203, 0.47)', // pink
    'rgba(255, 0, 0, 0.47)',     // red
    'rgba(255, 165, 0, 0.5)',   // orange
    'rgba(255, 255, 0, 0.47)',   // yellow
    'rgba(138, 154, 91, 0.47)',  // moss
    'rgba(0, 128, 0, 0.47)',     // green
    'rgba(80, 200, 120, 0.47)',  // emerald
    'rgba(0, 255, 255, 0.47)'    // cyan
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