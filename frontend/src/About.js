import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div w-full h-screen>
      <div className="flex flex-col justify-center items-center mt-20">
        <div className="w-5/12 leading-8">
          <p>
            tartanspace is a tool designed to connect students at Carnegie
            Mellon.
          </p>
          <p>
            Each member of tartanspace completes a form containing pesonal
            questions that reveal information about themselves.
          </p>
          <p>
            Text responses from the form are then embedded into high-dimensional
            space using transformer-based language models.
          </p>
          <p>
            These embeddings are then mapped to 3-dimensional space using a
            dimensionality reduction algorithm.
          </p>
          <p>
            People with similar responses appear closer together in 3D space.
          </p>
          <p>
            tartanspace will be open until __, at which point the form will stop
            accepting responses.
          </p>
          <p>
            Then members will be emailed the names and contact information of
            their 3 closest neighbors in 3D space.
          </p>
        </div>
        <Link className="font-bold absolute bottom-10 left-0 text-black" to="/">
          Back to tartanspace
        </Link>
      </div>
    </div>
  );
};

export default About;
