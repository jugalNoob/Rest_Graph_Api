import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./style/get.css"

function Get() {
  const [user, setUser] = useState([]);
  const [limit, setLimit] = useState(""); // Set default limit
  //search name
  const [sname , setSname]=useState("")
  //lessThen
const [less , setLess]=useState("")
//greater then 
const [garten , setGarten]=useState("")

const [total , setTotal]=useState('')
const [one , setOne]=useState('')

const [two , setTwo]=useState('')

const [hoobiess , setHoobies]=useState([])

  const callAbout = async () => {
    try {

      let url=`http://localhost:9000/Dataget?limites=${limit}
      &names=${sname}&gerten=${garten}&lessthen=${less}
      &one=${one}&two=${two}&hoobies=${hoobiess}`

      const res = await axios.get(url, {
      
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.data;
      setUser(data);
      console.log(data.length)

      setTotal(data.length)


      if (res.status !== 200) {
        throw new Error(`API request failed with status: ${res.status}`);
      }
    } catch (error) {
      console.log(error);
      // Handle errors
    }
  };

  useEffect(() => {
    callAbout();
  }, [limit , sname , less , garten , one ,two , hoobiess]); // Call useEffect whenever limit or searchTerm changes

  return (
    <div>
      <div className="background">


<div className="total">
<h1>totalDoument{total ? total : 'not show'}</h1>
</div>


{/* // Search Your Api Limit  */}
<div className="limit">
        <form>
          <center>


          <h1>enter Your min or max and limit number</h1>

<input type="number" value={less}  onChange={(e)=>setLess(e.target.value)}
 id=""  placeholder='min'/>

<input type="number" value={garten}  id=""
 onChange={(e)=>setGarten(e.target.value)}  placeholder='max'/>

<br />
<input
              type="number"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              placeholder="limit number"
            />


<br />
<br />

<h1>search Your  queries</h1>
<br />
<input type="text"  value={sname} onChange={(e)=>setSname(e.target.value)}
 id=""  placeholder='serach_name'/>
<br />
<br />
<input type="text" name="" id="" onChange={(e)=>setHoobies(e.target.value)} 
placeholder='search_hoobies' />
         
{/* 
<input type="text" name="" id="" onChange={(e)=>setOne(e.target.value)} 
 placeholder='hobbis'/><br />

<input type="text" name="" id="" onChange={(e)=>setTwo(e.target.value)} 
placeholder='hoobies' />

<br /> */}


<br />

{/* <button onClick={callAbout}>clickAll</button> */}

          </center>
        </form>
        </div>


        {/* /// Get your Api  */}

        <div className="display">
          {user.length > 0 ? (
            user.map((item) => (
              <div className="ides" key={item.id}>
                <h1 id="ides">ID: {item._id}</h1>
                <h1>Name: {item.name}</h1>
                <h1>Bio: {item.bio}</h1>
                <h1>Age : {item.age}</h1>
                <h1>Country: {item.country}</h1>
                <h1>Date: {item.date}</h1>
                <h1>Gender: {item.gender}</h1>
                <h1>Hobbies: {item.hobbies}</h1>
              </div>
            ))
          ) : (
            <p>No user data found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Get;