import React from 'react';
import aroundtheus from '../images/Vectorlogo.svg';


function Header({loggedIn,handleSignOut, path, email}){

    function handleButtonDisplay(){
        if(loggedIn){
           return <button onClick={handleSignOut} className='header__button'>
                Log out
            </button>
        } else if(!loggedIn && path === 'signin'){
           return <a href='/signup'  className='header__link' >
                Sign up
            </a>
        } else {
           return <a href='/signin' className='header__link' > 
                Log in
            </a>
        }
    }
    
    return(
        <header className="header">
            <img src={aroundtheus} alt="Logo" className="header__logo" />
            <div className="header__login-container">
                { loggedIn ? <p className='header__paragraph'> {email} </p> : ''}
            
               { handleButtonDisplay()}
               
            </div>   
        </header>
    )
}

export default Header;