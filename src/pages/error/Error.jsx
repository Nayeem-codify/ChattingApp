import React from 'react'
import error from '../../assets/images/error.png'
import Images from '../../component/utilities/Images'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div >
       <div style={{ display: "flex",alignItems: "center", justifyContent: "center", width: "100%", height: "94vh"  }}>
       <Images  source={error} alt="#" styleing="error"/>
       </div>
      <Link style={{ color: "white", fontSize: "20px",  border: "2px", background: "blueviolet", borderRadius: "8px", padding: "10px 30px", textAlign: "center"}}to="/">Back To Home </Link>
    </div>
  )
}

export default Error
