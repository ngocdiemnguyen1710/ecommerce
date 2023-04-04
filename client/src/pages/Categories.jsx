import React from "react";
import { useCategoy } from "../hooks/useCategory";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const categories = useCategoy();

  const navigate = useNavigate();

  return (
    <div className="homepage">
      <h4 className="homepage-title text-uppercase text-center">
        All Categories
      </h4>
      <div className="list-category-wp">
        {categories?.map((category) => {
          return (
            <button
              className="category-item"
              key={category._id}
              onClick={() => navigate(`/category/${category?.slug}`)}
            >
              {category?.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
