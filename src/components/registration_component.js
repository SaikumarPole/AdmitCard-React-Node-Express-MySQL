import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './Registration.css';

const Registration = () => {
  // Define state variables using the useState hook
const [redir, setRedirect] = useState(false); // State variable to indicate if a redirect should occur
const [cardID, setCardID] = useState(0); // State variable to hold the ID of the newly registered user
const [data, setData] = useState({ // State variable to hold the form data entered by the user
  name: '',
  phone: '',
  school: '',
  class: '',
  rollNo: '',
  address: '',
});

// Define a function to handle form submission
const handleSubmit = (event) => {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page

  // Extract the form data from the event target
  const formData = {
    name: event.target.elements.name.value,
    phone: event.target.elements.phone.value,
    school: event.target.elements.school.value,
    class: event.target.elements.class.value,
    rollNo: event.target.elements.rollNo.value,
    address: event.target.elements.address.value,
  };

  // Send a POST request to the backend API to register the user
  fetch('http://localhost:3000/api/register', {
    method: 'POST',
    body: JSON.stringify(formData), // Convert the form data to JSON

    headers: {
      'Content-Type': 'application/json', // Set the Content-Type header to JSON
    },
  })
  .then((response) => {
    console.log(response);
    if (response.ok) { // If the response was successful, extract the JSON data
      return response.json();
    } else { // Otherwise, throw an error
      throw new Error('Failed to register user');
    }
  })
  .then((data) => { // If the request is successful, update the state variables
    setRedirect(true); // Set the redirect state variable to true
    setCardID(data.id); // Set the cardID state variable to the ID of the newly registered user
    console.log(cardID); // Log the cardID to the console
    console.log(redir); // Log the redirect state variable to the console
    
    console.log("data set "); // Log a message to indicate that the state variables have been updated
  })
  .catch((error) => console.error(error)); // If an error occurs, log it to the console
};

// Use the useEffect hook to log a message when the component unmounts
useEffect(() => {
  return () => {
    console.log('Component unmounted');
  };
}, []);

// If the redirect state variable is true, redirect the user to the registered page
if (redir) {
  console.log("data to sent:", cardID); // Log a message to indicate that the user is being redirected
  return (
    <Navigate to={`/registered/${cardID}`} /> // Redirect the user to the registered page
  );
}


  return (
    <div className="pt-4">
      <form onSubmit={handleSubmit}>
        <h3>Admit Card Registration</h3>

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter Name"
          />
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            placeholder="Enter Phone"
          />
        </div>
        <div className="mb-3">
          <label>School</label>
          <input
            type="text"
            name="school"
            className="form-control"
            placeholder="Enter School"
          />
        </div>
        <div className="mb-3">
          <label>Class</label>
          <input
            type="text"
            name="class"
            className="form-control"
            placeholder="Enter Class"
          />
        </div>
        <div className="mb-3">
          <label>Roll No.</label>
          <input
            type="integer"
            name="rollNo"
            className="form-control"
            placeholder="Enter Roll No."
          />
        </div>
        <div className="mb-3">
          <label>Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Enter Address"
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Registration;
