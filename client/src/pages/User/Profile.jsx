import React, { useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import { Controls } from "../controls/Controls";
import { Form } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { useAuth } from "../../context/auth";
import axiosClient from "../../config/axios";
import { toast } from "react-hot-toast";

const initialValue = {
  email: "",
  password: "",
  name: "",
  phone: "",
  address: "",
};

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const validate = (fieldValues = values) => {
    if (fieldValues == values) {
      return Object.values(temp).every((x) => x === "Look Good!");
    }
  };
  const { values, setValues, handleChange, errors, setErrors } = useForm(
    initialValue,
    validate
  );

  useEffect(() => {
    if (auth?.token) {
      setValues({ ...values, ...auth?.user });
    }
  }, [auth?.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = values.name;
    const email = values.email;
    const password = values.password;
    const phone = values.phone;
    const address = values.address;
    const { data } = await axiosClient.put("/api/v1/auth/profile", {
      name,
      email,
      password,
      phone,
      address,
    });
    if (data && data.success) {
      setAuth({ ...auth, user: data?.updateUser });
      let newData = localStorage.getItem("auth");
      newData = JSON.parse(newData);
      newData.user = data.updateUser;
      localStorage.setItem("auth", JSON.stringify(newData));

      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="container-fluid dashboard">
      <div className="row">
        <div className="col-md-3 dashboard-left">
          <UserMenu />
        </div>
        <div className="col-md-9 dashboard-right">
          <div className="w-75 dashboard-right-title mb-4">
            Basic Information
          </div>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <Controls.Input
                  type="text"
                  label="Email"
                  value={values.email}
                  name="email"
                  placeholder="abc@gmail.com"
                  onChange={handleChange}
                  error={errors.email}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <Controls.Input
                  type="password"
                  label="Password"
                  value={values.password}
                  name="password"
                  onChange={handleChange}
                  error={errors.password}
                  required
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <Controls.Input
                  type="text"
                  label="Name"
                  value={values.name}
                  name="name"
                  placeholder="ABCxyz"
                  onChange={handleChange}
                  error={errors.name}
                  required
                />
              </div>
              <div className="col-md-6">
                <Controls.Input
                  type="text"
                  label="Phone"
                  value={values.phone}
                  name="phone"
                  placeholder="0356788823"
                  onChange={handleChange}
                  error={errors.phone}
                  required
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <Controls.Input
                  type="text"
                  label="Address"
                  value={values.address}
                  name="address"
                  placeholder="27A, NNA Street, HCMC"
                  onChange={handleChange}
                  error={errors.address}
                  required
                />
              </div>
            </div>

            <div className="mt-3">
              <Controls.ButtonAction title="Update" />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
