import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./style/del.css"
function Delete() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [errors, setErrors] = useState({});
// Initialize as an empty array

  useEffect(() => {
    // You can perform any initialization or data loading here
  }, []);

  const handleValidation = () => {
    let validationErrors = {};

    // Implement your validation logic here

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const addUserdata = async (e) => {
    e.preventDefault();

    try {
      if (!name) {
        alert('Missing required fields please enter your id');
      } else {
        const isValid = handleValidation();

        if (isValid) {
          const response = await fetch(`/Dost/${name}`, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

          const data = await response.json();
          console.log(data); // Check the data received

          if (response.status === 200) {
    
            console.log('User found:', data); // Adjust this based on your data structure
          } else {
        
            alert('User not found');
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="llform">
     
    
      <div className='formsdelet'>
        <form onSubmit={addUserdata}>
          <center>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter Delete'
            />
            <br />
            {errors.name && <div className="error">{errors.name}</div>}
            <br />
            <button type="submit">Search</button>
          </center>
        </form>
      </div>

     
    </div>
  );
}

export default Delete;

// 62d9150d094f5c18e94265a6

// jugal sharma
// Data: 2023-08-17T03:28:59.656Z
// Roll No: 31
// Subject: Arts
// Gender: male
// Classs: 10th