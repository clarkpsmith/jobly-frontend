import React, { useState } from "react";
import "../common/SearchForm.css";
import Alert from "../helpers/Alert";

import { Button, Form, FormGroup } from "reactstrap";
import "./Login.css";

const Login = ({ login }) => {
  const initialData = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [formErrors, setFormErrors] = useState(null);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let result = await login(formData);
    if (result.success) {
    } else {
      console.log(result.err);
      setFormErrors(() => result.err);
    }
  };

  return (
    <div className="Login">
      <div className="Login-block">
        <h4 className="Login-title">Log In</h4>
        <Form className="Login-form" onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="username">Username</label>
            <br />
            <input
              className="Login-input"
              type="text"
              name="username"
              id="username"
              value={FormData.username}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <br />
          <FormGroup>
            <label htmlFor="password">Password</label>
            <br />
            <input
              className="Login-input"
              type="password"
              name="password"
              id="password"
              value={FormData.password}
              onChange={handleChange}
              required
            />
            <br />
          </FormGroup>
          {formErrors ? <Alert type="danger" messages={formErrors} /> : null}
          <Button size="sm" color="primary" className="Login-btn">
            Submit
          </Button>
          <br />
          <br />
        </Form>
      </div>
    </div>
  );
};
export default Login;
