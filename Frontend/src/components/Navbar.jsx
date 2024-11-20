import React, { useState } from 'react';
import { Social } from '../utils/items'; 
import { navigationLinks } from '../utils/items';


const Navbar = () => {
    const [activeLink, setActiveLink] = useState('/');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLinkClick = (path) => {
        setActiveLink(path);
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="fixed top-0 w-full bg-blue-100 bg-opacity-10 backdrop-blur border-b border-white border-opacity-20 z-50">
            <div className="flex justify-between items-center px-3 py-2">
               
                {/* Desktop Navigation */}
                <div className="hidden sm:flex space-x-4">
                    {navigationLinks.map((link) => (
                        <a
                            key={link.path}
                            href={link.path}
                            onClick={() => handleLinkClick(link.path)}
                            className={`text-white px-3 py-2 transition duration-300 ${activeLink === link.path ? 'text-blue-400' : 'hover:text-blue-500'}`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

            
                <div className="hidden sm:flex ml-auto space-x-2">
                    {Social.map((section) => (
                        <a
                            key={section.id}
                            href={section.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                        >
                            <img
                                src={section.path}
                                alt={section.name}
                                className="w-8 h-8 cursor-pointer"
                            />
                        </a>
                    ))}
                </div>

                <button
                    className="text-white sm:hidden focus:outline-none ml-auto transition-transform duration-300"
                    onClick={toggleMobileMenu}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`sm:hidden bg-blue-900 bg-opacity-95 flex flex-col space-y-2 p-4 transition-all duration-500 ease-in-out ${
                    isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
            >
                {navigationLinks.map((link) => (
                    <a
                        key={link.path}
                        href={link.path}
                        onClick={() => handleLinkClick(link.path)}
                        className={`text-white px-3 py-2 transition duration-300 ${activeLink === link.path ? 'text-blue-400' : 'hover:text-blue-500'}`}
                    >
                        {link.name}
                    </a>
                ))}
            </div>
        </nav>
    );
}

export default Navbar;
