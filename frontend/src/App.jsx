import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Start from './pages/Start';
import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';
import CaptainRegister from './pages/CaptainRegister';
import CaptainLogin from './pages/CaptainLogin';
import Home from './pages/Home';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start/>}/>
      <Route path='/user-register' element={<UserRegister/>}/>
      <Route path='/user-login' element={<UserLogin/>}/>
      <Route path='/captain-register' element={<CaptainRegister/>}/>
      <Route path='/captain-login' element={<CaptainLogin/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
