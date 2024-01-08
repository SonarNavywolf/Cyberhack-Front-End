import React, { useEffect, useState } from "react";

import ProviderCards from "../../Job Provider/Components/Counters/ProviderCards";

import Table1 from "../../Job Provider/Components/Table/dashboardTable.js";
import Config from "../../config/Config.json";
import axios from "axios";
import SpinnerComponent from "../../components/UI/SpinnerComponent";
import jwtDecode from "jwt-decode";

export default function ProvDashboard() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    jobsCount: 0,
    applicantsCount: 0,
  });
  const [showSpinner, setShowSpinner] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setShowSpinner(true);
    const readAuthToken = jwtDecode(token);
    const user_id = readAuthToken.user_id;

    axios
      .get(`${Config.SERVER_URL + "api/posts/dashboard-stats/"+ user_id}`)
      .then((res) => {
        setShowSpinner(false);
        setStats(res.data.stats);
      })
      .catch((er) => {
        setShowSpinner(false);
        console.log(er);
      });

    axios
      .get(`${Config.SERVER_URL + "api/posts/dashboard-recents/"+ user_id}`)
      .then((res) => {
        setShowSpinner(false);
        setJobs(res.data.recentJobs);
      })
      .catch((err) => {
        setShowSpinner(false);
        console.log(err);
      });
    document.title = Config.TITLE.DASHBOARD;
  }, [token]);
  return (
    <div>
      <ProviderCards stats={stats} />
      {/* <CountCard /> */}
      {showSpinner && <SpinnerComponent />}
      {!showSpinner && <Table1 jobData={jobs} />}
    </div>
  );
}
