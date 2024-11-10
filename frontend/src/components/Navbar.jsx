import React, { useState } from 'react';
import { Social } from '../utils/items';

function Navbar() {
    const [activeLink, setActiveLink] = useState('/');

    const handleLinkClick = (path) => {
        setActiveLink(path);
    };

    return (
        <nav className="fixed top-0 w-full flex justify-between p-3 bg-blue-100 bg-opacity-10 backdrop-blur border-b border-white border-opacity-20 z-50">
            <div className="flex space-x-4">
                {[
                    { name: 'Home', path: '/' },
                    { name: 'Password', path:'/password' },
                    { name: 'URL Scanner', path: '/url-scanner' },
                    { name: 'Privacy', path: '/privacy' },
                    { name: 'FAQ', path: '/faq' },
                ].map((link) => (
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
            <div className='mr-5'>
                {Social.map((section) => (
                        <section key={section.id} id={`section-${section.id}`} className="flex items-center space-x-2">
                            <a 
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
                        </section>
                ))}
            </div>
        </nav>
    );
}

export default Navbar;
