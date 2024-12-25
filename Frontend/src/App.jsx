// src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Email from './page/Email';
import Password from './page/Password';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Privacy from './page/Privacy';
import FAQs from './page/FAQs';
import SearchBox from './components/Scanner/components/SearchBox';


const App = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-5 ">
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
