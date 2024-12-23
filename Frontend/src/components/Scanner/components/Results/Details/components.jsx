import React from 'react'
import { extractAllData } from '../../../utils';


export function AndroGuard({ jsonData }) {

    const {androguard} = extractAllData(jsonData);
    
    if(!androguard){
        return null;
    }

    const renderKeyValuePairs = (data, depth = 0) => {
        if (!data || typeof data !== 'object') return null;
      
        const renderedItems = Object.entries(data)
          .filter(([_, value]) => value && (typeof value !== 'object' || Object.keys(value).length > 0)) // filter empty keys and values with no data
          .map(([key, value]) => (
            <div key={`${depth}-${key}`} className="flex items-start mb-2 bg-gray-100 rounded p-2 shadow-md dark:bg-gray-800 dark:text-gray-200">
              <div>
                <span className='font-bold text-indigo-600 dark:text-indigo-400'>{key.replace(/([A-Z])/g, ' $1').trim()}</span>&nbsp; &nbsp;
                {Array.isArray(value) ? (
                  <div className="ml-4">
                    {value.map((item, index) => (
                      <div key={`${depth}-${key}-${index}`} className="mt-1">
                        {item}
                      </div>
                    ))}
                  </div>
                ) : typeof value === 'object' ? (
                  <details className="ml-4">
                    <summary className="cursor-pointer text-indigo-500 dark:text-indigo-300">{key}</summary>
                    {renderKeyValuePairs(value, depth + 1)}
                  </details>
                ) : (
                  <span className='text-gray-700 dark:text-gray-300'>{value}</span>
                )}
              </div>
            </div>
          ));
      
        // Only return non-empty rendered items
        return renderedItems.length > 0 ? renderedItems : null;
    };
    
      

    return(
       <React.Fragment>
        <div className='flex  font-bold text-white bg-slate-600 h-full pl-1 text-sm sm:text-base shadow-md'>
                <h2 className='my-1'>Android Info</h2>
            </div>
        <div className='max-h-screen overflow-auto'>
            
            {renderKeyValuePairs(androguard)}
        </div>
       </React.Fragment>
    )
}


export function Bundle({ jsonData }) {

    const {bundle_info} = extractAllData(jsonData);
    
    if(!bundle_info){
        return null;
    }

    const renderKeyValuePairs = (data, depth = 0) => {
        if (!data || typeof data !== 'object') return null;
      
        const renderedItems = Object.entries(data)
          .filter(([_, value]) => value && (typeof value !== 'object' || Object.keys(value).length > 0)) // filter empty keys and values with no data
          .map(([key, value]) => (
            <div key={`${depth}-${key}`} className="flex items-start mb-2 bg-gray-100 rounded p-2 shadow-md dark:bg-gray-800 dark:text-gray-200"> {/* Add margin-bottom for spacing */}
              <div>
                <span className='font-bold text-gray-500 dark:text-gray-500'>{key.replace(/([A-Z])/g, ' $1').trim()}</span>&nbsp; &nbsp;
                {Array.isArray(value) ? (
                  <div className="ml-4">
                    {value.map((item, index) => (
                      <div key={`${depth}-${key}-${index}`} className="mt-1">
                        {item}
                      </div>
                    ))}
                  </div>
                ) : typeof value === 'object' ? (
                  <details className="ml-4">
                    <summary className="cursor-pointer text-indigo-500 dark:text-indigo-300">{key}</summary>
                    {renderKeyValuePairs(value, depth + 1)}
                  </details>
                ) : (
                  <span className='text-gray-700 dark:text-gray-300'>{value}</span>
                )}
              </div>
            </div>
          ));
      
        // Only return non-empty rendered items
        return renderedItems.length > 0 ? renderedItems : null;
    };
    
      

    return(
       <React.Fragment>
        <div className='flex  font-bold text-white bg-slate-600 h-full pl-1 text-sm sm:text-base shadow-md'>
                <h2 className='my-1'>Bundle Info</h2>
            </div>
        <div className='max-h-screen overflow-auto'>
            
            {renderKeyValuePairs(bundle_info)}
        </div>
       </React.Fragment>
    )
}



