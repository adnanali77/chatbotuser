import React from 'react'
import { useState } from 'react';

const Online = (props) => {
  const [page, setPage] = useState(1);
  const userList = props.connectedUsers;
  let selectedUser = "";

 

  const userName_from_click = (e) => {
    selectedUser = e.target.innerText;
    let selectedUserDetails = userList.find(
      (user) => user.username === selectedUser
    );
    props.selectUser(selectedUserDetails);
  };


 
  let showUsers = userList.map((user) => {
    return (
      <div
        key={user.key}
        className="user-list-el"
        onClick={(e) => userName_from_click(e)}
        style={{ backgroundColor: "#f5f5f5", padding: "10px", marginBottom: "5px", display: "flex", alignItems: "center" }}
      >
        <div className="online-dot" style={{ backgroundColor: "green", width: "10px", height: "10px", borderRadius: "50%", marginRight: "10px" }}></div>
        <span>{user.username}</span>
        <br></br>
        <br></br>

      
      </div>
    );
  });
  return <div>{showUsers}</div>;
}

export default Online



