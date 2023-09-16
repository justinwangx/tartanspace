import React, { useState } from "react";
import { Link } from "react-router-dom";

function FormPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    single: "",
  });

  const questions = [
    "Describe your perfect weekend",
    "What is your favorite memory with friends?",
    "Is there a surprising hobby or interest you have?",
    "When was the last time you felt lucky to be you?",
    "What is your red flag?",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://ec2-44-196-61-225.compute-1.amazonaws.com:8080/form-submission",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      // Clear the form if the submission is successful
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        single: false,
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen overflow-y-auto font-mooli">
      <div className="w-1/3">
        {/* <h1 className="text-center text-3xl mt-20 mb-4">Join tartanspace</h1> */}
        <h1 className="block uppercase text-center tracking-wide text-gray-700 text-3xl font-bold mt-10 mb-4">
          join tartanspace
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                First Name
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border p-2"
                placeholder="Andrew"
                required
              ></input>
            </div>

            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Last Name
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border p-2"
                placeholder="Carnegie"
                required
              ></input>
            </div>
          </div>

          <p className="text-center">
            answer at least one of the questions below - more is better
          </p>
          {questions.map((question, index) => (
            <div>
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor={`question${index}`}
              >
                {question}
              </label>
              <input
                class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                id={`question${index}`}
                name={`question${index}`}
                value={formData[`question${index}`]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="flex items-center justify-between">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="single"
            >
              r u single?
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="single"
                  value="yes"
                  className="form-radio"
                  checked={formData.single === "yes"}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      single: "yes",
                    })
                  }
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="single"
                  value="no"
                  className="form-radio"
                  checked={formData.single === "no"}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      single: "no",
                    })
                  }
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Submit
          </button>
        </form>
        <Link to="/" className="text-center block mt-4 mb-4">
          Go back to tartanspace
        </Link>
      </div>
    </div>
  );
}

export default FormPage;
