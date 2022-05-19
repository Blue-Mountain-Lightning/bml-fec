import { useEffect, useState } from "react";

// Generic fetch for state.
// Input: API url
// Output: JSON of form { data: <API response>}
// Example call:: const products  = useFetch(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/`)
// Example data access:: console.log(JSON.parse(products.data))
// Possible improvement to return the response object/array itself?
export const useFetch = (url) => {
  const [state, setState] = useState({data: null})

  useEffect(() => {
    fetch(url, { headers: { 'Authorization': process.env.REACT_APP_TOKEN} })
      .then(response => response.text())
      .then(data => {
        setState({ data });
      })
  }, [url]) // url is dependency i.e. whenever url changes the useEffect will fire

  return state;
}