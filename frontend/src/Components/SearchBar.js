import React from 'react';
import { MagnifyingGlassIcon  } from '@heroicons/react/24/outline';

const SearchBar = () => {
  return (
    <div className="flex items-center border-b border-gray-300 py-2">
      <input
        className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="Search..."
        aria-label="Search"
      />
      <button
        className="flex-shrink-0 flex gap-2 font-medium bg-custom-darkGreen hover:bg-custom-lightGreen border-custom-darkGreen hover:border-custom-lightGreen text-sm border-4 text-white py-1 px-2 rounded"
        type="button"
      >
        Search
        <MagnifyingGlassIcon className="h-5 w-5 text-white" />
      </button>
    </div>
  );
};

export default SearchBar;
