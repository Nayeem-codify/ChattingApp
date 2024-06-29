import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./profile.css"
import cover from '../../assets/images/cover.jpg'
import profile from '../../assets/images/profile.jpg'
import Images from '../../component/utilities/Images'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'


const Profile = () => {
  const db = getDatabase();
  const [profileUser, setProfileUser] = useState([])
  const data = useSelector((state) => state.loginUserData.value)
  const { id } = useParams();
 



  useEffect(()=>{
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if( item.key == id ){
          arr.push({...item.val(), id: item.key})
        }
      })
      setProfileUser(arr)
    });
  },[])

  console.log(profileUser);
              
  return (
    <>
       <div>
       <div style={{ width: "100px", height: "60vh" }}>
       <Images style={{height: "450px", width: "1350px", margin: "25px"}} source={cover} alt="#" styleing="coverimg"/>
        </div>
        <div style={{ marginTop: "20px", display: "flex", gap: "30px", alignItems: "center"}}>
          <div>
            <Images  style={{width: "100px", height: "100px", borderRadius: "10px",  margin: "20px"}} source={profile} alt="#" styleing="profileimg"/>
          </div>
          <div className='profileinfo'>
            <h2>{profileUser[0]?.displayName}</h2>
            <p>Web Devloper</p>
          </div>
        </div>
       </div>
       <div>
          <h3 style={{margin: "10px"}}>My Name Is Nayeem Islam. Thank you for giving me this opportunity to introduce myself. </h3>
      </div>

    </>
        // <div>Profile id: {id}</div>
  )
}

export default Profile