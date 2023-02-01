import { useState } from 'react'
import Login from "./pages/login";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/layout";
import Register from "./pages/register";
import NotFound from "./pages/404";
function App() {
  return (
      <main className=''>
         <BrowserRouter>
             <Routes>
                 <Route path='/' element={<Login/>}/>
                 <Route path='/register' element={ <Register/>}/>
                 <Route path='*' element={<NotFound/>} />
                 <Route path='/home' element={<Home/>} />
             </Routes>
         </BrowserRouter>

      </main>
  )
}

export default App
