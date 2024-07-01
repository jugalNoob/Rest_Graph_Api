import React, { useState, useEffect } from 'react';
import sha256 from 'crypto-js/sha256';
import "./style/hash.css"
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Hashese() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [userHash, setUserHash] = useState('');
  const [verified, setVerified] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const verifySecret = () => {
    const secret = 'jugal sharma';
    let ages = 69;
    const hashedSecret = sha256(secret + ages).toString();
    return hashedSecret;
  };

  const updateAndVerifyHash = () => {
    setIsLoading(true); // Show the loading spinner
    const hashedSecret = sha256(name + age).toString();
    setUserHash(hashedSecret);

    setTimeout(() => {
      if (hashedSecret === verifySecret()) {
        console.log(hashedSecret);
        setVerified("Verified: treasure locations are the same");
      } else {
        setVerified("Not Verified: treasure locations are different");
      }
      setIsLoading(false); // Hide the loading spinner after verification
    }, 3000);
  };

  return (
    <div>
      <div className="back-hash">
        <div className="center-all">
          <center>
            <h1>Secret Verification</h1>
            <br />
            <br />
            <form onSubmit={(e) => { e.preventDefault(); updateAndVerifyHash(); }}>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                required
              />
              <br />
              <br />
              <input
                type="text"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                required
              />
              <br />
              <br />
              <button type="submit">Click</button>
            </form>
            <br />
            <br />

            <h1>
              {isLoading ? ( // Show loading spinner if isLoading is true
                <Box sx={{ display: 'flex', marginLeft: "50%" }}>
                  <CircularProgress color="secondary" />
                </Box>
              ) : (
                verified && <p>{verified}</p>
              )}
            </h1>

            <br />
            <br />
          </center>
        </div>
      </div>
    </div>
  );
}

export default Hashese;



// const [isLoaded , setIsloaded]=useState(false)
// useEffect(() => {
//   if (isLoaded) {
//     setTimeout(() => {
//       setVerified(false); // Hide CircularProgress after a delay
//     }, 3000); // Set the delay time in milliseconds (e.g., 3000ms = 3 seconds)
//   }
// }, [isLoaded]);