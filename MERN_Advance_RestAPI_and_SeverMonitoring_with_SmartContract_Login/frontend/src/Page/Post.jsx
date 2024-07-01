import React, { useState } from 'react';
import axios from 'axios';
import "./style/post.css"
function Post() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [hobbies, setHobbies] = useState(['', '']);
  
  const [identity, setIdentity] = useState({
    hashPanCard: true,
    hashAdhaarCard: false,
  });
  const [bio, setBio] = useState('');
  const [isEligible, setIsEligible] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');

  const [isLoading, setIsLoading] = useState(false);


  const handleChangeIdentity = (key, value) => {
    setIdentity((prevIdentity) => ({
      ...prevIdentity,
      [key]: value,
    }));
  };


  const Clicked = async() => {


    try {

     
          let data={name , age ,hobbies, bio , isEligible , gender , country , identity}
        
          const response=await fetch('http://localhost:9000/signup',{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(data),
          })
      
          if(response.ok){
            console.log("success")
            console.log(response)
            console.log(data)
          }else{
            console.log("erro")
          

        }
    } catch (error) {
      console.log(error)
    }


    // Simulate a form submission (replace this with actual submission logic)
   
  }

  // const Clicked=()=>{

  // }

  return (
    <div>
      
<div className="allUserPost">
      <div className='forms'>
        <form>
<center>
    
      <label >
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} 

          placeholder='enter name'
        />
      </label>
      <br />
      <br />
      <label>
        Age:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)} 

          placeholder='enter age'
        />
      </label>
      <br />
      <br />
      <label>
        Hobbies:
        <input
          type="text"
          value={hobbies[0]}
          onChange={(e) => setHobbies([e.target.value, hobbies[1]])}
          placeholder='Enter your first Hobby'
        />
        <input
          type="text"
          value={hobbies[1]}
          onChange={(e) => setHobbies([hobbies[0], e.target.value])}
          placeholder='Enter your second Hobby'
        />
      </label>
      <br />
      <br />

      <label>
          Gender:
          <input
            type='radio'
            name='gender'
            value='Male'
            checked={gender === 'Male'}
            onChange={(e) => setGender(e.target.value)}
          />
          Male
        </label>
        <label>
          <input
            type='radio'
            name='gender'
            value='Female'
            checked={gender === 'Female'}
            onChange={(e) => setGender(e.target.value)}
          />
          Female
        </label>

<br />
      <br />
      <label>
        Bio:
        <input type='text'
          value={bio}
          onChange={(e) => setBio(e.target.value)}

          placeholder='enter bio'
        />
      </label>
      <br />
      <br />
     <label>
      elgible
   
      <select name="select-box" onChange={(e)=>setIsEligible(e.target.value)}>

  <option value="male">True</option>
  <option value="female">false</option>
 
</select>
</label>
      <br />
      <br />
    
    <label>
        Hash PAN Card:
        <input
          type="checkbox"
          checked={identity.hashPanCard}
          onChange={(e) =>  handleChangeIdentity('hashPanCard', e.target.checked)}
        />
      </label>
      <br />
      <br />
      <label>
        Hash Aadhaar Card:
        <input
          type="checkbox"
          checked={identity.hashAdhaarCard}
          onChange={(e) => handleChangeIdentity('hashAdhaarCard', e.target.checked)}
        />
      </label>
      <br />
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
      <br />
      <button  onClick={ Clicked}>

   clickButton

      </button>
      </center>
      </form>
   
    </div>

    </div>
    </div>
  );
}

export default Post;
