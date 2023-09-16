import React from "react";
import "./About.css"; // Import a separate CSS file for styling
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div id="grad1" w-full h-screen>
      <div class= "modal">
      <div className="flex flex-col justify-center items-center mt-20 font-mooli text-black-500">
        <div className="w-5/12 leading-8">
          <p className="mb-2">
            tartanspace is a tool designed to connect students at Carnegie Mellon. Each member of tartanspace completes a form containing pesonal questions that reveal information about themselves.Text responses from the form are then embedded into high-dimensional space using transformer-based language models.These embeddings are then mapped to 3-dimensional space using a dimensionality reduction algorithm.
            People with similar responses appear closer together in 3D space. tartanspace will be open until __, at which point the form will stop
            accepting responses. Then members will be emailed the names and contact information of
            their 3 closest neighbors in 3D space.
          </p>
        </div>
        <Link className="font-bold absolute bottom-10 right-0 text-black" to="/">
          Back to tartanspace
        </Link>
        </div>
      </div>
    </div>
  );
};

export default About;