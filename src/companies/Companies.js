import React, { useEffect, useState } from "react";
import Company from "./Company";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/JoblyApi";
import { v4 as uuid } from "uuid";
import "./Companies.css";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const res = await JoblyApi.getAllCompanies();
    setCompanies(res);
    setIsLoading(false);
  }, []);

  async function searchCompany(value) {
    const res = await JoblyApi.searchCompanyByName(value);

    setCompanies((company) => res);
  }

  const companiesArray = companies.map((company) => (
    <div key={uuid()}>
      <Company company={company} />
    </div>
  ));

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="Companies background">
      <div className="Companies-group col-md-8 offset-md-2">
        <SearchForm search={searchCompany} />
        <div className="Companies-listings m-4">
          {companies.length === 0
            ? "Sorry, no results were found!"
            : companiesArray}
        </div>
      </div>
    </div>
  );
};

export default Companies;
