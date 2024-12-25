// src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import {Email, Password, ScanForm,Privacy, FAQs } from './page';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Privacy from './page/Privacy';
import FAQs from './page/FAQs';
import SearchBox from './components/Scanner/components/SearchBox';


const App = () => {

    return (
        <div className="flex flex-col items-center justify-center w-auto lg:w-full bg-[#060720] text-white p-5 ">
          <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Email />} />
                <Route path="/password" element={<Password />} />
                <Route path="/scanner" element={<SearchBox />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/faq" element={<FAQs />} />
                
            </Routes>
        </Router>
        </div>
    );
}


export default App;
