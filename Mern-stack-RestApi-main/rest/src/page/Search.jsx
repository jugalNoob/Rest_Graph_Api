import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./style/seacr.css"
function Search() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [errors, setErrors] = useState({});
  const [datas, setDatas] = useState([]); // Initialize as an empty array

  useEffect(() => {
    // You can perform any initialization or data loading here
  }, []);

  const handleValidation = () => {
    let validationErrors = {};

    // Implement your validation logic here

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

///Check with id your data
  const [id , setId]=useState()
  const addUserdata = async (e) => {
    e.preventDefault();

    try {
      if (!id) {
        alert('Missing required fields please enter your id');
      } else {
        const isValid = handleValidation();

        if (isValid) {
          const response = await fetch(  `/Signup/${id}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

          const data = await response.json();
          console.log(data); // Check the data received

          if (response.status === 200) {
            setDatas([data]); // Set data as an array containing the fetched data
            console.log('User found:', data); // Adjust this based on your data structure
          } else {
            setDatas([]); // Clear the datas array if user not found
            alert('User not found');
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  ///Seacrh by name add Is Searching Times



  const [se , setSe]=useState('')

  const [searching , setSearching]=useState([])

  const SeachData = async (e) => {
    e.preventDefault();

    try {
      if (!se) {
        alert('Missing required fields please enter your id');
      } else {
        const isValid = handleValidation();

        if (isValid) {
          const response = await fetch(`/Op?search=${se}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

          const data = await response.json();
          console.log(data.name); // Check the data received

          if (response.status === 200) {
        // Set data as an array containing the fetched data
            console.log('User found:', data);

        
            setSearching([data]) // Adjust this based on your data structure
            console.log(data[0]._id)
          } else {
        // Clear the datas array if user not found
            alert('User not found');
         
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };







  return (
    <div className="allforms">

{/* search By name add line row class */}


<div className="formses">


<form >
  <center>

  <input type="text" name=""  id="" onChange={(e)=>setSe(e.target.value)} placeholder='search your name' />
  <br />
  <br />
  <button onClick={SeachData}>serach</button>
  </center>
</form>
</div>



<div className="dljcah">
  {searching.length > 0 ? (
    searching.map((item) => (
      <div key={item._id}>
           <h1>_id: {item[0]._id}</h1>
        <h1>Name: {item[0].name}</h1>
        <h1>Data: {item[0].date}</h1>
        <h1>Roll No: {item[0].roll_no}</h1>
        <h1>Subject: {item[0].subject}</h1>
        <h1>Gender: {item[0].gender}</h1>
        <h1>Class: {item[0].classs}</h1>
      </div>
    ))
  ) : (
    <p>No user data found.</p>
  )}
</div>

     
    {/* //Search By id in my Seacrh////////////////// */}
      <div className='formss'>
        <form onSubmit={addUserdata}>
          <center>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder='Enter id'
            />
            <br />
            {errors.name && <div className="error">{errors.name}</div>}
            <br />
            <button type="submit">Search</button>
          </center>
        </form>
      </div>

<div className="ides">


      {datas.map((item) => (
      <div key={item._id}>
        <h1>Name:{item.name}</h1>
        <h1>Data: {item.date.toString()}</h1>
        <h1>Roll No: {item.roll_no}</h1>
        <h1>Subject: {item.subject}</h1>
        <h1>Gender: {item.gender}</h1>
        <h1>Classs: {item.classs}</h1>
      </div>
    ))}
    </div>

    </div>
  );
}

export default Search;

// 62d9150d094f5c18e94265a6

// _id: '62d9150d094f5c18e94265a6'\


// {/* {searching.map((item) => (
//       <div key={item._id}>
//         <h1>Name:{item[0].name}</h1>
//         <h1>Data: {item.date.toString()}</h1>
//         <h1>Roll No: {item.roll_no}</h1>
//         <h1>Subject: {item.subject}</h1>
//         <h1>Gender: {item.gender}</h1>
//         <h1>Classs: {item.classs}</h1>
//       </div>
//     ))} */}