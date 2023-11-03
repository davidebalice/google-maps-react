import React from "react";

const Search = ({
  searchQuery,
  setSearchQuery,
  setStartSearch,
  handleSearch,
  searchResult,
}) => {
  return (
    <div className="searchContainer">
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Search location..."
          className="input"
          value={searchQuery}
          onChange={(e) => {
            setStartSearch(false);
            setSearchQuery(e.target.value);
          }}
        />
        <button onClick={handleSearch} className="button">
          Search
        </button>
      </div>
      {searchResult &&
        (searchResult.address !== "" || searchResult.error !== "") && (
          <div>
            <p>{searchResult.address}</p>
            <p style={{ color: "#ff0000" }}>{searchResult.error}</p>
          </div>
        )}
    </div>
  );
};

export default Search;
