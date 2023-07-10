

import { useEffect, useState } from 'react';
import { VscArrowSmallDown } from 'react-icons/vsc';
const initialValue = {
  email: '',
  password: ''
}
const Login = (props) => {
  const [logindata, setLogindata] = useState(initialValue);
  const [show, setShow] = useState(false);
  const [data, setdata] = useState("")

  // const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const fetched_userName = e.target[0].value;
    props.submit(fetched_userName);
  };
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className='mainform'>
        <div className='thebotform'>
          <span>Enter Email to Connect</span>
          <input type='email' placeholder='Enter Email' name='email'/>
          <button type='submit' className='btn' >Connect</button>
        </div>
      </div>
    </form >
  )
}


export default Login;