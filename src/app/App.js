import React from 'react';
import { ConfigProvider } from './contexts/ConfigContext';
import Header from './components/Header';

const App = () => {
    return (
        <ConfigProvider>
            <Header />
            {/* Other components */}
        </ConfigProvider>
    );
};

export default App; 