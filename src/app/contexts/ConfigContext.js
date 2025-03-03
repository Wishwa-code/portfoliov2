'use client'

import React, { createContext, useContext, useState } from 'react';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState({
        display: {
            location: true,
            time: true,
        },
        backlight: {
            state: true,
            color: 'hsl(140, 59.00%, 40.20%)',
        },
        accent: {
            state: true,
            color: 'hsl(140, 59.00%, 40.20%)',
        },
        style: {
            theme: 'dark',
        },
        // ... other config values from config.js
    });

    console.log('displaying changed theme from provider',config.style.theme);

    return (
        <ConfigContext.Provider value={{ config, setConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext); 