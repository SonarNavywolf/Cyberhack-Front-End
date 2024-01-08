import axios from "axios";
import jwtDecode from "jwt-decode";
import classes from "./ApplicantItem.module.css";
import Config from "../../../config/Config.json";

const ApplicantItem = ({ setAction, ...props }) => {
  const applicant_user_id= props.applicantItem.user_id;
  const job_id= props.applicantItem.job_id;
  const token = props.token;
  const shortlistCandidateHandler = () => {
    const readAuthToken = jwtDecode(token);
    const provider_id = readAuthToken.user_id;
    axios
      .get(`${Config.SERVER_URL + "api/posts/provider/shortlist/" + applicant_user_id + "/" + provider_id + "/" + job_id}`)
      .then((res) => {
        setAction((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const rejectCandidateHandler = () => {
    const readAuthToken = jwtDecode(token);
    const provider_id = readAuthToken.user_id;
    axios
      .get(
        `${Config.SERVER_URL + "api/posts/provider/reject/" + applicant_user_id+ "/" + provider_id + "/" + job_id}`
      )
      .then((res) => {
        setAction((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const viewResumeHandler = () => {
    const readAuthToken = jwtDecode(token);
    const provider_id = readAuthToken.user_id;
    axios
      .get(
        `${
          Config.SERVER_URL +
          "api/posts/provider/view-resume/" + applicant_user_id+ "/" + provider_id + "/" + job_id
        }`,
        {
          responseType: "blob",
        }
      )
      .then((res) => {
        const file = new Blob([res.data], { type: "application/pdf" });
        const fileUrl = URL.createObjectURL(file);
        window.open(fileUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr className={classes.row}>
      <td>{props.applicantItem.title}</td>
      <td>
        <button className={classes.button} onClick={viewResumeHandler}>
          View Resume
        </button>
      </td>

      <td className={classes.actions}>
        <button
          className={`${classes.shortlistCandidate} ${classes.button}`}
          onClick={shortlistCandidateHandler}
          disabled={props.applicantItem.status === "Shortlisted" ? true : false}
        >
          <span>
            <i className="bi bi-person-check-fill"></i>
          </span>
          <span>Shortlist</span>
        </button>

        <button
          className={`${classes.rejectCandidate} ${classes.button}`}
          onClick={rejectCandidateHandler}
        >
          <span>
            <i className="bi bi-person-x-fill"></i>
          </span>
          <span>Reject</span>
        </button>
      </td>
    </tr>
  );
};

export default ApplicantItem;
