import React, { useEffect, useState } from 'react'
import './homepage.css'
import CardHeading from "../../component/utilities/CardHeading"
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';



const UserList = () => {
  const db = getDatabase();
  const [userList, setUserList] = useState([])
  const [friends, setFriends] = useState([])
  const [freqList, setfreqList] = useState([])
  const data = useSelector((state) => state.loginUserData.value)
  // console.log(data.uid);

  // all user list
  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "/users");
    const fdRequRef = ref(db, "/friendrequest");
    let arr = [];
    let fdRequArr = [];
    let allRequ = [];


    // Fetch all friend requests
    onValue(fdRequRef, snapShot => {
      allRequ = [];
      snapShot.forEach(requ => {
        // console.log(requ.key)
        allRequ.push({ id: requ.key, ...requ.val() });
      });
      

      // Fetch all users
      onValue(starCountRef, snapShot => {
        arr = [];
        snapShot.forEach(item => {
          if (item.key !== data?.uid) {
            let isRequ = false;
            let requId = null;

// Check if there is a matching friend request
       allRequ.forEach(requ => {
          if (item.key == requ.whoreceiveid) {
            isRequ = true;
            requId = requ.id;
            fdRequArr.push({ id: item.key });
           }
          });
          arr.push({ ...item.val(), id: item.key, isRequ, requId });
          }
        });
        setUserList(arr);
      });
    });
  }, []);

  // console.log(userList);

  // friend request list
  useEffect(()=>{
    const usersRef = ref(db, 'friendrequest');
    onValue(usersRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(data.uid == item.val().whosendid || data.uid == item.val().whoreceiveid){
          arr.push(item.val().whosendid + item.val().whoreceiveid)
        }
      })
      setfreqList(arr)
    });
  },[])

  // console.log(freqList);

  //Frind List//
  useEffect(()=>{
    const usersRef = ref(db, 'friends');
    onValue(usersRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if( item.val().senderid == data.uid || item.val().receiverid == data.uid  ){
          arr.push(item.val().senderid + item.val().receiverid)
        }
      })
      setFriends(arr)
    });
  },[])
  // console.log(friends);


  let handleFriendRequest = (friendrequestinfo) => {
     set(push(ref(db, "friendrequest")),{
      whosendid: data.uid,
      whosendemail: data.email,
      whosendname: data.displayName,
      whoreceiveid: friendrequestinfo.id,
      whoreceiveemail: friendrequestinfo.email,
      whoreceivename: friendrequestinfo.displayName
     }).then(()=>{
      console.log("Friend Request Sent Succesfully");
     })
  }

  let handlecancelreq = (cancelReq) => {
    // console.log(cancelReq);
    const db = getDatabase();
    remove(ref(db, "friendrequest/" + cancelReq.requId)).then(() => {
      console.log("Successfully Deleted Friend Request");
    });
  }

  return (
    <div className='box'>
      <CardHeading text='User List'/>
      <div className='useritembox'>
       {userList.length > 0
       ?
       userList.map((item,index)=>(
           <div key={index} className='useritem'>
            <div className='imgbox'></div>
            <div className='userinfo'>
              <div>
                <Link to={`/profile/${item.id}`}>
                <h4>{item.displayName}</h4>
                </Link>
                <p>Mern Stack</p>
              </div>
              {freqList.includes(data.uid + item.id) || freqList.includes(item.id + data.uid)
                ?
                <button style={{height: "30px", width: "70px", color: "white", fontSize: "20px", fontWeight: "500",  border: "2px", background: "Black", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center",}}  onClick={()=>handlecancelreq(item)}>Cancel</button>
                :
                friends.includes(data.uid + item.id) || friends.includes(item.id + data.uid)
                ?
                <button style={{height: "30px", width: "70px", color: "white", fontSize: "20px", fontWeight: "500",  border: "2px", background: "Black", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center",}}>Friend</button>
                :  
                <button style={{height: "30px", width: "70px", color: "white", fontSize: "20px", fontWeight: "500",  border: "2px", background: "Black", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center",}} onClick={()=>handleFriendRequest(item)}>Add</button>
              }
              {
                // console.log(freqList.includes(data.uid + item.id))
              }
            </div>
           </div>
         ))
         :
         <Alert severity="info">No User Found.</Alert>
        }  
      </div>
    </div>
  )
}

export default UserList


