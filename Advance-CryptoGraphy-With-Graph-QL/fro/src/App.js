import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Form from './page/Form';
import Hashese from './page/Hashese';
import Cooke from "./page/Cooke"
import Nav from "./page/Nav"
import Login from './page/Login';
import Gets from "./page/Gets"
import Delete from './page/Delete';
import Post from './page/Post';
import Update from './page/Update';


function App() {
  return (
    <div>
  <Nav/>
<Routes>

<Route path="/" element={<Home />} />
<Route path="/form/:id" element={<Form />} />
<Route path="/hash/:id" element={<Hashese></Hashese>}/>
<Route path="/profile/:id" element={<Cooke></Cooke>}/>
<Route path="/Login/:id" element={<Login></Login>}/>
<Route path="/post/:id" element={<Post></Post>}/>
<Route path="/get/:id" element={<Gets></Gets>}/>
<Route path="/update/:id" element={<Update></Update>}/>
<Route path="/delete/:id" element={<Delete></Delete>}/>
</Routes>

    </div>
  )
}

export default App