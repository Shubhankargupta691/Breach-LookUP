// src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import {Email, Password, ScanForm,Privacy, FAQs } from './page';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'



const App = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-5 ">
          <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Email />} />
                <Route path="/password" element={<Password />} />
                <Route path="/scanner" element={<ScanForm />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/faq" element={<FAQs />} />
                
            </Routes>
        </Router>
        </div>
    );
}


export default App;
