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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3">
        <h1 className="text-center text-3xl mt-20 mb-4">Join tartanspace</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="border p-2" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="border p-2" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="border p-2" />
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div className="flex flex-col" key={i}>
              <label htmlFor={`question${i}`}>Question {i}:</label>
              <input type="text" id={`question${i}`} name={`question${i}`} value={formData[`question${i}`]} onChange={handleChange} className="border p-2" />
            </div>
          ))}
          <div className="flex flex-col">
            <label htmlFor="single">Single:</label>
            <input type="checkbox" id="single" name="single" checked={formData.single === 'yes'} onChange={() => setFormData({ ...formData, single: formData.single === 'yes' ? 'no' : 'yes' })} />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
        </form>
        <Link to="/" className="text-center block mt-4 mb-4">Explore tartanspace</Link>
      </div>
    </div>
  );
}

export default FormPage;
