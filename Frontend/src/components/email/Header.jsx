
import React from 'react';
import { EmailHeader } from '../../utils';


const Header = () => {
    return (
        <div className="text-center mb-5">
            {EmailHeader.map((section) => (
            <section key={section.id} id={`section-${section.id}`} className="policy-section">
                <h1 className="text-4xl text-white font-bold">
                <span className="text-blue-500">{section.title1}</span> {section.title2}
                </h1>
                <br />
                <h4 className="text-gray-400">
                    {section.content}
                </h4>
            </section>
            ))}
        </div>
    );
}

export default Header;

