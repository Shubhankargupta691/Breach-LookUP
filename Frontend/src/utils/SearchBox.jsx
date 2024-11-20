import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchBox = ({ onSubmit }) => {
    const [userInput, setUserInput] = useState('');
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const endpoint = location.pathname === '/password' ? 'password' : 'email';
        console.log(endpoint);
        onSubmit(userInput, endpoint);
    };

    // Dynamically change the placeholder based on the current route
    const getPlaceholder = () => {
        if (location.pathname === '/password') {
            return 'Enter your password';
        } else if (location.pathname === '/email') {
            return 'Enter your email';
        }
        return 'Enter Email'; 
    };

    return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-center w-full max-w-5xl mb-5 mx-auto px-4 lg:px-0">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder={getPlaceholder()}
        required
        className="w-full md:w-[40rem] lg:w-[60rem] px-4 py-3 mb-5 lg:mb-0 lg:mr-3 border rounded-full bg-blue-900 text-white placeholder-gray-400 border-gray-600 transition-all duration-300"
      />
      <button type="submit" className="w-full sm:mb-0 lg:w-auto px-5 py-3 mb-5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
        Submit
      </button>
    </form>
    
    );
};

export default SearchBox;
