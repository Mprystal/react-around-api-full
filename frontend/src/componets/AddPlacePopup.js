import React from 'react';
import PopupWithForm from './PopupWithForm';


function AddPlacePopup(props){
    const [name, setName] = React.useState('')
    const [link, setLink] = React.useState('')
    

    function nameChangeHandler(e){
        setName(e.target.value)
    }

    function linkChangeHandler(e){
        setLink(e.target.value)
    }

      function handleSubmit(e) {
        e.preventDefault();
      
        // Pass the values of the managed components to the external handler
        props.onAddPlaceSubmit({
          name,
          link
        });
        setName('')
        setLink('')
      } 

    return(
        <PopupWithForm  name={"popup_type_add-card"} onSubmit={handleSubmit} title={"New Place"} isOpen={props.isOpen} onClose={props.onClose}>
            <input
                  id="card-title"
                  className="popup__user-input popup__user-input_card-heading"
                  type="text"
                  name="name"
                  value={name}
                  onChange={nameChangeHandler}
                  placeholder="Title"
                  required
                  minLength="1"
                  maxLength="30"
                />
    
                <span id="card-title-error" className="popup__error"></span>
    
                <input
                  id="card-url"
                  className="popup__user-input popup__user-input_url"
                  value={link}
                  onChange={linkChangeHandler}
                  type="url"
                  name="link"
                  placeholder="Image link"
                  required
                />
    
                <span id="card-url-error" className="popup__error"></span>
           
            </PopupWithForm>
    
    )
}


export default AddPlacePopup;