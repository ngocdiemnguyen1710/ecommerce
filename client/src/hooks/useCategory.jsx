import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axiosClient from "../config/axios";

export const useCategoy = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    const { data } = await axiosClient.get("/api/v1/category/get-category");
    if (data && data.success) {
      setCategories(data.category);
    } else {
      toast.error(data.message);
    }
  };

  return categories;
};
