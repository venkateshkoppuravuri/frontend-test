import React from "react";

const SearchPreview = ({ index, id, title, handleSuggestionClick, selectedSuggestionIndex }) => {
    return (
        <div
            key={id}
            onClick={() => handleSuggestionClick(id)}
            className={`search-preview ${index === 0 ? "start" : ""} ${index === selectedSuggestionIndex ? "selectedSuggestionIndex" : ""}`}
        >
            <p className="title">{title}</p>
        </div>
    );
};

export default SearchPreview;
