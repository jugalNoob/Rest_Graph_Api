import React, { useState } from 'react';
import "./style/up.css"


function UpdateData() {
  const [id, setId] = useState();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      const response = await fetch(`  http://localhost:9000/updates/${id}`, {
        method:'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, country, bio }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(data.status);
      } else {
        setStatus('Error: Update unsuccessful');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error: An error occurred');
    }
  };

  return (
    <div>

<div className="allform">
        <div className='forms'>
<center>
      <h2>Update your  Data with add _id</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='add_id'>Add ID: </label>
      <input type="text" onChange={(e) => setId(e.target.value)} placeholder='enter id' />
      <br />
        <label>
          Name:
          <input type="text" value={name}
           onChange={(e) => setName(e.target.value)}   placeholder='enter name' />
        </label>
        <br />
        <label>
          Age:
          <input type="text" value={age} 
          onChange={(e) => setAge(e.target.value)}  placeholder='enter age'/>
        </label>
        <br />
        <label htmlFor="">country
      <select name="select-box" onChange={(e)=>setCountry(e.target.value)}>
    <option value="" disabled  >select a country</option>
  <option value="India">india</option>
  <option value="US">usa</option>
  <option value="Russia">Russia</option>
</select>
</label>

       
        <br />
        <label>
          Bio:
          <input type="text" value={bio}
           onChange={(e) => setBio(e.target.value)}  placeholder='enter bio'/>
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
      <p>Status: {status}</p>
      </center>
      </div>
  
      </div>
    </div>
  );
}

export default UpdateData;
