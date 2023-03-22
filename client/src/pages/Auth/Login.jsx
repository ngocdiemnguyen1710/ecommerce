import React from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../../config/axios";
import { useAuth } from "../../context/auth";
import useForm, { Form } from "../../hooks/useForm";
import { Controls } from "../controls/Controls";

const initialValue = {
  email: "",
  password: "",
};
const Login = () => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "Look Good!" : "Email is required";
    }
    if ("password" in fieldValues) {
      temp.password = fieldValues.password
        ? "Look Good!"
        : "Password is required";
    }

    setErrors({ ...temp });

    if (fieldValues == values) {
      return Object.values(temp).every((x) => x === "Look Good!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = values.email;
    const password = values.password;
    if (validate()) {
      const res = await axiosClient.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        const newAuth = JSON.stringify({
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", newAuth);
        toast.success(res.data && res.data.message);
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    }
  };
  const { values, setValues, handleChange, errors, setErrors } = useForm(
    initialValue,
    validate
  );

  return (
    <div className="form register">
      <h3 className="text-center mb-4">Sign in</h3>
      <Form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Controls.Input
            type="text"
            label="Email"
            value={values.email}
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            error={errors.email}
          />
        </div>
        <div className="mb-3">
          <Controls.Input
            type="password"
            label="Password"
            value={values.password}
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            error={errors.password}
          />
        </div>
        <div className="mb-3">
          <Controls.Button title="Login" />
        </div>
        <div className="text-center">
          <Link to="/forgot-password" className="text-decoration-none">
            Forgot password ?
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
