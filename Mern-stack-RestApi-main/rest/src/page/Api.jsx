import React, { useEffect, useState } from 'react';
import './style/get.css';

function Api() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState('');
  const [get, setGet] = useState('');
  const [name , setName]=useState('');
  const [result , setResult]=useState()
  const [total , setTotal]=useState()

  const fetchData = async (limitValue, getValue) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/post?limites=${limitValue}&gerten=${getValue}&name=${name}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      setUserData(data.documents);
      console.table(data.documents)
      setResult(data.resultShow)
    setTotal(data.total)

      console.log(data.resultShow , "result")
      console.log(data.total ,"show total")

    
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial data fetch logic here if needed
  }, []);

  const handleButtonClick = () => {
    fetchData(limit, get);
  };

  useEffect(() => {
    const callAbout = async () => {
      try {
        // /post?limites=16&gerten=&name=
        const res = await fetch('/post?limites=0&gerten=0', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        console.log(res.url);
        const data = await res.json();
        setUserData(data.documents);
       
        setIsLoading(false);
        // console.table(data);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    callAbout();
  }, []);

  return (
    <div>
<div className="allGetInfo">

{/* resutl Line row class start */}

<div className="result">
  <h1>Result Show: {result ? result: "search"}</h1>
  <br />
  <h1>total document :{total ? total :"search"}</h1>

</div>

{/* //Searching  */}
        <div className="searching">
          <center>

  
          <input type="number" onChange={(e) => setLimit(e.target.value)} placeholder="limits" name="" id="" />
       
          <input type="number" name="" id="" onChange={(e) => setGet(e.target.value)} placeholder="seraching" />
    
          <input type="text" name="" id=""  onChange={(e)=>setName(e.target.value)} placeholder='enter name'/>
       <br />
          <button onClick={handleButtonClick}>click</button>
          </center>
        </div>

        {/* api set Row Class Line */}
        <div className="flex-image">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : userData.length > 0 ? (
            <div>
              <div className="flexone">
                {userData.map((item) => (
                  <div className="flexs" key={item._id}>
                    <div className="flex">
                      <div className="images">
                        <h1>ID: {item._id}</h1>
                        <h1>Name: {item.name}</h1>
                        <h1>Roll No: {item.roll_no}</h1>
                        <h1>Gender: {item.gender}</h1>
                        <h1>Class: {item.classs}</h1>
                        <h1>Subject: {item.subject}</h1>
                        <h1>Time: {item.date}</h1>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Api;
