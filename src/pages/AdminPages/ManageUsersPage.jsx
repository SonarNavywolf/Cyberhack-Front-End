import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";
import FormikForm from "../../components/dashboard/ManageUsers/AddUsersFormik/FormikForm";
import ManageUsers from "../../components/dashboard/ManageUsers/ManageUsers";
import Config from "../../config/Config.json";
import classes from "./ManageUsersPage.module.css";
import SpinnerComponent from "../../components/UI/SpinnerComponent";

const ReactModal = React.lazy(() => import("../../components/UI/ReactModal"));

let userId;
const ManageUsersPage = () => {
  const [showAddUserModal, setAddUserModal] = useState(false);
  const [action, setAction] = useState(false);

  const [showSpinner, setSpinner] = useState(false);
  const [showEditUserModal, setEditUserModal] = useState({
    show: false,
    inititalValues: {},
  });
  const [showDeleteModal, setDeleteModal] = useState(false);

  const token = localStorage.getItem("token");

  const editUserHandler = (userData) => {
    console.log('inside edit user handler', userData);
    setEditUserModal({ show: true, inititalValues: userData });
  };

  useEffect(() => {
    document.title = Config.TITLE.MANAGE_USERS;
    // setAction(false);
  }, []);

  const deleteModalHandler = (uId) => {
    userId = uId;
    setDeleteModal(true);
  };

  const deleteItemHandler = () => {
    // console.log("delete click", userId);
    setDeleteModal(false);
    setSpinner(true);
    axios
      .put(
        `${Config.SERVER_URL + "api/admin/users/" + userId}`)
      .then((result) => {
        // console.log(result);
        setAction(!action);
        setSpinner(false);
        toast.success(result.data.message);
      })
      .catch((err) => {
        // console.log(err);
        setSpinner(false);
        toast.error("Oops something went wrong");
      });
  };

  const addUserHandler = (values) => {
    setSpinner(true);
    axios
      .post(
        `${Config.SERVER_URL + "api/admin/add-user"}`,
        { ...values }
      )
      .then((res) => {
        setSpinner(false);
        setAction(!action);
        setAddUserModal(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        // console.log(err);
        setSpinner(false);
        toast.error("Oops something went wrong");
      });
  };
  const editUserItemHandler = (values) => {
    //console.log("edit click", userId);
    console.log('values',values);
    const u_id = values.user_id;
    const updatedValues = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      role_name: values.role_name,
    };
    setSpinner(true);
    axios
      .put(`${Config.SERVER_URL + "api/admin/edit-user/" + u_id}`, updatedValues)
      .then((res) => {
        // console.log(res);
        setEditUserModal((prev) => {
          return { show: false, inititalValues: prev.inititalValues };
        });

        setSpinner(false);

        setAction(!action);
        toast.success(res.data.message);
      })
      .catch((err) => {
        // console.log(err);
        setSpinner(false);
        toast.error("Oops something went wrong");
      });
  };

  return (
    <React.Fragment>
      <Suspense fallback={<SpinnerComponent />}>
        {showSpinner && (
          <Container className={classes.overlaySpinner}>
            <SpinnerComponent />
          </Container>
        )}
        <ReactModal
          show={showAddUserModal}
          onHide={() => {
            setAddUserModal(false);
          }}
          formModal={true}
          buttonTitle="Add User"
          formId="manageUser-form"
        >
          {{
            title: "Add new User",
            body: (
              <FormikForm edit={true} inititalValue onAdd={addUserHandler} />
            ),
          }}
        </ReactModal>
        <ReactModal
          show={showEditUserModal.show}
          onHide={() => {
            setEditUserModal((prev) => {
              return { show: false, inititalValues: prev.inititalValues };
            });
          }}
          formModal={true}
          buttonTitle="Edit User"
          formId="manageUser-form"
        >
          {{
            title: "Edit User",
            body: (
              <FormikForm
                userInfo={showEditUserModal.inititalValues}
                onAdd={editUserItemHandler}
              />
            ),
          }}
        </ReactModal>
      </Suspense>
      <ReactModal
        show={showDeleteModal}
        isDelete={true}
        onOk={deleteItemHandler}
        onHide={() => {
          setDeleteModal(false);
        }}
      >
        {{ title: "Delete user", body: <h5>Are you sure?</h5> }}
      </ReactModal>

      <ManageUsers
        onShowAddUser={setAddUserModal}
        onEditUser={editUserHandler}
        onShowDelete={deleteModalHandler}
        changes={action}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </React.Fragment>
  );
};

export default ManageUsersPage;
