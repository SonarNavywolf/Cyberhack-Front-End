import React from "react";
import { useSelector } from "react-redux";
import Config from "../../config/Config.json";
import { Form as BootStrapForm, Button } from "react-bootstrap";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import classes from "./UserProfilePage.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

toast.configure();

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <BootStrapForm.Group className={`${classes.formBox} mb-2`}>
        <BootStrapForm.Label htmlFor={props.id || props.name}>
          {label}
        </BootStrapForm.Label>
        <BootStrapForm.Control
          className={meta.touched && meta.error && "invalid"}
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </BootStrapForm.Group>
      {/* <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  );
};

const UserProfilePage = (props) => {
  const selectauthToken = (rootstate) => rootstate.authToken;
  const authToken = useSelector(selectauthToken);
  console.log(authToken);

  const formSubmitHandler = (values, setSubmitting) => {
    setShowSpinner(true);
    console.log('incoming values', values);
    axios
      .put(`${Config.SERVER_URL + "api/users/" + props.userInfo.user_id}`, { ...values })
      .then((res) => {
        setShowSpinner(false);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        setShowSpinner(false);
        toast.error("Oops something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log('errors', err);
      });
  };

  return (
    <>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
        }}
        validationSchema={Yup.object({
          first_name: Yup.string()
            .required("First Name Required"),
          last_name: Yup.string()
            .required("Last Name Required"),
          email: Yup.string()
            .required("Email Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            const editedValues = { ...props.userInfo, ...values };
            formSubmitHandler(editedValues, setSubmitting);
            setSubmitting(false);
          }, 400);
          toast.success("User details updated Successfully", {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }}
      >
        <Form>
          <div className={classes.formContainer}>
            <h4 className="text-center text-primary">User Profile</h4>

            <MyTextInput
              label="First Name"
              name="first_name"
              type="text"
              id="first_name"
            />
            <MyTextInput
              label="Last Name"
              name="last_name"
              type="text"
              id="last_name"
            />
            <MyTextInput
              label="Email"
              name="email"
              type="text"
              id="email"
            />
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default UserProfilePage;
