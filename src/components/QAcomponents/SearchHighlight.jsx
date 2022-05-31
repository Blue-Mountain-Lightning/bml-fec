import React from 'react';
import Highlighter from 'react-highlight-words';
const SearchHighlight = ({questionBody, searchInput}) => {
  return <Highlighter
  searchWords={[searchInput]}
  autoEscape={true}
  textToHighlight={questionBody}
/>
}
export default SearchHighlight;