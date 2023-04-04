import { Link } from "react-router-dom";
import { useSearch } from "../context/search";
import ProductItem from "./components/ProductItem";

const Search = () => {
  const [search, setSearch] = useSearch();

  return (
    <div className="container-fluid homepage">
      <div className="search-title mb-4">
        <span style={{ fontWeight: "700" }}>Search result:</span>{" "}
        {search.results.length < 1
          ? "No found product"
          : `${search.results.length} found`}
      </div>
      <div className="list-product-wp list-result-product">
        {search.results?.map((data) => {
          return (
            <Link
              to={`/dashboard/admin/update-product/${data.slug}`}
              key={data._id}
            >
              <ProductItem
                id={data._id}
                alt={data.name}
                name={data.name}
                description={data.description}
                price={data.price}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
