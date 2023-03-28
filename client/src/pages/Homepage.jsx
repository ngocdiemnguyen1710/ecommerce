import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Prices } from "../components/Prices";
import axiosClient from "../config/axios";
import { Controls } from "./controls/Controls";

const baseUrl = "http://localhost:8080";

const Homepage = () => {
  const [dataProduct, setDataProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [radio, setRadio] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    if (!checkedList.length || !radio.length) {
      getAllProduct();
    }
  }, [checkedList.length, radio.length]);

  useEffect(() => {
    if (checkedList.length || radio.length) {
      filterProduct();
    }
  }, [checkedList, radio]);

  const getAllCategory = async () => {
    const { data } = await axiosClient.get("/api/v1/category/get-category");
    setCategories(data.category);
  };

  const getAllProduct = async () => {
    const { data } = await axiosClient.get("/api/v1/product/get-product");
    if (data && data?.success) {
      setDataProduct(data.products);
    } else {
      toast.error(data.message);
    }
  };

  const filterProduct = async () => {
    const { data } = await axiosClient.post("/api/v1/product/product-filter", {
      checked: checkedList,
      radio,
    });
    console.log(data);
    if (data && data?.success) {
      setDataProduct(data.products);
    } else {
      toast.error(data.message);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checkedList];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((item) => item !== id);
    }
    setCheckedList(all);
  };

  return (
    <div className="container-fluid homepage">
      <h4 className="homepage-title text-uppercase text-center">
        Shop all products
      </h4>
      <div className="row">
        <div className="col-md-2 homepage-left">
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
                      value={checkedList}
                      onChange={(e) =>
                        handleFilter(e.target.checked, category._id)
                      }
                    />
                  </div>
                );
              })}
          </div>
          <h6 className="homepage-left-title mt-5">Filter by prices</h6>
          <div className="list-filter">
            <Controls.RadioGroup
              items={Prices}
              value={radio}
              onChange={(e) => setRadio(e.target.value)}
            />
          </div>
          <Controls.ButtonAction
            title={"Reset Filter"}
            onClick={() => window.location.reload()}
          />
        </div>
        <div className="col-md-10 homepage-right">
          <div className="homepage-list-product list-product-wp">
            {dataProduct?.map((data) => {
              return (
                <Link
                  to={`/dashboard/admin/update-product/${data.slug}`}
                  key={data._id}
                >
                  <div className="card card-item">
                    <img
                      src={`${baseUrl}/api/v1/product/product-photo/${data._id}`}
                      className="card-img-top"
                      alt={data.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center text-uppercase">
                        {data.name}
                      </h5>
                      <p className="card-text text-center">${data.price}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
