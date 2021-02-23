import React from 'react';

function Register({email, password, handlePasswordChange,handleEmailChange, handleRegisterSubmit}) {

    return (
        <div className='register'>
           
            <h2 className='register__heading'>Sign up</h2>
           
            <form onSubmit={handleRegisterSubmit} className='register__form'>
                <input id='email' name='email' type='email' className='register__input' placeholder='Email' value={email} onChange={handleEmailChange} />

                <input id='password' name='password' type='password' value={password} className='register__input' placeholder='Password' onChange={handlePasswordChange}/>

                <button type='submit' className='register__button'>Sign up</button>
                
            </form>
          
            <p className='register__paragraph'><a href="/signin" style={{textDecoration:'none', color: 'white'}}>Already a member? Log in here!</a> </p>

        </div>
    )
}

export default Register;