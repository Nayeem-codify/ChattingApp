import { useState } from 'react'
import Button from '@mui/material/Button';
import {createRoutesFromElements,createBrowserRouter,Route,RouterProvider} from "react-router-dom";
import './App.css'
import Login from './pages/auth/Login';
import Error from './pages/error/Error';
import RootLayout from './component/layout/RootLayout';
import Home from './pages/home/Home';
import Registration from './pages/auth/Registration';
import Notification from './pages/notification/Notification';
import Message from './pages/massage/Message';
import Settings from './pages/settings/Settings';
import IsLoginUser from './privateRoutes/IsLoginUser';
import Profile from './pages/profile/Profile';

function App() {
  const router = createBrowserRouter(
  createRoutesFromElements(
  <Route>
    <Route element={<IsLoginUser/>}>
    <Route element={<RootLayout/>}>
      <Route path='/home' element={<Home/>}/>
        <Route path='/message' element={<Message/>}/>
           <Route path='/notification' element={<Notification/>}/>
             <Route path='/setting' element={<Settings/>}/>
             <Route path='/profile/:id' element={<Profile/>}/>
    </Route>
  </Route>
      <Route path='/' element={<Login/>} />
         <Route path='*' element={<Error/>} />
              <Route path='/registration' element={<Registration/>} />
    </Route>
  )
);

  return (
     <RouterProvider router={router}/>
  )
}

export default App
