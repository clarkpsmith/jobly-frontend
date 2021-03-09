import React from "react";

import "./Company.css";
import { Link } from "react-router-dom";

const Company = ({ company }) => {
  return (
    <>
      <Link to={`/companies/${company.handle}`}>
        <section className="Company">
          <h4 className="font-weight-bold">
            {company.name}
            <span>
              {company.logoUrl && (
                <img
                  width="50px"
                  className="Company-logo"
                  src={company.logoUrl}
                  alt={company.name}
                ></img>
              )}
            </span>
          </h4>

          <p>{company.description}</p>
        </section>
      </Link>
    </>
  );
};

export default Company;
