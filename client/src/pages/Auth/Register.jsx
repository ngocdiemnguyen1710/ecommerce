import React from "react";
import { toast } from "react-hot-toast";
import useForm, { Form } from "../../hooks/useForm";
import { Controls } from "../controls/Controls";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../config/axios";

const initialValue = {
  email: "",
  password: "",
  name: "",
  phone: "",
  address: "",
  answer: "",
};

const EMAIL_REGEX = /$^|.+@.+..+/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const Register = () => {
  const navigate = useNavigate();
  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "Look Good!" : "Email is not valid";
    }
    if ("password" in fieldValues) {
      temp.password = PWD_REGEX.test(fieldValues.password)
        ? "Look Good!"
        : "Password from 4 to 12 keyword";
    }
    if ("name" in fieldValues) {
      temp.name = fieldValues.name ? "Look Good!" : "Name is required";
    }
    if ("phone" in fieldValues) {
      temp.phone =
        fieldValues.phone.length > 9
          ? "Look Good!"
          : "Minimum 10 numbers required";
    }
    if ("address" in fieldValues) {
      temp.address = fieldValues.address ? "Look Good!" : "Address is required";
    }
    if ("answer" in fieldValues) {
      temp.answer = fieldValues.answer ? "Look Good!" : "Answer is required";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = values.name;
    const email = values.email;
    const password = values.password;
    const phone = values.phone;
    const address = values.address;
    const answer = values.answer;
    if (validate()) {
      const res = await axiosClient.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    }
  };
  return (
    <div className="form register">
      <h3 className="text-center mb-4">Register</h3>
      <Form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Controls.Input
            type="text"
            label="Email"
            value={values.email}
            name="email"
            placeholder="abc@gmail.com"
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
            placeholder="1234"
            onChange={handleChange}
            error={errors.password}
          />
        </div>
        <div className="mb-3">
          <Controls.Input
            type="text"
            label="Name"
            value={values.name}
            name="name"
            placeholder="ABCxyz"
            onChange={handleChange}
            error={errors.name}
          />
        </div>
        <div className="mb-3">
          <Controls.Input
            type="text"
            label="Phone"
            value={values.phone}
            name="phone"
            placeholder="0356788823"
            onChange={handleChange}
            error={errors.phone}
          />
        </div>
        <div className="mb-3">
          <Controls.Input
            type="text"
            label="Address"
            value={values.address}
            name="address"
            placeholder="27A, NNA Street, HCMC"
            onChange={handleChange}
            error={errors.address}
          />
        </div>
        <div className="mb-3">
          <Controls.Input
            type="text"
            label="Who is your best friend?"
            value={values.answer}
            name="answer"
            placeholder="John, Andy,..."
            onChange={handleChange}
            error={errors.answer}
          />
        </div>
        <div className="mb-3">
          <Controls.Button title="Submit" />
        </div>
      </Form>
    </div>
  );
};

export default Register;
