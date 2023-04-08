import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu";
import axiosClient from "../../config/axios";
import ProductItem from "../components/ProductItem";
import { Controls } from "../controls/Controls";

const Products = () => {
  const [dataProduct, setDataProduct] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllProduct();
  }, []);

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

  return (
    <div className="container-fluid dashboard">
      <div className="row">
        <div className="col-md-3 dashboard-left">
          <AdminMenu />
        </div>
        <div className="col-md-9 dashboard-right">
          <div className="dashboard-right-title mb-4">All product list</div>
          <div className="list-product-wp">
            {dataProduct &&
              dataProduct.length > 0 &&
              dataProduct.map((data) => {
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
          <div className="mt-3 text-center">
            {dataProduct && dataProduct.length < total && (
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

export default Products;
