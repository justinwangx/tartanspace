import React from "react";
import { Link } from "react-router-dom";

function FormPage() {
  return (
    <div>
      <h1>Welcome to the form page!</h1>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

export default FormPage;