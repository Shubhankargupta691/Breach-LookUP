import React from 'react';
import { getIPDetails } from '../../script'; 

const WhoIS = ({ jsonData }) => {
 
  const { whois } = getIPDetails(jsonData);

     const parsedWhois = whois
     .split('\n').map(line => {
      const [key, value] =  line.split(': ').map(item => item.trim());
      return { key, value };
     }).filter(item => item.key && item.value);


  return (
    <div className="vstack w-full">
   
      {parsedWhois.map((item, index) => (
        <div className="flex items-start" key={index}>
          <div>
            <h3 className='font-sans'>{item.key}:</h3> 
          </div>
          <p className='pl-2 font-mono'>{item.value}</p>
        </div>
      ))}
    </div>
  );
}

export default WhoIS;
