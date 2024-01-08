import axios from "axios";
import classes from "./ManageUserItem.module.css";
import dateFormatter from "../../../util/dateFormatter";
import Config from "../../../config/Config.json";

const ManageUserItem = (props) => {
  const token = localStorage.getItem("token");
  const editButtonHandler = () => {
    axios
      .get(`${Config.SERVER_URL + "api/users/" + props.userInfo.user_id}`)
      .then((res) => {
        console.log('resposne', res.data.user);
        props.onEdit(res.data.user);
      })
      .catch((err) => console.log(err));
  };
  const deleteButtonHandler = () => {
    props.onDelete(props.userInfo.user_id);
  };
  return (
    <tr className={classes.row}>
      <td>{props.userInfo.user_id}</td>
      <td>{props.userInfo.role_name}</td>
      <td>{props.userInfo.first_name}</td>
      <td>{props.userInfo.last_name}</td>
      <td>{props.userInfo.email}</td>
      <td className={classes.actions}>
        <button
          className={`${classes.edit} ${classes.button}`}
          onClick={editButtonHandler}
        >
          <span>
            <i className="bi bi-pencil-fill"></i>
          </span>
          <span>Edit</span>
        </button>
        <button
          className={`${classes.delete} ${classes.button}`}
          onClick={deleteButtonHandler}
        >
          <span>
            <i className="bi bi-trash3-fill"></i>
          </span>
          <span>Delete</span>
        </button>
      </td>
    </tr>
  );
};

export default ManageUserItem;
