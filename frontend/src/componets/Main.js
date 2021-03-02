import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Header from './Header'
import Footer from './Footer'


function Main(props){
  
  const currentUser = React.useContext(CurrentUserContext);
    return(
      <>
      <Header  loggedIn={props.loggedIn} handleSignOut={props.handleSignOut} email={props.email} />
        <main>
        <section className="profile">
          <div className="profile__container">
            <button
              className="profile__img-form"
              onClick={props.onEditAvatar}
              aria-label="Change profile picture button"
              type="button"
            >
              <div className="profile__img" style={{ backgroundImage: `url(${currentUser && currentUser.avatar})` }}></div>
            </button>

            <div className="profile__info">
              <div className="profile__edit">
                <h1 className="profile__name">{currentUser && currentUser.name}</h1>
                <button
                  className="profile__edit-button"
                  onClick={props.onEditProfile}
                  aria-label="Edit profile button"
                  type="button"
                ></button>
              </div>
                 <p className="profile__occupation">{currentUser && currentUser.about}</p>
            </div>
          </div>

          <button
            className="profile__add-button"
            onClick={props.onAddPlace}
            aria-label="Add profile button"
            type="button"
          ></button>


          
        </section>
       
        <section className="elements">
            <ul className="element">
              
              {currentUser && props.cards.map((card) => (   
                console.log(card)            
                // <Card 
                //   key={card._id} 
                //   onCardClick={()=>{props.onImage(card)}} 
                //   src={card.link} 
                //   card={card} 
                //   title={card.name} 
                //   onCardLike={()=>{props.onCardLike(card)}} 
                //   onCardDelete={()=>{props.onCardDelete(card)}} 
                //   ownerId={card.owner._id} 
                //   likes={card.likes.length}
                //   />
                  )
                  )}
            </ul>
        </section>      
      </main>
      <Footer />
    </>
    )
}

export default Main;