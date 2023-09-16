import React from "react";
import { Link } from "react-router-dom";
import Graph from "./Graph";

function Home() {
  return (
    <div className="h-full relative">
      <Graph className="w-full h-full z-0" />
      <Link
        className="font-bold text-2xl font-mooli fixed bottom-3 left-3 text-white z-50"
        to="/form"
      >
        Enter tartanspace
      </Link>
      <Link
        className="font-bold text-2xl font-mooli fixed bottom-12 left-3 text-white z-50"
        to="/about"
      >
        About
      </Link>
    </div>
  );
}

export default Home;
