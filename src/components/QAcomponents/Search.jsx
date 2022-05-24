import React from 'react';
//import SearchIcon from '@mui/icons-material/Search';
const Search = ({handleSearch}) => {
  const handleFocus =(event) => {
    event.preventDefault();
    event.target.setSelectionRange(0, event.target.value.length);
  }
  const handleOnChange = (event) => {
    handleSearch(event.target.value);
  }
  return (
    <div className="search-bar">
      <form>
        <input className='qa-search' type='search' placeholder='Have a question? Search for answers...'
        onChange={handleOnChange}
        onFocus={handleFocus}
        />
      </form>
    </div>
  )
}
export default Search;