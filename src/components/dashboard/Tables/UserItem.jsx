import dateFormatter from "../../../util/dateFormatter";
import classes from "./UserItem.module.css";
const UserItem = (props) => {
  return (
    <tr className={classes.row}>
      <td>{props.userInfo.user_id}</td>
      <td>{props.userInfo.role_name}</td>
      <td>{props.userInfo.first_name}</td>
      <td>{props.userInfo.last_name}</td>
      <td>{props.userInfo.email}</td>
    </tr>
  );
};

export default UserItem;
