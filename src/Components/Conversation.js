
import { useState, useEffect, useRef } from 'react';
import '../Styles/Conversation.css'
import socket from '../socketjs';
import useraavatar from '../img/useravatar.png';
import adminavatar from '../img/adminavatar.png';
import { IoMdSend } from 'react-icons/io';

const Conversation = (props) => {
  const [data, setdata] = useState("");
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState(null);

  console.log("CurrentusersocketIDCurrentusersocketID", props.CurrentusersocketID)
  let selectedUser = {
    ...props.selectedUser,
    messages: [],
  };
  const [messages, setMessages] = useState([]);
  console.log("Selected user object chatwindow compo:", selectedUser);
  let messageContent = "";
  let ref; //Reference to the input field so that it gets cleared every time we submit
  const getContent = (e) => {
    messageContent = e.target.value;
    ref = e;
  };

  const messageEndRef = useRef(null);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  //CurrentusersocketID
  const onMessage = (e, content) => {
    e.preventDefault();
    if (content == "" || content == " ") {
      return;
      // return false;
    }
    console.log("Message is:", content);
    ref.target.value = "";
    if (props.selectedUser) {
      socket.emit("private message admin", {
        content,
        to: props.selectedUser.userID,
        username: props.selectedUser.username
      });
      socket.emit("save message", {
        content,
        conversationID: props.CurrentusersocketID,
        to: props.selectedUser.userID
      });
      setMessages((messages) => [
        ...messages,
        { toUser: props.selectedUser.username, content, fromSelf: true },
      ]);
    }
    console.log("Message object", messages);
  };
  function formatTime(timestamp) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes} ${ampm}`;
  }
  const showMessages = messages.map((message, index) => {
    if (
      message.fromSelf === true &&
      message.toUser === props.selectedUser.username
    )
      return (
        <div className='owner' key={index}>
          {/* <div className='account-holder'> */}
            {/* <img src={useraavatar} className='user-img' /> */}
            {/* <h5 className='user-title'>{props.Currentuser}</h5> */}
            <h5>You</h5>
          {/* </div> */}
          <div className='account-holder-message'>
            <p className='msg'>{message.content}</p>
          </div>
        </div>
      );
    if (
      message.fromSelf === false &&
      message.fromUser === props.selectedUser.username
    )
      return (
        <div className='outsider' key={index}>
          {/* <div className='outside-user'> */}
            <img src={adminavatar} className='user-img' />
          {/* </div> */}
          <div className='outside-user-message-top'>
            <h5 className='admin-title'>{props.selectedUser.username}</h5>
            <div className='outside-user-message'>
              <p className='msg'>{message.content}</p>
            </div>
          </div>
        </div>
      );
  });

  socket.on("private message", ({ content, from }) => {
    console.log(props.connectedUsers);
    let newMessages = {};
    for (let i = 0; i < props.connectedUsers.length; i++) {
      const user = props.connectedUsers[i];
      if (user.userID === from) {
        console.log("Iteration:", i);
        newMessages = {
          fromUser: props.connectedUsers[i].username,
          content,
          fromSelf: false,
        };
        const messagesList = [...messages, newMessages];
        setMessages(messagesList);
      }
    }
  });

  console.log(showMessages);
  console.log("In chatwindow selected user:", props.selectedUser);
  console.log("Chek this", props.Currentuser)
  return (
    <>
    <div className='center-down'>
      {showMessages}
      <form onSubmit={(e) => onMessage(e, messageContent)}>
        <div className='inpput-message'>
          <input placeholder='Send message...' onChange={(e) => getContent(e)} />
          <button type='submit'><IoMdSend className='submit' /></button>
        </div>
      </form>
    </div>
    <div ref={messageEndRef} />
    </>
  );
}

export default Conversation




