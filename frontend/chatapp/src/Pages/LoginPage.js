import React from 'react'

 function LoginPage() {
  return (
    <div className = "card"> 
        <div className="cardHeader">Login</div>
        <div className="cardBody">
            <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="" />

        </div>
        <div className="inputGroup">
                <label htmlFor="password">Pasword</label>
                <input type="password" name="password" id="password" placeholder="" />

        </div>
    </div>
    <button>Login</button>
    </div>
  )
}

export default LoginPage
