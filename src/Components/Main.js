import { useState,useEffect } from 'react';
import Conversation from '../Components/Conversation';
import Online from '../Components/Online';
import adminavatar from '../img/adminavatar.png';

// import {fetchData} from '../Service/API.js';

const Main = (props) => {
  const [page, setPage] = useState('online');
  const [content, setcontent] = useState('profile');
  const [data, setdata] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [userSelected, setUserSelected] = useState(false);
  const getSelectedUser = (user) => {
    setSelectedUser(user);
    setUserSelected(true);
  };
  

  console.log("in home", props.connectedUsers);

  const handleClick = (id) => {
    console.log(id.target.id)
    setPage(id.target.id);
  }

  const handleContent = (id) => {
    setcontent(id.target.id);
  }

  useEffect(() => {
    if (props.user && props.connectedUsers.length > 0) {
      const imraanUser = props.connectedUsers.find(user => user.username === 'admin');
      if (imraanUser) {
        getSelectedUser(imraanUser);
      }
    }
  }, [props.user, props.connectedUsers]);
  

  return (
    <>
      <div className='main-mychat'>
        <div className='main-sidebar'>
         
          <div className='main-sidebar-content'>
            {/* {
             
                  <Online 
                  connectedUsers={props.connectedUsers}
                  selectUser={getSelectedUser}
                  />
            } */}

          </div>
        </div>
        <div className='main-content'>
          <div className='main-content-head'>
            <span className={content !== 'convarsation' ? 'main-content-head-com cnt-sec' : 'main-content-head-act'} id='convarsation' onClick={(id) => handleContent(id)}></span>
          </div>
          <div className='main-right-content'>
            {/* {
              content === 'activity' ?
                <Activities />
                :
                content === 'convarsation' ?
                  <Conversation />
                  :
                  <Profile />
            } */}

{userSelected ? (
        <div>
          <Conversation
            selectedUser={selectedUser}
            connectedUsers={props.connectedUsers}
            Currentuser={props.user}
            CurrentusersocketID={props.CurrentusersocketID}
          />
        </div>
      ) : (
        <>
        <img src={adminavatar} className='offline-logo'/>
        <div className="no-render-message">We are Currently Offline We'll get back to you Soon</div>
        </>
      )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Main