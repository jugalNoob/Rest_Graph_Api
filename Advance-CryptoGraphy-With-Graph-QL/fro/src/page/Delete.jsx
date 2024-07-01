import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import "./style/delete.css"
// Define the GraphQL mutation
const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
  }
`;

function Delete() {
  const [deleteUser] = useMutation(DELETE_USER);
  const [deleteUserId, setDeleteUserId] = useState(""); // State to store the user ID to delete
  const [message, setMessage] = useState(""); // State to display success or error message

  const handleDelete = () => {
    // Ensure the deleteUserId is not empty before making the mutation
    if (!deleteUserId) {
      setMessage("Please enter a user ID.");
      return;
    }

    // Call the deleteUser function with the deleteUserId as a variable
    deleteUser({ variables: { deleteUserId } })
      .then(() => {
        setMessage('User deleted successfully');
        // You can add any additional logic here after a successful delete
      })
      .catch(error => {
        setMessage(`Error deleting user: ${error.message}`);
        // Handle the error as needed
      });
  };

  return (
    <div>

<div className="background-delete">

<div className="fomess">

<center>

<h1>user delete add id</h1>

      <input
        type="text"
        placeholder="Enter User ID"
        value={deleteUserId}
        onChange={(e) => setDeleteUserId(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleDelete}>Delete User</button>
      </center>
      <div>{message}</div>
    </div>
  
    </div>
    </div>
  );
}

export default Delete;