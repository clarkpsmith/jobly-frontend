import React, { useState } from "react";
import "../common/SearchForm.css";
import { Button, Form, FormGroup } from "reactstrap";
import "./SignUp.css";
import Alert from "../helpers/Alert";

const SignUp = ({ signUp }) => {
  const initialData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [formErrors, setFormErrors] = useState(null);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let result = await signUp(formData);
    if (result.success) {
    } else {
      console.log(result.err);
      setFormErrors(() => result.err);
    }
  };

  return (
    <div className="SignUp">
      <div className="SignUp-block">
        <h4 className="SignUp-title">Sign Up</h4>
        <Form className="SignUp-form" onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="username">Username</label>
            <br />
            <input
              className="SignUp-input"
              type="text"
              name="username"
              id="username"
              value={FormData.username}
              onChange={handleChange}
              required
            />
            <br />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password</label>
            <br />
            <input
              className="SignUp-input"
              type="password"
              name="password"
              id="password"
              value={FormData.password}
              onChange={handleChange}
              required
            />
            <br />
          </FormGroup>
          <FormGroup>
            <label htmlFor="firstName">First Name</label>
            <br />
            <input
              className="SignUp-input"
              type="text"
              name="firstName"
              id="firstName"
              value={FormData.firstName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="lastName">Last Name</label>
            <br />
            <input
              className="SignUp-input"
              type="text"
              name="lastName"
              id="lastName"
              value={FormData.lastName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <br />
            <input
              className="SignUp-input"
              type="text"
              name="email"
              id="email"
              value={FormData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          {formErrors ? <Alert type="danger" messages={formErrors} /> : null}
          <Button size="sm" color="primary" className="SignUp-btn">
            Submit
          </Button>
          <br />
          <br />
        </Form>
      </div>
    </div>
  );
};
export default SignUp;
