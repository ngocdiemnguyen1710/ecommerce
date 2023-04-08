import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu";
import axiosClient from "../../config/axios";
import useForm from "../../hooks/useForm";
import ButtonAction from "../controls/ButtonAction";
import { Controls } from "../controls/Controls";
import { getImageUrl } from "../../assets/page/utils/image";

const shippingItems = [
  {
    id: "yes",
    name: "Yes",
  },
  {
    id: "no",
    name: "No",
  },
];

const initialValue = {
  name: "",
  description: "",
  price: "",
  category: "",
  quantity: "",
  shipping: "",
  photo: "",
};

const UpdateProduct = () => {
  const [dataCategory, setDataCategory] = useState(null);
  const [id, setId] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ("name" in fieldValues) {
      temp.nameCategory = fieldValues.name
        ? "Look Good!"
        : "Name of category is required";
    }

    setErrors({ ...temp });

    if (fieldValues == values) {
      return Object.values(temp).every((x) => x === "Look Good!");
    }
  };
  const { values, setValues, handleChange, errors, setErrors } = useForm(
    initialValue,
    validate
  );

  const getAllCategory = async () => {
    const res = await axiosClient.get("/api/v1/category/get-category");
    setDataCategory(res.data.category);
  };

  const getSingleProduct = async () => {
    const { data } = await axiosClient.get(
      `/api/v1/product/get-product/${params.slug}`
    );
    setValues({ ...values, ...data.product });
    setId(data.product._id);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const productData = new FormData();

    productData.append("name", values?.name);
    productData.append("description", values?.description);
    productData.append("price", values?.price);
    productData.append("category", values?.category?._id);
    productData.append("quantity", values?.quantity);
    productData.append("shipping", values?.shipping);
    productData.append("photo", values?.photo);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const { data } = await axiosClient.put(
      `/api/v1/product/update-product/${values._id}`,
      productData,
      config
    );
    if (data && data?.success) {
      toast.success("Product updated successfully!");
      getAllProduct();
      navigate("/dashboard/admin/products");
    } else {
      toast.error(data.message);
    }
  };

  const handleDeleteProduct = async () => {
    const { data } = await axiosClient.delete(
      `/api/v1/product/delete-product/${values._id}`
    );

    if (data && data?.success) {
      toast.success("Product deleted successfully!");
      navigate("/dashboard/admin/products");
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    if (params?.slug) {
      getSingleProduct();
    }
  }, [params?.slug]);

  return (
    <div className="container-fluid dashboard">
      <div className="row">
        <div className="col-md-3 dashboard-left">
          <AdminMenu />
        </div>
        <div className="col-md-9 dashboard-right">
          <div className="w-75 dashboard-right-title mb-4">Update Product</div>
          <div className="mb-3">
            <Controls.Select
              placeholder="Select a category"
              options={dataCategory}
              onChange={handleChange}
              value={values?.category.name}
              name="category"
              error={errors.category}
            />
          </div>
          <div className="mb-3">
            <Controls.InputFile
              photoName={values.photo.name}
              onChange={handleChange}
              value={""}
              name="photo"
            />
          </div>
          <div className="mb-3">
            {values.photo ? (
              <div className="text-center">
                <img
                  className="img img-responsive"
                  src={URL.createObjectURL(values.photo)}
                  alt="photo upload"
                  height={"200px"}
                />
              </div>
            ) : (
              <div className="text-center">
                <img
                  className="img img-responsive"
                  src={getImageUrl(id)}
                  alt="photo upload"
                  height={"200px"}
                />
              </div>
            )}
          </div>
          <div className="mb-3">
            <Controls.Input
              placeholder={"Enter the name of product"}
              type="text"
              value={values?.name}
              name="name"
              onChange={handleChange}
              className="w-100"
            />
          </div>
          <div className="mb-3">
            <Controls.TextAreaInput
              rows={4}
              value={values.description}
              name="description"
              onChange={handleChange}
              placeholder="Enter the description of product"
            />
          </div>
          <div className="mb-3">
            <Controls.Input
              placeholder={"Enter the price of product"}
              type="number"
              value={values.price}
              name="price"
              onChange={handleChange}
              className="w-100"
            />
          </div>
          <div className="mb-3">
            <Controls.Input
              placeholder={"Enter the quantity in stock"}
              type="number"
              value={values.quantity}
              name="quantity"
              onChange={handleChange}
              className="w-100"
            />
          </div>
          <div className="mb-3">
            <Controls.RadioGroup
              label={"Do you want to ship?"}
              value={values.shipping ? "yes" : "no"}
              name="shipping"
              onChange={handleChange}
              items={shippingItems}
            />
          </div>
          <div className="mb-3">
            <ButtonAction title={"Update"} onClick={handleUpdateProduct} />
            <ButtonAction title={"Delete"} onClick={handleDeleteProduct} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
