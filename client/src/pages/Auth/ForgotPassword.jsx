import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../config/axios";
import useForm, { Form } from "../../hooks/useForm";
import { Controls } from "../controls/Controls";

const initialValue = {
  email: "",
  answer: "",
  newPassword: "",
};
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "Look Good!" : "Email is required";
    }
    if ("answer" in fieldValues) {
      temp.answer = fieldValues.answer ? "Look Good!" : "Answer is required";
    }
    if ("newPassword" in fieldValues) {
      temp.newPassword = PWD_REGEX.test(fieldValues.newPassword)
        ? "Look Good!"
        : "Password from 4 to 12 keyword";
    }

    setErrors({ ...temp });

    if (fieldValues == values) {
      return Object.values(temp).every((x) => x === "Look Good!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = values.email;
    const answer = values.answer;
    const newPassword = values.newPassword;
    if (validate()) {
      const res = await axiosClient.post("/api/v1/auth/forgot-password", {
        email,
        answer,
        newPassword,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
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
      <h3 className="text-center mb-4">Forgot Password</h3>
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
            type="text"
            label="What is your best friend ?"
            value={values.answer}
            name="answer"
            placeholder="Enter your answer"
            onChange={handleChange}
            error={errors.answer}
          />
        </div>
        <div className="mb-3">
          <Controls.Input
            type="password"
            label="New Password"
            value={values.newPassword}
            name="newPassword"
            placeholder="Enter your password"
            onChange={handleChange}
            error={errors.newPassword}
          />
        </div>
        <div className="mb-3">
          <Controls.Button title="Reset" />
        </div>
      </Form>
    </div>
  );
};

export default ForgotPassword;
