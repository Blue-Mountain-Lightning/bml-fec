import React from 'react';
const Search = ({handleSearch}) => {
  const handleOnChange = (event) => {
    handleSearch(event.target.value);
  }
  return (
    <div >
      <form>
        <input className='qa-search' type='search' placeholder='Have a question? Search for answers...'
        onChange={handleOnChange}
        />
      </form>
    </div>
  )
}
export default Search;