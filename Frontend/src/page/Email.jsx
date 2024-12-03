
import React, { useState } from 'react';
import { handleSearch, SearchBox } from '../utils';
import {Header, Results} from '../components/email';


const Email = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const onSubmitSearch = (input, endpoint) => {
      handleSearch(input, endpoint, setResult, setError);
    };
  
      return (
         <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-5">
              <Header />
              <SearchBox onSubmit={onSubmitSearch} />
              {error && <div className="text-red-500 mt-4">{error}</div>} {/* Display error message if any */}
              <Results data={result} />
          </div>
      );
  }
  
export default Email;