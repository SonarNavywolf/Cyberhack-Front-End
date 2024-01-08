// import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import classes from "../AddUserForm.module.css";
import { NumberInput, SelectInput, TextInput } from "./fields/FieldInputs";

const FormikForm = (props) => {
  let initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    is_active: "1",
    role_name: "",
  };
  if (props.userInfo) {
    console.log('userInfo', props.userInfo);
    initialValues = {
      first_name: props.userInfo.first_name,
      last_name: props.userInfo.last_name,
      email: props.userInfo.email,
      password: props.userInfo.password,
      role_name: props.userInfo.role_name,
    };
  }

  const formSubmitHandler = (values, setSubmitting) => {
    props.onAdd(values);

    // axios
    //   .post(`http://localhost:8080/api/users/add-user`, { ...values })
    //   .then((res) => {
    //     console.log(res);
    //   });
  };
  // const history = useHistory();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        first_name: Yup.string()
          .min(4, "First Name should be more than 4 characters")
          .max(25, "First Name should be less than 25 characters")
          .required("First Name is a required field"),
        last_name: Yup.string()
          .min(4, "Last Name should be more than 4 characters")
          .max(25, "Last Name should be less than 25 characters")
          .required("Last Name is a required field"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is a required field"),
        password: Yup.string()
          .min(6, "Password must be minimum 6 characters")
          .required("Password is a required field"),
        role_name: Yup.string().required("Role required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const editedValues = { ...props.userInfo, ...values };
        formSubmitHandler(editedValues, setSubmitting);
      }}
    >
      {(formik) => (
        <div className={classes.main}>
          <Form id="manageUser-form">
          <div className={classes.formInputs}>
              <TextInput
                label="First Name"
                id="first_name"
                name="first_name"
                mandatory={"true"}
              />
            </div>
            <div className={classes.formInputs}>
              <TextInput
                label="Last Name"
                id="last_name"
                name="last_name"
                mandatory={"true"}
              />
            </div>
            <div className={classes.formInputs}>
              <TextInput
                label="Email"
                id="email"
                name="email"
                mandatory={"true"}
              />
            </div>
            <div className={classes.formInputs}>
              <TextInput
                label="Password"
                id="password"
                type="password"
                name="password"
                mandatory={"true"}
                disabled={props.userInfo ? true : false}
              />
            </div>
            <div className={classes.formInputs}>
              <SelectInput
                name="role_name"
                id="role_name"
                label="Role"
                mandatory={"true"}
              >
                <option value="--select--">Select</option>
                <option value="cyber_security_expert">Cyber Security Expert</option>
                <option value="ngo">NGO</option>
              </SelectInput>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default FormikForm;
