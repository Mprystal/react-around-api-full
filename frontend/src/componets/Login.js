import React from "react";

function Login ({handleLoginSubmit, email, password,handlePasswordChange,handleEmailChange}) {
    
    return (

        <div className='login'>
           
            <h2 className='login__heading'>Log in</h2>
           
            <form onSubmit={handleLoginSubmit} className='login__form'>
                <input id='email' name='email' type='email' className='login__input' placeholder='Email' value={email} onChange={handleEmailChange} />

                <input id='password' name='password' type='password' value={password} className='login__input' placeholder='Password' onChange={handlePasswordChange} />

                <button type='submit' className='login__button'>Log in</button>
                
            </form>
          
            <p className='login__paragraph'><a href="/signup" style={{textDecoration:'none', color: 'white'}} >Not a member? Sign up here!</a> </p>

        </div>
        
       
    )
}

export default Login;