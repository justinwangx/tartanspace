import React from "react";
import { Link } from "react-router-dom";
import Graph from "./Graph";

function Home() {
  return (
    <div className="h-full relative">
      <Graph className="w-full h-full"/>
      <Link className="font-bold absolute bottom-0 left-0 text-white" to="/form">Enter tartanspace</Link>
    </div>
  );
}

export default Home;