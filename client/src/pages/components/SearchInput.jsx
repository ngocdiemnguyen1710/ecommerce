import { Input } from "antd";
import { useSearch } from "../../context/search";
import axiosClient from "../../config/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

const SearchInput = () => {
  const [search, setSearch] = useSearch();

  const navigate = useNavigate();
  const handleSearch = async () => {
    try {
      const { data } = await axiosClient.get(
        `/api/v1/product/search/${search.keyword}`
      );

      if (data) {
        setSearch({ results: data });
        navigate("/search");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Search
      placeholder="Enter keyword"
      onSearch={handleSearch}
      allowClear
      enterButton="Search"
      size="large"
      style={{
        width: 500,
      }}
      value={search.keyword}
      onChange={(e) =>
        setSearch((prev) => ({ ...prev, keyword: e.target.value }))
      }
    />
  );
};

export default SearchInput;
