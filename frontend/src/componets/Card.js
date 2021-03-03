import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props){
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.ownerId ===  currentUser._id;

  const cardDeleteButton = (
    `element__card-remove ${isOwn ? 'element__card-remove' : 'element__card-hidden'}`
  ); 

    // Check if the card was liked by the current user
  const isLiked = props.card.likes.some(i => i === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const cardLikeButton = `${isLiked ? 'element__card-heart_active' : 'element__card-heart'}`; 

  function handleClick() {
    props.onCardClick();
  }  

  function handleLikeClick(card){
    props.onCardLike(card)
  }

  function handleDeleteClick(card){
    props.onCardDelete(card)
  }


    return(
            <li className="element__card">
                <button
                  onClick={handleDeleteClick}
                  className={cardDeleteButton}
                  aria-label="Remove card button"
                  type="button"
                ></button>

              <div onClick={handleClick} className="element__card-img" style={{ backgroundImage: `url(${props.src})` }}></div>

              <h2 className="element__card-heading">{props.title}</h2>
                <div className="element__card-group-likes">
                  <button
                    className={cardLikeButton}
                    onClick={handleLikeClick}
                    aria-label="Like this card button"
                    type="button"
                  ></button>
                  <p className="element__card-likes">{props.likes}</p>
                </div>
            </li>
    )
}

export default Card;