
import React, { useState } from 'react';
import SearchBox from '../utils/SearchBox';
import Results from '../components/email/Result';
import Header from '../components/email/Header';
import { handleSearch } from '../utils/api';


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