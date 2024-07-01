import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Update() {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [names, setNames] = useState('');
  const [subject , setSubject]=useState()

  const handleUpdate = async () => {
    if (!id || !names  || !subject) {
      console.error("User ID and Names are required.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:9000/Signup/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ names , subject }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user.');
      }

      const data = await response.json();
      console.log(data);

      // Handle successful response here
      navigate('/'); // Navigate to a different page or perform other actions
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error case here
    }
  };

  return (
    <div>
      <div className="allform">
        <div className='forms'>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <center>
              <input type="text" onChange={(e) => setId(e.target.value)} placeholder='enter id' />
              <br />
              <br />
              <input
                type="text"
                onChange={(e) => setNames(e.target.value)}
                placeholder="enter name"
              />
              <br />
              <br />
             
              <input
                type="text"
                onChange={(e) => setSubject(e.target.value)}
                placeholder="enter subject"
              />
 <br />
              <br />
              <button type="submit">Update</button>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Update;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Update() {
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [names, setNames] = useState('');
//   const [errors, setErrors] = useState({});

//   const handleValidation = () => {
//     let errors = {};

//     // Implement your validation logic here
//     // Example: Check if fields are not empty

//     // if (!name) {
//     //   errors.name = 'Name is required';
//     // }
//     // if (!names) {
//     //   errors.names = 'Names is required';
//     // }

//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

  
//   const addUserdata = async (e) => {
//     e.preventDefault();
  
//     const isValid = handleValidation(); // Validate the inputs
  
//     if (isValid) {
//       try {
//         const data = await fetch(`/Signup/${name}`, {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ names }),
//         });
  
//         console.log(data)
//         const res = await data.json();
//         console.log(res);
  
//         if (data.status !== 200) {
//           // Handle error cases
//           console.error('Error:', res.error);
//         } else {
//           navigate('/');
//           console.log(names);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="allform">
//         <div className='forms'>
//           <form onSubmit={addUserdata}>
//             <center>
             
//               <input
//                 type="text"
//                 onChange={(e) => setNames(e.target.value)}
//                 placeholder="enter name"
//               />
//               <br />
//               <br />
//               <button type="submit">Update</button>
//             </center>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Update;