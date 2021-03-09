import React, { useEffect, useState, useContext } from "react";
import Job from "./Job";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/JoblyApi";
import { v4 as uuid } from "uuid";
import UserContext from "../common/UserContext";

import "./Jobs.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser, updateCurrentUser } = useContext(UserContext);

  useEffect(async () => {
    const res = await JoblyApi.getAllJobs();
    setJobs(res);
    updateCurrentUser();
    setIsLoading(false);
  }, []);

  async function searchJob(value) {
    const res = await JoblyApi.searchJobByTitle(value);
    setJobs((jobs) => res);
  }

  const jobsArray = jobs.map((job) => (
    <div key={uuid()}>
      <Job job={job} currentUser={currentUser} />
    </div>
  ));

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="Jobs background">
      <div className="Jobs-group col-md-8 offset-md-2">
        <SearchForm search={searchJob} />
        <div className="Jobs-listings m-4">
          {jobs.length === 0 ? "Sorry, no results were found!" : jobsArray}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
