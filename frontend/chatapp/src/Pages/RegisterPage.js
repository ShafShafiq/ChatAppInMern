import React from 'react'
import axios from 'axios'
import { useState } from 'react'

import makeToast from '../Toaster'
export default function RegisterPage() {
   const nameref = React.createRef();
   const emailref = React.createRef();
    const passwordref = React.createRef();
    const [nameO , setName] = useState('');
    const [emailO , setEmail] = useState('');
    const [password , setPassword] = useState('');
 //handle the name change
    const handleNameChange = (e) => {
      setName(e.target.value);
    }
    //handle the email change
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    }
    //handle the password change
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    }
    const register = () => {
        
          const   name = nameref.current.value
          const  email = emailref.current.value
          const  password = passwordref.current.value
   
        // const name = this.nameO
        // const email =  this.emailO
        // const password  = this.password
    
        axios.post('http://localhost:4000/users/signup', {
          name,
          email,
          password
        })
        .then(res => {
          
          // //geting the data
          // const data = res.data;
          // //console log the data
          // console.log(data);
          //set the data to the toast
           makeToast('success', res.message);
        })
        .catch(err => {
          console.log(err);
             makeToast('error', err.message);
        })
    }

  return (
    <div className = "card"> 
        <div className="cardHeader">Register</div>
        
        <div className="cardBody">

          <div className="inputGroup">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" onChange={handleNameChange} id="name" placeholder=""  ref={nameref}/>
          </div>
            <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input type="email" onChange={handleEmailChange} name="email" id="email" placeholder="" ref={emailref} />

          </div>
          <div className="inputGroup">
                <label htmlFor="password">Pasword</label>
                <input type="password" onChange={handlePasswordChange} name="password" id="password" placeholder=""  ref={passwordref}/>
           </div>
    </div>
    <button onClick={register}>{password}</button>
    </div>
  )
}
