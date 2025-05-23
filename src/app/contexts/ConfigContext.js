'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

const ConfigContext = createContext();

const defaultConfig = {
    display: {
        location: true,
        time: true,
    },
    backlight: {
        state: 'true',
        color: 'rgba(255, 0, 255, 0.27)',
    },
    style: {
        theme: 'dark',
    },
    // ... other default values
};

export const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedConfig = localStorage.getItem('appConfig');
            console.log('Loading config from localStorage:', savedConfig);
            return savedConfig ? JSON.parse(savedConfig) : defaultConfig;
        }
        return defaultConfig;
    });

    // Update localStorage whenever config changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            console.log('Saving config to localStorage:', config);
            localStorage.setItem('appConfig', JSON.stringify(config));
        }
    }, [config]);

    return (
        <ConfigContext.Provider value={{ config, setConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext); 