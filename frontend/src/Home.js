import React from "react";
import { Link } from "react-router-dom";
import PointCloud from "./PointCloud";

function Home() {
  return (
    <div className="h-full relative">
      <PointCloud className="w-full h-full"/>
      <Link className="font-bold absolute bottom-0 left-0 text-white" to="/graph">Go to Second Page</Link>
    </div>
  );
}

export default Home;