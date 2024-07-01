import React,{ Fragment } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Post from './page/Post';
import Api from './page/Api';
import Delete from "./page/Delete"
import Search from "./page/Search"
import Update from './page/Update';
import Form from "./page/Form"
import Login from "./page/Login"
import Forget from "./page/Forget"
import Nav from "./page/Nav"


function App() {
  return (
    <div>

<Nav/>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/post" element={<Post />} />
  <Route path="/api" element={<Api />} />
  <Route path="/del" element={<Delete></Delete>}/>
  <Route path="/se" element={<Search></Search>}/>
  <Route path="/update" element={<Update></Update>}/>
  <Route path="/form" element={<Form></Form>}/>
  <Route path="/login" element={<Login></Login>}/>
  <Route path="/forget" element={<Forget></Forget>}/>
  </Routes>

    </div>
  )
}

export default App