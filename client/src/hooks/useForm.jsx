import React, { useState } from "react";

const useForm = (initialValue, validate) => {
  const [values, setValues] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    validate({ [name]: value });
  };

  return { values, setValues, handleChange, errors, setErrors };
};

export default useForm;

export const Form = ({ children, ...props }) => {
  return (
    <form className="needs-validation" noValidate {...props}>
      {children}
    </form>
  );
};
