import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import FormPage from "./FormPage";

function App() {
  return (
    <Router>
      <div className="h-full">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/form' element={<FormPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;