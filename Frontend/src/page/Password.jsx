
import React, { useState } from 'react';
import { handleSearch, SearchBox } from '../utils';
import {Header, Results} from '../components/password';


const Password = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
  
    
    const onSubmitSearch = (input) => {
      handleSearch(input, setResult, setError);
    };
  
      return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-[#060720] text-white p-5">
              <Header />
              <SearchBox onSubmit={onSubmitSearch} />
              {error && <div className="text-red-500 mt-4">{error}</div>} {/* Display error message if any */}
              <Results data={result} />
          </div>
      );
  }
  

  export default Password;
