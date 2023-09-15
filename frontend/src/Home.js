import React from "react";
import { Link } from "react-router-dom";
import PointCloud from "./PointCloud";

function Home() {
  return (
    <div>
      <h1>Test</h1>
      <Link to="/graph">Go to Second Page</Link>
      <PointCloud/>
    </div>
  );
}

export default Home;