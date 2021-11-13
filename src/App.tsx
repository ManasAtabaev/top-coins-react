import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/home/HomePage';
import LiquidityPage from './pages/liquidity/LiquidityPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/liquidity" element={<LiquidityPage />} />
        </Routes>
    );
}

export default App;
