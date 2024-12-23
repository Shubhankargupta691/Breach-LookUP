import React, { useState } from 'react';
import { HeaderContent, tabSections, FooterContent } from './items';

export function Header(){
    return (
        <div className="text-center mb-2">
            {HeaderContent.map((section) => (
            <section key={section.id} id={section.id} className="policy-section">
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

export function Footer(){
  return (
  <div className="text-center mb-1">
            {FooterContent.map((section) => (
            <section key={section.id} id={section.id} className="policy-section">
                <h4 className="text-gray-400">
                    {section.content}
                </h4>
            </section>
            ))}
        </div>
    );
}


export function Tabs() {
  const [activeTab, setActiveTab] = useState("file");

  return (
    <div className='flex justify-center items-center w-full'> 
      <div className='flex flex-col items-center w-1/2 justify-between'>
        <div className='w-1/2 overflow-x-auto' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <ul className="nav nav-tabs flex justify-between border-b border-gray-600 space-x-6 min-w-max">
            {tabSections.map((tab) => (
              <li className='nav-item' role='presentation' key={tab.id}>
                <button 
                  className={`nav-link px-4 relative bg-transparent border-0 shadow-none whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-white font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  style={{ outline: "none" }}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className='tab-content mt-3 relative' style={{ height: "400px" }}>
          {tabSections.map(({ id, Component }) => (
            <div 
              key={id}
              className={`tab-pane ${activeTab === id ? "active block" : "hidden"}`}
              id={id}
              role='tabpanel'
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                visibility: activeTab === id ? "visible" : "hidden",
                opacity: activeTab === id ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            > 
              <Component />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



const  Home = () => {
  return (
    <React.Fragment>
      <div className='w-full h-full overflow-hidden flex flex-col items-center'>
        {/* Header */}
        <div className='w-1/2 my-2 mx-auto text-center'>
          <Header />
        </div>
        
        {/* Body */}
        <section className='w-full my-4 flex justify-center items-center flex-grow'>
          <div className='w-full text-center'>
            <Tabs />
          </div>
        </section>

        {/* Footer */}
        <div className='w-1/2 my-2 mx-auto text-center'>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
