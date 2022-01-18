import { useParams } from "react-router-dom";

const Search = () => {
  const { cityName } = useParams();

  console.log(cityName);

  return <h1>this is the search view</h1>;
};

export default Search;
