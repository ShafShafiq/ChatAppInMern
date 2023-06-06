import React from 'react'
import { useState , useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function DashboardPage(props) {

const [chatrooms, setChatrooms] = useState([]);
// props.setupSocket();

const getAllChatrooms = () => {
  axios.get("http://localhost:4000/chatroom/all",{
    headers: {
      Authorization: "Bearer " + localStorage.getItem("C_token"),
    },
  
    
  }).then(res => {
    console.log(res.data);
    setChatrooms(res.data);
  })
  .catch(err => {
    console.log(err);
    setTimeout(getAllChatrooms, 3000);

  })
}
  useEffect(() => {
    getAllChatrooms();
  }, []);



  return (
    <div className = "card"> 
        <div className="cardHeader">Chatrooms</div>
        
        <div className="cardBody">

          <div className="inputGroup">
                <label htmlFor="chatroomname">Chatroom Name</label>
                <input type="text" name="chatroomname" id="chatroomname" placeholder="" />
          </div>
           
          
    </div>
    <button>Create ChatRoom</button>

        <div className='chatrooms'>
         {chatrooms.map((chatroom ) => {
            return (

              
              <div key={chatroom._id} className='chatroom'>
              <div className='chatroomName'>
                {chatroom.name}
              </div>
             <Link to={"/chatroom/"+chatroom._id }>
              <div className='join'>
                  <button className='join'>Join</button>
              </div>
              </Link> 
               {/* <Link to={{ pathname: `/chatroom/${chatroom._id}`, state: { chatroomName: chatroom.name } }}>
               <div className='join'>
                  <button className='join'>Join</button>
              </div>
               </Link> */}
            </div>
            )
         }

         )} 
          {/* <div className='chatroom'>
            <div className='chatroomName'>
              Chatroom 1
            </div>
            <div className='join'>
                <button className='join'>Join</button>
            </div>
          </div> */}
    </div>
    </div>
  )
}

