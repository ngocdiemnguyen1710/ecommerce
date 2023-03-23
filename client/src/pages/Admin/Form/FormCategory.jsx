import React, { useEffect } from "react";
import useForm, { Form } from "../../../hooks/useForm";
import { Controls } from "../../controls/Controls";

const initialValue = {
  nameCategory: "",
};

const FormCategory = ({
  handleSubmit,
  nameEdit,
  handleEdit,
  idEdit,
  handleChangeEdit,
}) => {
  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ("nameCategory" in fieldValues) {
      temp.nameCategory = fieldValues.nameCategory
        ? "Look Good!"
        : "Name of category is required";
    }
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

  useEffect(() => {
    if (nameEdit != null) {
      setValues({
        ...nameEdit,
      });
    }
  }, [nameEdit]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (validate()) {
      if (idEdit) {
        handleEdit();
        setErrors({});
      } else {
        handleSubmit(values.nameCategory);
        setValues(initialValue);
        setErrors({});
      }
    }
  };

  const handleChangeForm = (e) => {
    handleChangeEdit(e.target.value);
  };

  return (
    <>
      <Form onSubmit={handleSubmitForm}>
        <Controls.Input
          placeholder={"Enter new category"}
          value={nameEdit ? nameEdit.name : values.nameCategory}
          name="nameCategory"
          onChange={nameEdit ? handleChangeForm : handleChange}
          error={errors.nameCategory}
        />
        <Controls.ButtonAction title={nameEdit ? "Update" : "Submit"} />
      </Form>
    </>
  );
};

export default FormCategory;
