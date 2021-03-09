import React, { useState, useContext } from "react";
import "../common/SearchForm.css";
import UserContext from "../common/UserContext";
import Alert from "../helpers/Alert";
import { Button, Form, FormGroup } from "reactstrap";
import "./SignUp.css";

const Profile = () => {
  const { currentUser, updateProfile } = useContext(UserContext);
  const [formErrors, setFormErrors] = useState(null);
  const initialData = {
    username: currentUser.username,
    password: "",
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
  };
  const [formData, setFormData] = useState(() => initialData);
  console.log("DATA", formData);
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
    console.log(formData);
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const response = await updateProfile(formData);
    if (response.success) {
      console.log(response.success);
    } else {
      setFormErrors(response.err);
      console.log(response.err);
    }
  };

  return (
    <div className="SignUp">
      <div className="SignUp-block">
        <h4 className="SignUp-title">User Profile</h4>
        <Form className="SignUp-form" onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="username">Username</label>
            <br />
            <div>{formData.username}</div>
          </FormGroup>

          <FormGroup>
            <label htmlFor="firstName">First Name</label>
            <br />
            <input
              className="SignUp-input"
              type="text"
              name="firstName"
              id="firstName"
              placeholder={formData.firstName}
              value={FormData.firstName}
              onChange={handleChange}
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
              placeholder={formData.lastName}
              value={FormData.lastName}
              onChange={handleChange}
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
              placeholder={formData.email}
              value={FormData.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Confirm password to make changes: </label>
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
          {formErrors ? <Alert type="danger" messages={formErrors} /> : null}
          <Button
            size="sm"
            color="primary"
            text-align="center"
            className="SignUp-btn"
          >
            Save Changes
          </Button>
          <br />
          <br />
        </Form>
      </div>
    </div>
  );
};
export default Profile;
