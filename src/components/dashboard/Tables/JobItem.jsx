import classes from "./UserItem.module.css";
import dateFormatter from "../../../util/dateFormatter";

const JobItem = (props) => {
  let formattedCreatedAt = dateFormatter(props.jobInfo.start_date);
  let formattedUpdatedAt = dateFormatter(props.jobInfo.end_date);
  return (
    <tr className={classes.row}>
      <td>{props.jobInfo.job_id}</td>
      <td>{props.jobInfo.title}</td>
      <td>{props.jobInfo.category}</td>
      <td>{formattedCreatedAt}</td>
      <td>{formattedUpdatedAt}</td>
    </tr>
  );
};

export default JobItem;
