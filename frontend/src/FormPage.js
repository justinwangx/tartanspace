import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function FormPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    single: ''
  });

const questions = [
      'Question 1: Describe your perfect weekend day from morning to night?',
      'Question 2: Favorite memory with friends?',
      'Question 3: Surprising hobby or interest you have?',
      'Question 4: Last time you felt lucky to be you?',
      'Question 5: What is your red flag?',
    ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://ec2-44-196-61-225.compute-1.amazonaws.com:8080/form-submission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

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
        question5: ""
      });
    }
  };



  return (
    <div className="flex justify-center items-center overflow-y-auto">
      <div className="w-1/3">
        <h1 class="block uppercase text-center tracking-wide text-gray-700 text-3xl font-bold mt-10 mb-4"> Join TartanSpace </h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                First Name
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="border p-2" placeholder="Andrew" required>
              </input>
              <p class="text-red-500 text-xs italic">Please fill out this field.</p>
            </div>

            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Last Name
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="border p-2" placeholder="Carnegie" required>
            </input>
            </div>
          </div>

          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
                Email
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="andrewID@andrew.cmu.edu" required/>
              <p class="text-gray-600 text-xs italic">Use your AndrewID</p>
            </div>
          </div>


          {/* <div class="flex flex-wrap -mx-3 mb-6">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="border p-2" required />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="border p-2" required />
          </div> */}

          {/* <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="border p-2" required />
          </div> */}
    
          {questions.map((question, index) => (
            <div>
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`question${index}`}>{question}</label>
              <input class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" id={`question${index}`} name={`question${index}`} value={formData[`question${index}`]} onChange={handleChange} placeholder='Answer whichever question you want!'/>
            </div>
          ))}
          
          {/* {[1, 2, 3, 4, 5].map((i) => (
            <div className="flex flex-col" key={i}>
              <label htmlFor={`question${i}`}>Question {i}:</label>
              <input type="text" id={`question${i}`} name={`question${i}`} value={formData[`question${i}`]} onChange={handleChange} className="border p-2" required />
            </div>
          ))} */}

          <div className="flex flex-col">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="single">Single:</label>
            <input type="checkbox" id="single" name="single" checked={formData.single === 'yes'} onChange={() => setFormData({ ...formData, single: formData.single === 'yes' ? 'no' : 'yes' })} />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
        </form>
        <Link to="/" className="text-center block mt-4 mb-4">Explore TartanSpace</Link>
      </div>
    </div>
  );
}

export default FormPage;
