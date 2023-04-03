import React from "react";
import { Controls } from "../controls/Controls";
import { BsCartPlus } from "react-icons/bs";

const ProductItem = ({
  id,
  alt,
  name,
  description,
  price,
  btn,
  handleMoreDetail,
  handleAddToCart,
  baseUrl = "http://localhost:8080",
}) => {
  return (
    <>
      <div className="card card-item">
        <img
          src={`${baseUrl}/api/v1/product/product-photo/${id}`}
          className="card-img-top"
          alt={alt}
        />
        <div className="card-body">
          <h5 className="card-title text-center text-uppercase">{name}</h5>
          <p className="card-text text-center">
            {description.substring(0, 30)}...
          </p>
          <h6 className="text-center">${price}</h6>
          {btn && (
            <div className="d-flex justify-content-center">
              <Controls.ButtonAction
                title={"More Detail"}
                onClick={handleMoreDetail}
              />
              <Controls.ButtonAction
                icon={<BsCartPlus />}
                className="btn-no-title"
                onClick={handleAddToCart}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductItem;
