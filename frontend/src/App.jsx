import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Start from './pages/Start';
import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';
import CaptainRegister from './pages/CaptainRegister';
import CaptainLogin from './pages/CaptainLogin';
import Home from './pages/Home';
import UserProtectedWrapper from './pages/UserProtectedWrapper';
import UserLogout from './pages/UserLogout';
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper';
import CaptainHome from './pages/CaptainHome';
import CaptainLogout from './pages/CaptainLogout';
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
    <Toaster position="top-center" />
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start/>}/>
      <Route path='/user-register' element={<UserRegister/>}/>
      <Route path='/user-login' element={<UserLogin/>}/>
      <Route path='/captain-register' element={<CaptainRegister/>}/>
      <Route path='/captain-login' element={<CaptainLogin/>}/>
      <Route path='/home' element={<UserProtectedWrapper><Home/></UserProtectedWrapper>}/>
      <Route path='/user-logout' element={<UserProtectedWrapper><UserLogout/></UserProtectedWrapper>}/>
      <Route path='/captain-home' element={<CaptainProtectedWrapper><CaptainHome/></CaptainProtectedWrapper>}/>
      <Route path='/captain-logout' element={<CaptainProtectedWrapper><CaptainLogout/></CaptainProtectedWrapper>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
