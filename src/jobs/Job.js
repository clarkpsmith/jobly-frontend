import React, { useState, useEffect, useContext } from "react";
import { Button } from "reactstrap";
import addCommas from "../helpers/addCommas";

import UserContext from "../common/UserContext";

import "./Job.css";

const Job = ({ job }) => {
  const [applied, setApplied] = useState("Apply");
  const { apply, currentUser } = useContext(UserContext);

  useEffect(() => {
    async function jobEffect() {
      if (currentUser) {
        const applied = currentUser.applications.find(
          (applicationId) => applicationId === job.id
        );
        setApplied(applied);
      }
    }
    jobEffect();
  }, []);

  function handleClick() {
    apply(currentUser.username, job.id);
    setApplied(job.id);
  }

  const salaryWithCommas = addCommas(job.salary);

  return (
    <div className="Job">
      <h6 className="font-weight-bold"> {job.title}</h6>

      <h6>{job.companyName}</h6>
      <br />
      <p>Salary: {salaryWithCommas ? `$${salaryWithCommas}` : "None"}</p>
      <p>
        Equity: {job.equity === 0 || !job.equity ? "None" : `${job.equity} %`}
        <span>
          {applied ? (
            <Button
              onClick={handleClick}
              size="sm"
              className="Job-btn"
              color="danger"
              disabled
            >
              Applied
            </Button>
          ) : (
            <Button
              onClick={handleClick}
              size="sm"
              className="Job-btn"
              color="danger"
            >
              Apply
            </Button>
          )}
        </span>
      </p>
    </div>
  );
};

export default Job;
