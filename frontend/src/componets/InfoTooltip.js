import React,{} from 'react';


function InfoTooltip({onClose, image, open, message}) {
   

    return(
        <div className={`popup ${open && 'popup_open'}`}>
             <div className="popup__container">
                    <button
                    className="popup__close-button"
                    aria-label="Close popup button"
                    onClick={onClose}
                    type="button">   
                    </button>
                 <div className="infoTool">
                        <img className="infoTool__img" src={image} alt={'Success / failure icon'}/>
                        <p className="infoTool__paragraph" style={{color:'black'}}>{message}</p>
                 </div>
                
                 
            </div>
        </div>
    )
}

export default InfoTooltip;