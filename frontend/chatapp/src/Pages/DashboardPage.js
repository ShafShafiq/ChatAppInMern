import React from 'react'

export default function DashboardPage() {
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
          <div className='chatroom'>
            <div className='chatroomName'>
              Chatroom 1
            </div>
            <div className='join'>
                <button className='join'>Join</button>
            </div>
              

          </div>
    </div>
    </div>
  )
}
