import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu";
import axiosClient from "../../config/axios";

const Products = () => {
  const [dataProduct, setDataProduct] = useState(null);

  useEffect(() => {
    getAllProduct();
  }, []);

  const baseUrl = "http://localhost:8080";
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

export default Products;
