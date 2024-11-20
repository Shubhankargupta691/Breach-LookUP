
import React, { useState } from 'react';
import SearchBox from '../utils/SearchBox';
import { handleSearch } from '../utils/api';
import Results from '../components/password/Result';
import Header from '../components/password/Header';


const Password = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
  
    
    const onSubmitSearch = (input) => {
      handleSearch(input, setResult, setError);
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
  

  export default Password;
