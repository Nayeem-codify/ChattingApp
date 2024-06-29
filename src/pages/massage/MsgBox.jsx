import React from 'react'
import { useSelector } from 'react-redux'
import { IoMdSend } from "react-icons/io";

const MsgBox = () => {

  const data = useSelector((state) => state.loginUserData.value)
  const activeChatData = useSelector((state) => state.activeChatUser.value)
  console.log(activeChatData?.receivername);
  

  return (
    <>{!activeChatData ?
      <div style={{ fontSize: "20px", fontWeight: "800",  border: "2px", borderRadius: "10px", display: "flex", alignItems: "center", marginBottom: "5px", marginLeft: "300px",}}>
        <h1>Please Select Your Friend Chat</h1>
      </div>
      :
     <div className='msgmain'>
       <div className="msgheading">
         <div className="imgbox"></div>
          <div>
           <h3>
            {activeChatData?.receiverid == data.uid ?
             activeChatData?.sendername
             :
             activeChatData?.receivername 
            }
          </h3>    
           <p>Active Now</p>
        </div>
      </div>
      <div className="msgbody"></div>
      <div className="msgfooter">
        <div style={{fontSize: "20px", fontWeight: "600",  border: "2px", borderRadius: "15px", display: "flex", alignItems: "center", justifyContent: "center", gap: "20px"}}>
          <input type='text' className='msginput'/>
          <button><IoMdSend /></button>
        </div>
      </div>
    </div>
    }
    </>
  )
}


export default MsgBox