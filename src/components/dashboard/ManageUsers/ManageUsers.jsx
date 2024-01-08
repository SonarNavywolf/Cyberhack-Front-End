import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import axios from "axios";
import useTable from "../../../hooks/useTable";
import TableFooter from "../Tables/TableFooter";
import SpinnerComponent from "../../UI/SpinnerComponent";
import Config from "../../../config/Config.json";
// import data from "../../../store/userData.json";
import jwtDecode from "jwt-decode";
import classes from "./ManageUsers.module.css";
import ManageUserItem from "./ManageUserItem";

let userdata = [];
const ManageUsers = (props) => {
  const [page, setPage] = useState(1);
  const [showSpinner, setShowSpinner] = useState(true);

  const [userData, setUserData] = useState([]);
  const roleInputRef = useRef();

  const token = localStorage.getItem("token");

  useEffect(() => {
    setShowSpinner(true);
    const readAuthToken = jwtDecode(token);
    const user_id = readAuthToken.user_id;
    axios
      .get(`${Config.SERVER_URL + "api/admin/" + user_id}`)
      .then((response) => {
        const data = response.data.users;
        setShowSpinner(false);
        console.log('userData',data);
        userdata = [...data];
        setUserData(data);
      });
  }, [props.changes, token]);

  const { slice, range } = useTable(userData, page, 5);

  const roleChangeHandler = (event) => {
    if (event.target.value === "All") {
      setUserData(userdata);
    } else {
      setUserData(userdata.filter((user) => user.role_name === event.target.value));
    }
  };
  const searchUserHandler = (event) => {
    const role = roleInputRef.current.value;
    console.log('role_name', role);
    console.log('search text',event.target.value.toLowerCase());
    console.log('user', userData);
    if (role !== "All") {
      setUserData(
        userdata.filter(
          (user) =>
            user.first_name
              .toLowerCase()
              .includes(event.target.value.toLowerCase()) && user.role_name === role
        )
      );
    } else {
      setUserData(
        userdata.filter((user) =>
        user.first_name.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    }
  };
  const addModalHandler = () => {
    props.onShowAddUser(true);
  };
  const editModalHandler = (userData) => {
    props.onEditUser(userData);
  };

  return (
    <React.Fragment>
      <Row className={classes.rowStyle}>
        <Col className={`${classes.manageUsers} col-md-3`}>
          <span className={classes.span}>Manage Users</span>
        </Col>
        <Col className={`${classes.col} col-md-6  `}>
          <Col
            className={`${classes.search}d-flex justify-content-center align-items-center`}
          >
            <input
              type="text"
              id="search"
              placeholder="Search Users"
              className={classes.searchBar}
              onChange={searchUserHandler}
            />
          </Col>
          <Col className={classes.input}>
            <label htmlFor="type">Role</label>
            <select
              name="type"
              id="type"
              ref={roleInputRef}
              onChange={roleChangeHandler}
            >
              <option value="All">All</option>
              <option value="cyber_security_expert">User</option>
              <option value="ngo">Job Provider</option>
            </select>
          </Col>
        </Col>
        <Col className={`${classes.addUser} col-md-3`}>
          <Button
            // variant="primary"
            id="add-new-user"
            className={classes.button}
            onClick={addModalHandler}
          >
            Add New User
          </Button>
        </Col>
      </Row>
      {showSpinner && <SpinnerComponent />}
      {userData.length > 0 && (
        <div className={classes.tableBox}>
          <Table striped hover>
            <thead>
              <tr className={classes.tableHeader}>
                <th>User Id</th>
                <th>User Role</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className={classes.tableBody}>
              {slice.map((user) => {
                return (
                  <ManageUserItem
                    key={user.user_id}
                    userInfo={user}
                    onEdit={editModalHandler}
                    onDelete={props.onShowDelete}
                  />
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
      {userData.length === 0 && (
        <h3 className="text-center fw-bold">No user Data!</h3>
      )}
    </React.Fragment>
  );
};

export default ManageUsers;
