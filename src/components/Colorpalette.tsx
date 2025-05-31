'use client'                          

import React, { useState, useEffect } from 'react';
import { ToggleButton2 } from '@/once-ui/components/ToggleButton2';
import './Colorpalette.scss';
import { useConfig } from '@/app/contexts/ConfigContext';

const colors = [
    'rgba(0, 0, 0, 0)',   
    'rgba(0, 0, 255, 0.2)',
    'rgba(75, 0, 130, 0.27)',
    'rgba(255, 0, 255, 0.27)',
    'rgba(222, 152, 136, 0.2)',
    'rgba(255, 0, 0, 0.24)',
    'rgba(255, 166, 0, 0.24)',
    'rgba(255, 255, 0, 0.24)',
    'rgba(80, 200, 120, 0.24)',
    'rgba(0, 255, 255, 0.17)'
];

const ParentComponent: React.FC = () => {
    const { config, setConfig } = useConfig();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Ensure this component only renders on the client side
        setIsClient(true);
    }, []);

    const handleColorChange = (newColor: string, change: 'state' | 'color') => {
        console.log(`Changing backlight ${change} to:`, newColor);

        // Remove alpha component from the color
        const rgbColor = newColor.replace(/rgba?\((\d+,\s*\d+,\s*\d+),[^)]+\)/, 'rgb($1)');

        if (newColor === 'rgba(0, 0, 0, 0)') {
            const newState = !config.backlight.state;
            setConfig((prevConfig: any) => ({
                ...prevConfig,
                backlight: {
                    ...prevConfig.backlight,
                    color: rgbColor, // Use the modified color
                    state: newState
                }
            }));
        } else {
            setConfig((prevConfig: any) => ({
                ...prevConfig,
                backlight: {
                    ...prevConfig.backlight,
                    color: rgbColor, // Use the modified color
                    state: 'true'
                }
            }));
        }
    };

    if (!isClient) {
        // Avoid rendering on the server
       return <div className="placeholder">Loading...</div>;
    }

    return (
        <div className="grid-container">
            {colors.map((color, index) => {
                if (color === 'rgba(0, 0, 0, 0)') {
                    return (
                        <ToggleButton2
                            key="spotlight-off"
                            prefixIcon={(config.backlight.color === 'rgba(0, 0, 0, 0)') ? "spotlighton" : "spotlightoff"}
                            backgroundColor="transparent"
                            selected={true}
                            onClick={() => handleColorChange(color, 'color')}
                        />
                    );
                }

                return (
                    <ToggleButton2
                        key={index}
                        prefixIcon="tick"
                        backgroundColor={color.replace(/rgba?\((\d+,\s*\d+,\s*\d+),[^)]+\)/, 'rgb($1)')}
                        selected={config.backlight.color === color}
                        onClick={() => handleColorChange(color, 'color')}
                    >
                        <div>{color.charAt(0).toUpperCase() + color.slice(1)}</div>
                    </ToggleButton2>
                );
            })}
        </div>
    );
};

export default ParentComponent;
// export default dynamic(() => Promise.resolve(ParentComponent), { ssr: false });
