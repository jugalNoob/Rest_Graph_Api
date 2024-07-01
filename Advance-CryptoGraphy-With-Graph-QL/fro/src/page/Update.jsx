import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import "./style/update.css"
const UPDATE_USER = gql`
  mutation updateUser(
    $updateUserId: ID!
    $name: String
    $gender: String
    $subject: String
    $classs: String
    $rollNo: Int
  ) {
    updateUser(
      id: $updateUserId
      name: $name
      gender: $gender
      subject: $subject
      classs: $classs
      roll_no: $rollNo
    ) {
      id
      name
      gender
      subject
      classs
      roll_no
    }
  }
`;

function Update() {
  const [updateUser] = useMutation(UPDATE_USER);
  const [formData, setFormData] = useState({
    updateUserId: '', // Empty string to be filled with the actual user ID
    name: '',
    gender: '',
    subject: '',
    classs: '',
    rollNo: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Convert formData.rollNo to an integer
    const rollNo = parseInt(formData.rollNo);
  
    // Check if rollNo is a valid integer
    if (isNaN(rollNo)) {
      console.error('Roll No must be a valid integer');
      return;
    }
  
    // Call the updateUser mutation with formData as variables
    updateUser({ variables: { ...formData, rollNo } })
      .then((result) => {
        console.log('Mutation Result:', result);
        // Handle the result as needed
      })
      .catch((error) => {
        console.error('Error updating user:', error.message);
        // Handle the error as needed
      });
  };

  return (
    <div>
      <div className="backfround-update">

<div className="formss">
  <center>


      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="updateUserId">User ID:</label>
          <input
            type="text"
            id="updateUserId"
            name="updateUserId"
            value={formData.updateUserId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="classs">Class:</label>
          <input
            type="text"
            id="classs"
            name="classs"
            value={formData.classs}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="rollNo">Roll No:</label>
          <input
            type="number"
            id="rollNo"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update User</button>
      </form>
      </center>
      </div>
    </div>
    </div>
  );
}

export default Update;