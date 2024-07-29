import React, { useEffect } from 'react'
import './layout.css'
import { Avatar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../../slice/authSlice';







const Sidebar = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const data = useSelector((state) => state.loginUserData.value)
    const dispatch = useDispatch()
    


    // useEffect(() => {
    //   if(data){
    //   console.log("Login Your Acoount");
    // }else{
    //   navigate("/")
    // }
    // },[])

    const handleSignOut = () =>{
      signOut(auth).then(() => {
      navigate("/")
      localStorage.removeItem("loginUser")
      dispatch(loginUser)
    }).catch((error) => {
     
    });
    }

  return (
   <div className='sidebarmain'>
    <div className='sidebar_inner'>
      <div className='profileimg'>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"  sx={{ width: 100 , height: 100  }} />
    </div>
    <div style={{}}>
      <p style={{textAlign: "center", color: "black", padding: "10px 0" , fontSize: "20px", fontWeight: "500", marginBottom: "45px", border: "2px", background: "white", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center"}}>{data?.displayName}</p>
      <ul className='sidebarul'>
        <li>
          <NavLink to="/home">
             <FaHome />
          </NavLink>
        </li>
         <li>
          <NavLink to="/message">
            <FaMessage />
          </NavLink>
        </li>
        <li>
          <NavLink to="/notification">
            <MdNotificationsActive />
          </NavLink>
        </li>
        <li>
          <NavLink to="/setting">
            <IoSettingsSharp />
          </NavLink>
        </li>
      </ul>

    </div>
    <div style={{display: "flex", justifyContent: "center"}}>

    <button onClick={handleSignOut} className='logoutbtn'>Logout</button>
    </div>
      </div>
   </div>
  )
}

export default Sidebar
