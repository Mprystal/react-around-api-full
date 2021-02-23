import React from 'react';

function PopupWithForm(props){
    return(
    <div className={`popup ${props.name} ${props.isOpen && 'popup_open'}`} >
            <div className="popup__container">
                <button
                    onClick={props.onClose}
                    className="popup__close-button"
                    aria-label="Close popup button"
                    type="button"
                ></button>
                <form action="#" className="popup__form" onSubmit={props.onSubmit}>
                    <h3 className="popup__header">{props.title}</h3>
                    {props.children}

                    <button
                    type="submit"
                    className="popup__save popup__save_disabled popup_save-edit"
                    >
                    Save
                    </button>
                </form>
                
            </div>
      </div>
    )
}

export default PopupWithForm;