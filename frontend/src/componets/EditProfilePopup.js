import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props){
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const currentUser = React.useContext(CurrentUserContext);

    function nameChangeHandler(e){
        setName(e.target.value)
    }

    function descriptionChangeHandler(e){
        setDescription(e.target.value)
    }

    React.useEffect(() => {
        setName(currentUser && currentUser.name || '');
        setDescription(currentUser && currentUser.about || '');
      }, [currentUser]); 

      function handleSubmit(e) {
        e.preventDefault();
      
        // Pass the values of the managed components to the external handler
        props.onUpdateUser({
          name,
          about: description,
        });
      } 

    return(
        <PopupWithForm  name={"popup_type_edit-profile"} onSubmit={handleSubmit} title={"Edit profile"} children={
            <>
            <input
                  id="profile-name"
                  className="popup__user-input popup__user-input_type_name"
                  type="text"
                  name="user_name"
                  value={name}
                  onChange={nameChangeHandler}
                  required
                  minLength="2"
                  maxLength="40"
                  placeholder="User Name"
                />
    
                <span id="profile-name-error" className="popup__error"></span>
    
                <input
                  id="profile-about"
                  className="popup__user-input popup__user-input_type_about"
                  type="text"
                  value={description}
                  onChange={descriptionChangeHandler}
                  name="user_about"
                  required
                  minLength="2"
                  maxLength="200"
                  placeholder="User About"
                />
    
                <span id="profile-about-error" className="popup__error"></span>
            </>
          } isOpen={props.isOpen} onClose={props.onClose} />
    )
}


export default EditProfilePopup;