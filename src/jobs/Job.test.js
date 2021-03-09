import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import UserContext from "../common/UserContext";
import Job from "./Job";

const currentUser = {
  applications: [
    200,
    161,
    86,
    50,
    71,
    158,
    36,
    134,
    78,
    184,
    60,
    181,
    89,
    172,
    62,
    82,
    98,
    47,
    183,
    29,
    63,
    53,
    114,
    69,
    7,
    150,
    18,
    95,
    177,
    23,
    123,
    175,
    100,
  ],
  email: "clark.smith79@gmail.com",
  firstName: "Clark",
  isAdmin: false,
  lastName: "Smith",
  username: "testuser",
};

const job = {
  id: 200,
  title: "Accommodation manager",
  salary: 126000,
  equity: null,
  companyHandle: "mejia-scott-ryan",
  companyName: "Mejia, Scott and Ryan",
};

it("renders without crashing", () => {
  render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser }}>
        <Job job={job} />
      </UserContext.Provider>
    </MemoryRouter>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser }}>
        <Job job={job} />
      </UserContext.Provider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
