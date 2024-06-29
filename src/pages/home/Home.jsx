import React from 'react'
import UserList from './UserList'
import FriendRequest from '../../component/friendList/FriendRequest'
import Friends from '../../component/friendList/Friends'

const Home = () => {
  return (
    <>
    <div style={{display: "flex", flexWrap: "wrap", marginTop: "30px", gap: "25px"}}>
      <div>
      <UserList/>
    </div>
    <div>
      <FriendRequest/>
    </div>
    <div>
      <Friends/>
    </div>
    </div>
    </>

  )
}

export default Home
