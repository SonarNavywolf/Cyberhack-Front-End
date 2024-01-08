import React, { useState, useEffect } from "react";
import { Row, Col, Table, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import TableFooter from "../Table/TableFooter";
import useTable from "../Hooks/useTable";
import Config from "../../../config/Config.json";
import SpinnerComponent from "../../../components/UI/SpinnerComponent";
import classes from "./ApplicantTab.module.css";
import ManageApplicantItem from "./ManageApplicantItem";
import jwtDecode from "jwt-decode";
let applicantsdata = [];

const ManageJobApplicants = () => {
  const [page, setPage] = useState(1);
  const [applicantsData, setApplicantsData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const [action, setAction] = useState(false);

  const { slice, range } = useTable(applicantsData, page, 5);

  const params = useParams();
  const jobId = params.jobId;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const readAuthToken = jwtDecode(token);
    const user_id = readAuthToken.user_id;
    console.log('userId', user_id);
    console.log('jobId',jobId);
    axios
      .get(`${Config.SERVER_URL + "api/posts/provider/view-applicants/" + user_id + "/" + jobId}`)
      .then((response) => {
        const data = response.data.applicants;
        console.log('applicantData', data);
        setShowSpinner(false);
        applicantsdata = [...data];
        //console.log('dataApplicants', applicantsData);
        setApplicantsData(data);
      })
      .catch((err) => {
        setShowSpinner(false);
        console.log(err);
      });
  }, [jobId, action, token, applicantsData]);

  const searchApplicantHandler = (event) => {
    console.log('data-applicant', applicantsData);
    setApplicantsData(
      applicantsdata.filter((applicant) =>
        applicant.first_name
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );
  };
  return (
    <>
      <Container>
        <Row className={classes.rowStyle}>
          <Col className={`${classes.manageUsers} col-md-3`}>
            <span className={classes.span}>Manage Applicants</span>
          </Col>
          <Col className={`${classes.col} col-md-6  `}>
            <Col className="d-flex justify-content-center align-items-center">
              {/* <div> */}
              <input
                type="text"
                id="search"
                placeholder="Search Applicants"
                className={classes.searchBar}
                onChange={searchApplicantHandler}
              />
            </Col>
          </Col>
        </Row>
      </Container>
      {applicantsData.length > 0 && (
        <Container>
          <div className={classes.tableBox}>
            {showSpinner && <SpinnerComponent />}

            <Table striped hover>
              <thead>
                <tr className={classes.tableHeader}>
                  {/* <th>User Id</th> */}
                  <th>Job Title</th>
                  <th>Resume</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className={classes.tableBody}>
                {slice.map((applicantItem) => {
                  return (
                    <ManageApplicantItem
                      key={applicantItem.job_id}
                      applicantItem={applicantItem}
                      setAction={setAction}
                      token={token}
                    />
                  );
                })}
              </tbody>
            </Table>
          </div>
          <TableFooter
            range={range}
            slice={slice}
            setPage={setPage}
            page={page}
          />
        </Container>
      )}

      {/* <Container/> */}
      {applicantsData.length === 0 && (
        <h3 className="text-center fw-bold">No Applicant Data!</h3>
      )}
    </>
  );
};

export default ManageJobApplicants;
