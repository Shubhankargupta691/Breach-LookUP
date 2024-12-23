import React from 'react';
import { privacyPolicyData, privacyHeader  } from '../utils'; // Make sure to update the import path accordingly
 

const Privacy = () => {
  return (
    <div className=" text-white py-10 mt-10">
      <header className="text-center mb-16">
        {privacyHeader.map((section) => (
          <section key={section.id} id={`section-${section.id}`} className="policy-section mb-8 ">
            <h1 className="text-4xl font-bold">
              <span className="text-blue-500">{section.title1}</span> {section.title2}
            </h1>
            <h2 className="text-gray-400 mt-4">
                {section.content}
            </h2>
          </section>
        ))}
        
        <hr />
      </header>

      <div className="content mx-auto max-w-4xl px-6 ">
        {privacyPolicyData.map((section) => (
          <section key={section.id} id={`section-${section.id}`} className="policy-section mb-8 ">
            <h2 className="text-2xl font-bold text-gray-100 mb-4">{section.title}</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-300 ">
              {section.content.map((item, idx) => (
                <li key={idx} id={`item-${section.id}-${idx}`} className="text-lg ">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Privacy;
