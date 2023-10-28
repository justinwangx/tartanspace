import React from "react";
import Header from "./components/Header";

const About = () => {
  return (
    <div className="h-screen w-full">
      <Header />
      <div className="bg-custom h-full w-full -z-10"></div>
      <div className="flex flex-col items-center pt-10">
        <div className="box-with-opacity w-1/2 mt-10 text-white">
          <p>
            tartanspace is a tool that connects students at Carnegie Mellon
            using vector embeddings.
          </p>
          <h1 className="font-extrabold text-2xl mt-3 mb-3">FAQ</h1>
          <h3 className="font-bold text-xl">How does this work?</h3>
          <p></p>
          <p>
            Each member of tartanspace completes a form containing pesonal
            questions that reveal information about themselves.Text responses
            from the form are then embedded into high-dimensional space using
            transformer-based language models.These embeddings are then mapped
            to 3-dimensional space using a dimensionality reduction algorithm.
            People with similar responses appear closer together in 3D space.
            tartanspace will be open until __, at which point the form will stop
            accepting responses. Then members will be emailed the names and
            contact information of their 3 closest neighbors in 3D space.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
