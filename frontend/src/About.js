import React from "react";

const About = () => {
  return (
    <div>
      <div>
        tartanspace is a tool designed to connect students at Carnegie Mellon.
        Each member of tartanspace completes a form containing pesonal questions
        that reveal information about themselves. Text responses from the form
        are then embedded into high-dimensional space using transformer-based
        language models. These embeddings are then mapped to 3-dimensional space
        using a dimensionality reduction algorithm. People with similar
        responses appear closer together in 3D space. tartanspace will be open
        until __, at which point the form will stop accepting responses. Then
        members will be emailed the names and contact information of their 3
        closest neighbors in 3D space.
      </div>
    </div>
  );
};

export default About;