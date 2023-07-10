import './App.css';
import logo from './img/logo.png';
import { useState, useEffect } from 'react';
import { Chat_History, getmsg } from './Service/Api.js'
import { VscChromeMinimize } from 'react-icons/vsc';
import { IoMdSend } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import useraavatar from './img/useravatar.png';
import adminavatar from './img/adminavatar.png';
import Login from './Components/Login';
import Main from './Components/Main';
import socket from './socketjs';
const initialValue = {
  name: '',
  email: ''
}
function App() {
  const [minimize, setMinimize] = useState(true);
  const [form, setForm] = useState(true);
  const [data, setdata] = useState('');
  const [logindata, setLogindata] = useState(initialValue);

  const [userName, setUserName] = useState("");
  const [usersList, addUsers] = useState([]);
  const [CurrentusersocketID, setCurrentusersocketID] = useState("");
  const [adminName, setAdminName] = useState("");

  const getUsername = (fetched_userName) => {
    setUserName(fetched_userName);
    socket.auth = { fetched_userName };
    socket.connect();
  };

  socket.on("users", (users) => {
    console.log("Client side users", users)
    users.forEach((user) => {
      user.self = user.userID === socket.id;
    });
    users = users.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    });
    addUsers(users);
    setCurrentusersocketID(socket.id);
  });

  socket.on("user connected", (user) => {
    addUsers([...usersList, user]);
  });

  const changeHandle = (e) => {
    setdata(e.target.value);
  }

  const handleclick = async () => {
    await getmsg(data);
    setdata('');
  }

  const EnterKey = async (e) => {
    if (e.key === 'Enter') {
      await getmsg(data);
      setdata('');
    }
  }

  const handleminimize = () => {
    setMinimize(!minimize);
  }

  const handleChange = (e) => {
    setLogindata({ ...logindata, [e.target.name]: e.target.value });
  }

  const handleConnect = () => {
    setForm(false);
  }

  useEffect(() => {
    if (usersList.length > 0) {
      const adminUser = usersList.find(user => user.username === 'admin');
      setAdminName(adminUser)
      // if (imraanUser) {
      //   getSelectedUser(imraanUser);
      // }
      // console.log("imraanUser", imraanUser)
    }
  }, [usersList]);
  console.log("usersList", usersList);

  useEffect(() => {
    console.log('URL is:', window.location.href);
    const handleUrlChange = () => {
      console.log('URL has changed:', window.location.href);
    };

    // Attach the event listener
    window.addEventListener('hashchange', handleUrlChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  return (
    <>
      {
        minimize ?
          <div className="App">
            <img src={logo} onClick={handleminimize} className='logo' />
          </div>
          :

          <div className='App'>
            <div className="chatbot-cart">
              <div className='chat-header'>
                <span className='username'>StampaSupport</span>
                <div className='icon'>
                  <VscChromeMinimize className='min' onClick={handleminimize} />
                  <RxCross2 onClick={handleminimize} />
                </div>
              </div>
              <div className='chat-content'>

              {!userName ? (
                <Login submit={(event) => getUsername(event)} />
              ) : (
                <Main user={userName} connectedUsers={usersList} CurrentusersocketID={CurrentusersocketID} />
              )}
              </div>
            </div>
          </div>
      }

    </>
  );
}

export default App;
