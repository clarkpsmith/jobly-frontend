import React from "react";

const Alert = ({ type = "danger", messages }) => {
  const errorMessages = messages.map((err) => (
    <p className="m-0 small" key={err}>
      {err}
    </p>
  ));

  return (
    <div className={`alert alert-${type} Login-error`} role="alert">
      {errorMessages}
    </div>
  );
};

export default Alert;
