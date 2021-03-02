import React, {useState} from 'react';
import {Route, Switch, useHistory, Redirect } from "react-router-dom";

import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Register from './Register';
import Login from './Login';
import {getContent, register,authorize} from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import check from '../images/Unionchk.svg';
import x from '../images/Unionx.svg';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] =useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false); 
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({});
  const[cards, setCards]=useState([]);
  const[loggedIn, setLoggedIn] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage]= useState(x)
  const [token, setToken] = useState(localStorage.getItem('jwt'))

  const history = useHistory();

  React.useEffect(() => {
    if(token){
      console.log(typeof(token))
     getContent(token)
     .then((res)=> {
       console.log(res)
       if(res){
         setEmail(res.data.email)
        setLoggedIn(true);
        history.push('/')
       }
     })
    }
  }, [history])

  React.useEffect(() => {
    Promise.all([api.getUserInfo(token),api.getCardList(token)]).then(
      ([userInfo,cardListData]) => { 
         setCurrentUser(userInfo)
         setCards(cardListData)
        }).catch((err) => {
          console.log(`Error: ${err}`);
        })
      },[])

  const handleSignOut = () =>{
      setToken(localStorage.removeItem('jwt'))
      setLoggedIn(false);
      history.push('/signin')
  }

  function handleCardLike(card) {        
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked, token).then((newCard) => {
    const newCards = cards.map((c) => c._id === card._id ? newCard : c);
    setCards(newCards);
    }).catch((e)=>console.log(e));
  } 

  function handleCardDelete(card){
    api.removeCard(card._id,token).then(()=>{
        const cardsAfterDelete = cards.filter((c) => c._id !== card._id)
        setCards(cardsAfterDelete);
    }).catch((e) => console.log(e))
   }

  function handleUpdateUser({name , about}){ 
    api.setUserInfo({name, about},token)
    .then(data => setCurrentUser(data))
    .then(()=>{closeAllPopups();})
    .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit({name, link}){
    api.addCard({name, link},token)
    .then((newCard) =>setCards([newCard, ...cards]))
    .then(()=>{closeAllPopups();})
    .catch(err => console.log(err))
  }

  function handleUpdateAvatar({avatar}){
      api.setUserAvatar(avatar,token)
      .then(data => setCurrentUser(data))
      .then(()=>{closeAllPopups();})
      .catch(err => console.log(err))
  }

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(undefined);
    setIsInfoTooltipOpen(false)
  }

  function handleCardClick(card){
    setSelectedCard(card);
    
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleLogin(){
    setLoggedIn(true);
  }

  const handleLoginSubmit = (e) => {
      e.preventDefault();   
      if(!email || !password){
          return
      }   
      authorize(email, password)
      .then((data) => {
          if(!data){   
              throw new Error('error!')
          }
          if(data.token){   
              setToken(localStorage.setItem('jwt', data.token))
              setPassword(''); 
              handleLogin();
              history.push('/')
              return
          }
      })
      .catch(err => 
          console.log(err) 
      )
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
        setIsInfoTooltipOpen(true)
    }, 500);
    register(email, password)
    .then((res) => {
        if( !res || res.status === 400){  
            throw new Error( 'Error!')
        } else if(res.status === 200 || 201) {
                return res.json();
        }    
    }).then(()=> {
            setImage(check)
            setMessage('Success! You have now been registered.')
    })
    .then(()=> {
        setEmail('');
        setPassword('');
        setTimeout(() => {
            setIsInfoTooltipOpen(false)
            setImage('')
            history.push('/signin');
        }, 1500);
        
    })
    .catch(() => {
            setImage(x)
            setMessage('Oops, something went wrong! Please try again.') 
    })
}

  function handleEmailChange(e){
    setEmail(e.target.value)
  }

  function handlePasswordChange(e){
    setPassword(e.target.value)
  }

  

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Switch>
        <ProtectedRoute exact path="/" 
        loggedIn={loggedIn} 
        handleSignOut={handleSignOut}
        component={Main} 
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        onImage={(card)=>{handleCardClick(card)}}
        onCardLike={(card)=>{handleCardLike(card)}} 
        onCardDelete={(card)=>{handleCardDelete(card)}} 
        cards={cards}
        email={email}
        />
         
        <Route exact path="/signup">
          <Header loggedIn={loggedIn} handleSignOut={handleSignOut} /> 
          <Register  
          email={email}
          password={password}
          handleEmailChange={handleEmailChange}
          handlePasswordChange={handlePasswordChange}
          handleRegisterSubmit={handleRegisterSubmit}
          />  
        </Route>
        <Route exact path="/signin">
          <Header loggedIn={loggedIn} path={'signin'} handleSignOut={handleSignOut} /> 
          <Login 
            handleLoginSubmit={handleLoginSubmit}
            email={email}
            password={password}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange} />  
        </Route>
        <Route path='*'>
          <Redirect to='./signup' />
        </Route>
      </Switch>
     
 
      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />

      <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}/>

      <AddPlacePopup onAddPlaceSubmit={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>

      <PopupWithForm name={"popup_type_delete-card"} title={"Are you sure?"} />

      <PopupWithImage card={selectedCard}  onClose={closeAllPopups}/>

      <InfoTooltip image={image} message={message} open={isInfoTooltipOpen} onClose={closeAllPopups}/>
      
    
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
