import React, { useEffect, useState} from "react";

import { fetchSuggestions, fetchProductDetail } from "./utils/api";
import useDebounce from "./hooks/useDebounce";

import "./App.css";

import Autocomplete from "./Autocomplete";
import ProductDetail from "./ProductDetail";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false); // state for search status
  const [productId, setProductId] = useState(null);
  const debouncedInputValue = useDebounce(searchTerm, 500); // get debounced input value

  useEffect(() => {
    //  function that fetches data from an API based on query
    async function fetchData(query) {
      try {
        setIsSearching(true); // set isSearching to true before making API call
        fetchSuggestions(debouncedInputValue).then(
          (_suggestions) => setSuggestions(_suggestions?.slice(0, 10)
        )).catch((error) => {
          console.error(error);
        }); // replace with your API endpoint and query parameter
        setIsSearching(false); // set isSearching to false after getting response
      } catch (error) {
        console.error(error); // handle error if any
        setIsSearching(false); // set isSearching to false in case of error
      }
    }

    if (debouncedInputValue) {
      fetchData(debouncedInputValue); // call fetchData only if debouncedInputValue is not empty
    } else {
      setSuggestions([]); // clear results if debouncedInputValue is empty
    }
  }, [debouncedInputValue]);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      // Enter key
      if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
        handleSuggestionClick(suggestions[selectedSuggestionIndex].id);
      }
    } else if (event.keyCode === 38) {
      // Up arrow
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (event.keyCode === 40) {
      // Down arrow
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    };
  };

  const handleSuggestionClick = (productId) => {
    setProductId(productId);
    if(productId !== -1) fetchProductDetail(productId);
    setSearchTerm("");
    setSuggestions([]);
    setSelectedSuggestionIndex(-1);
  };

  return (
    <div className="App">
      <Autocomplete 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        suggestions={suggestions}
        handleSuggestionClick={handleSuggestionClick}
        selectedSuggestionIndex={selectedSuggestionIndex}
        handleKeyDown={handleKeyDown}
        isSearching={isSearching}
      />
      <ProductDetail productId={productId} />
    </div>
  );
}

export default App;
