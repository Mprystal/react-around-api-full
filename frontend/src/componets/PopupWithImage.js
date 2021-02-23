import React from 'react';

function PopupWithImage(props){
    if (props.card === undefined) {
        return null;
      } else {
        
      
    
    return(
        <div className={`popup popup_theme_trans popup_type_image ${props.card && 'popup_open'}`}>
            <div className="popup__container">
            <figure className="popup__fig">
                <img className="popup__figimg" src={`${props.card.link}`} alt={`${props.card.name}`}/>
                <figcaption className="popup__figcap">{props.card.name}</figcaption>
            </figure>

            <button
                className="popup__close-button"
                aria-label="Close popup button"
                onClick={props.onClose}
                type="button"
            ></button>
            </div>
        </div>
    )
      }
}

export default PopupWithImage;