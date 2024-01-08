import axios from "axios";
import jwtDecode from "jwt-decode";
import classes from "./ApplicantItem.module.css";
import Config from "../../../config/Config.json";

const ShortlistItem = ({ setAction, ...props }) => {
  const applicantItemId = props.applicantItem.job_id;
  const token = props.token;
  const viewResumeHandler = () => {
    const readAuthToken = jwtDecode(token);
    const user_id = readAuthToken.user_id;
    axios
      .get(
        `${
          Config.SERVER_URL +
          "provider/applicants/view-resume/" +
          applicantItemId
        }`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
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
      <td>{props.applicantItem.first_name + " " +props.applicantItem.last_name}</td>
      <td>{props.applicantItem.email}</td>
      <td>
        <button className={classes.button} onClick={viewResumeHandler}>
          View Resume
        </button>
      </td>
    </tr>
  );
};

export default ShortlistItem;
