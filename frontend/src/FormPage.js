import eact, { useState } from "react";
import Header from "./components/Header";

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
    "Do you have a surprising hobby or interest?",
    "When was the last time you felt lucky to be you?",
    "open-ended prompt: write whatever you want!",
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
      "https://thankyouthankyouthankyou.site/form-submission",
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
        question0: "",
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
      });
    } else {
      console.log("Form submission failed");
    }
  };

  return (
    <div className="h-screen w-full relative">
      <Header isHome={false} />

      <div className="flex justify-center items-center pt-10">
        <div className="w-1/2 mt-10 mb-10 bg-black bg-opacity-75 backdrop-blur-lg p-5 rounded text-gray-200">
          <h1 className="block text-center tracking-wide text-gray-200 text-3xl font-semibold mb-4">
            join <span className="font-bold">tartanspace</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div class="w-full mb-6 md:mb-0 ">
              <label
                className="block lowercase tracking-wide text-white text-sm mb-2"
                for="grid-first-name"
              >
                First Name
              </label>
              <input
                class="appearance-none block w-full bg-gray-900 bg-opacity-50 text-white text-sm border border-gray-900 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:border-gray-200"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              ></input>
            </div>

            <div class="w-full mb-6 md:mb-0">
              <label
                class="block lowercase tracking-wide text-white text-sm mb-2"
                for="grid-last-name"
              >
                Last Name
              </label>
              <input
                class="appearance-none block w-full bg-gray-900 bg-opacity-50 text-white text-sm border border-gray-800 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:border-gray-200"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              ></input>
            </div>

            <div class="w-full mb-6 md:mb">
              <label
                className="block lowercase tracking-wide text-white text-sm mb-2"
                htmlFor="email"
              >
                Email@(andrew).cmu.edu
              </label>
              <input
                class="appearance-none block w-full bg-gray-900 bg-opacity-50 text-white text-sm border border-gray-800 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:border-gray-200"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                pattern="[a-zA-Z0-9._%+-]+@cmu\.edu"
                title="Please enter an email ending with 'cmu.edu'"
                required
              />
            </div>

            <p className="text-center lowercase text-gray-100 font-semibold text-base">
              answer the questions below
            </p>
            {questions.map((question, index) => (
              <div>
                <label
                  class="block lowercase tracking-wide text-white text-sm mb-2"
                  htmlFor={`question${index}`}
                >
                  {question}
                </label>
                <textarea
                  class="block w-full bg-gray-900 bg-opacity-50 text-white text-sm border border-gray-800 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:border-gray-200"
                  type="text"
                  rows="2"
                  id={`question${index}`}
                  name={`question${index}`}
                  value={formData[`question${index}`]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div className="flex items-center justify-between">
              <label
                className="block lowercase tracking-wide text-white text-sm"
                htmlFor="single"
              >
                r u single?
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center text-white">
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
                <label className="flex items-center text-white">
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
              className="w-full bg-gray-200 text-black font-bold p-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormPage;
