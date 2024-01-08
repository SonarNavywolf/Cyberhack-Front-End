import React from "react";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import classes from "./AddJob.module.css";

import { TextField, SelectInput } from "./FormTypes";
import * as Yup from "yup";
export default function AddJob(props) {
  let initialValues = {
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    category: "",
  };

  if (props.jobInfo) {
    initialValues = {
      title: props.jobInfo.title,
      description: props.jobInfo.description,
      start_date: props.jobInfo.start_date,
      end_date: props.jobInfo.end_date,
      category: props.jobInfo.category,
    };
  }

  const formSubmitHandler = (values, setSubmitting) => {
    props.onAdd(values);
  };

  // VALIDATION
  const validate = Yup.object({
    title: Yup.string().max(30).required("Required"),
    description: Yup.string()
      .max(100, "Must be 100 characters or less")
      .required("Required"),
    start_date: Yup.date().required("Required"),
    end_date: Yup.date().required("Required"),
    category: Yup.string().required("Required"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          const editedValues = { ...props.jobInfo, ...values };
          // setTimeout(() => {
          //   alert(JSON.stringify(editedValues, null, 2));
          //   setSubmitting(false);
          // props.onAdd();
          // history.push("/dashboard");
          // }, 400);
          formSubmitHandler(editedValues, setSubmitting);
        }}
      >
        {(formik) => (
          // console.log(formik);
          <Form onSubmit={formik.handleSubmit}>
            <div>
              <TextField label="Title" name="title" type="text" />
              <TextField
                label="Description "
                name="description"
                type="text-area"
              />
              <SelectInput label="Category " name="category">
                <option value="">Select</option>
                <option value="Cyber Security Engineer">
                  Cyber Security Engineer
                </option>
                <option value="Software Developer">Software Developer</option>
                <option value="Techincal and Hardware Engineer">
                  Techincal and Hardware Engineer
                </option>
                <option value="Penetration Test Engineer">Penetration Test Engineer</option>
              </SelectInput>
              <TextField label="Start date " name="start_date" type="date" />
              <TextField label="  End date " name="end_date" type="date" />
            </div>

            {!props.jobInfo ? (
              <Button
                className={classes.submitBtn}
                type="submit"
                // onClick={props.onAdd}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItem: "center",
                }}
              >
                Add Job
              </Button>
            ) : (
              <>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button className={classes.submitBtn} type="submit">
                    Edit Job
                  </Button>
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}
