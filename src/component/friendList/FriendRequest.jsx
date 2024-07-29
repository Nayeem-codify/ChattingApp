import React, { useEffect, useState } from 'react'
import CardHeading from '../utilities/CardHeading';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from '@mui/material';


const FriendRequest = () => {
  const db = getDatabase();
  const [friendRequestList, setfriendRequestList] = useState([])
  const data = useSelector((state) => state.loginUserData.value)



  useEffect(()=>{
    const friendrequestRef = ref(db, 'friendrequest');
    onValue(friendrequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(data.uid  ==  item.val().whoreceiveid){
          arr.push({...item.val(), id: item.key})

        }
      })
      setfriendRequestList(arr)
    });
  },[])

  //Friend Request Delete//
  const handleReqDelete = (deleteinfo) => {
    remove(ref(db, "friendrequest/" + deleteinfo.id)).then(()=>{
      console.log("Delete Done");
    })
  }
 
  //Confirm Request list//
  const handleReqConfirm = (Confirminfo) => {
    set(push(ref(db, "friends")),{
      senderid: Confirminfo.whosendid ,
      senderemail: Confirminfo.whosendemail,
      sendername: Confirminfo.whosendname,
      receiverid: data.uid,
      receiveremail: data.email,
      receivername: data.displayName,
      
    }).then(()=>{
      remove(ref(db, "friendrequest/" + Confirminfo.id)).then(()=>{
        console.log("Confirm Done");
      })
    })
 }
  return (
    <div className='box'>
    <CardHeading text="Friend Request"/>
    <div className='useritembox'>
     {friendRequestList.length > 0
     ?
     friendRequestList.map((item,index)=>(
         <div key={index} className='useritem'>
          <div className='imgbox'></div>
          <div className="userinfo">
            <div>
              <h4>{item.whosendname}</h4>
              <p>Mern Stack</p>
            </div>
           <div>

           <button style={{height: "30px", width: "90px", color: "black", fontSize: "20px", fontWeight: "500",  border: "2px", background: "#4cd964", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center"}} onClick={()=>handleReqConfirm(item)}>Confirm</button>

           <button style={{height: "30px", width: "90px", color: "white", fontSize: "20px", fontWeight: "500",  border: "2px", background: "#ff0000", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px",}} onClick={()=>handleReqDelete(item)}>Delete</button>

           </div>
          </div>
         </div>
       ))
       :
       <Alert severity="info">No Request Found.</Alert>
      }  
    </div>
  </div>
  )
}

export default FriendRequest