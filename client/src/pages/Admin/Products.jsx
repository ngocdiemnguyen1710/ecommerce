import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu";
import axiosClient from "../../config/axios";
import ProductItem from "../components/ProductItem";

const Products = () => {
  const [dataProduct, setDataProduct] = useState(null);

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    const { data } = await axiosClient.get("/api/v1/product/get-product");
    if (data && data?.success) {
      setDataProduct(data.products);
    } else {
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
        </div>
      </div>
    </div>
  );
};

export default Products;
