import React from "react";
import "./Autocomplete.css";
import SearchPreview from "./SearchPreview";

function Autocomplete({ searchTerm, setSearchTerm, suggestions, handleSuggestionClick, handleKeyDown, isSearching, selectedSuggestionIndex }) {
  const renderResults = suggestions.length > 0 && suggestions.map(({ id, title }, index) => {
    return (
      <SearchPreview
        key={id}
        id={id}
        index={index}
        title={title}
        handleSuggestionClick={handleSuggestionClick}
        selectedSuggestionIndex={selectedSuggestionIndex}
      />
    );
  });

  return (
    <div className="search-container">
      <div className="input-bar">
        {isSearching ? <p>Searching...</p> : null}
        <input
          type="text"
          value={searchTerm}
          className="search-bar"
          placeholder="Search for a product"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        /> 
        {suggestions.length > 0 ? (
          <div className="search-results">{renderResults}</div> 
        ): null}
        <button
          onClick={() => setSearchTerm("")}
          className={`cancel-btn ${searchTerm.length > 0 ? "active" : "inactive"}`}
        >
          x
        </button>
      </div>
    </div>
  );
}

export default Autocomplete;
