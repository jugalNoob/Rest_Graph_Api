import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style/post.css"

function Post() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    classs: '',
    roll_no: '',
    gender: '',
    subject: '',
  });


  useEffect(() => {
    if (!localStorage.getItem("usersdatatoken")) {
      alert("please Login form")
      navigate("/login");
    }
  }, []);

  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  // "name":"Kiojs",
  // "classs": "10th",
  // "roll_no": "36",
  // "gender": "male",
  // "subject":"Math"
  const handleValidation = () => {
    let errors = {};

    if (user.name.length < 5 || user.name.length > 15) {
        
        errors.name = 'Name length must be between 5 and 15 characters';
    }else if(!/[th]/.test(user.name)){
      errors.name("th th")
      console.log("not th")
      alert("not th")
     
    }

    if (user.roll_no.length < 2) {
        
      errors.name = 'roll_no only word 2';
  }


    // } else if (!/[A-Z]/.test(user.name)) {
    //   errors.name = 'Name should contain at least one uppercase letter';
    // } else if (!/[*\-#&]/.test(user.name)) {
    //   errors.name = 'Name should contain at least one special character';
    // }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

        



const addUserdata = async (e) => {
    e.preventDefault();
  
    try {
        const { name, classs , roll_no , gender , subject } = user;
  
        if(!name || !classs || !roll_no || !gender || !subject) {
        alert("Missing required fields");
      } else {
        const isValid = handleValidation(); // Call handleValidation before submitting
  
        if (isValid) {
          const data = await fetch("/Signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ name,classs , roll_no , gender , subject  })
          });
  
          const res = await data.json();
          if (res.status === 201) {
            alert("Check your form");
          } else {

            navigate("/")
            console.log(user);
            // localStorage.setItem("usersdatatoken",res.result.token);
            // localStorage.setItem("usersdatatokens",res.result.name);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
  
      <div className="allUserPost">
      <div className='forms'>
<form method='Post'>
    <center>
        <input type="text" name="name" id="" value={user.name}
         onChange={handleChange}  placeholder='enter name' />
         <br />
         <br />
         <input type="text" name="classs" id="" value={user.classs}
         onChange={handleChange}  placeholder='enter class' />
         <br />
         <br />
         <input type="text" name="roll_no" id="" value={user.roll_no}
         onChange={handleChange}  placeholder='enter roll_no' />
         <br />
         <br />
         <input type="text" name="gender" id="" value={user.gender}
         onChange={handleChange}  placeholder='enter gender' />
         <br />
         <br />
         <input type="text" name="subject" id="" value={user.subject}
         onChange={handleChange}  placeholder='enter subject' />
         <br />
         <br />
         <button onClick={addUserdata}>Submit</button>
         
                 </center>
</form>
</div>
</div>

    </div>
  );
}

export default Post;