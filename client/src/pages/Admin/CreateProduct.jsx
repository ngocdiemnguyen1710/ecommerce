import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";

const CreateProduct = () => {
  return (
    <div className="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <AdminMenu />
        </div>
        <div class="col-md-9">
          <div className="card w-75 p-3">Product</div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;