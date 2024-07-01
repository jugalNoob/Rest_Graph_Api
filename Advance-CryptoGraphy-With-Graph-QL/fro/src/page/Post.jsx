import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import "./style/post.css"
// Define the GraphQL mutation for adding a user
const ADD_USER = gql`
  mutation AddUser($name: String!, $gender: String!, $subject: String!, $classs: String!, $roll_no: Int!) {
    addUser(name: $name, gender: $gender, subject: $subject, classs: $classs, roll_no: $roll_no) {
      id
      name
      gender
      subject
      classs
      roll_no
    }
  }
`;

function Post() {
  const [addUser, { error }] = useMutation(ADD_USER);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    subject: '',
    classs: '',
    roll_no: 0,
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

    // Convert formData.roll_no to an integer
    const rollNo = parseInt(formData.roll_no);

    // Call the addUser mutation with rollNo as a variable
    addUser({ variables: { ...formData, roll_no: rollNo } })
      .then((result) => {
        console.log('Mutation Result:', result);
        console.log('User added successfully', result.data.addUser);
        // You can add any additional logic here after a successful user addition
      })
      .catch((error) => {
        console.error('Error adding user:', error.message);
        console.error('GraphQL Errors:', error.graphQLErrors);
        console.error('Network Errors:', error.networkError);
        // Handle the error as needed
      });
  };

  return (
    <div>
      <div className="background-post">


      {error && <p>Error: {error.message}</p>}
      <div className="forms">
  <center>

      <h2>Add User</h2>

      <form onSubmit={handleSubmit}>
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
          <label htmlFor="roll_no">Roll No:</label>
          <input
            type="number"
            id="roll_no"
            name="roll_no"
            value={formData.roll_no}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>
      </center>
      </div>
    </div>
    </div>
  );
}

export default Post;