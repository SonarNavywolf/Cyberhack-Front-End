import React, { useEffect, useState } from "react";
import AdminCards from "../../components/dashboard/Counters/AdminCards";
// import AdminCounters from "../components/dashboard/Counters/AdminCounters";
import JobsTable from "../../components/dashboard/Tables/JobsTable";
import UserTable from "../../components/dashboard/Tables/UserTable";
import axios from "axios";
import Config from "../../config/Config.json";
import SpinnerComponent from "../../components/UI/SpinnerComponent";
import jwtDecode from "jwt-decode";

const AdminDashboardPage = () => {
  const [userData, setUserData] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [stats, setStats] = useState({
    jobCount: 0,
    providerCount: 0,
    applicantCount: 0,
    seekerCount: 0,
  });
  const [showSpinner, setShowSpinner] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.title = Config.TITLE.DASHBOARD;
    setShowSpinner(true);
    const readAuthToken = jwtDecode(token);
    const user_id = readAuthToken.user_id;
    axios
      .get(`${Config.SERVER_URL + "api/admin/dashboard-stats/" + user_id}`)
      .then((res) => {
        setShowSpinner(false);
        setStats(res.data.stats);
      });
    axios
      .get(`${Config.SERVER_URL + "api/admin/dashboard-recents/" + user_id}`)
      .then((res) => {
        console.log('recent data',res.data);
        setShowSpinner(false);
        setUserData(res.data.recentUsers);
        setJobData(res.data.recentJobs);
      });
  }, [token]);
  return (
    <React.Fragment>
      <AdminCards stats={stats} />
      {showSpinner && <SpinnerComponent />}
      {!showSpinner && (
        <>
          <UserTable usersData={userData} />
          <JobsTable jobData={jobData} />
        </>
      )}
    </React.Fragment>
  );
};

export default AdminDashboardPage;
