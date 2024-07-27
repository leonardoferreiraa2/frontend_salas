import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sala from './pages/Sala'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:id" element={<Sala />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;