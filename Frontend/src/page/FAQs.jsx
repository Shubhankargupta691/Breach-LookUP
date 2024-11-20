import React from 'react';
import { Questions, faqHeadeer } from '../utils/items'; // Update the path to match your project structure

const FAQs = () => {
  return (
    <div className=" text-white py-10 mt-10">
      <header className="text-center mb-16">
        {faqHeadeer.map((section)=> (
          <section key={section.id} id={`section-${section.id}`} className="policy-section mb-8 ">
             <h1 className="text-4xl font-bold">
                <span className="text-blue-500">{section.title1}</span>{section.title2}
             </h1>
          </section>
        ))}      
      </header>

      <div className="content mx-auto max-w-4xl">
        <ul className="space-y-6">
          {Questions.map((faq) => (
            <li key={faq.id} id={`faq-${faq.id}`} className="p-4 bg-gray-800 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2">{faq.question}</h2>
              <p className="text-gray-300">{faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FAQs;
