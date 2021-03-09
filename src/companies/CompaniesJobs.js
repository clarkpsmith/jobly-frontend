import React, { useEffect, useState, useContext } from "react";
import Job from "../jobs/Job";
import JoblyApi from "../api/JoblyApi";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./Companies.css";
import "./CompaniesJobs.css";
import UserContext from "../common/UserContext";

const CompaniesJobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const { companyHandle } = useParams();

  const { currentUser, updateCurrentUser } = useContext(UserContext);

  useEffect(async () => {
    const res = await JoblyApi.getCompaniesJobs(companyHandle);

    setJobs(res.company.jobs);
    setCompanyData(res.company);
    updateCurrentUser();

    setIsLoading(false);
  }, []);

  const jobsArray = jobs.map((job) => (
    <div key={uuid()}>
      <Job job={job} currentUser={currentUser} />
    </div>
  ));

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="CompaniesJobs background">
      <div className="col-md-8 offset-md-2 ">
        <div className="Company-info m-4">
          <h3>{companyData.name}</h3>
          <p>{companyData.description}</p>
        </div>
        <div className="CompaniesJobs-listings m-4">{jobsArray}</div>
      </div>
    </div>
  );
};

export default CompaniesJobs;
