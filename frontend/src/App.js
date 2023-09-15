import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Graph from "./Graph";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/graph' element={<Graph/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;