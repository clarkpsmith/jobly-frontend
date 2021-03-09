import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Home from "./home/Home";
import JoblyApi from "./api/JoblyApi";
import Jobs from "./jobs/Jobs";
import Companies from "./companies/Companies";
import CompaniesJobs from "./companies/CompaniesJobs";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Profile from "./auth/Profile";
import ProtectedRoute from "./helpers/ProtectedRoute";

import UserContext from "./common/UserContext";
import jwt from "jsonwebtoken";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentToken, setCurrentToken] = useState(
    getTokenFromLocalStorage() || null
  );
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(async () => {
    JoblyApi.token = currentToken;
    await updateCurrentUser();
    console.log(currentUser);
    setIsLoading(false);
  }, [currentToken]);

  async function updateCurrentUser() {
    try {
      if (currentToken) {
        const { username } = jwt.decode(currentToken);
        const res2 = await JoblyApi.getCurrentUserData(username);
        setCurrentUser(() => res2);
        return { success: true };
      }
    } catch (err) {
      console.error("Update current user failed", err);
      setCurrentUser(null);
      return { success: false, err };
    }
  }

  function addTokenToLocalStorage(token) {
    localStorage.setItem("token", token);
  }
  function getTokenFromLocalStorage() {
    const res = localStorage.getItem("token");

    return res;
  }

  async function login({ username, password }) {
    try {
      const token = await JoblyApi.getToken(username, password);
      setCurrentToken(() => token);
      addTokenToLocalStorage(token);
      history.push("/companies");
      return { success: true };
    } catch (err) {
      console.error("Login Failed", err);
      return { success: false, err };
    }
  }

  async function logOut() {
    await JoblyApi.clearToken();
    setCurrentUser(null);
    setCurrentToken(null);
    localStorage.clear();
    history.push("/");
  }

  async function signUp(formData) {
    try {
      const res = await JoblyApi.registerUser(formData);
      setCurrentToken(res);
      addTokenToLocalStorage(res);
      const res2 = await JoblyApi.getCurrentUserData(formData.username);
      console.log("RES2", res2);

      setCurrentUser(res2);
      history.push("/companies");
      return { success: true };
    } catch (err) {
      console.error("Sign Up Failed", err);
      return { success: false, err };
    }
  }

  async function updateProfile(formData) {
    try {
      const res = await JoblyApi.updateProfile(formData);
      setCurrentUser(() => res.user);
      history.push("/");
      return { success: true };
    } catch (err) {
      console.error("Update Profile Failed", err);
      return { success: false, err };
    }
  }

  async function apply(username, id) {
    const res = await JoblyApi.apply(username, id);

    return res;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="App">
      <UserContext.Provider
        value={{ currentUser, apply, updateCurrentUser, updateProfile }}
      >
        <Navbar logOut={logOut} />
        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/companies">
              <ProtectedRoute Component={Companies} />
            </Route>
            <Route exact path="/jobs">
              <ProtectedRoute Component={Jobs} />
            </Route>
            <Route exact path="/companies/:companyHandle">
              <ProtectedRoute Component={CompaniesJobs} />
            </Route>
            <Route exact path="/login">
              <Login login={login} />
            </Route>
            <Route exact path="/signup">
              <SignUp signUp={signUp} />
            </Route>
            <Route exact path="/profile">
              <ProtectedRoute Component={Profile} />
            </Route>
            <Redirect to="/"></Redirect>
          </Switch>
        </main>
      </UserContext.Provider>
    </div>
  );
}

export default App;
