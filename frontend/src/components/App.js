import '../index.css';
import {Switch, Route, useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';
import successImage from '../images/success-icon.svg';
import failureImage from '../images/failure-icon.svg';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { onRequestError } from '../utils/utils';
import api from '../utils/api';
import Auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteConfirmPopup from './DeleteConfirmPopup';
import InfoTooltip from './InfoTooltip';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [isDoingWork, setIsDoingWork] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [tooltipMessage, setTooltipMessage] = useState(null);
  const [tooltipImage, setTooltipImage] = useState(null);

  const history = useHistory();

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      return Auth.getContent(jwt)
          .then(res => {
            setUserEmail(res.data.email);
            setLoggedIn(true);
            return true;
          });
    } else {
      return Promise.resolve(false);
    }
  }

  useEffect(() => {
    checkToken().then(loggedIn => {
      if (loggedIn) {
        api
        .getUserInfo()
        .then(({data: user}) => {
          setCurrentUser(user)
        })
        .catch(err => onRequestError(err, 'Failed to get user info.'));
    
        api
          .getCards()
          .then(({data: cards}) => setCards(cards))
          .catch(err => onRequestError(err, 'Failed to get cards.'));
  
        history.push('/');
      }
    });
  }, []);

  const onEditProfile = () => {
    setIsEditProfilePopupOpen(true);
  }

  const onAddPlace = () => {
    setIsAddPlacePopupOpen(true);
  }

  const onEditAvatar = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(likeId => likeId === currentUser._id);
    
    api.changeLikeCardStatus(card._id, isLiked)
        .then(({data: newCard}) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => onRequestError(err, 'Failed to change like status.'));
  }

  const doCardDelete = () => {
    setIsDoingWork(true);
    api.deleteCard(cardToDelete._id)
        .then(() => {
            setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
            closeAllPopups();
        })
        .catch(err => onRequestError(err, 'Failed to remove card.'))
        .finally(() => {
          setIsDoingWork(false);
          setCardToDelete(null);
        });
  } 

  const handleCardDelete = (card) => {
    setCardToDelete(card);
    setIsConfirmPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsConfirmPopupOpen(false);
    setCardToDelete(null);
    setIsTooltipPopupOpen(false);
  }

  const handleUpdateUser = ({name, about}) => {
    setIsDoingWork(true);
    api
      .setProfile(name, about)
      .then(({data: newUser}) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(err => onRequestError(err, 'Failed to edit profile.'))
      .finally(() => {
        setIsDoingWork(false);
      });
  }

  const handleUpdateAvatar = (link) => {
    setIsDoingWork(true);
    api
      .updateAvatar(link)
      .then(({data: newUser}) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(err => onRequestError(err, 'Failed to update avatar.'))
      .finally(() => {
        setIsDoingWork(false);
      });
  }

  const handleCardAdd = ({name, link}) => {
    setIsDoingWork(true);
    api
      .addCard(name, link)
      .then(({data: newCard}) => {
        setCards([newCard, ...cards]); 
        closeAllPopups();
      })
      .catch(err => onRequestError(err, 'Failed to add new card.'))
      .finally(() => {
        setIsDoingWork(false);
      });
  }

  const handleRegisterSuccess = () => {
    setTooltipImage(successImage);
    setTooltipMessage('Вы успешно зарегистрировались!');
    setIsTooltipPopupOpen(true);
  }

  const handleSignFailure = () => {
    setTooltipImage(failureImage);
    setTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
    setIsTooltipPopupOpen(true);
  }

  const handleLogin = (jwt) => {
    if (jwt) {
      Auth.getContent(jwt)
          .then(res => {
            setUserEmail(res.data.email);

            api
            .getUserInfo()
            .then(({data: user}) => setCurrentUser(user))
            .catch(err => onRequestError(err, 'Failed to get user info.'));
        
            api
              .getCards()
              .then(({data: cards}) => setCards(cards))
              .catch(err => onRequestError(err, 'Failed to get cards.'));

            setLoggedIn(true);
            history.push('/');
          })
    }
  }

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  return (
    <div className="App page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/sign-in">
            <Login onSuccess={handleLogin} onFailure={handleSignFailure}/>
          </Route>
          <Route path="/sign-up">
            <Register onSuccess={handleRegisterSuccess} onFailure={handleSignFailure}/>
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            userEmail={userEmail}
            onLogout={handleLogout}
            onEditProfile={onEditProfile}
            onAddPlace={onAddPlace}
            onEditAvatar={onEditAvatar}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>

        <Footer />
    
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isDoingWork}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onCardAdd={handleCardAdd} isLoading={isDoingWork} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isDoingWork}/>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <DeleteConfirmPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onDeleteConfirm={doCardDelete} isLoading={isDoingWork}/>

        <InfoTooltip isOpen={isTooltipPopupOpen} onClose={closeAllPopups} message={tooltipMessage} imageSrc={tooltipImage}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
