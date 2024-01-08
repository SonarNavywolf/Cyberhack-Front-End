// import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Config from "../../config/Config.json";
import Header from "./Header";
import classes from "./Register.module.css";
import {
  NumberInput,
  SelectInput,
  TextInput,
} from "../../components/dashboard/ManageUsers/AddUsersFormik/fields/FieldInputs";
import SpinnerComponent from "../../components/UI/SpinnerComponent";

const Register = (props) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();

  let initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    is_active: "1",
    role_name: "cyber_security_expert",
  };

  const formSubmitHandler = (values, setSubmitting) => {
    setShowSpinner(true);
    console.log('incoming values', values);
    axios
      .post(`${Config.SERVER_URL + "api/users/register"}`, { ...values })
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
        navigate("/login", { replace: true });
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
  // const history = useHistory();
  return (
    <React.Fragment>
      <Header />
      <Container>
        <h1 className="p-3 text-center rounded" style={{ color: "#2c49ed" }}>
          Register
        </h1>
        {showSpinner && <SpinnerComponent />}
        <Row className="mb-5">
          <Col
            lg={7}
            md={6}
            sm={12}
            className={`${classes.formContainer} p-5 m-auto shadow-sm rounded-lg`}
          >
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
                role_name: Yup.string(),
              })}
              onSubmit={(values, { setSubmitting }) => {
                const editedValues = { ...props.userInfo, ...values };
                formSubmitHandler(editedValues, setSubmitting);
              }}
            >
              {(formik) => (
                <div className={classes.main}>
                  <Form>
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
                      />
                    </div>
                    <div className={classes.formInputs}>
                      <SelectInput name="role_name" id="role_name" label="Role">
                        <option value="--select--">Select</option>
                        <option value="ngo">NGO</option>
                        <option value="cyber_security_expert">Cyber Security Expert</option>
                      </SelectInput>
                    </div>
                    <Button variant="success" type="submit" className="mt-4 ">
                      Register
                    </Button>
                    <Link to="/Login">
                      <Button
                        variant="primary"
                        type="submit"
                        className="mt-4 float-end"
                        style={{ marginLeft: "10px" }}
                      >
                        Back to Login
                      </Button>
                    </Link>
                  </Form>
                </div>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Register;
