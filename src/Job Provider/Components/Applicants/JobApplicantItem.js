import classes from "./ApplicantItem.module.css";
import { useNavigate } from "react-router-dom";

const ApplicantItem = (props) => {
  const navigate = useNavigate();
  const viewApplicantsHandler = () => {
    navigate(`/manage-applicants/${props.jobItem.job_id}`);
  };
  const viewShortlistsHandler = () => {
    navigate(`/view-shortlists/${props.jobItem.job_id}`);
  };
  return (
    <tr className={classes.row}>
      <td>{props.jobItem.title}</td>

      <td>
        <button
          className={`${classes.applicants} ${classes.button}`}
          onClick={viewApplicantsHandler}
        >
          <span>
            <i className="bi bi-person-bounding-box"></i>
          </span>
          <span>View Applicants</span>
        </button>
      </td>
      <td>
        <button
          className={`${classes.shortlisted} ${classes.button}`}
          onClick={viewShortlistsHandler}
        >
          <span>
            <i className="bi bi-person-check-fill"></i>
          </span>
          <span>View Shortlisted</span>
        </button>
      </td>
    </tr>
  );
};

export default ApplicantItem;
