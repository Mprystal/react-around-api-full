import React from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props){
    const inputRef = React.useRef('')

    function handleAvatarSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: inputRef.current.value
        })
    }

    return(
        <PopupWithForm  onSubmit={handleAvatarSubmit} name={"popup_type_profile-img"} title={"Change Profile Picture"} children={
            <>
              <input
                  id="profile-img-url"
                  className="popup__user-input popup__user-input_url"
                  type="url"
                  name="link"
                  ref={inputRef}
                  placeholder="Image link"
                  required
                />
    
                <span id="profile-img-url-error" className="popup__error"></span>
            </>
          } isOpen={props.isOpen} onClose={props.onClose}/>
    )
}

export default EditAvatarPopup;