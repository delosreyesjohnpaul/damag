/*"use client";
import { useState } from 'react';

const SearchInput = () => {

    const [searchQuery, setSearchQuery] = useState("");

    const onSearch = () => {

    }

  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (

    <form className="flex justify-center w-2/3">
    <input
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
      className={`
        ml-20 
        mr-20 
        px-3 
        py-1 
        w-1/2 
        sm:px-4 
        sm:py-2 
        flex-1 
        text-zinc-800 
        dark:text-zinc-200
        bg-transparent
        border
        border-custom-thin
        ${isFocused || hasValue ? 'border-blue-500' : 'border-gray-200'}
        dark:${isFocused || hasValue ? 'border-blue-400' : 'border-gray-950'}  // Using custom gray-950
        focus:border-blue-500 
        dark:focus:border-blue-400
        focus:ring-0 
        outline-none 
        rounded-full 
        placeholder:text-zinc-600 
        dark:placeholder:text-zinc-400 
        transition-all 
        duration-300
      `}
      placeholder="What are you looking for?"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />

    </form>
  );
};

export default SearchInput;
*/