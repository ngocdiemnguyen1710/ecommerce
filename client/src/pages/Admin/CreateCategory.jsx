import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axiosClient from "../../config/axios";
import FormCategory from "./Form/FormCategory";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Controls } from "../controls/Controls";
import { Modal } from "antd";

const CreateCategory = () => {
  const [dataCategory, setDataCategory] = useState(null);
  const [nameEdit, setNameEdit] = useState(null);
  const [idEdit, setIdEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    const res = await axiosClient.get("/api/v1/category/get-category");
    setDataCategory(res.data.category);
  };

  const handleSubmit = async (nameCategory) => {
    const res = await axiosClient.post("/api/v1/category/create-category", {
      name: nameCategory,
    });
    if (res.data && res.data.success) {
      setDataCategory([...dataCategory, res.data.category]);
      toast.success(`${res.data.category.name} created succesfully`);
    } else {
      toast.error(res.data.message);
    }
  };

  const openInPopup = (item) => {
    setIsModalOpen(true);
    setNameEdit(item);
    setIdEdit(item);
  };

  const handleEdit = async () => {
    const res = await axiosClient.put(
      `/api/v1/category/update-category/${idEdit._id}`,
      {
        name: nameEdit.name,
      }
    );
    if (res.data && res.data.success) {
      toast.success(`${res.data.category.name} updated succesfully`);
      getAllCategory();
      setIsModalOpen(false);
      setNameEdit(null);
    } else {
      toast.error(res.data.message);
    }
  };

  const handleChangeEdit = (name) => {
    setNameEdit((prev) => {
      if (prev) {
        return { ...prev, name };
      }
      return null;
    });
  };

  const handleDelete = async (id) => {
    const { data } = await axiosClient.delete(
      `/api/v1/category/delete-category/${id}`
    );
    if (data && data?.success) {
      getAllCategory();
      toast.success("Category deleted successllly");
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
          <div className="w-75 dashboard-right-title">Manage Category</div>
          <FormCategory handleSubmit={handleSubmit} />
          <div className="dashboard-table">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="w-75">Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dataCategory &&
                  dataCategory.length > 0 &&
                  dataCategory.map((data) => {
                    return (
                      <tr key={data._id}>
                        <td className="w-75">{data.name}</td>
                        <td>
                          <Controls.ButtonAction
                            title={"Edit"}
                            icon={<AiFillEdit />}
                            onClick={() => openInPopup(data)}
                          />

                          <Controls.ButtonAction
                            title={"Delete"}
                            icon={<AiFillDelete />}
                            onClick={() => handleDelete(data._id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        title="Update category"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <FormCategory
          nameEdit={nameEdit}
          handleEdit={handleEdit}
          idEdit={idEdit}
          handleChangeEdit={handleChangeEdit}
        />
      </Modal>
    </div>
  );
};

export default CreateCategory;
