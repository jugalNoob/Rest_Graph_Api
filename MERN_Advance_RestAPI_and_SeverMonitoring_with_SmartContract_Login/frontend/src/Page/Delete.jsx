import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style/del.css"



function Delete() {
  const navigate = useNavigate();
  const [id, setId] = useState('');

  const deleteUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9000/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log('User deleted:', data);
        // Optionally, you can navigate or perform other actions after deletion
        navigate('/'); // Redirect to a success page, for example
      } else if (response.status === 404) {
        alert('User not found');
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error(error);
      // Handle error appropriately (e.g., show error message to the user)
    }
  };

  return (
    <div className="llform">
      <div className='formsdelet'>

<h1>Delete Your Information With _id</h1>

        <form onSubmit={deleteUser}>
          <center>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder='Enter ID to Delete'
            />
            <br />
            <button type="submit">Delete</button>
          </center>
        </form>
      </div>
    </div>
  );
}

export default Delete;


// 6517918a4f599b5c0ef5f019