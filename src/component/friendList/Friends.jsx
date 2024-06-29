import React, { useEffect, useState } from 'react'
import CardHeading from "../../component/utilities/CardHeading"
import { Alert } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue, set, push, remove} from "firebase/database"



const Friends = () => {

    const [ FriendsList, setFriendsList] = useState([])
    const db = getDatabase();
    const data = useSelector((state) => state.loginUserData.value)
console.log(data);
    useEffect(()=>{
        const usersRef = ref(db, 'friends');
        onValue(usersRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item)=>{
              arr.push({...item.val(), id: item.key})
            if( item.val().senderid == data.uid || item.val().receiverid == data.uid ){
            }
          })
          setFriendsList(arr)
        });
      },[])
      // console.log(FriendsList);

      //Block LIst//
      const handleBlock = (blockinfo) => {
        
      set(push(ref(db, "block")),{
        blockid: blockinfo.receiverid,
        blockemail: blockinfo.receiveremail,
        blockname: blockinfo.receivername,
        blockkkorcehid: data.uid,
        blockkorcehemail: data.email,
        blockkorcehname: data.displayName,
       }).then(()=>{
      remove(ref(db, "friends/" + blockinfo.receiverid)).then(()=>{
        console.log("Block Done");
      })
    })
 }
  return (
    <div className='box'>
    <CardHeading text="Friend List"/>
    <div className='useritembox'>
        {FriendsList.length > 0
        ? FriendsList.map((item,index)=>(
         <div key={index} className='useritem'>
          <div className='imgbox'></div>
          <div className="userinfo">
            <div>
              <h4>{item.receiverid == data.uid ?
              item.sendername
              :
              item.receivername
              }</h4>
              <p>Mern Stack</p>
            </div>
           <div>
            
           <button style={{height: "30px", width: "90px", color: "white", fontSize: "20px", fontWeight: "500",  border: "2px", background: "#ff0000", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "5px"}}>Unfriend</button>

           <button style={{height: "30px", width: "90px", color: "white", fontSize: "20px", fontWeight: "500",  border: "2px", background: "#ff0000", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "5px"}} onClick={()=>handleBlock(item)}>Block</button>

           </div>
          </div>
         </div>

        ))
        :
         <Alert severity="info">No Friends Found.</Alert>
        }
    </div>
  </div>
  )
}

export default Friends