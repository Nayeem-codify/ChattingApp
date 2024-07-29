import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { IoMdSend } from "react-icons/io";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";

const MsgBox = () => {

  const data = useSelector((state) => state.loginUserData.value)
  const activeChatData = useSelector((state) => state.activeChatUser.value)
  console.log(activeChatData?.receivername);
  const [msgText , setMsgText] = useState ("")

  // console.log(msgText);

  const handleSubmitMsg = () => {
     console.log(msgText);
     set(push(ref(db, "message")),{
      // senderid: Confirminfo.whosendid ,
      // senderemail: Confirminfo.whosendemail,
      // sendername: Confirminfo.whosendname,
      // receiverid: data.uid,
      // receiveremail: data.email,
      // receivername: data.displayName,
      
    })
  }
  

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

      <div className="msgbody">
        <div className='sendmsgmain'>
        <p className='sendmsg'>Hello</p>
        </div>

        <div className='receivemsgmain'>
        <p className='receivemsg'>Hello</p>
        </div>

        <div className='sendmsgmain'>
        <p className='sendmsg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt quaerat magni, nisi placeat ipsam mollitia obcaecati ut reprehenderit consequatur? Architecto, dignissimos. Eveniet impedit repudiandae, dicta iusto expedita consectetur eligendi beatae culpa, consequatur aut, perspiciatis reprehenderit nam maiores asperiores velit totam nihil esse ea incidunt accusantium cupiditate corrupti vero cumque accusamus!</p>
        </div>

      </div>
      <div className="msgfooter">
        <div style={{fontSize: "20px", fontWeight: "600", display: "flex", alignItems: "center", gap: "20px"}}>
          <input onChange={(e)=>setMsgText(e.target.value)} type='text' className='msginput' placeholder='Enter Your Masseage'/> 
          {msgText.length > 0 &&
          <button onClick={handleSubmitMsg} className='btns'><IoMdSend/></button>
          }
        </div>
      </div>
    </div>
    }
    </>
  )
}


export default MsgBox