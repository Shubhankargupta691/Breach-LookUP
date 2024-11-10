import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchBox = ({ onSubmit }) => {
    const [userInput, setUserInput] = useState('');
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const endpoint = location.pathname === '/password' ? 'password' : 'email';

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
        <form onSubmit={handleSubmit} className="flex items-center w-[800px] max-w-3xl mb-5">
            <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={getPlaceholder()}
                required
                className="flex-grow px-4 py-3 mr-3 border rounded-full bg-blue-900 text-white placeholder-gray-400 border-gray-600"
            />
            <button type="submit" className="px-5 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                Submit
            </button>
        </form>
    );
};

export default SearchBox;
