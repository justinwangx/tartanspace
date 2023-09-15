import React from "react";
import { Link } from "react-router-dom";

function Graph() {
  return (
    <div>
      <h1>Welcome to the graph page!</h1>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

export default Graph;