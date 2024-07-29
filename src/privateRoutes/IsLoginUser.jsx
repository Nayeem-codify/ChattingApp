import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const IsLoginUser = () => {
   
  const navigate = useNavigate();

     const data = useSelector((state) => state.loginUserData.value)

  return data ? <Outlet/> :  <Navigate to="/" replace={true} />
}

export default IsLoginUser
