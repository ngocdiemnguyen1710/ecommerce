import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Prices } from "../components/Prices";
import axiosClient from "../config/axios";
import { Controls } from "./controls/Controls";
import ProductItem from "./components/ProductItem";
import { useCategoy } from "../hooks/useCategory";
import { useCart } from "../context/cart";

const Homepage = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  const categories = useCategoy();

  const navigate = useNavigate();

  useEffect(() => {
    if (!checkedList.length || !radio.length) {
      getAllProduct();
    }
  }, []);

  useEffect(() => {
    if (checkedList.length || radio.length) {
      filterProduct();
    }
  }, [checkedList, radio]);

  useEffect(() => {
    getCountProduct();
  }, [total]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const getAllProduct = async () => {
    setLoading(true);
    const { data } = await axiosClient.get(
      `/api/v1/product/product-list/${page}`
    );
    setLoading(false);
    if (data && data?.success) {
      setDataProduct(data?.products);
    } else {
      setLoading(false);
      toast.error(data.message);
    }
  };

  const getCountProduct = async () => {
    const { data } = await axiosClient.get("/api/v1/product/count-product");
    if (data && data?.success) {
      setTotal(data.total);
    } else {
      toast.error("Cannot count");
    }
  };

  const loadMore = async () => {
    setLoading(true);
    const { data } = await axiosClient.get(
      `/api/v1/product/product-list/${page}`
    );
    setLoading(false);
    if (data && data?.success) {
      setDataProduct([...dataProduct, ...data?.products]);
    } else {
      setLoading(false);
      toast.error(data.message);
    }
  };

  const filterProduct = async () => {
    const { data } = await axiosClient.post("/api/v1/product/product-filter", {
      checked: checkedList,
      radio,
    });
    if (data && data?.success) {
      setDataProduct(data?.products);
    } else {
      toast.error(data.message);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checkedList];
    if (value) {
      all.push(id);
    } else {
      let findIndex = all.findIndex((item) => item == id);
      if (findIndex !== -1) {
        all.splice(findIndex, 1);
      }
    }
    setCheckedList(all);
  };

  const handleAddToCart = (data) => {
    setCart([...cart, data]);
    const newData = JSON.stringify([...cart, data]);
    localStorage.setItem("cart", newData);
    toast.success("Add item to cart successfully!");
  };

  return (
    <div className="container-fluid homepage">
      <h4 className="homepage-title text-uppercase text-center">
        Shop all products
      </h4>
      <div className="row">
        <div className="col-md-2 homepage-left">
          <div className="home-left-item">
            <h6 className="homepage-left-title">Filter by category</h6>
            <div className="list-filter">
              {categories &&
                categories.map((category) => {
                  return (
                    <div key={category._id}>
                      <Controls.CheckboxFilter
                        title={category.name}
                        checked={
                          checkedList.findIndex((r) => r == category._id) > -1
                        }
                        value={category._id}
                        onChange={(e) =>
                          handleFilter(e.target.checked, category._id)
                        }
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="home-left-item  mt-5">
            <h6 className="homepage-left-title">Filter by prices</h6>
            <div className="list-filter">
              <Controls.RadioGroup
                items={Prices}
                value={radio}
                onChange={(e) => setRadio(e.target.value)}
              />
            </div>
          </div>
          <div className="home-left-item mt-5 d-flex justify-content-center">
            <Controls.ButtonAction
              title={"Reset Filter"}
              onClick={() => window.location.reload()}
            />
          </div>
        </div>
        <div className="col-md-10 homepage-right">
          <div className="homepage-list-product list-product-wp">
            {dataProduct?.map((data) => {
              return (
                <ProductItem
                  key={data._id}
                  id={data._id}
                  alt={data.name}
                  name={data.name}
                  description={data.description}
                  price={data.price}
                  handleMoreDetail={() => navigate(`/product/${data.slug}`)}
                  handleAddToCart={() => handleAddToCart(data)}
                  btn
                />
              );
            })}
          </div>
          <div className="mt-3 text-center">
            {dataProduct &&
              dataProduct.length < total &&
              !checkedList.length &&
              !radio.length && (
                <Controls.ButtonAction
                  title={loading ? "Loading..." : "Load more"}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
