import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../config/axios";
import { toast } from "react-hot-toast";
import ProductItem from "./components/ProductItem";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);

  const getProductsByCategory = async () => {
    const { data } = await axiosClient.get(
      `/api/v1/product/product-category/${params.slug}`
    );
    if (data && data.success) {
      setProducts(data?.products);
      setCategory(data.category);
    } else {
      toast.error(data.message);
    }
  };
  return (
    <>
      <div className="homepage">
        <h4 className="homepage-title text-center">
          Category - {category?.name}
        </h4>
        <p className="text-center">
          {products?.length}{" "}
          {products?.length <= 1 ? "result found" : "results found"}
        </p>
        <div className="list-product-wp">
          {products?.map((data) => {
            return (
              <ProductItem
                key={data?._id}
                id={data?._id}
                alt={data?.name}
                name={data?.name}
                description={data?.description}
                price={data?.price}
                handleMoreDetail={() => navigate(`/product/${data?.slug}`)}
                btn
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CategoryProduct;
