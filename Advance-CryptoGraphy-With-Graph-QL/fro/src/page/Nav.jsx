
import React,{useEffect , useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import "./style/nav.css"


import { form, hash , profile , Login,Post ,Get ,Update , Delete} from "./Hash/AllHash"
import sha256 from 'crypto-js/sha256';
import Cookies from 'js-cookie';
function Nav() {
    const Fucks = () => {
        if (document.getElementById("myname").style.width === "256px") {
          document.getElementById("myname").style.width = "0";
        } else {
          document.getElementById("myname").style.width = "256px";
        }
      }

      const navigate = useNavigate();

      const [isLoggedIn, setIsLoggedIn] = useState(false);

      useEffect(() => {
        // Check user's authentication status on component mount
        const usersDataToken = localStorage.getItem("usersdatatoken");
        if (usersDataToken) {
          setIsLoggedIn(true);
        }
      }, []);
    
      const handleLogout = () => {
        // Clear user data and update login state
        localStorage.removeItem("usersdatatoken");
        sessionStorage.removeItem("hash");
        Cookies.remove("token")
        Cookies.remove("tokens")
        setIsLoggedIn(false);
        navigate("/");
      };

    //Profile your nav
    
  return (
    <div>
{/* 
        start row class line  */}

<div className="background-home">
<div className="flex-home">

    <div className="head-one">
<h1>rest-api</h1>
    </div>
    <div className="icone">
    <span class="material-symbols-outlined" onClick={Fucks}>
menu
</span>
    </div>

 
</div>

<div className="siders" id="myname">

<Link to="/">home</Link>
<Link to={Get()}>Get</Link>

            {isLoggedIn ? (
              <>
               <Link to={profile()}>Profile</Link>
                <Link to={hash()}>hash</Link>
                <Link to={Post()}>post</Link>
                <Link to={Get()}>Get</Link>
                <Link to={Update()}>Update</Link>
                <Link to={Delete()}>Delete</Link>
                <center>
                <button onClick={handleLogout}>logout</button>
                </center>
              </>
            ) : (
              <>
          
              <Link to={form()}>form</Link>
              <Link to={Login()}>login</Link>
              <Link to={profile()}>Profile</Link>
              </>
            )}
    </div>

</div>

{/* //last row class Line start end */}
    </div>
  )
}

export default Nav

// xyz95e845ca2c235c@gmail.com
// /Jugal@#$123