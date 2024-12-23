import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { FileLogo, URLLogo, SearchLogo } from './Logo'

export function File() {

    const handleFileUploadClick = () => {
      document.getElementById("fileUpload").click();
    };

    return (
      <React.Fragment>
        <div className='flex justify-center items-center my-5 mx-auto'>
            <div className='justify-center'>
                <FileLogo />
                <div className='my-4 mx-auto'>
                    <button className='box-border border-white border-2 rounded-md p-2' role='button' aria-label='Choose File'
                        onClick={handleFileUploadClick}
                    >
                        Choose File
                    </button>
                    <input type="file" id="fileUpload" name="file" style={{ display: 'none' }}/>
                </div>
            </div> 
        </div>
      </React.Fragment>
        
        
    );
}

export function URL() {
    const [Input, setInput] = useState('');
    const handleSearchChange = (event) => {
        const inputValue = event.target.value.trim();
        setInput(inputValue);    
    };

  return (
    <React.Fragment>
      <div className='flex justify-center items-center my-5 mx-auto'>
        <URLLogo />
      </div>
      <div className='w-[30rem] mx-auto transform -translate-x-1/2'>
        <form  >
          <input
            className="form-control border-0 bg-gray-800 py-2 px-4 w-full text-white rounded-r-md transition-all duration-300 ease-in-out focus:bg-gray-700 focus:outline-none"
            type="text"
            id="searchInput"
            autoComplete="off"
            spellCheck="false"
            placeholder="Search or scan a URL/domain"
            value={Input}
            onChange={handleSearchChange}
          />
        </form>
      </div>
    </React.Fragment>
  );
}

export function AllSearch() {
    const [searchInput, setSearchInput] = useState('');

    const handleSearchChange = (e) => {
        const inputValue = e.target.value.trim();
        setSearchInput(inputValue);
    };
    return (
        <React.Fragment>
            <div className='flex justify-center items-center my-5 mx-auto'>
                <URLLogo />
            </div>
            <div className='w-[30rem] mx-auto transform -translate-x-1/2'>
                <form className=''>
                    <input
                        className="form-control border-0 bg-gray-800 py-2 px-4 w-full text-white rounded-r-md transition-all duration-300 ease-in-out focus:bg-gray-700 focus:outline-none"
                        type="text"
                        id="searchInput"
                        autoComplete="off"
                        spellCheck="false"
                        placeholder="URL, IP address, domain or file hash"
                        value={searchInput}
                        onChange={handleSearchChange}
                    />
                </form>
            </div>
        </React.Fragment>
    );
}