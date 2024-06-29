import React from 'react'
import { useSelector } from 'react-redux'

const MsgBox = () => {
  const activeChatData = useSelector((state) => state.activeChatUser.value)
  console.log(activeChatData?.receivername);
  

  return (
    <div className='msgmain'>
      <div className="msgheading">
        <div className="imgbox"></div>
        <div>
        <h3>{activeChatData?.receivername}</h3>       
        <p>Active Now</p>
        </div>
      </div>
    </div>
  )
}


export default MsgBox