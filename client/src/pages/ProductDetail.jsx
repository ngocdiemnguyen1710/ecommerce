import React, { useEffect, useState } from "react";
import axiosClient from "../config/axios";
import { Controls } from "./controls/Controls";
import { BsCartPlus } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import ProductItem from "./components/ProductItem";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  const baseUrl = "http://localhost:8080";

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  const getProduct = async () => {
    const { data } = await axiosClient.get(
      `/api/v1/product/get-product/${params?.slug}`
    );
    if (data && data.success) {
      setProduct(data.product);
      getRelatedProduct(data?.product?._id, data?.product?.category._id);
    } else {
      toast.error(data.message);
    }
  };

  const getRelatedProduct = async (pid, cid) => {
    const { data } = await axiosClient.get(
      `/api/v1/product/related-product/${pid}/${cid}`
    );
    if (data && data.success) {
      setRelatedProduct(data?.products);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <>
      <div className="homepage product-detail">
        <div className="row">
          <div className="col-md-6 product-detail-left">
            <div className="product-detail-wp-img">
              <img
                src={`${baseUrl}/api/v1/product/product-photo/${product?._id}`}
                className="product-detail-img"
                alt={product?.name}
              />
            </div>
          </div>
          <div className="col-md-6 product-detail-right">
            <div className="product-detail-name">{product?.name}</div>
            <div className="product-detail-price">${product?.price}</div>
            <div className="product-detail-space"></div>
            <div className="product-detail-action">
              <Controls.ButtonAction
                title={"Add to cart"}
                icon={<BsCartPlus />}
                className="product-detail-action--add-cart"
              />
              <Controls.ButtonAction
                title={"Buy now"}
                className="product-detail-action--buy-now"
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="row product-detail-similar">
          <h5 className="title mt-5">Similar product</h5>
          {relatedProduct.length < 1 && (
            <p className="text-center">No similar product found</p>
          )}
          <div className="list-product-wp mt-3">
            {relatedProduct?.map((data) => {
              return (
                <ProductItem
                  key={data._id}
                  id={data._id}
                  alt={data.name}
                  name={data.name}
                  description={data.description}
                  price={data.price}
                  handleMoreDetail={() => navigate(`/product/${data.slug}`)}
                  btn
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
