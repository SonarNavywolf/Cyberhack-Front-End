import classes from "./JobItem.module.css";
import { Button } from "react-bootstrap";
import axios from "axios";

import Config from "../../../config/Config.json";
const JobItem = (props) => {
  const editButtonHandler = () => {
    axios
      .get(`${Config.SERVER_URL + "api/posts/provider/jobs/fetch/" + props.jobInfo.job_id}`)
      .then((res) => {
        console.log('job', res.data);
        props.onEdit(res.data.job);
      })
      .catch((err) => console.log(err));
    // props.onEdit(props.jobInfo);
  };
  const deleteButtonHandler = () => {
    props.onDelete(props.jobInfo.job_id);
  };
  return (
    <tr className={classes.row} key={props.jobInfo.job_id}>
      <td>{props.jobInfo.job_id}</td>
      <td>{props.jobInfo.title}</td>
      <td>{props.jobInfo.description}</td>
      <td>{props.jobInfo.category}</td>
      <td>{props.jobInfo.start_date}</td>
      <td>{props.jobInfo.end_date}</td>
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
        <Button
          className={`${classes.delete} ${classes.button}`}
          onClick={deleteButtonHandler}
        >
          <span>
            <i className="bi bi-trash"></i>
          </span>
          <span>Delete</span>
        </Button>
      </td>
    </tr>
  );
};

export default JobItem;
