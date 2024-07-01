import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Page/Home';
import Post from './Page/Post';
import Delete from "./Page/Delete"
import Nav from "./Page/Nav"
import Get from "./Page/Get"
import Up from './Page/Up';
function App() {
  return (
    <div>
<Nav/>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/post" element={<Post />} />
  <Route path="/get" element={<Get />} />
  <Route path="/del" element={<Delete></Delete>}/>``
  <Route path="/update" element={<Up></Up>}/>

  </Routes>

    </div>
  )
}

export default App